// src/pages/wildlife-crime.tsx

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { WildlifeCrimeMap } from '../components/Map/WildlifeCrimeMap';
import { CrimeFilter } from '../components/CrimeFilter';
import { CrimeDetailsCard } from '../components/CrimeDetailsCard';
import { TimeSlider } from '../components/TimeSlider';
import { useGeoDataSorting } from '../hooks/useGeoDataSorting';
import { connectWebSocket, disconnectWebSocket } from '../services/crimeService';
import { sendNotification, requestNotificationPermission } from '../services/notificationService';
import { debounce } from '../utils/apiHelper';
import { CrimeData } from '../data/wildlifeCrimeData';

// src/pages/wildlife-crime.tsx

import { fetchPredictions } from '../services/aiPredictionService';

// In useEffect, fetch predictions
useEffect(() => {
  const fetchAIData = async () => {
    const predictions = await fetchPredictions(currentDate); // Predicted data for the currentDate
    setCrimeData((prevData) => [...prevData, ...predictions]); // Merge real and predicted data
  };

  fetchAIData();
}, [currentDate]);

// In the WildlifeCrimeMap, render predicted crimes with different marker styles
<WildlifeCrimeMap
  data={sortedCrimeData}
  filters={{ ...filters, currentDate }}
  predictedData={predictions}
/>

// src/pages/wildlife-crime.tsx

import { useTranslation } from 'react-i18next';

const WildlifeCrimePage: React.FC = () => {
  const { t } = useTranslation(); // Get translated strings

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-6 bg-white">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <LanguageSwitcher />
      </header>
      {/* Rest of the page */}
    </div>
  );
};


const WildlifeCrimePage: React.FC = () => {
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
  const [currentCrime, setCurrentCrime] = useState<number>(0);
  const [filters, setFilters] = useState<{ severity: number; startDate: string; endDate: string }>({
    severity: 1,
    startDate: '2020-01-01',
    endDate: new Date().toISOString().split('T')[0], // Today's date
  });
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const userLocation = { latitude: 40.7128, longitude: -74.0060 }; // Example: New York City

  // Fetch wildlife crime data (debounced)
  useEffect(() => {
    const fetchCrimeData = debounce(async () => {
      try {
        const response = await fetch('https://api.example.com/wildlife-crimes');
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error('Failed to fetch crime data:', error);
      }
    }, 300);  // 300ms debounce delay

    fetchCrimeData();
  }, [filters]);

  // Real-time crime updates via WebSocket
  useEffect(() => {
    requestNotificationPermission();  // Request notification permission on page load

    const handleNewCrime = (newCrime: CrimeData) => {
      setCrimeData((prevData) => [...prevData, newCrime]);
      sendNotification('New Wildlife Crime Alert', {
        body: `${newCrime.title} reported near you!`,
        icon: '/icons/crime-alert.png',
      });
    };

    connectWebSocket(handleNewCrime);

    return () => disconnectWebSocket();
  }, []);

  // Sort fetched and real-time data based on proximity
  const sortedCrimeData = useGeoDataSorting(crimeData, {
    method: 'proximity',
    userLocation,
  });

  // Carousel Navigation
  const nextCrime = () => setCurrentCrime((prev) => (prev + 1) % sortedCrimeData.length);
  const prevCrime = () => setCurrentCrime((prev) => (prev - 1 + sortedCrimeData.length) % sortedCrimeData.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-700">
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wildlife Crime Tracker</h1>
      </header>

      {/* Filters for Severity and Date Range */}
      <section id="filters" className="py-8 bg-gray-100 dark:bg-gray-800">
        <CrimeFilter filters={filters} setFilters={setFilters} />
      </section>

      {/* TimeSlider for Animation */}
      <TimeSlider
        startDate="2020-01-01"
        endDate={new Date().toISOString().split('T')[0]}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      {/* Crime Carousel */}
      <section id="crimes" className="py-16 bg-white dark:bg-gray-900">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">Major Wildlife Crimes</h3>

        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 text-gray-600 dark:text-white" onClick={prevCrime}>
            <FaArrowLeft size={24} />
          </button>

          {sortedCrimeData.length > 0 && sortedCrimeData.map((crime: CrimeData, index: number) => (
            <CrimeDetailsCard key={crime.id} crime={crime} active={index === currentCrime} />
          ))}

          <button className="absolute right-0 text-gray-600 dark:text-white" onClick={nextCrime}>
            <FaArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Map with Heatmap and Clustering */}
      <section id="map" className="py-16 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">Global Wildlife Crime Hotspots</h3>

        <div className="max-w-6xl mx-auto">
          <WildlifeCrimeMap data={sortedCrimeData} filters={{ ...filters, currentDate }} />
        </div>
      </section>

      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-gray-600 dark:text-gray-300">© 2024 Wildlife Crime Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WildlifeCrimePage;
