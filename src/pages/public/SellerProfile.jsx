import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight,
  MessageCircle, 
  Share2, 
  ShieldCheck, 
  Star, 
  Clock, 
  CheckCircle,
  Shield,
  MoreHorizontal,
  ArrowLeft,
  Users,
  TrendingUp,
  LayoutGrid,
  BadgeCheck,
  ChevronDown,
  Heart,
  MapPin,
  ShoppingCart,
  Eye,
  Gift
} from 'lucide-react';
import bronzeBadge from '../../assets/badges/bronze.png';
import goldBadge from '../../assets/badges/gold.png';
import silverBadge from '../../assets/badges/silver.png';
import platinumBadge from '../../assets/badges/platinum.png';
import avatarImg from '../../assets/avatar.png';
import carImg from '../../assets/car.png';
import SearchBar from '../../components/marketplace/SearchBar';
import CategoriesBar from '../../components/marketplace/CategoriesBar';

const SellerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sortBy, setSortBy] = useState('Popularity');

  const sellerStats = [
    { label: 'Total Products', value: '8', icon: LayoutGrid },
    { label: 'Completed Sales', value: '340', icon: CheckCircle },
    { label: 'Completion Rate', value: '98%', icon: TrendingUp },
    { label: 'Dispute Resolution', value: '4.9', icon: Star },
  ];

  const products = [
    {
      id: 1,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Silver',
    },
    {
      id: 2,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Gold',
    },
    {
      id: 3,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Bronze',
    },
    {
      id: 4,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Platinum',
    },
    {
      id: 5,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Silver',
    },
    {
      id: 6,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Gold',
    },
    {
      id: 7,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Bronze',
    },
    {
      id: 8,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      images: [carImg],
      badge: 'Platinum',
    }
  ];

  const reviews = [
    {
      id: 1,
      user: 'Stacey',
      rating: 5,
      comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      user_fullname: 'Stacey Sam',
      date: '21-12-2025'
    },
    {
      id: 2,
      user: 'Stacey',
      rating: 5,
      comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      user_fullname: 'Stacey Sam',
      date: '21-12-2025'
    },
    {
      id: 3,
      user: 'Stacey',
      rating: 5,
      comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      user_fullname: 'Stacey Sam',
      date: '21-12-2025'
    },
    {
      id: 4,
      user: 'Stacey',
      rating: 5,
      comment: 'I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos molestias excepturi sint non provident.',
      user_fullname: 'Stacey Sam',
      date: '21-12-2025'
    }
  ];

  const getBadgeIcon = (badge) => {
    switch(badge.toLowerCase()) {
      case 'gold': return goldBadge;
      case 'silver': return silverBadge;
      case 'platinum': return platinumBadge;
      case 'bronze': return bronzeBadge;
      default: return silverBadge;
    }
  };

  const getBadgeColor = (badge) => {
    switch(badge.toLowerCase()) {
      case 'gold': return 'bg-[#FFEB3B]/20 text-[#857000]';
      case 'silver': return 'bg-[#EAEAEA] text-[#393A40]';
      case 'platinum': return 'bg-[#E1BEE7] text-[#6B21A8]';
      case 'bronze': return 'bg-[#FFCCBC] text-[#9A3412]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-20">
      {/* Search & Categories Bar */}
      <div className='bg-white border-b border-gray-100'>
        <SearchBar />
      </div>
      <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-100">
        <CategoriesBar />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-6">
        {/* Back Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors mb-8 ml-2"
        >
          Back
        </button>

        {/* Profile Card */}
        <div className="bg-primary/10 rounded-2xl md:rounded-3xl border border-gray-200 p-6 md:p-12 mb-8 shadow-sm relative text-center">
          {/* Desktop-only corner Badges */}
          {/* <div className="hidden md:flex absolute top-10 left-10 items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] text-[#0024FF] text-[10px] font-bold rounded-full border border-[#DDE4FF] uppercase tracking-tight">
              <ShieldCheck size={12} fill="currentColor" className="text-white" />
              Verified Seller
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7ED] text-[#EA580C] text-[10px] font-bold rounded-full border border-[#FFEDD5] uppercase tracking-tight">
              <img src={bronzeBadge} alt="" className="w-3.5 h-3.5" />
              Bronze
            </div>
          </div> */}

          {/* Top Actions */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 md:gap-3">
            <button className="p-2 md:p-3 text-gray-400 hover:text-[#0024FF] rounded-full transition-colors">
              <Heart size={20} className="md:w-[22px] md:h-[22px]" />
            </button>
            <button className="p-2 md:p-3 text-gray-400 hover:text-[#0024FF] rounded-full transition-colors">
              <Share2 size={20} className="md:w-[22px] md:h-[22px]" />
            </button>
          </div>

          {/* Profile Identity */}
          <div className="flex flex-col items-center">
            {/* Mobile-only Badges (Displayed above avatar) */}
            {/* <div className="flex md:hidden items-center gap-2 mb-6">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-[#EEF2FF] text-[#0024FF] text-[9px] font-bold rounded-full border border-[#DDE4FF] uppercase">
                <ShieldCheck size={10} fill="currentColor" className="text-white" />
                Verified
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-[#FFF7ED] text-[#EA580C] text-[9px] font-bold rounded-full border border-[#FFEDD5] uppercase">
                <img src={bronzeBadge} alt="" className="w-3 h-3" />
                Bronze
              </div>
            </div> */}

            <div className="relative mb-6 md:mb-8">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img src={avatarImg} alt="Seller Avatar" className="w-full h-full object-cover" />
              </div>
              {/* Online Indicator */}
              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 md:w-7 md:h-7 bg-[#00C853] border-[3px] md:border-4 border-white rounded-full shadow-lg" title="Online" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 flex items-center justify-center gap-2 px-4">
              Sarah's Craft Store
              <div className="flex items-center gap-1.5 shrink-0">
                <BadgeCheck size={28} className="text-white" fill='#0024FF' />
                <img src={bronzeBadge} alt="Bronze" className="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </h1>
            
            <p className="text-xs md:text-base text-gray-500 max-w-2xl leading-relaxed mb-6 md:mb-8 font-medium px-4">
              Handcrafted products made with love and attention to detail. Specializing in sustainable, eco-friendly items for your home and lifestyle.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8 md:mb-10">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="md:w-[22px] md:h-[22px] text-[#FFD700] fill-current" />
                ))}
              </div>
              <span className="text-base md:text-xl font-black text-gray-900 ml-1">4.9</span>
              <button className="text-xs md:text-base text-[#0024FF] font-black hover:underline ml-1">127 reviews</button>
            </div>

            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-primary/5 text-[#0024FF] border border-primary rounded-xl font-black text-sm md:text-base transition-all hover:bg-primary/20 active:scale-[0.98]">
              <MessageCircle size={18} className="md:w-[20px] md:h-[20px]" fill='blue' />
              Chat with Seller
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-12 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {sellerStats.map((stat, i) => (
              <div key={i} className="px-4 py-6 md:px-8 md:py-8 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                  {stat.icon && <stat.icon size={18} className={`md:w-[20px] md:h-[20px] ${stat.color || 'text-blue-600'}`} />}
                  <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{stat.value}</span>
                </div>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All Products Section */}
        <div className="mb-16 md:mb-24 mt-8 md:mt-12 p-4 md:px-10 md:py-15 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">All Products</h2>
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">Sort by:</span>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-xs md:text-sm font-black text-gray-800">
                {sortBy}
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl md:rounded-3xl border border-[#DDE4FF] p-2 md:p-3 hover:shadow-xl transition-all group flex flex-col">
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-gray-50">
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  
                  {/* Badge */}
                  <div className="absolute top-0 right-0">
                    <div className={`flex flex-col items-center px-3 py-1.5 md:px-6 md:py-3 rounded-bl-2xl md:rounded-bl-[32px] font-black text-[8px] md:text-[10px] uppercase tracking-tighter shadow-sm ${getBadgeColor(product.badge)}`}>
                      <img src={getBadgeIcon(product.badge)} alt="" className="w-3 h-3 md:w-5 md:h-5 mb-0.5 md:mb-1" />
                      {product.badge}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <button className="p-2.5 md:p-4 bg-white text-[#0024FF] rounded-full shadow-2xl hover:bg-[#0024FF] hover:text-white transition-all transform hover:-translate-y-1">
                      <Heart size={16} className="md:w-[20px] md:h-[20px]" />
                    </button>
                    <button className="p-2.5 md:p-4 bg-white text-[#0024FF] rounded-full shadow-2xl hover:bg-[#0024FF] hover:text-white transition-all transform hover:-translate-y-1">
                      <ShoppingCart size={16} className="md:w-[20px] md:h-[20px]" />
                    </button>
                    <button className="p-2.5 md:p-4 bg-white text-[#0024FF] rounded-full shadow-2xl hover:bg-[#0024FF] hover:text-white transition-all transform hover:-translate-y-1">
                      <Eye size={16} className="md:w-[20px] md:h-[20px]" />
                    </button>
                  </div>
                </div>

                <div className="px-1 md:px-2 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 min-h-[36px] md:min-h-[44px] leading-snug">{product.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <span className="text-base md:text-xl font-black text-[#0024FF]">₦{product.price.toLocaleString()}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 line-through font-bold opacity-70">₦{product.originalPrice.toLocaleString()}</span>
                  </div>

                  <p className="text-[11px] md:text-[13px] text-gray-500 line-clamp-2 mb-4 md:mb-6 leading-relaxed font-medium">{product.description}</p>

                  <div className="flex items-center justify-between mt-auto mb-4 md:mb-6">
                    <div className="flex items-center gap-1.5 text-[#0024FF]">
                      <MapPin size={12} className="md:w-[16px] md:h-[16px] opacity-20" fill="currentColor" />
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{product.location}</span>
                    </div>
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden border-2 border-[#DDE4FF]">
                      <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <button className="w-full py-3 md:py-4 bg-[#0024FF] text-white rounded-xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-[0.97] shadow-lg shadow-blue-600/10">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 md:mt-20">
            <button className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-5 bg-white border border-gray-200 text-gray-900 font-black text-xs md:text-sm uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
              Show More
            </button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews-section" className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-20 border border-gray-100 shadow-sm">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-10 md:mb-16 uppercase tracking-tight">Customer Reviews</h2>
          
          <div className="flex flex-col lg:flex-row gap-12 md:gap-24 mb-16 md:mb-24">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
              <div className="text-[80px] md:text-[120px] font-black text-gray-900 leading-none mb-4 md:mb-6 flex items-baseline">
                4.9<span className="text-2xl md:text-4xl text-gray-200 ml-2 md:ml-3">/5</span>
              </div>
              <div className="flex items-center gap-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={28} className="md:w-[42px] md:h-[42px] text-[#FFD700] fill-current" />
                ))}
              </div>
              <p className="text-sm md:text-lg text-gray-400 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap opacity-80">29 Reviews</p>
            </div>

            <div className="flex-1 space-y-5 md:space-y-7">
              {[
                { stars: 5, count: 12, percent: 90 },
                { stars: 4, count: 4, percent: 70 },
                { stars: 3, count: 10, percent: 50 },
                { stars: 2, count: 2, percent: 30 },
                { stars: 1, count: 1, percent: 10 },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-4 md:gap-10">
                  <span className="text-xs md:text-base font-black text-gray-400 w-12 md:w-20 uppercase tracking-widest">{item.stars} Star</span>
                  <div className="flex-1 h-3 md:h-4 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100">
                    <div 
                      className="h-full bg-[#0024FF] rounded-full shadow-lg shadow-blue-600/30" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-xs md:text-base font-black text-gray-400 w-10 md:w-16 text-right">({item.count})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="max-h-[600px] md:max-h-[800px] overflow-y-auto pr-6 md:pr-20 space-y-12 md:space-y-24 custom-scrollbar">
              {reviews.map((review) => (
                <div key={review.id} className="relative">
                  <div className="flex justify-between items-start mb-2 md:mb-4">
                    <h3 className="text-lg md:text-3xl font-black text-gray-900 tracking-tight">{review.user}</h3>
                    <div className="lg:hidden text-gray-200">
                       <ChevronDown size={24} className="md:w-[32px] md:h-[32px]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-6 md:mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="md:w-[24px] md:h-[24px] text-[#0024FF] fill-current" />
                    ))}
                  </div>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-medium mb-8 md:mb-10 max-w-6xl">
                    {review.comment}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 md:gap-10 text-xs md:text-base border-t border-gray-50 pt-6 w-full sm:w-auto">
                    <span className="font-black text-gray-900 uppercase tracking-widest">{review.user_fullname}</span>
                    <span className="font-black text-gray-400 uppercase tracking-widest opacity-60">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Custom styled scrollbar matching the design */}
            <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-3 bg-gray-50 rounded-full flex flex-col items-center py-4 shadow-inner">
               <ChevronDown className="rotate-180 text-gray-300 mb-6" size={20} strokeWidth={3} />
               <div className="flex-1 w-full bg-gray-100/50 rounded-full relative">
                  <div className="absolute top-[15%] w-full h-[35%] bg-gray-300/80 rounded-full shadow-sm" />
               </div>
               <ChevronDown className="text-gray-300 mt-6" size={20} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SellerProfile;
