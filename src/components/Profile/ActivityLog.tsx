// guardian-io/src/components/Profile/ActivityLog.tsx
import React, { useEffect, useState } from 'react';
import { fetchActivityLog } from '../../api/profileApi';
import { ActivityLogData } from '../../types/profileTypes';

interface ActivityLogProps {
  userId: string;
}

export default function ActivityLog({ userId }: ActivityLogProps) {
  const [activityLog, setActivityLog] = useState<ActivityLogData[]>([]);

  useEffect(() => {
    async function loadActivityLog() {
      const log = await fetchActivityLog(userId);
      setActivityLog(log);
    }
    loadActivityLog();
  }, [userId]);

  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {activityLog.map((entry) => (
          <li key={entry.id}>{entry.activity} - {new Date(entry.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}