// src/components/Login/LoginForm.tsx

import React, { useState } from 'react';
import { RememberMeToggle } from './RememberMeToggle';
import { SocialLoginButtons } from './SocialLoginButtons';
import { PasswordResetLink } from './PasswordResetLink';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onCaptchaRequired: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCaptchaRequired }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      onCaptchaRequired();
    } else {
      onLogin(username, password);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RememberMeToggle />
      <button type="submit" className="btn-primary">Login</button>
      <SocialLoginButtons />
      <PasswordResetLink />
    </form>
  );
};
