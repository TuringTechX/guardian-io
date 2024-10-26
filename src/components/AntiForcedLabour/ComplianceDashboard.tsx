// src/components/AntiForcedLabour/ComplianceDashboard.tsx

import React from 'react';

export const ComplianceDashboard: React.FC = () => {
  return (
    <div className="compliance-dashboard grid grid-cols-3 gap-4">
      <div className="metric-card">
        <h3>Audits Completed</h3>
        <p>20</p>
      </div>
      <div className="metric-card">
        <h3>Compliance Rate</h3>
        <p>85%</p>
      </div>
      <div className="metric-card">
        <h3>Active Risks</h3>
        <p>4</p>
      </div>
    </div>
  );
};
