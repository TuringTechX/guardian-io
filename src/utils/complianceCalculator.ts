// src/utils/complianceCalculator.ts

import { ESGData } from '../types/esgTypes';

export const complianceCalculator = (esgData: ESGData): string => {
  const { environmentalScore, socialScore, governanceScore } = esgData;
  const averageScore = (environmentalScore + socialScore + governanceScore) / 3;

  if (averageScore > 75) return 'green';
  if (averageScore > 50) return 'yellow';
  return 'red';
};
