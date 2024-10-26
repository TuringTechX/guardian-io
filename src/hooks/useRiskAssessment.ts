// src/hooks/useRiskAssessment.ts

import { useState } from 'react';
import { SupplierRiskScore } from '../types/riskAssessmentTypes';
import { fetchSupplierRisks } from '../services/riskAssessmentService';

export const useRiskAssessment = () => {
  const [supplierRisks, setSupplierRisks] = useState<SupplierRiskScore[]>([]);

  const loadSupplierRisks = async () => {
    const data = await fetchSupplierRisks();
    setSupplierRisks(data);
  };

  return { supplierRisks, loadSupplierRisks };
};
