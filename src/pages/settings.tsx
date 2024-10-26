// src/pages/settings.tsx

import React from 'react';
import { ProfileSettings } from '../components/Settings/ProfileSettings';
import { NotificationSettings } from '../components/Settings/NotificationSettings';
import { DisplaySettings } from '../components/Settings/DisplaySettings';
import { SecuritySettings } from '../components/Settings/SecuritySettings';
import { PrivacySettings } from '../components/Settings/PrivacySettings';
import { SettingsNavigation } from '../components/Settings/SettingsNavigation';
import '../styles/settings.css';

const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page container mx-auto py-12 flex">
      <SettingsNavigation />
      <div className="settings-content flex-grow">
        <ProfileSettings />
        <NotificationSettings />
        <DisplaySettings />
        <SecuritySettings />
        <PrivacySettings />
      </div>
    </div>
  );
};

export default SettingsPage;
