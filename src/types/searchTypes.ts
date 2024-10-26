// src/types/searchTypes.ts

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: 'Supplier' | 'Compliance' | 'Sustainability';
    date: string;
  }
  
  export interface FilterOptions {
    types: string[];
    recentOnly: boolean;
  }
  