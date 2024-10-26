// src/hooks/useGamificationData.ts

import { useState, useEffect } from 'react';
import { gamificationService } from '../services/gamificationService';
import { Goal, Badge } from '../types/gamificationTypes';

export const useGamificationData = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    gamificationService.fetchGoals().then(setGoals);
    gamificationService.fetchBadges().then(setBadges);
  }, []);

  return { goals, badges };
};
