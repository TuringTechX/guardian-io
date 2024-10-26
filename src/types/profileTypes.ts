// guardian-io/src/types/profileTypes.ts
export interface UserData {
    id: string;
    name: string;
    email: string;
    roles: RoleData[];
    preferences: UserPreferences;
  }
  
  export interface RoleData {
    id: string;
    name: string;
    permissions: string[];
  }
  
  export interface UserPreferences {
    theme: 'dark' | 'light';
    notifications: boolean;
  }
  
  export interface ActivityLogData {
    id: string;
    activity: string;
    date: string;
  }