// src/services/collaborationService.ts

import { CollaborationMetrics } from '../types/collaborationTypes';
import { debounce } from '../utils/debounceUtility';

// Cache to store data temporarily
let collaborationCache: CollaborationMetrics[] | null = null;

/**
 * Fetches weekly collaboration data metrics from the API, with retry logic and caching.
 * @returns {Promise<CollaborationMetrics[]>} - Resolves to an array of collaboration metrics.
 * @throws Will throw an error if the network request fails.
 */
export const fetchCollaborationData = async (retryCount = 3): Promise<CollaborationMetrics[]> => {
  if (collaborationCache) {
    console.info('Returning cached collaboration data');
    return collaborationCache;
  }

  try {
    const response = await fetch('/api/collaboration-metrics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error fetching collaboration data: ${errorDetails.message || 'Unknown error'}`);
    }

    const data: CollaborationMetrics[] = await response.json();
    collaborationCache = data; // Cache data
    return data;
  } catch (error) {
    console.error('Error in fetchCollaborationData:', error);
    if (retryCount > 0) {
      console.log(`Retrying fetchCollaborationData, attempts left: ${retryCount}`);
      return fetchCollaborationData(retryCount - 1);
    }
    throw error;
  }
};

/**
 * Transforms collaboration data to separate key metrics for trend analysis.
 * @param data - Array of CollaborationMetrics.
 * @returns { [key: string]: number[] } - An object with arrays of metric values for analysis.
 */
export const transformCollaborationData = (data: CollaborationMetrics[]): { [key: string]: number[] } => {
  return data.reduce((acc, metric) => {
    acc.engagementScores = acc.engagementScores || [];
    acc.taskCompletionRates = acc.taskCompletionRates || [];
    acc.activeUsers = acc.activeUsers || [];
    acc.responseTimes = acc.responseTimes || [];

    acc.engagementScores.push(metric.engagementScore);
    acc.taskCompletionRates.push(metric.taskCompletionRate);
    acc.activeUsers.push(metric.activeUsers);
    acc.responseTimes.push(metric.averageResponseTime);

    return acc;
  }, {} as { [key: string]: number[] });
};

/**
 * Creates a new collaboration entry with debouncing to avoid frequent submissions.
 * @param newMetric - CollaborationMetrics object to create a new entry.
 * @returns {Promise<CollaborationMetrics>} - Resolves to the newly created collaboration metric.
 */
export const createCollaborationEntry = debounce(async (newMetric: CollaborationMetrics): Promise<CollaborationMetrics> => {
  try {
    const response = await fetch('/api/collaboration-metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMetric),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error creating collaboration entry: ${errorDetails.message || 'Unknown error'}`);
    }

    const data: CollaborationMetrics = await response.json();
    collaborationCache = null; // Clear cache after a new entry
    return data;
  } catch (error) {
    console.error('Error in createCollaborationEntry:', error);
    throw error;
  }
}, 300);  // 300ms debounce delay

/**
 * Clears the collaboration data cache.
 */
export const clearCollaborationCache = () => {
  collaborationCache = null;
};

/**
 * Utility function to calculate engagement trends.
 * @param data - Array of engagement scores over time.
 * @returns {object} - Analysis of trends such as increase or decrease over time.
 */
export const calculateEngagementTrends = (data: number[]): { trend: string; trendValue: number } => {
  const trendValue = data.reduce((acc, score, idx) => {
    if (idx === 0) return acc;
    return acc + (score - data[idx - 1]);
  }, 0);

  return {
    trend: trendValue > 0 ? 'Increasing' : trendValue < 0 ? 'Decreasing' : 'Stable',
    trendValue,
  };
};
