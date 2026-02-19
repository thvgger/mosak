import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Menu, Users, Info, Volume2, Search, Pin, PanelLeftOpen, EllipsisVertical, PanelRightOpen } from 'lucide-react';
import MessageList from '../../components/community/MessageList';
import MessageInput from '../../components/community/MessageInput';
import UserProfileSidebar from '../../components/community/UserProfileSidebar';
import PinnedAdvert from '../../components/community/PinnedAdvert';

const ChannelChat = () => {
  const { channelId } = useParams();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getChannelInfo = (id) => {
    const channels = {
      'home': { name: 'Home', description: 'Main community discussions', members: '1.2k' },
      'general': { name: 'General', description: 'Main community discussions', members: '1.2k' },
      'introductions': { name: 'Introductions', description: 'New members introduce themselves', members: '432' },
      'buyers-lounge': { name: 'Buyers Lounge', description: 'Buyers discussion and tips', members: '856' },
      'sellers-lounge': { name: 'Sellers Lounge', description: 'Sellers networking and strategies', members: '643' },
      'freelancers-lounge': { name: 'Freelancers Lounge', description: 'Freelancers community', members: '389' },
      'gigs-marketplace': { name: 'Gigs & Services', description: 'Find and offer services', members: '234' },
      'deals': { name: 'Hot Deals', description: 'Best deals and discounts', members: '567' },
      'requests': { name: 'Buyer Requests', description: 'Request products and services', members: '178' },
      'guides': { name: 'Guides & Tutorials', description: 'Learn and share knowledge', members: '312' },
      'faq': { name: 'FAQ', description: 'Frequently asked questions', members: '89' },
      'feedback': { name: 'Feedback', description: 'Share your feedback', members: '156' }
    };
    return channels[id] || { name: id, description: 'Channel discussions', members: '0' };
  };

  const channelInfo = getChannelInfo(channelId || 'general');

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsRightSidebarOpen(true);
  };

  const handleCloseProfile = () => {
    setIsRightSidebarOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full h-full">
        {/* Channel Header with Sidebar Toggle */}
        <div className="min-h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div className="w-full flex items-center gap-3">
            <div className="flex items-center">
              {!isSidebarOpen ? (
                <button
                  onClick={() => setIsSidebarOpen(prev => !prev)}
                  className="rounded hover:bg-gray-50"
                >
                  <PanelLeftOpen size={20} className='text-gray-400' />
                </button>
              ) : (
                <button
                  onClick={() => setIsSidebarOpen(prev => !prev)}
                  className="rounded hover:bg-gray-50"
                >
                  <PanelRightOpen size={20} className='text-gray-400' />
                </button>
              )}
            </div>

            <div className="w-full flex items-center justify-between gap-2.5">
              <h2 className="font-semibold text-base"> #{channelInfo.name} </h2>
              <p className="text-xs text-gray-500">
                {channelInfo.description}
              </p>
              <span className="hidden md:flex text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {channelInfo.members} members 
                (12 online)
              </span>
              <button className='flex md:hidden py-1 px-1 bg-gray-50 hover:bg-gray-100 rounded-lg'>
                <EllipsisVertical size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
        

        <PinnedAdvert />

        {/* Messages - This will scroll */}
        <div className="flex-1 overflow-y-auto mt-10">
          <MessageList onUserSelect={handleUserSelect} />
        </div>
        
        {/* Input - This stays sticky at the bottom */}
        <MessageInput channelId={channelId} />
      </div>

      {/* Unified Profile Component - Handles both desktop sidebar and mobile popup */}
      <UserProfileSidebar 
        isOpen={isRightSidebarOpen}
        onClose={handleCloseProfile}
        selectedUser={selectedUser}
        isMobile={isMobile}
      />
    </div>
  );
};

export default ChannelChat;