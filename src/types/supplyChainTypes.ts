// src/types/supplyChainTypes.ts

export interface TransparencyMetric {
    id: string;
    name: string;
    value: number | string;
    description: string;
  }
  
  export interface SupplierRisk {
    id: string;
    supplierName: string;
    riskScore: number;
    complianceStatus: string;
  }
  
  export interface BlockchainTransaction {
    id: string;
    timestamp: string;
    action: string;
    details: string;
  }
  