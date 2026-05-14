import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ChevronRight, 
  Shield, 
  Star, 
  Award, 
  Handbag, 
  Wallet, 
  ShieldCheck, 
  BadgeCheck, 
  CircleCheckBig,
  Clock,
  CheckCircle,
  Package,
  Plus,
  Zap,
  Gift,
  Search,
  ShoppingBag,
  Bell,
  Settings,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import silver from "../../assets/badges/silver.png";
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data for stats
  const stats = [
    {
      label: 'Active Orders',
      value: '2',
      change: '+3 this week',
      icon: Handbag,
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      period: 'In progress'
    },
    {
      label: 'Wallet Balance',
      value: '₦450,000',
      subtitle: 'Available to spend',
      icon: Wallet,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      period: ''
    },
    {
      label: 'Funds in Escrow',
      value: '₦125,000',
      subtitle: 'Secured payments',
      icon: Shield,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      period: ''
    },
    {
      label: 'Available Points',
      value: '3,450',
      subtitle: 'Redeem for rewards',
      icon: Star,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-500',
      period: ''
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Welcome back, {user?.full_name || 'Buyer'}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-xs text-white font-bold rounded-lg flex items-center gap-1.5 border border-white/10">
              <img src={silver} alt='' className='w-4 h-4' />
              SILVER MEMBER
            </span>
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg flex items-center gap-1.5 border border-white/10">
              <BadgeCheck size={14} />
              {user?.kyc_status || 'STANDARD'} BUYER
            </span>
          </div>
        </div>
        
        {/* <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-primary hover:bg-white/90 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Explore Marketplace
          </button>
        </div> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.iconColor}`} />
                </div>
                {stat.change && (
                  <span className="text-primary text-[10px] font-bold bg-primary/10 px-2 py-1 rounded-lg whitespace-nowrap">
                    {stat.change}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - KYC & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* KYC Verification Status */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Verification Status</h3>
                <p className="text-sm text-gray-500">Upgrade your level to increase transaction limits</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase">
                Level 2
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-green-100">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Current Level</p>
                    <p className="text-base font-bold text-gray-900">Level 2 Standard</p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle size={12} /> Limit: ₦500,000 / txn
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>Progress to Level 3</span>
                    <span className="text-gray-900">66%</span>
                  </div>
                  <div className="h-2.5 bg-white rounded-full overflow-hidden border border-gray-100">
                    <div className="h-full bg-linear-to-r from-green-600 to-green-400 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  <button 
                    onClick={() => navigate('/account/settings/kyc')}
                    className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Complete Verification
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Membership */}
        <div className="space-y-6">
          {/* Membership Card */}
          <div className="bg-linear-to-br from-amber-400 to-yellow-600 rounded-3xl p-8 shadow-lg relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-4 p-8 opacity-20 group-hover:scale-110 transition-transform">
              <Award size={140} className="text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                  <Award size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Gold Member</h3>
                  <p className="text-xs text-white/80 font-medium">Since Jan 2026</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-white uppercase tracking-widest">
                    <span>Platinum Progress</span>
                    <span>60%</span>
                  </div>
                  <div className="h-2.5 bg-black/10 rounded-full overflow-hidden border border-white/20">
                    <div className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-0.5">
                    <p className="text-2xl font-bold text-white">1,550</p>
                    <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">To Platinum</p>
                  </div>
                  <button 
                    onClick={() => navigate('/account/settings/badges')}
                    className="px-4 py-2 bg-white text-yellow-600 text-[10px] font-bold rounded-lg hover:bg-white/90 transition-all uppercase tracking-wider shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Points Card - OG Bottom Position */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className='flex items-center gap-4'>
            <div className='bg-amber-50 p-4 rounded-2xl text-amber-500 shadow-xs'>
              <Star size={28} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Points</p>
              <h3 className="text-3xl font-bold text-gray-900">3,450</h3>
            </div>
          </div>
          
          {/* <div className="flex-1 max-w-md">
            <p className="text-xs text-gray-500 leading-relaxed">
              Earn points with every purchase and referral. Redeem points for exclusive discounts and membership upgrades.
            </p>
          </div> */}
          
          <button 
            onClick={() => navigate('/account/referrals')}
            className='flex items-center justify-between gap-4 px-6 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-xs font-bold text-gray-700'
          >
            <span>Ways to earn points</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;