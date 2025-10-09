type NightPlayerAction = "kill" | "donCheck" | "cherifCheck" | "pass";

type NightCompletedAction = {
  id: string;
  action: NightPlayerAction;
};

type NightPlayer = {
  id: string;
  role: Role;
  completedActions: Record<NightPlayerAction, NightCompletedAction>;
};

type NightStore = {
  players: NightPlayer[];
  currentIdx: number;
  currentStep: number;
};
