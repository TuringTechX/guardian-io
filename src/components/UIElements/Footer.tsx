// src/components/Footer.tsx

import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-center p-4">
      <div className="flex justify-center space-x-6">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
          <FaTwitter className="text-2xl" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
          <FaLinkedin className="text-2xl" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">
          <FaGithub className="text-2xl" />
        </a>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-4">© 2024 Guardian.io - All rights reserved</p>
    </footer>
  );
};

export default Footer;
