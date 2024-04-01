import './Login.scss';

import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import Title from '../../components/Title';
import { useFirebaseEmailAuth } from '../../hooks/useFirebaseEmailAuth';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';
import { useStateObject } from '../../hooks/useStateObject';

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const [state, setState] = useStateObject<LoginForm>({ username: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data: signInCheckResult } = useSigninCheck();
  const { login } = useFirebaseEmailAuth();
  const redirectUrl = location.state?.from ?? '/dashboard';

  useEffect(() => {
    if (signInCheckResult?.signedIn) {
      navigate(redirectUrl, { replace: true });
    }
  }, [navigate, redirectUrl, signInCheckResult?.signedIn]);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const status = await login(state.username, state.password);

      if (status.success) {
        navigate(redirectUrl);
        return;
      }

      alert(status.errorMsg);
    },
    [login, navigate, redirectUrl, state]
  );

  return (
    <section className="login-page">
      <Title>Login</Title>
      <Form id="loginForm" onSubmit={handleFormSubmit}>
        <FormInput
          id="usernameField"
          label="Username"
          value={state.username}
          onChange={(value) => setState({ username: value })}
        />
        <FormInput
          id="passwordField"
          label="Password"
          value={state.password}
          onChange={(value) => setState({ password: value })}
          additionalProps={{ type: 'password' }}
        />
        <FormAction id="loginButton" type="submit" disabled={status === 'loading'}>
          Login
        </FormAction>
      </Form>
    </section>
  );
}
