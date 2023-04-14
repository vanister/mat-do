import React, { createContext, useContext, useState } from 'react';
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export type FirebaseAuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContext = {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<AuthStatus>;
  logout: (redirectUrl?: string) => Promise<void>;
};

export type AuthStatus = {
  success: boolean;
  errorMsg?: string;
  errorCode?: string;
};

export const FirebaseAuthContext = createContext<AuthContext>(null);

export function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function login(
    username: string,
    password: string
  ): Promise<AuthStatus> {
    if (!!user) {
      return { success: true };
    }

    try {
      setIsLoading(false);

      const auth = getAuth();
      const creds = await signInWithEmailAndPassword(auth, username, password);

      setIsAuthenticated(true);
      setUser(creds.user);

      return { success: true };
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);

      return { success: false, errorCode: error.code, errorMsg: error.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(redirectUrl?: string): Promise<void> {
    try {
      setIsLoading(true);

      const auth = getAuth();

      await signOut(auth);

      setIsAuthenticated(false);
      setUser(null);

      navigate(redirectUrl, { replace: true });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const value: AuthContext = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

// TODO - move to hooks

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);

  if (!context) {
    throw new Error('Firebase auth context is null');
  }

  return context;
}
