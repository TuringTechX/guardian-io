// src/utils/kpiCalculator.ts

import { CSRData } from '../types/csrTypes';

export const calculateTotalInvestment = (csrData: CSRData[]): number => {
  return csrData.reduce((acc, curr) => acc + curr.communityInvestment, 0);
};
