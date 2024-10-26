// src/hooks/useCSRData.ts

import { useState, useEffect } from 'react';
import { csrService } from '../services/csrService';
import { CSRData } from '../types/csrTypes';

export const useCSRData = () => {
  const [data, setData] = useState<CSRData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    csrService.fetchCSRData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
