import { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../contexts/FirebaseAuthContext';
import { User } from 'firebase/auth';

export type UserAccessToken = {
  user: User;
  accessToken: string;
};

export function useUserAccessToken(): UserAccessToken {
  const { user } = useFirebaseAuth();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (!user) {
      return;
    }

    user
      .getIdToken()
      .then((token) => setAccessToken(token))
      .catch((error) => {
        console.error(error);
        setAccessToken(null);

        throw error;
      });
  }, [user]);

  return { user, accessToken };
}
