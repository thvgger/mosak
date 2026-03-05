import React from 'react';
import { House, ShoppingCart, FileText, Plus, Trophy, MessagesSquare, BriefcaseBusiness } from 'lucide-react';
import freelanceIcon from '../assets/bottomNav/freelance-icon.svg';
import communityIcon from '../assets/bottomNav/community-icon.svg';
import leaderboardIcon from '../assets/bottomNav/leaderboard-icon.svg';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navlink = ({ isActive }) =>
    isActive
      ? "relative text-primary flex flex-col items-center after:content-[''] after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:translate-y-2 transition-all duration-300 -translate-y-1.5"
      : "relative flex flex-col items-center text-gray-500/70 hover:text-primary";

  const navList = [
    { name: 'Home', icon: House, to: '/' },
    { name: 'Market', icon: ShoppingCart, to: '/marketplace' },
    { name: 'Freelance', icon: BriefcaseBusiness, to: '/freelance' },
    { name: 'Sell', icon: Plus, to: '/sell', target: true},
    { name: 'Community', icon: MessagesSquare, to: '/community' },
    { name: 'Postings', icon: FileText, to: '/postings' },
    { name: 'Leaderboards', icon: Trophy, to: '/leaderboards' }
  ];

  return (
    <nav className="w-full max-w-lg mx-auto flex items-center justify-center sm:hidden fixed left-1/2 -translate-x-1/2 z-50 bottom-0 border-t border-white/50 bg-[#E3EDF7]/70 backdrop-blur-lg p-4.5 text-center rounded-t-2xl">
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
              {Icon && <Icon size={20} className={item.target ? "bg-primary text-white p-4 rounded-full w-14 h-14 -mt-11" : ""} />}
              {/* <span>
                {item.name}
              </span> */}

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
  );
};

export default BottomNav;