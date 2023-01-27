import React from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.scss';

export default function Layout() {
  return (
    <div className="layout-content">
      <header>
        <h1>Mất đồ</h1>
        <nav>Home | Create | logout</nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
