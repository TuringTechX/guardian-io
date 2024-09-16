// src/components/Map/WorldMap.tsx
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Provide your Mapbox token
mapboxgl.accessToken = 'your_mapbox_access_token';

const WorldMap: React.FC<{ geoData: any }> = ({ geoData }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'world-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [0, 20],
      zoom: 1.5,
    });

    map.on('load', () => {
      map.addSource('countries', {
        type: 'geojson',
        data: geoData,
      });

      map.addLayer({
        id: 'countries',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      });
    });

    return () => map.remove();
  }, [geoData]);

  return <div id="world-map" style={{ height: '500px', width: '100%' }} />;
};

export default WorldMap;
