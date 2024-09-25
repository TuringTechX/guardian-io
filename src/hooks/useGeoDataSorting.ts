// src/hooks/useGeoDataSorting.ts

import { useMemo } from 'react';
import { CrimeData } from '../data/wildlifeCrimeData';

interface GeoDataSortingOptions {
  method: 'severity' | 'proximity';
  userLocation?: { latitude: number; longitude: number }; // For proximity sorting
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const useGeoDataSorting = (crimeData: CrimeData[], options: GeoDataSortingOptions) => {
  const { method, userLocation } = options;

  const sortedData = useMemo(() => {
    if (method === 'severity') {
      return [...crimeData].sort((a, b) => b.severity - a.severity);
    }

    if (method === 'proximity' && userLocation) {
      return [...crimeData].sort((a, b) => {
        const distanceA = haversineDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
        const distanceB = haversineDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
      });
    }

    return crimeData;
  }, [crimeData, method, userLocation]);

  return sortedData;
};
