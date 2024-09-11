// src/tests/RiskAssessment.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import RiskAssessment from '../components/RiskAssessment';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('RiskAssessment Component', () => {
  it('renders risk assessment table', async () => {
    render(<RiskAssessment />);

    const table = await screen.findByTestId('risk-assessment-table');
    expect(table).toBeInTheDocument();
  });

  it('fetches risk data and displays it in table', async () => {
    render(<RiskAssessment />);

    const riskData = await screen.findByText('Risk Score');
    expect(riskData).toBeInTheDocument();
  });

  it('displays error message on failed risk data fetch', async () => {
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
