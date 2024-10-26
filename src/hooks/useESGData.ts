// src/hooks/useESGData.ts

import { useState, useEffect } from 'react';
import { esgService } from '../services/esgService';
import { ESGData } from '../types/esgTypes';

export const useESGData = () => {
  const [data, setData] = useState<ESGData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    esgService.fetchESGData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
