import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Create from './components/create/Create';
import NotFound from './components/NotFound';
import Home from './components/home/Home';
import RequireAuth from './components/auth/RequireAuth';
import PublicLayout from './components/PublicLayout';
import Scan from './components/scan/Scan';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/scan" element={<Scan />} />
      </Route>
      {/* todo - require auth on everything but the scan route */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
