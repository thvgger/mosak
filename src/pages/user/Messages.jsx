import React, { useState, useEffect } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import car from "../../assets/car.png";
import { useAuth } from '../../contexts/AuthContext';

const Messages = () => {
  const { user, loading, isAuthenticated } = useAuth();
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Handle mobile view when chat is selected
  useEffect(() => {
    if (selectedChat) {
      setShowMobileChat(true);
    } else {
      setShowMobileChat(false);
    }
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
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Your order #ORD-2024-1547 has been shipped',
      time: '10:30 AM',
      unread: 2,
      online: true,
      status: 'seller'
    },
    {
      id: 2,
      name: 'AudioPro Store',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Thank you for your purchase!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      status: 'seller'
    },
    {
      id: 3,
      name: 'CompuWorld Ltd',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Your warranty has been extended',
      time: 'Yesterday',
      unread: 0,
      online: true,
      status: 'seller'
    },
    {
      id: 4,
      name: 'John Doe (Buyer)',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Is the iPhone 15 still available?',
      time: '2 days ago',
      unread: 1,
      online: false,
      status: 'buyer'
    },
    {
      id: 5,
      name: 'Support Team',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'How can we help you today?',
      time: '3 days ago',
      unread: 0,
      online: true,
      status: 'support'
    }
  ];

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

  return (
    <div className="md:h-[calc(100vh-150px)] flex flex-col md:-pb-40! overflow-y-hidden -p-4!">
      {/* Header - Only show on desktop or when no chat is selected on mobile */}
      {/* <div className={`mb-4 ${showMobileChat ? 'hidden md:block' : 'block'}`}>
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      </div> */}

      {/* Messages Container */}
      <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
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
                  <img
                    src={chat?.avatar || car}
                    // alt={chat.name}
                    className="w-10 h-10 rounded-full object-cover bg-primary/10"
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
                  {/* <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      chat.status === 'seller' ? 'bg-blue-100 text-blue-700' :
                      chat.status === 'buyer' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {chat.status}
                    </span>
                  </div> */}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area - Right Side */}
        {selectedChat ? (
          <div 
            className={`
              h-full flex-1 flex flex-col bg-white
              transition-all duration-300 ease-in-out
              ${showMobileChat ? 'flex' : 'hidden md:flex'}
            `}
          >
            {/* Chat Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Back button for mobile */}
                <button 
                  onClick={handleBack}
                  className="md:hidden p-1 hover:bg-gray-50/10 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} className="" />
                </button>
                <div className="relative">
                  <img
                    src={selectedChat.avatar || car}
                    // alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover border border-white"
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
                {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Info size={18} className="" />
                </button> */}
                <button className="p-2 hover:bg-gray-50/10 rounded-full transition-colors">
                  <MoreVertical size={18} className="" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[70%] ${
                    message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {message.sender === 'them' && (
                      <img
                        src={selectedChat.avatar}
                        // alt={selectedChat.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 bg-primary/10"
                      />
                    )}
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
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white z-10 fixed left-0 md:relative w-full pb-10 bottom-15 md:bottom-0">
              {/* Attachment Preview */}
              {showAttachments && (
                <div className="mb-0 flex items-center space-x-2 overflow-x-auto pb-2">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon size={20} className="text-gray-400" />
                    </div>
                    <button 
                      onClick={() => setShowAttachments(false)}
                      className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <File size={20} className="text-gray-400" />
                    </div>
                    <button 
                      onClick={() => setShowAttachments(false)}
                      className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700"
                    >
                      <X size={10} className="text-white" />
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="w-full h flex items-center space-x-2">
                <div className="flex-1 h-full relative">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    rows="1"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm sm:text-base max-h-10 scrollbar-hide"
                    // style={{ minHeight: '40px', maxHeight: '40px' }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                    }}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  {/* <button
                    type="button"
                    onClick={() => setShowAttachments(!showAttachments)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Paperclip size={18} className="text-gray-600" />
                  </button> */}
                  {/* <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
                  >
                    <Smile size={18} className="text-gray-600" />
                  </button> */}
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="p-1.5 sm:p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>

              {/* Emoji Picker Placeholder */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <p className="text-sm text-gray-500">Emoji picker coming soon...</p>
                </div>
              )}
            </div>
          </div>
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
    </div>
  );
};

export default Messages;