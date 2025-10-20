type Player = {
  id: string;
  name: string;
  fullName: string;
  number: number;
};

type Role = {
  id: "mafia" | "don" | "peaceful" | "sheriff";
  src: string;
  name: string;
  count: number;
};

type GamePlayer = Player & {
  role: Role;
  state: Record<GamePlayerState, boolean>;
};

type GameStore = {
  players: Player[];
  gamePlayers: GamePlayer[];
  roles: Record<Role["id"], Role>;
  stage: GameStage;
};

type GameWinner = "peaceful" | "mafia" | false;

type GamePlayerState = "kick" | "kill" | "donCheck" | "sheriffCheck";

type GameStage = "startMenu" | "watchRoles" | "mafiaKnowing" | "night" | "day" | "dayDiscussion" | "dayVoting" | "dayVotingResult" | "dayVotingFinal" | "end" | "master";
