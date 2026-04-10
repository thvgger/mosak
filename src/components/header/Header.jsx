// components/header/Header.jsx (updated section)
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

   // Debug: Log user data
  // console.log('Header - user:', user);
  // console.log('Header - isAuthenticated:', isAuthenticated);
  
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
      <header className={`${isCommunity ? "relative" : "sticky"}  top-0 z-600 bg-white md:bg-white/60 backdrop-blur-md shadow h-16 md:h-20`}>
        <div className="container w-full h-full flex items-center justify-between gap-0 relative z-60">
          {/* Mobile Menu Toggle Button */}
          {isDashboard && (
            <button
              onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen); }}
              className="lg:hidden md:top-20 left-0 z-40 p-2 bg-white hover:bg-gray-100 rounded-lg w-fit"
            >
              {isMobileMenuOpen ? <X size={24} className="text-gray-500" /> : <PanelRightClose className="text-gray-500" size={24} />}
            </button>
          )}
          <div className="w-full h-full flex items-center">
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
          <div className="w-full flex items-center justify-end gap-2.5">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                  <div className="space-x-4 flex">
                    <Link to="/cart" className="relative"> 
                      <ShoppingCart size={21} strokeWidth={1.5} className="" />
                      {cartItemCount > 0 && (
                        <span className="absolute -right-1.5 -top-1 w-4 h-4 flex items-center justify-center rounded-full bg-[#EF4444] text-[9px] text-white font-medium">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/wishlist" className="relative"> 
                      <Heart size={21} strokeWidth={1.5} className="" />
                      {wishlist.length > 0 && (
                        <span className="absolute -right-1.5 -top-1 w-4 h-4 flex items-center justify-center rounded-full bg-[#EF4444] text-[9px] text-white font-medium">
                          {wishlist.length}
                        </span>
                      )}
                    </Link>
                    <Link to="/account/messages" className="relative">
                      <MessageSquare size={19} strokeWidth={1.5} className="" />
                    </Link>
                    <Link to="/account/notifications" className="relative">
                      <Bell size={20} strokeWidth={1.5} className="" />
                    </Link>
                  </div>
                  <div ref={accountRef} className="text-sm text-dark/80 relative"> 
                    <button 
                      onClick={() => setAccountPopup(!accountPopup)} 
                      className="flex items-center gap-0.5 cursor-pointer"
                    >
                      {user.avatar ? (
                        <img src={user?.avatar || avatar} alt={user?.name || 'User'} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full">
                          {user?.full_name.charAt(0)}
                        </span>
                      )}
                      <ChevronDown 
                        size={16} 
                        strokeWidth={1.5} 
                        className={`transition-all duration-200 ${accountPopup ? "rotate-180" : ""}`} 
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
              !isCommunity && (
                <div className="space-x-2.5 flex">
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
              )
            )}
            
            {!isDashboard && isCommunity && (
              <button className="lg:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(prev => !prev)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            )}

            {user && (
              <Link to="/sell" className="hidden md:flex btn uppercase">
                Sell
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden flex fixed left-0 top-16 md:top-20 w-[75vw] sm:w-[50vw] h-screen bg-white z-60 py-6 transition-all duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full" }`}>
            <div className="container flex flex-col gap-6 items-start">
              <NavLink to="/" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Home </NavLink>
              <NavLink to="/marketplace" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Market Place </NavLink>
              {/* <NavLink to="/freelance" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Freelance </NavLink> */}
              <NavLink to="/community" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Community </NavLink>
              <NavLink to="/postings" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Postings </NavLink>
              {/* <NavLink to="/leaderboards" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Leaderboards </NavLink> */}
              
              {!isAuthenticated && (
                <div className="space-x-2.5 flex md:hidden">
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