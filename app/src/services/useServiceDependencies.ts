import { useUserAccessToken } from '../hooks/useUserAccessToken';

/** A hook that returns common dependencies between services. */
export function useServiceDeps() {
  const { user, accessToken } = useUserAccessToken();

  return { accessToken, user };
}
