// src/components/SupplyChainTransparency.tsx
import React, { useState, useEffect } from 'react';
import { LineChart, PieChart } from './Charts';  
import WorldMap from './Map/WorldMap';  
import ProgressBar from './ProgressBar';  
import SupplierTable from './Tables/SupplierTable';  
import BlockchainTable from './Tables/BlockchainTable';  
import useSupplyChainData from '../hooks/useSupplyChainData';  
import crypto from 'crypto';  // For secure hashing
import { fetchTransparencyMetrics } from '../services/supplyChainService';
import { TransparencyMetric } from '../types/supplyChainTypes';
import '../styles/supplyChain.css';

interface Supplier {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  complianceStatus: string;
}

interface BlockchainBlock {
  supplier: Supplier;
  timestamp: string;
  previousHash: string;
  hash: string;
  compliance: string;
}

const SupplyChainTransparency: React.FC = () => {
  const { supplyChainData } = useSupplyChainData(); 
  const [blockchain, setBlockchain] = useState<BlockchainBlock[]>([]);
  const [filter, setFilter] = useState<string>(''); 
  const [verificationStatus, setVerificationStatus] = useState<string>('Pending'); // Verification state
  const [metrics, setMetrics] = useState<TransparencyMetric[]>([]); // Transparency metrics state

  // Fetching transparency metrics
  useEffect(() => {
    fetchTransparencyMetrics().then(setMetrics);
  }, []);

  // Cryptographic hash using SHA-256
  const calculateHash = (block: BlockchainBlock): string => {
    const blockData = `${block.supplier.name}-${block.timestamp}-${block.previousHash}-${block.compliance}`;
    return crypto.createHash('sha256').update(blockData).digest('hex');  
  };

  // Function to verify the blockchain asynchronously
  const verifyBlockchain = async () => {
    for (let i = 1; i < blockchain.length; i++) {
      const currentBlock = blockchain[i];
      const previousBlock = blockchain[i - 1];

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the previous hash is valid
      if (currentBlock.previousHash !== previousBlock.hash) {
        setVerificationStatus('Failed');
        return;
      }
    }
    setVerificationStatus('Verified');
  };

  const addBlockToBlockchain = (newSupplier: Supplier) => {
    const previousBlock = blockchain[blockchain.length - 1];
    const newBlock: BlockchainBlock = {
      supplier: newSupplier,
      timestamp: new Date().toISOString(),
      previousHash: previousBlock ? previousBlock.hash : '0',
      hash: '',
      compliance: newSupplier.complianceStatus,
    };
    newBlock.hash = calculateHash(newBlock);
    setBlockchain([...blockchain, newBlock]);
  };

  useEffect(() => {
    if (supplyChainData) {
      supplyChainData.suppliers.forEach((supplier: Supplier) => addBlockToBlockchain(supplier));
    }
  }, [supplyChainData]);

  // Trigger blockchain verification after every block addition
  useEffect(() => {
    if (blockchain.length > 1) {
      verifyBlockchain();
    }
  }, [blockchain]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredSuppliers = supplyChainData?.suppliers.filter((supplier: Supplier) =>
    supplier.complianceStatus.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Supply Chain Transparency</h1>
      <p>Track every step of your supply chain with blockchain transparency and interactive visualizations.</p>
      
      <div className="w-full">
        <ProgressBar stepsCompleted={blockchain.length} totalSteps={supplyChainData?.suppliers.length || 0} />
      </div>
      
      <div className="w-full h-96">
        <WorldMap suppliers={blockchain.map(block => block.supplier)} />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Blockchain Transaction Log</h2>
        <p>Verification Status: {verificationStatus}</p> {/* Display verification status */} 
        <BlockchainTable blocks={blockchain} />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Supplier Details</h2>
        <input
          type="text"
          className="border p-2"
          placeholder="Filter by compliance status..."
          value={filter}
          onChange={handleFilterChange}
        />
        <SupplierTable suppliers={filteredSuppliers || []} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PieChart data={supplyChainData?.complianceMetrics || []} />
        <LineChart data={supplyChainData?.supplyChainProgress || []} />
      </div>

      <div className="transparency-metrics grid grid-cols-2 gap-4 mb-8">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <h3 className="text-2xl font-semibold">{metric.name}</h3>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainTransparency;
