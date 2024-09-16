// src/components/Tables/TransactionTable.tsx

import React from 'react';
import { BlockchainLinkedList } from '../../utils/blockchainHelper';

interface TransactionTableProps {
  blockchain: BlockchainLinkedList;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ blockchain }) => {
  return (
    <div className="transaction-table mt-8">
      <h2 className="text-xl font-bold text-center text-white mb-4">Transaction Log</h2>
      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th>Block #</th>
            <th>Supplier</th>
            <th>Timestamp</th>
            <th>Digital Signature</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {blockchain.chain.map((block, index) => (
            <tr key={index}>
              <td>{block.index}</td>
              <td>{block.data.supplier}</td>
              <td>{block.timestamp}</td>
              <td>{block.data.digitalSignature}</td>
              <td>{block.data.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
