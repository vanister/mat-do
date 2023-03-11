import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LinkButton from '../common/LinkButton';

export default function LogoutButton() {
  const { logout } = useAuth0();

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    logout();
  };

  return <LinkButton onClick={handleLoginClick}>Logout</LinkButton>;
}
