// src/tests/ThemeContext.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Mock component to test the ThemeContext
const MockThemeComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p data-testid="theme-value">{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  test('toggles theme between light and dark', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <MockThemeComponent />
      </ThemeProvider>
    );

    const themeValue = getByTestId('theme-value');
    expect(themeValue.textContent).toBe('light');

    fireEvent.click(getByText(/toggle theme/i));
    expect(themeValue.textContent).toBe('dark');
  });
});
