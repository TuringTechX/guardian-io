import React from 'react';
import { useVoting } from '../../hooks/useVoting';

export const VotingSystem: React.FC = () => {
  const { proposals, vote } = useVoting();

  return (
    <div className="voting-system">
      <h2 className="text-2xl font-bold mb-4">Voting System</h2>
      {proposals.map((proposal) => (
        <div key={proposal.id} className="my-4 p-4 border">
          <h3 className="text-lg font-bold">{proposal.title}</h3>
          <p>{proposal.description}</p>
          <button
            className="mt-2 bg-green-500 text-white py-1 px-3"
            onClick={() => vote(proposal.id, 'yes')}
          >
            Vote Yes
          </button>
          <button
            className="ml-2 bg-red-500 text-white py-1 px-3"
            onClick={() => vote(proposal.id, 'no')}
          >
            Vote No
          </button>
        </div>
      ))}
    </div>
  );
};
