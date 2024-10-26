// src/tests/NotificationsList.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationsList } from '../components/Notifications/NotificationsList';

test('renders NotificationsList', () => {
  render(<NotificationsList />);
  const listElement = screen.getByText(/Notifications/i);
  expect(listElement).toBeInTheDocument();
});
