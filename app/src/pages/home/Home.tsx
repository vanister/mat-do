import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Title from '../../components/Title';

import './Home.scss';

export default function Home() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="home-page">
      <Title>Home</Title>
      <p>
        TODO: explain the benefits of creating a an account to generate qr codes
        to help track your things

        <button onClick={() => loginWithRedirect()}>Login</button>

        <button onClick={() => logout()}>Logout</button>
      </p>
      <p>
        Is Authenticated:
        <code>{`${isAuthenticated}`}</code>
      </p>
      <p>
        User:
        <code>
          {JSON.stringify(user)}
        </code>
      </p>

    </div>
  );
}
