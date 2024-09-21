// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockDetails: {
    supplier: {
      name: string;
      location: string;
      complianceStatus: string;
    };
    timestamp: string;
    hash: string;
    previousHash: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, blockDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Block Details</h2>
        <p><strong>Supplier Name:</strong> {blockDetails.supplier.name}</p>
        <p><strong>Location:</strong> {blockDetails.supplier.location}</p>
        <p><strong>Compliance Status:</strong> {blockDetails.supplier.complianceStatus}</p>
        <p><strong>Timestamp:</strong> {blockDetails.timestamp}</p>
        <p><strong>Hash:</strong> {blockDetails.hash}</p>
        <p><strong>Previous Hash:</strong> {blockDetails.previousHash}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
