import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderDetailsModal from '../../components/seller/OrderDetailsModal';
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
  ShieldCheck,
  ShieldBan
} from 'lucide-react';
import silver from "../../assets/badges/silver.png";
import { useAuth } from '../../contexts/AuthContext';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useAuth();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };
  

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
    { label: 'Add New Product', description: 'List items for sale', icon: Plus, color: 'blue-500', path: '/seller/add-products' },
    { label: 'Boost Product', description: 'Increase visibility', icon: Zap, color: 'red-500', path: '/seller/discounts' },
    { label: 'Verify Account', description: 'Build trust', icon: Shield, color: 'green-500', path: '/seller/verification' },
    { label: 'Withdraw Funds', description: 'Transfer to bank', icon: Wallet, color: 'orange-500', path: '/seller/m-wallet' }
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
        <div className="bg-primary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">Welcome back, {user?.full_name || 'Seller'}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-xs text-white font-bold rounded-lg flex items-center gap-1.5 border border-white/10">
                <img src={silver} alt='' className='w-4 h-4' />
                SILVER MEMBER
              </span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg flex items-center gap-1.5 border border-white/10">
                <ShieldCheck size={14} />
                {user?.kyc_status || 'PRO'} SELLER
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/seller/add-products')}
              className="bg-white text-primary hover:bg-white/90 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>
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
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
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
        {/* Left Column - KYC & Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* KYC Verification Status */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">KYC Verification</h3>
                <p className="text-sm text-gray-500">Your current trust level on the platform</p>
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
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                    <p className="text-base font-bold text-gray-900">Verified Standard</p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle size={12} /> Limit: ₦500,000
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>Progress to Level 3</span>
                    <span className="text-gray-900">66%</span>
                  </div>
                  <div className="h-2.5 bg-white rounded-full overflow-hidden border border-gray-100">
                    <div className="h-full bg-primary rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  <button 
                    onClick={() => navigate('/seller/settings')}
                    className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                  >
                    Continue Verification
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          

          {/* Plan & Points Section */}
          <div className='flex flex-col md:flex-row items-stretch gap-6'>
            {/* Current Plan */}
            <div className="flex-1 bg-gray-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Zap size={100} className="text-white" />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Current Plan</span>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">₦4,000</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">/ month</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro Verified</h3>
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      25% search ranking boost
                    </li>
                    <li className="text-xs text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Priority seller support
                    </li>
                  </ul>
                </div>

                <button 
                  className="w-full py-3 bg-white/10 hover:bg-white text-white hover:text-gray-900 text-xs font-bold rounded-xl transition-all border border-white/20"
                >
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Points Card */}
            <div className="w-full md:w-72 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='bg-amber-50 p-3 rounded-2xl text-amber-500 shadow-xs'>
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Points</p>
                    <h3 className="text-3xl font-bold text-gray-900">3,450</h3>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Earn points for every successful sale and referral. Redeem points for product boosts.
                </p>
              </div>
              
              <button 
                onClick={() => navigate('/seller/earnings')}
                className='flex items-center justify-between w-full p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-xs font-bold text-gray-700'
              >
                <span>View Activities</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

     
        {/* Right Column - Gold Member & Quick Actions */}
        <div className="space-y-6">
          {/* Gold Member Card */}
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
                    onClick={() => navigate('/seller/settings/badges')}
                    className="px-4 py-2 bg-white text-yellow-600 text-[10px] font-bold rounded-lg hover:bg-white/90 transition-all uppercase tracking-wider shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid - Small items for mobile */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button 
                  key={index} 
                  onClick={() => navigate(action.path)}
                  className="p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all flex flex-col items-center gap-2 group text-center"
                >
                  <div className={`w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors`}>
                    <Icon size={20} className={`text-${action.color}`} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Second Row - Escrow Snapshot & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Escrow Snapshot */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-primary/5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Escrow Snapshot</h3>
            <Shield size={20} className="text-primary" />
          </div>
          
          <div className="p-6 space-y-4 flex-1">
            {[
              { label: 'Held in Escrow', value: 'N850,000', icon: Shield, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Released (7 days)', value: 'N1,680,000', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
              { label: 'In Dispute', value: 'N0', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50/50 rounded-xl border border-gray-100/50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}

            <div className='p-4 bg-primary/5 rounded-2xl border border-primary/10 mt-2'>
              <div className='flex items-center gap-2 mb-2 text-primary'>
                <Shield size={14} />
                <p className='text-xs font-bold uppercase tracking-wider'>Protection Active</p>
              </div>
              <p className='text-[11px] text-gray-600 leading-relaxed font-medium'>
                Funds are released 24 hours after buyer confirms delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Active Orders - Responsive Table/Cards */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Active Orders</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter size={18} />
              </button>
              <button 
                onClick={() => navigate('/seller/orders')}
                className="text-xs font-bold text-primary hover:underline px-2"
              >
                View All
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Details</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeOrders.map((order, index) => {
                  const StatusIcon = order.icon;
                  return (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-gray-900">{order.product}</p>
                          <p className="text-[10px] text-gray-500 font-mono tracking-tighter">{order.id} • {order.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            {order.buyer.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{order.buyer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${order.statusColor}`}>
                          <StatusIcon size={10} />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-50">
            {activeOrders.map((order, index) => (
              <div 
                key={index} 
                className="p-4 active:bg-gray-50 transition-colors flex items-center justify-between gap-4"
                onClick={() => handleViewOrder(order)}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{order.product}</p>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{order.amount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] text-gray-500 font-medium">By {order.buyer} • {order.time}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </div>
            ))}
            <button 
              onClick={() => navigate('/seller/orders')}
              className="w-full py-4 text-xs font-bold text-primary bg-gray-50/50 hover:bg-gray-50 transition-colors uppercase tracking-widest"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default SellerDashboard;