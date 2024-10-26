// src/services/mfaService.ts

export const mfaService = {
    verifyOTP: async (otp: string) => {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      return response.json();
    },
  };
  