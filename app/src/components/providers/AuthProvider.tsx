import React, { useState } from 'react';
import {
  AuthContext,
  AuthContextValue,
  User,
} from '../../contexts/AuthContext';

export type AuthProviderProps = {
  children: React.ReactElement;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const signin = (username: string, password: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({
          name: `Jyn Erso - ${username}`,
          username,
          id: 'jyn-erso-guid',
        });

        resolve();
      }, 500);
    });
  };

  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        resolve();
      }, 250);
    });
  };

  const authConextValue: AuthContextValue = {
    user,
    signin,
    logout,
  };

  return (
    <AuthContext.Provider value={authConextValue}>
      {children}
    </AuthContext.Provider>
  );
}
