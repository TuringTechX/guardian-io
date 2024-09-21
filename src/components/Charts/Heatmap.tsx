// src/components/Charts/Heatmap.tsx

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface HeatmapProps {
  data: { x: number; y: number; r: number }[];  // The heatmap's data points (x, y, radius)
}

export const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Compliance Levels',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Suppliers',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Compliance Score',
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};
