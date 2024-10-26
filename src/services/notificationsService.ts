// src/services/notificationsService.ts

import { notificationsApi } from '../api/notificationsApi';

export const notificationsService = {
  fetchNotifications: async () => {
    const response = await notificationsApi.getAll();
    return response.data;
  },
};
