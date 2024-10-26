// src/hooks/useNotificationsData.ts

import { useState, useEffect } from 'react';
import { notificationsService } from '../services/notificationsService';
import { Notification } from '../types/notificationsTypes';

export const useNotificationsData = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationsService.fetchNotifications().then(setNotifications);
  }, []);

  return { notifications };
};
