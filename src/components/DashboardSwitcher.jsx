// components/DashboardSwitcher.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, Briefcase, Building2, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardSwitcher = () => {
  const { user, currentDashboard, switchDashboard } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const dashboardConfig = {
    buyer: {
      icon: User,
      label: 'Buyer Dashboard',
      path: '/account',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    seller: {
      icon: Store,
      label: 'Seller Dashboard',
      path: '/seller',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    freelancer: {
      icon: Briefcase,
      label: 'Freelancer Dashboard',
      path: '/freelancer',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    employer: {
      icon: Building2,
      label: 'Employer Dashboard',
      path: '/employer',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  };

  const CurrentIcon = dashboardConfig[currentDashboard]?.icon || User;

  const handleSwitch = (role) => {
    switchDashboard(role);
    navigate(dashboardConfig[role].path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <CurrentIcon size={18} className={dashboardConfig[currentDashboard]?.color} />
        <span className="text-sm font-medium">{dashboardConfig[currentDashboard]?.label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {user.roles.map((role) => (
              <button
                key={role}
                onClick={() => handleSwitch(role)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  currentDashboard === role ? dashboardConfig[role].bgColor : ''
                }`}
              >
                {React.createElement(dashboardConfig[role].icon, { 
                  size: 16, 
                  className: dashboardConfig[role].color 
                })}
                <span>{dashboardConfig[role].label}</span>
                {currentDashboard === role && (
                  <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSwitcher;