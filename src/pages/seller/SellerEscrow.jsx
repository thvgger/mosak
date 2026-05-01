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
      label: 'Processing withdrawals', 
      value: 'N500,000',
      subtext: 'Awaiting delivery',
      icon: Clock, 
      color: 'bg-orange-500',
      trend: '5 orders',
      trendUp: null
    },
    { 
      label: 'Total lifetime earnings', 
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
      orderId: '#ORD-1234',
      buyerName: 'Ahmed Hassan',
      amount: 'N1,250,000',
      escrowStatus: 'Pending Payment',
      expectedRelease: '2026-01-10'
    },
    {
      id: 3,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyerName: 'Ahmed Hassan',
      amount: 'N1,250,000',
      escrowStatus: 'In Escrow',
      expectedRelease: '2026-01-10'
    },
    {
      id: 4,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyerName: 'Ahmed Hassan',
      amount: 'N1,250,000',
      escrowStatus: 'In Escrow',
      expectedRelease: '2026-01-10'
    },
    {
      id: 5,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyerName: 'Ahmed Hassan',
      amount: 'N1,250,000',
      escrowStatus: 'Shipped',
      expectedRelease: '2026-01-10'
    }
  ];

  // Get status color and icon
  const getEscrowStatusStyle = (status) => {
    const styles = {
      'Pending Payment': {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: Clock
      },
      'In Escrow': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: Shield
      },
      'Shipped': {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        icon: Truck
      },
      'Delivered': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle
      }
    };
    return styles[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertCircle };
  };

  // Pagination
  const totalPages = Math.ceil(escrowOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = escrowOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (orderId) => {
    navigate(`/seller/orders/${orderId.replace('#', '')}`);
  };

  const handleWithdrawFunds = () => {
    console.log('Withdraw funds');
    // Handle withdraw action
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Dashboard
      </div>

      {/* Header with Withdraw Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <button 
          onClick={handleWithdrawFunds}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Wallet size={18} />
          Withdraw Funds
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trendUp === true ? 'text-green-600' : 
                    stat.trendUp === false ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.trendUp === true && <ArrowUpRight size={14} />}
                    {stat.trendUp === false && <ArrowDownRight size={14} />}
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>
              
              <p className="text-2xl font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Escrow Breakdown Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Escrow Funds Breakdown</h2>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <span>3 orders in escrow</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Escrow Protection Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">Escrow Protection Active</h3>
            <p className="text-xs text-blue-600">
              Funds are held securely until the buyer confirms receipt of goods. This protects both parties in the transaction.
            </p>
          </div>
        </div>

        {/* Escrow Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Order ID</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Buyer Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Escrow Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Expected Release</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedOrders.map((order) => {
                const statusStyle = getEscrowStatusStyle(order.escrowStatus);
                const StatusIcon = statusStyle.icon;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{order.product}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900 font-mono">{order.orderId}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{order.buyerName}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{order.amount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <StatusIcon size={14} className={statusStyle.text} />
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                          {order.escrowStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{order.expectedRelease}</span>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleViewDetails(order.orderId)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {escrowOrders.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No escrow orders found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {escrowOrders.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, escrowOrders.length)} of {escrowOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded border ${
                  currentPage === 1 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded border ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded border ${
                  currentPage === totalPages 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerEscrow;