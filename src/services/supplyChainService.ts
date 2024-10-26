// src/services/supplyChainService.ts

import { TransparencyMetric, SupplierRisk } from '../types/supplyChainTypes';
import { apiHelper } from '../utils/apiHelper';

export const fetchTransparencyMetrics = async (): Promise<TransparencyMetric[]> => {
  const response = await apiHelper.get('/supply-chain/metrics');
  return response.data;
};

export const fetchSupplierRisks = async (): Promise<SupplierRisk[]> => {
  const response = await apiHelper.get('/supply-chain/risk-assessments');
  return response.data;
};
