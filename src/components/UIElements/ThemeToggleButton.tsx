// src/components/UIElements/ThemeToggleButton.tsx

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button p-2 rounded-full transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === 'light' ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-500" />}
    </button>
  );
};
