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

// src/pages/admin-analytics.tsx
import React, { useEffect, useState } from 'react';
import { BarChart, PieChart } from '../components/Charts';
import { fetchCrimeAnalytics } from '../services/adminService';

const AdminAnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCrimeAnalytics();
      setAnalyticsData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Wildlife Crime Analytics Dashboard</h1>
      {analyticsData && (
        <>
          <BarChart data={analyticsData.trends} title="Crime Trends Over Time" />
          <PieChart data={analyticsData.severityDistribution} title="Severity Distribution" />
          <BarChart data={analyticsData.regionalDistribution} title="Regional Crime Hotspots" />
          <button onClick={() => exportData(analyticsData)} className="mt-6 bg-blue-600 text-white p-3 rounded">Export Report</button>
        </>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;
