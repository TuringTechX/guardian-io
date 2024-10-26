// src/components/CSR/ProjectTimeline.tsx

import React from 'react';
import { Timeline } from 'react-visjs-timeline';

const projectEvents = [
  { id: 1, content: 'School Construction', start: '2023-01-15', end: '2023-06-30' },
  { id: 2, content: 'Healthcare Support', start: '2023-07-01', end: '2023-12-31' },
];

export const ProjectTimeline: React.FC = () => (
  <div className="project-timeline">
    <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
    <Timeline options={{ stack: false }} items={projectEvents} />
  </div>
);
