import React from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.scss';

export default function Layout() {
  return (
    <div className="layout-content">
      <header>
        <h1>Main Layout Header</h1>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
