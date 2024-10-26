// guardian-io/src/components/Profile/ProfileSettings.tsx
import React, { useState } from 'react';
import { updateUserPreferences } from '../../api/profileApi';
import { UserPreferences } from '../../types/profileTypes';

interface ProfileSettingsProps {
  userData: UserPreferences;
}

export default function ProfileSettings({ userData }: ProfileSettingsProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(userData);

  const handlePreferenceChange = async (newPreferences: Partial<UserPreferences>) => {
    const updated = await updateUserPreferences({ ...preferences, ...newPreferences });
    setPreferences(updated);
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      {/* Toggle for theme and notification preferences */}
      <label>
        Dark Theme:
        <input
          type="checkbox"
          checked={preferences.theme === 'dark'}
          onChange={() => handlePreferenceChange({ theme: preferences.theme === 'dark' ? 'light' : 'dark' })}
        />
      </label>
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={preferences.notifications}
          onChange={() => handlePreferenceChange({ notifications: !preferences.notifications })}
        />
      </label>
    </div>
  );
}