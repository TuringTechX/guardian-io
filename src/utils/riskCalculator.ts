// src/utils/riskCalculator.ts

import { SupplierRiskScore, RiskThresholds } from '../types/riskAssessmentTypes';

const WEIGHTS = {
  environmental: 0.4,
  laborCompliance: 0.3,
  forcedLabor: 0.3,
};

export const calculateOverallRiskScore = (scores: SupplierRiskScore): number => {
  const { environmentalScore, laborComplianceScore, forcedLaborRisk } = scores;
  return (
    (environmentalScore * WEIGHTS.environmental) +
    (laborComplianceScore * WEIGHTS.laborCompliance) +
    (forcedLaborRisk * WEIGHTS.forcedLabor)
  );
};

export const determineRiskLevel = (
  score: number,
  thresholds: RiskThresholds = { low: 30, medium: 60, high: 100 }
): 'Low' | 'Medium' | 'High' => {
  if (score <= thresholds.low) return 'Low';
  if (score <= thresholds.medium) return 'Medium';
  return 'High';
};
