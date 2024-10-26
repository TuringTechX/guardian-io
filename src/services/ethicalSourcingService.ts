// src/services/ethicalSourcingService.ts

import { ethicalSourcingApi } from '../api/ethicalSourcingApi';

export const ethicalSourcingService = {
  fetchSuppliers: async () => {
    const response = await ethicalSourcingApi.getSuppliers();
    return response.data;
  },
  fetchRecommendations: async () => {
    const response = await ethicalSourcingApi.getRecommendations();
    return response.data;
  }
};
