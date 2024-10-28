// src/pages/admin-analytics.tsx

import React, { useEffect, useState } from 'react';
import { BarChart } from '../components/Dashboard/Charts/BarChart';
import { PieChart } from '../components/Dashboard/Charts/PieChart';
import { fetchCrimeAnalytics } from '../services/adminService';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import NotificationBanner from '../components/UIElements/NotificationBanner';
import { CrimeAnalytics, SeverityDistribution } from '../types/analyticsTypes';

const AdminAnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<CrimeAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data and handle loading/error state
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCrimeAnalytics();
        setAnalyticsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to format severity data for the PieChart component
  const formatSeverityData = (severityData: SeverityDistribution[]) => ({
    sustainable: severityData.find(item => item.severity === 'Low')?.percentage || 0,
    nonSustainable: severityData.find(item => item.severity === 'High')?.percentage || 0,
  });

  // Helper function to extract numeric data from trends for BarChart
  const formatTrendData = () => analyticsData?.trends.map(trend => trend.count) || [];

  // Helper function to extract numeric data from regional distribution for BarChart
  const formatRegionalData = () => analyticsData?.regionalDistribution.map(region => region.incidentCount) || [];

  // Export data as JSON file
  const exportData = (data: CrimeAnalytics) => {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'crime-analytics-report.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export data. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading analytics..." />;
  if (error) return <NotificationBanner message={error} position="top" theme="dark" />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Wildlife Crime Analytics Dashboard</h1>
      {analyticsData && (
        <>
          <BarChart data={formatTrendData()} title="Crime Trends Over Time" />
          <PieChart data={formatSeverityData(analyticsData.severityDistribution)} title="Severity Distribution" />
          <BarChart data={formatRegionalData()} title="Regional Crime Hotspots" />
          <button
            onClick={() => exportData(analyticsData)}
            className="mt-6 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Export Report
          </button>
        </>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;
