// src/components/Carousel.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItemProps {
  active: boolean;
  children: React.ReactNode;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ active, children }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative overflow-hidden">{children}</div>;
};
