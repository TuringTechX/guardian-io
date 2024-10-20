// src/components/ProgressBar.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${progress}%` }} 
        className="bg-blue-600 h-4 rounded-full"
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default ProgressBar;
