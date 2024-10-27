// src/components/UIElements/Tooltip.tsx

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  message: string;
  position?: 'top' | 'right' | 'bottom' | 'left'; // Optional position prop
  delay?: number; // Optional delay prop
  darkMode?: boolean; // Optional dark mode styling
}

const Tooltip: React.FC<TooltipProps> = ({ message, position = 'top', delay = 200, darkMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isVisible) {
      adjustPosition();
    }
  }, [isVisible]);

  // Show and hide handlers with delay
  const showTooltip = () => {
    setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    setTimeout(() => setIsVisible(false), delay);
  };

  // Function to adjust tooltip position
  const adjustPosition = () => {
    if (!tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const boundingRect = tooltip.getBoundingClientRect();

    const positions = {
      top: { left: '50%', transform: 'translateX(-50%)', bottom: '100%' },
      right: { left: '100%', top: '50%', transform: 'translateY(-50%)' },
      bottom: { left: '50%', transform: 'translateX(-50%)', top: '100%' },
      left: { right: '100%', top: '50%', transform: 'translateY(-50%)' },
    };

    setStyle(positions[position]);

    // Ensure tooltip fits within viewport
    if (boundingRect.right > window.innerWidth) {
      setStyle((prev) => ({ ...prev, left: 'auto', right: 0 }));
    }
    if (boundingRect.bottom > window.innerHeight) {
      setStyle((prev) => ({ ...prev, top: 'auto', bottom: '100%' }));
    }
  };

  // Framer Motion variants for animations
  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      aria-describedby="tooltip"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={`absolute z-10 p-2 rounded-md text-sm shadow-lg ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
            style={style}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            transition={{ duration: 0.2 }}
            role="tooltip"
            id="tooltip"
          >
            <p>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Tooltip trigger, e.g., an icon or question mark */}
      <span className="text-blue-500 cursor-pointer">ⓘ</span>
    </div>
  );
};

export default Tooltip;
