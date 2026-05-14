import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  MessageSquare, 
  Share2, 
  Star, 
  Clock, 
  CheckCircle,
  Shield,
  MoreHorizontal,
  ArrowLeft,
  Heart,
  Box,
  TrendingUp
} from 'lucide-react';
import bronzeBadge from '../../assets/badges/bronze.png';
import avatarImg from '../../assets/avatar.png';
import SearchBar from '../../components/marketplace/SearchBar';
import CategoriesBar from '../../components/marketplace/CategoriesBar';

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Products', value: '8', icon: Box, color: 'text-blue-600' },
    { label: 'Completed Transactions', value: '340', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Disputes', value: '2%', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'text-gray-400' }
  ];

  const reviews = [
    {
      id: 1,
      user: 'Stacey',
      rating: 5,
      comment: 'Really good interaction. Always communicates clearly. Always working with time focus. Always works with records.',
      date: '21-12-2025'
    },
    {
      id: 2,
      user: 'Stacey',
      rating: 5,
      comment: 'Excellent buyer. Clear brief, fast payment confirmation and very professional throughout. Highly recommended.',
      date: '19-12-2025'
    },
    {
      id: 3,
      user: 'Stacey',
      rating: 5,
      comment: 'Great experience working with Stacey. Quick response and feedback. Look forward to working with you again.',
      date: '15-12-2025'
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'Completed deal',
      title: 'Brand identity kit',
      date: '12-01-2026',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      type: 'Purchased service',
      title: 'Logo Design service',
      date: '08-01-2026',
      icon: ArrowLeft,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      type: 'Completed deal',
      title: 'UI/UX audit',
      date: '02-01-2026',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      type: 'Purchased service',
      title: 'Pitch Deck Design',
      date: '28-12-2025',
      icon: ArrowLeft,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Marketplace Header */}
      <div className='bg-[#eaeaea]'>
        <SearchBar />
      </div>
      <div className="sticky top-16 md:top-20 z-40">
        <CategoriesBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-gray-700 transition-colors"
        >
          <ChevronRight className="rotate-180" size={14} />
          <span>Back</span>
        </button>

        {/* Profile Header Card */}
        <div className="bg-white rounded-[32px] border border-gray-100 p-10 mb-6 relative overflow-hidden shadow-sm">
          {/* Top-left Badges */}
          <div className="absolute top-8 left-8 flex gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-tight">
              <CheckCircle size={12} fill="currentColor" className="text-white" />
              Verified Users
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full border border-orange-100 uppercase tracking-tight">
              <img src={bronzeBadge} alt="" className="w-3 h-3" />
              Bronze
            </span>
          </div>

          {/* Top-right Icons */}
          <div className="absolute top-8 right-8 flex gap-4">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={24} />
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors">
              <Share2 size={24} />
            </button>
          </div>

          {/* Centered Content */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative mb-6">
              <img 
                src={avatarImg} 
                alt="Stacey Samuel" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Stacey Samuel</h1>
            <p className="text-sm text-gray-500 mb-8 font-medium">Member since Jan 2025</p>

            <button className="flex items-center gap-2 px-10 py-3.5 border-2 border-blue-600 text-blue-600 bg-white rounded-xl font-bold hover:bg-blue-50 transition-all active:scale-95">
              <MessageSquare size={18} fill="currentColor" />
              Message User
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-12 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="px-8 py-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon && <stat.icon size={20} className={stat.color || 'text-blue-600'} />}
                  <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-10">
            {['overview', 'reviews', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold capitalize relative transition-colors ${
                  activeTab === tab 
                    ? 'text-primary' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-10">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">Bio</h2>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium">
                    Freelance product designer based in Lagos. I specialize in creative brands and digital agencies. Fast communicator, always happy to discuss scope before committing.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">Activity summary</h2>
                  <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-gray-900">42</span>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Completed deals</span>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-gray-900">11</span>
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active projects</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-xs text-green-600 font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Active 2 hours ago
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">Trust & safety</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white text-green-600 rounded-xl flex items-center justify-center shadow-sm">
                          <CheckCircle size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Identity verified</p>
                          <p className="text-xs text-gray-500 font-medium">KYC verified - Government ID confirmed</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm">
                          <Shield size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Escrow protected</p>
                          <p className="text-xs text-gray-500 font-medium">Transactions secured via Escrow</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-4 border-2 border-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                    <Shield size={16} />
                    Report User
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-tight">Users Reviews</h2>
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
                  <div className="text-center">
                    <div className="text-6xl font-black text-gray-900 mb-2">4.9<span className="text-xl text-gray-300">/5</span></div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest">23 Reviews</p>
                  </div>

                  <div className="flex-1 w-full space-y-3">
                    {[
                      { stars: 5, count: 120 },
                      { stars: 4, count: 20 },
                      { stars: 3, count: 10 },
                      { stars: 2, count: 5 },
                      { stars: 1, count: 3 },
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-500 w-12">{item.stars} Star</span>
                        <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(item.count / 158) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-400 w-10">({item.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-sm font-bold text-gray-900">{review.user}</p>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-100"} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium mb-4">{review.comment}</p>
                      <div className="flex items-center justify-end">
                        <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded uppercase tracking-widest border border-primary/10">Buyer Side</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-tight">Recent activity</h2>
                <div className="space-y-5">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl group cursor-pointer hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${activity.color}`}>
                          <activity.icon size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{activity.type} — <span className="text-primary">{activity.title}</span></p>
                          <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-tight">VIA USER-ID — {activity.date}</p>
                        </div>
                      </div>
                      <button className="text-gray-300 group-hover:text-primary transition-colors">
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 border-2 border-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                  <Shield size={16} />
                  Report User
                </button>
              </div>
            )}
          </div>

          {/* Right Column (optional, but in image it shows things centered usually) */}
          <div className="hidden lg:block">
            {/* If we want to replicate the right column from some platforms, we can put Trust & Safety here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
