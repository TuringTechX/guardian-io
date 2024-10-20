// src/services/validationService.ts

const passwordStrengthCache: Map<string, boolean> = new Map();  // Caching results to avoid repeated computations

export const validationService = {
  // Email validation
  validateEmail: (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  },

  // Phone validation with basic format checking (extendable for country-based formatting)
  validatePhone: (phone: string): string | null => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid phone number with country code.';
    }
    return null;
  },

  // Password strength validation using dynamic programming to avoid recalculations
  validatePassword: (password: string): string | null => {
    if (passwordStrengthCache.has(password)) {
      return passwordStrengthCache.get(password) ? null : 'Weak password';
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    const isStrong = score >= 4;
    passwordStrengthCache.set(password, isStrong);

    return isStrong ? null : 'Password must include uppercase, lowercase, numbers, and symbols.';
  },

  // Password confirmation validation
  validateConfirmPassword: (password: string, confirmPassword: string): string | null => {
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  },

  // General form validation
  validateForm: (formData: { [key: string]: any }): Map<string, string> => {
    const errors = new Map<string, string>();

    const emailError = validationService.validateEmail(formData.email);
    if (emailError) errors.set('email', emailError);

    const phoneError = validationService.validatePhone(formData.phone);
    if (phoneError) errors.set('phone', phoneError);

    const passwordError = validationService.validatePassword(formData.password);
    if (passwordError) errors.set('password', passwordError);

    const confirmPasswordError = validationService.validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) errors.set('confirmPassword', confirmPasswordError);

    return errors;
  },
};
