import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Percent, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Calendar,
  Package,
  Layers
} from 'lucide-react';

const SellerDiscountHistory = () => {
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [productFilter, setProductFilter] = useState('All Products');
  const [typeFilter, setTypeFilter] = useState('All Types');
  
  const [openDropdown, setOpenDropdown] = useState(null); // 'time', 'product', 'type'

  const stats = [
    { label: 'Total Spend', value: '₦12,500', icon: DollarSign, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Revenue Generated', value: '₦89,400', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { label: 'ROI', value: '715%', icon: Target, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { label: 'Avg. Conversion Rate', value: '7.2%', icon: Percent, color: 'text-orange-500', bgColor: 'bg-orange-50' },
  ];

  const timeOptions = ['All Time', 'Last 7 Days', 'Last Month', 'Last 3 Months'];
  const typeOptions = ['All Types', 'Boost Only', 'Discounts Only'];
  const productOptions = ['All Products', 'Smart Watch', 'Headphones', 'Laptop'];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (setter, value) => {
    setter(value);
    setOpenDropdown(null);
  };

  const campaigns = [
    {
      id: 1,
      name: 'Smart Watch - Featured',
      type: 'Featured',
      duration: '7 days',
      spend: '₦7,000',
      views: '2,891',
      clicks: '234',
      conversions: '18',
      revenue: '₦50,400',
      typeColor: 'bg-orange-50 text-orange-600 border-orange-100'
    },
    {
      id: 2,
      name: 'Headphones - Premium',
      type: 'Premium',
      duration: '5 days',
      spend: '₦2,500',
      views: '1,247',
      clicks: '89',
      conversions: '12',
      revenue: '₦18,000',
      typeColor: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      id: 3,
      name: 'New Year Sale - Promo',
      type: 'Discount',
      duration: '30 days',
      spend: '₦3,000',
      views: '-',
      clicks: '-',
      conversions: '23',
      revenue: '₦21,000',
      typeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    }
  ];

  return (
    <div className="space-y-8 pb-20" onClick={() => setOpenDropdown(null)}>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`w-10 h-10 sm:w-14 sm:h-14 ${stat.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${stat.color}`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-3xl font-bold text-gray-900 leading-none mb-2 truncate">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
        <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Campaign Performance</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Time Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => toggleDropdown('time')}
                className={`flex items-center gap-2 px-4 py-2.5 bg-white border ${openDropdown === 'time' ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-200'} rounded-xl text-sm font-semibold text-gray-600 hover:border-blue-500 transition-all cursor-pointer`}
              >
                <Calendar size={16} />
                <span>{timeFilter}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${openDropdown === 'time' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'time' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                  {timeOptions.map(opt => (
                    <div 
                      key={opt}
                      onClick={() => handleSelect(setTimeFilter, opt)}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${timeFilter === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => toggleDropdown('product')}
                className={`flex items-center gap-2 px-4 py-2.5 bg-white border ${openDropdown === 'product' ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-200'} rounded-xl text-sm font-semibold text-gray-600 hover:border-blue-500 transition-all cursor-pointer`}
              >
                <Package size={16} />
                <span>{productFilter}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${openDropdown === 'product' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'product' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                  {productOptions.map(opt => (
                    <div 
                      key={opt}
                      onClick={() => handleSelect(setProductFilter, opt)}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${productFilter === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => toggleDropdown('type')}
                className={`flex items-center gap-2 px-4 py-2.5 bg-white border ${openDropdown === 'type' ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-200'} rounded-xl text-sm font-semibold text-gray-600 hover:border-blue-500 transition-all cursor-pointer`}
              >
                <Layers size={16} />
                <span>{typeFilter}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'type' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                  {typeOptions.map(opt => (
                    <div 
                      key={opt}
                      onClick={() => handleSelect(setTypeFilter, opt)}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${typeFilter === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Duration</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Spend</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Views</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Clicks</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Conversions</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-gray-900">{campaign.name}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${campaign.typeColor}`}>
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center text-gray-600 font-medium">{campaign.duration}</td>
                  <td className="px-6 py-6 text-center text-gray-900 font-bold">{campaign.spend}</td>
                  <td className="px-6 py-6 text-center text-gray-600 font-medium">{campaign.views}</td>
                  <td className="px-6 py-6 text-center text-gray-600 font-medium">{campaign.clicks}</td>
                  <td className="px-6 py-6 text-center text-gray-600 font-medium">{campaign.conversions}</td>
                  <td className="px-8 py-6 text-right">
                    <span className="font-bold text-emerald-600">{campaign.revenue}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border-t border-gray-50">
          <p className="text-sm font-medium text-gray-500 order-2 sm:order-1">
            Showing <span className="text-gray-900">3</span> of <span className="text-gray-900">15</span> campaigns
          </p>
          
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all">
              <ChevronLeft size={18} />
              Previous
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDiscountHistory;
