// src/types/antiForcedLabourTypes.ts

export interface AuditRecord {
    date: string;
    location: string;
    outcome: 'pass' | 'fail';
  }
  
  export interface RiskFactor {
    type: string;
    percentage: number;
  }
  