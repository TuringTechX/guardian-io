// src/components/UIElements/LanguageSelector.tsx

import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useContext(LanguageContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <select value={currentLanguage} onChange={handleChange} className="language-selector">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </select>
  );
};

export default LanguageSelector;
