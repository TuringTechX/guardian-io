// src/components/Dashboard/Charts/BarChart.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: number[];
  labels?: string[]; // Optional labels for each data point
  title?: string;    // Optional chart title
  color?: string;    // Customizable bar color
  barWidth?: string; // Customizable bar width
}

export const BarChart: React.FC<BarChartProps> = ({ data, labels = [], title, color = 'bg-blue-500', barWidth = 'w-12' }) => {
  return (
    <div className="bar-chart w-full p-4 bg-white shadow-lg rounded-lg">
      {/* Title */}
      {title && <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">{title}</h2>}

      {/* Bars Container */}
      <div className="flex space-x-4 justify-center items-end h-64">
        {data.map((value, index) => (
          <motion.div
            key={index}
            className={`relative ${color} ${barWidth} rounded-t-lg`}
            initial={{ height: 0 }}
            animate={{ height: `${value}%` }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded opacity-0 hover:opacity-100">
              {value}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* X-Axis Labels */}
      <div className="flex space-x-4 justify-center mt-2">
        {labels.length > 0
          ? labels.map((label, index) => (
              <span key={index} className="text-sm text-gray-600 w-12 text-center truncate">
                {label}
              </span>
            ))
          : data.map((_, index) => (
              <span key={index} className="text-sm text-gray-600 w-12 text-center">
                {`Data ${index + 1}`}
              </span>
            ))}
      </div>
    </div>
  );
};

export default BarChart;
