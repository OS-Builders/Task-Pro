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

export type ContainerProps = {
  user: UserState;
  currentBoard?: CurrentBoardState;
  setCurrentBoard: React.Dispatch<React.SetStateAction<CurrentBoardState>>;
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

export type ColumnProps = {
  name: string;
  create: boolean;
};

// STATE TYPES
export interface UserState {
  name: string;
  id: string;
}

export interface FormState {
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
