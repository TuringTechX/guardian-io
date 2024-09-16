// src/tests/Sidebar.test.tsx

import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import test from 'node:test';

test('renders Sidebar with links', () => {
  render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );

  const dashboardLink = screen.getByText(/Dashboard/i);
  expect(dashboardLink).toBeInTheDocument();

  const collaborationLink = screen.getByText(/Collaboration/i);
  expect(collaborationLink).toBeInTheDocument();
});
function expect(dashboardLink: HTMLElement) {
    throw new Error('Function not implemented.');
}

