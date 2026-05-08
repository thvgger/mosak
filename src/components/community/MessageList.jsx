import React, { useRef, useEffect, useState } from 'react';
import { EllipsisVertical, Reply, ThumbsUp, Heart, Smile, X, Pencil, Trash2, Flag, Ban } from 'lucide-react';

const MessageList = ({ messages = [], onUserSelect, onReply, onReaction, currentUser }) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-4 space-y-6 md:space-y-8 pb-10">
      {messages.length > 0 ? (
        messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            currentUser={currentUser}
            onUserSelect={onUserSelect}
            onReply={() => onReply(message)}
            onReaction={(reaction) => onReaction(message.id, reaction)}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-sm">No messages yet. Be the first to start the conversation!</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

/* Message Component */
const Message = ({ message, currentUser, onUserSelect, onReply, onReaction }) => {
  const [menuPopupVisible, setMenuPopupVisible] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const outsideMenuRef = useRef();

  const {
    id,
    user,
    content,
    timestamp,
    parentMessage,
    reactions = []
  } = message;

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get reaction counts
  const getReactionCount = (type) => {
    return reactions.filter(r => r.type === type).length;
  };

  // Check if current user reacted
  const hasUserReacted = (type) => {
    return reactions.some(r => r.type === type && r.userId === currentUser?.id);
  };

  // Handle reaction click
  const handleReaction = (type) => {
    onReaction(type);
    setShowReactionPicker(false);
  };

  // Common reactions
  const commonReactions = ['👍', '❤️', '😂', '😮', '😢', '👎'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outsideMenuRef.current && !outsideMenuRef.current.contains(event.target)) {
        setMenuPopupVisible(false);
        setShowReactionPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (onUserSelect && user) {
      onUserSelect(user);
    }
  };

  const isOwnMessage = currentUser?.id === user?.id;

  return (
    <div className={`flex gap-2 md:gap-3 group ${isOwnMessage ? 'flex-row-reverse' : ''}`} ref={outsideMenuRef}>
      {/* Profile Picture */}
      <div 
        onClick={handleUserClick}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs md:text-sm shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        {user?.avatar || user?.name?.charAt(0) || 'U'}
      </div>

      <div className={`flex-1 min-w-0 max-w-[85%] md:max-w-[75%] ${isOwnMessage ? 'items-end flex flex-col' : ''}`}>
        {/* Header */}
        <div className={`flex flex-wrap items-center gap-1 md:gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse justify-start' : ''}`}>
          <span 
            onClick={handleUserClick}
            className="font-semibold text-xs md:text-sm cursor-pointer hover:underline truncate max-w-[120px] md:max-w-none"
          >
            {user?.name || 'Unknown User'}
          </span>
          {user?.badge && (
            <span className="text-[10px] md:text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded whitespace-nowrap">
              {user.badge}
            </span>
          )}
          {user?.role && (
            <span className="text-[10px] md:text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded whitespace-nowrap">
              {user.role}
            </span>
          )}
          <span className={`text-[10px] text-gray-400 whitespace-nowrap ${isOwnMessage ? 'mr-1' : 'ml-1'}`}>
            {formatTime(timestamp)}
          </span>
        </div>

        {/* Replying to indicator */}
        {parentMessage && (
          <div className={`flex items-center gap-1 mt-1 mb-1 text-[10px] text-gray-500 border-l-2 border-primary/30 pl-2 ${isOwnMessage ? 'mr-auto' : ''}`}>
            <Reply size={10} className="rotate-180" />
            <span>Replying to {parentMessage.user?.name || parentMessage.name}</span>
          </div>
        )}

        {/* Quoted message */}
        {parentMessage && (
          <div className={`mt-1 mb-2 p-2 bg-gray-50 rounded border-l-4 border-primary/60 text-xs ${isOwnMessage ? 'text-right' : ''}`}>
            <p className="text-gray-600 line-clamp-2 italic">"{parentMessage.content}"</p>
          </div>
        )}

        {/* Message content */}
        <div className={`
          relative px-3 py-2 rounded-2xl text-sm md:text-base break-words
          ${isOwnMessage 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }
        `}>
          <p className="whitespace-pre-wrap">{content || message.message}</p>
        </div>

        {/* Reactions and actions */}
        <div className={`flex flex-wrap items-center gap-2 mt-1.5 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
          {/* Reaction buttons */}
          <div className="flex items-center gap-1">
            {commonReactions.slice(0, 3).map(reaction => {
              const count = getReactionCount(reaction);
              const userReacted = hasUserReacted(reaction);
              if (count === 0 && !showReactionPicker) return null;
              return (
                <button
                  key={reaction}
                  onClick={() => handleReaction(reaction)}
                  className={`px-1.5 py-0.5 rounded-full text-[10px] md:text-xs hover:bg-gray-200 transition-colors flex items-center gap-1 ${
                    userReacted ? 'bg-primary/10 border border-primary/20' : 'bg-gray-100 border border-transparent'
                  }`}
                >
                  <span>{reaction}</span>
                  {count > 0 && <span>{count}</span>}
                </button>
              );
            })}
            
            {/* More reactions button */}
            <div className="relative">
              <button
                onClick={() => setShowReactionPicker(!showReactionPicker)}
                className="w-6 h-6 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-full text-xs text-gray-400 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
              
              {showReactionPicker && (
                <div className={`absolute ${isOwnMessage ? 'right-0' : 'left-0'} bottom-full mb-2 bg-white border border-gray-100 rounded-full shadow-lg px-2 py-1 flex gap-1 z-20`}>
                  {commonReactions.map(reaction => (
                    <button
                      key={reaction}
                      onClick={() => handleReaction(reaction)}
                      className="w-7 h-7 hover:bg-gray-100 rounded-full flex items-center justify-center text-sm transition-colors"
                    >
                      {reaction}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reply button */}
          <button 
            onClick={onReply}
            className="flex items-center gap-1 text-[10px] md:text-xs text-gray-400 hover:text-primary transition-colors px-1 py-0.5"
          >
            <Reply size={14} className="rotate-180" />
            <span>Reply</span>
          </button>
        </div>
      </div>

      {/* Menu button */}
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isOwnMessage ? 'mr-auto' : 'ml-auto'}`}>
        <button 
          onClick={() => setMenuPopupVisible(!menuPopupVisible)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
        >
          <EllipsisVertical size={16} />
        </button>
        
        {menuPopupVisible && (
          <div className={`absolute ${isOwnMessage ? 'left-4' : 'right-4'} top-8 z-30 min-w-[120px] bg-white border border-gray-100 rounded-xl shadow-xl p-1 animate-popup-in`}>
            <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Pencil size={12} />
              <span>Edit</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 size={12} />
              <span>Delete</span>
            </button>
            <div className="my-1 border-t border-gray-100"></div>
            <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Flag size={12} />
              <span>Report</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};