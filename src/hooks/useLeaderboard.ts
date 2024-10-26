// src/hooks/useLeaderboard.ts

import { useState, useEffect } from 'react';
import { gamificationService } from '../services/gamificationService';
import { LeaderboardEntry } from '../types/gamificationTypes';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    gamificationService.fetchLeaderboard().then(setLeaderboard);
  }, []);

  return { leaderboard };
};
