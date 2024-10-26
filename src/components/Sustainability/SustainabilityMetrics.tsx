// src/components/Sustainability/SustainabilityMetrics.tsx

import React from 'react';
import { Tooltip } from './Tooltip';
import { fetchSustainabilityMetrics } from '../../services/sustainabilityService';
import { Metric } from '../../types/sustainabilityTypes';
import '../styles/sustainability.css';

export const SustainabilityMetrics: React.FC = () => {
  const [metrics, setMetrics] = React.useState<Metric[]>([]);

  React.useEffect(() => {
    fetchSustainabilityMetrics().then(setMetrics);
  }, []);

  return (
    <div className="sustainability-metrics grid grid-cols-2 gap-4 mb-8">
      {metrics.map((metric) => (
        <div key={metric.id} className="metric-card">
          <h3 className="text-2xl font-semibold">{metric.name}</h3>
          <p>{metric.value}</p>
          <Tooltip content={metric.description} />
        </div>
      ))}
    </div>
  );
};
