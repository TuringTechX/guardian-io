// src/tests/ComplianceChecker.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ComplianceChecker from '../components/ComplianceChecker';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('ComplianceChecker Component', () => {
  it('renders the compliance form and progress bar', () => {
    render(<ComplianceChecker />);

    const form = screen.getByTestId('compliance-form');
    expect(form).toBeInTheDocument();

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('submits form data and shows success message', async () => {
    render(<ComplianceChecker />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const successMessage = await screen.findByText('Compliance check successful');
    expect(successMessage).toBeInTheDocument();
  });

  it('displays error message on API failure', async () => {
    server.use(
      rest.post('/api/complianceChecker', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<ComplianceChecker />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('Compliance check failed');
    expect(errorMessage).toBeInTheDocument();
  });
});
