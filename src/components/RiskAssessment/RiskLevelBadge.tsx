// src/components/RiskAssessment/RiskLevelBadge.tsx

import React from 'react';
import { determineRiskLevel } from '../../utils/riskCalculator';

interface RiskLevelBadgeProps {
  riskScore: number;
}

const RiskLevelBadge: React.FC<RiskLevelBadgeProps> = ({ riskScore }) => {
  const riskLevel = determineRiskLevel(riskScore);
  return <span className={`badge ${riskLevel.toLowerCase()}`}>{riskLevel}</span>;
};

export default RiskLevelBadge;
