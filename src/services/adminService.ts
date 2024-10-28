// src/services/adminService.ts

import { CrimeAnalytics } from '../types/analyticsTypes';

/**
 * Cache to store analytics data temporarily to reduce API requests.
 */
const analyticsCache: { data: CrimeAnalytics | null; timestamp: number | null } = {
  data: null,
  timestamp: null,
};

// Maximum cache duration (e.g., 5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Fetches wildlife crime analytics data from the server.
 * Includes caching for performance optimization.
 * @returns {Promise<CrimeAnalytics>} - Resolves to the crime analytics data.
 */
export const fetchCrimeAnalytics = async (): Promise<CrimeAnalytics> => {
  // Check cache validity
  const currentTime = Date.now();
  if (analyticsCache.data && analyticsCache.timestamp && currentTime - analyticsCache.timestamp < CACHE_DURATION) {
    console.log('Returning cached data');
    return analyticsCache.data;
  }

  // Fetch fresh data if cache is expired or unavailable
  try {
    const response = await fetch('/api/crime-analytics');

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to fetch data: ${errorDetails.message || 'Unknown error'}`);
    }

    // Process the fetched data to match the CrimeAnalytics interface structure
    const rawData = await response.json();

    const data: CrimeAnalytics = {
      trends: rawData.trends.map((trend: any) => ({
        date: trend.date,
        count: trend.count,
        category: trend.category || 'General', // Default to 'General' if no category
      })),
      severityDistribution: rawData.severityDistribution.map((severity: any) => ({
        severity: severity.severity,
        percentage: severity.percentage,
        colorCode: severity.colorCode || getColorBySeverity(severity.severity),
      })),
      regionalDistribution: rawData.regionalDistribution.map((region: any) => ({
        region: region.region,
        incidentCount: region.incidentCount,
        coordinates: region.coordinates || null, // Use null if coordinates are unavailable
      })),
      recentIncidents: rawData.recentIncidents.map((incident: any) => ({
        id: incident.id,
        date: incident.date,
        region: incident.region,
        severity: incident.severity,
        description: incident.description || '', // Default to empty string if no description
      })),
    };

    // Update cache with fresh data and timestamp
    analyticsCache.data = data;
    analyticsCache.timestamp = currentTime;

    return data;
  } catch (error) {
    console.error('Error fetching crime analytics:', error);
    throw error;
  }
};

/**
 * Utility function to clear the analytics cache manually.
 * Useful for forcing a data refresh on certain actions.
 */
export const clearAnalyticsCache = () => {
  analyticsCache.data = null;
  analyticsCache.timestamp = null;
  console.log('Analytics cache cleared');
};

/**
 * Utility function to assign a color based on severity level.
 * @param severity - The severity level (e.g., "High", "Medium", "Low")
 * @returns {string} - The color code associated with the severity level.
 */
const getColorBySeverity = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case 'high':
      return '#FF6B6B'; // Red
    case 'medium':
      return '#FFD93D'; // Yellow
    case 'low':
      return '#6BCB77'; // Green
    default:
      return '#C0C0C0'; // Gray for unknown severity
  }
};
