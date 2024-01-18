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
  currentBoard?: string;
  setCurrentBoard: React.Dispatch<React.SetStateAction<CurrentBoardState>>;
};

export type CreateBoardModalProps = {
  setCreatingBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBoard: React.Dispatch<React.SetStateAction<CurrentBoardState>>;
  user: UserState;
};

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
