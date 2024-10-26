// src/pages/login.tsx

import React, { useState } from 'react';
import { LoginForm } from '../components/Login/LoginForm';
import { OTPInput } from '../components/Login/OTPInput';
import { Captcha } from '../components/Login/Captcha';
import { useLogin } from '../hooks/useLogin';
import { BiometricLogin } from '../components/Login/BiometricLogin';
import '../styles/login.css';

const LoginPage: React.FC = () => {
  const { isAuthenticated, requiresMFA, login, verifyMFA, error } = useLogin();
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleCaptchaVerification = () => setShowCaptcha(true);

  return (
    <div className="login-page container mx-auto flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-6">Guardian-IO Login</h1>
      {error && <ErrorAlert message={error} />}
      {isAuthenticated ? (
        <p>Welcome back! You’re now logged in.</p>
      ) : (
        <div className="login-container">
          <LoginForm onLogin={login} onCaptchaRequired={handleCaptchaVerification} />
          {requiresMFA && <OTPInput onVerify={verifyMFA} />}
          {showCaptcha && <Captcha />}
          <BiometricLogin />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
