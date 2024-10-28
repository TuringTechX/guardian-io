// src/components/UIElements/LoadingSpinner.tsx

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';  // Updated to accept specific string values
  color?: string;
}

const sizeClasses = {
  small: 'w-4 h-4 border-2',
  medium: 'w-6 h-6 border-4',
  large: 'w-8 h-8 border-4',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color = 'text-white' }) => {
  return (
    <div className={`inline-block ${sizeClasses[size]} border-t-transparent border-solid rounded-full animate-spin ${color}`} />
  );
};

export default LoadingSpinner;
