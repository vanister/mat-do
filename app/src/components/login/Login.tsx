import React, { useEffect, useMemo, useState } from 'react';
import Title from '../Title';
import Form, { FormField } from '../form/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, login } = useFirebaseAuth();
  const redirectUrl = location.state?.from ?? '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated]);

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
            disabled: !(username && password) || isLoading
          }
        ]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
