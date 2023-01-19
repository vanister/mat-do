import React from 'react';
import { AuthContext } from '../components/auth/AuthContext';

export function useAuth() {
  return React.useContext(AuthContext);
}
