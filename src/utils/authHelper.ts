// src/utils/authHelper.ts

export const authHelper = {
    storeToken: (token: string) => localStorage.setItem('authToken', token),
    retrieveToken: () => localStorage.getItem('authToken'),
  };
  