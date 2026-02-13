import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Menu, Users, Info, Volume2, Search, Pin, PanelLeftOpen, EllipsisVertical, PanelRightOpen } from 'lucide-react';
import MessageList from '../../components/community/MessageList';
import MessageInput from '../../components/community/MessageInput';
import RightSidebar from '../../components/community/RightSidebar';
import PinnedAdvert from '../../components/community/PinnedAdvert';


const ChannelChat = () => {
  const { channelId } = useParams();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();


  const getChannelInfo = (id) => {
    const channels = {
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

  // const channelInfo = getChannelInfo(channelId);
  const channelInfo = getChannelInfo(channelId || 'general');


  return (
    <div className="flex h-full relative">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-y-auto">
        {/* Channel Header with Sidebar Toggle */}
        <div className="min-h-14 border-b border-gray-300 flex items-center justify-between px-4 bg-white">
          <div className="w-full flex items-center gap-3">
            {/* Sidebar Toggle Button - Visible on mobile/tablet */}
            {/* <button 
              onClick={() => document.querySelector('.lg\\:static')?.classList.contains('-translate-x-full') && 
                document.querySelector('[class*="fixed"]')?.classList.contains('z-50') && 
                window.innerWidth < 1024 && 
                document.querySelector('button[onClick*="setIsSidebarOpen"]')?.click()
              }
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button> */}

            <div className="flex items-center">
              {!isSidebarOpen ? (
                <button
                  onClick={() => setIsSidebarOpen(prev => !prev)}
                  className="rounded hover:bg-gray-50"
                >
                  <PanelLeftOpen size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setIsSidebarOpen(prev => !prev)}
                  className="rounded hover:bg-gray-50"
                >
                  <PanelRightOpen size={20} />
                </button>
              )}
            </div>


            <div className="w-full flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-semibold text-lg"> #{channelInfo.name} </h2>
              <p className="text-xs text-gray-500 truncate max-w-md">
                {channelInfo.description}
              </p>
              <span className="hidden md:flex text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {channelInfo.members} members
              </span>
              <button className='flex md:hidden py-1 hover:bg-gray-50 rounded-md'>
                <EllipsisVertical size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <PinnedAdvert />

        {/* Messages */}
        <MessageList channelId={channelId} />
        
        {/* Input */}
        <MessageInput channelId={channelId} />
      </div>

      {/* Right Sidebar - User Profiles */}
      <RightSidebar 
        isOpen={isRightSidebarOpen}
        onClose={() => setIsRightSidebarOpen(false)}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
    </div>
  );
};

export default ChannelChat;