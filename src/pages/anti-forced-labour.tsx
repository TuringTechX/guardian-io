// src/pages/anti-forced-labour.tsx

import React from 'react';
import { ComplianceDashboard } from '../components/AntiForcedLabour/ComplianceDashboard';
import { RiskFactorChart } from '../components/AntiForcedLabour/RiskFactorChart';
import { AuditHistoryTable } from '../components/AntiForcedLabour/AuditHistoryTable';
import { ComplianceForm } from '../components/AntiForcedLabour/ComplianceForm';
import { PartnerLinks } from '../components/AntiForcedLabour/PartnerLinks';
import { AlertsPanel } from '../components/AntiForcedLabour/AlertsPanel';
import '../styles/antiForcedLabour.css';

const AntiForcedLabourPage: React.FC = () => {
  return (
    <div className="anti-forced-labour-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Anti-Forced Labour Compliance and Risk Management</h1>
      <AlertsPanel />
      <ComplianceDashboard />
      <RiskFactorChart />
      <AuditHistoryTable />
      <ComplianceForm />
      <PartnerLinks />
    </div>
  );
};

export default AntiForcedLabourPage;
