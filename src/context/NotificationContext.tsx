// guardian-io/src/context/NotificationContext.tsx
import React, { createContext, ReactNode, useState, useCallback } from 'react';
import { NotificationData } from '../types/notificationTypes';
import { fetchNotificationsAPI, dismissNotificationAPI } from '../api/notificationsApi';

interface NotificationContextType {
  notifications: NotificationData[];
  fetchNotifications: () => void;
  dismissNotification: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const fetchNotifications = useCallback(async () => {
    const fetchedNotifications = await fetchNotificationsAPI();
    setNotifications(fetchedNotifications);
  }, []);

  const dismissNotification = async (id: string) => {
    await dismissNotificationAPI(id);
    setNotifications((current) => current.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
