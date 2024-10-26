// src/services/csrService.ts

import { csrApi } from '../api/csrApi';

export const csrService = {
  fetchCSRData: async () => {
    const response = await csrApi.getCSRData();
    return response.data;
  },
};
