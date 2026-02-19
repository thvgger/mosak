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
  EyeOff
} from 'lucide-react';

const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Security Settings</h1>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Key size={18} />
          Password
        </h2>
        
        <div className="max-w-md">
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value="currentpassword"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            Change Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Shield size={18} />
            Two-Factor Authentication (2FA)
          </h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Add an extra layer of security to your account. Once enabled, you'll need to enter a code from your authenticator app in addition to your password.
        </p>

        {twoFactorEnabled && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <CheckCircle size={16} />
              2FA is currently enabled
            </p>
          </div>
        )}
      </div>

      {/* Trusted Devices */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Smartphone size={18} />
          Trusted Devices
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">iPhone 13 Pro</p>
              <p className="text-xs text-gray-500">Last active: Just now</p>
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Current Device
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">MacBook Pro</p>
              <p className="text-xs text-gray-500">Last active: 2 days ago</p>
            </div>
            <button className="text-red-500 hover:text-red-600 text-sm">
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Clock size={18} />
          Recent Activity
        </h2>

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              {activity.status === 'success' ? (
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-red-500 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">{activity.device}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{activity.location}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;