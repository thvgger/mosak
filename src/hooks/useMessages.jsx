// hooks/useMessages.js
import { useState, useCallback } from 'react';

export const useMessages = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [replyingTo, setReplyingTo] = useState(null);

  const addMessage = useCallback((newMessage) => {
    setMessages(prev => [...prev, {
      id: Date.now(), // This will be replaced by backend ID
      ...newMessage,
      timestamp: new Date().toISOString(),
      reactions: []
    }]);
  }, []);

  const addReply = useCallback((replyMessage, parentMessageId) => {
    setMessages(prev => [...prev, {
      id: Date.now(), // This will be replaced by backend ID
      ...replyMessage,
      parentId: parentMessageId,
      timestamp: new Date().toISOString(),
      reactions: []
    }]);
    setReplyingTo(null); // Clear reply state after sending
  }, []);

  const addReaction = useCallback((messageId, reaction, userId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.type === reaction && r.userId === userId);
        
        if (existingReaction) {
          // Remove reaction if already exists (toggle off)
          return {
            ...msg,
            reactions: msg.reactions?.filter(r => !(r.type === reaction && r.userId === userId))
          };
        } else {
          // Add new reaction
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { type: reaction, userId, timestamp: new Date().toISOString() }]
          };
        }
      }
      return msg;
    }));
  }, []);

  const getMessageReactionCount = useCallback((messageId, reactionType) => {
    const message = messages.find(m => m.id === messageId);
    return message?.reactions?.filter(r => r.type === reactionType).length || 0;
  }, [messages]);

  return {
    messages,
    replyingTo,
    setReplyingTo,
    addMessage,
    addReply,
    addReaction,
    getMessageReactionCount
  };
};