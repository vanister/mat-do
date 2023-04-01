import { useEffect, useState } from 'react';
import { User, useAuth0 } from '@auth0/auth0-react';

export type UserAccessToken = {
  user: User;
  accessToken: string;
};

export function useUserAccessToken(): UserAccessToken {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      setAccessToken(token);
    });
  }, [getAccessTokenSilently]);

  return { user, accessToken };
}
