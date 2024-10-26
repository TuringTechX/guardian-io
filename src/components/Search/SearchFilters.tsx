// src/components/Search/SearchFilters.tsx

import React from 'react';
import { ToggleSwitch } from '../UIElements/ToggleSwitch';
import { MultiSelectDropdown } from '../UIElements/MultiSelectDropdown';
import { FilterOptions } from '../../types/searchTypes';

export const SearchFilters: React.FC<{
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}> = ({ filters, setFilters }) => {

  const handleTypeChange = (selectedTypes: string[]) => {
    setFilters({ ...filters, types: selectedTypes });
  };

  const handleDateToggle = (value: boolean) => {
    setFilters({ ...filters, recentOnly: value });
  };

  return (
    <div className="search-filters mb-4">
      <MultiSelectDropdown
        options={['Supplier', 'Compliance', 'Sustainability']}
        selected={filters.types}
        onChange={handleTypeChange}
      />
      <ToggleSwitch
        label="Show recent only"
        value={filters.recentOnly}
        onToggle={handleDateToggle}
      />
    </div>
  );
};
