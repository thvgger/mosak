// components/header/AccountPopup.jsx
import React from 'react';
import { Store, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../contexts/AuthModalContext';

const AccountPopup = ({ isAccount, user, onLogout, onClose }) => {
  const navigate = useNavigate();
  const { openModal } = useAuthModal();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleSignIn = () => {
    onClose();
    openModal('login');
  };

  const handleCreateAccount = () => {
    onClose();
    openModal('role');
  };

  // All available dashboard types
  const allDashboards = [
    { role: 'BUYER', icon: User, label: 'Buyer Dashboard', path: '/account' },
    { role: 'SELLER', icon: Store, label: 'Seller Dashboard', path: '/seller' },
  ];

  // Get user's roles - check from the user object
  const userRoles = user?.roles || [];
  
  console.log('AccountPopup - user:', user);
  console.log('AccountPopup - userRoles:', userRoles);

  // If no user, show sign in/sign up buttons
  if (!user) {
    return (
      <div className='absolute z-70 mt-4 border border-dark/10 top-full right-0 w-72 rounded-xl shadow-md bg-white p-4 text-sm text-dark'>
        <div className='flex flex-col gap-3'>
          <button onClick={handleSignIn} className='btn w-full'>Sign In</button>
          <button onClick={handleCreateAccount} className='btn btn-text w-full'>Create Account</button>
        </div>
      </div>
    );
  }

  // User is logged in - show dashboard options
  return (
    <div className='absolute z-70 mt-4 border border-dark/10 top-full right-0 w-72 rounded-xl shadow-md bg-white p-4 text-sm text-dark'>
      {/* User Info Section */}
      <div className='mb-2 pb-4 border-b border-gray-200'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <span className='text-primary font-semibold'>
              {user.full_name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <p className='font-semibold'>{user.full_name}</p>
            <p className='text-xs text-gray-500'>{user.email}</p>
            {user.kyc_status && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                user.kyc_status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 
                'bg-gray-100 text-gray-700'
              }`}>
                {user.kyc_status}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className='space-y-2'>
        {/* Available Dashboards Section */}
        {allDashboards.map((dashboard) => {
          const Icon = dashboard.icon;
          const hasAccess = userRoles.includes(dashboard.role);
          const isCurrentPath = window.location.pathname.startsWith(dashboard.path);

          // Only show dashboards the user has access to
          if (!hasAccess) return null;

          return (
            <button
              key={dashboard.role}
              onClick={() => handleNavigation(dashboard.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isCurrentPath ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="flex-1 text-left">{dashboard.label}</span>
              {isCurrentPath && (
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
          );
        })}

        <hr className='border-gray-200' />

        {/* Account Settings */}
        <button 
          onClick={() => handleNavigation('/account/profile')}
          className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700'
        >
          <Settings size={18} strokeWidth={1.5} />
          <span className="flex-1 text-left">Account Settings</span>
        </button>

        <button 
          onClick={onLogout}
          className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50'
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPopup;