import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import SellerBoostAnalytics from './SellerBoostAnalytics';

const SellerDiscounts = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
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
      value: '₦5,700', 
      icon: CreditCard, 
      color: 'bg-orange-500' 
    }
  ];

  // Sample discounts data
  const discounts = [
    {
      id: 1,
      product: 'Wireless Bluetooth Headphones',
      boostType: 'Premium Boost',
      dailyCost: '₦500',
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
      dailyCost: '₦1,000',
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
      dailyCost: '₦200',
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
      dailyCost: '₦500',
      remainingDays: 5,
      views: 1247,
      clicks: 89,
      startDate: '1/8/2026',
      daysLeft: 5,
      status: 'active'
    }
  ];

  if (selectedDiscount) {
    return (
      <SellerBoostAnalytics 
        discount={selectedDiscount} 
        onBack={() => setSelectedDiscount(null)} 
      />
    );
  }

  // Pagination
  const totalPages = Math.ceil(discounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDiscounts = discounts.slice(startIndex, startIndex + itemsPerPage);

  const handlePause = (discountId) => {
    console.log('Pause discount:', discountId);
  };

  const handleExtend = (discountId) => {
    navigate('/seller/boost');
  };

  const handleViewAnalytics = (discount) => {
    setSelectedDiscount(discount);
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
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <span>Dashboard</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Promotions</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="order-2 md:order-1">
                  <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.subValue && (
                      <span className="text-xs text-gray-400 font-medium">{stat.subValue}</span>
                    )}
                  </div>
                </div>
                <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg shadow-current/10 order-1 md:order-2`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discounts List */}
      <div className="space-y-4">
        {paginatedDiscounts.map((discount) => (
          <div 
            key={discount.id} 
            className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer group"
            onClick={() => handleViewAnalytics(discount)}
          >
            {/* Product Name and Boost Type */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {discount.product}
              </h3>
              <span className={`inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border w-fit ${getBoostTypeColor(discount.boostType)}`}>
                <Zap size={10} className="mr-1.5" />
                {discount.boostType}
              </span>
            </div>

            {/* Boost Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100/50">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daily Cost</p>
                <p className="text-sm font-bold text-gray-900">{discount.dailyCost}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Remaining Days</p>
                <p className="text-sm font-bold text-gray-900">{discount.remainingDays} days</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Views</p>
                <p className="text-sm font-bold text-gray-900">{discount.views.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clicks</p>
                <p className="text-sm font-bold text-gray-900">{discount.clicks}</p>
              </div>
              <div className="space-y-1 col-span-2 md:col-span-1 border-t md:border-t-0 pt-3 md:pt-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Started</p>
                <p className="text-sm font-bold text-gray-900">{discount.startDate}</p>
              </div>
            </div>

            {/* Days Left and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${getDaysLeftColor(discount.daysLeft)}`}>
                  {discount.daysLeft} day{discount.daysLeft !== 1 ? 's' : ''} left
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handlePause(discount.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                >
                  <Pause size={14} />
                  Pause
                </button>
                <button
                  onClick={() => handleExtend(discount.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                >
                  <Calendar size={14} />
                  Extend
                </button>
                <button
                  onClick={() => handleViewAnalytics(discount)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                  <BarChart3 size={14} />
                  Analytics
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {discounts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No active boosts found</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Start a New Boost
          </button>
        </div>
      )}

      {/* Pagination */}
      {discounts.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, discounts.length)} of {discounts.length} boosts
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

export default SellerDiscounts;
