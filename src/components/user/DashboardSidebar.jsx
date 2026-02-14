import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  Wallet, 
  AlertCircle, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/account', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/account/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/account/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/account/wallet', icon: Wallet, label: 'Wallet & Earnings' },
    { path: '/account/disputes', icon: AlertCircle, label: 'Disputes' },
    { path: '/account/notifications', icon: Bell, label: 'Notifications' },
    { path: '/account/settings', icon: User, label: 'Settings' },
    { path: '/account/help', icon: User, label: 'Help & Support' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-16 left-0 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 
          transition-all duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          pt-10.5 md:pt-14.5
        `}
      >
        <nav className="h-full flex flex-col justify-between pb-6">
          {/* Menu Items */}
          <div className="mt-6 overflow-y-auto">
            <ul className="space-y-1.5 px-4">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/account'}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="text-sm md:text-base">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User Info & Logout - Sticky at bottom */}
          <div className="px-4 mt-auto">
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <img 
                  src={user?.avatar || 'https://via.placeholder.com/40'} 
                  alt={user?.name || 'User'} 
                  className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full object-cover"
                />
                <div className="flex flex-col gap-px overflow-hidden">
                  <span className="text-sm md:text-base font-medium truncate">
                    {user?.name || 'Dorcas Samuel'}
                  </span>
                  <small className="text-xs md:text-sm text-gray-500">
                    {user?.role || 'Buyer'}
                  </small>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
              >
                <LogOut size={16} />
                <span className="text-sm md:text-base">Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;