// src/tests/CSRPage.test.tsx

import { render, screen } from '@testing-library/react';
import CSRPage from '../pages/csr';

describe('CSRPage', () => {
  test('renders the CSR Dashboard', () => {
    render(<CSRPage />);
    expect(screen.getByText(/Corporate Social Responsibility/i)).toBeInTheDocument();
  });
});
