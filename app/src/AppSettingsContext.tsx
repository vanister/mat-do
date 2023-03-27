import React, { createContext, ReactElement, useContext } from 'react';

export type AppSettingsProviderProps = {
  children: ReactElement
}

export type AppSettings = {
  baseUrl: string;
}

const AppSettingsContext = createContext<AppSettings>({
  baseUrl: null
});

export function AppSettingsProvider({ children }: AppSettingsProviderProps) {
  const urls: AppSettings = { baseUrl: process.env.REACT_APP_API_BASE_URL };

  return (
    <AppSettingsContext.Provider value={urls}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings(): AppSettings {
  const settings = useContext(AppSettingsContext);

  if (!settings) {
    throw new Error('AppSettings is null');
  }

  return settings;
}