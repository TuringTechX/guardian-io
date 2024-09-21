// src/hooks/useFetchSupplyChainData.ts

import { useState, useEffect } from 'react';

interface Supplier {
  name: string;
  riskLevel: string;
}

export const useFetchSupplyChainData = (setLoading: Function, setError: Function) => {
  const [supplyChainData, setSupplyChainData] = useState<Supplier[]>([]);
  const [highRiskSuppliers, setHighRiskSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/supplyChain');  // Simulated API endpoint
        const data = await response.json();
        setSupplyChainData(data);
        
        // Filter out high-risk suppliers
        const highRisk = data.filter((supplier: Supplier) => supplier.riskLevel === 'High');
        setHighRiskSuppliers(highRisk);
        
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch supply chain data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading, setError]);

  return { supplyChainData, highRiskSuppliers };
};
