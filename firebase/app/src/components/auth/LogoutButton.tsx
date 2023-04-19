import React from 'react';
import LinkButton from '../common/LinkButton';
import { useFirebaseEmailAuth } from '../../hooks/useFirebaseEmailAuth';

export default function LogoutButton() {
  const { logout } = useFirebaseEmailAuth();

  async function handleLoginClick(e: React.MouseEvent) {
    e.preventDefault();

    await logout();
  }

  return <LinkButton onClick={handleLoginClick}>Logout</LinkButton>;
}
