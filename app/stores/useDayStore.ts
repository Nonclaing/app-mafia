import { find, get, groupBy, compact, map, set, max, reduce } from "es-toolkit/compat";

const STORAGE_KEY = "dayStore";

export const useDayStore = defineStore("day", () => {
  const initialState: DayStore = {
    players: [],
    currentIdx: 0,
    currentStep: 0,
    isSecondVoting: false,
  };

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
    data.currentIdx = data.currentStep;
    data.isSecondVoting = false;
    if (!currentIsAvailableToPlay()) next();
  };

  const startDay = () => {
    data.players = map(useGameStore().gamePlayers, ({ id, role, name, fullName, number }) => ({ id, role, name, fullName, number, completedActions: {} as Record<DayPlayerAction, DayCompletedAction> }));
    data.currentStep = useWrap(data.currentStep + 1, 0, data.players.length);
    resetSteps();
  };

  const setInitial = () => {
    data.players = map(useGameStore().gamePlayers, ({ id, role, name, fullName, number }) => ({ id, role, name, fullName, number, completedActions: {} as Record<DayPlayerAction, DayCompletedAction> }));
    data.currentStep = -1;
    data.currentIdx = 0;
    data.isSecondVoting = false;
  };

  const currentIsAvailableToPlay = (): boolean => {
    const player = find(useGameStore().gamePlayers, { id: current.value.id });
    if (!player) return false;
    if (get(player, "state.kill")) return false;
    if (get(player, "state.kick")) return false;
    return true;
  };

  const next = () => {
    if (data.currentIdx === useWrap(data.currentStep + data.players.length - 1, 0, data.players.length)) return false;

    data.currentIdx = useWrap(data.currentIdx + 1, 0, data.players.length);
    if (!currentIsAvailableToPlay()) next();
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
    startDay,
    setInitial,
    resetSteps,
    repeatVoting,
  };
});
