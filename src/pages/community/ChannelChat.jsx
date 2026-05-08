import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { PanelLeftOpen, PanelRightOpen, ChevronRight, Users, Wifi, WifiOff } from 'lucide-react';
import MessageList from '../../components/community/MessageList';
import MessageInput from '../../components/community/MessageInput';
import UserProfileSidebar from '../../components/community/UserProfileSidebar';
import PinnedAdvert from '../../components/community/PinnedAdvert';
import { useMessages } from '../../hooks/useMessages';
import { useAuth } from '../../contexts/AuthContext';
import { useCommunityUser } from '../../hooks/useCommunityUser';

const ChannelChat = () => {
  const { channelId } = useParams();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const { user: authUser } = useAuth();
  const { communityUser } = useCommunityUser();
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();
  const navigate = useNavigate();

  // Initial messages from screenshot
  const initialMessages = [
    {
      id: 'static-1',
      user: { 
        id: 'user-chioma', 
        name: 'Chioma Adeleke', 
        badge: 'Gold', 
        role: 'Seller',
        avatar: 'C' 
      },
      content: 'Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎨',
      timestamp: new Date().setHours(10, 24, 0, 0),
      reactions: [
        { type: '👍', userId: 'other-1' },
        { type: '👍', userId: 'other-2' },
        { type: '👍', userId: 'other-3' },
        { type: '👍', userId: 'other-4' },
        { type: '👍', userId: 'other-5' },
        { type: '🔥', userId: 'other-6' },
        { type: '🔥', userId: 'other-7' },
        { type: '🔥', userId: 'other-8' },
      ]
    },
    {
      id: 'static-2',
      user: { 
        id: 'user-tunde', 
        name: 'Tunde Bakere', 
        badge: 'Silver', 
        role: 'Buyer',
        avatar: 'T'
      },
      content: "Congratulations Chioma! I'll check it out. Has anyone tried the new search filters?",
      timestamp: new Date().setHours(10, 24, 0, 0),
      reactions: [
        { type: '👍', userId: 'other-1' },
        { type: '👍', userId: 'other-2' },
        { type: '👍', userId: 'other-3' },
        { type: '👍', userId: 'other-4' },
        { type: '👍', userId: 'other-5' },
        { type: '🔥', userId: 'other-6' },
        { type: '🔥', userId: 'other-7' },
        { type: '🔥', userId: 'other-8' },
      ]
    },
    {
      id: 'static-3',
      user: { 
        id: 'user-ngozi', 
        name: 'Ngozi Okonkwo', 
        badge: 'Platinum', 
        role: 'Freelancer',
        avatar: 'N'
      },
      content: 'Yes! The filters are super helpful. Makes discovery much easier.',
      timestamp: new Date().setHours(10, 24, 0, 0),
      reactions: [
        { type: '👍', userId: 'other-1' },
        { type: '👍', userId: 'other-2' },
        { type: '👍', userId: 'other-3' },
        { type: '👍', userId: 'other-4' },
        { type: '👍', userId: 'other-5' },
        { type: '🔥', userId: 'other-6' },
        { type: '🔥', userId: 'other-7' },
        { type: '🔥', userId: 'other-8' },
      ]
    },
    {
      id: 'static-4',
      user: { 
        id: 'user-kunle', 
        name: 'Kunle Edwards', 
        badge: 'Gold', 
        role: 'Seller',
        avatar: 'K'
      },
      content: "Has anyone checked out the new Porsche Macan on the marketplace? It's fully loaded and clean! 🚗🔥",
      timestamp: new Date().setHours(10, 25, 0, 0),
      reactions: [
        { type: '👍', userId: 'other-1' },
        { type: '😮', userId: 'other-2' },
        { type: '❤️', userId: 'other-3' },
      ]
    },
    {
      id: 'static-5',
      user: { 
        id: 'user-amina', 
        name: 'Amina Sule', 
        badge: 'Platinum', 
        role: 'Designer',
        avatar: 'A'
      },
      content: "Just uploaded some new African print designs. Limited stock available! 🎨👗",
      timestamp: new Date().setHours(10, 26, 0, 0),
      reactions: [
        { type: '❤️', userId: 'other-1' },
        { type: '🔥', userId: 'other-2' },
      ]
    },
    {
      id: 'static-6',
      user: { 
        id: 'user-emeka', 
        name: 'Emeka Okafor', 
        badge: 'Bronze', 
        role: 'Buyer',
        avatar: 'E'
      },
      content: "Welcome everyone! Happy to be part of the community. Looking forward to some great deals! 👋✨",
      timestamp: new Date().setHours(10, 27, 0, 0),
      reactions: [
        { type: '👍', userId: 'other-1' },
      ]
    }
  ];

  // Use our messages hook with WebSocket
  const {
    messages,
    replyingTo,
    setReplyingTo,
    sendMessage,
    sendTyping,
    addReaction,
    removeReaction,
    onlineCount,
    isConnected,
    typingUsers
  } = useMessages(channelId, initialMessages);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getChannelInfo = (id) => {
    const channels = {
      'general': { name: 'General', description: 'Main community discussions', members: onlineCount || '1.2k' },
      'introductions': { name: 'Introductions', description: 'New members introduce themselves', members: onlineCount || '432' },
      'buyers-lounge': { name: 'Buyers Lounge', description: 'Buyers discussion and tips', members: onlineCount || '856' },
      'sellers-lounge': { name: 'Sellers Lounge', description: 'Sellers networking and strategies', members: onlineCount || '643' },
      'freelancers-lounge': { name: 'Freelancers Lounge', description: 'Freelancers community', members: onlineCount || '389' },
      'gigs-marketplace': { name: 'Gigs & Services', description: 'Find and offer services', members: onlineCount || '234' },
      'deals': { name: 'Hot Deals', description: 'Best deals and discounts', members: onlineCount || '567' },
      'requests': { name: 'Buyer Requests', description: 'Request products and services', members: onlineCount || '178' }
    };
    return channels[id] || { name: id, description: 'Channel discussions', members: onlineCount || '0' };
  };

  const channelInfo = getChannelInfo(channelId || 'general');

  // Build messages with parent references
  const getMessagesWithParents = () => {
    // Combine initial static messages with fetched messages for the general channel
    const allMessages = channelId === 'general' || !channelId 
      ? [...initialMessages, ...messages.filter(m => !m.id.toString().startsWith('static-'))]
      : messages;

    return allMessages.map(message => ({
      ...message,
      parentMessage: message.parentId ? allMessages.find(m => m.id === message.parentId) : null
    }));
  };

  // Handle sending message
  const handleSendMessage = (messageData) => {
    sendMessage(messageData.content, messageData.parentId);
  };

  // Handle reaction
  const handleReaction = (messageId, reaction) => {
    // Check if user already reacted with this reaction
    const message = messages.find(m => m.id === messageId);
    const hasReacted = message?.reactions?.some(r => 
      r.type === reaction && r.userId === authUser?.id
    );
    
    if (hasReacted) {
      removeReaction(messageId, reaction);
    } else {
      addReaction(messageId, reaction);
    }
  };

  // Handle user selection
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
    <div className="flex h-full bg-white overflow-hidden overscroll-none">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full h-full relative overflow-hidden overscroll-behavior-contain">
        {/* Channel Header */}
        <div className="min-h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white sticky top-0 z-10 shrink-0">
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
              <div className="flex items-center gap-2 md:gap-3">
                <h2 className="font-semibold text-sm md:text-base truncate max-w-[120px] md:max-w-none"> #{channelInfo.name} </h2>
                <div className="hidden xs:flex items-center gap-1 text-[10px] md:text-xs text-gray-500 whitespace-nowrap">
                  <Users size={12} />
                  <span>{channelInfo.members}</span>
                </div>
                {isConnected ? (
                  <Wifi size={12} className="text-green-500 shrink-0" />
                ) : (
                  <WifiOff size={12} className="text-red-500 shrink-0" />
                )}
              </div>
              
              <p className="text-xs text-gray-500 hidden lg:block truncate max-w-md">
                {channelInfo.description}
              </p>
              
              <button 
                className="bg-primary text-white flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shrink-0 hover:bg-primary/90 transition-colors shadow-sm" 
                onClick={() => navigate("/community/all-m-adverts")}
              >
                <span className=""> View All Ads </span>
                <ChevronRight size={14} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <PinnedAdvert />
          <MessageList 
            messages={messagesWithParents}
            currentUser={communityUser || authUser}
            onUserSelect={handleUserSelect}
            onReply={setReplyingTo}
            onReaction={handleReaction}
          />
          
          {/* Typing Indicators */}
          {typingUsers.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-400 flex items-center gap-1">
              <div className="flex gap-0.5">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce delay-100">•</span>
                <span className="animate-bounce delay-200">•</span>
              </div>
              <span>
                {typingUsers.map(u => u.username).join(', ')} 
                {typingUsers.length === 1 ? ' is' : ' are'} typing...
              </span>
            </div>
          )}
        </div>
        
        {/* Input */}
        <MessageInput 
          channelId={channelId}
          onSendMessage={handleSendMessage}
          onTyping={sendTyping}
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