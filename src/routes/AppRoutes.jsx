import React from 'react'
import { Route, Routes } from 'react-router-dom';

// Public Routes
import PublicLayout from '../layouts/PublicLayout';
import Home from "../pages/public/Home";
import MarketPlace from '../pages/public/MarketPlace';
import MarketplacePage from '../pages/public/MarketplacePage';
import ProductDetailPage from '../pages/public/ProductDetailPage';
import Freelancers from '../pages/public/Freelancers';
import Community from '../pages/public/Community';
import Postings from '../pages/public/Postings';
import HelpCenter from '../pages/public/HelpCenter';
import Faqs from "../pages/public/Faqs.jsx";
import Contact from '../pages/public/Contact.jsx';
import Leaderboards from '../pages/public/Leaderboards.jsx';

// User Routes
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import DashboardPage from '../pages/user/DashboardPage.jsx';
import Cart from '../pages/user/Cart';
import Wishlist from "../pages/user/Wishlist";
import Checkout from '../pages/user/Checkout.jsx';
import Orders from '../pages/user/Orders';
import Messages from '../pages/user/Messages.jsx';
import Wallet from '../pages/user/Wallet.jsx';
import Disputes from '../pages/user/Disputes.jsx';
import Notifications from '../pages/user/Notifications.jsx';
import Profile from '../pages/user/Profile.jsx';

// Auth Components
// import LoginPage from '../pages/public/LoginPage.jsx';
// import SignupPage from '../pages/public/SignupPage.jsx';

import NotFound from '../pages/NotFound.jsx';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes className="font-body">
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="marketplace" element={<MarketplacePage />}>
          <Route path=":category" element={<MarketplacePage />} />
          <Route path=":category/:subCategory" element={<MarketplacePage />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/community" element={<Community />} />
        <Route path="/postings" element={<Postings />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Pages */}
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        
        <Route path='*' element={<NotFound />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/account" element={
        <ProtectedRoute>
          <UserDashboardLayout />
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
      </Route>

      {/* Protected Shopping Routes */}
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
      <Route path="/checkout/*" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes;