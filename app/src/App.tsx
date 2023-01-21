import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Create from './components/create/Create';
import NotFound from './components/NotFound';
import Home from './components/home/Home';
import RequireAuth from './components/auth/RequireAuth';

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
