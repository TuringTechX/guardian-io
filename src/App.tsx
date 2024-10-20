// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';  // Framer Motion for page transitions
import Sidebar from './components/UIElements/Sidebar';
import Header from './components/UIElements/Header';
import Footer from './components/UIElements/Footer';
import Dashboard from './pages/dashboard';
import Collaboration from './pages/collaboration';
// ...other imports

const App = () => {
  const location = useLocation();

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-50 dark:bg-gray-900">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}  // Animation happens based on route
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/collaboration" element={<Collaboration />} />
              {/* Add all other routes */}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
