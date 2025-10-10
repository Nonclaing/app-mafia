import { find, get, map, set } from "es-toolkit/compat";

const STORAGE_KEY = "dayStore";

export const useDayStore = defineStore("day", () => {
  const initialState: DayStore = {
    players: [],
    currentIdx: -1,
    currentStep: -1,
  };

  const initialData = useLocalStorage(STORAGE_KEY, initialState)!;
  const data = reactive<DayStore>(initialData.value);
  const current = computed(() => get(data.players, data.currentIdx)!);
  const resetSteps = () => {
    data.currentIdx = -1;
    data.currentStep = -1;
    next();
  };

  const setInitial = (players: GamePlayer[]) => {
    data.players = map(players, ({ id, role, name, fullName, number }) => ({ id, role, name, fullName, number, completedActions: {} as Record<DayPlayerAction, DayCompletedAction> }));
    resetSteps();
  };

  const next = () => {
    if (data.currentIdx === data.players.length - 1) return false;

    data.currentIdx += 1;
    const player = find(useGameStore().gamePlayers, { id: current.value.id });
    if (get(player, "isDead")) next();
    if (get(player, "isKick")) next();

    data.currentStep += 1;
    return true;
  };

  const action = ({ action, id }: { action: DayPlayerAction; id: string }) => {
    data.players = map(data.players, (player) => {
      if (player.id === current.value.id) set(player, ["completedActions", action], { action, id });
      return player;
    });
  };

  return {
    data, // TODO: для теста
    current,
    players: computed(() => data.players),
    currentStep: computed(() => data.currentStep),
    next,
    action,
    setInitial,
    resetSteps,
  };
});
