import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LinkButton from '../components/common/LinkButton';

import './Layout.scss';

export default function Layout() {
  return (
    <div className="layout-content">
      <header>
        <h1>Mất đồ</h1>
        <nav>
          <NavLink to="/">Home</NavLink> |{' '}
          <NavLink to="/create">Create</NavLink> |{' '}
          <LinkButton>Logout</LinkButton>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
