import React, { useEffect, useMemo, useState } from 'react';
import Loading from '../Loading';
import { AuthContextValue, User } from './auth-types';
import { AuthContext } from './AuthContext';
import { UserManager } from './UserManager';

export type AuthProviderProps = {
  children: React.ReactElement;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const userManager = useMemo(() => new UserManager(localStorage), []);

  useEffect(() => {
    const loggedInUser = userManager.init();

    setUser(loggedInUser);
    setIsLoading(false);
  }, [userManager]);

  const signin = async (username: string, password: string) => {
    const user = await userManager.signin(username, password);

    setUser(user);
  };

  const logout = async () => {
    return await userManager.logout();
  };

  const authConextValue: AuthContextValue = {
    user,
    signin,
    logout,
  };

  if (isLoading) {
    // TODO make loading component
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={authConextValue}>
      {children}
    </AuthContext.Provider>
  );
}
