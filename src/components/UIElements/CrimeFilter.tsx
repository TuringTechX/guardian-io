// src/components/CrimeFilter.tsx

import React from 'react';

interface CrimeFilterProps {
  filters: { severity: number; startDate: string; endDate: string };
  setFilters: React.Dispatch<React.SetStateAction<{ severity: number; startDate: string; endDate: string }>>;
}

export const CrimeFilter: React.FC<CrimeFilterProps> = ({ filters, setFilters }) => {
  const handleSeverityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, severity: parseInt(e.target.value) }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, endDate: e.target.value }));
  };

  return (
    <div className="flex flex-col items-center mb-8 space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="severity" className="text-gray-700 dark:text-gray-200">Minimum Severity:</label>
        <input
          type="range"
          id="severity"
          name="severity"
          min="1"
          max="5"
          value={filters.severity}
          onChange={handleSeverityChange}
          className="w-64"
        />
        <span className="text-gray-900 dark:text-gray-300">{filters.severity}</span>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="startDate" className="text-gray-700 dark:text-gray-200">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={filters.startDate}
          onChange={handleStartDateChange}
          className="px-4 py-2 border dark:border-gray-600 rounded"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="endDate" className="text-gray-700 dark:text-gray-200">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={filters.endDate}
          onChange={handleEndDateChange}
          className="px-4 py-2 border dark:border-gray-600 rounded"
        />
      </div>
    </div>
  );
};
