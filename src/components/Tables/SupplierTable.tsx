// src/components/Tables/SupplierTable.tsx
import React, { useState } from 'react';

interface Supplier {
  name: string;
  location: string;
  complianceStatus: string;
}

interface SupplierTableProps {
  suppliers: Supplier[];
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers }) => {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Show 5 items per page

  // Sort suppliers based on selected field and direction
  const sortedSuppliers = [...suppliers].sort((a, b) => {
    const fieldA = a[sortField as keyof Supplier].toString().toLowerCase();
    const fieldB = b[sortField as keyof Supplier].toString().toLowerCase();
    if (sortDirection === 'asc') {
      return fieldA.localeCompare(fieldB);
    }
    return fieldB.localeCompare(fieldA);
  });

  // Get paginated suppliers
  const paginatedSuppliers = sortedSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change sorting direction
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSort('complianceStatus')}>
              Compliance Status {sortField === 'complianceStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedSuppliers.map((supplier, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{supplier.name}</td>
              <td className="border px-4 py-2">{supplier.location}</td>
              <td className="border px-4 py-2">{supplier.complianceStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 border ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SupplierTable;
