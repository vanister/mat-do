import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink, Outlet } from 'react-router-dom';
import LoginButton from '../components/auth/LoginButton';
import LogoutButton from '../components/auth/LogoutButton';
import NavMenu from '../components/nav/NavMenu';

import './PublicLayout.scss';

export default function PublicLayout() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="public-layout-content">
      <header>
        <h1>Mất đồ</h1>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {!isLoading && (isAuthenticated ? <LogoutButton /> : <LoginButton />)}
        </NavMenu>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
