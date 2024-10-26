// src/components/AntiForcedLabour/RiskFactorChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';

export const RiskFactorChart: React.FC = () => {
  const data = {
    labels: ['Child Labor', 'Coercion', 'Unsafe Conditions', 'Exploitation'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ['#f87171', '#fb923c', '#fbbf24', '#34d399'],
      },
    ],
  };

  return (
    <div className="risk-factor-chart">
      <h3 className="text-xl font-bold mb-4">Forced Labour Risk Factors</h3>
      <Pie data={data} />
    </div>
  );
};
