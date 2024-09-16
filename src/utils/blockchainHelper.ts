// src/utils/blockchainHelper.ts

export class BlockchainBlock {
    public index: number;
    public timestamp: string;
    public data: any;
    public previousHash: string;
    public hash: string;
  
    constructor(index: number, data: any, previousHash: string = '') {
      this.index = index;
      this.timestamp = new Date().toISOString();
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }
  
    // Example hash calculation (use a proper hash function in production)
    calculateHash(): string {
      return `${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`.hashCode();
    }
  }
  
  // Basic Linked List for Blockchain
  export class BlockchainLinkedList {
    public chain: BlockchainBlock[];
  
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
  
    createGenesisBlock(): BlockchainBlock {
      return new BlockchainBlock(0, { supplier: "Genesis Block" }, "0");
    }
  
    getLatestBlock(): BlockchainBlock {
      return this.chain[this.chain.length - 1];
    }
  
    addBlock(newBlock: BlockchainBlock): void {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
  
    isChainValid(): boolean {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
  
        if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
      return true;
    }
  }
  
  // Helper to extend String for simple hash code calculation (for demo)
  declare global {
    interface String {
      hashCode(): string;
    }
  }
  
  String.prototype.hashCode = function (): string {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
      const char = this.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  };
  