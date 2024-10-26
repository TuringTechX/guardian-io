// src/tests/ESGReporting.test.tsx

import { render, screen } from '@testing-library/react';
import ESGReportingPage from '../pages/esg-reporting';

describe('ESGReportingPage', () => {
  test('renders the ESG Reporting page', () => {
    render(<ESGReportingPage />);
    expect(screen.getByText(/ESG Reporting & Analytics/i)).toBeInTheDocument();
  });
});
