import React from 'react';
import { Outlet } from 'react-router-dom';
import LoginButton from '../components/auth/LoginButton';

import './PublicLayout.scss';

export default function PublicLayout() {
  return (
    <div className="public-layout-content">
      <header>
        <h1>Mất đồ</h1>
        <nav>
          <LoginButton />
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
