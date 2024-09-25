import React, { useState } from 'react';
import { DiscussionThread } from './DiscussionThread';
import { useCollaborationData } from '../../hooks/useCollaborationData';

interface ForumProps {
  data: any[];
}

export const Forum: React.FC<ForumProps> = ({ data }) => {
  const [activeThread, setActiveThread] = useState<number | null>(null);

  return (
    <div className="forum">
      <h2 className="text-2xl font-bold mb-4">Discussion Forum</h2>
      <div className="flex">
        {/* List of discussion threads */}
        <div className="w-1/3 border-r">
          {data.map((thread, index) => (
            <div
              key={thread.id}
              className={`p-4 cursor-pointer ${index === activeThread ? 'bg-gray-100' : ''}`}
              onClick={() => setActiveThread(index)}
            >
              <h3 className="text-lg font-bold">{thread.title}</h3>
              <p className="text-sm">{thread.description}</p>
            </div>
          ))}
        </div>

        {/* Active thread details */}
        <div className="w-2/3 p-6">
          {activeThread !== null ? (
            <DiscussionThread thread={data[activeThread]} />
          ) : (
            <p>Select a thread to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};
