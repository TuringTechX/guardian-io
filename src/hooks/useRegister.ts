// src/hooks/useRegister.ts
import { useState } from 'react';
import { authService } from '../services/authService';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
  });
  const [formProgress, setFormProgress] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await authService.register(formData);
    if (response.success) {
      setFormProgress(3);
    } else {
      setErrors(response.errors);
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    formProgress,
    errors,
  };
};
