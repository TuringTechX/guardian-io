// src/types/sustainabilityTypes.ts

export interface Metric {
    id: string;
    name: string;
    value: number | string;
    description: string;
  }
  
  export interface LifeCycleAssessment {
    id: string;
    stage: string;
    impactScore: number;
    details: string;
  }
  
  export interface SustainabilityGoal {
    id: string;
    description: string;
    currentProgress: number;
    target: number;
    isAchieved: boolean;
  }
  