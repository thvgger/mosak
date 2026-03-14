import React, { useState, useEffect, useRef } from "react";
import { House, ShoppingCart, FileText, Plus, Trophy, MessagesSquare, BriefcaseBusiness } from 'lucide-react';
import freelanceIcon from '../assets/bottomNav/freelance-icon.svg';
import communityIcon from '../assets/bottomNav/community-icon.svg';
import leaderboardIcon from '../assets/bottomNav/leaderboard-icon.svg';
import { NavLink } from 'react-router-dom';
import "./BottomNav.css";

const BottomNav = () => {
  const navlink = ({ isActive }) =>
    isActive
      ? "relative text-primary flex flex-col items-center after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:translate-y-2 transition-all duration-300 -translate-y-1.5"
      : "relative flex flex-col items-center text-gray-500/70 hover:text-primary";

  const navList = [
    { name: 'Home', icon: House, to: '/' },
    { name: 'Market Place', icon: ShoppingCart, to: '/marketplace' },
    // { name: 'Freelance', icon: BriefcaseBusiness, to: '/freelance' },
    { name: 'Sell', to: '/seller/products', target: true},
    { name: 'Community', icon: MessagesSquare, to: '/community' },
    { name: 'Postings', icon: FileText, to: '/postings' },
    // { name: 'Leaderboards', icon: Trophy, to: '/leaderboards' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const navRef = useRef(null);

  const navItems = [
    { to: "/", icon: <House className="icon" />, label: "Home" },
    { to: "/marketplace", icon: <ShoppingCart className="icon" />, label: "Market Place" },
    { to: "/seller/products", icon: <Plus className="icon" />, label: "Sell" },
    { to: "/community", icon: <MessagesSquare className="icon" />, label: "Community" },
    { to: "/postings", icon: <FileText className="icon" />, label: "Postings" },
  ];

  useEffect(() => {
    if (navRef.current) {
      const firstItem = navRef.current.querySelector("li");
      if (firstItem) {
        setItemWidth(firstItem.offsetWidth);
      }
    }

    // Update on window resize
    const handleResize = () => {
      if (navRef.current) {
        const firstItem = navRef.current.querySelector("li");
        if (firstItem) {
          setItemWidth(firstItem.offsetWidth);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="w-full max-w-lg mx-auto items-center justify-center hidden fixed left-1/2 -translate-x-1/2 z-50 bottom-0 border-t border-white/50 bg-[#E3EDF7]/70 backdrop-blur-lg p-4.5 px-6 text-center rounded-t-2xl">
        <ul className="w-full flex items-center gap-1.5 justify-between text-[10px]">
          {navList.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                onClick={() => scrollTo(0, 0)}
                to={item.to}
                key={index}
                className={navlink}
                title={item.name}
              >
                {Icon ? (
                  <Icon size={23} className={item.target ? "" : ""} />
                ) : (
                  <span className='bg-primary text-white border-3 border-white p-4 rounded-full shadow-md w-14 h-14 -mt-14 flex items-center justify-center text-sm font-light'> Sell </span>
                )}

                {!item.target && (
                  <span>
                    {item.name}
                  </span>
                )}




                {/* {!Icon && item.name === 'Freelance' && (
                  <img src={freelanceIcon} alt="Freelance Icon" className="w-6 h-6" />
                  )} */}
                {/* {!Icon && item.name === 'Community' && (
                  <img src={communityIcon} alt="Community Icon" className="w-6 h-6" />
                  )} */}
                {/* {!Icon && item.name === 'Leaderboards' && (
                  <img src={leaderboardIcon} alt="Leaderboards Icon" className="w-6 h-6" />
                  )} */}
              </NavLink>
            );
          })}
        </ul>
      </nav>


      <nav className="navbar">
        <ul ref={navRef}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
            >
              <NavLink to={item.to}>
                {item.icon}
                <span className="text">{item.label}</span>
              </NavLink>
            </li>
          ))}
          <span
            className="indicator"
            style={{ transform: `translateX(${activeIndex * itemWidth}px)` }}
          ></span>
        </ul>
      </nav>
    </>
  );
};

export default BottomNav;