const STORAGE_KEY = "routeStore";

export const useStageStore = defineStore("route", () => {
  const initialState: StageStore = {
    stage: "startMenu",
    routes: {
      startMenu: [
        ROUTES.game.startMenu,
      ],
      watchRoles: [
        ROUTES.game.watchRoles,
      ],
      mafiaKnowing: [
        ROUTES.game.mafiaKnowing,
      ],
      night: [
        ROUTES.game.night,
      ],
      day: [
        ROUTES.game.day,
      ],
      dayDiscussion: [
        ROUTES.game.dayDiscussion,
      ],
      dayVoting: [
        ROUTES.game.dayVoting,
      ],
      dayVotingResult: [
        ROUTES.game.dayVotingResult,
      ],
      dayVotingFinal: [
        ROUTES.game.dayVotingFinal,
      ],
      end: [
        ROUTES.game.end,
      ],
      master: [
        ROUTES.game.master,
      ],
    },
  };

  const initialData = useLocalStorage(STORAGE_KEY, initialState)!;
  const data = reactive<StageStore>(initialData.value);
  const availableRoutes = computed(() => useGet(data.routes, data.stage, ["/"]));

  const changeStage = (stage: GameStore["stage"]) => {
    data.stage = stage;
  };

  return {
    availableRoutes,
    stage: computed(() => data.stage),
    changeStage,
  };
});
