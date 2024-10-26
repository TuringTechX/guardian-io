// src/components/Settings/SettingsNavigation.tsx

import React from 'react';

export const SettingsNavigation: React.FC = () => {
  return (
    <div className="settings-navigation">
      <ul>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#notifications">Notifications</a></li>
        <li><a href="#display">Display</a></li>
        <li><a href="#security">Security</a></li>
        <li><a href="#privacy">Privacy</a></li>
      </ul>
    </div>
  );
};
