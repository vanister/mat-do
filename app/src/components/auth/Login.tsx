import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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
      <h2>Login</h2>
      <main className="login-content">
        <form
          className="login-form"
          onSubmit={(e) => handleSubmit(e, username, password)}
        >
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </main>
    </section>
  );
}
