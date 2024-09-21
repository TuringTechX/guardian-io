// src/components/Tables/BlockchainTable.tsx
import React, { useState } from 'react';
import Modal from '../Modal';

interface Supplier {
  name: string;
  location: string;
  complianceStatus: string;
}

interface BlockchainBlock {
  supplier: Supplier;
  timestamp: string;
  hash: string;
  previousHash: string;
}

interface BlockchainTableProps {
  blocks: BlockchainBlock[];
}

const BlockchainTable: React.FC<BlockchainTableProps> = ({ blocks }) => {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (block: BlockchainBlock) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Supplier</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Compliance</th>
            <th className="border px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{block.supplier.name}</td>
              <td className="border px-4 py-2">{block.supplier.location}</td>
              <td className="border px-4 py-2">{block.supplier.complianceStatus}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => openModal(block)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBlock && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          blockDetails={{
            supplier: selectedBlock.supplier,
            timestamp: selectedBlock.timestamp,
            hash: selectedBlock.hash,
            previousHash: selectedBlock.previousHash,
          }}
        />
      )}
    </>
  );
};

export default BlockchainTable;
