// src/hooks/useGoalTracking.ts

import { useState, useEffect } from 'react';
import { SustainabilityGoal } from '../types/sustainabilityTypes';

export const useGoalTracking = (initialGoals: SustainabilityGoal[]) => {
  const [goals, setGoals] = useState<SustainabilityGoal[]>(initialGoals);

  useEffect(() => {
    const interval = setInterval(() => {
      setGoals((currentGoals) => currentGoals.map((goal) => ({
        ...goal,
        currentProgress: goal.currentProgress + Math.random() * 5, // Mock update
        isAchieved: goal.currentProgress >= goal.target,
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return goals;
};
