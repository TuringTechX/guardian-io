import React, { useState } from 'react';

const LanguageSelector: React.FC = () => {
    const languages = ['English', 'Español', 'Français', 'Deutsch'];
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
        // Implement language change logic here if needed
    };

    return (
        <div className="text-sm">
            <label htmlFor="language" className="text-gray-400 mr-2">Language:</label>
            <select
                id="language"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-gray-700 text-gray-300 p-1 rounded"
            >
                {languages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
