import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { useGraphVisualization } from '../../hooks/useGraphVisualization';
import { GraphNode, GraphEdge } from '../../types/graphTypes';
import 'vis-network/styles/vis-network.css';

interface CollaborationGraphProps {
  data: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
}

export const CollaborationGraph: React.FC<CollaborationGraphProps> = ({ data }) => {
  const { graphData, graphOptions } = useGraphVisualization(data);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize the network
      const network = new Network(containerRef.current, graphData, graphOptions);

      // Example event listeners for interactions
      network.on('click', (params) => {
        console.log('Clicked nodes:', params.nodes);
        console.log('Clicked edges:', params.edges);
      });

      network.on('doubleClick', (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          // Zoom in or fetch detailed data about the node
          console.log('Double clicked on node:', nodeId);
        }
      });
    }
  }, [graphData, graphOptions]);

  return (
    <div className="collaboration-graph">
      <h2 className="text-2xl font-bold mb-4">Collaboration Map</h2>
      <div ref={containerRef} style={{ height: '500px', border: '1px solid #ddd' }} />
    </div>
  );
};
