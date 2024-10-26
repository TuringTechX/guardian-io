// guardian-io/src/pages/profile.tsx
import Profile from '../components/Profile/Profile';

export default function ProfilePage() {
  return <Profile />;
}

// guardian-io/src/components/Profile/Profile.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProfileSettings from './ProfileSettings';
import ActivityLog from './ActivityLog';
import RoleManagement from './RoleManagement';
import { fetchUserData } from '../../api/profileApi';
import { UserData } from '../../types/profileTypes';
import './profile.css';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const data = await fetchUserData(user.id);
      setUserData(data);
    }
    loadUserData();
  }, [user.id]);

  return (
    <div className="profile-page">
      {userData ? (
        <>
          <ProfileSettings userData={userData} />
          <ActivityLog userId={user.id} />
          <RoleManagement roles={userData.roles} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}