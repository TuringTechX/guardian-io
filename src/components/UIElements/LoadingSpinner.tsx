// guardian-io/src/components/UIElements/LoadingSpinner.tsx

import React from 'react';
import { motion } from 'framer-motion';
import './loadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: number; // Diameter of the spinner
  color?: string; // Custom color for the spinner, overrides theme colors
  type?: 'spinner' | 'pulse' | 'dots'; // Animation type
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, size = 40, color, type = 'spinner' }) => {
  // Spinner variations using Framer Motion for custom animations
  const spinnerVariants = {
    spinner: {
      initial: { rotate: 0 },
      animate: { rotate: 360 },
      transition: { loop: Infinity, ease: 'linear', duration: 1 },
    },
    pulse: {
      initial: { scale: 0.8, opacity: 0.6 },
      animate: { scale: 1, opacity: 1 },
      transition: { repeat: Infinity, repeatType: 'mirror', duration: 0.8 },
    },
    dots: {
      initial: { opacity: 0 },
      animate: { opacity: [0, 1, 0], x: [0, -10, 0, 10, 0] },
      transition: { repeat: Infinity, duration: 1 },
    },
  };

  return (
    <div className="loading-spinner-container" style={{ height: size * 2 }}>
      <motion.div
        className={`spinner-${type}`}
        style={{
          width: size,
          height: size,
          borderColor: color ? color : undefined,
        }}
        {...spinnerVariants[type]}
      >
        {type === 'dots' && (
          <>
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </>
        )}
      </motion.div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
