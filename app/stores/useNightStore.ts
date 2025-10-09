import { compact, find, get, includes, keys, map, set, size, uniq } from "es-toolkit/compat";

const STORAGE_KEY = "nightStore";

export const useNightStore = defineStore("night", () => {
  const initialState: NightStore = {
    players: [],
    currentIdx: -1,
    currentStep: -1,
  };

  const initialData = useLocalStorage(STORAGE_KEY, initialState)!;
  const data = reactive<NightStore>(initialData.value);
  const current = computed(() => get(data.players, data.currentIdx));
  const availableActions: ComputedRef<NightPlayerAction[]> = computed(() => {
    switch (get(current.value, "role.id", "")) {
      case "peaceful": return ["pass"];
      case "don": return ["kill", "donCheck"];
      case "sherif": return ["cherifCheck"];
      case "mafia": return ["kill"];
      default: return [];
    }
  });
  const completedActions = computed(() => keys(current.value?.completedActions)) as ComputedRef<NightPlayerAction[]>;

  const setInitial = (players: GamePlayer[]) => {
    data.currentIdx = -1;
    data.currentStep = -1;
    data.players = map(players, ({ id, role }) => ({ id, role, completedActions: {} as Record<NightPlayerAction, NightCompletedAction> }));
    next();
  };

  const next = () => {
    if (data.currentIdx === data.players.length - 1) return false;

    data.currentIdx += 1;
    if (get(find(useGameStore().gamePlayers, { id: current.value.id }), "isDead")) next();

    data.currentStep += 1;
    return true;
  };

  const action = ({ action, id }: { action: NightPlayerAction; id: string }) => {
    data.players = map(data.players, (player) => {
      if (player.id === current.value.id) {
        set(player, ["completedActions", action], { action, id });
        if (includes(["donCheck", "cherifCheck"], action)) useGameStore().nightAction({ action, id });
      }
      return player;
    });
  };

  const checkKill = (): false | GamePlayer => {
    const selectedOnKill = uniq(compact(map(data.players, ({ completedActions }) => get(completedActions, "kill.id"))));
    if (size(selectedOnKill) === 1) {
      return useGameStore().kill(get(selectedOnKill, "0"));
    }
    return false;
  };

  return {
    data, // TODO: для теста
    current,
    currentStep: computed(() => data.currentStep),
    availableActions,
    completedActions,
    next,
    action,
    checkKill,
    setInitial,
  };
});
