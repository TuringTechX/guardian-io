// src/components/Charts/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

const LineChart: React.FC<{ data: any[] }> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()), // Timestamps as labels
    datasets: [
      {
        label: 'Real-time Value',
        data: data.map((d) => d.value),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4, // Curve smoothness
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: {
      duration: 1000, // 1 second animation duration
      easing: 'easeInOutQuad', // Smooth easing
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div data-testid="line-chart">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
