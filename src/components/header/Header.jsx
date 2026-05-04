// components/header/Header.jsx (updated section)
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/mosalak-logo.png";
import avatar from "../../assets/avatar.png";
import { X, Menu, MessageSquare, Bell } from 'lucide-react';
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
                      className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${isDashboard ? "bg-gray-50 hover:bg-gray-100 p-1 rounded-full border border-gray-100" : "p-0.5 hover:bg-gray-50 rounded-full"}`}
                    >
                      <AvatarWithFallback 
                        src={user?.avatar} 
                        name={user?.full_name || 'User'} 
                        size="w-7 h-7" 
                      />

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
                  className="hidden xs:flex px-4 py-2 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/5 rounded-xl transition-all"
                  onClick={() => openModal("login")}
                >
                  Login
                </button>
                <button 
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all"
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
          <div className={`lg:hidden flex fixed left-0 top-16 md:top-20 w-[80vw] sm:w-80 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] bg-white z-60 transition-all duration-400 ease-in-out border-r border-gray-100 shadow-2xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full" }`}>
            <div className="w-full flex flex-col p-8 bg-white h-full">
              <nav className="flex flex-col gap-8 items-start mb-auto">
                <NavLink to="/" className="text-lg font-bold text-gray-900 hover:text-primary transition-colors" onClick={()=> { setIsMenuOpen(false); }}> Home </NavLink>
                <NavLink to="/marketplace" className="text-lg font-bold text-gray-900 hover:text-primary transition-colors" onClick={()=> { setIsMenuOpen(false); }}> Market Place </NavLink>
                <NavLink to="/community" className="text-lg font-bold text-gray-900 hover:text-primary transition-colors" onClick={()=> { setIsMenuOpen(false); }}> Community </NavLink>
                <NavLink to="/postings" className="text-lg font-bold text-gray-900 hover:text-primary transition-colors" onClick={()=> { setIsMenuOpen(false); }}> Postings </NavLink>
              </nav>
              
              {!isAuthenticated && (
                <div className="flex flex-col gap-3 pt-8 border-t border-gray-50">
                  <button 
                    className="w-full py-4 border border-gray-200 text-gray-700 font-bold rounded-2xl text-sm uppercase tracking-widest hover:bg-gray-50"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal("login");
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl text-sm uppercase tracking-widest shadow-lg shadow-blue-600/20"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal("role");
                    }}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {isAuthenticated && (
                <div className="pt-8 border-t border-gray-50 mt-8">
                  <Link 
                    to="/sell" 
                    className="w-full flex items-center justify-center py-4 bg-primary text-white font-bold rounded-2xl text-sm uppercase tracking-widest shadow-lg shadow-blue-600/20 mb-8"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sell Something
                  </Link>
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