import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  CreditCard, 
  Lock,
  ArrowRight
} from 'lucide-react';
import Profile from './Profile';
import Verification from './Verification';
import Badges from './Badges';
import KYCTab from './KYCTab';
import Settings from './Settings';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('Profile Information');

  const tabs = [
    { name: 'Profile Information', icon: User },
    { name: 'Badge Verification', icon: ShieldCheck },
    { name: 'Badge Level', icon: Award },
    { name: 'KYC Verification', icon: CheckCircle },
    { name: 'Payment Settings', icon: CreditCard },
    { name: 'Security', icon: Lock },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Profile Information':
        return <Profile />;
      case 'Badge Verification':
        return <Verification />;
      case 'Badge Level':
        return <Badges />;
      case 'KYC Verification':
        return <KYCTab />;
      case 'Payment Settings':
        return <Settings section="payment" />;
      case 'Security':
        return <Settings section="security" />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account & Settings</h1>
        <p className="text-gray-500">Manage your profile, security, and verification status</p>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.name
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 font-medium'
              }`}
            >
              <tab.icon size={18} />
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AccountSettings;
