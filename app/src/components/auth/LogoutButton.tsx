import React from 'react';
import LinkButton from '../common/LinkButton';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';

export default function LogoutButton() {
  const { logout } = useFirebaseAuth();

  async function handleLoginClick(e: React.MouseEvent) {
    e.preventDefault();

    await logout();
  }

  return <LinkButton onClick={handleLoginClick}>Logout</LinkButton>;
}
