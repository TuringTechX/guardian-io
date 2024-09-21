// src/hooks/useRealTimeSupplyChainData.ts

import { useState, useEffect } from 'react';

interface Supplier {
  name: string;
  riskLevel: string;
}

interface RiskTrend {
  date: string;
  riskLevel: number;
}

export const useRealTimeSupplyChainData = (setLoading: Function, setError: Function) => {
  const [supplyChainData, setSupplyChainData] = useState<Supplier[]>([]);
  const [highRiskSuppliers, setHighRiskSuppliers] = useState<Supplier[]>([]);
  const [riskTrends, setRiskTrends] = useState<RiskTrend[]>([]);

  // Function to simulate real-time risk trend updates
  const generateRiskData = () => {
    const date = new Date().toISOString().slice(0, 10);
    const riskLevel = Math.floor(Math.random() * 100); // Simulating risk level
    return { date, riskLevel };
  };

  useEffect(() => {
    setLoading(true);
    try {
      // Simulate initial fetch
      const initialData = [
        { name: 'Supplier A', riskLevel: 'High' },
        { name: 'Supplier B', riskLevel: 'Low' },
      ];

      const initialRiskTrends = [
        { date: '2024-09-01', riskLevel: 30 },
        { date: '2024-09-02', riskLevel: 50 },
      ];

      setSupplyChainData(initialData);
      setHighRiskSuppliers(initialData.filter(supplier => supplier.riskLevel === 'High'));
      setRiskTrends(initialRiskTrends);
      setLoading(false);

      // Set up interval for real-time updates (polling every 5 seconds)
      const intervalId = setInterval(() => {
        const newRiskData = generateRiskData();
        setRiskTrends(prevTrends => [...prevTrends, newRiskData]);

        // Simulating a change in risk for a random supplier
        setHighRiskSuppliers(prevSuppliers =>
          prevSuppliers.map(supplier =>
            supplier.name === 'Supplier A'
              ? { ...supplier, riskLevel: Math.random() > 0.5 ? 'Low' : 'High' }
              : supplier
          )
        );
      }, 5000); // Update every 5 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    } catch (error) {
      setError('Failed to fetch real-time data');
      setLoading(false);
    }
  }, [setLoading, setError]);

  return { supplyChainData, highRiskSuppliers, riskTrends };
};
