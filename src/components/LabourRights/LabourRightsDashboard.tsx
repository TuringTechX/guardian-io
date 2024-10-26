// src/components/LabourRights/LabourRightsDashboard.tsx

import React from 'react';

export const LabourRightsDashboard: React.FC = () => {
  return (
    <div className="dashboard-summary">
      <div className="metric-card">
        <h3>Total Audits</h3>
        <p>15</p>
      </div>
      <div className="metric-card">
        <h3>Active Risks</h3>
        <p>3</p>
      </div>
      <div className="metric-card">
        <h3>Risk Level</h3>
        <p>Moderate</p>
      </div>
    </div>
  );
};
