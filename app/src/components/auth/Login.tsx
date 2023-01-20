import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Title from '../Title';

import './Login.scss';

export default function Login() {
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const { signin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const to = location.state?.from?.pathname || '/';

  const handleSubmit = async (
    event: React.FormEvent,
    un: string,
    pw: string
  ) => {
    event.preventDefault();

    await signin(un, pw);
    navigate(to, { replace: true });
  };

  return (
    <section className="login">
      <Title>Login</Title>
      <main className="login-content">
        <form
          className="login-form"
          onSubmit={(e) => handleSubmit(e, username, password)}
        >
          <label aria-label="Username">
            <input
              placeholder="Username"
              className="login-field"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <label aria-label="Password">
            <input
              placeholder="Password"
              className="login-field"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button className="login-submit-button" type="submit">
            Login
          </button>
        </form>
      </main>
    </section>
  );
}
