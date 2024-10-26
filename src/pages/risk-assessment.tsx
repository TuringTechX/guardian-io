// src/pages/risk-assessment.tsx

import React, { useEffect, useState } from 'react';
import RiskMatrixChart from '../components/RiskAssessment/RiskMatrixChart';
import SupplierRiskDetails from '../components/RiskAssessment/SupplierRiskDetails';
import { SupplierRiskScore } from '../types/riskAssessmentTypes';
import { useRiskAssessment } from '../hooks/useRiskAssessment';
import { calculateOverallRiskScore } from '../utils/riskCalculator';

const RiskAssessmentPage: React.FC = () => {
  const { supplierRisks, loadSupplierRisks } = useRiskAssessment();
  const [detailedSupplier, setDetailedSupplier] = useState<SupplierRiskScore | null>(null);

  useEffect(() => {
    loadSupplierRisks();
  }, []);

  const handleSupplierClick = (supplier: SupplierRiskScore) => {
    const overallRiskScore = calculateOverallRiskScore(supplier);
    setDetailedSupplier({ ...supplier, overallRiskScore });
  };

  return (
    <div className="risk-assessment-page">
      <h1>Risk Assessment</h1>
      <RiskMatrixChart
        positions={supplierRisks.map(supplier => ({
          supplierId: supplier.supplierId,
          riskLevel: determineRiskLevel(supplier.overallRiskScore),
          positionX: Math.random() * 100,
          positionY: Math.random() * 100,
        }))}
      />
      {detailedSupplier && <SupplierRiskDetails supplier={detailedSupplier} />}
    </div>
  );
};

export default RiskAssessmentPage;
