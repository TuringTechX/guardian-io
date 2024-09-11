// src/tests/RiskAssessment.test.tsx
import { render, screen } from '@testing-library/react';
import RiskAssessment from '../components/RiskAssessment';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('RiskAssessment Component', () => {
  it('renders risk assessment table', async () => {
    render(<RiskAssessment />);

    const table = await screen.findByTestId('risk-assessment-table');
    expect(table).toBeInTheDocument();
  });

  it('handles empty risk data', async () => {
    server.use(
      rest.get('/api/riskAssessment', (req, res, ctx) => {
        return res(ctx.json({ risks: [] })); // No risk data
      })
    );

    render(<RiskAssessment />);
    const noDataMessage = await screen.findByText('No risk data available');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('displays high-risk warning for high-risk scores', async () => {
    server.use(
      rest.get('/api/riskAssessment', (req, res, ctx) => {
        return res(ctx.json({ risks: [{ id: 'risk1', score: 95 }] }));
      })
    );

    render(<RiskAssessment />);
    const highRiskWarning = await screen.findByText('High risk detected: 95');
    expect(highRiskWarning).toBeInTheDocument();
  });

  it('displays error message on failed API call', async () => {
    server.use(
      rest.get('/api/riskAssessment', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<RiskAssessment />);
    const errorMessage = await screen.findByText('Failed to load risk data');
    expect(errorMessage).toBeInTheDocument();
  });
});
