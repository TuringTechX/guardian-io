// src/types/graphTypes.ts

export interface GraphNode {
    id: number;
    label: string;
    group?: string; // Optional group property for node clustering or color coding
  }
  
  export interface GraphEdge {
    from: number;
    to: number;
  }
  