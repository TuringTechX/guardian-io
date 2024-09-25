import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Forum } from '../components/Collaboration/Forum';
import { Chat } from '../components/Collaboration/Chat';
import { DocumentSharing } from '../components/Collaboration/DocumentSharing';
import { VotingSystem } from '../components/Collaboration/VotingSystem';
import { TaskManager } from '../components/Collaboration/TaskManager';
import { CollaborationAnalytics } from '../components/Collaboration/CollaborationAnalytics';
import { useCollaborationData } from '../hooks/useCollaborationData';

const CollaborationPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('forum');
  const { data: collaborationData, isLoading } = useCollaborationData();

  const renderSection = () => {
    switch (selectedSection) {
      case 'forum':
        return <Forum data={collaborationData.forum} />;
      case 'chat':
        return <Chat />;
      case 'documents':
        return <DocumentSharing />;
      case 'voting':
        return <VotingSystem />;
      case 'tasks':
        return <TaskManager />;
      case 'analytics':
        return <CollaborationAnalytics />;
      default:
        return <Forum data={collaborationData.forum} />;
    }
  };

  return (
    <div className="collaboration-page flex min-h-screen">
      <Sidebar setSelectedSection={setSelectedSection} />
      <div className="flex-grow">
        <Header />
        <main className="p-6 bg-gray-50 dark:bg-gray-900">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            renderSection()
          )}
        </main>
      </div>
    </div>
  );
};

export default CollaborationPage;
