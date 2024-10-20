// src/components/Sidebar.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaChartLine, FaCogs, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div 
      initial={{ width: isOpen ? 250 : 80 }} 
      animate={{ width: isOpen ? 250 : 80 }} 
      className="bg-white dark:bg-gray-800 h-screen p-4 overflow-hidden"
    >
      <button 
        onClick={handleToggle} 
        className="text-gray-700 dark:text-gray-300 mb-6"
      >
        {isOpen ? "Collapse" : "Expand"}
      </button>
      <nav>
        <ul>
          <motion.li 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            whileHover={{ scale: 1.1 }}  // Scale on hover
            transition={{ type: 'spring', stiffness: 300 }}
            className="mb-4"
          >
            <Link to="/" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <FaHome className="mr-3" /> {isOpen && "Dashboard"}
            </Link>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            whileHover={{ scale: 1.1 }}  // Scale on hover
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/collaboration" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <FaUser className="mr-3" /> {isOpen && "Collaboration"}
            </Link>
          </motion.li>
          {/* Add similar effects to other links */}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
