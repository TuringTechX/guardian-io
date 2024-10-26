// src/components/TimeSlider.tsx

import React from 'react';

interface TimeSliderProps {
  startDate: string;
  endDate: string;
  currentDate: string;
  onDateChange: (date: string) => void;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ startDate, endDate, currentDate, onDateChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  return (
    <div className="w-full px-4 py-6">
      <input
        type="range"
        min={new Date(startDate).getTime()}
        max={new Date(endDate).getTime()}
        value={new Date(currentDate).getTime()}
        onChange={handleChange}
        className="w-full"
      />
      <div className="text-center text-gray-600">{new Date(currentDate).toLocaleDateString()}</div>
    </div>
  );
};
