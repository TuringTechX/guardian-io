// src/components/Map/WildlifeCrimeMap.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L, { LatLngExpression } from 'leaflet';
import { CrimeData } from '../../data/wildlifeCrimeData';

// Define icon styles for predicted crimes
const PredictionIcon = L.icon({
  iconUrl: 'https://example.com/prediction-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Define default icon style for actual crime data
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconAnchor: [12, 40],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface WildlifeCrimeMapProps {
  data: CrimeData[];
  predictedData?: CrimeData[];  // Optional for predictions
  filters: {
    severity: number;
    startDate: string;
    endDate: string;
    currentDate?: string;  // Make currentDate optional
  };
}

export const WildlifeCrimeMap: React.FC<WildlifeCrimeMapProps> = ({ data, predictedData = [], filters }) => {
  const defaultPosition: LatLngExpression = [0, 0]; // Center of the world map

  // Transform crime data to heatmap points based on severity and filter criteria
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
        longitudeExtractor={(m: any[]) => m[1]}
        latitudeExtractor={(m: any[]) => m[0]}
        intensityExtractor={(m: any[]) => m[2]}
        radius={20}
        blur={15}
        max={5}
      />

      {/* Clustered markers for actual and predicted data */}
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

        {/* Predicted crime markers */}
        {predictedData
          .filter(prediction =>
            prediction.severity >= filters.severity &&
            new Date(prediction.date) >= new Date(filters.startDate) &&
            new Date(prediction.date) <= new Date(filters.endDate)
          )
          .map(prediction => (
            <Marker key={prediction.id} position={[prediction.latitude, prediction.longitude]} icon={PredictionIcon}>
              <Popup>
                <h3>Predicted: {prediction.title}</h3>
                <p>{prediction.description}</p>
                <p><strong>Severity:</strong> {prediction.severity}</p>
                <p><strong>Predicted Date:</strong> {new Date(prediction.date).toLocaleDateString()}</p>
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
