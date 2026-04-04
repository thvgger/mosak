import { EllipsisVertical, Reply } from 'lucide-react';
import React, { useRef, useEffect, useS } from 'react';


const MessageList = ({ onUserSelect }) => {
  return (
    <div className="p-4 space-y-4 md:space-y-6 pb-20">
      <Message
        name="Chioma Adeleke"
        badge="Gold"
        role="Seller"
        message="Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉"
        onUserSelect={onUserSelect}
      />

      <Message
        name="Tunde Bakere"
        badge="Silver"
        role="Buyer"
        message="Congratulations Chioma! I'll check it out. Has anyone tried the new search filters?"
        onUserSelect={onUserSelect}
      />

      <Message
        name="Ngozi Okonkwo"
        badge="Platinum"
        role="Freelancer"
        message="Yes! The filters are super helpful. Makes discovery much easier."
        onUserSelect={onUserSelect}
      />

      <Message
        name="Aminu Suleiman"
        badge="Gold"
        role="Freelancer"
        message="This is another message to show scrolling behavior."
        onUserSelect={onUserSelect}
      />
      
      {/* Add more messages to demonstrate scrolling */}
      <Message
        name="John Doe"
        badge="Silver"
        role="Buyer"
        message="This is another message to show scrolling behavior."
        onUserSelect={onUserSelect}
      />
    </div>
  );
};

export default MessageList;

/* Message Component */
const Message = ({ name, badge, role, message, onUserSelect }) => {
  // Create user object based on the name
  const getUserData = () => {
    const userMap = {
      'Chioma Adeleke': {
        id: 1,
        name: 'Chioma Adeleke',
        role: 'Gold Seller',
        avatar: 'CA',
        badges: ['Top Seller', 'Verified'],
        rating: 4.9,
        sales: 234,
        joined: '2023',
        location: 'Lagos, NG',
        bio: 'Digital marketer specializing in social media growth. 5+ years experience.'
      },
      'Tunde Bakere': {
        id: 2,
        name: 'Tunde Bakere',
        role: 'Silver Buyer',
        avatar: 'TB',
        badges: ['Frequent Buyer', 'Verified'],
        rating: 4.7,
        purchases: 89,
        joined: '2024',
        location: 'Abuja, NG',
        bio: 'Tech enthusiast and early adopter. Love discovering new products.'
      },
      'Ngozi Okonkwo': {
        id: 3,
        name: 'Ngozi Okonkwo',
        role: 'Platinum Freelancer',
        avatar: 'NO',
        badges: ['Top Rated', 'Verified', 'Expert'],
        rating: 4.9,
        projects: 156,
        joined: '2022',
        location: 'Port Harcourt, NG',
        bio: 'UI/UX Designer with 7 years experience. Google certified.'
      },
      'Aminu Suleiman': {
        id: 4,
        name: 'Aminu Suleiman',
        role: 'Gold Freelancer',
        avatar: 'AS',
        badges: ['Web Developer', 'Verified'],
        rating: 4.8,
        projects: 92,
        joined: '2023',
        location: 'Kano, NG',
        bio: 'Full-stack developer specializing in React and Node.js'
      },
      'John Doe': {
        id: 5,
        name: 'John Doe',
        role: 'Silver Buyer',
        avatar: 'JD',
        badges: ['New Member'],
        rating: 4.5,
        purchases: 12,
        joined: '2024',
        location: 'Lagos, NG',
        bio: 'New to the community, excited to connect!'
      }
    };
    
    return userMap[name] || {
      id: Date.now(),
      name: name,
      role: role || 'Member',
      avatar: name.split(' ').map(n => n[0]).join(''),
      badges: [badge].filter(Boolean),
      rating: 4.5,
      joined: '2024',
      location: 'Nigeria',
      bio: 'Community member'
    };
  };

  const handleClick = () => {
    if (onUserSelect) {
      onUserSelect(getUserData());
    }
  };


  const [ menuPopupVisible, setMenuPopupVisible ] = React.useState(false);

  const menuPopupOpen = () => {
    setMenuPopupVisible(!menuPopupVisible);
  };

  const outsideMenuRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (outsideMenuRef.current && !outsideMenuRef.current.contains(event.target)) {
        setMenuPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [outsideMenuRef]);

  return (
    <div className="flex gap-3 relative" ref={outsideMenuRef}>
      {/* Profile Picture or Initials */}
      <div 
        onClick={handleClick}
        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm md:text-base shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        {name[0]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1 md:gap-2">
          <span 
            onClick={handleClick}
            className="font-semibold text-sm md:text-base cursor-pointer hover:underline"
          >
            {name}
          </span>
          <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded whitespace-nowrap">
            {badge}
          </span>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
            {role}
          </span>
          <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">10:24 AM</span>
        </div>

        <p className="text-gray-700 mt-1.5 text-xs md:text-sm wrap-break-words">{message}</p>

        <div className="flex items-center gap-2 mt-2 text-sm">
          <button title='like' className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm hover:bg-gray-200 transition-colors">👍 5</button>
          <button title='fire' className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm hover:bg-gray-200 transition-colors">🔥 3</button>
          <button title='reply' className='btn gap-1 text-xs text-dark bg-gray-200 rounded-sm px-2 py-1.5 h-fit'> 
            <Reply size={14} />
            reply
          </button>
        </div>

      </div>
        <EllipsisVertical size={18} strokeWidth={1.5} onClick={() => { menuPopupOpen(); }} className="ml-auto rounded-sm cursor-pointer hover:opacity-80 hover:bg-gray-200 transition-all" /> 
        {menuPopupVisible && (
          <div className="absolute bg-white border rounded shadow-md p-2 text-xs text-gray-400 right-4 top-10 z-10" ref={outsideMenuRef}>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Edit</button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Delete</button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Report</button>
            <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Block</button>
            {/* <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Copy Message Link</button> */}
          </div>
        )}
    </div>
  );
};

// import { EllipsisVertical, Reply, X } from 'lucide-react';
// import React, { useRef, useEffect, useState } from 'react';

// const MessageList = ({ onUserSelect, messages = [], onReply, onReaction }) => {
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when new messages arrive
//   // useEffect(() => {
//   //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   // }, [messages]);

//   return (
//     <div className="p-4 space-y-4 md:space-y-6 pb-20">
//       {messages.map((message) => (
//         <Message
//           key={message.id}
//           message={message}
//           onUserSelect={onUserSelect}
//           onReply={() => onReply(message)}
//           onReaction={(reaction) => onReaction(message.id, reaction)}
//         />
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default MessageList;

// /* Message Component */
// const Message = ({ message, onUserSelect, onReply, onReaction }) => {
//   const [menuPopupVisible, setMenuPopupVisible] = useState(false);
//   const [showReactionPicker, setShowReactionPicker] = useState(false);
//   const outsideMenuRef = useRef();

//   const {
//     id,
//     name,
//     badge,
//     role,
//     content,
//     timestamp,
//     parentMessage,
//     reactions = []
//   } = message;

//   // Format timestamp
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//   };

//   // Get reaction counts
//   const getReactionCount = (type) => {
//     return reactions.filter(r => r.type === type).length;
//   };

//   // Handle reaction click
//   const handleReaction = (type) => {
//     onReaction(type);
//     setShowReactionPicker(false);
//   };

//   // Common reactions
//   const commonReactions = ['👍', '🔥', '❤️', '😂', '😮', '😢', '👎'];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (outsideMenuRef.current && !outsideMenuRef.current.contains(event.target)) {
//         setMenuPopupVisible(false);
//         setShowReactionPicker(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const getUserData = () => {
//     // This will be replaced with actual user data from backend
//     return {
//       id: id || Date.now(),
//       name: name,
//       role: role || 'Member',
//       avatar: name?.[0] || 'U',
//       badges: [badge].filter(Boolean),
//       rating: 4.5,
//       joined: '2024',
//       location: 'Nigeria',
//       bio: 'Community member'
//     };
//   };

//   const handleClick = () => {
//     if (onUserSelect) {
//       onUserSelect(getUserData());
//     }
//   };

//   return (
//     <div className="flex gap-3 relative group" ref={outsideMenuRef}>
//       {/* Profile Picture */}
//       <div 
//         onClick={handleClick}
//         className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm md:text-base shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
//       >
//         {name?.[0] || 'U'}
//       </div>

//       <div className="flex-1 min-w-0">
//         {/* Header */}
//         <div className="flex flex-wrap items-center gap-1 md:gap-2">
//           <span 
//             onClick={handleClick}
//             className="font-semibold text-sm md:text-base cursor-pointer hover:underline"
//           >
//             {name || 'Unknown User'}
//           </span>
//           {badge && (
//             <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded whitespace-nowrap">
//               {badge}
//             </span>
//           )}
//           {role && (
//             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
//               {role}
//             </span>
//           )}
//           <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
//             {formatTime(timestamp)}
//           </span>
//         </div>

//         {/* Replying to indicator - Show if this is a reply */}
//         {parentMessage && (
//           <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 border-l-2 border-primary/30 pl-2">
//             <Reply size={12} className="rotate-180" />
//             <span>Replying to {parentMessage.name}</span>
//           </div>
//         )}

//         {/* Quoted message - Show if this message has a parent */}
//         {parentMessage && (
//           <div className="mt-1 mb-2 p-2 bg-gray-50 rounded border-l-4 border-primary/60 text-sm">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="font-medium text-xs">{parentMessage.name}</span>
//               <span className="text-xs text-gray-500">{formatTime(parentMessage.timestamp)}</span>
//             </div>
//             <p className="text-gray-600 text-xs line-clamp-2">{parentMessage.content}</p>
//           </div>
//         )}

//         {/* Message content */}
//         <p className="text-gray-700 mt-1.5 text-xs md:text-sm wrap-break-words whitespace-pre-wrap">
//           {content}
//         </p>

//         {/* Reactions and actions */}
//         <div className="flex items-center gap-2 mt-2">
//           {/* Reaction buttons */}
//           <div className="flex items-center gap-1">
//             {commonReactions.slice(0, 3).map(reaction => (
//               <button
//                 key={reaction}
//                 onClick={() => handleReaction(reaction)}
//                 className={`px-2 py-1 rounded text-xs hover:bg-gray-200 transition-colors flex items-center gap-1 ${
//                   reactions.some(r => r.type === reaction) ? 'bg-primary/10' : 'bg-gray-100'
//                 }`}
//               >
//                 <span>{reaction}</span>
//                 {getReactionCount(reaction) > 0 && (
//                   <span className="text-xs">{getReactionCount(reaction)}</span>
//                 )}
//               </button>
//             ))}
            
//             {/* More reactions button */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowReactionPicker(!showReactionPicker)}
//                 className="px-2 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors"
//               >
//                 +
//               </button>
              
//               {/* Reaction picker popup */}
//               {showReactionPicker && (
//                 <div className="absolute bottom-full left-0 mb-2 bg-white border rounded-lg shadow-lg p-2 flex gap-1 z-20">
//                   {commonReactions.map(reaction => (
//                     <button
//                       key={reaction}
//                       onClick={() => handleReaction(reaction)}
//                       className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center text-lg transition-colors"
//                     >
//                       {reaction}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Reply button */}
//           <button 
//             onClick={onReply}
//             className="btn gap-1 text-xs text-dark bg-gray-200 rounded-sm px-2 py-1.5 h-fit hover:bg-gray-300 transition-colors"
//           >
//             <Reply size={14} />
//             Reply
//           </button>
//         </div>
//       </div>

//       {/* Menu button */}
//       <EllipsisVertical 
//         size={18} 
//         strokeWidth={1.5} 
//         onClick={() => setMenuPopupVisible(!menuPopupVisible)} 
//         // className="ml-auto rounded-sm cursor-pointer hover:opacity-80 hover:bg-gray-200 transition-all opacity-100" 
//       /> 
      
//       {/* Menu popup */}
//       {menuPopupVisible && (
//         <div className="absolute bg-white border rounded shadow-md p-1 text-xs right-4 top-10 z-10 min-w-30">
//           <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Edit</button>
//           <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Delete</button>
//           <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Report</button>
//           <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Block</button>
//         </div>
//       )}
//     </div>
//   );
// };






// // components/community/MessageList.jsx (updated with real user data integration)
// import React, { useRef, useEffect, useState } from 'react';
// import { EllipsisVertical, Reply, ThumbsUp, Heart, Smile, X } from 'lucide-react';
// import { useCommunityUser } from '../../hooks/useCommunityUser';

// const MessageList = ({ messages = [], onUserSelect, onReply, onReaction, currentUser }) => {
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="p-4 space-y-4 md:space-y-6 pb-20">
//       {messages.map((message) => (
//         <Message
//           key={message.id}
//           message={message}
//           currentUser={currentUser}
//           onUserSelect={onUserSelect}
//           onReply={() => onReply(message)}
//           onReaction={(reaction) => onReaction(message.id, reaction)}
//         />
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default MessageList;

// /* Message Component */
// const Message = ({ message, currentUser, onUserSelect, onReply, onReaction }) => {
//   const [menuPopupVisible, setMenuPopupVisible] = useState(false);
//   const [showReactionPicker, setShowReactionPicker] = useState(false);
//   const outsideMenuRef = useRef();

//   const {
//     id,
//     user,
//     content,
//     timestamp,
//     parentMessage,
//     reactions = []
//   } = message;

//   // Format timestamp
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diff = now - date;
    
//     // If less than 24 hours, show time
//     if (diff < 24 * 60 * 60 * 1000) {
//       return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//     }
//     // If within a week, show day and time
//     if (diff < 7 * 24 * 60 * 60 * 1000) {
//       return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
//     }
//     // Otherwise show full date
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   // Get reaction counts
//   const getReactionCount = (type) => {
//     return reactions.filter(r => r.type === type).length;
//   };

//   // Check if current user reacted
//   const hasUserReacted = (type) => {
//     return reactions.some(r => r.type === type && r.userId === currentUser?.id);
//   };

//   // Handle reaction click
//   const handleReaction = (type) => {
//     onReaction(type);
//     setShowReactionPicker(false);
//   };

//   // Common reactions
//   const commonReactions = ['👍', '❤️', '😂', '😮', '😢', '👎'];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (outsideMenuRef.current && !outsideMenuRef.current.contains(event.target)) {
//         setMenuPopupVisible(false);
//         setShowReactionPicker(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleUserClick = () => {
//     if (onUserSelect && user) {
//       onUserSelect(user);
//     }
//   };

//   const isOwnMessage = currentUser?.id === user?.id;

//   return (
//     <div className={`flex gap-3 group ${isOwnMessage ? 'flex-row-reverse' : ''}`} ref={outsideMenuRef}>
//       {/* Profile Picture */}
//       <div 
//         onClick={handleUserClick}
//         className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-semibold text-sm md:text-base shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
//       >
//         {user?.avatar || user?.name?.charAt(0) || 'U'}
//       </div>

//       <div className={`flex-1 min-w-0 ${isOwnMessage ? 'items-end' : ''}`}>
//         {/* Header */}
//         <div className={`flex flex-wrap items-center gap-1 md:gap-2 ${isOwnMessage ? 'justify-end' : ''}`}>
//           <span 
//             onClick={handleUserClick}
//             className="font-semibold text-sm md:text-base cursor-pointer hover:underline"
//           >
//             {user?.name || 'Unknown User'}
//           </span>
//           {user?.username && (
//             <span className="text-xs text-gray-400">@{user.username}</span>
//           )}
//           {user?.badge && (
//             <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded whitespace-nowrap">
//               {user.badge}
//             </span>
//           )}
//           {user?.role && (
//             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
//               {user.role}
//             </span>
//           )}
//           <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
//             {formatTime(timestamp)}
//           </span>
//         </div>

//         {/* Replying to indicator */}
//         {parentMessage && (
//           <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 border-l-2 border-primary/30 pl-2 ${isOwnMessage ? 'ml-auto' : ''}`}>
//             <Reply size={12} className="rotate-180" />
//             <span>Replying to {parentMessage.user?.name}</span>
//           </div>
//         )}

//         {/* Quoted message */}
//         {parentMessage && (
//           <div className={`mt-1 mb-2 p-2 bg-gray-50 rounded border-l-4 border-primary/60 text-sm ${isOwnMessage ? 'text-right' : ''}`}>
//             <div className="flex items-center gap-2 mb-1">
//               <span className="font-medium text-xs">{parentMessage.user?.name}</span>
//               <span className="text-xs text-gray-500">{formatTime(parentMessage.timestamp)}</span>
//             </div>
//             <p className="text-gray-600 text-xs line-clamp-2">{parentMessage.content}</p>
//           </div>
//         )}

//         {/* Message content */}
//         <p className={`text-gray-700 mt-1.5 text-sm md:text-base whitespace-pre-wrap break-words ${isOwnMessage ? 'text-right' : ''}`}>
//           {content}
//         </p>

//         {/* Reactions and actions */}
//         <div className={`flex items-center gap-2 mt-2 ${isOwnMessage ? 'justify-end' : ''}`}>
//           {/* Reaction buttons */}
//           <div className="flex items-center gap-1">
//             {commonReactions.slice(0, 3).map(reaction => {
//               const count = getReactionCount(reaction);
//               const userReacted = hasUserReacted(reaction);
//               return (
//                 <button
//                   key={reaction}
//                   onClick={() => handleReaction(reaction)}
//                   className={`px-2 py-1 rounded text-xs hover:bg-gray-200 transition-colors flex items-center gap-1 ${
//                     userReacted ? 'bg-primary/10' : 'bg-gray-100'
//                   }`}
//                 >
//                   <span>{reaction}</span>
//                   {count > 0 && (
//                     <span className="text-xs">{count}</span>
//                   )}
//                 </button>
//               );
//             })}
            
//             {/* More reactions button */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowReactionPicker(!showReactionPicker)}
//                 className="px-2 py-1 bg-gray-100 rounded text-xs hover:bg-gray-200 transition-colors"
//               >
//                 +
//               </button>
              
//               {showReactionPicker && (
//                 <div className={`absolute ${isOwnMessage ? 'right-0' : 'left-0'} bottom-full mb-2 bg-white border rounded-lg shadow-lg p-2 flex gap-1 z-20`}>
//                   {commonReactions.map(reaction => (
//                     <button
//                       key={reaction}
//                       onClick={() => handleReaction(reaction)}
//                       className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center text-lg transition-colors"
//                     >
//                       {reaction}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Reply button */}
//           <button 
//             onClick={onReply}
//             className="btn gap-1 text-xs text-dark bg-gray-200 rounded-sm px-2 py-1.5 h-fit hover:bg-gray-300 transition-colors"
//           >
//             <Reply size={14} />
//             Reply
//           </button>
//         </div>
//       </div>

//       {/* Menu button - only for own messages or admin */}
//       {isOwnMessage && (
//         <EllipsisVertical 
//           size={18} 
//           strokeWidth={1.5} 
//           onClick={() => setMenuPopupVisible(!menuPopupVisible)} 
//           className="rounded-sm cursor-pointer hover:opacity-80 hover:bg-gray-200 transition-all opacity-100" 
//         /> 
//       )}
      
//       {/* Menu popup */}
//       {menuPopupVisible && (
//         <div className="absolute bg-white border rounded shadow-md p-1 text-xs right-4 top-10 z-10 min-w-30">
//           <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Edit</button>
//           <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600">Delete</button>
//         </div>
//       )}
//     </div>
//   );
// };