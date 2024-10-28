import React, { useState } from 'react';

const AccessibilityOptions: React.FC = () => {
    const [highContrast, setHighContrast] = useState<boolean>(false);
    const fontSizes = ['Small', 'Medium', 'Large'];
    const [fontSize, setFontSize] = useState<string>('Medium');

    const toggleContrast = () => setHighContrast((prev) => !prev);
    const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFontSize(e.target.value);

    return (
        <div className="text-sm mt-4">
            <button
                onClick={toggleContrast}
                className={`p-1 rounded ${highContrast ? 'bg-yellow-500' : 'bg-gray-700'} text-gray-300`}
            >
                {highContrast ? 'Normal Contrast' : 'High Contrast'}
            </button>
            <label htmlFor="font-size" className="text-gray-400 ml-4 mr-2">Font Size:</label>
            <select
                id="font-size"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="bg-gray-700 text-gray-300 p-1 rounded"
            >
                {fontSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AccessibilityOptions;
