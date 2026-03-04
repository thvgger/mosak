// import React, { useEffect, useState } from 'react';
// import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
// import { Menu, Users, Info, Volume2, Search, Pin, PanelLeftOpen, EllipsisVertical, ChevronRight, PanelRightOpen } from 'lucide-react';
// import MessageList from '../../components/community/MessageList';
// import MessageInput from '../../components/community/MessageInput';
// import UserProfileSidebar from '../../components/community/UserProfileSidebar';
// import PinnedAdvert from '../../components/community/PinnedAdvert';

// const ChannelChat = () => {
//   const { channelId } = useParams();
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const navigate = useNavigate();

//   const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();

//   // Check screen size on resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const getChannelInfo = (id) => {
//     const channels = {
//       'home': { name: 'Home', description: 'Main community discussions', members: '1.2k' },
//       'general': { name: 'General', description: 'Main community discussions', members: '1.2k' },
//       'introductions': { name: 'Introductions', description: 'New members introduce themselves', members: '432' },
//       'buyers-lounge': { name: 'Buyers Lounge', description: 'Buyers discussion and tips', members: '856' },
//       'sellers-lounge': { name: 'Sellers Lounge', description: 'Sellers networking and strategies', members: '643' },
//       'freelancers-lounge': { name: 'Freelancers Lounge', description: 'Freelancers community', members: '389' },
//       'gigs-marketplace': { name: 'Gigs & Services', description: 'Find and offer services', members: '234' },
//       'deals': { name: 'Hot Deals', description: 'Best deals and discounts', members: '567' },
//       'requests': { name: 'Buyer Requests', description: 'Request products and services', members: '178' },
//       'guides': { name: 'Guides & Tutorials', description: 'Learn and share knowledge', members: '312' },
//       'faq': { name: 'FAQ', description: 'Frequently asked questions', members: '89' },
//       'feedback': { name: 'Feedback', description: 'Share your feedback', members: '156' }
//     };
//     return channels[id] || { name: id, description: 'Channel discussions', members: '0' };
//   };

//   const channelInfo = getChannelInfo(channelId || 'general');

//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//     setIsRightSidebarOpen(true);
//   };

//   const handleCloseProfile = () => {
//     setIsRightSidebarOpen(false);
//     setSelectedUser(null);
//   };

//   return (
//     <div className="flex h-full bg-white">
//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col min-w-0 w-full h-full">
//         {/* Channel Header with Sidebar Toggle */}
//         <div className="min-h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
//           <div className="w-full flex items-center gap-3">
//             <div className="flex items-center">
//               {!isSidebarOpen ? (
//                 <button
//                   onClick={() => setIsSidebarOpen(prev => !prev)}
//                   className="rounded hover:bg-gray-50"
//                 >
//                   <PanelLeftOpen size={20} className='text-gray-400' />
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsSidebarOpen(prev => !prev)}
//                   className="rounded hover:bg-gray-50"
//                 >
//                   <PanelRightOpen size={20} className='text-gray-400' />
//                 </button>
//               )}
//             </div>

//             <div className="w-full flex items-center justify-between gap-2.5">
//               <h2 className="font-semibold text-base"> #{channelInfo.name} </h2>
//               <p className="text-xs text-gray-500">
//                 {channelInfo.description}
//               </p>
//               {/* <span className="hidden md:flex text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
//                 {channelInfo.members} members 
//                 (12 online)
//               </span> */}
//               <button className="btn gap-1 px-3 py-2 pr-1.5 text-xs" onClick={() => { navigate("/community/all-m-adverts");}}>
//                 <span className="inline"> View All Ads </span>
//                 <ChevronRight size={14} />
//               </button>
//               {/* <button className='flex md:hidden py-1 px-1 bg-gray-50 hover:bg-gray-100 rounded-lg'>
//                 <EllipsisVertical size={18} strokeWidth={1.5} />
//               </button> */}
//             </div>
//           </div>
//         </div>
        


//         {/* Messages - This will scroll */}
//         <div className="flex-1 overflow-y-auto mt-0">
//           <PinnedAdvert />
//           <MessageList onUserSelect={handleUserSelect} />
//         </div>
        
//         {/* Input - This stays sticky at the bottom */}
//         <MessageInput channelId={channelId} />
//       </div>

//       {/* Unified Profile Component - Handles both desktop sidebar and mobile popup */}
//       <UserProfileSidebar 
//         isOpen={isRightSidebarOpen}
//         onClose={handleCloseProfile}
//         selectedUser={selectedUser}
//         isMobile={isMobile}
//       />
//     </div>
//   );
// };

// export default ChannelChat;

import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { PanelLeftOpen, PanelRightOpen, ChevronRight } from 'lucide-react';
import MessageList from '../../components/community/MessageList';
import MessageInput from '../../components/community/MessageInput';
import UserProfileSidebar from '../../components/community/UserProfileSidebar';
import PinnedAdvert from '../../components/community/PinnedAdvert';
import { useMessages } from '../../hooks/useMessages';

// Initial dummy messages with reply structure
const INITIAL_MESSAGES = [
  {
    id: 1,
    name: 'Chioma Adeleke',
    badge: 'Gold',
    role: 'Seller',
    content: 'Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉',
    timestamp: '2024-01-15T10:24:00Z',
    reactions: []
  },
  {
    id: 2,
    name: 'Tunde Bakere',
    badge: 'Silver',
    role: 'Buyer',
    content: 'Congratulations Chioma! I\'ll check it out. Has anyone tried the new search filters?',
    timestamp: '2024-01-15T10:25:00Z',
    reactions: []
  },
  {
    id: 3,
    name: 'Ngozi Okonkwo',
    badge: 'Platinum',
    role: 'Freelancer',
    content: 'Yes! The filters are super helpful. Makes discovery much easier.',
    timestamp: '2024-01-15T10:26:00Z',
    parentId: 2, // This is a reply to Tunde's message
    reactions: []
  },
  {
    id: 4,
    name: 'Aminu Suleiman',
    badge: 'Gold',
    role: 'Freelancer',
    content: 'This is another message to show scrolling behavior.',
    timestamp: '2024-01-15T10:27:00Z',
    reactions: []
  },
  {
    id: 5,
    name: 'John Doe',
    badge: 'Silver',
    role: 'Buyer',
    content: 'This is another message to show scrolling behavior.',
    timestamp: '2024-01-15T10:28:00Z',
    reactions: []
  }
];

const ChannelChat = () => {
  const { channelId } = useParams();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Use our custom hook for message management
  const {
    messages,
    replyingTo,
    setReplyingTo,
    addMessage,
    addReply,
    addReaction
  } = useMessages(INITIAL_MESSAGES);

  const navigate = useNavigate();
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get channel info
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

  // Build message tree for display
  const getMessagesWithParents = () => {
    return messages.map(message => ({
      ...message,
      parentMessage: message.parentId ? messages.find(m => m.id === message.parentId) : null
    }));
  };

  // Handle sending a new message or reply
  const handleSendMessage = (messageData) => {
    const currentUser = {
      name: 'Current User', // This would come from auth context
      badge: 'Gold',
      role: 'Member'
    };

    const newMessage = {
      ...currentUser,
      content: messageData.content,
      timestamp: new Date().toISOString()
    };

    if (messageData.parentId) {
      // This is a reply
      const parentMessage = messages.find(m => m.id === messageData.parentId);
      addReply(newMessage, messageData.parentId);
      
      // Here you would also make an API call to your backend
      // api.post(`/channels/${channelId}/messages/${messageData.parentId}/replies`, newMessage);
    } else {
      // This is a new message
      addMessage(newMessage);
      
      // Here you would make an API call to your backend
      // api.post(`/channels/${channelId}/messages`, newMessage);
    }
  };

  // Handle reactions
  const handleReaction = (messageId, reaction) => {
    const userId = 'current-user-id'; // This would come from auth context
    addReaction(messageId, reaction, userId);
    
    // Here you would make an API call to your backend
    // api.post(`/messages/${messageId}/reactions`, { type: reaction });
  };

  // Handle user selection for profile view
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsRightSidebarOpen(true);
  };

  const handleCloseProfile = () => {
    setIsRightSidebarOpen(false);
    setSelectedUser(null);
  };

  const messagesWithParents = getMessagesWithParents();

  return (
    <div className="flex h-full bg-white border-r border-gray-200">
      {/* Chat Area */}
      <div className="flex flex-col min-w-0 w-full h-full">
        {/* Channel Header */}
        <div className="min-h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
          <div className="w-full flex items-center gap-3">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                {!isSidebarOpen ? (
                  <PanelLeftOpen size={20} className='text-gray-400' />
                ) : (
                  <PanelRightOpen size={20} className='text-gray-400' />
                )}
              </button>
            </div>

            <div className="w-full flex items-center justify-between gap-2.5">
              <h2 className="font-semibold text-base"> #{channelInfo.name} </h2>
              <p className="text-xs text-gray-500 hidden md:block">
                {channelInfo.description}
              </p>
              <button 
                className="btn gap-1 px-3 py-2 pr-1.5 text-xs" 
                onClick={() => navigate("/community/all-m-adverts")}
              >
                <span className="inline"> View All Ads </span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mt-0">
          <PinnedAdvert />
          <MessageList 
            messages={messagesWithParents}
            onUserSelect={handleUserSelect}
            onReply={setReplyingTo}
            onReaction={handleReaction}
          />
        </div>
        
        {/* Input */}
        <MessageInput 
          channelId={channelId}
          onSendMessage={handleSendMessage}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
        />
      </div>

      {/* User Profile Sidebar */}
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