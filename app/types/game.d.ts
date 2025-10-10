type Player = {
  id: string;
  name: string;
  fullName: string;
  number: number;
};

type Role = {
  id: "mafia" | "don" | "peaceful" | "sherif";
  src: string;
  name: string;
  count: number;
};

type GamePlayer = Player & {
  role: Role;
  isKick: boolean;
  isDead: boolean;
  isDonChecked: boolean;
  isSherifChecked: boolean;
};

type GameStore = {
  players: Player[];
  gamePlayers: GamePlayer[];
  roles: Record<Role["id"], Role>;
  stage: "startMenu" | "watchRoles" | "mafiaKnowing" | "night" | "day" | "dayDiscussion" | "dayVoting" | "dayVotingResult" | "end" | "master";
};

type GameWinner = "peaceful" | "mafia" | false;
