import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  Clock,
  ShoppingBag,
  Wallet,
  MessageSquare,
  AlertTriangle,
  Shield,
  Star,
  Truck,
  X,
  Filter,
  CheckCircle,
  Package,
  CreditCard
} from 'lucide-react';

const Notifications = () => {
  const { user } = useOutletContext();
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'orders', 'payments', 'messages'
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-2847 has been delivered successfully',
      time: '2 hours ago',
      read: false,
      icon: Package,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      action: 'Confirm Delivery'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Funds Released',
      message: 'Payment for order #ORD-2756 released to seller',
      time: '5 hours ago',
      read: false,
      icon: Wallet,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      action: 'View Transaction'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message from Seller',
      message: "Fatima's Crafts sent you a message about your order",
      time: '1 day ago',
      read: true,
      icon: MessageSquare,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      action: 'Read Message'
    },
    {
      id: 4,
      type: 'dispute',
      title: 'Dispute Update',
      message: 'Your dispute for order #ORD-2689 is being reviewed',
      time: '2 days ago',
      read: true,
      icon: AlertTriangle,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      action: 'View Dispute'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Confirmation',
      message: 'Confirm delivery if not it will be sent to seller',
      time: '2 hrs ago',
      read: false,
      icon: Package,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      action: 'Confirm Delivery',
      urgent: true
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #ORD-2903 has been confirmed by the seller',
      time: '3 days ago',
      read: true,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      action: 'View Order'
    },
    {
      id: 7,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 20% off on your next purchase with code: WELCOME20',
      time: '4 days ago',
      read: true,
      icon: Star,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      action: 'Shop Now'
    },
    {
      id: 8,
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from Lagos, Nigeria',
      time: '5 days ago',
      read: true,
      icon: Shield,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      action: 'Review Activity'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.read);
    if (filter === 'orders') return notifications.filter(n => n.type === 'order');
    if (filter === 'payments') return notifications.filter(n => n.type === 'payment' || n.type === 'wallet');
    if (filter === 'messages') return notifications.filter(n => n.type === 'message');
    return notifications;
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with your orders, payments, and community activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm"
            >
              <CheckCheck size={18} />
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{notifications.length}</p>
            </div>
            <Bell className="text-primary" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unread</p>
              <p className="text-xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <span className="text-blue-600 text-sm font-bold">{unreadCount}</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-xl font-bold text-green-600">
                {notifications.filter(n => n.type === 'order').length}
              </p>
            </div>
            <ShoppingBag className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Messages</p>
              <p className="text-xl font-bold text-purple-600">
                {notifications.filter(n => n.type === 'message').length}
              </p>
            </div>
            <MessageSquare className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'unread' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
              filter === 'unread' ? 'bg-white text-primary' : 'bg-primary text-white'
            }`}>
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setFilter('orders')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'orders' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setFilter('payments')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'payments' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setFilter('messages')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'messages' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Messages
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div 
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition cursor-pointer relative ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full ${notification.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon size={24} className={notification.iconColor} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                            {notification.urgent && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                                URGENT
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={12} />
                              {notification.time}
                            </span>
                            {notification.action && (
                              <button className="text-xs text-primary hover:text-primary/80 font-medium">
                                {notification.action} →
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Delete button */}
                        <button
                          onClick={(e) => deleteNotification(notification.id, e)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? "You're all caught up! Check back later for updates."
                : `No ${filter} notifications found.`}
            </p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-gray-400">
        <p>Notifications are kept for 30 days. Older notifications are automatically deleted.</p>
      </div>
    </div>
  );
};

export default Notifications;