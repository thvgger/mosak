// components/user/DashboardSidebar.jsx (updated)
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  X,
  Settings,
  ChevronDown,
  ChevronUp,
  Shield,
  Award,
  HelpCircle,
  Package,
  TrendingUp,
  Briefcase,
  Building2,
  House,
  BellElectric,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which dashboard we're in based on the URL
  const isBuyerDashboard = location.pathname.startsWith('/account');
  const isSellerDashboard = location.pathname.startsWith('/seller');
  const isFreelancerDashboard = location.pathname.startsWith('/freelancer');
  const isEmployerDashboard = location.pathname.startsWith('/employer');

  // Menu items for different dashboards
  const buyerMenuItems = [
    { path: '/account', icon: House, label: 'Dashboard', end: true },
    { path: '/account/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/account/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/account/wallet', icon: Wallet, label: 'Wallet & Earnings' },
    { path: '/account/disputes', icon: AlertCircle, label: 'Disputes' },
    { path: '/account/notifications', icon: Bell, label: 'Notifications' },
    { path: '/account/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const sellerMenuItems = [
    { path: '/seller', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/seller/products', icon: Package, label: 'Products' },
    { path: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/seller/promotions', icon: Zap, label: 'Promotions / Boost' },
    { path: '/seller/escrow', icon: Shield, label: 'Escrow & Payments' },
    { path: '/seller/earnings', icon: Wallet, label: 'Wallet & Earnings' },
    { path: '/seller/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/seller/disputes', icon: AlertCircle, label: 'Disputes' },
    { path: '/seller/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/seller/notifications', icon: Bell, label: 'Notifications' },
    { path: '/seller/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const freelancerMenuItems = [
    { path: '/freelancer', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/freelancer/projects', icon: Briefcase, label: 'Projects' },
    { path: '/freelancer/proposals', icon: MessageSquare, label: 'Proposals' },
    { path: '/freelancer/earnings', icon: Wallet, label: 'Earnings' },
    { path: '/freelancer/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/freelancer/portfolio', icon: Award, label: 'Portfolio' },
    { path: '/freelancer/notifications', icon: Bell, label: 'Notifications' },
  ];

  const employerMenuItems = [
    { path: '/employer', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/employer/post-job', icon: Briefcase, label: 'Post a Job' },
    { path: '/employer/projects', icon: Package, label: 'My Projects' },
    { path: '/employer/freelancers', icon: User, label: 'Find Freelancers' },
    { path: '/employer/proposals', icon: MessageSquare, label: 'Proposals' },
    { path: '/employer/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/employer/notifications', icon: Bell, label: 'Notifications' },
  ];

  // Settings items (same for all dashboards but with different base paths)
  const getSettingsItems = () => {
    const basePath = isBuyerDashboard ? '/account' : 
                     isSellerDashboard ? '/seller' :
                     isFreelancerDashboard ? '/freelancer' : '/employer';
    
    return [
      { path: `${basePath}/profile`, icon: User, label: 'Profile' },
      { path: `${basePath}/badges`, icon: Award, label: 'Badges & Achievements' },
      { path: `${basePath}/verifications`, icon: Shield, label: 'Verifications' },
      { path: `${basePath}/security`, icon: Shield, label: 'Security' },
      { path: `${basePath}/preferences`, icon: Settings, label: 'Preferences' },
    ];
  };

  const settingsItems = getSettingsItems();

  // Get current menu items based on dashboard type
  const getCurrentMenuItems = () => {
    if (isBuyerDashboard) return buyerMenuItems;
    if (isSellerDashboard) return sellerMenuItems;
    if (isFreelancerDashboard) return freelancerMenuItems;
    if (isEmployerDashboard) return employerMenuItems;
    return buyerMenuItems; // Default
  };

  const currentMenuItems = getCurrentMenuItems();

  // Check if any settings route is active
  const isSettingsActive = settingsItems.some(item => 
    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  );

  // Auto-open settings if on a settings page
  useEffect(() => {
    if (isSettingsActive) {
      setIsSettingsOpen(true);
    }
  }, [isSettingsActive]);

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

  // Get dashboard title
  const getDashboardTitle = () => {
    if (isBuyerDashboard) return 'Buyer Dashboard';
    if (isSellerDashboard) return 'Seller Dashboard';
    if (isFreelancerDashboard) return 'Freelancer Dashboard';
    if (isEmployerDashboard) return 'Employer Dashboard';
    return 'Dashboard';
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-16 md:top-20 left-0 z-40 p-2 bg-white rounded-lg shadow-md"
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
        <nav className="h-full flex flex-col justify-between pb-4">
          {/* Dashboard Title */}
          <div className="px-6 pt-8 pb-2 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">{getDashboardTitle()}</h2>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1.5 px-4">
              {/* Main Menu Items */}
              {currentMenuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
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

              {/* Settings Dropdown */}
              <li>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isSettingsActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Settings size={20} />
                    <span className="text-sm md:text-base">Settings</span>
                  </div>
                  {isSettingsOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {/* Dropdown Items */}
                {isSettingsOpen && (
                  <ul className="mt-1 ml-6 space-y-1 border-l-2 border-gray-200 pl-3">
                    {settingsItems.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`
                          }
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* User Info & Logout - Sticky at bottom */}
          <div className="px-4 mt-auto">
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <img 
                  src={user?.avatar || 'https://placehold.co/40'} 
                  alt={user?.name || 'User'} 
                  className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full object-cover"
                />
                <div className="flex flex-col gap-px overflow-hidden">
                  <span className="text-sm md:text-base font-medium truncate">
                    {user?.name || 'User'}
                  </span>
                  <div className="flex items-center gap-1">
                    <small className="text-xs md:text-sm text-gray-500">
                      {user?.role || 'User'}
                    </small>
                    {user?.verified && (
                      <Shield size={12} className="text-blue-500" />
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
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