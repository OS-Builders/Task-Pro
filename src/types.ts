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
  setCurrentBoard: React.Dispatch<React.SetStateAction<string>>;
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
