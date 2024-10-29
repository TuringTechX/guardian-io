// src/components/UIElements/Sidebar.tsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaChartLine, FaCogs, FaLeaf, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip'; // Ensure Tooltip exists in the same directory or adjust the path

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', icon: <FaHome />, path: '/' },
  { title: 'Collaboration', icon: <FaUser />, path: '/collaboration' },
  { title: 'Analytics', icon: <FaChartLine />, path: '/analytics' },
  { title: 'Settings', icon: <FaCogs />, path: '/settings' },
  { title: 'Sustainability', icon: <FaLeaf />, path: '/sustainability' },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ width: isOpen ? 250 : 80 }}
      animate={{ width: isOpen ? 250 : 80 }}
      className="bg-white dark:bg-gray-800 h-screen p-4 shadow-lg overflow-hidden"
    >
      <button
        onClick={handleToggle}
        className="text-gray-700 dark:text-gray-300 mb-6 flex items-center"
      >
        {isOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        {isOpen && <span className="ml-2">Collapse</span>}
      </button>

      <nav>
        <ul>
          {menuItems.map(({ title, icon, path }) => (
            <motion.li
              key={path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`mb-4 ${
                location.pathname === path ? 'bg-blue-100 dark:bg-gray-700 rounded-md' : ''
              }`}
            >
              <Link
                to={path}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                <span className="text-lg">{icon}</span>
                {isOpen ? (
                  <span className="ml-3">{title}</span>
                ) : (
                  <Tooltip message={title} position="right" />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
