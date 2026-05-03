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
import OfferBreakdownModal from '../../components/user/OfferBreakdownModal';

// --- HELPER COMPONENTS ---

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
        alt={name}
      />
    );
  }
  
  return <InitialsAvatar name={name} size={size} textSize={textSize} />;
};

const ProductCard = ({ product }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 mb-2 w-fit max-w-[320px] shadow-lg shadow-gray-200/50">
    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
      {product.image && <img src={product.image} className="w-full h-full object-cover rounded-lg" alt="" />}
    </div>
    <div className="text-left">
      <h4 className="text-xs font-semibold text-gray-900 leading-tight mb-1 drop-shadow-sm">{product.name}</h4>
      <p className="text-[10px] text-gray-500">Original Price: <span className="font-bold text-gray-900">₦{product.price}</span></p>
    </div>
  </div>
);

const PaymentSentCard = ({ amount, orderId, time }) => (
  <div className="w-full max-w-[500px] bg-[#EEF2FF] border border-blue-600 rounded-[24px] p-6 flex gap-4 items-start animate-in slide-in-from-bottom-2 duration-300">
    <div className="w-12 h-12 bg-[#DDE4FF] rounded-xl flex items-center justify-center shrink-0">
      <ShieldCheck size={24} className="text-blue-600" />
    </div>
    <div className="flex-1 space-y-2 text-left">
      <h3 className="text-blue-600 font-bold text-lg">Payment Sent</h3>
      <p className="text-gray-600 text-[13px] leading-relaxed">
        Your payment of <span className="font-bold text-gray-900">₦{Number(amount).toLocaleString()}</span> has been securely held in escrow for Order <span className="font-bold text-gray-900">{orderId}</span>
      </p>
      <p className="text-[11px] text-gray-400 font-bold pt-1">{time}</p>
    </div>
  </div>
);

const OfferCard = ({ deal, time, onAcceptClick }) => {
  const [status, setStatus] = useState(deal.status);

  const handleAccept = () => {
    onAcceptClick(deal, () => setStatus('Accepted'));
  };

  if (status === 'Accepted') {
    return <PaymentSentCard amount={deal.amount} orderId={deal.id} time={time} />;
  }

  if (status === 'Declined') {
    return (
      <div className="w-full max-w-[400px] rounded-3xl overflow-hidden bg-[#FDF2F2] border border-red-100 shadow-sm animate-in zoom-in-95 duration-300 text-left">
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
    <div className="w-full max-w-[400px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-in slide-in-from-bottom-2 duration-300 text-left">
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
            onClick={handleAccept}
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
  <div className="w-full max-w-[400px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-in slide-in-from-bottom-2 duration-300 text-left">
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
        <div className="space-y-1 text-left">
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
  <div className="flex justify-center my-4 px-4">
    <div className="bg-orange-50/80 border border-orange-100 rounded-2xl p-4 max-w-[500px] w-full shadow-sm animate-in fade-in duration-500 text-center text-gray-900">
      <p className="text-xs font-bold text-orange-800/80 leading-relaxed">
        {content}
      </p>
      {time && <p className="text-[9px] font-bold text-orange-600/50 mt-1 uppercase tracking-wider">{time}</p>}
    </div>
  </div>
);

// --- MAIN CHAT CONTENT COMPONENT ---

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
  setIsOfferModalOpen,
  setSelectedDeal,
  setOfferAcceptedCallback,
  location
}) => {
  const scrollRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const getStatusIcon = (status) => {
    switch(status) {
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      default:
        return <Check size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className={`flex flex-col bg-white ${showMobileChat ? 'fixed inset-0 z-[10000] w-screen h-[100dvh]' : 'h-full flex-1 min-w-0 overflow-hidden'}`}>
      {/* Chat Header */}
      <div className="bg-blue-600 text-white shrink-0 shadow-md relative z-10">
        <div className="px-6 md:px-8 py-4 md:py-5 flex items-center justify-between safe-top">
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
                size="w-10 h-10 md:w-12 md:h-12"
              />
              {selectedChat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full"></span>
              )}
            </div>
            <div className="text-left">
              <h2 className="font-bold text-base md:text-lg">{selectedChat.name}</h2>
              <p className="text-[11px] text-blue-100 flex items-center gap-1.5 opacity-90">
                Active now <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors hidden sm:flex">
              <Video size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors hidden sm:flex">
              <Phone size={20} />
            </button>
            
            <div className="relative" ref={optionsRef}>
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {showOptions && (
                <div className="absolute right-0 top-12 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[200px] z-50 animate-popup-in text-gray-700 text-left">
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold hover:bg-gray-50 rounded-xl transition-colors group">
                    <Box size={18} className="text-gray-400 group-hover:text-primary" />
                    <span>View Product</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsDealModalOpen(true);
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold hover:bg-gray-50 rounded-xl transition-colors group text-left"
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
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors group text-left">
                    <AlertCircle size={18} className="text-red-400 group-hover:text-red-600" />
                    <span>Report {selectedChat.status === 'buyer' ? 'Buyer' : selectedChat.status === 'seller' ? 'Seller' : 'User'}</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors group text-left">
                    <X size={18} className="text-red-400 group-hover:text-red-600" />
                    <span>Block {selectedChat.status === 'buyer' ? 'Buyer' : selectedChat.status === 'seller' ? 'Seller' : 'User'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-6 bg-[#F8F9FB] text-gray-900">
        {messages.map((message) => {
          if (message.type === 'date') return (
            <div key={message.id} className="flex justify-center my-4">
              <span className="px-3 py-1 bg-gray-200/50 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-[0.2em]">{message.content}</span>
            </div>
          );
          if (message.type === 'system') return <SystemNotification key={message.id} content={message.content} time={message.time} />;
          
          return (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[90%] sm:max-w-[75%] ${message.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                {message.sender === 'them' && <AvatarWithFallback src={selectedChat.avatar} name={selectedChat.name} size="w-8 h-8" textSize="text-[10px]" />}
                {message.type === 'offer' ? (
                  <OfferCard deal={message.dealData} time={message.time} onAcceptClick={(deal, callback) => { setSelectedDeal(deal); setOfferAcceptedCallback(() => callback); setIsOfferModalOpen(true); }} />
                ) : message.type === 'deal' ? (
                  <SecureDealCard deal={message.dealData} sender={message.sender} />
                ) : (
                  <div className={`flex flex-col ${message.sender === 'me' ? 'items-end text-right' : 'items-start text-left'}`}>
                    {message.productData && <ProductCard product={message.productData} />}
                    <div className={`px-4 py-2.5 rounded-2xl shadow-sm ${message.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-900 rounded-tl-none border border-gray-100'}`}>
                      <p className="text-sm font-medium text-left leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 mt-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tighter ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
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

      {/* Footer / Input */}
      <div className="bg-white shrink-0 border-t border-gray-100">
        <div ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className={`px-6 md:px-8 py-3 bg-gray-50 flex items-center gap-2 overflow-x-auto scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          {['Thanks for interest', 'Available?', 'Best price?', "Get back soon", 'Inspection?', 'More pics?', 'Yes, it is.', 'No, thanks.'].map((reply, idx) => (
            <button key={idx} onClick={() => setMessageInput(reply)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-500 whitespace-nowrap hover:bg-gray-50 transition-all shadow-xs">{reply}</button>
          ))}
        </div>

        <div className="px-6 md:px-8 py-4 md:py-6 safe-bottom">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-0.5">
              <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-gray-50 rounded-xl"><Paperclip size={20} /></button>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-gray-50 rounded-xl"><ImageIcon size={20} /></button>
            </div>
            <div className="flex-1 relative">
              <textarea 
                value={messageInput} 
                onChange={(e) => setMessageInput(e.target.value)} 
                placeholder="Type your message..." 
                rows={1} 
                className="w-full pl-5 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 text-sm font-medium placeholder:text-gray-400 shadow-inner resize-none min-h-[56px] max-h-[120px] flex items-center" 
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-primary transition-colors">
                <Smile size={20} />
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => setIsDealModalOpen(true)}
              className="hidden sm:flex h-[56px] px-6 text-[11px] font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 shrink-0 whitespace-nowrap uppercase tracking-widest items-center justify-center"
            >
              {location.pathname.startsWith('/seller') || location.pathname.startsWith('/freelancer') ? 'Create Offer' : 'Create Deal'}
            </button>

            <button 
              onClick={handleSendMessage} 
              disabled={!messageInput.trim()} 
              className="w-[56px] h-[56px] flex items-center justify-center bg-primary text-white rounded-2xl hover:bg-primary-hover transition-all disabled:opacity-50 disabled:bg-gray-200 shadow-lg shadow-blue-600/30 shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN MESSAGES PAGE COMPONENT ---

const Messages = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [offerAcceptedCallback, setOfferAcceptedCallback] = useState(null);
  const optionsRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => { if (optionsRef.current && !optionsRef.current.contains(event.target)) setShowOptions(false); };
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

  const handleAcceptOffer = () => {
    if (offerAcceptedCallback) {
      offerAcceptedCallback();
    }
    setIsOfferModalOpen(false);
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
    setIsOfferModalOpen,
    setSelectedDeal,
    setOfferAcceptedCallback,
    location
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-180px)] w-full overflow-hidden relative pb-4 text-gray-900">
      <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-sm relative w-full">
        <div 
          className={`
            w-full md:w-80 lg:w-96 border-r border-gray-50 flex flex-col bg-white h-full
            ${showMobileChat ? 'hidden md:flex' : 'flex'}
            ${!selectedChat ? 'md:flex' : ''}
          `}
        >
          <div className="p-4 md:p-6 border-b border-gray-50 shrink-0">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-left">Messages</h1>
            <div className="relative mb-4 md:mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search conversations..." className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium" />
            </div>
            <div className='flex gap-1 bg-gray-100/80 p-1.5 rounded-2xl'>
              <button className='bg-white text-gray-900 font-bold text-[10px] uppercase tracking-widest py-2 rounded-xl w-full shadow-sm'>All</button>
              <button className='text-gray-500 font-bold text-[10px] uppercase tracking-widest py-2 rounded-xl w-full hover:bg-gray-50 transition-colors'>Unread</button>
              <button className='text-gray-500 font-bold text-[10px] uppercase tracking-widest py-2 rounded-xl w-full hover:bg-gray-50 transition-colors'>Newest</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 md:pb-0">
            {conversations.map((chat, idx) => (
              <button key={idx} onClick={() => handleSelectChat(chat)} className={`w-full px-4 md:px-6 py-4 md:py-5 flex items-start space-x-3 md:space-x-4 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-b-0 relative group ${selectedChat?.id === chat.id ? 'bg-primary/5' : ''}`}>
                {selectedChat?.id === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}
                <div className="relative shrink-0">
                  <AvatarWithFallback src={chat.avatar} name={chat.name} size="w-10 h-10 md:w-12 md:h-12" />
                  {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold text-gray-900 text-sm md:text-[15px] truncate">{chat.name}</h3>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tight">{chat.location}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs truncate flex-1 ${chat.unread > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                    {chat.unread > 0 ? <span className="bg-primary text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full ml-2 shadow-lg shadow-blue-600/20">{chat.unread}</span> : chat.read ? <CheckCheck size={14} className="text-blue-500/60 ml-2" /> : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {selectedChat ? (showMobileChat && window.innerWidth < 768 ? createPortal(<ChatContent {...chatContentProps} />, document.body) : <ChatContent {...chatContentProps} />) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-[#F8F9FB] text-center p-8">
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mb-6 shadow-xl shadow-gray-200/50"><MessageSquare size={32} className="text-primary/40" /></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Conversations</h3>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-medium">Choose a message from the list on the left to start a conversation.</p>
          </div>
        )}
      </div>
      <CreateSecureDealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} recipientName={selectedChat?.name} />
      <OfferBreakdownModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} deal={selectedDeal} onAccept={handleAcceptOffer} />
    </div>
  );
};

export default Messages;