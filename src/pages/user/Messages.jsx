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
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import CreateSecureDealModal from '../../components/community/CreateSecureDealModal';

// Component to render initials placeholder
const InitialsAvatar = ({ name, size = "w-12 h-12", textSize = "text-base" }) => (
  <div className={`${size} rounded-full bg-blue-600 text-white flex items-center justify-center font-bold ${textSize}`}>
    {name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
  </div>
);

const AvatarWithFallback = ({ src, name, size = "w-12 h-12", textSize = "text-base", border = "" }) => {
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

const ProductCard = ({ product }) => (
  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2 w-fit max-w-[320px]">
    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
      {product.image && <img src={product.image} className="w-full h-full object-cover rounded-lg" />}
    </div>
    <div>
      <h4 className="text-xs font-semibold text-gray-900 leading-tight mb-1">{product.name}</h4>
      <p className="text-[10px] text-gray-500">Original Price: <span className="font-bold text-gray-900">₦{product.price}</span></p>
    </div>
  </div>
);

const PaymentSentCard = ({ amount, orderId, time }) => (
  <div className="w-full max-w-[500px] bg-[#EEF2FF] border border-blue-600 rounded-[24px] p-6 flex gap-4 items-start animate-in slide-in-from-bottom-2 duration-300">
    <div className="w-12 h-12 bg-[#DDE4FF] rounded-xl flex items-center justify-center shrink-0">
      <ShieldCheck size={24} className="text-blue-600" />
    </div>
    <div className="flex-1 space-y-2">
      <h3 className="text-blue-600 font-bold text-lg">Payment Sent</h3>
      <p className="text-gray-600 text-[13px] leading-relaxed">
        Your payment of <span className="font-bold text-gray-900">₦{Number(amount).toLocaleString()}</span> has been securely held in escrow for Order <span className="font-bold text-gray-900">{orderId}</span>
      </p>
      <p className="text-[11px] text-gray-400 font-bold pt-1">{time}</p>
    </div>
  </div>
);

const OfferCard = ({ deal, time }) => {
  const [status, setStatus] = useState(deal.status);

  if (status === 'Accepted') {
    return <PaymentSentCard amount={deal.amount} orderId={deal.id} time={time} />;
  }

  if (status === 'Declined') {
    return (
      <div className="w-full max-w-[400px] rounded-3xl overflow-hidden bg-[#FDF2F2] border border-red-100 shadow-sm animate-in zoom-in-95 duration-300">
        <div className="bg-[#FF3B3B] px-8 py-5">
          <span className="font-bold text-white text-xl">Offer from Seller</span>
        </div>
        <div className="p-6 space-y-5">
          <div className="bg-[#FF8A8A] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded flex-shrink-0"></div>
            <div>
              <h4 className="text-base font-bold text-white">{deal.service}</h4>
              <p className="text-xs text-white/90">Quantity: 1</p>
            </div>
          </div>
          <div className="bg-[#FF8A8A] rounded-2xl p-5">
            <p className="text-xs text-white/90 font-medium mb-1">Agreed Price</p>
            <p className="text-xl font-bold text-white">₦{Number(deal.amount).toLocaleString()}</p>
          </div>
          <button className="w-full py-5 bg-[#FFB1B1] text-white font-bold text-sm rounded-2xl transition-colors cursor-default uppercase tracking-wider">
            Declined
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-[#DDE4FF] px-8 py-5">
        <span className="font-bold text-gray-900 text-xl">Offer from Seller</span>
      </div>
      <div className="p-6 space-y-5">
        <div className="border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
          <div>
            <h4 className="text-base font-bold text-gray-900 leading-tight">{deal.service}</h4>
            <p className="text-xs text-gray-400 font-medium">Quantity: 1</p>
          </div>
        </div>
        <div className="border border-gray-100 rounded-2xl p-5">
          <p className="text-xs text-gray-400 font-medium mb-1">Agreed Price</p>
          <p className="text-xl font-bold text-gray-900">₦{Number(deal.amount).toLocaleString()}</p>
        </div>
        <div className="bg-[#B4C6FF] rounded-xl p-4 flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <p className="text-[11px] text-blue-700 font-bold leading-tight">
            Escrow Protection: Payment will be held safely until delivery is confirmed
          </p>
        </div>
        <div className="flex gap-4 pt-2">
          <button 
            onClick={() => setStatus('Declined')}
            className="flex-1 py-4 border-2 border-gray-200 text-gray-900 font-bold text-sm rounded-2xl hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={() => setStatus('Accepted')}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-blue-600/20"
          >
            Accept & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

const SecureDealCard = ({ deal, sender }) => (
  <div className="w-full max-w-[400px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-in slide-in-from-bottom-2 duration-300">
    <div className="bg-[#E0E7FF] px-6 py-5 flex justify-between items-center">
      <span className="font-bold text-gray-900 text-xl">Secure Deal</span>
      <span className="px-4 py-1.5 bg-white rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-100">
        {deal.id}
      </span>
    </div>
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Service</span>
          <span className="text-gray-900 font-bold">{deal.service}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Amount</span>
          <span className="text-blue-600 font-bold">₦{Number(deal.amount).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Delivery</span>
          <span className="text-gray-900 font-bold">{deal.delivery}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium">Status</span>
          <span className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-full font-bold text-xs">
            {deal.status}
          </span>
        </div>
      </div>
      <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-2xl p-4 flex gap-3 items-start">
        <div className="w-5 h-5 rounded-full border-2 border-[#B45309] flex items-center justify-center text-[#B45309] font-bold text-[10px] shrink-0 mt-0.5">!</div>
        <div className="space-y-1">
          <span className="font-bold text-[#B45309] text-sm">Pending</span>
          <p className="text-xs text-[#92400E] leading-relaxed font-medium">
            Waiting for {sender === 'me' ? 'freelancer' : 'you'} to accept {sender === 'me' ? 'your' : 'this'} deal request.
          </p>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-blue-700 font-bold text-xs rounded-full transition-colors">
          Details
        </button>
        <button className="flex-1 py-3.5 bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#854D0E] font-bold text-xs rounded-full transition-colors flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full border border-[#854D0E] flex items-center justify-center text-[10px]">!</div>
          Dispute
        </button>
        <button className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-full transition-colors flex items-center justify-center gap-2">
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const SystemNotification = ({ content, time }) => (
  <div className="w-full bg-[#FFF7ED] border border-orange-100 rounded-2xl p-5 shadow-sm animate-in fade-in duration-500">
    <p className="text-sm font-bold text-[#9A3412] leading-relaxed">
      {content}
    </p>
    <p className="text-[10px] font-bold text-[#C2410C]/60 mt-2 uppercase tracking-tight">{time}</p>
  </div>
);

const ChatContent = ({ 
  selectedChat, 
  showMobileChat, 
  handleBack, 
  messages, 
  messageInput, 
  setMessageInput, 
  handleSendMessage, 
  showOptions, 
  setShowOptions, 
  optionsRef, 
  setIsDealModalOpen,
  location
}) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'read':
        return <CheckCheck size={14} className="text-white" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-500" />;
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      default:
        return <Check size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className={`flex flex-col bg-white ${showMobileChat ? 'fixed inset-0 z-[10000] w-screen h-[100dvh]' : 'h-full flex-1'}`}>
      {/* Chat Header */}
      <div className="bg-blue-600 text-white shrink-0">
        <div className="px-8 py-6 flex items-center justify-between safe-top">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBack}
              className="md:hidden p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="relative">
              <AvatarWithFallback 
                src={selectedChat.avatar} 
                name={selectedChat.name}
                border="border-2 border-white/20"
                size="w-14 h-14"
              />
              {selectedChat.online && (
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-blue-600 rounded-full"></span>
              )}
            </div>
            <div>
              <h2 className="font-bold text-xl">{selectedChat.name}</h2>
              <p className="text-xs text-blue-100 flex items-center gap-1.5">
                Active now <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <Video size={24} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <Phone size={24} />
            </button>
            
            <div className="relative" ref={optionsRef}>
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <MoreVertical size={24} />
              </button>

              {showOptions && (
                <div className="absolute right-0 top-12 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[200px] z-50 animate-popup-in text-gray-700">
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl transition-colors group">
                    <Box size={18} className="text-gray-400 group-hover:text-primary" />
                    <span>View Product</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsDealModalOpen(true);
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl transition-colors group"
                  >
                    <Clock size={18} className="text-gray-400 group-hover:text-primary" />
                    <span>
                      {location.pathname.startsWith('/seller') || location.pathname.startsWith('/freelancer') 
                        ? 'Create Offer' 
                        : 'Create Deal'
                      }
                    </span>
                  </button>
                  <div className="my-1.5 border-t border-gray-100" />
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
                    <AlertCircle size={18} className="text-red-400 group-hover:text-red-600" />
                    <span>Report {selectedChat.status === 'buyer' ? 'Buyer' : selectedChat.status === 'seller' ? 'Seller' : 'User'}</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
                    <X size={18} className="text-red-400 group-hover:text-red-600" />
                    <span>Block {selectedChat.status === 'buyer' ? 'Buyer' : selectedChat.status === 'seller' ? 'Seller' : 'User'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
        {messages.map((message) => {
          if (message.type === 'date') {
            return (
              <div key={message.id} className="flex justify-center">
                <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                  {message.content}
                </span>
              </div>
            );
          }

          if (message.type === 'system') {
            return (
              <div key={message.id} className="w-full px-4">
                <SystemNotification content={message.content} time={message.time} />
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-3 max-w-[85%] sm:max-w-[70%] ${
                message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {message.sender === 'them' && (
                  <AvatarWithFallback 
                    src={selectedChat.avatar} 
                    name={selectedChat.name}
                    size="w-8 h-8"
                    textSize="text-[10px]"
                  />
                )}
                
                {message.type === 'offer' ? (
                  <OfferCard deal={message.dealData} time={message.time} />
                ) : message.type === 'deal' ? (
                  <SecureDealCard deal={message.dealData} sender={message.sender} />
                ) : (
                  <div className="group flex flex-col items-end">
                    {message.productData && <ProductCard product={message.productData} />}
                    <div
                      className={`px-5 py-3 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-900 rounded-tl-none border border-gray-100 shadow-sm'
                      }`}
                    >
                      <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 mt-1.5 text-[10px] font-bold text-gray-400 ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{message.time}</span>
                      {message.sender === 'me' && getStatusIcon(message.status)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-3 bg-[#FAFAFA] flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          'Thank you for your interest', 
          'Is this still available?', 
          'What is your best price?',
          "I'll get back to you soon",
          'Can we meet for inspection?',
          'Send me more pictures',
          'Yes, it is.',
          'No, thank you.'
        ].map((reply, idx) => (
          <button 
            key={idx}
            onClick={() => setMessageInput(reply)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 whitespace-nowrap hover:bg-gray-50 transition-colors shadow-sm"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-100 bg-white shrink-0 safe-bottom">
        <div className="flex items-end gap-4">
          <div className="flex items-center gap-3 mb-2">
            <button type="button" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Paperclip size={24} />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <ImageIcon size={24} />
            </button>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="w-full pl-6 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 text-sm font-medium placeholder:text-gray-400 shadow-inner resize-none min-h-[56px] max-h-[150px] overflow-y-auto"
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
            <button 
              type="button"
              className="absolute right-4 bottom-4 p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Smile size={20} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsDealModalOpen(true)}
            className="px-6 py-4 mb-0.5 text-xs font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 shrink-0 whitespace-nowrap uppercase tracking-wider"
          >
            {location.pathname.startsWith('/seller') || location.pathname.startsWith('/freelancer') 
              ? 'Create Offer' 
              : 'Create Deal'
            }
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="p-4 mb-0.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:bg-gray-200 shadow-lg shadow-blue-600/20 shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const optionsRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleBack = () => {
    setSelectedChat(null);
    setShowMobileChat(false);
  };

  const conversations = [
    {
      id: 1,
      name: 'Stacey Sam',
      location: '123 Victoria Island',
      avatar: null,
      lastMessage: "Hi, I'm interested in porsche...",
      time: '2hr ago',
      unread: 5,
      online: true,
      status: 'seller'
    },
    {
      id: 2,
      name: 'Kate Jakes',
      location: '3BR Victoria Island',
      avatar: null,
      lastMessage: 'Thanks for the quick response about th...',
      time: '9m',
      unread: 0,
      read: true,
      online: false,
      status: 'seller'
    },
    {
      id: 3,
      name: 'Stacey Sam',
      location: '123 Victoria Island',
      avatar: null,
      lastMessage: "Hi, I'm interested in porsche...",
      time: '2hr ago',
      unread: 5,
      online: true,
      status: 'seller'
    },
    {
      id: 4,
      name: 'Mosalak Escrow System',
      location: '123 Victoria Island',
      avatar: null,
      lastMessage: '₦185,000 has been placed in escrow for Order...',
      time: '3 days ago',
      unread: 5,
      online: true,
      status: 'support'
    },
    {
      id: 5,
      name: 'Stacey Sam',
      location: '123 Victoria Island',
      avatar: null,
      lastMessage: "Hi, I'm interested in porsche...",
      time: '2hr ago',
      unread: 5,
      online: true,
      status: 'seller'
    }
  ];

  const messages = [
    {
      id: 'date-1',
      type: 'date',
      content: 'Today'
    },
    {
      id: 1,
      sender: 'me',
      content: 'Hi, I just placed an order for the iPhone 14 Pro Max. Is it brand new?',
      productData: {
        name: 'Samsung Galaxy S23 Ultra 256GB',
        price: '850,000',
        image: null
      },
      time: '10:25 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'them',
      content: "Yes, it's brand new and sealed. Thank you for your order!",
      time: '10:27 AM',
      status: 'read'
    },
    {
      id: 'sys-1',
      type: 'system',
      content: '₦185,000 has been placed in escrow for Order ORD-2024-1523',
      time: '10:27 AM'
    },
    {
      id: 'sys-2',
      type: 'system',
      content: '₦185,000 is ready for release. Please confirm delivery of your order.',
      time: '10:27 AM'
    },
    {
      id: 'deal-1',
      sender: 'me',
      type: 'deal',
      dealData: {
        id: 'MH-23849',
        service: 'Logo Design',
        amount: '30000',
        delivery: '3 Days',
        status: 'Awaiting Acceptance'
      },
      time: '10:28 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'me',
      content: 'Okay, pls send your offer',
      time: '10:25 AM',
      status: 'read'
    },
    {
      id: 'offer-1',
      sender: 'them',
      type: 'offer',
      dealData: {
        id: 'MH-23849',
        service: 'iPhone 13 Pro Max - 256GB',
        amount: '950000',
        delivery: '3 Days',
        status: 'Pending'
      },
      time: '10:30 AM',
      status: 'sent'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const chatContentProps = {
    selectedChat,
    showMobileChat,
    handleBack,
    messages,
    messageInput,
    setMessageInput,
    handleSendMessage,
    showOptions,
    setShowOptions,
    optionsRef,
    setIsDealModalOpen,
    location
  };

  return (
    <div className="flex-1 flex flex-col h-full md:h-[calc(100vh-150px)] overflow-hidden relative">
      <div className="flex-1 border-0 md:border border-gray-200 rounded-lg md:rounded-xl overflow-hidden flex flex-col md:flex-row shadow-none relative">
        <div 
          className={`
            w-full md:w-96 border-r border-gray-200 flex flex-col bg-white
            transition-all duration-300 ease-in-out
            ${showMobileChat ? 'hidden md:flex' : 'flex'}
            ${!selectedChat ? 'md:flex' : ''}
          `}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-gray-400"
              />
            </div>
            <div className='flex items-center gap-1 bg-gray-100 p-1 rounded-xl'>
              <button className='bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg w-full shadow-sm'> All </button>
              <button className='text-gray-500 font-medium text-sm px-4 py-2 rounded-lg w-full hover:bg-gray-50 transition-colors'> Unread </button>
              <button className='text-gray-500 font-medium text-sm px-4 py-2 rounded-lg w-full hover:bg-gray-50 transition-colors'> Newest </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`
                  w-full px-6 py-5 flex items-start space-x-4 hover:bg-gray-50 transition-colors 
                  border-b border-gray-50 last:border-b-0 relative
                  ${selectedChat?.id === chat.id ? 'bg-blue-50/50' : ''}
                `}
              >
                <div className="relative shrink-0">
                  <AvatarWithFallback src={chat.avatar} name={chat.name} />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-600 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold text-gray-900 text-[15px] truncate">{chat.name}</h3>
                    <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap ml-2">• {chat.time}</span>
                  </div>
                  <p className="text-xs font-bold text-blue-600 mb-1">{chat.location}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 truncate flex-1">{chat.lastMessage}</p>
                    {chat.unread > 0 ? (
                      <span className="bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ml-2 shrink-0">
                        {chat.unread}
                      </span>
                    ) : chat.read ? (
                      <CheckCheck size={14} className="text-blue-500 ml-2" />
                    ) : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {selectedChat ? (
          showMobileChat && window.innerWidth < 768 
            ? createPortal(<ChatContent {...chatContentProps} />, document.body)
            : <ChatContent {...chatContentProps} />
        ) : (
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
      <CreateSecureDealModal 
        isOpen={isDealModalOpen} 
        onClose={() => setIsDealModalOpen(false)} 
        recipientName={selectedChat?.name}
      />
    </div>
  );
};

export default Messages;