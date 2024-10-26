import { getComplianceStatus, submitAuditReport, predictComplianceRisk } from '../services/antiForcedLabourService';
import { RiskAssessment } from '../types/antiForcedLabourTypes';

describe('Anti-Forced Labour Service', () => {
    it('should return compliance status for a supplier', async () => {
        const status = await getComplianceStatus('supplier1');
        expect(status).toBeDefined();
        expect(status?.supplierId).toBe('supplier1');
    });

    it('should submit an audit report and update compliance status', async () => {
        const report = {
            supplierId: 'supplier2',
            date: '2023-10-20',
            auditor: 'John Doe',
            findings: 'No issues found',
            riskLevel: 'low',
        };

        await submitAuditReport(report);
        const status = await getComplianceStatus('supplier2');
        expect(status?.complianceLevel).toBe('compliant');
    });

    it('should predict future compliance risk using decision trees', async () => {
        const historicalData: RiskAssessment[] = [
            { supplierId: 'supplier1', region: 'Africa', industry: 'Mining', riskScore: 7, lastAuditDate: '2023-01-01' },
            { supplierId: 'supplier1', region: 'Africa', industry: 'Mining', riskScore: 6, lastAuditDate: '2023-02-01' },
            { supplierId: 'supplier1', region: 'Africa', industry: 'Mining', riskScore: 5, lastAuditDate: '2023-03-01' }
        ];

        const prediction = await predictComplianceRisk('supplier1', historicalData);
        expect(prediction).toBeGreaterThanOrEqual(0); // Ensure valid prediction
    });
});
