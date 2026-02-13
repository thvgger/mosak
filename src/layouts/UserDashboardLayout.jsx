import React from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import DashboardSidebar from '../components/user/DashboardSidebar';
import Header from '../components/header/Header';
import { useAuth } from "../contexts/AuthContext";

const UserDashboardLayout = () => {
  const location = useLocation();
  const isAccount = location.pathname.startsWith('/account');

   const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAccount={isAccount} />
      
      <div className="flex">
        <DashboardSidebar />
        
        {/* Main Content - Responsive padding and margin */}
        <main className="
          flex-1 
          transition-all duration-300
          py-4 md:py-8 px-4 sm:px-6 lg:px-8
          lg:ml-64
          min-h-screen
          overflow-x-hidden
        ">
          <div className="w-full max-w-7xl mx-auto overflow-x-hidden">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;