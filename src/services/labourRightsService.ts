// src/services/labourRightsService.ts

import { labourRightsApi } from '../api/labourRightsApi';

export const labourRightsService = {
  fetchAuditData: async () => {
    const response = await labourRightsApi.getAuditData();
    return response.data;
  },
  fetchRiskScores: async () => {
    const response = await labourRightsApi.getRiskScores();
    return response.data;
  },
};
