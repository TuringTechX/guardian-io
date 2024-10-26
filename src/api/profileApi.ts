// guardian-io/src/api/profileApi.ts
import { UserData, UserPreferences, ActivityLogData } from '../types/profileTypes';

export async function fetchUserData(userId: string): Promise<UserData> {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
}

export async function fetchActivityLog(userId: string): Promise<ActivityLogData[]> {
  const response = await fetch(`/api/user/${userId}/activity-log`);
  return response.json();
}

export async function updateUserPreferences(preferences: UserPreferences): Promise<UserPreferences> {
  const response = await fetch('/api/user/preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  return response.json();
}