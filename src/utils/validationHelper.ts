// src/utils/validationHelper.ts

// Validate Email Address Format (using a regular expression)
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate Password Strength
  export const validatePasswordStrength = (password: string): { strength: string; score: number } => {
    let score = 0;
    const strengthCriteria = [
      { regex: /[a-z]/, message: 'Lowercase letters' },
      { regex: /[A-Z]/, message: 'Uppercase letters' },
      { regex: /\d/, message: 'Numbers' },
      { regex: /[!@#$%^&*]/, message: 'Special characters' },
      { regex: /.{8,}/, message: 'At least 8 characters' }
    ];
  
    strengthCriteria.forEach((criterion) => {
      if (criterion.regex.test(password)) score++;
    });
  
    const strengthMap = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    return {
      strength: strengthMap[score] || 'Very Weak',
      score: score
    };
  };
  
  // Validate Required Fields
  export const validateRequired = (value: string): boolean => value.trim().length > 0;
  
  // Validate Matching Passwords
  export const validatePasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };
  
  // Validate Captcha Token (client-side validation)
  export const validateCaptcha = (captchaToken: string): boolean => {
    return captchaToken.length > 0;
  };
  