import request from 'supertest';
import app from '../app'; // Assuming Express app is in app.ts
import { mockAuditReport, mockRiskAssessments } from './mockData';

describe('Anti-Forced Labour API Endpoints', () => {
    it('should retrieve compliance status', async () => {
        const res = await request(app).get('/api/compliance/status?supplierId=supplier1');
        expect(res.status).toBe(200);
        expect(res.body.complianceLevel).toBeDefined();
    });

    it('should submit an audit report', async () => {
        const res = await request(app).post('/api/compliance/audit').send(mockAuditReport);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Audit report submitted successfully');
    });

    it('should retrieve risk assessments', async () => {
        const res = await request(app).get('/api/compliance/risks');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should predict compliance risk', async () => {
        const res = await request(app).post('/api/compliance/predict').send({ supplierId: 'supplier1', historicalData: mockRiskAssessments });
        expect(res.status).toBe(200);
        expect(res.body.prediction).toBeGreaterThanOrEqual(0);
    });
});
