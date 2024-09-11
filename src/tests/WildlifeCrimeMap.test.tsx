// src/tests/WildlifeCrimeMap.test.tsx
import { render, screen } from '@testing-library/react';
import WildlifeCrimeMap from '../components/WildlifeCrimeMap';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('WildlifeCrimeMap Component', () => {
  it('renders the wildlife crime map', () => {
    render(<WildlifeCrimeMap />);

    const map = screen.getByTestId('wildlife-crime-map');
    expect(map).toBeInTheDocument();
  });

  it('shows "No crime data available" when API returns empty data', async () => {
    server.use(
      rest.get('/api/wildlifeCrime', (req, res, ctx) => {
        return res(ctx.json([])); // Empty data response
      })
    );

    render(<WildlifeCrimeMap />);
    const noDataMessage = await screen.findByText('No wildlife crime data available');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('displays error message on API failure', async () => {
    server.use(
      rest.get('/api/wildlifeCrime', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<WildlifeCrimeMap />);
    const errorMessage = await screen.findByText('Failed to load wildlife crime data');
    expect(errorMessage).toBeInTheDocument();
  });
});
