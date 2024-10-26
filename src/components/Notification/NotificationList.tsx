// guardian-io/src/components/Notification/NotificationList.tsx
import React from 'react';
import NotificationItem from './NotificationItem';
import { NotificationData } from '../../types/notificationTypes';

interface NotificationListProps {
  notifications: NotificationData[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="notification-list">
      {notifications.length ? (
        notifications.map((notif) => (
          <NotificationItem key={notif.id} notification={notif} onDismiss={() => {}} />
        ))
      ) : (
        <p>No new notifications</p>
      )}
    </div>
  );
}

// src/components/Notifications/NotificationsList.tsx

import React from 'react';
import { NotificationCard } from './NotificationCard';
import { useNotificationsData } from '../../hooks/useNotificationsData';

export const NotificationsList: React.FC = () => {
  const { notifications } = useNotificationsData();

  return (
    <div className="notifications-list">
      {notifications.map(notification => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
