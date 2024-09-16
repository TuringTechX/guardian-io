// src/pages/blockchain.tsx

import React, { useState } from 'react';
import { Modal } from '../components/Modal';
import { TransactionTable } from '../components/Tables/TransactionTable';
import { BlockchainLinkedList, BlockchainBlock } from '../utils/blockchainHelper';
import './blockchain.css';

// Example data for the blockchain
const initialBlockchain = new BlockchainLinkedList();
initialBlockchain.addBlock(new BlockchainBlock(1, { supplier: "Supplier A", timestamp: "2024-09-12", digitalSignature: "0xABC123", amount: "1000 Units" }));
initialBlockchain.addBlock(new BlockchainBlock(2, { supplier: "Supplier B", timestamp: "2024-09-13", digitalSignature: "0xDEF456", amount: "2000 Units" }));
initialBlockchain.addBlock(new BlockchainBlock(3, { supplier: "Supplier C", timestamp: "2024-09-14", digitalSignature: "0xGHI789", amount: "1500 Units" }));

const BlockchainPage: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleBlockClick = (block: BlockchainBlock) => {
    setSelectedBlock(block);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBlock(null);
  };

  return (
    <div className="blockchain-page">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Blockchain Transparency Ledger</h1>

      {/* Blockchain Display */}
      <div className="blockchain-visualization flex justify-center space-x-8">
        {initialBlockchain.chain.map((block, index) => (
          <div
            key={index}
            className="block bg-blue-500 hover:bg-blue-700 text-white text-center p-4 rounded-lg cursor-pointer"
            onClick={() => handleBlockClick(block)}
          >
            <p>Block #{block.index}</p>
            <p>Supplier: {block.data.supplier}</p>
          </div>
        ))}
      </div>

      {/* Transaction Table */}
      <TransactionTable blockchain={initialBlockchain} />

      {/* Modal for Block Details */}
      {selectedBlock && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Block #{selectedBlock.index}</h2>
          <p><strong>Supplier:</strong> {selectedBlock.data.supplier}</p>
          <p><strong>Timestamp:</strong> {selectedBlock.data.timestamp}</p>
          <p><strong>Digital Signature:</strong> {selectedBlock.data.digitalSignature}</p>
          <p><strong>Amount:</strong> {selectedBlock.data.amount}</p>
        </Modal>
      )}
    </div>
  );
};

export default BlockchainPage;
