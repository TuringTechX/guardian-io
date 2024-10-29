// src/types/sustainabilityTypes.ts

// Data structure for basic metrics related to sustainability
export interface Metric {
  id: string;
  name: string;
  value: number | string;
  description: string;
}

// Carbon footprint data point for graphing emissions over time or across categories
export interface CarbonDataPoint {
  label: string;          // Time (e.g., month) or category label (e.g., transport)
  value: number;          // Carbon footprint in kg CO2
}

// Lifecycle assessment data for different product stages
export interface LifeCycleAssessment {
  id: string;
  stage: string;          // e.g., "Production", "Usage", "Disposal"
  impactScore: number;    // Numeric score indicating environmental impact
  details: string;
}

// Structure for sustainability goals with progress tracking
export interface SustainabilityGoal {
  id: string;
  description: string;
  currentProgress: number;
  target: number;
  isAchieved: boolean;
}

// Trend data structure for tracking emissions changes over time
export interface EmissionsTrend {
  timestamp: string;      // ISO date string or a time label
  emissions: number;      // Emissions amount in kg CO2
  change?: number;        // Optional: % change from the previous period
}

// Impact category data for breaking down environmental impact by area
export interface ImpactCategory {
  category: string;       // e.g., "Water Usage", "Land Degradation"
  score: number;          // Impact score for this category
  description?: string;   // Optional: description of the impact
}

export interface AuditSubtask {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface AuditItem {
  id: string;
  name: string;
  description?: string;
  subtasks?: AuditSubtask[];
}