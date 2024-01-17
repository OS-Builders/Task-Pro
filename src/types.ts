export type SignupProps = {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export type AuthProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export type DashboardProps = {
  username: string;
};

export interface FormState {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}
