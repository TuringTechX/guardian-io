// src/components/Map/WildlifeCrimeMap.tsx

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { LatLngExpression } from 'leaflet';
import { CrimeData } from '../../data/wildlifeCrimeData';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconAnchor: [12, 40],  // Adjust anchor for correct placement
});
L.Marker.prototype.options.icon = DefaultIcon;

interface WildlifeCrimeMapProps {
  data: CrimeData[];
  filters: { severity: number; startDate: string; endDate: string };
}

export const WildlifeCrimeMap: React.FC<WildlifeCrimeMapProps> = ({ data, filters }) => {
  const defaultPosition: LatLngExpression = [0, 0]; // Center of the world

  // Transform crime data into heatmap points
  const heatmapPoints = data
    .filter(crime => 
      crime.severity >= filters.severity && 
      new Date(crime.date) >= new Date(filters.startDate) && 
      new Date(crime.date) <= new Date(filters.endDate)
    )
    .map(crime => [crime.latitude, crime.longitude, crime.severity]);

  return (
    <MapContainer center={defaultPosition} zoom={2} scrollWheelZoom={false} className="h-96 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Heatmap layer for intensity visualization */}
      <HeatmapLayer
        points={heatmapPoints}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => m[2]}
        radius={20}
        blur={15}
        max={5}
      />

      {/* Clustered markers */}
      <MarkerClusterGroup>
        {data
          .filter(crime => 
            crime.severity >= filters.severity &&
            new Date(crime.date) >= new Date(filters.startDate) &&
            new Date(crime.date) <= new Date(filters.endDate)
          )
          .map(crime => (
          <Marker key={crime.id} position={[crime.latitude, crime.longitude]}>
            <Popup>
              <h3>{crime.title}</h3>
              <p>{crime.description}</p>
              <p><strong>Severity:</strong> {crime.severity}</p>
              <p><strong>Date:</strong> {new Date(crime.date).toLocaleDateString()}</p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
