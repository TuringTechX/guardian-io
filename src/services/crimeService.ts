// src/services/crimeService.ts

import { CrimeData } from "@/data/wildlifeCrimeData";

let socket: WebSocket | null = null;

export const connectWebSocket = (onMessage: (data: CrimeData) => void) => {
  socket = new WebSocket('wss://api.example.com/realtime-crimes');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => console.error('WebSocket Error:', error);
  socket.onclose = () => console.log('WebSocket connection closed');
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
