// pages/Settings/Security.jsx
import React, { useState } from 'react';
import { 
  Lock, 
  Key, 
  Shield, 
  Smartphone, 
  Mail, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ChangePasswordModal from '../../../components/user/ChangePasswordModal';

const Settings = ({ section }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: {
      orders: { value: true, name: "Order Updates", text: "Get notified about order status changes" },
      messages: { value: false, name: "Messages", text: "Receive notifications for new messages" },
      payment: { value: true, name: "Payment alerts", text: "Alerts for payments and refunds" },
      disputes: { value: false, name: "Dispute updates", text: "Updates on active disputes" },
      marketing: { value: false, name: "Marketing emails", text: "Discounts and special offers" }
    },
    push: {
      messages: true,
      payments: true,
      updates: false
    }
  });

  const handleNotificationChange = (type, channel, setting) => {
    setNotifications(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: {
          ...prev[channel][setting],
          value: !prev[channel][setting].value
        }
      }
    }));
  };

  const recentActivities = [
    {
      action: 'Login',
      device: 'Chrome on Windows',
      location: 'Lagos, Nigeria',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'Password Change',
      device: 'Firefox on Mac',
      location: 'Abuja, Nigeria',
      time: '3 days ago',
      status: 'success'
    },
    {
      action: 'Failed Login Attempt',
      device: 'Safari on iPhone',
      location: 'Unknown',
      time: '5 days ago',
      status: 'failed'
    }
  ];

  const renderSecurity = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <h2 className="font-semibold flex items-center gap-2">
            <Lock size={18} />
            Password
          </h2>
        
          <p className="text-sm text-gray-600">
            Last changed 30 days ago.
          </p>
        </div>
          
        <button onClick={() => setShowPasswordModal(true)} className="btn btn-tertiary px-4">
          Change Password
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2"> Notifications </h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="space-y-6">
          {Object.entries(notifications.email).map(([key, item]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <small className="text-gray-500">{item.text}</small>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={item.value}
                  onChange={() => handleNotificationChange('email', 'email', key)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-2xl font-bold text-red-600 mb-2"> Danger Zone </h1>
      <div className='bg-white p-6 rounded-xl border border-gray-200 space-y-4'>
        <p className='text-sm text-gray-600'> Once you delete your account, there is no going back. Please be certain.</p>
        <button className='btn bg-red-500'>
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2"> Payment Preferences </h1>
      <div className='bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <CreditCard size={20} className='text-gray-400' />
          <p className='text-sm text-gray-600 flex flex-col gap-1 items-start'> 
            <span> Saved payment methods </span>
            <small className='text-xs text-gray-500'> 2 cards saved </small>
          </p>
        </div>

        <button className='btn btn-tertiary px-4'>
          Manage Options
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {(!section || section === 'security') && renderSecurity()}
      {(!section || section === 'payment') && renderPayment()}
      
      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Settings;