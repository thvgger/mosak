import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Public Routes
import PublicLayout from '../layouts/PublicLayout';
import Home from "../pages/public/Home";
import MarketPlace from '../pages/public/MarketPlace';
import MarketplacePage from '../pages/public/MarketplacePage';
import ProductDetailPage from '../pages/public/ProductDetailPage';
import Freelance from '../pages/public/Freelance';
import Postings from '../pages/public/Postings';
import HelpCenter from '../pages/public/HelpCenter';
import Faqs from "../pages/public/Faqs.jsx";
import Contact from '../pages/public/Contact.jsx';
import Leaderboards from '../pages/public/Leaderboards.jsx';
import About from '../pages/public/About.jsx';

// Dashboard Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Dashboard Pages
import DashboardPage from '../pages/user/DashboardPage';
import SellerDashboard from '../pages/user/SellerDashboard';
import FreelancerDashboard from '../pages/user/FreelancerDashboard';
import EmployerDashboard from '../pages/user/EmployerDashboard';

// Buyer Pages
import Cart from '../pages/user/Cart';
import Wishlist from "../pages/user/Wishlist";
import Orders from '../pages/user/Orders';
import Messages from '../pages/user/Messages';
import Wallet from '../pages/user/Wallet';
import Disputes from '../pages/user/Disputes';
import Notifications from '../pages/user/Notifications';
import AccountHelp from '../pages/user/AccountHelp';
import Profile from '../pages/user/Profile';
import Badges from '../pages/user/Badges';
import Verifications from '../pages/user/Verifications';
import Security from '../pages/user/Security';
import Preferences from '../pages/user/Preferences';

// Seller Pages
import SellerProducts from '../pages/seller/SellerProducts.jsx';
import SellerOrders from '../pages/seller/SellerOrders.jsx';
import SellerEarnings from '../pages/seller/SellerEarnings.jsx';
import SellerAnalytics from '../pages/seller/SellerAnalytics.jsx';
import SellerStore from '../pages/seller/SellerStore.jsx';

// Freelancer Pages
import FreelancerProjects from '../pages/freelancer/Projects.jsx';
import FreelancerProposals from '../pages/freelancer/Proposals.jsx';
import FreelancerPortfolio from '../pages/freelancer/Portfolio.jsx';

// Employer Pages
import EmployerPostJob from '../pages/employer/PostJob.jsx';
import EmployerProjects from '../pages/employer/Projects.jsx';
import EmployerFindFreelancers from '../pages/employer/FindFreelancers.jsx';

// Community Routes
import CommunityRoutes from '../pages/community';

import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from '../components/ProtectedRoute';
// import RoleBasedRoute from '../components/RoleBasedRoute';

import Checkout from '../pages/user/Checkout.jsx';



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="marketplace" element={<MarketplacePage />}>
          <Route path=":category" element={<MarketplacePage />} />
          <Route path=":category/:subCategory" element={<MarketplacePage />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/freelance/:category" element={<Freelance />} />
        
        {/* Updated Community Route - Now uses nested routes */}
        <Route path="/community/*" element={<CommunityRoutes />} />
        
        <Route path="/postings" element={<Postings />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        
        <Route path='*' element={<NotFound />} />
      </Route>

      {/* Buyer Dashboard Routes */}
      <Route path="/account" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="messages" element={<Messages />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="disputes" element={<Disputes />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="badges" element={<Badges />} />
        <Route path="verifications" element={<Verifications />} />
        <Route path="security" element={<Security />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="help" element={<AccountHelp />} />
      </Route>

      {/* Seller Dashboard Routes */}
      <Route path="/seller" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<SellerDashboard />} />
        <Route path="products" element={<SellerProducts />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="earnings" element={<SellerEarnings />} />
        <Route path="analytics" element={<SellerAnalytics />} />
        <Route path="messages" element={<Messages />} />
        <Route path="disputes" element={<Disputes />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="badges" element={<Badges />} />
        <Route path="verifications" element={<Verifications />} />
        <Route path="security" element={<Security />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="help" element={<AccountHelp />} />
      </Route>

      {/* Freelancer Dashboard Routes */}
      <Route path="/freelancer" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<FreelancerDashboard />} />
        <Route path="projects" element={<FreelancerProjects />} />
        <Route path="proposals" element={<FreelancerProposals />} />
        <Route path="earnings" element={<Wallet />} />
        <Route path="portfolio" element={<FreelancerPortfolio />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="badges" element={<Badges />} />
        <Route path="verifications" element={<Verifications />} />
        <Route path="security" element={<Security />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="help" element={<AccountHelp />} />
      </Route>

      {/* Employer Dashboard Routes */}
      <Route path="/employer" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<EmployerDashboard />} />
        <Route path="post-job" element={<EmployerPostJob />} />
        <Route path="projects" element={<EmployerProjects />} />
        <Route path="freelancers" element={<EmployerFindFreelancers />} />
        <Route path="proposals" element={<FreelancerProposals />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="badges" element={<Badges />} />
        <Route path="verifications" element={<Verifications />} />
        <Route path="security" element={<Security />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="help" element={<AccountHelp />} />
      </Route>

      <Route path="/checkout/*" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;