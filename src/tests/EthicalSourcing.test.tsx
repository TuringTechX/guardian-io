// src/tests/EthicalSourcing.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import EthicalSourcing from '../components/EthicalSourcing';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('EthicalSourcing Component', () => {
  it('renders the ethical sourcing recommendations', async () => {
    render(<EthicalSourcing />);

    const recommendations = await screen.findByTestId('ethical-recommendations');
    expect(recommendations).toBeInTheDocument();
  });

  it('fetches and displays supplier ethical scores', async () => {
    render(<EthicalSourcing />);

    const score = await screen.findByText('Ethical Score');
    expect(score).toBeInTheDocument();
  });

  it('displays error message on failed ethical sourcing data fetch', async () => {
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
