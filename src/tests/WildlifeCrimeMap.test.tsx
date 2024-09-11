// src/tests/WildlifeCrimeMap.test.tsx
import { render, screen } from '@testing-library/react';
import WildlifeCrimeMap from '../components/WildlifeCrimeMap';

describe('WildlifeCrimeMap Component', () => {
  it('renders the crime map component', () => {
    render(<WildlifeCrimeMap />);

    const map = screen.getByTestId('wildlife-crime-map');
    expect(map).toBeInTheDocument();
  });

  it('shows species markers on map', () => {
    render(<WildlifeCrimeMap />);

    const marker = screen.getByTestId('species-marker');
    expect(marker).toBeInTheDocument();
  });
});
