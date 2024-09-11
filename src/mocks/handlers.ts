// src/mocks/handlers.ts
import { rest } from 'msw';
import dashboardData from './mockData/dashboardData';
import complianceData from './mockData/complianceData';
import riskData from './mockData/riskData';

// API route handlers
export const handlers = [
  // Dashboard data
  rest.get('/api/dashboardData', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dashboardData)
    );
  }),

  // Compliance checker data
  rest.post('/api/complianceChecker', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(complianceData)
    );
  }),

  // Risk assessment data
  rest.get('/api/riskAssessment', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(riskData)
    );
  }),

  // Ethical sourcing data
  rest.get('/api/ethicalSourcing', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ suppliers: [{ id: 1, name: 'Supplier A', ethicalScore: 85 }] })
    );
  }),

  // Blockchain ledger data
  rest.get('/api/blockchainLedger', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ transactions: [{ id: 'tx1', amount: 100 }] })
    );
  }),
];
