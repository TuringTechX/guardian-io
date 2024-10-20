// src/services/authService.ts

import { apiHelper } from '../utils/apiHelper';
import { retryPromise } from '../utils/retryHelper'; // For retrying failed API requests

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
}

interface AuthResponse {
  success: boolean;
  errors?: Map<string, string>;  // Map for efficient error lookups
  token?: string;
}

export const authService = {
  // Register a new user with retry on failure
  register: async (formData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await retryPromise(() => apiHelper.post('/auth/register', formData), 3); // Retry 3 times
      if (response.status === 201) {
        return {
          success: true,
          token: response.data.token,  // Save token for future use
        };
      } else {
        return {
          success: false,
          errors: new Map(Object.entries(response.data.errors || {})), // Convert errors to Map for fast lookups
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        errors: new Map([['general', 'Registration failed. Please try again.']]), // Consistent error handling
      };
    }
  },

  // Login with retry logic and optimized error handling
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await retryPromise(() => apiHelper.post('/auth/login', { email, password }), 2); // Retry 2 times
      if (response.status === 200) {
        return {
          success: true,
          token: response.data.token,
        };
      } else {
        return {
          success: false,
          errors: new Map(Object.entries(response.data.errors || {})),
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        errors: new Map([['general', 'Login failed. Please try again.']]),
      };
    }
  },
};
