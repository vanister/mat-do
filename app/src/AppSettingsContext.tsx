import React, { createContext, ReactElement } from 'react';

export type AppSettingsProviderProps = {
  children: ReactElement
}

export type AppSettings = {
  baseUrl: string;
}

export const AppSettingsContext = createContext<AppSettings>({
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