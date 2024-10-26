// src/hooks/useEthicalSourcing.ts

import { useState, useEffect } from 'react';
import { ethicalSourcingService } from '../services/ethicalSourcingService';
import { Supplier, Recommendation } from '../types/ethicalSourcingTypes';

export const useEthicalSourcing = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ethicalSourcingService.fetchSuppliers()
      .then(setSuppliers)
      .catch(setError)
      .finally(() => setLoading(false));

    ethicalSourcingService.fetchRecommendations()
      .then(setRecommendations)
      .catch(setError);
  }, []);

  return { suppliers, recommendations, loading, error };
};
