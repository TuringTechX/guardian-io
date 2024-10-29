// src/components/CrimeDetailsCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import { CrimeData } from '../data/wildlifeCrimeData';

interface CrimeDetailsCardProps {
  crime: CrimeData;
  active: boolean;
}

export const CrimeDetailsCard: React.FC<CrimeDetailsCardProps> = ({ crime, active }) => {
  // Animated transition settings for the card
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  // Background color by severity
  const severityColor = (severity: number) => {
    switch (severity) {
      case 5: return 'bg-red-600';
      case 4: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 2: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className={`crime-details-card max-w-md mx-auto p-4 rounded-lg shadow-lg ${active ? 'block' : 'hidden'} ${
        severityColor(crime.severity)
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <FaExclamationTriangle className="text-yellow-200 mr-2" />
        <h2 className="text-xl font-bold text-white">{crime.title}</h2>
      </div>
      <p className="text-sm text-gray-200 mb-3"><strong>Date:</strong> {new Date(crime.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-200 mb-3"><strong>Location:</strong> {`${crime.latitude}, ${crime.longitude}`}</p>
      <p className="text-sm text-gray-200 mb-3"><strong>Description:</strong> {crime.description}</p>
      <p className="text-sm font-semibold text-white"><strong>Severity Level:</strong> {crime.severity}</p>
    </motion.div>
  );
};

export default CrimeDetailsCard;
