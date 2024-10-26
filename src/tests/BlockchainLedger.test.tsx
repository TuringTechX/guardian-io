// src/tests/BlockchainLedger.test.tsx
import { render, screen } from '@testing-library/react';
import BlockchainLedger from '../components/Blockchain/BlockchainLedger';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('BlockchainLedger Component', () => {
  it('renders blockchain ledger with transactions', async () => {
    render(<BlockchainLedger />);

    const transactionTable = await screen.findByTestId('transaction-table');
    expect(transactionTable).toBeInTheDocument();
  });

  it('handles empty transactions data', async () => {
    server.use(
      rest.get('/api/blockchainLedger', (req, res, ctx) => {
        return res(ctx.json({ transactions: [] })); // No transactions
      })
    );

    render(<BlockchainLedger />);
    const noDataMessage = await screen.findByText('No transactions available');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('displays error message on API failure', async () => {
    server.use(
      rest.get('/api/blockchainLedger', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<BlockchainLedger />);
    const errorMessage = await screen.findByText('Failed to load blockchain data');
    expect(errorMessage).toBeInTheDocument();
  });
});
