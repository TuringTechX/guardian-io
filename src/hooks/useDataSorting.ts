// src/hooks/useDataSorting.ts

import { useState, useEffect } from 'react';
import { Feature } from '../data/featuresData';

// Custom hook for sorting features by a given key
export const useDataSorting = (data: Feature[], key: keyof Feature) => {
  const [sortedData, setSortedData] = useState<Feature[]>([]);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => (a[key] < b[key] ? 1 : -1));
    setSortedData(sorted);
  }, [data, key]);

  return sortedData;
};
