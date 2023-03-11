import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LinkButton from '../common/LinkButton';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    await loginWithRedirect({
      authorizationParams: { redirect_uri: window.location.href }
    });
  };

  return <LinkButton onClick={handleLoginClick}>Login</LinkButton>;
}
