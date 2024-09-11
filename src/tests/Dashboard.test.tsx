// src/tests/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('Dashboard Component', () => {
  it('renders the dashboard component with charts and graphs', async () => {
    render(<Dashboard />);

    const chartElement = await screen.findByTestId('line-chart');
    expect(chartElement).toBeInTheDocument();

    const mapElement = screen.getByTestId('world-map');
    expect(mapElement).toBeInTheDocument();
  });

  it('displays "No data available" when API returns empty data', async () => {
    server.use(
      rest.get('/api/dashboardData', (req, res, ctx) => {
        return res(ctx.json({ metrics: {}, charts: {} }));
      })
    );

    render(<Dashboard />);

    const noDataMessage = await screen.findByText('No data available');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('displays a loading state before data is fetched', async () => {
    render(<Dashboard />);

    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();

    // Wait for data to load
    await screen.findByTestId('line-chart');
  });

  it('displays error message when API call fails', async () => {
    server.use(
      rest.get('/api/dashboardData', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Dashboard />);
    const errorMessage = await screen.findByText('Failed to load dashboard data');
    expect(errorMessage).toBeInTheDocument();
  });
});
