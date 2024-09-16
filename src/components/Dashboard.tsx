// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import LineChart from './Charts/LineChart';
import WorldMap from './Map/WorldMap';
import { fetchGeoData } from '../api/dashboardApi'; // Mocked API for geo data

const Dashboard: React.FC = () => {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Connect to WebSocket server

    // Handle incoming messages (new data points)
    ws.onmessage = (event) => {
      const newDataPoint = JSON.parse(event.data);
      setTimeSeriesData((prevData) => [...prevData, newDataPoint]);
    };

    return () => {
      ws.close(); // Clean up WebSocket on component unmount
    };
  }, []);

  // Fetch map data
  useEffect(() => {
    async function fetchData() {
      const mapData = await fetchGeoData();
      setGeoData(mapData);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Real-Time Supply Chain Dashboard</h1>
      </header>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-content">
          {/* Real-time updating Line Chart */}
          <LineChart data={timeSeriesData} />

          {/* Static World Map */}
          {geoData && <WorldMap geoData={geoData} />}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
