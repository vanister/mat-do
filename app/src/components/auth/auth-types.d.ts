export type User = {
  id: string;
  name: string;
  username: string;
};

export type AuthContextValue = {
  user?: User;
  signin: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
