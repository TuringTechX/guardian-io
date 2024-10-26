// src/pages/gamification.tsx

import React from 'react';
import { ProgressTracker } from '../components/Gamification/ProgressTracker';
import { BadgeCollection } from '../components/Gamification/BadgeCollection';
import { Leaderboard } from '../components/Gamification/Leaderboard';
import { GoalSetter } from '../components/Gamification/GoalSetter';
import '../styles/gamification.css';

const GamificationPage: React.FC = () => {
  return (
    <div className="gamification-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Gamification & Goals</h1>
      <ProgressTracker />
      <BadgeCollection />
      <GoalSetter />
      <Leaderboard />
    </div>
  );
};

export default GamificationPage;
