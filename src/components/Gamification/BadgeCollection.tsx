// src/components/Gamification/BadgeCollection.tsx

import React from 'react';
import { useGamificationData } from '../../hooks/useGamificationData';

export const BadgeCollection: React.FC = () => {
  const { badges } = useGamificationData();

  return (
    <div className="badge-collection grid grid-cols-3 gap-4">
      {badges.map(badge => (
        <div key={badge.id} className="badge-card p-4 rounded shadow-lg">
          <img src={badge.icon} alt={badge.name} className="badge-icon" />
          <h4 className="badge-name">{badge.name}</h4>
        </div>
      ))}
    </div>
  );
};
