// guardian-io/src/types/alertTypes.ts

export enum AlertPriority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
  }
  
  export enum AlertCategory {
    Compliance = 'Compliance',
    Safety = 'Safety',
    Other = 'Other',
  }
  
  export interface Alert {
    id: string;
    message: string;
    date: string;           // Date in ISO format
    priority: AlertPriority;
    category: AlertCategory;
    isDismissed: boolean;
  }
  