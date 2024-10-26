// src/components/Gamification/ProgressTracker.tsx

import React from 'react';
import { useGamificationData } from '../../hooks/useGamificationData';

export const ProgressTracker: React.FC = () => {
  const { goals } = useGamificationData();

  return (
    <div className="progress-tracker">
      {goals.map(goal => (
        <div key={goal.id} className="goal">
          <h3>{goal.name}</h3>
          <div className="progress-bar bg-gray-200 rounded-full h-4">
            <div
              className="progress bg-blue-600 h-full rounded-full"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500">{goal.progress}%</span>
        </div>
      ))}
    </div>
  );
};
