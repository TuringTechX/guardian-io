// src/components/CSR/ImpactMap.tsx

import React from 'react';
import { Map, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const impactRegions = [
  { id: 1, name: 'Community A', lat: 51.505, lng: -0.09 },
  { id: 2, name: 'Community B', lat: 51.51, lng: -0.1 },
];

export const ImpactMap: React.FC = () => (
  <div className="impact-map">
    <h2 className="text-xl font-semibold mb-4">Community Impact Map</h2>
    <Map center={[51.505, -0.09]} zoom={13}>
      {impactRegions.map(region => (
        <Marker key={region.id} position={[region.lat, region.lng]} />
      ))}
    </Map>
  </div>
);
