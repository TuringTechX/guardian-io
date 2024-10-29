// src/components/Sustainability/CarbonFootprintGraph.tsx

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CarbonDataPoint } from '../../types/sustainabilityTypes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CarbonFootprintGraphProps {
  data: CarbonDataPoint[];
  title?: string;
}

export const CarbonFootprintGraph: React.FC<CarbonFootprintGraphProps> = ({ data, title = "Carbon Footprint Overview" }) => {
  // Process data for chart input, calculating key stats like max, min, and average for annotations
  const processedData = useMemo(() => {
    const labels = data.map((point) => point.label);
    const values = data.map((point) => point.value);

    // Calculate peaks and average for insights
    const max = Math.max(...values);
    const min = Math.min(...values);
    const average = values.reduce((acc, val) => acc + val, 0) / values.length;

    return { labels, values, max, min, average };
  }, [data]);

  // Configuration for the chart
  const chartData = {
    labels: processedData.labels,
    datasets: [
      {
        label: 'Carbon Footprint (kg CO2)',
        data: processedData.values,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' as const },
      tooltip: {
        callbacks: {
          label: (context: any) => `Carbon: ${context.raw} kg CO2`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: {
        title: { display: true, text: 'kg CO2' },
        beginAtZero: true,
        suggestedMax: processedData.max + 10,  // Extra space for peak visualization
      },
    },
  };

  return (
    <div className="carbon-footprint-graph">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Line data={chartData} options={options} />
      <div className="stats-summary mt-4">
        <p>Peak Emission: {processedData.max} kg CO2</p>
        <p>Lowest Emission: {processedData.min} kg CO2</p>
        <p>Average Emission: {processedData.average.toFixed(2)} kg CO2</p>
      </div>
    </div>
  );
};
