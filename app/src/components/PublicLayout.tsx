import React from 'react';
import { Outlet } from 'react-router-dom';
import LinkButton from './common/LinkButton';

import './PublicLayout.scss';

export default function PublicLayout() {
  return (
    <div className="public-layout-content">
      <header>
        <h1>Mất đồ</h1>
        <nav>
          {/* auth links */}
          {/* <NavLink to="/">Home</NavLink> |{' '}
          <NavLink to="/create">Create</NavLink> |{' '} */}
          <LinkButton>Login</LinkButton>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
