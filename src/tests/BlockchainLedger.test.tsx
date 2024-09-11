// src/tests/BlockchainLedger.test.tsx
import { render, screen } from '@testing-library/react';
import BlockchainLedger from '../components/BlockchainLedger';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('BlockchainLedger Component', () => {
  it('renders the blockchain ledger component with transactions', async () => {
    render(<BlockchainLedger />);

    const transactionTable = await screen.findByTestId('transaction-table');
    expect(transactionTable).toBeInTheDocument();
  });

  it('shows blockchain transactions', async () => {
    render(<BlockchainLedger />);

    const transaction = await screen.findByText('Transaction ID');
    expect(transaction).toBeInTheDocument();
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
