// components/DashboardSwitcher.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store, User, Briefcase, Building2, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardSwitcher = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const dashboardConfig = {
    BUYER: {
      icon: User,
      label: 'Buyer Dashboard',
      path: '/account',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    SELLER: {
      icon: Store,
      label: 'Seller Dashboard',
      path: '/seller',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    FREELANCER: {
      icon: Briefcase,
      label: 'Freelancer Dashboard',
      path: '/freelancer',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    EMPLOYER: {
      icon: Building2,
      label: 'Employer Dashboard',
      path: '/employer',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  };

  // Determine current dashboard from URL
  const getCurrentDashboard = () => {
    if (location.pathname.startsWith('/seller')) return 'SELLER';
    if (location.pathname.startsWith('/freelancer')) return 'FREELANCER';
    if (location.pathname.startsWith('/employer')) return 'EMPLOYER';
    if (location.pathname.startsWith('/account')) return 'BUYER';
    return 'BUYER';
  };

  const currentDashboard = getCurrentDashboard();
  const config = dashboardConfig[currentDashboard] || dashboardConfig.BUYER;
  const CurrentIcon = config.icon;

  const handleSwitch = (role) => {
    navigate(dashboardConfig[role].path);
    setIsOpen(false);
  };

  const userRoles = user.roles || [];

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${config.bgColor} ${config.borderColor} hover:shadow-md group`}
      >
        <div className={`p-2 rounded-lg bg-white shadow-sm ${config.color}`}>
          <CurrentIcon size={20} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Current View</p>
          <p className="text-sm font-bold text-gray-900">{config.label}</p>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/5 lg:bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 bottom-full lg:bottom-auto lg:top-full mb-2 lg:mb-0 lg:mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Switch Dashboard</p>
            {userRoles.map((role) => {
              const roleConfig = dashboardConfig[role];
              if (!roleConfig) return null;
              const isSelected = currentDashboard === role;
              
              return (
                <button
                  key={role}
                  onClick={() => handleSwitch(role)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                    isSelected ? 'bg-gray-50 text-primary' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-100'} ${roleConfig.color}`}>
                    <roleConfig.icon size={16} />
                  </div>
                  <span className={`flex-1 font-medium ${isSelected ? 'text-gray-900' : ''}`}>{roleConfig.label}</span>
                  {isSelected && (
                    <Check size={16} className="text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSwitcher;