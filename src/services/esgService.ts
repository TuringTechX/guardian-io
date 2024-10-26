// src/services/esgService.ts

import { esgApi } from '../api/esgApi';

export const esgService = {
  fetchESGData: async () => {
    const response = await esgApi.getESGData();
    return response.data;
  },
};
