// src/components/UIElements/NotificationBanner.tsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface NotificationBannerProps {
  message: string;
  position?: 'top' | 'bottom' | 'floating';
  duration?: number; // Auto-dismiss duration in milliseconds
  theme?: 'light' | 'dark';
  dismissible?: boolean;
  onDismiss?: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  message,
  position = 'top',
  duration = 5000,
  theme = 'light',
  dismissible = true,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after specified duration
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss && onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  // Framer Motion animation variants for entry/exit
  const bannerVariants = {
    hidden: { opacity: 0, y: position === 'top' ? -30 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 w-full md:max-w-2xl mx-auto px-4 py-3 flex items-center shadow-lg rounded ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } ${position === 'top' ? 'top-4' : position === 'bottom' ? 'bottom-4' : 'top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'}`}
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <div className="flex-1">
            <p className="text-sm">{message}</p>
          </div>
          {dismissible && (
            <button onClick={() => setIsVisible(false)} className="ml-3">
              <IoClose className="text-lg" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;
