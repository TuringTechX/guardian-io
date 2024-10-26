// src/components/ESGReporting/TrendAnalysis.tsx

import React from 'react';
import { ESGChart } from './ESGChart';
import { useTrendAnalysis } from '../../hooks/useTrendAnalysis';

export const TrendAnalysis: React.FC = () => {
  const { trendData, error } = useTrendAnalysis();

  if (error) return <div>Error loading trend data.</div>;

  return (
    <div className="trend-analysis">
      <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
      <ESGChart data={trendData} title="ESG Trend Over Time" />
    </div>
  );
};
