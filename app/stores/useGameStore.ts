import { reduce, set, values, filter, uniqueId, map, flatMap, size, get, pullAt, includes } from "es-toolkit/compat";

const STORAGE_KEY = "gameStore";

export const useGameStore = defineStore("game", () => {
  const { t } = useI18n();
  const initialState: GameStore = {
    players: [],
    gamePlayers: [],
    roles: {
      mafia: {
        id: "mafia",
        name: t("stores.roles.mafia"),
        src: useAssetUrl("/images/roles/mafia.png"),
        count: 0,
      },
      don: {
        id: "don",
        name: t("stores.roles.don"),
        src: useAssetUrl("/images/roles/don.png"),
        count: 0,
      },
      peaceful: {
        id: "peaceful",
        name: t("stores.roles.peaceful"),
        src: useAssetUrl("/images/roles/peaceful.png"),
        count: 0,
      },
      sheriff: {
        id: "sheriff",
        name: t("stores.roles.sheriff"),
        src: useAssetUrl("/images/roles/sheriff.png"),
        count: 0,
      },
    },
    stage: "startMenu",
  };

  const initialData = useLocalStorage(STORAGE_KEY, initialState)!;
  const data = reactive<GameStore>(initialData.value);
  data.roles.mafia.src = useAssetUrl("/images/roles/mafia.png");
  data.roles.don.src = useAssetUrl("/images/roles/don.png");
  data.roles.peaceful.src = useAssetUrl("/images/roles/peaceful.png");
  data.roles.sheriff.src = useAssetUrl("/images/roles/sheriff.png");
  const allRolesCount = computed(() => reduce(values(data.roles), (r, v) => r + v.count, 0));
  const winner: ComputedRef<GameWinner> = computed(() => {
    const inGame = filter(data.gamePlayers, ({ state }) => !state.kick && !state.kill);
    const peacefulCount = useSize(filter(inGame, ({ role }) => includes(["peaceful", "sheriff"], role.id)));
    const mafiaCount = useSize(filter(inGame, ({ role }) => includes(["mafia", "don"], role.id)));

    if (!mafiaCount) return "peaceful";
    if (peacefulCount <= mafiaCount) return "mafia";
    return false;
  });

  const updateRole = (name: Role["id"], count: number) => {
    set(data, ["roles", name, "count"], count);
  };

  const deletePlayer = (id: string) => {
    data.players = map(filter(data.players, (player) => player.id !== id), (player, idx) => {
      return { ...player, number: idx + 1, fullName: `${player.name} (${idx + 1})` };
    });
  };

  const editPlayer = (id: string, name: string) => {
    data.players = map(data.players, (player) => {
      if (player.id === id) return { ...player, name, fullName: `${name} (${player.number})` };
      return player;
    });
  };

  const spreadRoles = () => {
    // Создаем массив всех ролей с учетом их количества
    const rolesPool: Role[] = flatMap(data.roles, ({ id, count }) => {
      return new Array(count).fill(data.roles[id], 0);
    });

    data.gamePlayers = map(data.players, (item) => {
      const index = Math.floor(Math.random() * size(rolesPool));
      const role = get(rolesPool, index); ;
      pullAt(rolesPool, index);
      return { ...item, role, state: { kick: false, kill: false, donCheck: false, sheriffCheck: false } };
    });
  };

  const addPlayer = (name: string) => {
    const number = size(data.players) + 1;
    // Перезаписываем ID всех пользователей, вдруг такие были созданы на прошлой сессии
    data.players = map(data.players, (player) => ({ ...player, id: uniqueId("player-") }));
    data.players.push({
      id: uniqueId("player-"),
      name,
      fullName: `${name} (${number})`,
      number,
    });
  };

  const kill = (id: string): false | GamePlayer => {
    let pl: false | GamePlayer = false;
    data.gamePlayers = map(data.gamePlayers, (player) => {
      if (player.id === id) {
        player.state.kill = true;
        pl = player;
      }
      return player;
    });
    return pl;
  };

  const kick = (id: string): false | GamePlayer => {
    let pl: false | GamePlayer = false;
    data.gamePlayers = map(data.gamePlayers, (player) => {
      if (player.id === id) {
        player.state.kick = true;
        pl = player;
      }
      return player;
    });
    return pl;
  };

  const nightAction = ({ action, id }: { action: NightPlayerAction; id: string }) => {
    data.gamePlayers = map(data.gamePlayers, (player) => {
      if (player.id === id) {
        switch (action) {
          case "sheriffCheck":
            player.state.sheriffCheck = true;
            break;
          case "donCheck":
            player.state.donCheck = true;
            break;
        }
      }
      return player;
    });
  };

  const changeStage = (stage: GameStore["stage"]) => {
    data.stage = stage;
    useStageStore().changeStage(stage);
  };

  return {
    winner,
    players: computed(() => data.players),
    gamePlayers: computed(() => data.gamePlayers),
    roles: computed(() => data.roles),
    stage: computed(() => data.stage),
    allRolesCount,
    kill,
    kick,
    addPlayer,
    updateRole,
    editPlayer,
    nightAction,
    spreadRoles,
    deletePlayer,
    changeStage,
  };
});
