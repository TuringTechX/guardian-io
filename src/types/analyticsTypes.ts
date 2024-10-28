// src/types/analyticsTypes.ts

// Represents trend data over time with enhanced detail
export interface TrendData {
  date: string;          // ISO date string (e.g., '2024-10-25')
  count: number;         // Number of incidents on this date
  category?: string;     // Optional: Category of the incident (e.g., "Wildlife", "Poaching")
}

// Represents distribution of incidents by region, with optional geolocation for mapping features
export interface RegionDistribution {
  region: string;              // Name of the region (e.g., "Asia", "North America")
  incidentCount: number;       // Number of incidents in this region
  coordinates?: [number, number]; // Optional: [latitude, longitude] for geolocation
}

// Represents distribution of incidents by severity level, with color-coding for visualization
export interface SeverityDistribution {
  severity: string;            // Severity level (e.g., "High", "Medium", "Low")
  percentage: number;          // Percentage of incidents at this severity level
  colorCode?: string;          // Optional: Hex color for chart visualizations
}

// Detailed breakdown of individual incidents within the analytics data
export interface IncidentDetail {
  id: string;                   // Unique identifier for the incident
  date: string;                 // Date of the incident
  region: string;               // Region where the incident occurred
  severity: string;             // Severity level of the incident
  description?: string;         // Optional: Description or details of the incident
}

// Main interface representing the comprehensive crime analytics dataset
export interface CrimeAnalytics {
  trends: TrendData[];                  // Array of trend data points over time
  severityDistribution: SeverityDistribution[]; // Array of severity data with optional colors
  regionalDistribution: RegionDistribution[];   // Array of regional incident data
  recentIncidents?: IncidentDetail[];   // Optional: Array of recent incidents for detailed analysis
}
