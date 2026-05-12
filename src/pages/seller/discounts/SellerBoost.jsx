import React, { useState } from 'react';
import { 
  Zap, 
  Eye, 
  TrendingUp, 
  DollarSign, 
  Star, 
  ChevronDown, 
  Info,
  ChevronRight,
  Wallet
} from 'lucide-react';
import { products } from '../../../data/products';

const SellerBoost = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBoostType, setSelectedBoostType] = useState('featured');
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [customDuration, setCustomDuration] = useState('');

  const stats = [
    { label: 'Active Boosts', value: '3', icon: Zap, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Total Views', value: '4,594', icon: Eye, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { label: 'Total Clicks', value: '346', icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'Total Cost Remaining', value: '₦5,700', icon: DollarSign, color: 'text-orange-500', bgColor: 'bg-orange-50' },
  ];

  const boostTypes = [
    {
      id: 'featured',
      title: 'Featured Listing',
      description: 'Appears at top of category & search results',
      impact: 'Up to 3× more views',
      icon: Star,
      premium: false
    },
    {
      id: 'sponsored',
      title: 'Sponsored Listing',
      description: 'Labeled "Sponsored" in product feeds',
      impact: 'Up to 2× more views',
      icon: Zap,
      premium: false
    },
    {
      id: 'homepage',
      title: 'Homepage Highlight',
      description: 'Premium placement on marketplace homepage',
      impact: 'Up to 5× more views',
      icon: TrendingUp,
      premium: true
    }
  ];

  const durations = [
    { days: 3, price: 3000, originalPrice: null, discount: null },
    { days: 7, price: 6000, originalPrice: 8500, discount: 10 },
    { days: 14, price: 12000, originalPrice: 14000, discount: 15 },
  ];

  const currentBoostType = boostTypes.find(t => t.id === selectedBoostType);
  const currentDuration = durations.find(d => d.days === selectedDuration);
  const baseCost = currentDuration ? currentDuration.price : 0;
  const productDetails = products.find(p => p.id === selectedProduct);

  const handleProductSelect = (id) => {
    setSelectedProduct(id);
    setIsDropdownOpen(false);
  };

  const handleChangeProduct = () => {
    setSelectedProduct('');
    setIsDropdownOpen(true);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 gap-2 mb-2">
        <span>Products</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Create Boost</span>
      </nav>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-3xl font-bold text-gray-900 leading-none mb-1 sm:mb-2 truncate">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-sm text-gray-500 font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Boost Listing Section */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Boost Listing</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Increase your product visibility and reach more buyers</p>
            </div>
            
            {!selectedProduct ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-blue-600 shadow-sm space-y-6 relative">
                <div className="space-y-3">
                  <label className="text-sm sm:text-base font-semibold text-gray-900">Select Product to Boost</label>
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 sm:py-4 pr-12 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700 text-sm sm:text-base font-medium flex items-center justify-between"
                    >
                      <span>Choose a product...</span>
                      <ChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[320px] overflow-y-auto">
                        {products.map(p => (
                          <div 
                            key={p.id} 
                            onClick={() => handleProductSelect(p.id)}
                            className="px-4 py-3 sm:py-4 hover:bg-blue-50 cursor-pointer flex items-center gap-3 sm:gap-4 border-b border-gray-50 last:border-0 transition-colors group"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                              <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors truncate">{p.title}</p>
                              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">₦{p.price.toLocaleString()}</p>
                            </div>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 transition-all shrink-0">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-transparent group-hover:bg-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-5 sm:p-8 rounded-2xl border-2 border-blue-600 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Selected Product</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      {productDetails?.images?.[0] ? (
                        <img src={productDetails.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Eye className="text-gray-400" size={24} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 sm:space-y-1.5 min-w-0">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight truncate sm:whitespace-normal">
                        {productDetails?.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-500 font-medium">Quantity: 1</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <p className="text-lg sm:text-xl font-black text-gray-900">
                          Agreed Price: ₦{productDetails?.price?.toLocaleString()}
                        </p>
                        <span className="bg-gray-100 text-gray-500 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                          Normal Visibility
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleChangeProduct}
                    className="w-full sm:w-auto px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shrink-0"
                  >
                    Change Product
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Choose Boost Type */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Choose Boost Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {boostTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedBoostType(type.id)}
                  className={`relative p-5 sm:p-6 rounded-2xl border-2 text-left transition-all ${
                    selectedBoostType === type.id 
                      ? 'border-blue-600 bg-blue-50/20' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  {type.premium && (
                    <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      Premium
                    </span>
                  )}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-colors ${
                    selectedBoostType === type.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <type.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{type.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 leading-relaxed min-h-[32px] sm:min-h-[40px]">{type.description}</p>
                  <div className={`flex items-center gap-2 font-semibold text-xs sm:text-sm ${
                    selectedBoostType === type.id ? 'text-emerald-600' : 'text-emerald-500'
                  }`}>
                    <TrendingUp size={14} className="sm:w-4 sm:h-4" />
                    <span>{type.impact}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Select Duration */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Duration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {durations.map((d) => (
                <button
                  key={d.days}
                  onClick={() => {
                    setSelectedDuration(d.days);
                    setCustomDuration('');
                  }}
                  className={`relative p-6 sm:p-8 rounded-2xl border-2 text-center transition-all ${
                    selectedDuration === d.days && !customDuration
                      ? 'border-blue-600 bg-blue-50/20' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  {d.discount && (
                    <span className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                      Save {d.discount}%
                    </span>
                  )}
                  <p className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{d.days} Days</p>
                  <p className="text-xl sm:text-2xl font-black text-blue-600">₦{d.price.toLocaleString()}</p>
                  {d.originalPrice && (
                    <p className="text-xs sm:text-sm text-gray-400 line-through mt-1">₦{d.originalPrice.toLocaleString()}</p>
                  )}
                </button>
              ))}
            </div>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Or enter custom duration (days)"
                value={customDuration}
                onChange={(e) => {
                  setCustomDuration(e.target.value);
                  setSelectedDuration(null);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </section>

          {/* Expected Results */}
          <section className="space-y-4">
            <div className="bg-emerald-50/40 p-5 sm:p-8 rounded-2xl border border-emerald-100 space-y-6 sm:space-y-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Expected Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <Eye size={20} className="sm:w-5.5 sm:h-5.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Estimated Views</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">1,200 - 1,800</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                      <TrendingUp size={20} className="sm:w-5.5 sm:h-5.5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Estimated Clicks</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">180 - 270</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[10px] sm:text-sm text-gray-500 leading-relaxed">
                <Info size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <p>Performance may vary based on product category, pricing, and market demand</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - Payment Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-200 overflow-hidden shadow-lg sticky top-6">
            <div className="bg-indigo-50/50 p-5 sm:p-6 border-b border-indigo-100/50 flex items-center gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
                <Wallet size={18} className="text-gray-900 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Payment Summary</h2>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
              <div className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100/50 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-blue-600 font-bold uppercase tracking-[0.1em]">
                  <span>Wallet Balance</span>
                  <Wallet size={12} />
                </div>
                <p className="text-xl sm:text-2xl font-black text-blue-700">₦2,345,000</p>
              </div>

              <div className="space-y-4 sm:space-y-5 pt-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-500 font-medium">Boost Type</span>
                  <span className="font-bold text-gray-900">
                    {currentBoostType?.title}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-500 font-medium">Duration</span>
                  <span className="font-bold text-gray-900">
                    {customDuration ? `${customDuration} Days` : `${selectedDuration} Days`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-5 sm:pt-6 border-t border-gray-100">
                  <span className="text-gray-500 font-bold text-sm sm:text-base">Base Cost</span>
                  <span className="font-black text-gray-900 text-xl sm:text-2xl">
                    ₦{baseCost.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-4">
                <button className="w-full bg-blue-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98]">
                  Boost Now
                </button>
                <button className="w-full bg-white text-gray-600 border border-gray-200 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all active:scale-[0.98]">
                  Cancel
                </button>
              </div>

              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center leading-relaxed font-medium">
                Secure payment protected by Mosalak<br />escrow system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerBoost;
