// src/types/esgTypes.ts

export interface ESGData {
    id: string;
    environmentalScore: number;
    socialScore: number;
    governanceScore: number;
    timestamp: string;
  }
  
  export interface Prediction {
    compliancePrediction: number;
  }
  
  export interface ComplianceLevel {
    title: string;
    complianceLevel: 'green' | 'yellow' | 'red';
  }
  