import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Create from './pages/create/Create';
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import RequireAuth from './components/auth/RequireAuth';
import PublicLayout from './pages/PublicLayout';
import Scan from './pages/scan/Scan';
import Dashboard from './pages/dashboard/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/scan/:id" element={<Scan />} />
      </Route>
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
