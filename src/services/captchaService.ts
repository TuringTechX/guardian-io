// src/services/captchaService.ts

import { apiHelper } from '../utils/apiHelper';
import { retryPromise } from '../utils/retryHelper'; // Reuse retry helper for CAPTCHA verification
import { addToQueue } from '../utils/queueHelper';   // For asynchronous processing

export const captchaService = {
  // Verify CAPTCHA with retry logic and background queue processing
  verifyCaptcha: async (captchaResponse: string): Promise<boolean> => {
    try {
      const response = await retryPromise(() => apiHelper.post('/captcha/verify', {
        response: captchaResponse,
      }), 3);  // Retry CAPTCHA verification up to 3 times

      if (response.status === 200 && response.data.success) {
        return true;
      } else {
        // Queue failed verifications for background processing
        addToQueue('captcha-verifications', captchaResponse);
        return false;
      }
    } catch (error) {
      console.error('CAPTCHA verification failed:', error);
      addToQueue('captcha-verifications', captchaResponse);  // Queue failed requests
      return false;
    }
  },
};
