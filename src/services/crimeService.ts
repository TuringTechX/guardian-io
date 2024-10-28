// src/services/crimeService.ts

import { CrimeData, CrimeAnalytics } from '@/data/wildlifeCrimeData';

// WebSocket instance for real-time updates
let socket: WebSocket | null = null;

/**
 * Connects to a WebSocket for real-time wildlife crime updates.
 * @param onMessage - Callback function to handle received real-time crime data.
 */
export const connectWebSocket = (onMessage: (data: CrimeData) => void) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.warn("WebSocket is already connected.");
    return;
  }
  
  socket = new WebSocket('wss://api.example.com/realtime-crimes');
  
  socket.onopen = () => console.log("WebSocket connection established.");
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => console.error("WebSocket Error:", error);

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
    socket = null; // Reset socket to allow reconnection if needed
  };
};

/**
 * Disconnects the WebSocket to stop receiving real-time updates.
 */
export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
    console.log("WebSocket disconnected.");
  } else {
    console.warn("WebSocket is not connected.");
  }
};

/**
 * Fetches crime analytics from the server.
 * @returns Promise<CrimeAnalytics> - Resolves to crime analytics data.
 */
export const fetchCrimeAnalytics = async (): Promise<CrimeAnalytics> => {
  try {
    const response = await fetch('https://api.example.com/crime-analytics');
    if (!response.ok) {
      throw new Error(`Failed to fetch crime analytics: ${response.statusText}`);
    }
    const data: CrimeAnalytics = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching crime analytics:", error);
    throw error;
  }
};
