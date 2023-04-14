import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from '../components/auth/LogoutButton';
import NavMenu from '../components/nav/NavMenu';

import './PublicLayout.scss';
import { useFirebaseAuth } from '../contexts/FirebaseAuthContext';

export default function PublicLayout() {
  const { isAuthenticated } = useFirebaseAuth();

  return (
    <div className="public-layout-content">
      <header>
        <h1>Mất đồ</h1>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavMenu>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
