// src/types/csrTypes.ts

export interface CSRData {
    id: string;
    communityInvestment: number;
    volunteerHours: number;
    projectTitle: string;
    startDate: string;
    endDate: string;
  }
  
  export interface ComplianceLevel {
    complianceLevel: 'green' | 'yellow' | 'red';
  }
  