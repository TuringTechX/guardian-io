// src/components/Sustainability/LifeCycleAssessments.tsx

import React from 'react';
import { fetchLifeCycleAssessments } from '../../services/sustainabilityService';
import { LifeCycleAssessment } from '../../types/sustainabilityTypes';

export const LifeCycleAssessments: React.FC = () => {
  const [assessments, setAssessments] = React.useState<LifeCycleAssessment[]>([]);

  React.useEffect(() => {
    fetchLifeCycleAssessments().then(setAssessments);
  }, []);

  return (
    <div className="lifecycle-assessments mb-8">
      <h2 className="text-3xl font-bold mb-4">Lifecycle Assessments</h2>
      {assessments.map((assessment) => (
        <div key={assessment.id} className="assessment-card">
          <h3>{assessment.stage}</h3>
          <p>Impact Score: {assessment.impactScore}</p>
          <p>{assessment.details}</p>
        </div>
      ))}
    </div>
  );
};
