type NightPlayerAction = "kill" | "donCheck" | "sheriffCheck" | "pass";

type NightCompletedAction = {
  id: string;
  action: NightPlayerAction;
};

type NightPlayer = {
  id: string;
  name: string;
  fullName: string;
  role: Role;
  completedActions: Record<NightPlayerAction, NightCompletedAction>;
};

type NightStore = {
  players: NightPlayer[];
  currentIdx: number;
  currentStep: number;
};
