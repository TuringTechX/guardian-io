import React from 'react';
import { useGraphVisualization } from '../../hooks/useGraphVisualization';
import { Graph } from 'react-d3-graph';

interface GraphProps {
  data: any;
}

export const CollaborationGraph: React.FC<GraphProps> = ({ data }) => {
  const { graphConfig, graphData } = useGraphVisualization(data);

  return (
    <div className="collaboration-graph">
      <h2 className="text-2xl font-bold mb-4">Collaboration Map</h2>
      <Graph id="collaborationGraph" data={graphData} config={graphConfig} />
    </div>
  );
};
