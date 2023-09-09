import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import { useFirebaseEmailAuth } from '../../hooks/useFirebaseEmailAuth';
import Form from '../../components/form/Form';
import FormInput from '../../components/form/FormInput';
import FormAction from '../../components/form/FormAction';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const status = await login(username, password);

    if (status.success) {
      navigate(redirectUrl);
      return;
    }

    alert(status.errorMsg);
  }

  return (
    <div className="login-page">
      <Title>Login</Title>
      <Form id="loginForm" onSubmit={handleFormSubmit}>
        <FormInput
          id="usernameField"
          label="Username"
          value={username}
          onChange={(value) => setUsername(value)}
        />
        <FormInput
          id="passwordField"
          label="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          additionalProps={{ type: 'password' }}
        />
        <FormAction
          id="loginButton"
          type="submit"
          disabled={status === 'loading'}
        >
          Login
        </FormAction>
      </Form>
    </div>
  );
}
