// src/tests/Header.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/UIElements/Header';
import { ThemeProvider } from '../context/ThemeContext';

test('renders search bar and can type into it', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );

  const searchInput = screen.getByPlaceholderText(/Search/i);
  expect(searchInput).toBeInTheDocument();
  
  // Simulate typing into the search input
  fireEvent.change(searchInput, { target: { value: 'sustainability' } });
  expect(searchInput.value).toBe('sustainability');
});

test('toggles dark mode when button is clicked', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );

  const toggleButton = screen.getByText(/dark mode/i);
  expect(toggleButton).toBeInTheDocument();

  // Simulate a click to toggle the theme
  fireEvent.click(toggleButton);

  // The text should change to "Light Mode"
  const lightModeButton = screen.getByText(/light mode/i);
  expect(lightModeButton).toBeInTheDocument();
});
