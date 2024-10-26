// src/components/EthicalSourcing/RecommendationEngine.tsx

import React from 'react';
import { Recommendation } from '../../types/ethicalSourcingTypes';

interface RecommendationEngineProps {
  recommendations: Recommendation[];
}

export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ recommendations }) => (
  <div className="recommendation-engine">
    <h2 className="text-2xl font-semibold mb-4">Recommended Suppliers</h2>
    <ul>
      {recommendations.map(rec => (
        <li key={rec.id} className="recommendation-item">
          {rec.name} - {rec.recommendationScore}
        </li>
      ))}
    </ul>
  </div>
);
