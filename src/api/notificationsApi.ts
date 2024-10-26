// guardian-io/src/api/notificationsApi.ts
import { NotificationData } from '../types/notificationTypes';

export async function fetchNotificationsAPI(): Promise<NotificationData[]> {
  const response = await fetch('/api/notifications');
  return response.json();
}

export async function dismissNotificationAPI(id: string): Promise<void> {
  await fetch(`/api/notifications/${id}`, {
    method: 'DELETE',
  });
}
