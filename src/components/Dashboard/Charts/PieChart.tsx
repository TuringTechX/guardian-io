// src/components/Charts/PieChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { sustainable: number; nonSustainable: number };
  title?: string; // Optional title for the chart
}

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartData = {
    labels: ['Sustainable', 'Non-Sustainable'],
    datasets: [
      {
        data: [data.sustainable, data.nonSustainable],
        backgroundColor: ['#34D399', '#F87171'],
        hoverBackgroundColor: ['#2DB785', '#EB5757'], // Slightly darker on hover
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = tooltipItem.label;
            const value = tooltipItem.raw;
            const total = data.sustainable + data.nonSustainable;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart w-full p-4 bg-white shadow-lg rounded-lg">
      {title && <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>}
      <Pie data={chartData} options={options} />
    </div>
  );
};
