// src/components/UIElements/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext'; // Use the custom hook for safe access

const Header: React.FC = () => {
  const { toggleTheme, theme } = useTheme(); // Access theme and toggle directly

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      {/* Left: Logo and Search */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-semibold text-gray-800 dark:text-white">
          Guardian.io
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            aria-label="Search"
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 pl-8 rounded focus:outline-none"
            placeholder="Search..."
          />
          <FaSearch className="absolute left-2 top-3 text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Right: Notifications, Theme Toggle, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications Icon with Tooltip */}
        <div className="relative group cursor-pointer">
          <FaBell className="text-gray-800 dark:text-white" aria-label="Notifications" />
          <span className="absolute right-0 -top-2 w-2 h-2 rounded-full bg-red-500" />
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded p-1">
            No new notifications
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-md text-gray-800 dark:text-white"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Profile Icon */}
        <FaUserCircle className="text-gray-800 dark:text-white text-3xl cursor-pointer" aria-label="User Profile" />
      </div>
    </header>
  );
};

export default Header;
