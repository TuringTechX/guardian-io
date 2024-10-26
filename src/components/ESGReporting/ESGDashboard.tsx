// src/components/ESGReporting/ESGDashboard.tsx

import React from 'react';
import { TargetProgressBar } from './TargetProgressBar';
import { ComplianceIndicator } from './ComplianceIndicator';

export const ESGDashboard: React.FC = () => (
  <div className="esg-dashboard grid grid-cols-2 gap-6">
    <TargetProgressBar title="Environmental Target" progress={85} />
    <TargetProgressBar title="Social Target" progress={70} />
    <ComplianceIndicator title="Governance Compliance" complianceLevel="green" />
  </div>
);
