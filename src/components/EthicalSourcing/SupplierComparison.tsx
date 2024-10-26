// src/components/EthicalSourcing/SupplierComparison.tsx

import React from 'react';
import { Supplier } from '../../types/ethicalSourcingTypes';

interface SupplierComparisonProps {
  suppliers: Supplier[];
}

export const SupplierComparison: React.FC<SupplierComparisonProps> = ({ suppliers }) => (
  <div className="supplier-comparison grid grid-cols-3 gap-4">
    {suppliers.map(supplier => (
      <div key={supplier.id} className="supplier-card p-4 rounded shadow-md">
        <h3 className="supplier-name font-semibold">{supplier.name}</h3>
        <p>Score: {supplier.sustainabilityScore}</p>
        <p>Risk Level: {supplier.riskLevel}</p>
      </div>
    ))}
  </div>
);
