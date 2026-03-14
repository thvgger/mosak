// components/header/AccountPopup.jsx
import React from 'react';
import { Store, User, LogOut, Settings, MessageSquare, Briefcase, Building2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AccountPopup = ({ isAccount, user, onLogout, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  // All available dashboard types
  const allDashboards = [
    { role: 'buyer', icon: User, label: 'Buyer Dashboard', path: '/account', color: 'text-blue-600' },
    { role: 'seller', icon: Store, label: 'Seller Dashboard', path: '/seller', color: 'text-green-600' },
    // { role: 'freelancer', icon: Briefcase, label: 'Freelancer Dashboard', path: '/freelancer', color: 'text-purple-600' },
    // { role: 'employer', icon: Building2, label: 'Employer Dashboard', path: '/employer', color: 'text-orange-600' }
  ];

  // Get user's current roles (if any)
  const userRoles = user?.roles || (user?.role ? [user.role] : []);

  return (
    <div className='absolute z-70 mt-4 border border-dark/10 top-full right-0 w-72 rounded-xl shadow-md bg-white p-4 text-sm text-dark'>
      {user ? (
        <>
          {/* User Info Section */}
          <div className='mb-2 pb-4 border-b border-gray-200'>
            <div className='flex items-center gap-3'>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className='w-10 h-10 rounded-full object-cover' />
              ) : (
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                  <span className='text-primary font-semibold'>
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <div>
                <p className='font-semibold'>{user.name}</p>
                <p className='text-xs text-gray-500'>{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className='space-y-2'>
            {/* All Dashboards Section */}
            <div className="">
              {/* <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Your Dashboards
              </p> */}
              
              {allDashboards.map((dashboard) => {
                const Icon = dashboard.icon;
                const hasAccess = userRoles.includes(dashboard.role);
                const isCurrentPath = 
                  (dashboard.role === 'buyer' && window.location.pathname.startsWith('/account')) ||
                  (dashboard.role === 'seller' && window.location.pathname.startsWith('/seller')) ||
                  (dashboard.role === 'freelancer' && window.location.pathname.startsWith('/freelancer')) ||
                  (dashboard.role === 'employer' && window.location.pathname.startsWith('/employer'));

                return (
                  <button
                    key={dashboard.role}
                    onClick={() => handleNavigation(dashboard.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isCurrentPath 
                        ? 'bg-primary/10 text-primary' 
                        : hasAccess
                          ? 'hover:bg-gray-50 text-gray-700'
                          : 'hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span className="flex-1 text-left">{dashboard.label}</span>
                    
                    {/* Status indicators */}
                    {/* {isCurrentPath && (
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                    {!hasAccess && !isCurrentPath && (
                      <span className="text-xs flex items-center gap-1 text-gray-400">
                        <PlusCircle size={12} />
                        <span>Setup</span>
                      </span>
                    )} */}
                  </button>
                );
              })}
            </div>

            <hr className='border-gray-200' />

            {/* Quick Links */}
            <div className="space-y-1">
              {/* <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Quick Links
              </p> */}

              {/* Messages link - only if not on account page */}
              {/* {!isAccount && (
                <button 
                  onClick={() => handleNavigation('/account/messages')}
                  className='flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-gray-700'
                >
                  <MessageSquare size={18} strokeWidth={1.5} />
                  <span className="flex-1 text-left">Messages</span>
                  {user?.unreadMessages > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {user.unreadMessages}
                    </span>
                  )}
                </button>
              )} */}
              
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
            
            {/* <hr className='border-gray-200' /> */}
            
            {/* Logout button */}
          </div>
        </>
      ) : (
        <div className='flex flex-col gap-3'>
          <button 
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            className='btn w-full'
          >
            Sign In
          </button>
          <button 
            onClick={() => {
              onClose();
              navigate('/signup');
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