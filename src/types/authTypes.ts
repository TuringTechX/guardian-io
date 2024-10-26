// src/types/authTypes.ts

// Role types for role-based access control
export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Employee = 'Employee',
  Guest = 'Guest',
}

// User interface representing user details
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;              // Essential for access control
  requiresMFA: boolean;         // Whether MFA is required for the user
  lastLogin: Date | null;       // Last login time for user tracking
  isVerified: boolean;          // Verification status for the user
}

// LoginResponse interface for login API responses
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;       // Optional refresh token for session management
  requiresMFA: boolean;
  success: boolean;
}

// OTPResponse interface for multi-factor authentication (MFA) responses
export interface OTPResponse {
  success: boolean;
  message?: string;             // Optional feedback message
}

// Interface for handling state and functions in the AuthContext
export interface AuthContextType {
  user: User | null;            // Current authenticated user
  isAuthenticated: boolean;     // Boolean indicating if user is logged in
  isLoading: boolean;           // Tracks loading state during login/logout
  error: string | null;         // Stores any authentication-related errors
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;  // Checks if user has a specific role
  checkSession: () => void;              // Verifies session and sets user
}
