// src/components/Charts/PieChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  data: { sustainable: number; nonSustainable: number };
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Sustainable', 'Non-Sustainable'],
    datasets: [
      {
        data: [data.sustainable, data.nonSustainable],
        backgroundColor: ['#34D399', '#F87171'],
      },
    ],
  };

  return <Pie data={chartData} />;
};
