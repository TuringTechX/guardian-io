// src/types/ethicalSourcingTypes.ts

export interface Supplier {
    id: string;
    name: string;
    sustainabilityScore: number;
    riskLevel: string;
    certifications: string[];
  }
  
  export interface Recommendation {
    id: string;
    name: string;
    recommendationScore: number;
  }
  
  export interface Certification {
    id: string;
    name: string;
    icon: string;
  }
  