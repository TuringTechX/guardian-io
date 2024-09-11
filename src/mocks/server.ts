// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup mock server with handlers
export const server = setupServer(...handlers);
