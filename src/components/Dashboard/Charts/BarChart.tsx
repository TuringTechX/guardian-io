// src/components/Charts/BarChart.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: number[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div className="flex space-x-4">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          className="bg-blue-500 w-12"
          transition={{ duration: 0.6, delay: index * 0.2 }}
        />
      ))}
    </div>
  );
};
