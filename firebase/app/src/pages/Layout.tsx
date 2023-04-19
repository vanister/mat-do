import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from '../components/auth/LogoutButton';
import NavMenu from '../components/nav/NavMenu';

import './Layout.scss';

export default function Layout() {
  return (
    <div className="layout-content">
      <header>
        <h1>Mất đồ</h1>
        <div className='nav-menu'>
          <NavMenu>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/create">Create</NavLink>
            <LogoutButton />
          </NavMenu>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div >
  );
}