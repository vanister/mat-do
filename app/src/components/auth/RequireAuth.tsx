import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading';

export type RequireAuthProps = {
  children: React.ReactElement;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    loginWithRedirect({
      authorizationParams: { redirect_uri: window.location.href },
    });

    return <Loading />;
  }

  return children;
}
