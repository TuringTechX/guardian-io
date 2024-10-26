// src/types/riskAssessmentTypes.ts

export interface SupplierRiskScore {
    supplierId: string;
    name: string;
    environmentalScore: number;
    laborComplianceScore: number;
    forcedLaborRisk: number;
    overallRiskScore: number; // Calculated based on individual scores
  }
  
  export interface RiskThresholds {
    low: number;
    medium: number;
    high: number;
  }
  
  export interface RiskMatrixPosition {
    supplierId: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    positionX: number;
    positionY: number;
  }
  