import React, { createContext, useContext, useMemo } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { initializeAuth, connectAuthEmulator } from 'firebase/auth';
import { AppSettings } from '../AppSettings';

export type EmulatorSettings = {
  authUrl: string;
};

export type FirebaseproviderProps = {
  appSettings: AppSettings;
  children: React.ReactNode;
  useEmulator?: boolean;
  emulatorSettings?: Partial<EmulatorSettings>;
};

export const FirebaseContext = createContext<FirebaseApp>(null);

export default function FirebaseProvider(props: FirebaseproviderProps) {
  const app = useMemo(() => {
    const firebaseApp = initializeApp({ ...props.appSettings });
    const auth = initializeAuth(firebaseApp);

    if (!!props.useEmulator) {
      const { emulatorSettings } = props;

      connectAuthEmulator(
        auth,
        emulatorSettings?.authUrl ?? 'http://127.0.0.1:9099',
        { disableWarnings: true }
      );
    }

    return firebaseApp;
  }, []);

  return (
    <FirebaseContext.Provider value={app}>
      {props.children}
    </FirebaseContext.Provider>
  );
}

// TODO - move to hooks

export function useFirebase() {
  const firebaseApp = useContext(FirebaseContext);

  if (!firebaseApp) {
    throw new Error('Firebase app is null');
  }

  return firebaseApp;
}
