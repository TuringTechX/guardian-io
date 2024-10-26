// src/components/EthicalSourcing/RiskAssessmentCard.tsx

import React from 'react';
import { Supplier } from '../../types/ethicalSourcingTypes';
import { supplierRiskCalculator } from '../../utils/supplierRiskCalculator';

interface RiskAssessmentCardProps {
  supplier: Supplier;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ supplier }) => {
  const riskScore = supplierRiskCalculator(supplier);

  return (
    <div className="risk-card border p-4 rounded">
      <h4>{supplier.name}</h4>
      <p>Risk Score: {riskScore}</p>
      <p>Risk Category: {riskScore > 75 ? 'High' : riskScore > 50 ? 'Medium' : 'Low'}</p>
    </div>
  );
};
