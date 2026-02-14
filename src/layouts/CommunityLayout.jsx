import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CommunitySidebar from '../components/community/CommunitySidebar';

const CommunityLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative border-b border-gray-300 container! mx-auto py-4 p-0!">
      {/* Left Sidebar - Channels & Groups */}
      <CommunitySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex h-full flex-col min-w-0 relative overflow-y-auto">
        <Outlet context={{ setIsSidebarOpen, isSidebarOpen }} />
      </div>
    </div>
  );
};

export default CommunityLayout;