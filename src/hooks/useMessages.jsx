// // hooks/useMessages.js
// import { useState, useCallback } from 'react';

// export const useMessages = (initialMessages = []) => {
//   const [messages, setMessages] = useState(initialMessages);
//   const [replyingTo, setReplyingTo] = useState(null);

//   const addMessage = useCallback((newMessage) => {
//     setMessages(prev => [...prev, {
//       id: Date.now(), // This will be replaced by backend ID
//       ...newMessage,
//       timestamp: new Date().toISOString(),
//       reactions: []
//     }]);
//   }, []);

//   const addReply = useCallback((replyMessage, parentMessageId) => {
//     setMessages(prev => [...prev, {
//       id: Date.now(), // This will be replaced by backend ID
//       ...replyMessage,
//       parentId: parentMessageId,
//       timestamp: new Date().toISOString(),
//       reactions: []
//     }]);
//     setReplyingTo(null); // Clear reply state after sending
//   }, []);

//   const addReaction = useCallback((messageId, reaction, userId) => {
//     setMessages(prev => prev.map(msg => {
//       if (msg.id === messageId) {
//         const existingReaction = msg.reactions?.find(r => r.type === reaction && r.userId === userId);
        
//         if (existingReaction) {
//           // Remove reaction if already exists (toggle off)
//           return {
//             ...msg,
//             reactions: msg.reactions?.filter(r => !(r.type === reaction && r.userId === userId))
//           };
//         } else {
//           // Add new reaction
//           return {
//             ...msg,
//             reactions: [...(msg.reactions || []), { type: reaction, userId, timestamp: new Date().toISOString() }]
//           };
//         }
//       }
//       return msg;
//     }));
//   }, []);

//   const getMessageReactionCount = useCallback((messageId, reactionType) => {
//     const message = messages.find(m => m.id === messageId);
//     return message?.reactions?.filter(r => r.type === reactionType).length || 0;
//   }, [messages]);

//   return {
//     messages,
//     replyingTo,
//     setReplyingTo,
//     addMessage,
//     addReply,
//     addReaction,
//     getMessageReactionCount
//   };
// };




// hooks/useMessages.js
import { useState, useEffect, useCallback, useRef } from 'react';
import websocketService from '../services/websocket';
import { useAuth } from '../contexts/AuthContext';

export const useMessages = (channelId, initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [replyingTo, setReplyingTo] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const { user } = useAuth();
  
  const typingTimeoutRef = useRef(null);

  // Connect to WebSocket when channel changes
  useEffect(() => {
    if (!channelId) return;

    // Connect to WebSocket
    websocketService.connect(channelId);
    
    // Set up event listeners
    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };
    
    const handleMessageDeleted = ({ messageId }) => {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    };
    
    const handleMessageEdited = ({ messageId, newContent }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content: newContent, edited: true } : msg
      ));
    };
    
    const handleReactionAdded = ({ messageId, reaction }) => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.type === reaction.type && r.userId === reaction.userId);
          if (!existingReaction) {
            return { ...msg, reactions: [...msg.reactions, reaction] };
          }
        }
        return msg;
      }));
    };
    
    const handleReactionRemoved = ({ messageId, reactionType, userId }) => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            reactions: msg.reactions.filter(r => !(r.type === reactionType && r.userId === userId))
          };
        }
        return msg;
      }));
    };
    
    const handleTyping = ({ userId: typingUserId, username }) => {
      if (typingUserId !== user?.id) {
        setTypingUsers(prev => {
          if (!prev.some(u => u.id === typingUserId)) {
            return [...prev, { id: typingUserId, username }];
          }
          return prev;
        });
        
        // Remove typing indicator after 3 seconds
        setTimeout(() => {
          setTypingUsers(prev => prev.filter(u => u.id !== typingUserId));
        }, 3000);
      }
    };
    
    const handleUserJoined = ({ userId, username }) => {
      console.log(`${username} joined the channel`);
    };
    
    const handleUserLeft = ({ userId, username }) => {
      console.log(`${username} left the channel`);
    };
    
    const handleOnlineCount = ({ count }) => {
      setOnlineCount(count);
    };
    
    const handleConnected = () => {
      setIsConnected(true);
      // Load initial messages from server
      loadInitialMessages();
    };
    
    const handleReconnectFailed = () => {
      setIsConnected(false);
    };

    websocketService.on('connected', handleConnected);
    websocketService.on('new_message', handleNewMessage);
    websocketService.on('message_deleted', handleMessageDeleted);
    websocketService.on('message_edited', handleMessageEdited);
    websocketService.on('reaction_added', handleReactionAdded);
    websocketService.on('reaction_removed', handleReactionRemoved);
    websocketService.on('typing', handleTyping);
    websocketService.on('user_joined', handleUserJoined);
    websocketService.on('user_left', handleUserLeft);
    websocketService.on('online_count', handleOnlineCount);
    websocketService.on('reconnect_failed', handleReconnectFailed);

    return () => {
      websocketService.disconnect();
      websocketService.off('connected', handleConnected);
      websocketService.off('new_message', handleNewMessage);
      websocketService.off('message_deleted', handleMessageDeleted);
      websocketService.off('message_edited', handleMessageEdited);
      websocketService.off('reaction_added', handleReactionAdded);
      websocketService.off('reaction_removed', handleReactionRemoved);
      websocketService.off('typing', handleTyping);
      websocketService.off('user_joined', handleUserJoined);
      websocketService.off('user_left', handleUserLeft);
      websocketService.off('online_count', handleOnlineCount);
      websocketService.off('reconnect_failed', handleReconnectFailed);
    };
  }, [channelId, user]);

  // Load initial messages from REST API
  const loadInitialMessages = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/community/channels/${channelId}/messages`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [channelId]);

  // Send a new message
  const sendMessage = useCallback((content, parentId = null) => {
    if (!content.trim()) return;
    
    const messageData = {
      content: content.trim(),
      parentId,
      channelId,
      userId: user?.id,
      username: user?.username,
      name: user?.full_name
    };
    
    websocketService.send('send_message', messageData);
    
    // Clear typing indicator after sending
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      websocketService.send('stop_typing', { channelId });
    }
  }, [channelId, user]);

  // Send typing indicator
  const sendTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    websocketService.send('typing', { channelId });
    
    typingTimeoutRef.current = setTimeout(() => {
      websocketService.send('stop_typing', { channelId });
    }, 3000);
  }, [channelId]);

  // Add reaction to message
  const addReaction = useCallback((messageId, reactionType) => {
    websocketService.send('add_reaction', {
      messageId,
      reactionType,
      userId: user?.id
    });
  }, [user]);

  // Remove reaction from message
  const removeReaction = useCallback((messageId, reactionType) => {
    websocketService.send('remove_reaction', {
      messageId,
      reactionType,
      userId: user?.id
    });
  }, [user]);

  // Delete message
  const deleteMessage = useCallback((messageId) => {
    websocketService.send('delete_message', { messageId });
  }, []);

  // Edit message
  const editMessage = useCallback((messageId, newContent) => {
    websocketService.send('edit_message', { messageId, newContent });
  }, []);

  return {
    messages,
    replyingTo,
    setReplyingTo,
    sendMessage,
    sendTyping,
    addReaction,
    removeReaction,
    deleteMessage,
    editMessage,
    onlineCount,
    isConnected,
    typingUsers
  };
};