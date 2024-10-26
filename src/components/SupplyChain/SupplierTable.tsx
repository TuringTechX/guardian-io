// src/components/SupplyChain/SupplierTable.tsx

import React, { useEffect, useState } from 'react';
import { fetchSupplierRisks } from '../../services/supplyChainService';
import { SupplierRisk } from '../../types/supplyChainTypes';

interface Supplier {
  name: string;
  location: string;
  complianceStatus: string;
}

type SupplierType = Supplier | SupplierRisk;

interface SupplierTableProps {
  suppliers?: Supplier[];
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers: propSuppliers }) => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>(propSuppliers || []);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!propSuppliers) {
      fetchSupplierRisks().then((data) => setSuppliers(data));
    }
  }, [propSuppliers]);

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    const fieldA = (a[sortField as keyof SupplierType] ?? '').toString().toLowerCase();
    const fieldB = (b[sortField as keyof SupplierType] ?? '').toString().toLowerCase();
    return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
  });

  const paginatedSuppliers = sortedSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSort('name' in suppliers[0] ? 'name' : 'supplierName')}>
              {('name' in suppliers[0] ? 'Name' : 'Supplier')} {sortField === ('name' in suppliers[0] ? 'name' : 'supplierName') && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="border px-4 py-2">{'location' in suppliers[0] ? 'Location' : 'Risk Score'}</th>
            <th className="border px-4 py-2 cursor-pointer" onClick={() => handleSort('complianceStatus')}>
              Compliance Status {sortField === 'complianceStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedSuppliers.map((supplier, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{'name' in supplier ? supplier.name : supplier.supplierName}</td>
              <td className="border px-4 py-2">{'location' in supplier ? supplier.location : supplier.riskScore}</td>
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
