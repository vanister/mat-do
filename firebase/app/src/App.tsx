import React, { ReactNode, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Create from './pages/create/Create';
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import RequireAuth from './components/auth/RequireAuth';
import PublicLayout from './pages/PublicLayout';
import Scan from './pages/scan/Scan';
import Dashboard from './pages/dashboard/Dashboard';
import Thankyou from './pages/thankyou/Thankyou';
import ItemDetails from './pages/itemdetails/ItemDetails';
import Login from './pages/login/Login';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { appSettings } from './appSettings';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Error from './components/error/Error';

export default function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  useEffect(() => {
    if (!appSettings.isProduction) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
  }, [auth]);

  function handleErrorBoundaryFallback({ error }: FallbackProps): ReactNode {
    return <Error />;
  }

  return (
    <AuthProvider sdk={auth}>
      <ErrorBoundary fallbackRender={handleErrorBoundaryFallback}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scan/:id" element={<Scan />} />
            <Route path="/thankyou" element={<Thankyou />} />
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
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
}
