import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Create from './components/create/Create';
import NotFound from './components/NotFound';
import Home from './components/home/Home';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
