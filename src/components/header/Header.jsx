// components/header/Header.jsx (updated section)
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/mosalak-logo.png";
import avatar from "../../assets/avatar.png";
import { X, Menu, MessageSquare, Bell, User as UserIcon, Store, Briefcase, Building2 } from 'lucide-react';
import { ShoppingCart, Heart, ChevronDown, PanelRightClose } from 'lucide-react';
import AccountPopup from "./AccountPopup";
import { useAuth } from "../../contexts/AuthContext";
import { useShopping } from "../../contexts/ShoppingContext";
import { useAuthModal } from "../../contexts/AuthModalContext"; 

const Header = ({ isCommunity, isMobileMenuOpen, setIsMobileMenuOpen, isDashboard  }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItemCount, wishlist } = useShopping();
  const { openModal } = useAuthModal();
  const location = useLocation();

  const currentDashboardLabel = location.pathname.startsWith('/seller') ? 'Seller' : 
                                location.pathname.startsWith('/freelancer') ? 'Freelancer' :
                                location.pathname.startsWith('/employer') ? 'Employer' :
                                location.pathname.startsWith('/account') ? 'Buyer' : null;

  const currentMessagesLink = location.pathname.startsWith('/seller') ? '/seller/messages' : 
                               location.pathname.startsWith('/freelancer') ? '/freelancer/messages' :
                               location.pathname.startsWith('/employer') ? '/employer/messages' :
                               '/account/messages';
  
  const currentNotificationsLink = location.pathname.startsWith('/seller') ? '/seller/notifications' : 
                                  location.pathname.startsWith('/freelancer') ? '/freelancer/notifications' :
                                  location.pathname.startsWith('/employer') ? '/employer/notifications' :
                                  '/account/notifications';
  
  const [accountPopup, setAccountPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  
  const navigate = useNavigate();
  const accountRef = useRef();
  

  const navlink = ({isActive}) => isActive ? 
    "text-primary font-medium text-sm text-gray-700 hover:text-primary underline" : 
    "font-medium text-sm text-gray-700 hover:text-primary";

  const handleLogout = () => {
    logout();
    setAccountPopup(false);
    navigate('/');
  };

  const AvatarWithFallback = ({ src, name, size = "w-8 h-8" }) => {
    const [imgError, setImgError] = useState(false);
    if (src && !imgError) {
      return (
        <img
          src={src}
          onError={() => setImgError(true)}
          className={`${size} rounded-full object-cover`}
          alt={name}
        />
      );
    }
    return (
      <span className={`bg-primary text-white ${size} flex items-center justify-center rounded-full text-[13px] font-bold`}>
        {name?.charAt(0).toUpperCase()}
      </span>
    );
  };

  // Close account popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountPopup && accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountPopup]); 

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     setAccountPopup(false);
  //   }
  // }, [isMenuOpen]);


  // const toggleSidebar = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // }
  

  return (
    <>
      <header className="sticky top-0 z-600 bg-white md:bg-white/60 backdrop-blur-md shadow h-16 md:h-20">
        <div className="container w-full h-full flex items-center justify-between gap-0 relative z-60">
          {/* Mobile Menu Toggle Button */}
          {isDashboard ? (
            <button
              onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen); }}
              className="lg:hidden p-2 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 shadow-sm transition-all active:scale-95 shrink-0 mr-2"
            >
              {isMobileMenuOpen ? <X size={24} className="text-gray-500" /> : <Menu className="text-gray-500" size={24} />}
            </button>
          ) : location.pathname !== '/' ? (
            <button 
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mr-2" 
              onClick={() => setIsMenuOpen(prev => !prev)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : null}
          <div className="w-full h-full flex items-center gap-4">
            <Link to="/" className="w-fit h-fit" onClick={()=> { setIsMenuOpen(false); scrollTo(0,0); }}>
              <img src={Logo} alt="Mosak Hub Logo" className="w-20 md:w-26 -ml-1 object-cover" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 w-full mx-auto text-nowrap">
            <NavLink to="/" onClick={() => { scrollTo(0,0); }} className={navlink}> Home </NavLink>
            <NavLink to="/marketplace" onClick={() => { scrollTo(0,0); }} className={navlink}> Market Place </NavLink>
            {/* <NavLink to="/sell" className={`bg-primary text-white px-4 py-2 rounded-lg`}> Sell </NavLink> */}
            <NavLink to="/community" onClick={() => { scrollTo(0,0); }} className={navlink}> Community </NavLink>
            <NavLink to="/postings" onClick={() => { scrollTo(0,0); }} className={navlink}> Postings </NavLink>
          </nav>

          {/* User Actions */}
          <div className="w-full flex items-center justify-end gap-2 md:gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Link to="/cart" className="relative p-1.5 hover:bg-gray-50 rounded-full transition-colors"> 
                      <ShoppingCart size={20} strokeWidth={1.5} className="text-gray-700" />
                      {cartItemCount > 0 && (
                        <span className="absolute right-0 top-0 w-4 h-4 flex items-center justify-center rounded-full bg-primary text-[8px] text-white font-bold border-2 border-white">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/wishlist" className="relative p-1.5 hover:bg-gray-50 rounded-full transition-colors hidden sm:block"> 
                      <Heart size={20} strokeWidth={1.5} className="text-gray-700" />
                      {wishlist.length > 0 && (
                        <span className="absolute right-0 top-0 w-4 h-4 flex items-center justify-center rounded-full bg-primary text-[8px] text-white font-bold border-2 border-white">
                          {wishlist.length}
                        </span>
                      )}
                  </Link>
                  <Link to={currentMessagesLink} className="relative p-1.5 hover:bg-gray-50 rounded-full transition-colors">
                      <MessageSquare size={19} strokeWidth={1.5} className="text-gray-700" />
                    </Link>
                    <Link to={currentNotificationsLink} className="relative p-1.5 hover:bg-gray-50 rounded-full transition-colors">
                      <Bell size={20} strokeWidth={1.5} className="text-gray-700" />
                    </Link>
                    
                  </div>
                  
                  <div ref={accountRef} className="relative"> 
                    <button 
                      onClick={() => setAccountPopup(!accountPopup)} 
                      className={`flex items-center gap-1.5 md:gap-2 cursor-pointer transition-all duration-200 ${isDashboard ? "bg-gray-50 hover:bg-gray-100 p-1 rounded-full border border-gray-100" : "p-0.5 hover:bg-gray-50 rounded-full"}`}
                    >
                      <div className="relative flex items-center">
                        <AvatarWithFallback 
                          src={user?.avatar} 
                          name={user?.full_name || 'User'} 
                          size="w-7 h-7" 
                        />
                        
                        {isDashboard && currentDashboardLabel && (
                          <div className="lg:hidden flex items-center justify-center ml-1">
                            <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center border border-primary/20 text-primary">
                              {currentDashboardLabel === 'Seller' ? <Store size={12} strokeWidth={2.5} /> : 
                               currentDashboardLabel === 'Buyer' ? <UserIcon size={12} strokeWidth={2.5} /> : 
                               currentDashboardLabel === 'Freelancer' ? <Briefcase size={12} strokeWidth={2.5} /> :
                               currentDashboardLabel === 'Employer' ? <Building2 size={12} strokeWidth={2.5} /> :
                               <span className="text-[10px] font-black">{currentDashboardLabel.charAt(0)}</span>
                              }
                            </div>
                          </div>
                        )}
                      </div>

                      {isDashboard && currentDashboardLabel && (
                        <span className="hidden lg:block text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">
                          {currentDashboardLabel}
                        </span>
                      )}

                      <ChevronDown 
                        size={14} 
                        className={`text-gray-400 transition-all duration-200 ${accountPopup ? "rotate-180" : ""}`} 
                      />
                    </button>
                    {accountPopup && (
                      <AccountPopup 
                        user={user}
                        onLogout={handleLogout}
                        onClose={() => setAccountPopup(false)}
                      />  
                    )}
                  </div>
                </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  className="btn btn-text border border-primary text-primary px-4"
                  onClick={() => openModal("login")}
                >
                  Login
                </button>
                <button 
                  className="btn"
                  onClick={() => openModal("role")}
                >
                  Sign Up
                </button>
              </div>
            )}
            
            {/* {!isDashboard && (
              <button 
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors ml-1" 
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )} */}

            {user && (
              <Link to="/sell" className="hidden xl:flex btn uppercase tracking-widest text-[10px] py-2.5">
                Sell
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden flex flex-col fixed inset-0 w-full h-screen bg-white z-700 transition-all duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full" }`}>
            <div className="h-16 md:h-20 flex items-center justify-between px-4 border-b border-gray-100">
              <Link to="/" onClick={()=> { setIsMenuOpen(false); scrollTo(0,0); }}>
                <img src={Logo} alt="Mosak Hub Logo" className="w-20 md:w-26" />
              </Link>
              <button 
                className="p-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="container py-8 flex flex-col gap-6 items-start overflow-y-auto">
              <NavLink to="/" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Home </NavLink>
              <NavLink to="/marketplace" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Market Place </NavLink>
              <NavLink to="/community" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Community </NavLink>
              <NavLink to="/postings" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Postings </NavLink>
              
              {!isAuthenticated && (
                <div className="flex gap-2.5 mt-4">
                  <button 
                    className="btn btn-tertiary"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal("login");
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="btn"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal("role");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="flex lg:hidden fixed inset-0 top-0 md:top-20 left-0 z-20 w-full h-full bg-black/70 cursor-pointer" onClick={() => { setIsMenuOpen(false)}}></div>
      )}
    </>
  );
};

export default Header;