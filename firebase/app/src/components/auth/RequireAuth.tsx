import { useEffect } from 'react';
import Loading from '../loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

export type RequireAuthProps = {
  children: React.ReactElement;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data } = useSigninCheck();
  const isSignedIn = !!data?.signedIn;

  useEffect(() => {
    if (status !== 'loading' && !isSignedIn) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isSignedIn, location.pathname, navigate, status]);

  if (!isSignedIn || status === 'loading') {
    return <Loading />;
  }

  return children;
}
