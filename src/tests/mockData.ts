export const mockAuditReport = {
    supplierId: 'supplier1',
    date: '2023-10-20',
    auditor: 'John Doe',
    findings: 'All good',
    riskLevel: 'low',
};

export const mockRiskAssessments = [
    { supplierId: 'supplier1', region: 'Asia', industry: 'Textile', riskScore: 4, lastAuditDate: '2023-06-01' },
    { supplierId: 'supplier1', region: 'Asia', industry: 'Textile', riskScore: 3, lastAuditDate: '2023-07-01' },
    { supplierId: 'supplier1', region: 'Asia', industry: 'Textile', riskScore: 2, lastAuditDate: '2023-08-01' }
];
