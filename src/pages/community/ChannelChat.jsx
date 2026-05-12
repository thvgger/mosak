import React, { useEffect, useState, useRef } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { PanelLeftOpen, PanelRightOpen, ChevronRight, Users, Wifi, WifiOff, MoreVertical, Bell, BellOff, Info, LogOut } from 'lucide-react';
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
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const channelMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (channelMenuRef.current && !channelMenuRef.current.contains(event.target)) {
        setShowChannelMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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

            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 md:gap-4">
                <h2 className="font-bold text-base md:text-lg text-gray-800"> #{channelInfo.name} </h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <Users size={14} />
                  <span>{channelInfo.members} online</span>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse ml-1"></div>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 hidden lg:block font-medium">
                {channelInfo.description}
              </p>
              
              <div className="flex items-center gap-3">
                <button 
                  className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold shrink-0 hover:bg-blue-700 transition-all shadow-sm" 
                  onClick={() => navigate("/community/all-m-adverts")}
                >
                  <span className=""> View All Ads </span>
                  <ChevronRight size={14} strokeWidth={3} />
                </button>

                {/* <div className="relative" ref={channelMenuRef}>
                  <button 
                    onClick={() => setShowChannelMenu(!showChannelMenu)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {showChannelMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Info size={16} />
                        <span>Channel Info</span>
                      </button>
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {isMuted ? <BellOff size={16} /> : <Bell size={16} />}
                        <span>{isMuted ? 'Unmute' : 'Mute Notifications'}</span>
                      </button>
                      <div className="my-1 border-t border-gray-100"></div>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={16} />
                        <span>Leave Channel</span>
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
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