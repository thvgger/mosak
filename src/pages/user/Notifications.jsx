import React, { useState } from 'react';
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
import { useAuth } from '../../contexts/AuthContext';

const Notifications = () => {
  const { user, loading, isAuthenticated } = useAuth();

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

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-3">
        {["all", "orders", "messages", "payments", "disputes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 items-start hover:shadow-sm transition"
            >
              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${notification.iconBg}`}
              >
                <Icon size={24} className={notification.iconColor} />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {notification.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  {notification.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;