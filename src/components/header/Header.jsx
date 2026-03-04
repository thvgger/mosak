import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/mosalak-logo.png";
import avatar from "../../assets/avatar.png";
import { X, Menu, MessageSquare, Bell } from 'lucide-react';
import { ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import AccountPopup from "./AccountPopup";
import { useAuth } from "../../contexts/AuthContext";
import { useShopping } from "../../contexts/ShoppingContext";
import { useAuthModal } from "../../contexts/AuthModalContext"; 

const Header = ({ isAccount, isCommunity }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItemCount, wishlist } = useShopping();
  const { openModal } = useAuthModal();
  
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
      // Check if accountPopup is open and click is outside the accountRef
      if (accountPopup && accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountPopup(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountPopup]); 

  
  useEffect(() => {
    if (isMenuOpen) {
      setAccountPopup(false);
    }
  }, [isMenuOpen]);
  

  return (
    <>
      <header className={`${isCommunity ? "relative" : "sticky"}  top-0 z-60 bg-white md:bg-white/60 backdrop-blur-md shadow h-16 md:h-20`}>
        <div className="container w-full h-full flex items-center justify-between gap-6 relative z-60">
          <Link to="/" className="w-fit h-fit " onClick={()=> { setIsMenuOpen(false); }}>
            <img src={Logo} alt="Mosalak Hub Logo" className="w-20 md:w-28 object-cover" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 w-fit mx-auto flex-1">
            <NavLink to="/marketplace" className={navlink}> Market Place </NavLink>
            <NavLink to="/freelance" className={navlink}> Freelance </NavLink>
            <NavLink to="/community" className={navlink}> Community </NavLink>
            <NavLink to="/postings" className={navlink}> Postings </NavLink>
            <NavLink to="/leaderboards" className={navlink}> Leaderboards </NavLink>
          </nav>

          {/* User Actions */}
          <div className="w-fit flex items-center justify-end gap-2.5">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {!isAccount && (
                  <div className="space-x-4 flex">
                    <Link to="/cart" className="relative"> 
                      <ShoppingCart size={22} strokeWidth={1.5} className="text-primary" />
                      {cartItemCount > 0 && (
                        <span className="absolute -right-1.5 -top-1 w-4 h-4 flex items-center justify-center rounded-full bg-white border border-[#1B6392]/70 text-[9px] text-[#1B6392]/70 font-medium">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/wishlist" className="relative"> 
                      <Heart size={22} strokeWidth={1.5} className="text-primary" />
                      {wishlist.length > 0 && (
                        <span className="absolute -right-1.5 -top-1 w-4 h-4 flex items-center justify-center rounded-full bg-white border border-[#1B6392]/70 text-[9px] text-[#1B6392]/70 font-medium">
                          {wishlist.length}
                        </span>
                      )}
                    </Link>
                    <Link to="/account/messages" className="relative">
                      <MessageSquare size={19} strokeWidth={1.5} className="text-primary" />
                    </Link>
                    <Link to="/account/notifications" className="relative">
                      <Bell size={20} strokeWidth={1.5} className="text-primary" />
                    </Link>
                  </div>
                )}
                  <div ref={accountRef} className="text-sm text-dark/80 cursor-pointer relative"> 
                    <button 
                      onClick={() => setAccountPopup(!accountPopup)} 
                      className="flex items-center gap-0.5 cursor-pointer"
                    >
                      <img src={user?.avatar || avatar} alt={user?.name || 'User'} className="w-7 h-7 rounded-full object-cover" />
                      <ChevronDown 
                        size={16} 
                        strokeWidth={1.5} 
                        className={`transition-all duration-200 ${accountPopup ? "rotate-180" : ""}`} 
                      />
                    </button>
                    {accountPopup && (
                      <AccountPopup 
                        isAccount={isAccount}
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
                    onClick={() => openModal("login")} // Use global modal
                  >
                    Login
                  </button>
                  <button 
                    className="btn"
                    onClick={() => openModal("role")} // Use global modal
                  >
                    Sign Up
                  </button>
                </div>
              )
            )}
            
            {isCommunity && (
              <button className="lg:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(prev => !prev)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden flex fixed left-0 top-16 md:top-20 w-[68vh] h-screen bg-white z-60 py-6 transition-all duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full" }`}>
            <div className="container flex flex-col gap-6 items-start">
              <NavLink to="/marketplace" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Market Place </NavLink>
              <NavLink to="/freelance" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Freelance </NavLink>
              <NavLink to="/community" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Community </NavLink>
              <NavLink to="/postings" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Postings </NavLink>
              <NavLink to="/leaderboards" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Leaderboards </NavLink>
              
              {!isAuthenticated && (
                <div className="space-x-2.5 flex md:hidden">
                  <button 
                    className="btn btn-tertiary"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal("login"); // Use global modal
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="btn"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal("role"); // Use global modal
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
        <div className="flex lg:hidden fixed inset-0 top-16 md:top-20 left-0 z-20 w-full h-full bg-black/70 cursor-pointer" onClick={() => { setIsMenuOpen(false)}}></div>
      )}
    </>
  );
};

export default Header;