import { useContext } from 'react';
import { AppSettings, AppSettingsContext } from '../AppSettingsContext';

export function useAppSettings(): AppSettings {
  const settings = useContext(AppSettingsContext);

  if (!settings) {
    throw new Error('AppSettings is null');
  }

  return settings;
}
