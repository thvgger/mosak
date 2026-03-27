// services/websocket.js
class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
  }

  connect(channelId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.disconnect();
    }

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    this.socket = new WebSocket(`${wsUrl}/ws/community/${channelId}`);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected', { channelId });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect(channelId);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };
  }

  attemptReconnect(channelId) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
        this.reconnectAttempts++;
        this.connect(channelId);
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('reconnect_failed', null);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  handleMessage(data) {
    const { type, payload } = data;
    
    switch (type) {
      case 'new_message':
        this.emit('new_message', payload);
        break;
      case 'message_deleted':
        this.emit('message_deleted', payload);
        break;
      case 'message_edited':
        this.emit('message_edited', payload);
        break;
      case 'reaction_added':
        this.emit('reaction_added', payload);
        break;
      case 'reaction_removed':
        this.emit('reaction_removed', payload);
        break;
      case 'typing':
        this.emit('typing', payload);
        break;
      case 'user_joined':
        this.emit('user_joined', payload);
        break;
      case 'user_left':
        this.emit('user_left', payload);
        break;
      case 'online_count':
        this.emit('online_count', payload);
        break;
      default:
        console.log('Unknown message type:', type);
    }
  }

  send(type, payload) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.error('WebSocket not connected');
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (!this.listeners.has(event)) return;
    const callbacks = this.listeners.get(event);
    const index = callbacks.indexOf(callback);
    if (index !== -1) callbacks.splice(index, 1);
  }

  emit(event, data) {
    if (!this.listeners.has(event)) return;
    this.listeners.get(event).forEach(callback => callback(data));
  }
}

export default new WebSocketService();