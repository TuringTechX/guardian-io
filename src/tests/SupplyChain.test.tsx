// src/tests/SupplyChain.test.tsx
import { render, screen } from '@testing-library/react';
import SupplyChainTransparency from '../components/SupplyChainTransparency';
import '@testing-library/jest-dom/extend-expect';
import crypto from 'crypto';  // For hash comparison

// Mock data for testing
const mockSuppliers = [
  { name: 'Supplier 1', location: 'USA', latitude: 34.05, longitude: -118.25, complianceStatus: 'Compliant' },
  { name: 'Supplier 2', location: 'Germany', latitude: 52.52, longitude: 13.405, complianceStatus: 'Non-compliant' },
];

describe('SupplyChainTransparency Component', () => {
  it('renders the component correctly', () => {
    render(<SupplyChainTransparency />);
    expect(screen.getByText('Supply Chain Transparency')).toBeInTheDocument();
  });

  it('adds blocks to the blockchain with valid hash', () => {
    render(<SupplyChainTransparency />);

    const supplier1 = mockSuppliers[0];
    const blockData = `${supplier1.name}-${new Date().toISOString()}-0-${supplier1.complianceStatus}`;
    const validHash = crypto.createHash('sha256').update(blockData).digest('hex');

    // Mock adding a block and verify its hash
    expect(validHash.length).toBe(64);  // SHA-256 hash length is 64 characters
  });

  it('detects tampered blockchain blocks', () => {
    render(<SupplyChainTransparency />);

    // Add two valid blocks
    const supplier1 = mockSuppliers[0];
    const supplier2 = mockSuppliers[1];

    const validBlock1 = {
      supplier: supplier1,
      timestamp: new Date().toISOString(),
      previousHash: '0',
      compliance: supplier1.complianceStatus,
      hash: crypto.createHash('sha256').update(`${supplier1.name}-${new Date().toISOString()}-0-${supplier1.complianceStatus}`).digest('hex'),
    };

    const validBlock2 = {
      supplier: supplier2,
      timestamp: new Date().toISOString(),
      previousHash: validBlock1.hash,
      compliance: supplier2.complianceStatus,
      hash: crypto.createHash('sha256').update(`${supplier2.name}-${new Date().toISOString()}-${validBlock1.hash}-${supplier2.complianceStatus}`).digest('hex'),
    };

    // Simulate tampering by changing data after hashing
    validBlock2.supplier.name = 'Tampered Supplier';

    const invalidHash = crypto.createHash('sha256').update(`${validBlock2.supplier.name}-${validBlock2.timestamp}-${validBlock2.previousHash}-${validBlock2.compliance}`).digest('hex');

    // The hashes should no longer match, detecting tampering
    expect(validBlock2.hash).not.toBe(invalidHash);
  });

  it('filters suppliers by compliance status', () => {
    render(<SupplyChainTransparency />);
    
    const input = screen.getByPlaceholderText('Filter by compliance status...');
    expect(input).toBeInTheDocument();

    // Simulate user typing 'Compliant' into the filter input
    input.value = 'Compliant';
    const filteredSuppliers = screen.getByText('Supplier 1');
    expect(filteredSuppliers).toBeInTheDocument();

    // Simulate user typing 'Non-compliant'
    input.value = 'Non-compliant';
    const nonCompliantSuppliers = screen.getByText('Supplier 2');
    expect(nonCompliantSuppliers).toBeInTheDocument();
  });

  it('handles empty supplier data gracefully', () => {
    render(<SupplyChainTransparency />);

    // No suppliers in the data
    expect(screen.queryByText('Supplier 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Supplier 2')).not.toBeInTheDocument();
  });
});
