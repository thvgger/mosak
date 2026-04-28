import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  CheckCheck,
  Check,
  Image as ImageIcon,
  File,
  X,
  MessageSquare,
  ArrowLeft,
  Box,
  Clock,
  AlertCircle,
  PlusCircle
} from 'lucide-react';
import car from "../../assets/car.png";
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import CreateSecureDealModal from '../../components/community/CreateSecureDealModal';

const Messages = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const optionsRef = React.useRef(null);

  // Handle outside click for options menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle body scroll lock and full screen state on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (showMobileChat && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-chat-active');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-chat-active');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-chat-active');
    };
  }, [showMobileChat]);

  // Handle mobile view when chat is selected
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (selectedChat && isMobile) {
        setShowMobileChat(true);
      } else {
        setShowMobileChat(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedChat]);

  // Handle back button on mobile
  const handleBack = () => {
    setSelectedChat(null);
    setShowMobileChat(false);
  };

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: 'TechHub Nigeria',
      avatar: null,
      lastMessage: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      unread: 2,
      online: true,
      status: 'seller'
    },
    {
      id: 2,
      name: 'AudioPro Store',
      avatar: null,
      lastMessage: 'Thank you for your purchase!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      status: 'seller'
    },
    {
      id: 3,
      name: 'CompuWorld Ltd',
      avatar: null,
      lastMessage: 'Your warranty has been extended',
      time: 'Yesterday',
      unread: 0,
      online: true,
      status: 'seller'
    },
    {
      id: 4,
      name: 'John Doe (Buyer)',
      avatar: null,
      lastMessage: 'Is the iPhone 15 still available?',
      time: '2 days ago',
      unread: 1,
      online: false,
      status: 'buyer'
    },
    {
      id: 5,
      name: 'Support Team',
      avatar: null,
      lastMessage: 'How can we help you today?',
      time: '3 days ago',
      unread: 0,
      online: true,
      status: 'support'
    }
  ];

  // Component to render initials placeholder
  const InitialsAvatar = ({ name, size = "w-10 h-10", textSize = "text-sm" }) => (
    <div className={`${size} rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold ${textSize}`}>
      {name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
    </div>
  );

  const AvatarWithFallback = ({ src, name, size = "w-10 h-10", textSize = "text-sm", border = "" }) => {
    const [imgError, setImgError] = useState(false);
    
    if (src && !imgError) {
      return (
        <img
          src={src}
          onError={() => setImgError(true)}
          className={`${size} rounded-full object-cover ${border}`}
        />
      );
    }
    
    return <InitialsAvatar name={name} size={size} textSize={textSize} />;
  };

  const SecureDealCard = ({ deal, sender }) => (
    <div className="w-full max-w-[320px] rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-md animate-in slide-in-from-bottom-2 duration-300">
      {/* Card Header */}
      <div className="bg-primary/10 px-4 py-3 flex justify-between items-center border-b border-primary/5">
        <span className="font-bold text-gray-900 text-sm">Secure Deal</span>
        <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/10">
          {deal.id}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 font-medium">Service</span>
            <span className="text-gray-900 font-bold">{deal.service}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 font-medium">Amount</span>
            <span className="text-primary font-bold">₦{Number(deal.amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 font-medium">Delivery</span>
            <span className="text-gray-900 font-bold">{deal.delivery}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-gray-500 font-medium">Status</span>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-bold text-[10px]">
              {deal.status}
            </span>
          </div>
        </div>

        {/* Status Notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 space-y-1">
          <div className="flex items-center gap-2 text-amber-700">
            <div className="w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-[10px]">!</div>
            <span className="font-bold text-[11px]">Pending</span>
          </div>
          <p className="text-[10px] text-amber-800/80 leading-relaxed font-medium">
            Waiting for {sender === 'me' ? 'freelancer' : 'you'} to accept {sender === 'me' ? 'your' : 'this'} deal request.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-primary font-bold text-[10px] rounded-lg border border-gray-100 transition-colors">
            Details
          </button>
          <button className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[10px] rounded-lg border border-amber-100 transition-colors flex items-center justify-center gap-1">
            <AlertCircle size={10} />
            Dispute
          </button>
          <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-[10px] rounded-lg border border-gray-100 transition-colors flex items-center justify-center gap-1">
            <X size={10} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Sample messages for selected chat
  const messages = [
    {
      id: 1,
      sender: 'them',
      content: 'Hello! Your order #ORD-2024-1547 has been processed and will be shipped soon.',
      time: '10:00 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'me',
      content: 'Great! When can I expect delivery?',
      time: '10:15 AM',
      status: 'read'
    },
    {
      id: 'deal-sample',
      sender: 'me',
      type: 'deal',
      dealData: {
        id: 'MH-23849',
        service: 'Logo Design',
        amount: '30000',
        delivery: '3 Days',
        status: 'Awaiting Acceptance'
      },
      time: '10:16 AM',
      status: 'sent'
    },
    {
      id: 3,
      sender: 'them',
      content: 'Delivery is estimated within 3-5 business days. You\'ll receive a tracking number once shipped.',
      time: '10:20 AM',
      status: 'read'
    },
    {
      id: 4,
      sender: 'them',
      content: 'Here\'s your tracking ID: TRK-2024-7890',
      time: '10:21 AM',
      status: 'read'
    },
    {
      id: 5,
      sender: 'me',
      content: 'Perfect! Thank you for the update.',
      time: '10:25 AM',
      status: 'delivered'
    },
    {
      id: 6,
      sender: 'them',
      content: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      status: 'sent'
    },
    {
      id: 7,
      sender: 'them',
      content: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      status: 'sent'
    },
    {
      id: 8,
      sender: 'them',
      content: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      status: 'sent'
    },
    {
      id: 9,
      sender: 'them',
      content: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      status: 'sent'
    },
    {
      id: 10,
      sender: 'them',
      content: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      status: 'sent'
    },
    {
      id: 'deal-sample',
      sender: 'me',
      type: 'deal',
      dealData: {
        id: 'MH-23849',
        service: 'Logo Design',
        amount: '30000',
        delivery: '3 Days',
        status: 'Awaiting Acceptance'
      },
      time: '10:16 AM',
      status: 'sent'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'read':
        return <CheckCheck size={16} className="text-blue-500" />;
      case 'delivered':
        return <CheckCheck size={16} className="text-gray-500" />;
      case 'sent':
        return <Check size={16} className="text-gray-400" />;
      default:
        return <Check size={16} className="text-gray-400" />;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Add send message logic here
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const ChatContent = () => (
    <div className={`flex flex-col bg-white ${showMobileChat ? 'fixed inset-0 z-[10000] w-screen h-[100dvh]' : 'h-full flex-1'}`}>
      {/* Chat Header */}
      <div className="bg-primary text-white shrink-0">
        <div className="p-4 flex items-center justify-between safe-top">
          <div className="flex items-center space-x-3">
            {/* Back button for mobile */}
            <button 
              onClick={handleBack}
              className="md:hidden p-1 hover:bg-gray-50/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="" />
            </button>
            <div className="relative">
              <AvatarWithFallback 
                src={selectedChat.avatar} 
                name={selectedChat.name}
                border="border border-white"
              />
              {selectedChat.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div>
              <h2 className="font-semibold ">{selectedChat.name}</h2>
              <p className="text-xs ">
                {selectedChat.online ? 'Active Now' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-50/10 rounded-full transition-colors hidden sm:block">
              <Video size={18} className="" />
            </button>
            <button className="p-2 hover:bg-gray-50/10 rounded-full transition-colors hidden sm:block">
              <Phone size={18} className="" />
            </button>
            
            <div className="relative" ref={optionsRef}>
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 hover:bg-gray-50/10 rounded-full transition-colors"
              >
                <MoreVertical size={18} className="" />
              </button>

              {showOptions && (
                <div className="absolute right-0 top-10 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 min-w-[170px] z-50 animate-popup-in">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group">
                    <Box size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                    <span>View Product</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsDealModalOpen(true);
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <Clock size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                    <span>
                      {location.pathname.startsWith('/seller') || location.pathname.startsWith('/freelancer') 
                        ? 'Create Offer' 
                        : 'Create Deal'
                      }
                    </span>
                  </button>
                  
                  <div className="my-1 border-t border-gray-100" />
                  
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group">
                    <AlertCircle size={16} className="text-red-400 group-hover:text-red-600 transition-colors" />
                    <span>Report {selectedChat.status === 'buyer' ? 'Buyer' : selectedChat.status === 'seller' ? 'Seller' : 'User'}</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group">
                    <X size={16} className="text-red-400 group-hover:text-red-600 transition-colors" />
                    <span>Block {selectedChat.status === 'buyer' ? 'Buyer' : selectedChat.status === 'seller' ? 'Seller' : 'User'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[70%] ${
              message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {message.sender === 'them' && (
                <AvatarWithFallback 
                  src={selectedChat.avatar} 
                  name={selectedChat.name}
                  size="w-6 h-6 sm:w-8 sm:h-8"
                  textSize="text-[10px] sm:text-xs"
                />
              )}
              
              {message.type === 'deal' ? (
                <SecureDealCard deal={message.dealData} sender={message.sender} />
              ) : (
                <div>
                  <div
                    className={`px-3 sm:px-4 py-2 rounded-2xl ${
                      message.sender === 'me'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm sm:text-base">{message.content}</p>
                  </div>
                  <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                    message.sender === 'me' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{message.time}</span>
                    {message.sender === 'me' && getStatusIcon(message.status)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white shrink-0 safe-bottom">
        <form onSubmit={handleSendMessage} className="w-full flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              rows="1"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-base sm:text-base max-h-32 scrollbar-hide"
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Dynamic Action Button (Create Offer / Create Deal) */}
          <button
            type="button"
            onClick={() => setIsDealModalOpen(true)}
            className="px-2 py-2.5 text-xs font-bold text-white hover:bg-primary/5 bg-primary rounded-lg transition-colors shrink-0 whitespace-nowrap uppercase tracking-wider"
          >
            {location.pathname.startsWith('/seller') || location.pathname.startsWith('/freelancer') 
              ? 'Create Offer' 
              : 'Create Deal'
            }
          </button>

          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full md:h-[calc(100vh-150px)] overflow-hidden relative">
      {/* Messages Container */}
      <div className="flex-1 border-0 md:border border-gray-200 rounded-lg md:rounded-xl overflow-hidden flex flex-col md:flex-row shadow-none relative">
        {/* Conversations List - Left Side */}
        <div 
          className={`
            w-full md:w-80 p-4 border-r border-gray-200 flex flex-col bg-white
            transition-all duration-300 ease-in-out
            ${showMobileChat ? 'hidden md:flex' : 'flex'}
            ${!selectedChat ? 'md:flex' : ''}
          `}
        >
          {/* Search */}
          <div className="mb-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>

            <div className='flex items-center gap-2 bg-gray-200 p-2 rounded-lg'>
              <button className='bg-white text-gray-500 text-sm px-4 py-1 rounded-md w-full'> All </button>
              <button className='bg-gray-50/50 text-gray-500 text-sm px-4 py-1 rounded-md w-full'> Unread </button>
              <button className='bg-gray-50/50 text-gray-500 text-sm px-4 py-1 rounded-md w-full'> Newest </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`
                  w-full p-4 flex items-start space-x-3 hover:bg-gray-100 transition-colors 
                  border-b border-gray-100 last:border-b-0
                  ${selectedChat?.id === chat.id ? 'bg-primary/15 hover:bg-primary/15' : ''}
                `}
              >
                <div className="relative shrink-0">
                  <AvatarWithFallback 
                    src={chat.avatar} 
                    name={chat.name} 
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                    {chat.lastMessage}

                    {chat.unread > 0 && (
                      <span className="bg-primary text-white text-xs px-1.5 py-px rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area - Right Side */}
        {selectedChat ? (
          showMobileChat && window.innerWidth < 768 
            ? createPortal(<ChatContent />, document.body)
            : <ChatContent />
        ) : (
          // No Chat Selected - Desktop view
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={28} className="text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-xs sm:text-sm text-gray-500">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Secure Deal Modal */}
      <CreateSecureDealModal 
        isOpen={isDealModalOpen} 
        onClose={() => setIsDealModalOpen(false)} 
        recipientName={selectedChat?.name}
      />
    </div>
  );
};

export default Messages;