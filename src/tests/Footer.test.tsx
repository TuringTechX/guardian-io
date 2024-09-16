// src/tests/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders Footer with social links', () => {
  render(<Footer />);

  const twitterLink = screen.getByRole('link', { name: /twitter/i });
  expect(twitterLink).toBeInTheDocument();

  const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
  expect(linkedinLink).toBeInTheDocument();

  const githubLink = screen.getByRole('link', { name: /github/i });
  expect(githubLink).toBeInTheDocument();
});
