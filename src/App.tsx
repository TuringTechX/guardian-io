// src/App.tsx

import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/UIElements/Sidebar';
import Header from './components/UIElements/Header';
import Footer from './components/UIElements/Footer';
import LoadingSpinner from './components/UIElements/LoadingSpinner';
import Dashboard from './pages/dashboard';
import Collaboration from './pages/collaboration';
import Profile from './pages/profile';
import Settings from './pages/settings';
// import NotFound from './pages/not-found';

// Lazy loaded pages for performance
const Gamification = React.lazy(() => import('./pages/gamification'));
const ESGReporting = React.lazy(() => import('./pages/esg-reporting'));

// Animation variants for page transitions
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

const AppContent: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const { isAuthenticated, checkSession } = useAuth();

  // Initial session check
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} flex`}>
      <Sidebar />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header />
        <main className="p-6">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<LoadingSpinner message="Loading..." />}>
                <Routes location={location}>
                  <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  <Route path="/gamification" element={<Gamification />} />
                  <Route path="/esg-reporting" element={<ESGReporting />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
