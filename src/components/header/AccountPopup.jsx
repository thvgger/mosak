import React from 'react';
import { Handbag, Store, ShieldUser, User, LogOut, Settings, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AccountPopup = ({ isAccount, user, onLogout, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className='absolute z-70 mt-4 border border-dark/10 top-full right-0 w-60 rounded-xl shadow-md bg-white p-4 text-sm text-dark'>
      {user ? (
        <>
          <div className='mb-4 pb-4 border-b border-gray-200'>
            <div className='flex items-center gap-3'>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className='w-10 h-10 rounded-full' />
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
          
          <div className='space-y-4'>
            <button 
              onClick={() => handleNavigation('/account')}
              className='flex items-center gap-3 w-full'
            >
              <User size={18} strokeWidth={1.5} />
              <span>My Dashboard</span>
            </button>

            {!isAccount && (
              <button 
                onClick={() => handleNavigation('/account/messages')}
                className='flex items-center gap-3 w-full'
              >
                <MessageSquare size={16} strokeWidth={1.5} className='' />
                <span>My Messages</span>
              </button>
            )}


            
            {/* {user.role === 'seller' && ( */}
              <button 
                onClick={() => handleNavigation('/account/seller')}
                className='flex items-center gap-3 w-full'
              >
                <Store size={18} strokeWidth={1.5} />
                <span>Seller Dashboard</span>
              </button>
            {/* )} */}
            
            {/* {user.role === 'freelancer' && ( */}
              <button 
                onClick={() => handleNavigation('/account/freelancer')}
                className='flex items-center gap-3 w-full'
              >
                <ShieldUser size={18} strokeWidth={1.5} />
                <span>Freelancer Dashboard</span>
              </button>
            {/* )} */}
            
            <button 
              onClick={() => handleNavigation('/account/settings')}
              className='flex items-center gap-3 w-full'
            >
              <Settings size={18} strokeWidth={1.5} />
              <span>Account Settings</span>
            </button>
            
            <hr className='border-gray-200' />
            
            <button 
              onClick={onLogout}
              className='flex items-center gap-3 w-full p-2 rounded-lg text-red-600 hover:bg-red-50'
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
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