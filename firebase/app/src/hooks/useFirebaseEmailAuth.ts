import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';

export type AuthStatus = {
  user?: User;
  success: boolean;
  errorMsg?: string;
  errorCode?: string;
};

export function useFirebaseEmailAuth() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function login(
    username: string,
    password: string
  ): Promise<AuthStatus> {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      return { success: true, user };
    } catch (error) {
      console.error(error);
      return { success: false, errorCode: error.code, errorMsg: error.message };
    }
  }

  async function logout(redirectUrl = '/dashboard'): Promise<void> {
    try {
      await signOut(auth);

      navigate(redirectUrl, { replace: true });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
    }
  }

  return { login, logout };
}
