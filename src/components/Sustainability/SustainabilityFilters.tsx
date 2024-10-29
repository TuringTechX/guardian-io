// src/components/Sustainability/SustainabilityFilters.tsx

import React, { useState } from 'react';
import { debounce } from '../../utils/debounce';

interface SustainabilityFiltersProps {
  onFilterChange: (filters: FilterCriteria) => void;
}

interface FilterCriteria {
  dateRange?: { start: string; end: string };
  category?: string;
  minImpactScore?: number;
}

const SustainabilityFilters: React.FC<SustainabilityFiltersProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [category, setCategory] = useState<string>('');
  const [minImpactScore, setMinImpactScore] = useState<number | ''>('');

  // Debounced filter update function
  const updateFilters = debounce(() => {
    onFilterChange({ dateRange, category, minImpactScore: minImpactScore ? Number(minImpactScore) : undefined });
  }, 300);

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
    updateFilters();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    updateFilters();
  };

  const handleImpactScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setMinImpactScore(value);
    updateFilters();
  };

  return (
    <div className="sustainability-filters bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Filter Sustainability Data</h2>
      
      {/* Date Range Filter */}
      <div className="mb-4">
        <label className="block font-medium">Date Range</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block font-medium">Category</label>
        <select value={category} onChange={handleCategoryChange} className="border p-2 rounded w-full">
          <option value="">All Categories</option>
          <option value="Energy">Energy</option>
          <option value="Water">Water</option>
          <option value="Waste">Waste</option>
          <option value="Emissions">Emissions</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      
      {/* Minimum Impact Score Filter */}
      <div className="mb-4">
        <label className="block font-medium">Minimum Impact Score</label>
        <input
          type="number"
          min="0"
          value={minImpactScore}
          onChange={handleImpactScoreChange}
          placeholder="Enter minimum score"
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default SustainabilityFilters;
