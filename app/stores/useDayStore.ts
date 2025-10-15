import { find, get, groupBy, compact, map, set, max, reduce } from "es-toolkit/compat";

const STORAGE_KEY = "dayStore";

export const useDayStore = defineStore("day", () => {
  const initialState: DayStore = {
    players: [],
    currentIdx: -1,
    currentStep: -1,
    isSecondVoting: false,
  };

  // TODO: сдвиг хода на 1
  const initialData = useLocalStorage(STORAGE_KEY, initialState)!;
  const data = reactive<DayStore>(initialData.value);
  const current = computed(() => get(data.players, data.currentIdx)!);

  const repeatVoting = () => {
    resetSteps();
    const byVoteId = groupBy(data.players, ({ completedActions }) => get(completedActions, "vote.id", ""));
    const voted = compact(map(byVoteId, (value, key) => {
      if (!key) return;
      return { key, value: useSize(value) };
    }));
    const maxCount = max(map(voted, "value")) || 0;
    const available = reduce(voted, (res, curr) => {
      if (curr.value === maxCount) set(res, curr.key, true);
      return res;
    }, {});
    data.players = map(data.players, (player) => {
      const toVote = player.completedActions.toVote;
      const completedActions = (get(available, toVote?.id, "") ? { toVote: toVote } : {}) as Record<DayPlayerAction, DayCompletedAction>;
      return { ...player, completedActions };
    });
    data.isSecondVoting = true;
  };

  const resetSteps = () => {
    data.currentIdx = -1;
    data.currentStep = -1;
    data.isSecondVoting = false;
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
    if (get(player, "state.kill")) next();
    if (get(player, "state.kick")) next();

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
    isSecondVoting: computed(() => data.isSecondVoting),
    players: computed(() => data.players),
    currentStep: computed(() => data.currentStep),
    next,
    action,
    setInitial,
    resetSteps,
    repeatVoting,
  };
});
