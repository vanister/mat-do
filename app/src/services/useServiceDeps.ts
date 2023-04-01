import { useAppSettings } from '../hooks/useAppSettings';
import { useUserAccessToken } from '../hooks/useUserAccessToken';

export function useServiceDeps() {
  const { baseUrl } = useAppSettings();
  const { user, accessToken } = useUserAccessToken();

  return { accessToken, baseUrl, user };
}
