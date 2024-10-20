// src/components/Forms/PasswordStrengthMeter.tsx
import React from 'react';
import './passwordStrengthMeter.css';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthProps> = ({ password }) => {
  const calculateStrength = (pwd: string) => {
    if (pwd.length < 6) return 'weak';
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) return 'strong';
    return 'medium';
  };

  const strength = calculateStrength(password);

  return (
    <div className="password-strength-meter">
      <div className={`strength-bar ${strength}`}></div>
      <p className={`strength-text ${strength}`}>
        {strength === 'strong' ? 'Strong password!' : strength === 'medium' ? 'Medium strength' : 'Weak password'}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
