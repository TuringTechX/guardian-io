// src/utils/supplierRiskCalculator.ts

import { Supplier } from '../types/ethicalSourcingTypes';

export const supplierRiskCalculator = (supplier: Supplier) => {
  return supplier.sustainabilityScore * (supplier.riskLevel === 'High' ? 1.5 : 1);
};
