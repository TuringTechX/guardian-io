// src/components/Notifications/NotificationCard.tsx

import React from 'react';
import { Notification } from '../../types/notificationsTypes';

interface Props {
  notification: Notification;
}

export const NotificationCard: React.FC<Props> = ({ notification }) => {
  return (
    <div className="notification-card p-4 mb-4 shadow-lg rounded-md">
      <h4 className="font-semibold">{notification.title}</h4>
      <p>{notification.message}</p>
      <span className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</span>
    </div>
  );
};
