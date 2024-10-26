// src/components/ESGReporting/PredictionWidget.tsx

import React from 'react';

interface PredictionWidgetProps {
  prediction: number;
}

export const PredictionWidget: React.FC<PredictionWidgetProps> = ({ prediction }) => (
  <div className="prediction-widget bg-gray-100 p-4 rounded shadow-md">
    <h3 className="font-semibold text-lg">Future ESG Prediction</h3>
    <p className="text-2xl text-green-600">{prediction}% Compliance</p>
  </div>
);
