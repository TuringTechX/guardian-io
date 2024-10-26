// src/hooks/useLogin.ts

import { useState } from 'react';
import { authService } from '../services/authService';
import { mfaService } from '../services/mfaService';

export const useLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      if (response.requiresMFA) {
        setRequiresMFA(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError('Login failed, please try again.');
    }
  };

  const verifyMFA = async (otp: string) => {
    try {
      const response = await mfaService.verifyOTP(otp);
      if (response.success) {
        setIsAuthenticated(true);
        setRequiresMFA(false);
      }
    } catch {
      setError('Invalid OTP, please try again.');
    }
  };

  return { isAuthenticated, requiresMFA, login, verifyMFA, error };
};
