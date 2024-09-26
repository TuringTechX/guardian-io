// src/components/LanguageSwitcher.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-4">
      <button onClick={() => changeLanguage('en')} className="p-2 bg-blue-600 text-white">English</button>
      <button onClick={() => changeLanguage('fr')} className="p-2 bg-blue-600 text-white">Français</button>
    </div>
  );
};
