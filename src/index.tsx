// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { SupplyChainProvider } from './context/SupplyChainContext';
import reportWebVitals from './utils/reportWebVitals';
import * as Sentry from '@sentry/react'; // Error monitoring with Sentry

// Initialize Sentry for error tracking
Sentry.init({
  dsn: 'https://<your-sentry-dsn>',
  tracesSampleRate: 1.0, // Adjust based on the desired rate of performance data collection
});

// Initialize React root
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <SupplyChainProvider>
              <App />
            </SupplyChainProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Registering the service worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful:', registration.scope);
      },
      (error) => {
        console.log('ServiceWorker registration failed:', error);
      }
    );
  });
}

// Reporting web vitals and performance metrics
reportWebVitals(console.log);
