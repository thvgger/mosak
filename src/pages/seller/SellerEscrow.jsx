import React, { useState } from 'react';
import { 
  Wallet,
  Shield,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Eye,
  AlertCircle,
  CheckCircle,
  Truck,
  ChevronLeft
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

const SellerEscrow = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Stats data
  const stats = [
    { 
      label: 'Available Balance', 
      value: 'N1,245,000',
      subtext: 'Withdraw anytime',
      icon: Wallet, 
      color: 'bg-green-500',
      trend: '+12.5%',
      trendUp: true
    },
    { 
      label: 'Funds in Escrow', 
      value: 'N850,000',
      subtext: '3 orders in escrow',
      icon: Shield, 
      color: 'bg-blue-500',
      trend: '+12.5%',
      trendUp: true
    },
    { 
      label: 'Processing', 
      value: 'N500,000',
      subtext: 'Awaiting delivery',
      icon: Clock, 
      color: 'bg-orange-500',
      trend: '5 orders',
      trendUp: null
    },
    { 
      label: 'Total Earnings', 
      value: 'N15,750,000',
      subtext: 'This month',
      icon: TrendingUp, 
      color: 'bg-purple-500',
      trend: 'Action needed',
      trendUp: false
    }
  ];

  // Sample escrow orders data
  const escrowOrders = [
    {
      id: 1,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyerName: 'Ahmed Hassan',
      amount: 'N1,250,000',
      escrowStatus: 'Pending Payment',
      expectedRelease: '2026-01-10'
    },
    {
      id: 2,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1235',
      buyerName: 'Jane Smith',
      amount: 'N1,250,000',
      escrowStatus: 'Pending Payment',
      expectedRelease: '2026-01-10'
    },
    {
      id: 3,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1236',
      buyerName: 'Mike Ross',
      amount: 'N1,250,000',
      escrowStatus: 'In Escrow',
      expectedRelease: '2026-01-10'
    },
    {
      id: 4,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1237',
      buyerName: 'Sarah John',
      amount: 'N1,250,000',
      escrowStatus: 'In Escrow',
      expectedRelease: '2026-01-10'
    },
    {
      id: 5,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1238',
      buyerName: 'David Lee',
      amount: 'N1,250,000',
      escrowStatus: 'Shipped',
      expectedRelease: '2026-01-10'
    }
  ];

  // Get status color and icon
  const getEscrowStatusStyle = (status) => {
    const styles = {
      'Pending Payment': 'bg-amber-50 text-amber-600 border-amber-100',
      'In Escrow': 'bg-blue-50 text-blue-600 border-blue-100',
      'Shipped': 'bg-purple-50 text-purple-600 border-purple-100',
      'Delivered': 'bg-green-50 text-green-600 border-green-100'
    };
    return styles[status] || 'bg-gray-50 text-gray-600 border-gray-100';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending Payment': Clock,
      'In Escrow': Shield,
      'Shipped': Truck,
      'Delivered': CheckCircle
    };
    return icons[status] || AlertCircle;
  };

  // Pagination
  const totalPages = Math.ceil(escrowOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = escrowOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (orderId) => {
    navigate(`/seller/orders/${orderId.replace('#', '')}`);
  };

  const handleWithdrawFunds = () => {
    navigate('/seller/m-wallet');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Escrow & Payments</h1>
          <p className="text-sm text-gray-500">Track your funds and pending releases</p>
        </div>
        
        <button 
          onClick={handleWithdrawFunds}
          className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Wallet size={18} />
          Withdraw Funds
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                {stat.trend && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                    stat.trendUp === true ? 'bg-green-50 text-green-600' : 
                    stat.trendUp === false ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                  }`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Escrow Breakdown Section */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Pending Releases</h2>
            <p className="text-sm text-gray-500">Overview of all funds currently held in escrow</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-2 flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">Escrow Active</p>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product & Order</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buyer</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Value</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Escrow Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estimated Release</th>
                <th className="px-8 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.escrowStatus);
                return (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-5">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-900">{order.product}</p>
                        <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">{order.orderId}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-[10px] font-bold uppercase">
                          {order.buyerName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{order.buyerName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-900">{order.amount}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border ${getEscrowStatusStyle(order.escrowStatus)}`}>
                        <StatusIcon size={10} />
                        {order.escrowStatus}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Clock size={14} className="text-gray-400" />
                        {order.expectedRelease}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleViewDetails(order.orderId)}
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

        {/* Mobile View Card List */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginatedOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.escrowStatus);
            return (
              <div 
                key={order.id} 
                className="p-5 active:bg-gray-50 transition-colors space-y-4"
                onClick={() => handleViewDetails(order.orderId)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-bold text-gray-900 leading-tight">{order.product}</p>
                    <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">{order.orderId} • {order.buyerName}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border ${getEscrowStatusStyle(order.escrowStatus)} flex items-center gap-1.5`}>
                    <StatusIcon size={10} />
                    {order.escrowStatus}
                  </span>
                  
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={12} />
                    <span>Est. {order.expectedRelease}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {escrowOrders.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
              <Shield size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No active escrow funds</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">Your pending payments will appear here once buyers place orders</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {escrowOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-6 px-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerEscrow;