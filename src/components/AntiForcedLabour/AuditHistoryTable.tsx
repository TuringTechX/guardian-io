// src/components/AntiForcedLabour/AuditHistoryTable.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define strict types for AuditStatus and AuditRecord
type AuditStatus = 'Pass' | 'Fail' | 'Pending';

interface AuditRecord {
  id: string;
  date: string;
  auditor: string;
  status: AuditStatus;
  notes: string;
}

interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
}

interface AuditHistoryTableProps {
  auditData: PaginatedResult<AuditRecord>;
}

export const AuditHistoryTable: React.FC<AuditHistoryTableProps> = ({ auditData }) => {
  const [sortField, setSortField] = useState<keyof AuditRecord>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(auditData.currentPage);

  const rowsPerPage = 5;

  // Filter and Sort Audits based on search and sort settings
  const sortedAndFilteredAudits = auditData.items
    .filter(audit => 
      audit.auditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const orderMultiplier = sortOrder === 'asc' ? 1 : -1;
      return a[sortField] < b[sortField] ? -1 * orderMultiplier : a[sortField] > b[sortField] ? 1 * orderMultiplier : 0;
    });

  const paginatedAudits = sortedAndFilteredAudits.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(sortedAndFilteredAudits.length / rowsPerPage);

  const toggleSort = (field: keyof AuditRecord) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="audit-history-table p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Audit History</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Auditor or Status"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {['date', 'auditor', 'status'].map(field => (
                <th
                  key={field}
                  onClick={() => toggleSort(field as keyof AuditRecord)}
                  className="cursor-pointer p-2 font-semibold border-b"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
              <th className="p-2 font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginatedAudits.map(audit => (
                <React.Fragment key={audit.id}>
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b"
                    onClick={() => toggleRow(audit.id)}
                  >
                    <td className="p-2">{audit.date}</td>
                    <td className="p-2">{audit.auditor}</td>
                    <td className={`p-2 ${audit.status === 'Pass' ? 'text-green-600' : audit.status === 'Fail' ? 'text-red-600' : 'text-yellow-500'}`}>
                      {audit.status}
                    </td>
                    <td className="p-2 text-blue-500 underline cursor-pointer">Expand</td>
                  </motion.tr>
                  
                  {/* Expanded Row */}
                  {expandedRow === audit.id && (
                    <motion.tr
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-100"
                    >
                      <td colSpan={4} className="p-4 text-sm text-gray-700">
                        <strong>Notes:</strong> {audit.notes || 'No additional notes provided.'}
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditHistoryTable;
