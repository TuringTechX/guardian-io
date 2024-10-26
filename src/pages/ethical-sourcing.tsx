// src/pages/ethical-sourcing.tsx

import React from 'react';
import { SupplierComparison } from '../components/EthicalSourcing/SupplierComparison';
import { RiskAssessmentCard } from '../components/EthicalSourcing/RiskAssessmentCard';
import { RecommendationEngine } from '../components/EthicalSourcing/RecommendationEngine';
import { useEthicalSourcing } from '../hooks/useEthicalSourcing';
import '../styles/ethicalSourcing.css';

const EthicalSourcingPage: React.FC = () => {
  const { suppliers, recommendations, loading, error } = useEthicalSourcing();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="ethical-sourcing-page container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Ethical Sourcing Overview</h1>
      <RecommendationEngine recommendations={recommendations} />
      <SupplierComparison suppliers={suppliers} />
      <div className="risk-assessment-section">
        {suppliers.map(supplier => (
          <RiskAssessmentCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
};

export default EthicalSourcingPage;
