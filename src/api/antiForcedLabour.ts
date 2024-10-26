import { Request, Response } from 'express';
import { getComplianceStatus, submitAuditReport, getRiskAssessments, predictComplianceRisk } from '../services/antiForcedLabourService';
import { validateAuditReport, validatePredictionRequest } from '../utils/validationHelper';
import { logError, logInfo } from '../utils/logger';

// Data structures
interface AuditReport {
    supplierId: string;
    date: string;
    auditor: string;
    findings: string;
    riskLevel: 'low' | 'medium' | 'high';
}

interface ComplianceStatus {
    supplierId: string;
    complianceLevel: 'compliant' | 'non-compliant' | 'under-review';
    lastAudit: string;
}

interface RiskAssessment {
    supplierId: string;
    region: string;
    industry: string;
    riskScore: number;
    lastAuditDate: string;
}

interface PredictiveRiskInput {
    supplierId: string;
    historicalData: RiskAssessment[];
}

// Routes

export const getComplianceStatusRoute = async (req: Request, res: Response) => {
    try {
        const { supplierId } = req.query;
        if (!supplierId) {
            logError('Supplier ID is missing in compliance status request.');
            return res.status(400).json({ error: 'Supplier ID is required' });
        }

        const complianceStatus: ComplianceStatus | null = await getComplianceStatus(supplierId as string);
        if (!complianceStatus) {
            logError(`Compliance status for supplier ${supplierId} not found.`);
            return res.status(404).json({ error: 'Supplier not found' });
        }

        logInfo(`Retrieved compliance status for supplier ${supplierId}`);
        return res.json(complianceStatus);
    } catch (error) {
        logError('Error retrieving compliance status', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const submitAuditReportRoute = async (req: Request, res: Response) => {
    try {
        const auditReport: AuditReport = req.body;

        const validationErrors = validateAuditReport(auditReport);
        if (validationErrors.length) {
            logError('Validation failed for audit report submission.', validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }

        await submitAuditReport(auditReport);
        logInfo(`Audit report submitted for supplier ${auditReport.supplierId}`);
        return res.status(200).json({ message: 'Audit report submitted successfully' });
    } catch (error) {
        logError('Error submitting audit report', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const getRiskAssessmentsRoute = async (req: Request, res: Response) => {
    try {
        const { region, supplierId } = req.query;

        const riskAssessments: RiskAssessment[] = await getRiskAssessments({
            region: region as string | undefined,
            supplierId: supplierId as string | undefined
        });

        logInfo(`Risk assessments retrieved for supplier ${supplierId || 'all suppliers'}`);
        return res.json(riskAssessments);
    } catch (error) {
        logError('Error retrieving risk assessments', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const predictComplianceRiskRoute = async (req: Request, res: Response) => {
    try {
        const { supplierId, historicalData }: PredictiveRiskInput = req.body;

        const validationErrors = validatePredictionRequest(supplierId, historicalData);
        if (validationErrors.length) {
            logError('Validation failed for predictive compliance risk request.', validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }

        const prediction = await predictComplianceRisk(supplierId, historicalData);
        logInfo(`Predicted compliance risk for supplier ${supplierId}`);
        return res.json({ prediction });
    } catch (error) {
        logError('Error predicting compliance risk', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
