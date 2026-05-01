import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  MessageSquare, 
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
  ChevronDown
} from 'lucide-react';
import bronzeBadge from '../../assets/badges/bronze.png';
import goldBadge from '../../assets/badges/gold.png';
import silverBadge from '../../assets/badges/silver.png';
import platinumBadge from '../../assets/badges/platinum.png';
import avatarImg from '../../assets/avatar.png';
import carImg from '../../assets/car.png';
import ProductCard from '../../components/marketplace/ProductCard';
import SearchBar from '../../components/marketplace/SearchBar';
import CategoriesBar from '../../components/marketplace/CategoriesBar';

const SellerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('products');
  const [sortBy, setSortBy] = useState('Popularity');

  const sellerStats = [
    { label: 'Total Products', value: '8', icon: LayoutGrid },
    { label: 'Completed Sales', value: '340', icon: CheckCircle },
    { label: 'Completion Rate', value: '98%', icon: TrendingUp },
    { label: 'Dispute Resolution', value: '4.9', icon: Star },
    { label: 'Last Active', value: 'Active now', icon: ShieldCheck, color: 'text-green-500' }
  ];

  const products = [
    {
      id: 1,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Silver',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 2,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Gold',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 3,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Bronze',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 4,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Platinum',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 5,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Silver',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 6,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Gold',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 7,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Bronze',
      seller: { name: 'Sarah', avatar: avatarImg }
    },
    {
      id: 8,
      title: 'Foreign Used 2015 Porsche Macan Turbo - Fully Loaded',
      price: 22000000,
      originalPrice: 44000000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ...',
      location: 'Lagos',
      condition: 'Foreign Used',
      images: [carImg],
      badge: 'Platinum',
      seller: { name: 'Sarah', avatar: avatarImg }
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

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-20">
      {/* Marketplace Header */}
      <div className='bg-[#eaeaea]'>
        <SearchBar />
      </div>
      <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <CategoriesBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-[32px] border border-gray-200 p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md">
                SC
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Sarah's Craft Store</h1>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-tight">
                    <ShieldCheck size={12} fill="currentColor" className="text-white" />
                    Verified Seller
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full border border-orange-100 uppercase tracking-tight">
                    <img src={bronzeBadge} alt="" className="w-3 h-3" />
                    Bronze
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">4.9</span>
                <span className="text-sm text-gray-400 font-medium">127 reviews</span>
              </div>

              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed mb-6">
                Handcrafted products made with love and attention to detail. Specializing in sustainable, eco-friendly items for your home and lifestyle.
              </p>

              <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                <MessageSquare size={18} fill="currentColor" />
                Chat with seller
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {sellerStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                {stat.icon && <stat.icon size={20} className={stat.color || 'text-blue-600'} />}
                <span className="text-2xl font-black text-gray-900">{stat.value}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* All Products Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Product</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <button 
                onClick={() => setSortBy(sortBy === 'Popularity' ? 'Newest' : 'Popularity')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-900 shadow-sm"
              >
                {sortBy}
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="px-10 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
              Show More
            </button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Customer Reviews</h2>
          
          <div className="flex flex-col lg:flex-row gap-16 mb-16">
            <div className="text-center lg:text-left">
              <div className="text-[80px] font-black text-gray-900 leading-none mb-4">4.9<span className="text-2xl text-gray-300">/5</span></div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={28} fill="currentColor" className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em]">29 Reviews</p>
            </div>

            <div className="flex-1 space-y-4">
              {[
                { stars: 5, count: 12, percent: 90 },
                { stars: 4, count: 4, percent: 70 },
                { stars: 3, count: 10, percent: 50 },
                { stars: 2, count: 2, percent: 30 },
                { stars: 1, count: 1, percent: 10 },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-6">
                  <span className="text-sm font-bold text-gray-500 w-16">{item.stars} Star</span>
                  <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-400 w-10">({item.count})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="max-h-[600px] overflow-y-auto pr-8 space-y-12 custom-scrollbar">
              {reviews.map((review) => (
                <div key={review.id} className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{review.user}</h3>
                    <div className="flex flex-col items-end gap-1">
                      <ChevronRight className="rotate-270 text-gray-300" size={16} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" className="text-blue-600" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium mb-4">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{review.user_fullname}</span>
                    <span className="text-xs font-bold text-gray-400">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Custom scroll indicator as seen in design */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gray-50 rounded-full">
              <div className="h-1/3 bg-gray-200 rounded-full w-full" />
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