// src/pages/labour-rights.tsx

import React from 'react';
import { LabourRightsDashboard } from '../components/LabourRights/LabourRightsDashboard';
import { ComplianceAuditTable } from '../components/LabourRights/ComplianceAuditTable';
import { RiskAssessmentChart } from '../components/LabourRights/RiskAssessmentChart';
import { AuditTimeline } from '../components/LabourRights/AuditTimeline';
import { ComplianceForm } from '../components/LabourRights/ComplianceForm';
import { StakeholderComments } from '../components/LabourRights/StakeholderComments';
import '../styles/labourRights.css';

const LabourRightsPage: React.FC = () => {
  return (
    <div className="labour-rights-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Labour Rights Compliance and Reporting</h1>
      <LabourRightsDashboard />
      <ComplianceAuditTable />
      <RiskAssessmentChart />
      <AuditTimeline />
      <ComplianceForm />
      <StakeholderComments />
    </div>
  );
};

export default LabourRightsPage;
