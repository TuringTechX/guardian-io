// src/components/Collaboration/CollaborationAnalytics.tsx

import React, { useState, useEffect } from 'react';
import { PieChart } from '../components/Dashboard/Charts/PieChart';
import  BarChart from '../components/Dashboard/Charts/BarChart';
import { fetchCollaborationData } from '../../services/collaborationService';
import LineChart from '../Dashboard/Charts/LineChart';
// import { motion } from 'framer-motion';

interface CollaborationMetrics {
  week: string;
  engagementScore: number;
  taskCompletionRate: number;
  activeUsers: number;
}

const CollaborationAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<CollaborationMetrics[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('engagementScore');
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCollaborationData();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError('Failed to load collaboration data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="collaboration-analytics p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Collaboration Analytics</h2>

      {/* Error Notification */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Metric Selector */}
      <div className="flex justify-around mb-6">
        <button
          onClick={() => handleMetricChange('engagementScore')}
          className={`px-4 py-2 ${selectedMetric === 'engagementScore' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          Engagement Score
        </button>
        <button
          onClick={() => handleMetricChange('taskCompletionRate')}
          className={`px-4 py-2 ${selectedMetric === 'taskCompletionRate' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          Task Completion
        </button>
        <button
          onClick={() => handleMetricChange('activeUsers')}
          className={`px-4 py-2 ${selectedMetric === 'activeUsers' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          Active Users
        </button>
      </div>

      {/* Analytics Chart */}
      <div className="analytics-chart">
        {selectedMetric === 'engagementScore' && (
          <BarChart
            data={metrics.map((metric) => ({ label: metric.week, value: metric.engagementScore }))}
            title="Weekly Engagement Score"
          />
        )}
        {selectedMetric === 'taskCompletionRate' && (
          <LineChart
            data={metrics.map((metric) => ({ label: metric.week, value: metric.taskCompletionRate }))}
            title="Weekly Task Completion Rate"
          />
        )}
        {selectedMetric === 'activeUsers' && (
          <BarChart
            data={metrics.map((metric) => ({ label: metric.week, value: metric.activeUsers }))}
            title="Weekly Active Users"
          />
        )}
      </div>
    </div>
  );
};

export default CollaborationAnalytics;
