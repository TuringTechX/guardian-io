// src/components/UIElements/Button.tsx

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner'; // Import a loading spinner for loading states
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: IconType;  // For optional icon display
  disabled?: boolean;
}

const buttonStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  text: 'text-blue-600 hover:text-blue-700',
};

const sizeStyles = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon: Icon,
  disabled = false,
  className = '',
  ...props
}) => {
  // Add framer motion animation for button hover effects
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.button
      {...motionProps}
      className={`button ${buttonStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} flex items-center justify-center space-x-2 transition duration-150 ease-in-out`}
      disabled={disabled || loading}
      {...props}
    >
      {/* Icon rendering with conditional style */}
      {Icon && !loading && <Icon className="text-lg mr-2" />}
      {/* Loading state for button */}
      {loading ? (
        <LoadingSpinner size="small" color={variant === 'text' ? 'text-blue-600' : 'text-white'} />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
