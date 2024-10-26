// src/hooks/useRealTimeNotification.ts

import { useEffect } from 'react';
import { realTimeService } from '../services/realTimeService';
import { Notification } from '../types/notificationsTypes';

export const useRealTimeNotification = (onNewNotification: (notification: Notification) => void) => {
  useEffect(() => {
    realTimeService.connect(onNewNotification);
    return () => realTimeService.disconnect();
  }, [onNewNotification]);
};
