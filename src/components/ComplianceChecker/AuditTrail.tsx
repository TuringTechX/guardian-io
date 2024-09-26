import React from 'react';
import { AuditEntry } from '../../types/auditTypes';

interface AuditTrailProps {
  data: AuditEntry[];
}

export const AuditTrail: React.FC<AuditTrailProps> = ({ data }) => {
  return (
    <div className="audit-trail p-4 border rounded bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Audit Trail</h2>
      <ul>
        {data.map((entry) => (
          <li key={entry.id} className="mb-2">
            <div className="font-bold">{entry.action}</div>
            <div className="text-sm text-gray-600">{entry.timestamp}</div>
            <div className="text-sm">{entry.details}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
