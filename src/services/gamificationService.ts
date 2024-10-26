// src/services/gamificationService.ts

import { gamificationApi } from '../api/gamificationApi';

export const gamificationService = {
  fetchGoals: async () => {
    const response = await gamificationApi.getGoals();
    return response.data;
  },
  fetchBadges: async () => {
    const response = await gamificationApi.getBadges();
    return response.data;
  },
  fetchLeaderboard: async () => {
    const response = await gamificationApi.getLeaderboard();
    return response.data;
  }
};
