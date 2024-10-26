// src/routes.tsx

import React, { Suspense, useContext, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoadingSpinner from './components/UIElements/LoadingSpinner';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Settings from './pages/settings';
// import NotFound from './pages/not-found';
import Login from './pages/login';

// Lazy-loaded pages for performance optimization
const Collaboration = lazy(() => import('./pages/collaboration'));
const Gamification = lazy(() => import('./pages/gamification'));
const ESGReporting = lazy(() => import('./pages/esg-reporting'));
const AntiForcedLabour = lazy(() => import('./pages/anti-forced-labour'));
const LabourRights = lazy(() => import('./pages/labour-rights'));
const EthicalSourcing = lazy(() => import('./pages/ethical-sourcing'));
const Notifications = lazy(() => import('./pages/notifications'));

// Route Guard Component to protect private routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const authContext = useContext(AuthContext);
  
  // Check for undefined context and handle accordingly
  if (!authContext) {
    return <Navigate to="/login" />;  // Redirect if AuthContext is unavailable
  }
  
  const { isAuthenticated } = authContext;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RoutesConfig: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        
        {/* Private Routes (Protected by PrivateRoute wrapper) */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/collaboration" element={<PrivateRoute><Collaboration /></PrivateRoute>} />
        <Route path="/gamification" element={<PrivateRoute><Gamification /></PrivateRoute>} />
        <Route path="/esg-reporting" element={<PrivateRoute><ESGReporting /></PrivateRoute>} />
        <Route path="/anti-forced-labour" element={<PrivateRoute><AntiForcedLabour /></PrivateRoute>} />
        <Route path="/labour-rights" element={<PrivateRoute><LabourRights /></PrivateRoute>} />
        <Route path="/ethical-sourcing" element={<PrivateRoute><EthicalSourcing /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;
