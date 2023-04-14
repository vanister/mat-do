import React, { useEffect } from 'react';
import Loading from '../loading/Loading';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export type RequireAuthProps = {
  children: React.ReactElement;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useFirebaseAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || isLoading) {
    return <Loading />;
  }

  return children;
}
