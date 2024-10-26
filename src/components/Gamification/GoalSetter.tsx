// src/components/Gamification/GoalSetter.tsx

import React, { useState } from 'react';

export const GoalSetter: React.FC = () => {
  const [goal, setGoal] = useState('');

  const handleSetGoal = () => {
    // Implement goal setting logic here
  };

  return (
    <div className="goal-setter">
      <h2 className="text-2xl font-semibold mb-4">Set Your Goals</h2>
      <input
        type="text"
        placeholder="Enter a goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="goal-input"
      />
      <button onClick={handleSetGoal} className="set-goal-btn bg-blue-600 text-white rounded px-4 py-2 mt-2">
        Set Goal
      </button>
    </div>
  );
};
