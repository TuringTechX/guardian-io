// src/context/AuthContext.tsx

import React, { createContext, useState, ReactNode, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { UserRole, AuthContextType, User } from '../types/authTypes';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const checkSession = useCallback(() => {
    const savedUser = localStorage.getItem('guardianUser');
    const savedToken = localStorage.getItem('authToken') || '';  // Fallback to an empty string
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user, token, refreshToken } = await authService.login(email, password);
      setUser(user);
      localStorage.setItem('guardianUser', JSON.stringify(user));
      localStorage.setItem('authToken', token || '');        // Fallback to an empty string
      localStorage.setItem('refreshToken', refreshToken || ''); // Fallback to an empty string
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('guardianUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    authService.logout();
    navigate('/login');
  }, [navigate]);

  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  const refreshToken = useCallback(async () => {
    try {
      const newToken = await authService.refreshToken();
      localStorage.setItem('authToken', newToken || '');  // Fallback to an empty string
    } catch (err) {
      console.error('Failed to refresh token:', err);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const intervalId = setInterval(refreshToken, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [refreshToken]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, 30 * 60 * 1000);
    };

    window.addEventListener('click', resetTimeout);
    window.addEventListener('keypress', resetTimeout);
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', resetTimeout);
      window.removeEventListener('keypress', resetTimeout);
    };
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        hasRole,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
