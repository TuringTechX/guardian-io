// src/components/ProgressBar.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  max?: number;         // Maximum progress value (default 100)
  label?: string;       // Optional label to show progress
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, max = 100, label }) => {
  // Clamp progress between 0 and max
  const clampedProgress = Math.min(Math.max(progress, 0), max);
  const progressPercentage = (clampedProgress / max) * 100;

  return (
    <div className="w-full">
      {/* Optional label for accessibility and clarity */}
      {label && <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>}

      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${progressPercentage}%` }} 
          className="bg-blue-600 h-4 rounded-full"
          transition={{ duration: 1 }}
        />
      </div>

      {/* Display progress as percentage */}
      <div className="text-sm font-medium text-gray-600 mt-1">
        {progressPercentage.toFixed(0)}%
      </div>
    </div>
  );
};

// Default prop values
ProgressBar.defaultProps = {
  max: 100,
};

export default ProgressBar;
