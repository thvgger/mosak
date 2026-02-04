import { useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/mosalak-logo.png";
import { X, Menu } from 'lucide-react';
import RolePopup from "./RolePopup";
import SignupPopup from "./SignupPopup";
import LoginPopup from "./LoginPopup";
import { ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import AccountPopup from "./AccountPopup";
import { useAuth } from "../../contexts/AuthContext";
import { useShopping } from "../../contexts/ShoppingContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItemCount, wishlist, cartTotal } = useShopping();
  const [accountPopup, setAccountPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const accountRef = useRef();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navlink = ({isActive}) => isActive ? 
    "text-primary font-medium text-sm text-gray-700 hover:text-primary underline" : 
    "font-medium text-sm text-gray-700 hover:text-primary";

  const handleClosePopup = () => {
    setActivePopup(null);
    setSelectedRole(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  const handleRoleContinue = (role) => {
    setSelectedRole(role);
    setActivePopup("signup");
  };

  const handleLogout = () => {
    logout();
    setAccountPopup(false);
    navigate('/');
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setActivePopup(null);
  };

  // Handle successful signup
  const handleSignupSuccess = () => {
    setActivePopup(null);
    setSelectedRole(null);
  };

  return (
    <>
      <header className="sticky top-0 z-60 bg-white md:bg-white/60 backdrop-blur-md shadow h-16 md:h-20">
        <div className="container w-full h-full flex items-center justify-between gap-6 relative z-60">
          <Link to="/" className="w-fit h-fit ">
            <img src={Logo} alt="Mosalak Hub Logo" className="w-38 md:w-52" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 w-fit mx-auto flex-1">
            <NavLink to="/marketplace" className={navlink}> Market Place </NavLink>
            <NavLink to="/freelancers" className={navlink}> Freelancers </NavLink>
            <NavLink to="/community" className={navlink}> Community </NavLink>
            <NavLink to="/postings" className={navlink}> Postings </NavLink>
            <NavLink to="/leaderboards" className={navlink}> Leaderboards </NavLink>
          </nav>

          {/* User Actions */}
          <div className="w-fit flex items-center justify-end gap-2.5">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <div className="space-x-4 flex">
                  <Link to="/cart" className="text-sm text-dark/80 flex items-center gap-2 cursor-pointer relative"> 
                    <span className="hidden md:inline-flex"> Cart </span>
                    <ShoppingCart size={22} strokeWidth={1.5} className="text-primary" />
                    {cartItemCount > 0 && (
                      <span className="absolute -right-1.5 -top-1 w-4 h-4 flex items-center justify-center rounded-full bg-white border border-[#1B6392]/70 text-[9px] text-[#1B6392]/70 font-medium">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/wishlist" className="text-sm text-dark/80 flex items-center gap-2 cursor-pointer relative"> 
                    <span className="hidden md:inline-flex"> Wishlist </span>
                    <Heart size={22} strokeWidth={1.5} className="text-primary text-xs" />
                    {wishlist.length > 0 && (
                      <span className="absolute -right-1.5 -top-1 w-4 h-4 flex items-center justify-center rounded-full bg-white border border-[#1B6392]/70 text-[9px] text-[#1B6392]/70 font-medium">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                  <div ref={accountRef} className="text-sm text-dark/80 cursor-pointer relative"> 
                    <button onClick={() => setAccountPopup(!accountPopup)} className="flex items-center gap-0.5 cursor-pointer">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                      ) : (
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary md:hidden flex items-center justify-center">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      )}
                      <span className="hidden md:inline-flex ml-2"> {user?.name?.split(' ')[0] || 'Account'} </span>
                      <ChevronDown size={16} strokeWidth={1.5} className={`transition-all duration-200 ${accountPopup ? "rotate-180" : ""}`} />
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
              </div>
            ) : (
              <div className="space-x-2.5 flex">
                <button 
                  className="btn btn-text px-4"
                  onClick={() => setActivePopup("login")}
                >
                  Login
                </button>
                <button 
                  className="btn"
                  onClick={() => setActivePopup("role")}
                >
                  Sign Up
                </button>
              </div>
            )}
            
            <button className="lg:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(prev => !prev)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden flex fixed left-0 top-16 md:top-20 w-[68vh] h-screen bg-white z-60 py-6 transition-all duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full" }`}>
            <div className="container flex flex-col gap-6 items-start">
              <NavLink to="/marketplace" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Market Place </NavLink>
              <NavLink to="/freelancers" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Freelancers </NavLink>
              <NavLink to="/community" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Community </NavLink>
              <NavLink to="/postings" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Postings </NavLink>
              <NavLink to="/leaderboards" className={navlink} onClick={()=> { setIsMenuOpen(false); }}> Leaderboards </NavLink>
              
              {!isAuthenticated && (
                <div className="space-x-2.5 flex md:hidden">
                  <button 
                    className="btn btn-tertiary"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActivePopup("login");
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="btn"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActivePopup("role");
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

      {/* Popup Overlay */}
      {activePopup && (
        <div 
          className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {activePopup === "role" && (
            <RolePopup
              onClose={handleClosePopup}
              onContinue={handleRoleContinue}
              onSignInClick={() => setActivePopup("login")}
            />
          )}

          {activePopup === "signup" && (
            <SignupPopup
              onClose={handleClosePopup}
              onSignInClick={() => setActivePopup("login")}
              selectedRole={selectedRole}
              onSuccess={handleSignupSuccess}
            />
          )}

          {activePopup === "login" && (
            <LoginPopup
              onClose={handleClosePopup}
              onCreateAccountClick={() => {
                setSelectedRole(null);
                setActivePopup("role");
              }}
              onSuccess={handleLoginSuccess}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;