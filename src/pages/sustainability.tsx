// src/pages/sustainability.tsx

import React from 'react';
import { SustainabilityMetrics } from '../components/Sustainability/SustainabilityMetrics';
import { LifeCycleAssessments } from '../components/Sustainability/LifeCycleAssessments';
import  CarbonFootprintGraph  from '../components/Sustainability/CarbonFootprintGraph';
import { AuditChecklist } from '../components/Sustainability/AuditChecklist';
import { SustainabilityFilters } from '../components/Sustainability/SustainabilityFilters';
import { SustainabilityGoalTracker } from '../components/Sustainability/SustainabilityGoalTracker';
import '../styles/sustainability.css';

const SustainabilityPage: React.FC = () => {
  return (
    <div className="sustainability-page container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Sustainability Metrics and Goals</h1>

      <SustainabilityFilters />
      <SustainabilityMetrics />
      <CarbonFootprintGraph />
      <LifeCycleAssessments />
      <AuditChecklist />
      <SustainabilityGoalTracker />
    </div>
  );
};

export default SustainabilityPage;
