// src/pages/csr.tsx

import React from 'react';
import { CSRDashboard } from '../components/CSR/CSRDashboard';
import { ProjectTimeline } from '../components/CSR/ProjectTimeline';
import { FutureImpactPrediction } from '../components/CSR/FutureImpactPrediction';
import { ImpactMap } from '../components/CSR/ImpactMap';
import '../styles/csr.css';

const CSRPage: React.FC = () => {
  return (
    <div className="csr-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Corporate Social Responsibility (CSR) Dashboard</h1>
      <CSRDashboard />
      <ProjectTimeline />
      <FutureImpactPrediction />
      <ImpactMap />
    </div>
  );
};

export default CSRPage;
