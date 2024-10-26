// src/components/LabourRights/ComplianceAuditTable.tsx

import React from 'react';

export const ComplianceAuditTable: React.FC = () => {
  const audits = [
    { date: '2024-10-01', location: 'Factory A', outcome: 'Pass' },
    { date: '2024-09-12', location: 'Warehouse B', outcome: 'Fail' },
  ];

  return (
    <table className="compliance-audit-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Location</th>
          <th>Outcome</th>
        </tr>
      </thead>
      <tbody>
        {audits.map((audit, index) => (
          <tr key={index}>
            <td>{audit.date}</td>
            <td>{audit.location}</td>
            <td>{audit.outcome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
