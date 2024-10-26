// src/pages/notifications.tsx

import React from 'react';
import { NotificationsList } from '../components/Notifications/NotificationsList';
import { NotificationsFilter } from '../components/Notifications/NotificationsFilter';
import { NotificationSettings } from '../components/Notifications/NotificationSettings';
import { RealTimeAlertBanner } from '../components/Notifications/RealTimeAlertBanner';
import '../styles/notifications.css';

const NotificationsPage: React.FC = () => {
  return (
    <div className="notifications-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <RealTimeAlertBanner />
      <NotificationsFilter />
      <NotificationsList />
      <NotificationSettings />
    </div>
  );
};

export default NotificationsPage;
