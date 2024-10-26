// src/utils/settingsHelper.ts

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };
  
  export const transformSettingsData = (data: any): any => {
    // Example transformation logic
    return data;
  };
  