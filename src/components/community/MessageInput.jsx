// import { CalendarRange, Link, Paperclip, Send, X, Reply } from "lucide-react";
// import React, { useState, useRef, useEffect } from "react";

// const MessageInput = ({ channelId, onSendMessage, replyingTo, onCancelReply }) => {
//   const [message, setMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const inputRef = useRef(null);

//   // Focus input when replying to a message
//   useEffect(() => {
//     if (replyingTo) {
//       inputRef.current?.focus();
//     }
//   }, [replyingTo]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!message.trim()) return;

//     const messageData = {
//       content: message.trim(),
//       channelId,
//       ...(replyingTo && { parentId: replyingTo.id })
//     };

//     onSendMessage(messageData);
//     setMessage('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="w-full bg-white p-3 md:p-4 border-t border-gray-300 fixed md:static bottom-0 left-0 right-0">
//       <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
//         {/* Reply preview */}
//         {replyingTo && (
//           <div className="mb-2 p-2 bg-gray-50 rounded-lg border-l-4 border-primary flex items-center justify-between">
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               <Reply size={14} className="text-gray-500 rotate-180" />
//               <div className="flex-1 min-w-0">
//                 <span className="text-xs font-medium text-gray-700">
//                   Replying to {replyingTo.name}
//                 </span>
//                 <p className="text-xs text-gray-500 truncate">
//                   {replyingTo.content}
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={onCancelReply}
//               className="p-1 hover:bg-gray-200 rounded-full transition-colors"
//             >
//               <X size={14} className="text-gray-500" />
//             </button>
//           </div>
//         )}

//         {/* Input area */}
//         <div className="flex items-center gap-2 md:gap-4">
//           {/* <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors"> 
//             <Link size={16} className="text-gray-400" /> 
//           </button> */}
          
//           <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <Paperclip size={16} className="text-gray-400" />
//           </button>
          
//           {/* <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors"> 
//             <CalendarRange size={18} className="text-gray-400" /> 
//           </button> */}

//           <input
//             ref={inputRef}
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder={replyingTo ? "Write your reply..." : "Type your message..."}
//             className="flex-1 w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 focus:outline-none focus:border-primary text-base"
//           />

//           <button
//             type="submit"
//             disabled={!message.trim()}
//             className={`p-2 md:px-4 md:py-2 rounded-lg transition-colors ${
//               message.trim() 
//                 ? 'bg-primary text-white hover:bg-primary-dark' 
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             <Send size={18} />
//           </button>
//         </div>

//         {/* Typing indicator */}
//         {isTyping && (
//           <div className="mt-1 text-xs text-gray-400">
//             Someone is typing...
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default MessageInput;




// components/community/MessageInput.jsx (updated with typing)
import { Paperclip, Send, Reply, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const MessageInput = ({ channelId, onSendMessage, onTyping, replyingTo, onCancelReply }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (replyingTo) {
      inputRef.current?.focus();
    }
  }, [replyingTo]);

  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true);
      onTyping?.();
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (e.target.value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    } else {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    const messageData = {
      content: message.trim(),
      channelId,
      ...(replyingTo && { parentId: replyingTo.id })
    };

    onSendMessage(messageData);
    setMessage('');
    setIsTyping(false);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-white px-4 py-3 md:py-4 border-t border-gray-100 pb-safe">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Reply preview */}
        {replyingTo && (
          <div className="mb-2 p-2 bg-gray-50 rounded-xl border-l-4 border-primary flex items-center justify-between animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Reply size={14} className="text-primary rotate-180" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-primary uppercase">
                  Replying to {replyingTo.user?.name || replyingTo.name}
                </span>
                <p className="text-xs text-gray-500 truncate italic">
                  "{replyingTo.content}"
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCancelReply}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Input area */}
        <div className="flex items-center gap-2 md:gap-4">
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 shrink-0">
            <Paperclip size={22} strokeWidth={1.5} />
          </button>
          
          <div className="flex-1 relative flex items-center bg-white border border-gray-200 rounded-xl focus-within:border-gray-300 transition-all shadow-sm">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={handleTyping}
              onKeyPress={handleKeyPress}
              placeholder={replyingTo ? "Write your reply..." : "Type your message..."}
              className="w-full bg-transparent border-none rounded-xl px-4 py-2.5 focus:ring-0 text-sm md:text-base placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-3 rounded-xl md:rounded-2xl transition-all shrink-0 flex items-center justify-center ${
              message.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={20} className={message.trim() ? "fill-white" : ""} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;