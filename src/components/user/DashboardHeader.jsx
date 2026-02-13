import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../assets/mosalak-logo.png";


const DashboardHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="px-6 py-4 flex items-center justify-between gap-1">
        <button className="lg:hidden mr-1">
          <Menu size={24} />
        </button>
        <Link to="/" className=" flex-1">
          <img src={logo} alt='' className='h-fit w-40' />
        </Link>

        {/* <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div> */}
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden md:block">
              <p className="font-semibold">Chioma Adeleke</p>
              <p className="text-sm text-gray-500">SILVER • VERIFIED</p>
            </div>
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              CA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;