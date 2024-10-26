// src/components/RiskAssessment/RiskMatrixChart.tsx

import React from 'react';
import { RiskMatrixPosition } from '../../types/riskAssessmentTypes';

interface RiskMatrixChartProps {
  positions: RiskMatrixPosition[];
}

const RiskMatrixChart: React.FC<RiskMatrixChartProps> = ({ positions }) => (
  <div className="risk-matrix">
    {positions.map(({ supplierId, riskLevel, positionX, positionY }) => (
      <div
        key={supplierId}
        style={{ left: positionX, top: positionY }}
        className={`risk-badge ${riskLevel.toLowerCase()}`}
        title={`Supplier: ${supplierId}, Risk Level: ${riskLevel}`}
      />
    ))}
  </div>
);

export default RiskMatrixChart;
