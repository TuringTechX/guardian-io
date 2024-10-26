// src/components/Notifications/NotificationsFilter.tsx

import React, { useState } from 'react';

export const NotificationsFilter: React.FC = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="notifications-filter mb-6">
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter notifications..."
        className="filter-input p-2 rounded"
      />
    </div>
  );
};
