import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from '../components/auth/LogoutButton';
import NavMenu from '../components/nav/NavMenu';
import { useSigninCheck } from 'reactfire';

import './PublicLayout.scss';

export default function PublicLayout() {
  const { data } = useSigninCheck();

  return (
    <div className="public-layout-content">
      <header>
        <h1>Mất đồ</h1>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {!data?.signedIn ? <NavLink to="/login">Login</NavLink> : <LogoutButton />}
        </NavMenu>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
