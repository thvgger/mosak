import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import CommunitySidebar from '../components/community/CommunitySidebar';

const CommunityLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isCommunity } = useOutletContext();


  useEffect(() => { 
    if (isCommunity) { 
      document.body.style.overflowY = "hidden"; 
      window.scrollTo(0, 0); 
    } else { 
      document.body.style.overflowY = "auto"; 
    } 
    return () => { 
      // Reset when component unmounts 
      document.body.style.overflowY = "auto"; 
    }; }
  , [isCommunity]);
  
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative border-b border-gray-300 container! mx-auto py-4 p-0!">
      {/* Left Sidebar - Channels & Groups */}
      <CommunitySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex h-full flex-col min-w-0 relative pb-16 md:pb-20">
        <Outlet context={{ setIsSidebarOpen, isSidebarOpen }} />
      </div>
    </div>
  );
};

export default CommunityLayout;