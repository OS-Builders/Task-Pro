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
};

export type ColumnProps = {
  name: string;
  create: boolean;
  user: UserState;
  currentBoard: CurrentBoardState;
};

export type ColumnContainerProps = {
  user: UserState;
  currentBoard: CurrentBoardState;
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
