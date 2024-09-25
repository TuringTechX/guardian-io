// src/pages/wildlife-crime.tsx

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { WildlifeCrimeMap } from '../components/Map/WildlifeCrimeMap';
import { CrimeDetailsCard } from '../components/CrimeDetailsCard';
import { useGeoDataSorting } from '../hooks/useGeoDataSorting';
import { CrimeData } from '../data/wildlifeCrimeData'; // CrimeData type

const WildlifeCrimePage: React.FC = () => {
  const [currentCrime, setCurrentCrime] = useState<number>(0);
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]); // Dynamic data from API

  // Example user location for proximity sorting
  const userLocation = { latitude: 40.7128, longitude: -74.0060 }; // Example: New York City

  // Fetch wildlife crime data from API
  useEffect(() => {
    async function fetchCrimeData() {
      try {
        const response = await fetch('https://api.example.com/wildlife-crimes'); // Replace with actual API URL
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error('Failed to fetch crime data:', error);
      }
    }
    fetchCrimeData();
  }, []);

  // Sort fetched data based on proximity to user's location
  const sortedCrimeData = useGeoDataSorting(crimeData, {
    method: 'proximity',
    userLocation,
  });

  // Carousel navigation
  const nextCrime = () => setCurrentCrime((prev) => (prev + 1) % sortedCrimeData.length);
  const prevCrime = () => setCurrentCrime((prev) => (prev - 1 + sortedCrimeData.length) % sortedCrimeData.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-700">
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wildlife Crime Tracker</h1>
      </header>

      <section id="crimes" className="py-16 bg-white dark:bg-gray-900">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">Major Wildlife Crimes</h3>

        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 text-gray-600 dark:text-white" onClick={prevCrime}>
            <FaArrowLeft size={24} />
          </button>

          {/* Carousel of wildlife crimes */}
          {sortedCrimeData.map((crime: CrimeData, index: number) => (
            <CrimeDetailsCard key={crime.id} crime={crime} active={index === currentCrime} />
          ))}

          <button className="absolute right-0 text-gray-600 dark:text-white" onClick={nextCrime}>
            <FaArrowRight size={24} />
          </button>
        </div>
      </section>

      <section id="map" className="py-16 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">Global Wildlife Crime Hotspots</h3>

        <div className="max-w-6xl mx-auto">
          <WildlifeCrimeMap data={sortedCrimeData} />
        </div>
      </section>

      <footer className="bg-gray-200 dark:bg-gray-700 text-center py-6">
        <p className="text-gray-600 dark:text-gray-300">© 2024 Wildlife Crime Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WildlifeCrimePage;
