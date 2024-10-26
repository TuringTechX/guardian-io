// guardian-io/src/services/authService.ts
import { apiHelper } from '../utils/apiHelper';
import { retryPromise } from '../utils/retryHelper';
import { authApi } from '../api/authApi';

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
  errors?: Map<string, string>;
  token?: string;
  user?: any;
  refreshToken?: string;
}

export const authService = {
  // Register a new user with retry on failure
  register: async (formData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await retryPromise(() => apiHelper.post('/auth/register', formData), 3);
      if (response.status === 201) {
        return {
          success: true,
          token: response.data?.token || '',  // Default to empty string if token is missing
        };
      } else {
        return {
          success: false,
          errors: new Map(Object.entries(response.data?.errors || {})),  // Optional chaining for safe access
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        errors: new Map([['general', 'Registration failed. Please try again.']]),
      };
    }
  },

  // Login with retry logic and optimized error handling
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await retryPromise(() => apiHelper.post('/auth/login', { email, password }), 2);
      if (response.status === 200) {
        return {
          success: true,
          token: response.data?.token || '',         // Ensure token is a string
          user: response.data?.user || null,         // Default to null if user data is missing
          refreshToken: response.data?.refreshToken || '',  // Default to empty string if refreshToken is missing
        };
      } else {
        return {
          success: false,
          errors: new Map(Object.entries(response.data?.errors || {})),  // Optional chaining for errors
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

  // Refresh the authentication token
  refreshToken: async (): Promise<string> => {
    try {
      const response = await fetch('/api/refresh-token', { method: 'POST' });
      const data = await response.json();
      if (!response.ok || !data.newToken) throw new Error('Token refresh failed');
      return data.newToken;  // Type assertion ensured by error handling
    } catch (error) {
      console.error('Token refresh error:', error);
      return '';  // Return an empty string if refresh fails
    }
  },

  // Logout the user and clear session
  logout: async (): Promise<void> => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};
