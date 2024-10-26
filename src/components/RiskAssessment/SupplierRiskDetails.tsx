// src/components/RiskAssessment/SupplierRiskDetails.tsx

import React from 'react';
import { SupplierRiskScore } from '../../types/riskAssessmentTypes';
import RiskLevelBadge from './RiskLevelBadge';

interface SupplierRiskDetailsProps {
  supplier: SupplierRiskScore;
}

const SupplierRiskDetails: React.FC<SupplierRiskDetailsProps> = ({ supplier }) => (
  <div className="supplier-risk-details">
    <h3>{supplier.name}</h3>
    <p>Environmental Score: {supplier.environmentalScore}</p>
    <p>Labor Compliance Score: {supplier.laborComplianceScore}</p>
    <p>Forced Labor Risk: {supplier.forcedLaborRisk}</p>
    <RiskLevelBadge riskLevel={supplier.overallRiskScore} />
  </div>
);

export default SupplierRiskDetails;
