// src/components/CSR/CSRDashboard.tsx

import React from 'react';
import { KPIWidget } from './KPIWidget';
import { ComplianceOverview } from './ComplianceOverview';

export const CSRDashboard: React.FC = () => (
  <div className="csr-dashboard grid grid-cols-3 gap-4">
    <KPIWidget title="Community Investment" value="$500,000" />
    <KPIWidget title="Volunteer Hours" value="1,200" />
    <ComplianceOverview complianceLevel="green" />
  </div>
);
