// src/services/userSettingsService.ts

import { UserProfile, NotificationPreferences, DisplayPreferences, PrivacyPreferences } from '../types/settingsTypes';
import { apiHelper } from '../utils/apiHelper';

export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  const response = await apiHelper.put('/user/profile', profile);
  return response.data;
};

export const fetchNotificationPreferences = async (): Promise<NotificationPreferences> => {
  const response = await apiHelper.get('/user/notifications');
  return response.data;
};
