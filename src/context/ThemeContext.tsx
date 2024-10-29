// src/context/ThemeContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the possible theme options
export type Theme = 'light' | 'dark';

// Interface for ThemeContext state and actions
interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

// Initialize ThemeContext with undefined for better type safety
const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

// Exported ThemeProvider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Retrieve saved theme from localStorage, else use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Toggle theme and store it in localStorage
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Apply the theme to the document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the theme context
export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export ThemeContext to ensure it’s accessible if needed
export { ThemeContext };
