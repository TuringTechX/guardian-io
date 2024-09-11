// src/tests/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('Dashboard Component', () => {
  it('renders the dashboard component with charts and graphs', async () => {
    render(<Dashboard />);

    // Check if certain chart elements are displayed
    const chartElement = await screen.findByTestId('line-chart');
    expect(chartElement).toBeInTheDocument();

    const mapElement = screen.getByTestId('world-map');
    expect(mapElement).toBeInTheDocument();
  });

  it('displays API error message on failed data fetch', async () => {
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
