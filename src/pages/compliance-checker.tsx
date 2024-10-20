import React, { useState } from 'react';
import { Sidebar } from '../components/UIElements/Sidebar';
import { Header } from '../components/UIElements/Header';
import { Footer } from '../components/UIElements/Footer';
import { ComplianceForm } from '../components/ComplianceChecker/ComplianceForm';
import { RiskAssessment } from '../components/ComplianceChecker/RiskAssessment';
import { DocumentUpload } from '../components/ComplianceChecker/DocumentUpload';
import { AuditTrail } from '../components/ComplianceChecker/AuditTrail';
import { ComplianceResults } from '../components/ComplianceChecker/ComplianceResults';
import { useComplianceData } from '../hooks/useComplianceData';
import { useRiskAssessment } from '../hooks/useRiskAssessment';
import { useDocumentVerification } from '../hooks/useDocumentVerification';
import { useAuditTrail } from '../hooks/useAuditTrail';

const ComplianceCheckerPage: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [documentData, setDocumentData] = useState<any>(null);
  const [auditData, setAuditData] = useState<any[]>([]);

  // Custom hooks for data management
  const { complianceData, submitComplianceForm } = useComplianceData();
  const { riskScore, assessRisk } = useRiskAssessment();
  const { verifyDocument } = useDocumentVerification();
  const { fetchAuditTrail } = useAuditTrail();

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    setFormData(data);
    submitComplianceForm(data);
    assessRisk(data); // Run risk assessment after form submission
    fetchAuditTrail(); // Update audit trail
  };

  // Handle document upload and verification
  const handleDocumentUpload = (file: File) => {
    setDocumentData(file);
    verifyDocument(file);
    fetchAuditTrail(); // Update audit trail
  };

  return (
    <div className="compliance-checker-page flex min-h-screen">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <main className="p-6 bg-gray-50 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-4">Compliance Checker</h1>
          <div className="grid grid-cols-3 gap-6">
            <ComplianceForm onSubmit={handleFormSubmit} data={complianceData} />
            <DocumentUpload onUpload={handleDocumentUpload} />
            <RiskAssessment riskScore={riskScore} />
          </div>
          <ComplianceResults formData={formData} documentData={documentData} />
          <AuditTrail data={auditData} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ComplianceCheckerPage;
