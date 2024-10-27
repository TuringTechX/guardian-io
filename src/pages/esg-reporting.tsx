// src/pages/esg-reporting.tsx

import React, { useEffect } from 'react';
import { useESGContext } from '../context/ESGContext';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import NotificationBanner from '../components/UIElements/NotificationBanner';
import { ESGDashboard } from '../components/ESGReporting/ESGDashboard';
import { TrendAnalysis } from '../components/ESGReporting/TrendAnalysis';
import { PredictionWidget } from '../components/ESGReporting/PredictionWidget';
import  FilterPanel  from '../components/ESGReporting/FilterPanel';
import '../styles/esg.css';
import { FilterOptions } from '@/types/searchTypes';

const ESGReportingPage: React.FC = () => {
  const { esgMetrics, isLoading, error, isConnected, fetchESGMetrics } = useESGContext();

  useEffect(() => {
    fetchESGMetrics();
  }, [fetchESGMetrics]);

  if (isLoading) {
    return <LoadingSpinner message="Loading ESG data..." />;
  }

  return (
    <div className="esg-reporting-page container mx-auto py-8">
      {/* Notification Banner for Connection Status */}
      {error && <NotificationBanner message={error} position="bottom" />}
      {!error && !isConnected && (
        <NotificationBanner
          message="You are currently offline. Displaying cached data."
          position="bottom"
          theme="dark"
        />
      )}
      <h1 className="text-3xl font-bold mb-6">ESG Reporting & Analytics</h1>
      
      {/* Interactive Filter Panel */}
      <FilterPanel onFilterChange={function (filters: FilterOptions): void {
        throw new Error('Function not implemented.');
      } } />
      
      {/* Main Dashboard displaying ESG Metrics */}
      <ESGDashboard data={esgMetrics} />

      {/* Real-time Trend Analysis */}
      <TrendAnalysis data={esgMetrics?.trends} />

      {/* Predictive Analytics Widget */}
      <PredictionWidget data={esgMetrics?.predictions} />
    </div>
  );
};

export default ESGReportingPage;
