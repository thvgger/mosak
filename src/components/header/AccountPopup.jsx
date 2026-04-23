// components/header/AccountPopup.jsx
import React from 'react';
import { Store, User, LogOut, Settings, Check } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { useAuth } from '../../contexts/AuthContext';

const AccountPopup = ({ user, onLogout, onClose }) => {
  const { hasCompleteSellerProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  const userRoles = user?.roles || [];
  const currentPath = location.pathname;

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

  const dashboardOptions = [
    { 
      role: 'BUYER', 
      icon: User, 
      label: 'Buyer Dashboard', 
      path: '/account',
      isActive: currentPath.startsWith('/account')
    },
    { 
      role: 'SELLER', 
      icon: Store, 
      label: 'Seller Dashboard', 
      path: '/seller',
      isActive: currentPath.startsWith('/seller')
    }
  ];

  return (
    <div className='absolute z-70 mt-4 border border-dark/10 top-full right-0 w-72 rounded-xl shadow-md bg-white p-4 text-sm text-dark'>
      {/* User Info Section */}
      <div className='mb-2 pb-4 border-b border-gray-100'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            {user.avatar ? (
               <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className='text-primary font-semibold'>
                {user.full_name?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div className="overflow-hidden">
            <p className='font-semibold truncate mb-0.5'>
              {user.full_name} 
            </p>
            <p className='text-xs text-gray-500 truncate'>{user.email}</p>
          </div>
        </div>
        {user.kyc_status && (
          <div className="mt-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              user.kyc_status === 'VERIFIED' ? 'bg-green-100 text-green-700' : 
              'bg-yellow-100 text-yellow-700'
            }`}>
              {user.kyc_status}
            </span>
          </div>
        )}
      </div>
      
      <div className='space-y-1 py-2'>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dashboards</p>
        
        {dashboardOptions.map((option) => {
          const hasRole = userRoles.includes(option.role);
          
          if (!hasRole) {
            // Show "Become a ..." button
            return (
              <button 
                key={option.role}
                onClick={() => {
                  onClose();
                  openModal(option.role === 'SELLER' ? 'become-seller' : 'become-buyer');
                }}
                className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors group'
              >
                <option.icon size={18} strokeWidth={1.5} className="text-gray-400 group-hover:text-primary" />
                <span className="flex-1 text-left">Become a {option.role === 'SELLER' ? 'Seller' : 'Buyer'}</span>
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">New</span>
              </button>
            );
          }

          // Special case for incomplete seller profile
          if (option.role === 'SELLER' && !hasCompleteSellerProfile()) {
            return (
              <button 
                key={option.role}
                onClick={() => {
                  onClose();
                  openModal('become-seller');
                }}
                className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700 transition-colors group'
              >
                <option.icon size={18} strokeWidth={1.5} className="text-gray-400 group-hover:text-primary" />
                <span className="flex-1 text-left">Complete Store Setup</span>
                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">Action</span>
              </button>
            );
          }

          // Standard dashboard link
          return (
            <Link 
              key={option.role}
              to={option.path}
              onClick={onClose}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                option.isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <option.icon size={18} strokeWidth={1.5} className={option.isActive ? 'text-primary' : 'text-gray-400'} />
              <span className="flex-1 text-left">{option.label}</span>
              {option.isActive && <Check size={14} />}
            </Link>
          );
        })}

        <div className="my-2 border-t border-gray-100"></div>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</p>

        <button 
          onClick={() => handleNavigation('/account/profile')}
          className='w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-gray-700'
        >
          <Settings size={18} strokeWidth={1.5} className="text-gray-400" />
          <span className="flex-1 text-left">Settings</span>
        </button>

        <button 
          onClick={onLogout}
          className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 group'
        >
          <LogOut size={18} strokeWidth={1.5} className="text-red-400 group-hover:text-red-600" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPopup;