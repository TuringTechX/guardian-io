import { RiskAssessment, ComplianceStatus, AuditReport } from '../types/antiForcedLabourTypes';
import { logError } from '../utils/logger';
import { decisionTreePredict } from '../utils/analyticsHelper'; // Using decision trees now
import { antiForcedLabourApi } from '../api/antiForcedLabourApi';

// Simulated database
const auditReports: AuditReport[] = [];
const complianceStatuses: ComplianceStatus[] = [];
const riskAssessments: RiskAssessment[] = [];

// Get compliance status for a supplier
export const getComplianceStatus = async (supplierId: string): Promise<ComplianceStatus | null> => {
    const status = complianceStatuses.find(status => status.supplierId === supplierId);
    return status || null;
};

// Submit an audit report
export const submitAuditReport = async (report: AuditReport): Promise<void> => {
    auditReports.push(report);
    // Logic to update compliance statuses and risk assessments based on audit data
    const supplierStatus = complianceStatuses.find(status => status.supplierId === report.supplierId);
    if (supplierStatus) {
        supplierStatus.complianceLevel = report.riskLevel === 'high' ? 'non-compliant' : 'compliant';
        supplierStatus.lastAudit = report.date;
    } else {
        complianceStatuses.push({
            supplierId: report.supplierId,
            complianceLevel: report.riskLevel === 'high' ? 'non-compliant' : 'compliant',
            lastAudit: report.date,
        });
    }
};

// Get risk assessments, optionally filtered by region or supplier
export const getRiskAssessments = async (filter: { region?: string, supplierId?: string }): Promise<RiskAssessment[]> => {
    return riskAssessments.filter(assessment => {
        if (filter.region && assessment.region !== filter.region) return false;
        if (filter.supplierId && assessment.supplierId !== filter.supplierId) return false;
        return true;
    });
};

// Predict future compliance risk using decision trees based on historical data
export const predictComplianceRisk = async (supplierId: string, historicalData: RiskAssessment[]): Promise<number> => {
    try {
        const scores = historicalData.map(data => data.riskScore);
        const timestamps = historicalData.map(data => new Date(data.lastAuditDate).getTime());

        // Use decision tree to predict future risk score
        const prediction = decisionTreePredict(timestamps, scores);
        return prediction;
    } catch (error) {
        logError('Error in compliance risk prediction', error);
        throw error;
    }
};

export const antiForcedLabourService = {
    fetchAuditData: async () => {
      const response = await antiForcedLabourApi.getAuditData();
      return response.data;
    },
    fetchRiskData: async () => {
      const response = await antiForcedLabourApi.getRiskData();
      return response.data;
    },
  };