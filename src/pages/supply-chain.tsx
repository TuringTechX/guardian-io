// src/pages/supply-chain.tsx

import React from 'react';
import { SupplyChainTransparency } from '../components/SupplyChain/SupplyChainTransparency';
import { SupplierTable } from '../components/SupplyChain/SupplierTable';
import { RiskAssessmentTable } from '../components/SupplyChain/RiskAssessmentTable';
import { BlockchainTable } from '../components/SupplyChain/BlockchainTable';
import { SupplyChainFilters } from '../components/SupplyChain/SupplyChainFilters';
import { MapVisualization } from '../components/SupplyChain/MapVisualization';
import '../styles/supplyChain.css';

const SupplyChainPage: React.FC = () => {
  return (
    <div className="supply-chain-page container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Supply Chain Transparency and Metrics</h1>

      <SupplyChainFilters />
      <SupplyChainTransparency />
      <MapVisualization />
      <SupplierTable />
      <RiskAssessmentTable />
      <BlockchainTable />
    </div>
  );
};

export default SupplyChainPage;
