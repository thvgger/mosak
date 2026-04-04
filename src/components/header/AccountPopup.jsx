// components/header/AccountPopup.jsx
import React from 'react';
import { Store, User, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { useAuth } from '../../contexts/AuthContext';

const AccountPopup = ({ user, onLogout, onClose }) => {
  const { addRole, loading } = useAuth();
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
  
  // console.log('AccountPopup - user:', user);
  // console.log('AccountPopup - userRoles:', userRoles);

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
            <p className='font-semibold flex items-center gap-1 mb-0.5'>
              {user.full_name} 
              {user.kyc_status && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-light ${
                user.kyc_status === 'VERIFIED' ? 'bg-primary/10 text-primary' : 
                'bg-gray-200 text-gray-700'
              }`}>
                {user.kyc_status}
              </span>
            )}
            </p>
            <p className='text-xs text-gray-500'>{user.email}</p>
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
            <>
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
            <hr className='border border-gray-200' />
            </>
          );
        })}

        {/* <hr className='border border-gray-200' /> */}

        {/* Become a Seller Button - Show only if user doesn't have seller role */}
        {!userRoles.includes('SELLER') && (
          loading ? (
            <div className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400'>
              <Store size={18} strokeWidth={1.5} className="animate-pulse" />
              <span className="flex-1 text-left animate-pulse">Loading...</span>
            </div>
          ) : ( 
          <>
          {/* Add Role on Click */}
            <button 
              onClick={() => {
                onClose();
                addRole({ role: 'SELLER' })
                // openModal('become-seller');
              }}
              className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors group'
            >
              <Store size={18} strokeWidth={1.5} className="group-hover:text-primary transition-colors" />
              <span className="flex-1 text-left">Become a Seller</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                New
              </span>
            </button>
            <hr className='border border-gray-200' />
          </>
        ))}

        {/* {!user.role === "SELLER" ? ( */}
          {/* <button className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700'>
            <Store size={18} strokeWidth={1.5} />
            Become a Seller
          </button> */}
        {/* ) : ( */}
          {/* <Link to="/seller" className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700'>
            <Store size={18} strokeWidth={1.5} />
            Seller Dashboard
          </Link> */}
          
        {/* )} */}

        {/* <hr className='border-gray-200' /> */}

        {/* Settings */}
        <button 
          onClick={() => handleNavigation('/account/profile')}
          className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700'
        >
          <Settings size={18} strokeWidth={1.5} />
          <span className="flex-1 text-left">Settings</span>
        </button>

        {/* <hr className='border border-gray-200' /> */}

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