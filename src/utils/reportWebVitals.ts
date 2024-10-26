// src/utils/reportWebVitals.ts

import { Metric, getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface WebVitalsReport {
  name: string;
  value: number;
  id: string;
}

// Function to send data to an analytics endpoint
const sendToAnalytics = async (report: WebVitalsReport) => {
  try {
    await fetch('https://analytics.example.com/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
  } catch (error) {
    console.error('Error reporting Web Vitals:', error);
  }
};

// Function to log data to the console
const logToConsole = (report: WebVitalsReport) => {
  console.log(`[Web Vital] ${report.name}: ${report.value} (id: ${report.id})`);
};

// Main reportWebVitals function
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Function to handle and report each metric
    const webVitalsReportHandler = (metric: Metric) => {
      const report: WebVitalsReport = {
        name: metric.name,
        value: metric.value,
        id: metric.id,
      };

      // Log and send metrics
      logToConsole(report);
      sendToAnalytics(report);

      // Additional callback, if provided
      onPerfEntry(metric);
    };

    // Web Vitals measurement functions
    getCLS(webVitalsReportHandler); // Cumulative Layout Shift
    getFID(webVitalsReportHandler); // First Input Delay
    getFCP(webVitalsReportHandler); // First Contentful Paint
    getLCP(webVitalsReportHandler); // Largest Contentful Paint
    getTTFB(webVitalsReportHandler); // Time to First Byte
  }
};

export default reportWebVitals;
