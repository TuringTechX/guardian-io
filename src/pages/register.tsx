// src/pages/register.tsx
import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { Input, Button, ProgressBar, Tooltip, Dropdown } from '../components/UIElements';
import { PasswordStrengthMeter } from '../components/Forms/PasswordStrengthMeter';
import { CaptchaVerification } from '../components/Forms/CaptchaVerification';
import './register.css';

const RegisterPage: React.FC = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    formProgress,
    errors,
  } = useRegister();

  return (
    <div className="register-container">
      <h1 className="register-title">Create Your Guardian-IO Account</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <ProgressBar progress={formProgress} />

        {/* Step 1: Basic Information */}
        <div className={`form-step ${formProgress === 1 ? 'active' : ''}`}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="Enter your full name"
            tooltip="Please provide your legal name."
          />
          <Input
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="Enter your email"
            tooltip="We'll send you an email confirmation."
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            placeholder="Enter your phone number"
            tooltip="Include your country code."
          />
        </div>

        {/* Step 2: Security */}
        <div className={`form-step ${formProgress === 2 ? 'active' : ''}`}>
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Create a strong password"
            tooltip="Use at least 8 characters, including upper/lowercase and numbers."
          />
          <PasswordStrengthMeter password={formData.password} />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />
        </div>

        {/* Step 3: CAPTCHA and Verification */}
        <div className={`form-step ${formProgress === 3 ? 'active' : ''}`}>
          <Dropdown
            label="Country"
            name="country"
            options={["United States", "Canada", "United Kingdom", "Other"]}
            value={formData.country}
            onChange={handleInputChange}
          />
          <CaptchaVerification />

          <Button
            type="submit"
            isLoading={isSubmitting}
            text="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
