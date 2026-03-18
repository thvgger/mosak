// layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import DashboardSidebar from '../components/user/DashboardSidebar'; // Your existing sidebar
import { useAuth } from "../contexts/AuthContext";
import BottomNav from '../components/BottomNav';

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Determine which dashboard area we're in
  const isAccount = location.pathname.startsWith('/account');
  const isSeller = location.pathname.startsWith('/seller');
  const isFreelancer = location.pathname.startsWith('/freelancer');
  const isEmployer = location.pathname.startsWith('/employer');
  
  const isDashboard = isAccount || isSeller || isFreelancer || isEmployer;

  return (
    <div className="min-h-screen bg-gray-50 pb-0">
      <Header isAccount={isDashboard} />
      
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
      {/* <BottomNav /> */}
    </div>
  );
};

export default DashboardLayout;