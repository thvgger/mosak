// components/user/DashboardSidebar.jsx (updated)
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  Wallet, 
  AlertCircle, 
  Bell, 
  User, 
  Users,
  LogOut,
  Menu,
  PanelRightClose,
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
  Zap,
  UserRound,
  List,
  PlusCircle,
  Sparkles,
  Sliders,
  ShieldCheck,
  CircleCheckBig,
  CreditCard,
  Lock,
  User2Icon,
  UserCog
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardSidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDiscountsOpen, setIsDiscountsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which dashboard we're in based on the URL
  const isBuyerDashboard = location.pathname.startsWith('/account');
  const isSellerDashboard = location.pathname.startsWith('/seller');
  const isFreelancerDashboard = location.pathname.startsWith('/freelancer');
  const isEmployerDashboard = location.pathname.startsWith('/employer');

  const getBasePath = () => {
    if (isBuyerDashboard) return '/account';
    if (isSellerDashboard) return '/seller';
    if (isFreelancerDashboard) return '/freelancer';
    if (isEmployerDashboard) return '/employer';
    return '/account';
  };

  const basePath = getBasePath();

  // Menu items for different dashboards
  const buyerMenuItems = [
    { path: '/account', icon: House, label: 'Dashboard', end: true },
    { path: '/account/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/account/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/account/wallet', icon: Wallet, label: 'Wallet & Earnings' },
    { path: '/account/referrals', icon: Users, label: 'Referrals' },
    { path: '/account/disputes', icon: AlertCircle, label: 'Disputes' },
    { path: '/account/notifications', icon: Bell, label: 'Notifications' },
    { path: '/account/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  // Products dropdown items
  const productsDropdownItems = [
    { path: '/seller/products', icon: List, label: 'All Products' },
    { path: '/seller/add-products', icon: PlusCircle, label: 'Add New Product' },
  ];

  // Promotions dropdown items
  const discountsDropdownItems = [
    { path: '/seller/discounts', icon: BoostIcon, label: 'Active Promotions' },
    { path: '/seller/boost', icon: Sparkles, label: 'Boost Products' },
    { path: '/seller/history', icon: TrendingUp, label: 'Promotion History' },
  ];

  const sellerMenuItems = [
    { path: '/seller', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { 
      type: 'dropdown',
      icon: Package, 
      label: 'Products Overview',
      isOpen: isProductsOpen,
      setIsOpen: setIsProductsOpen,
      items: productsDropdownItems
    },
    { path: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
    { 
      type: 'dropdown',
      icon: Zap, 
      label: 'Promotions / Boost',
      isOpen: isDiscountsOpen,
      setIsOpen: setIsDiscountsOpen,
      items: discountsDropdownItems
    },
    { path: '/seller/escrow', icon: Shield, label: 'Escrow & Payments' },
    { path: '/seller/earnings', icon: Wallet, label: 'Wallet & Earnings' },
    { path: '/seller/referrals', icon: Users, label: 'Referrals' },
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

  // Settings dropdown items
  const settingsDropdownItems = [
    { path: `${basePath}/settings/profile`, icon: UserRound, label: 'Profile Information' },
    { path: `${basePath}/settings/verification`, icon: ShieldCheck, label: 'Badge Verification' },
    { path: `${basePath}/settings/badges`, icon: Award, label: 'Badge Level' },
    // KYC and Payment removed for buyers
    ...(!isBuyerDashboard ? [
      { path: `${basePath}/settings/kyc`, icon: CircleCheckBig, label: 'KYC Verification' },
      { path: `${basePath}/settings/payment`, icon: CreditCard, label: 'Payment Settings' },
    ] : []),
    { path: `${basePath}/settings/security`, icon: Sliders, label: 'Settings' },
  ];

  // Check if any product dropdown route is active
  const isProductsActive = isSellerDashboard && productsDropdownItems.some(item => 
    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  );

  // Check if any discount dropdown route is active
  const isDiscountsActive = isSellerDashboard && discountsDropdownItems.some(item => 
    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  );

  // Check if settings dropdown route is active
  const isSettingsActive = location.pathname.startsWith(`${basePath}/settings`);

  // Auto-open dropdowns if on their pages
  useEffect(() => {
    if (isProductsActive) {
      setIsProductsOpen(true);
    }
    if (isDiscountsActive) {
      setIsDiscountsOpen(true);
    }
    if (isSettingsActive) {
      setIsSettingsOpen(true);
    }
  }, [isProductsActive, isDiscountsActive, isSettingsActive]);

  // Get current menu items based on dashboard type
  const getCurrentMenuItems = () => {
    if (isBuyerDashboard) return buyerMenuItems;
    if (isSellerDashboard) return sellerMenuItems;
    if (isFreelancerDashboard) return freelancerMenuItems;
    if (isEmployerDashboard) return employerMenuItems;
    return buyerMenuItems; // Default
  };

  const currentMenuItems = getCurrentMenuItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPublicProfileLink = () => {
    const profileId = user?.id || 'stacey-samuel';
    if (isSellerDashboard || user?.role?.toLowerCase() === 'seller') {
      return `/seller-profile/${profileId}`;
    }
    return `/profile/${profileId}`;
  };

  // Get dashboard title
  const getDashboardTitle = () => {
    if (isBuyerDashboard) return 'Buyer Dashboard';
    if (isSellerDashboard) return 'Seller Dashboard';
    if (isFreelancerDashboard) return 'Freelancer Dashboard';
    if (isEmployerDashboard) return 'Employer Dashboard';
    return 'Dashboard';
  };

  // Render menu item (regular or dropdown)
  const renderMenuItem = (item, index) => {
    if (item.type === 'dropdown') {
      const isActive = item.items.some(subItem => 
        location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/')
      );
      
      return (
        <li key={index}>
          <button
            onClick={() => item.setIsOpen(!item.isOpen)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.isOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {/* Dropdown Items */}
          {item.isOpen && (
            <ul className="mt-1 ml-6 space-y-1 border-l-2 border-gray-200 pl-3">
              {item.items.map((subItem) => (
                <li key={subItem.path}>
                  <NavLink
                    to={subItem.path}
                    className={({ isActive: isSubActive }) =>
                      `flex items-center space-x-3 p-2.5 rounded-lg transition-colors text-sm ${
                        isSubActive
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <subItem.icon size={16} />
                    <span>{subItem.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }
    
    // Regular menu item
    return (
      <li key={item.path}>
        <NavLink
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <item.icon size={20} />
          <span className="text-sm">{item.label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {/* <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-16 md:top-20 left-0 z-40 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <PanelRightClose size={24} />}
      </button> */}

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 
          transition-all duration-300 ease-in-out z-400
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
          <div className="flex-1 py-3 overflow-y-auto">
            <ul className="space-y-1.5 px-3">
              {/* Main Menu Items */}
              {currentMenuItems.map((item, index) => renderMenuItem(item, index))}

              {/* Consolidated Account & Settings Dropdown */}
              <li>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isSettingsActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <UserCog size={20} />
                    <span className="text-sm">Account</span>
                  </div>
                  {isSettingsOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                {isSettingsOpen && (
                  <ul className="mt-1 ml-6 space-y-1 border-l-2 border-gray-200 pl-3">
                    {settingsDropdownItems.map((subItem) => (
                      <li key={subItem.path}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center space-x-3 p-2.5 rounded-lg transition-colors text-sm ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`
                          }
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <subItem.icon size={16} />
                          <span>{subItem.label}</span>
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
              {/* Premium Account Card - Hidden on Buyer Dashboard */}
              {!isBuyerDashboard && (
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-primary text-white p-1 rounded-md">
                      <Shield size={14} />
                    </div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Verified Seller</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Premium Account</p>
                  <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full"></div>
                  </div>
                </div>
              )}

              <Link 
                to={getPublicProfileLink()}
                className="flex items-center gap-3 px-2 hover:bg-gray-50 p-2 rounded-xl transition-colors group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img 
                  src={user?.avatar || 'https://placehold.co/40'} 
                  alt={user?.name || 'User'} 
                  className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full object-cover group-hover:ring-2 group-hover:ring-primary/20 transition-all"
                />
                <div className="flex flex-col gap-px overflow-hidden">
                  <span className="text-sm md:text-base font-medium truncate group-hover:text-primary transition-colors">
                    {user?.full_name || 'User'}
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
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
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