// PROP TYPES
export type SignupProps = {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

export type AuthProps = {
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

export type DashboardProps = {
  user: UserState;
};

export type LeftContainerProps = {
  user: UserState;
  setCurrentBoard: React.Dispatch<React.SetStateAction<CurrentBoardState>>;
};

export type MainContainerProps = {
  user: UserState;
  currentBoard: CurrentBoardState;
};

export type CreateBoardModalProps = {
  setCreatingBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBoard: React.Dispatch<React.SetStateAction<CurrentBoardState>>;
  boardList: React.ReactNode[];
  setBoardList: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  user: UserState;
  handleBoardSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedBoard: string | null;
};

export type NewTaskModalProps = {
  setAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
  currentBoard: CurrentBoardState;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
};

export type EditTaskModalProps = {
  setEditingTask: React.Dispatch<React.SetStateAction<TaskState | null>>;
  currentBoard: CurrentBoardState;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  task: TaskState;
  startColumn: "backlog" | "inProgress" | "inReview" | "completed";
};

export type ColumnProps = {
  name: keyof BoardState;
  create: boolean;
  user: UserState;
  currentBoard: CurrentBoardState;
  boardState: BoardState;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
};

export type ColumnContainerProps = {
  user: UserState;
  currentBoard: CurrentBoardState;
  boardState: BoardState;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
};

export type CardProps = {
  info: TaskState;
  setEditingTask: React.Dispatch<React.SetStateAction<TaskState | null>>;
};
// STATE TYPES
export interface UserState {
  name: string;
  id: string;
}

export interface AuthFormState {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

export interface CurrentBoardState {
  name: string;
  id: string;
}

export interface BoardListItemState {
  name: string;
  id: string;
}

export interface TaskFormState {
  taskname: string;
  status: string;
  tasknotes: string;
}

export interface BoardState {
  backlog: TaskState[];
  inProgress: TaskState[];
  inReview: TaskState[];
  completed: TaskState[];
}

export interface TaskState {
  name: string;
  notes: string;
  status: "backlog" | "inProgress" | "inReview" | "completed";
  __v: number;
  _id: string;
}

// TYPES
export type BoardType = {
  name: string;
  backlog: TaskState[];
  inProgress: TaskState[];
  inReview: TaskState[];
  completed: TaskState[];
  __v: number;
  _id: string;
};
