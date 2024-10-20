// src/utils/captchaHelper.ts

// Load Google reCAPTCHA (v2) Script
export const loadCaptchaScript = (): void => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };
  
  // Execute reCAPTCHA and get the token (v3 or invisible)
  export const getCaptchaToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject('CAPTCHA script not loaded');
      }
  
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('your-site-key', { action: 'submit' }).then((token: string) => {
          resolve(token);
        }).catch(reject);
      });
    });
  };
  
  // Verify CAPTCHA Token with Backend
  export const verifyCaptchaToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
  
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Captcha verification failed:', error);
      return false;
    }
  };
  