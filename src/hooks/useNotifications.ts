// guardian-io/src/hooks/useNotifications.ts
import { useContext, useEffect } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }

  const { notifications, fetchNotifications, dismissNotification } = context;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { notifications, dismissNotification };
}
