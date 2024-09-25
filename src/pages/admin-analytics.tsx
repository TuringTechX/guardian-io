// src/pages/admin-analytics.tsx

import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from '../components/Charts';
import { fetchCrimeAnalytics } from '../services/crimeService';

const AdminAnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    async function getAnalytics() {
      const data = await fetchCrimeAnalytics();
      setAnalyticsData(data);
    }
    getAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Wildlife Crime Analytics Dashboard</h1>
      {analyticsData && (
        <>
          <BarChart data={analyticsData.trends} title="Crime Trends Over Time" />
          <PieChart data={analyticsData.severityDistribution} title="Crime Severity Distribution" />
        </>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;
