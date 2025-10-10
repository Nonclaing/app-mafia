import { reduce, set, values, filter, uniqueId, map, flatMap, size, get, pullAt } from "es-toolkit/compat";

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
        src: "/images/roles/mafia.png",
        count: 0,
      },
      don: {
        id: "don",
        name: t("stores.roles.don"),
        src: "/images/roles/don.png",
        count: 0,
      },
      peaceful: {
        id: "peaceful",
        name: t("stores.roles.peaceful"),
        src: "/images/roles/peaceful.png",
        count: 0,
      },
      sherif: {
        id: "sherif",
        name: t("stores.roles.sherif"),
        src: "/images/roles/sherif.png",
        count: 0,
      },
    },
    stage: "startMenu",
  };

  const initialData = useLocalStorage(STORAGE_KEY, initialState)!;
  const data = reactive<GameStore>(initialData.value);

  const allRolesCount = computed(() => reduce(values(data.roles), (r, v) => r + v.count, 0));

  const updateRole = (name: Role["id"], count: number) => {
    set(data, ["roles", name, "count"], count);
  };

  const deletePlayer = (id: string) => {
    data.players = filter(data.players, (player) => player.id !== id);
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
      return { ...item, role, isDead: false, isDonChecked: false, isSherifChecked: false };
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
        player.isDead = true;
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
        player.isKick = true;
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
          case "cherifCheck": return { ...player, isSherifChecked: true };
          case "donCheck": return { ...player, isDonChecked: true };
          default: return player;
        }
      }
      return player;
    });
  };

  return {
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
    changeStage: (stage: GameStore["stage"]) => data.stage = stage,
  };
});
