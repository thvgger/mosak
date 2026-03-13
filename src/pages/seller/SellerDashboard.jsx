// pages/seller/SellerDashboard.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, 
  ChevronRight, 
  Shield, 
  Award, 
  Wallet,
  Package,
  Clock,
  AlertCircle,
  CheckCircle,
  Upload,
  Plus,
  Eye,
  MoreHorizontal,
  Star,
  Gift,
  Zap,
  Users,
  DollarSign,
  BarChart3,
  Download,
  Filter,
  ShieldCheck
} from 'lucide-react';
import silver from "../../assets/badges/silver.png";

const SellerDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for stats
  const stats = [
    {
      label: 'Total Sales',
      value: 'N2,450,000',
      change: '+12.5%',
      icon: DollarSign,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      period: 'This month'
    },
    {
      label: 'Pending Escrow',
      value: 'N850,000',
      subtitle: 'Awaiting delivery',
      icon: Shield,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      period: ''
    },
    {
      label: 'Orders to Ship',
      value: '12',
      subtitle: 'Action needed',
      icon: Package,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      period: ''
    },
    {
      label: 'Available Balance',
      value: 'N1,245,000',
      subtitle: 'Withdraw anytime',
      icon: Wallet,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      period: ''
    }
  ];

  // Mock data for active orders
  const activeOrders = [
    {
      id: 'ORD-8472',
      product: 'iPhone 15 Pro Max 256GB',
      buyer: 'Chidima O.',
      amount: '₦1,250,000',
      status: 'Pending Payment',
      statusColor: 'bg-yellow-100 text-yellow-700',
      time: '2h ago',
      icon: Clock
    },
    {
      id: 'ORD-2024-1547',
      product: 'iPhone 15 Pro Max 256GB',
      buyer: 'Chidima O.',
      amount: '₦1,250,000',
      status: 'Pending Payment',
      statusColor: 'bg-yellow-100 text-yellow-700',
      time: 'Dec 20, 2024',
      icon: Clock
    },
    {
      id: 'ORD-2024-1548',
      product: 'iPhone 15 Pro Max 256GB',
      buyer: 'Chidima O.',
      amount: '₦1,250,000',
      status: 'In Escrow',
      statusColor: 'bg-blue-100 text-blue-700',
      time: 'Dec 20, 2024',
      icon: Shield
    },
    {
      id: 'ORD-2024-1549',
      product: 'iPhone 15 Pro Max 256GB',
      buyer: 'Chidima O.',
      amount: '₦1,250,000',
      status: 'In Escrow',
      statusColor: 'bg-blue-100 text-blue-700',
      time: 'Dec 20, 2024',
      icon: Shield
    },
    {
      id: 'ORD-2024-1550',
      product: 'iPhone 15 Pro Max 256GB',
      buyer: 'Chidima O.',
      amount: '₦1,250,000',
      status: 'Shipped',
      statusColor: 'bg-green-100 text-green-700',
      time: 'Dec 20, 2024',
      icon: CheckCircle
    }
  ];

  // Quick actions
  const quickActions = [
    { label: 'Add New Product', description: 'List items for sale', icon: Upload, color: 'bg-blue-500' },
    { label: 'Boost Listing', description: 'Increase visibility', icon: Zap, color: 'bg-purple-500' },
    { label: 'Verify Account', description: 'Build trust', icon: Shield, color: 'bg-green-500' },
    { label: 'Withdraw Funds', description: 'Transfer to bank', icon: Wallet, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
      <div className="mb-6">
        {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Dashboard</span>
          <ChevronRight size={14} />
          <span className="text-gray-700">Overview</span>
        </div> */}
        
        {/* Welcome Section */}
        <div className="bg-primary rounded-lg p-6 flex flex-col items-start flex-wrap justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Welcome back, Chioma Adeleke</h1>
            <div className="flex items-center space-x-2 mt-4">
              <span className="px-3 py-1.5 bg-gray-200 text-xs text-gray-500 font-medium rounded-md flex items-center gap-1">
                <img src={silver} alt='' className='object-cover w-5 mx-auto h-fit' />
                SILVER
              </span>
              <span className="px-3 py-2 bg-gray-100 text-primary text-xs font-medium rounded-md flex items-center gap-1">
                <ShieldCheck size={16} />
                VERIFIED SELLER
              </span>
            </div>
          </div>
          
          {/* Period Selector */}
          {/* <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <button 
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedPeriod === 'week' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedPeriod === 'month' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setSelectedPeriod('year')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedPeriod === 'year' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Year
            </button>
          </div> */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp size={16} />
                    {stat.change}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              {stat.subtitle && (
                <p className="text-xs text-gray-400">{stat.subtitle}</p>
              )}
              {stat.period && (
                <p className="text-xs text-gray-400 mt-2">{stat.period}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - KYC & Member Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* KYC Verification Status */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">KYC Verification Status</h3>
                <p className="text-sm text-gray-500">Your account verification level</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Level 2
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield size={20} className="text-green-600" />
                  <span className="font-medium">Level 2 Standard</span>
                </div>
                <span className="text-sm text-green-600">✓ Verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Current Transaction Limit</p>
                  <p className="text-lg font-bold">₦500,000</p>
                  <p className="text-xs text-gray-400">per transaction</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Verification Progress</span>
                    <span className="font-medium">2 of 3 Levels</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-600 to-green-400 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  <button className="w-full py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                    Upgrade to Level 3
                  </button>
                </div>
              </div>
            </div>
          </div>
          

          {/* Current Plan */}
          <div className='flex items-start gap-4'>
            <div className="w-[60%] bg-primary text-white! rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold ">Current Plan</h3>
                <Gift size={20} className="text-gray-400" />
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Pro Verified</p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      25% search ranking boost
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Priority support
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₦4,000</p>
                  <p className="text-xs">/month</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Available Points</span>
                  <span className="font-semibold">3,450</span>
                </div>
              </div>
            </div>

          <div className="w-[40%] h-full bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className='flex items-center gap-3 mb-4'>
              <span className='bg-yellow-100 p-3 rounded-full'>
                <Star size={20} strokeWidth={2} className='text-yellow-500' />
              </span>
              <h3 className="text-xs font-normal text-gray-500"> 
                Available Points 
                <span className='text-xl text-dark font-bold flex'> 3,450 </span>
              </h3>
            </div>
            
            <div className='flex items-center flex-wrap justify-between gap-4 text-sm text-gray-500'>
              <span> 
                Ways to earn points
              </span>    
              <span className='flex items-center gap-2 hover:underline cursor-pointer'>
                View Activities
                <ChevronRight size={16} />
              </span>
            </div>
            </div>
          </div>
        </div>

     
        {/* Gold Member Card */}
        <div className="bg-linear-to-br from-amber-400 to-yellow-600 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Award size={32} className="text-white" />
              <div>
                <h3 className="font-semibold text-white">Gold Member</h3>
                <p className="text-sm text-white/80">Member since Jan 2026</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-white/80">Current Points</p>
              <p className="text-2xl font-bold text-white">3,450</p>
            </div>
            <div>
              <p className="text-sm text-white/80">Points to Next Level</p>
              <p className="text-lg font-semibold text-white">1,550</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Progress to Platinum</span>
              <span>60%</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          <button className="w-full mt-4 py-2 bg-white hover:bg-white/30 text-yellow-500 text-sm font-medium rounded-lg transition-colors">
            View Badge Details
          </button>
        </div>
      </div>

        {/* Right Column - Escrow Snapshot & Quick Actions */}
      <div className="w-full flex flex-wrap md:flex-nowrap items-start justify-between gap-4">
        {/* Escrow Snapshot */}
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <h3 className="font-semibold text-gray-800 bg-primary/20 p-6">Escrow Snapshot</h3>
          
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-yellow-600" />
                <span className="text-sm text-gray-600">Held in Escrow</span>
              </div>
              <span className="font-semibold text-gray-800">N850,000</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm text-gray-600">Released (7 days)</span>
              </div>
              <span className="font-semibold text-gray-800">N1,680,000</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-600" />
                <span className="text-sm text-gray-600">In Dispute</span>
              </div>
              <span className="font-semibold text-gray-800">N0</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <h3 className="font-semibold text-gray-800 bg-primary/20 p-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 gap-2 p-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={index} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left group flex gap-2 border border-gray-300">
                  <div className={`w-10 h-10 ${action.color} bg-opacity-20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={action.color.replace('bg-', 'text-')} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className="text-sm font-medium text-gray-800">{action.label}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Active Orders</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={18} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeOrders.map((order, index) => {
                const StatusIcon = order.icon;
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                        <p className="text-xs text-gray-400 mt-1">{order.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {order.buyer.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-700">{order.buyer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">{order.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        <StatusIcon size={12} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                        View
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;