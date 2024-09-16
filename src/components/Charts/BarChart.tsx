// src/components/Charts/BarChart.tsx

import React from 'react';
import { motion } from 'framer-motion';

const BarChart = () => {
  const chartData = [30, 50, 70, 40]; // Example data

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">Bar Chart</h2>
      <div className="flex space-x-4">
        {chartData.map((value, index) => (
          <motion.div 
            key={index}
            initial={{ height: 0 }} 
            animate={{ height: `${value}%` }} 
            className="bg-blue-500 w-10"
            transition={{ duration: 0.6, delay: index * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default BarChart;
