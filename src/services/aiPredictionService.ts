// src/services/aiPredictionService.ts

import axios from 'axios';

// Fetch AI Predictions from Python API
export const fetchPredictions = async (futureDate: string) => {
  try {
    const response = await axios.get(`http://api.example.com/predict?date=${futureDate}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    return [];
  }
};
