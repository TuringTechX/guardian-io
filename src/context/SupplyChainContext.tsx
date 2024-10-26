// src/context/SupplyChainContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchSupplierRisks } from '../services/supplyChainService';
import { SupplierRisk } from '../types/supplyChainTypes';

interface SupplyChainContextType {
  suppliers: SupplierRisk[];
  isLoading: boolean;
  refreshData: () => void;
}

const SupplyChainContext = createContext<SupplyChainContextType | undefined>(undefined);

export const SupplyChainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<SupplierRisk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSupplierRisks();
      setSuppliers(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = () => {
    loadData();
  };

  return (
    <SupplyChainContext.Provider value={{ suppliers, isLoading, refreshData }}>
      {children}
    </SupplyChainContext.Provider>
  );
};

export const useSupplyChainContext = () => {
  const context = useContext(SupplyChainContext);
  if (!context) {
    throw new Error("useSupplyChainContext must be used within a SupplyChainProvider");
  }
  return context;
};
