// guardian-io/src/components/Notification/NotificationItem.tsx
import React from 'react';
import { NotificationData } from '../../types/notificationTypes';

interface NotificationItemProps {
  notification: NotificationData;
  onDismiss: (id: string) => void;
}

export default function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
  return (
    <div className={`notification-item ${notification.type}`}>
      <p>{notification.message}</p>
      <small>{new Date(notification.date).toLocaleString()}</small>
      <button onClick={() => onDismiss(notification.id)}>Dismiss</button>
    </div>
  );
}
