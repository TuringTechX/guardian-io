// src/components/Gamification/Leaderboard.tsx

import React from 'react';
import { useLeaderboard } from '../../hooks/useLeaderboard';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useLeaderboard();

  return (
    <div className="leaderboard">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={user.id} className="leaderboard-entry flex justify-between">
            <span>{index + 1}. {user.name}</span>
            <span>{user.score} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
