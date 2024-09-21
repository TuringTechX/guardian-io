// src/hooks/usePersonalization.ts

import { useState, useEffect } from 'react';
import { Feature } from '../data/featuresData';

interface UserPreferences {
  favoriteFeatureIds: number[];  // User's preferred feature IDs
  recentActivity: string[];      // Recent user activities (e.g., 'Checked ESG', 'Viewed Supply Chain')
}

// Simulated user data (can come from an API in a real app)
const userPreferences: UserPreferences = {
  favoriteFeatureIds: [1, 3],  // IDs of favorite features (e.g., Supply Chain, Sustainability)
  recentActivity: ['Viewed Supply Chain', 'Checked ESG'],
};

// Custom hook for sorting features based on user preferences and recent activity
export const usePersonalization = (features: Feature[], key: keyof Feature) => {
  const [personalizedFeatures, setPersonalizedFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const { favoriteFeatureIds, recentActivity } = userPreferences;

    // Prioritize features based on user preferences and activity
    const sortedFeatures = [...features].sort((a, b) => {
      const isFavoriteA = favoriteFeatureIds.includes(a.id) ? 1 : 0;
      const isFavoriteB = favoriteFeatureIds.includes(b.id) ? 1 : 0;

      // Boost features based on favorites and recent activity
      return (
        isFavoriteB - isFavoriteA ||  // First prioritize favorites
        recentActivity.includes(b.title) - recentActivity.includes(a.title) ||  // Then by recent activity
        a[key] < b[key] ? 1 : -1  // Lastly by importance or any other key
      );
    });

    setPersonalizedFeatures(sortedFeatures);
  }, [features, key]);

  return personalizedFeatures;
};
