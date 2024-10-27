// src/components/ESGReporting/FilterPanel.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../UIElements/Button';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  dateRange: { start: Date | null; end: Date | null };
  region: string;
  riskLevel: string;
  complianceStatus: string;
}

const regions = ['All', 'North America', 'Europe', 'Asia', 'South America'];
const riskLevels = ['All', 'High', 'Medium', 'Low'];
const complianceStatuses = ['All', 'Compliant', 'Non-Compliant'];

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [region, setRegion] = useState<string>('All');
  const [riskLevel, setRiskLevel] = useState<string>('All');
  const [complianceStatus, setComplianceStatus] = useState<string>('All');

  // Apply filters when "Apply Filters" button is clicked
  const applyFilters = () => {
    onFilterChange({
      dateRange,
      region,
      riskLevel,
      complianceStatus,
    });
  };

  // Toggle Filter Panel open/close
  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className="filter-panel border-b border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button onClick={togglePanel} className="text-gray-500 dark:text-gray-400">
          {isOpen ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-4"
          >
            {/* Date Range Picker */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
              <div className="flex gap-2">
                <DatePicker
                  selected={dateRange.start}
                  onChange={(startDate) => setDateRange((prev) => ({ ...prev, start: startDate }))}
                  selectsStart
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  placeholderText="Start Date"
                  className="input-field"
                />
                <DatePicker
                  selected={dateRange.end}
                  onChange={(endDate) => setDateRange((prev) => ({ ...prev, end: endDate }))}
                  selectsEnd
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  minDate={dateRange.start}
                  placeholderText="End Date"
                  className="input-field"
                />
              </div>
            </div>

            {/* Region Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
              <Dropdown options={regions} selected={region} onChange={setRegion} />
            </div>

            {/* Risk Level Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Level</label>
              <Dropdown options={riskLevels} selected={riskLevel} onChange={setRiskLevel} />
            </div>

            {/* Compliance Status Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Compliance Status</label>
              <Dropdown options={complianceStatuses} selected={complianceStatus} onChange={setComplianceStatus} />
            </div>

            {/* Apply Filters Button */}
            <div className="flex justify-center items-end mt-4 md:mt-0">
              <Button onClick={applyFilters} className="bg-blue-600 text-white hover:bg-blue-700">
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
