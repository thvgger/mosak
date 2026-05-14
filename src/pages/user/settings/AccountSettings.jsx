import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Verification from './Verification';
import Badges from './Badges';
import KYCTab from './KYCTab';
import Settings from './Settings';

const AccountSettings = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account & Settings</h1>
        <p className="text-gray-500">Manage your profile, security, and verification status</p>
      </div>

      {/* Settings Content - Rendered based on sub-route */}
      <div className="mt-6">
        <Routes>
          <Route path="/" element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="verification" element={<Verification />} />
          <Route path="badges" element={<Badges />} />
          <Route path="kyc" element={<KYCTab />} />
          <Route path="payment" element={<Settings section="payment" />} />
          <Route path="security" element={<Settings section="security" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AccountSettings;
