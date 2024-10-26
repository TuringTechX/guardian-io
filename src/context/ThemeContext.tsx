// src/context/ThemeContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the possible theme options
export type Theme = 'light' | 'dark';

// Context state and actions interface
interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

// Initialize context with default values
const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

// Provider component with theme toggling and state persistence
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Toggle theme and persist in localStorage
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Update HTML document class based on theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
