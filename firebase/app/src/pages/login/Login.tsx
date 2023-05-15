import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import Form, { FormField } from '../../components/form/FormOld';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';
import { useFirebaseEmailAuth } from '../../hooks/useFirebaseEmailAuth';

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data: signInCheckResult } = useSigninCheck();
  const { login } = useFirebaseEmailAuth();
  const redirectUrl = location.state?.from ?? '/dashboard';

  useEffect(() => {
    if (signInCheckResult?.signedIn) {
      navigate(redirectUrl, { replace: true });
    }
  }, [signInCheckResult?.signedIn]);

  const fields: FormField[] = [
    {
      name: 'usernameField',
      label: 'Username',
      placeholder: 'jyn@matdo.com',
      required: true,
      onChange: (value) => setUsername(value)
    },
    {
      name: 'passwordField',
      label: 'Password',
      placeholder: 'An awesomely strong password!',
      required: true,
      type: 'password',
      onChange: (value) => setPassword(value)
    }
  ];

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
      <Title>Welcome!</Title>
      <Form
        id="loginForm"
        fields={fields}
        actions={[
          {
            type: 'submit',
            text: 'Login',
            disabled: !(username && password) || status === 'loading'
          }
        ]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
