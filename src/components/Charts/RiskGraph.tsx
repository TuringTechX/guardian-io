// src/components/Charts/RiskGraph.tsx

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';

interface RiskGraphProps {
  riskData: { date: string; riskLevel: number }[];
}

export const RiskGraph: React.FC<RiskGraphProps> = ({ riskData }) => {
  const [selectedRisk, setSelectedRisk] = useState<{ date: string; riskLevel: number } | null>(null);

  const chartData = {
    labels: riskData.map((item) => item.date),
    datasets: [
      {
        label: 'Risk Levels Over Time',
        data: riskData.map((item) => item.riskLevel),
        borderColor: 'rgba(54, 162, 235, 0.8)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    onClick: (event: any, activeElements: any) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        const clickedData = riskData[index];
        setSelectedRisk(clickedData);  // Set the selected risk for drill-down
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Risk Level',
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
      {selectedRisk && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Detailed Risk Information</h3>
          <p>Date: {selectedRisk.date}</p>
          <p>Risk Level: {selectedRisk.riskLevel}</p>
          {/* Add more detailed drill-down data here */}
        </div>
      )}
    </div>
  );
};
