import React, { useState, useEffect, useRef } from "react";
import { House, Store, ShoppingCart, FileText, Plus, Trophy, MessagesSquare, BriefcaseBusiness, SquarePen } from 'lucide-react';
import freelanceIcon from '../assets/bottomNav/freelance-icon.svg';
import communityIcon from '../assets/bottomNav/community-icon.svg';
import leaderboardIcon from '../assets/bottomNav/leaderboard-icon.svg';
import { NavLink, useLocation } from 'react-router-dom';
import "./BottomNav.css";
import { useAuth } from '../contexts/AuthContext';
import { useAuthModal } from '../contexts/AuthModalContext';
import Community from "../assets/bottomNav/community-icon.svg";

const BottomNav = ({ isDashboard }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const { openModal } = useAuthModal();


  const navlink = ({ isActive }) =>
    isActive
      ? "relative text-primary flex flex-col items-center after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:translate-y-2 transition-all duration-300 -translate-y-1.5"
      : "relative flex flex-col items-center text-gray-500/70 hover:text-primary";


  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const navRef = useRef(null);

  const navItems = [
    { to: "/", icon: <House className="icon" size={22} />, label: "Home" },
    { to: "/marketplace", icon: <Store  className="icon" size={22} />, label: "Market Place" },
    { to: "/sell", icon: <Plus className="icon" size={22} />, label: "Sell" },
    { to: "/community", icon: <MessagesSquare className="icon" size={22} />, label: "Community" },
    { to: "/postings", icon: <SquarePen className="icon" size={22} />, label: "Postings" },
  ];

 
  useEffect(() => {
    const updateWidth = () => {
      if (navRef.current) {
        const firstItem = navRef.current.querySelector("li");
        if (firstItem) {
          setItemWidth(firstItem.offsetWidth);
        }
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.to === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }

  }, [location.pathname]);

  const handleSellClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // stop navigation
      openModal('login'); // show login modal
    }
  };





  return (
    <>
      <nav className="navbar lg:hidden!">
        <ul ref={navRef}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={!isDashboard ? activeIndex === index ? "active" : "" : ""}
              onClick={() => { setActiveIndex(index); scrollTo(0,0); }}
            >
              <NavLink
                to={item.to}
                end
                className='text-dark/80'
                // onClick={(e) => {
                //   if (item.label === "Sell") {
                //     handleSellClick(e);
                //   }
                // }}
              >
                {isDashboard ? (
                  <i className={`${item.label === "Sell" ? "-translate-y-4.5 text-white z-20!" : ""}`}>
                    {item.icon}
                  </i>
                ) : item.label === "Community" ? ( 
                  <img src={Community} alt="" className="w-5.5 h-5.5 object-cover brightness-20 opacity-80" />
                ) : (
                  <i>{item.icon}</i>
                )}
                <span className="text">{item.label}</span>
              </NavLink>
            </li>
          ))}

          <span
            className={`indicator ${isDashboard ? "-translate-x-[calc(1/2 +35.5px)]!" : ""}`}
            style={{
              transform: `translateX(${activeIndex * itemWidth + (itemWidth / 2 - 35.5)}px)`
            }}
          ></span>
        </ul>
      </nav>
    </>
  );
};

export default BottomNav;