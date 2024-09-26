import { useEffect, useState } from 'react';
import { GraphNode, GraphEdge } from '../types/graphTypes';

interface GraphVisualization {
  graphData: {
    nodes: { id: number; label: string; group: string }[];
    edges: { from: number; to: number }[];
  };
  graphOptions: {};
}

export const useGraphVisualization = (
  data: { nodes: GraphNode[]; edges: GraphEdge[] }
): GraphVisualization => {
  const [graphData, setGraphData] = useState<GraphVisualization['graphData']>({
    nodes: [],
    edges: [],
  });
  const [graphOptions, setGraphOptions] = useState<GraphVisualization['graphOptions']>({});

  useEffect(() => {
    // Transforming the data for Vis Network
    const nodes = data.nodes.map((node) => ({
      id: node.id,
      label: node.label,
      group: node.group, // Optional grouping for colors
    }));

    const edges = data.edges.map((edge) => ({
      from: edge.from,
      to: edge.to,
    }));

    setGraphData({ nodes, edges });

    // Configuration options for the graph
    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: {
          size: 14,
        },
      },
      edges: {
        width: 2,
        color: { color: '#848484', highlight: '#848484' },
        arrows: {
          to: { enabled: true, scaleFactor: 0.5 },
        },
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -30000,
        },
        stabilization: {
          iterations: 2500,
        },
      },
      interaction: {
        hover: true,
        navigationButtons: true,
      },
    };

    setGraphOptions(options);
  }, [data]);

  return { graphData, graphOptions };
};
