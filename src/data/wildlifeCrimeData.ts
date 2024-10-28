// src/data/wildlifeCrimeData.ts

// Interface for individual crime data entries
export interface CrimeData {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: number;  // Severity level, higher indicates more severe incidents
}

// Sample crime data entries
export const wildlifeCrimeData: CrimeData[] = [
  {
    id: 1,
    title: "Illegal Rhino Poaching",
    description: "Rhino poaching reported in South Africa. 3 rhinos killed.",
    latitude: -25.7479,
    longitude: 28.2293,
    severity: 5,
  },
  {
    id: 2,
    title: "Tiger Smuggling",
    description: "Illegal tiger smuggling operation busted in India.",
    latitude: 28.7041,
    longitude: 77.1025,
    severity: 4,
  },
  {
    id: 3,
    title: "Elephant Ivory Trade",
    description: "Significant ivory trade network discovered in Kenya.",
    latitude: -1.2921,
    longitude: 36.8219,
    severity: 5,
  },
  {
    id: 4,
    title: "Wildlife Trafficking",
    description: "Endangered species trafficked in Southeast Asia.",
    latitude: 10.8231,
    longitude: 106.6297,
    severity: 3,
  },
];

// Interface for analytics data on wildlife crimes
export interface CrimeAnalytics {
  totalIncidents: number;              // Total number of crime incidents
  mostSevereIncidents: CrimeData[];    // List of the most severe incidents
  regionSummary: {                     // Summary of incidents by region
    [region: string]: {
      count: number;                   // Count of incidents in the region
      avgSeverity: number;             // Average severity level in the region
    };
  };
  recentTrends: {                      // Trends of incidents over time (dummy structure)
    month: string;
    incidentCount: number;
  }[];
}

// Sample function to generate analytics from wildlife crime data
export const generateCrimeAnalytics = (): CrimeAnalytics => {
  // Calculate total incidents
  const totalIncidents = wildlifeCrimeData.length;

  // Identify most severe incidents (e.g., severity 5)
  const mostSevereIncidents = wildlifeCrimeData.filter(crime => crime.severity === 5);

  // Summarize incidents by region (assuming latitude defines regions)
  const regionSummary: { [region: string]: { count: number; avgSeverity: number } } = {};
  wildlifeCrimeData.forEach(crime => {
    const region = crime.latitude > 0 ? 'Northern Hemisphere' : 'Southern Hemisphere';
    if (!regionSummary[region]) {
      regionSummary[region] = { count: 0, avgSeverity: 0 };
    }
    regionSummary[region].count++;
    regionSummary[region].avgSeverity += crime.severity;
  });
  
  // Calculate average severity in each region
  Object.keys(regionSummary).forEach(region => {
    regionSummary[region].avgSeverity /= regionSummary[region].count;
  });

  // Dummy data for recent trends
  const recentTrends = [
    { month: 'January', incidentCount: 10 },
    { month: 'February', incidentCount: 8 },
    { month: 'March', incidentCount: 12 },
  ];

  return {
    totalIncidents,
    mostSevereIncidents,
    regionSummary,
    recentTrends,
  };
};
