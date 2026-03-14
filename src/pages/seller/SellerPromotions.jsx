import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  BarChart3,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';

const SellerPromotions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Stats data
  const stats = [
    { 
      label: 'Active Boosts', 
      value: '4', 
      subValue: '3',
      icon: Zap, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Total Views', 
      value: '4,594', 
      icon: Eye, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Total Clicks', 
      value: '346', 
      icon: MousePointer, 
      color: 'bg-purple-500' 
    },
    { 
      label: 'Total Cost Remaining', 
      value: '₮5,700', 
      icon: CreditCard, 
      color: 'bg-orange-500' 
    }
  ];

  // Sample promotions data
  const promotions = [
    {
      id: 1,
      product: 'Wireless Bluetooth Headphones',
      boostType: 'Premium Boost',
      dailyCost: '₮500',
      remainingDays: 5,
      views: 1247,
      clicks: 89,
      startDate: '1/8/2026',
      daysLeft: 5,
      status: 'active'
    },
    {
      id: 2,
      product: 'Smart Watch Series 5',
      boostType: 'Premium Boost',
      dailyCost: '₮1,000',
      remainingDays: 3,
      views: 2891,
      clicks: 234,
      startDate: '1/10/2026',
      daysLeft: 5,
      status: 'active'
    },
    {
      id: 3,
      product: 'Laptop Backpack Pro',
      boostType: 'Basic Boost',
      dailyCost: '₮200',
      remainingDays: 1,
      views: 456,
      clicks: 23,
      startDate: '1/12/2026',
      daysLeft: 1,
      status: 'active'
    },
    {
      id: 4,
      product: 'Wireless Bluetooth Headphones',
      boostType: 'Premium Boost',
      dailyCost: '₮500',
      remainingDays: 5,
      views: 1247,
      clicks: 89,
      startDate: '1/8/2026',
      daysLeft: 5,
      status: 'active'
    }
  ];

  // Pagination
  const totalPages = Math.ceil(promotions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPromotions = promotions.slice(startIndex, startIndex + itemsPerPage);

  const handlePause = (promotionId) => {
    console.log('Pause promotion:', promotionId);
    // Handle pause action
  };

  const handleExtend = (promotionId) => {
    console.log('Extend promotion:', promotionId);
    // Handle extend action
  };

  const handleViewAnalytics = (promotionId) => {
    console.log('View analytics:', promotionId);
    // Handle view analytics action
  };

  const getBoostTypeColor = (type) => {
    return type === 'Premium Boost' 
      ? 'bg-purple-100 text-purple-700 border-purple-200' 
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getDaysLeftColor = (days) => {
    if (days <= 1) return 'text-red-600 bg-red-50';
    if (days <= 3) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Dashbaord &raquo; Promotions &raquo;
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    {stat.subValue && (
                      <span className="text-sm text-gray-400">{stat.subValue}</span>
                    )}
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promotions List */}
      <div className="space-y-4">
        {paginatedPromotions.map((promotion) => (
          <div 
            key={promotion.id} 
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Product Name and Boost Type */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {promotion.product}
              </h3>
              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getBoostTypeColor(promotion.boostType)}`}>
                {promotion.boostType}
              </span>
            </div>

            {/* Boost Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Daily Cost</p>
                <p className="text-sm font-medium text-gray-900">{promotion.dailyCost}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Remaining Days</p>
                <p className="text-sm font-medium text-gray-900">{promotion.remainingDays} days</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Views</p>
                <p className="text-sm font-medium text-gray-900">{promotion.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Clicks</p>
                <p className="text-sm font-medium text-gray-900">{promotion.clicks}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Started</p>
                <p className="text-sm font-medium text-gray-900">{promotion.startDate}</p>
              </div>
            </div>

            {/* Days Left and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${getDaysLeftColor(promotion.daysLeft)}`}>
                  {promotion.daysLeft} day{promotion.daysLeft !== 1 ? 's' : ''} left
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePause(promotion.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Pause size={14} />
                  Pause
                </button>
                <button
                  onClick={() => handleExtend(promotion.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Calendar size={14} />
                  Extend Boost
                </button>
                <button
                  onClick={() => handleViewAnalytics(promotion.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  <BarChart3 size={14} />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {promotions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No active boosts found</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Start a New Boost
          </button>
        </div>
      )}

      {/* Pagination */}
      {promotions.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, promotions.length)} of {promotions.length} boosts
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
  );
};

export default SellerPromotions;