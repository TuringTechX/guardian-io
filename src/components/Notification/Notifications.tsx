// guardian-io/src/components/Notification/notifications.tsx
import React, { useContext, useEffect } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import NotificationList from './NotificationList';
import './notifications.css';

export default function Notifications() {
  const { notifications, fetchNotifications } = useContext(NotificationContext);

  useEffect(() => {
    fetchNotifications(); // Fetch notifications on component load
  }, [fetchNotifications]);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <NotificationList notifications={notifications} />
    </div>
  );
}
