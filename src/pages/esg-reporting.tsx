// src/pages/esg-reporting.tsx

import React from 'react';
import { ESGDashboard } from '../components/ESGReporting/ESGDashboard';
import { TrendAnalysis } from '../components/ESGReporting/TrendAnalysis';
import { PredictionWidget } from '../components/ESGReporting/PredictionWidget';
import { FilterPanel } from '../components/ESGReporting/FilterPanel';
import '../styles/esg.css';

const ESGReportingPage: React.FC = () => {
  return (
    <div className="esg-reporting-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">ESG Reporting & Analytics</h1>
      <FilterPanel />
      <ESGDashboard />
      <TrendAnalysis />
      <PredictionWidget />
    </div>
  );
};

export default ESGReportingPage;
