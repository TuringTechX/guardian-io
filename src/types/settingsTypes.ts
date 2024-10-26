// src/types/settingsTypes.ts

export interface UserProfile {
    id: string;
    name: string;
    email: string;
  }
  
  export interface NotificationPreferences {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  }
  
  export interface DisplayPreferences {
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
  }
  
  export interface PrivacyPreferences {
    dataSharing: boolean;
    adPersonalization: boolean;
  }
  