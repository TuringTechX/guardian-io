// src/context/ESGContext.tsx

import React, { createContext, useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import { esgService } from '../services/esgService';  // ESG data fetching service
import { ESGData, ESGContextType } from '../types/esgTypes';
import { WebSocketAPI } from '../services/WebSocketAPI';  // Real-time updates via WebSocket

interface ESGProviderProps {
  children: ReactNode;
}

export const ESGContext = createContext<ESGContextType | undefined>(undefined);

export const useESGContext = (): ESGContextType => {
  const context = useContext(ESGContext);
  if (!context) {
    throw new Error('useESGContext must be used within an ESGProvider');
  }
  return context;
};

export const ESGProvider: React.FC<ESGProviderProps> = ({ children }) => {
  const [esgMetrics, setEsgMetrics] = useState<ESGData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true); // WebSocket connection status
  const webSocketURL = 'wss://example.com/esg-updates'; // Replace with your actual WebSocket URL
  const ws = WebSocketAPI.getInstance(webSocketURL);

  // Fetch initial ESG data from API and set cache
  const fetchESGMetrics = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await esgService.getESGMetrics();
      setEsgMetrics(data);
      localStorage.setItem('cachedESGData', JSON.stringify(data));  // Cache data
      setError(null);
    } catch (error) {
      setError('Failed to load ESG metrics. Check your network or try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load cached data if available on mount to support offline access
  useEffect(() => {
    const cachedData = localStorage.getItem('cachedESGData');
    if (cachedData) {
      setEsgMetrics(JSON.parse(cachedData));
    }
    fetchESGMetrics(); // Fetch updated data from the API
  }, [fetchESGMetrics]);

  // Establish WebSocket connection for real-time ESG data updates
  useEffect(() => {
    ws.connect();

    // Handle real-time updates for ESG metrics
    ws.addListener('esgUpdate', (data: ESGData) => {
      setEsgMetrics((prevMetrics) => {
        const updatedMetrics = mergeRealTimeData(prevMetrics, data);
        localStorage.setItem('cachedESGData', JSON.stringify(updatedMetrics));
        return updatedMetrics;
      });
    });

    ws.addListener('connectionStatus', (status: boolean) => {
      setIsConnected(status);
    });

    return () => {
      ws.disconnect();
    };
  }, [ws]);

  return (
    <ESGContext.Provider
      value={{
        esgMetrics,
        isLoading,
        error,
        isConnected,
        fetchESGMetrics,
      }}
    >
      {children}
    </ESGContext.Provider>
  );
};

// Helper function to merge real-time updates with existing ESG data
function mergeRealTimeData(prevData: ESGData | null, newData: ESGData): ESGData {
  if (!prevData) return newData;

  // Combine ESG scores or values intelligently (e.g., by averaging)
  return {
    ...prevData,
    scores: {
      ...prevData.scores,
      ...newData.scores,
    },
    lastUpdated: new Date().toISOString(),  // Update timestamp
  };
}
