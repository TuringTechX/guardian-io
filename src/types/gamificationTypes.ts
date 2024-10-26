// src/types/gamificationTypes.ts

export interface Goal {
    id: string;
    name: string;
    progress: number;
  }
  
  export interface Badge {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface LeaderboardEntry {
    id: string;
    name: string;
    score: number;
  }
  