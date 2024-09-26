import React from 'react';

interface ComplianceResultsProps {
  formData: any;
  documentData: any;
}

export const ComplianceResults: React.FC<ComplianceResultsProps> = ({ formData, documentData }) => {
  return (
    <div className="compliance-results p-4 border rounded bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Compliance Results</h2>
      <div className="form-results mb-4">
        <h3 className="font-bold">Form Data</h3>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(formData, null, 2)}</pre>
      </div>
      <div className="document-results">
        <h3 className="font-bold">Document Data</h3>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(documentData, null, 2)}</pre>
      </div>
    </div>
  );
};
