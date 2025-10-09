type DayPlayerAction = "toVote" | "vote";

type DayCompletedAction = {
  id: string;
  action: DayPlayerAction;
};

type DayPlayer = {
  id: string;
  name: string;
  fullName: string;
  role: Role;
  completedActions: Record<DayPlayerAction, DayCompletedAction>;
};

type DayStore = {
  players: DayPlayer[];
  currentIdx: number;
  currentStep: number;
};
