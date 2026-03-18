// components/header/AccountPopup.jsx
import React from 'react';
import { Store, User, LogOut, Settings, MessageSquare, Briefcase, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountPopup = ({ isAccount, user, onLogout, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  // All available dashboard types
  const allDashboards = [
    { role: 'BUYER', icon: User, label: 'Buyer Dashboard', path: '/account', color: 'text-blue-600' },
    { role: 'SELLER', icon: Store, label: 'Seller Dashboard', path: '/seller', color: 'text-green-600' },
    { role: 'FREELANCER', icon: Briefcase, label: 'Freelancer Dashboard', path: '/freelancer', color: 'text-purple-600' },
    { role: 'MARKETER', icon: Building2, label: 'Marketer Dashboard', path: '/marketer', color: 'text-orange-600' }
  ];

  // Get user's current roles from the backend response
  const userRoles = user?.roles || [];

  return (
    <div className='absolute z-70 mt-4 border border-dark/10 top-full right-0 w-72 rounded-xl shadow-md bg-white p-4 text-sm text-dark'>
      {user ? (
        <>
          {/* User Info Section */}
          <div className='mb-2 pb-4 border-b border-gray-200'>
            <div className='flex items-center gap-3'>
              {user.avatar ? (
                <img src={user.avatar} alt={user.full_name} className='w-10 h-10 rounded-full object-cover' />
              ) : (
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                  <span className='text-primary font-semibold'>
                    {user.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <div>
                <p className='font-semibold'>{user.full_name}</p>
                <p className='text-xs text-gray-500'>{user.email}</p>
                {user.kyc_status && (
                  <p className='text-xs mt-1'>
                    <span className={`px-2 py-0.5 rounded-full ${
                      user.kyc_status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 
                      user.kyc_status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.kyc_status}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className='space-y-2'>
            {/* Available Dashboards Section */}
            <div className="">
              {allDashboards.map((dashboard) => {
                const Icon = dashboard.icon;
                const hasAccess = userRoles.includes(dashboard.role);
                const isCurrentPath = 
                  (dashboard.role === 'BUYER' && window.location.pathname.startsWith('/account')) ||
                  (dashboard.role === 'SELLER' && window.location.pathname.startsWith('/seller')) ||
                  (dashboard.role === 'FREELANCER' && window.location.pathname.startsWith('/freelancer')) ||
                  (dashboard.role === 'MARKETER' && window.location.pathname.startsWith('/marketer'));

                // Only show dashboards the user has access to
                if (!hasAccess) return null;

                return (
                  <button
                    key={dashboard.role}
                    onClick={() => handleNavigation(dashboard.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isCurrentPath 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-gray-50 text-gray-700'
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
            </div>

            <hr className='border-gray-200' />

            {/* Quick Links */}
            <div className="space-y-1">
              <button 
                onClick={() => handleNavigation('/account/profile')}
                className='flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700'
              >
                <Settings size={18} strokeWidth={1.5} />
                <span className="flex-1 text-left">Account Settings</span>
              </button>

              <button 
                onClick={onLogout}
                className='flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors'
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='flex flex-col gap-3'>
          <button 
            onClick={() => {
              onClose();
              // Open login modal instead of navigating
              // You'll need to pass this function from parent
            }}
            className='btn w-full'
          >
            Sign In
          </button>
          <button 
            onClick={() => {
              onClose();
              // Open signup modal
            }}
            className='btn btn-text w-full'
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPopup;