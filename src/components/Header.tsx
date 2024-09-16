// src/components/Header.tsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-semibold text-gray-800 dark:text-white">Guardian.io</Link>
        <div className="relative">
          <input type="text" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded" placeholder="Search..." />
          <FaSearch className="absolute right-2 top-3 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-800 dark:text-white cursor-pointer" />
        <button onClick={toggleTheme} className="p-2 rounded-md text-gray-800 dark:text-white">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <FaUserCircle className="text-gray-800 dark:text-white text-3xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
