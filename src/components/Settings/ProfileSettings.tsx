// src/components/Settings/ProfileSettings.tsx

import React, { useState } from 'react';
import { updateUserProfile } from '../../services/userSettingsService';
import { useUserSettings } from '../../hooks/useUserSettings';
import '../styles/settings.css';

export const ProfileSettings: React.FC = () => {
  const { userProfile, setUserProfile } = useUserSettings();
  const [formData, setFormData] = useState(userProfile);

  const handleSubmit = async () => {
    const updatedProfile = await updateUserProfile(formData);
    setUserProfile(updatedProfile);
  };

  return (
    <div className="profile-settings mb-8">
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit" className="btn-save">Save Changes</button>
      </form>
    </div>
  );
};
