import './Layout.scss';

import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from '../components/auth/LogoutButton';
import NavMenu from '../components/nav/NavMenu';

export default function Layout() {
  return (
    <div className="layout-content">
      <header>
        <h1>Mất đồ</h1>
        <NavMenu>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/create">Create</NavLink>
          <LogoutButton />
        </NavMenu>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
