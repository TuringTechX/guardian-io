// src/tests/EthicalSourcing.test.tsx
import { render, screen } from '@testing-library/react';
import EthicalSourcing from '../components/EthicalSourcing/EthicalSourcing';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('EthicalSourcing Component', () => {
  it('renders the ethical sourcing recommendations', async () => {
    render(<EthicalSourcing />);

    const recommendations = await screen.findByTestId('ethical-recommendations');
    expect(recommendations).toBeInTheDocument();
  });

  it('handles empty supplier data', async () => {
    server.use(
      rest.get('/api/ethicalSourcing', (req, res, ctx) => {
        return res(ctx.json({ suppliers: [] })); // Empty suppliers
      })
    );

    render(<EthicalSourcing />);
    const noDataMessage = await screen.findByText('No supplier data available');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('displays warning for low ethical scores', async () => {
    server.use(
      rest.get('/api/ethicalSourcing', (req, res, ctx) => {
        return res(ctx.json({ suppliers: [{ id: 1, name: 'Supplier B', ethicalScore: 40 }] }));
      })
    );

    render(<EthicalSourcing />);
    const lowScoreWarning = await screen.findByText('Supplier B has a low ethical score: 40');
    expect(lowScoreWarning).toBeInTheDocument();
  });

  it('displays error message on failed API call', async () => {
    server.use(
      rest.get('/api/ethicalSourcing', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<EthicalSourcing />);
    const errorMessage = await screen.findByText('Failed to load ethical sourcing data');
    expect(errorMessage).toBeInTheDocument();
  });
});

// src/tests/EthicalSourcing.test.tsx

import { render, screen } from '@testing-library/react';
import EthicalSourcingPage from '../pages/ethical-sourcing';
import { useEthicalSourcing } from '../hooks/useEthicalSourcing';

jest.mock('../hooks/useEthicalSourcing');

describe('EthicalSourcingPage', () => {
  test('renders loading state', () => {
    useEthicalSourcing.mockReturnValue({ loading: true });
    render(<EthicalSourcingPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    useEthicalSourcing.mockReturnValue({ loading: false, error: 'Failed to load' });
    render(<EthicalSourcingPage />);
    expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
  });
});
