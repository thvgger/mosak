import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BadgeCheck,
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
      <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
        <CategoriesBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-gray-700 transition-colors ml-2"
        >
          <ChevronRight className="rotate-180" size={14} />
          <span>Back</span>
        </button>

        {/* Profile Header Card */}
        <div className="bg-primary/10 rounded-2xl md:rounded-3xl border border-gray-200 p-8 md:p-12 mb-8 shadow-sm relative text-center">
          {/* Top Badges (Desktop-only corner) */}
          {/* <div className="hidden md:flex absolute top-10 left-10 items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] text-[#0024FF] text-[10px] font-bold rounded-full border border-[#DDE4FF] uppercase tracking-tight">
              <CheckCircle size={12} fill="currentColor" className="text-white" />
              Verified User
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7ED] text-[#EA580C] text-[10px] font-bold rounded-full border border-[#FFEDD5] uppercase tracking-tight">
              <img src={bronzeBadge} alt="" className="w-3.5 h-3.5" />
              Bronze
            </div>
          </div> */}

          {/* Top Actions */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 flex gap-2 md:gap-4">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={24} />
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors">
              <Share2 size={24} />
            </button>
          </div>

          {/* Centered Content */}
          <div className="flex flex-col items-center mt-4">
            {/* Mobile-only Badges */}
            {/* <div className="flex md:hidden items-center gap-2 mb-6">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-[#EEF2FF] text-[#0024FF] text-[9px] font-bold rounded-full border border-[#DDE4FF] uppercase">
                <CheckCircle size={10} fill="currentColor" className="text-white" />
                Verified
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-[#FFF7ED] text-[#EA580C] text-[9px] font-bold rounded-full border border-[#FFEDD5] uppercase">
                <img src={bronzeBadge} alt="" className="w-3 h-3" />
                Bronze
              </div>
            </div> */}

            <div className="relative mb-6">
              <img 
                src={avatarImg} 
                alt="Stacey Samuel" 
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              {/* Online Indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 md:w-6 md:h-6 bg-[#00C853] border-[3px] md:border-4 border-white rounded-full shadow-lg" title="Online" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
              Stacey Samuel
              <div className="flex items-center gap-1.5 shrink-0">
                <BadgeCheck size={28} className="text-white" fill='#0024FF' />
                <img src={bronzeBadge} alt="Bronze" className="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mb-8 font-medium">Member since Jan 2025</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-12 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map((stat, i) => (
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

        {/* Tabs - Scrollable on mobile */}
        <div className="border-b border-gray-200 mb-8 overflow-x-auto custom-scrollbar">
          <nav className="flex gap-8 md:gap-10 min-w-max px-2">
            {['overview', 'reviews', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs md:text-sm font-bold capitalize relative transition-colors ${
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
              <div className="space-y-6 md:space-y-10">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">Bio</h2>
                  <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-medium">
                    Freelance product designer based in Lagos. I specialize in creative brands and digital agencies. Fast communicator, always happy to discuss scope before committing.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">Activity summary</h2>
                  <div className="flex items-center gap-8 md:gap-12">
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-black text-gray-900">42</span>
                      <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Completed deals</span>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-black text-gray-900">11</span>
                      <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Active projects</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-[10px] md:text-xs text-green-600 font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Active 2 hours ago
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">Trust & safety</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-green-600 rounded-xl flex items-center justify-center shadow-sm">
                          <CheckCircle size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-gray-900">Identity verified</p>
                          <p className="text-[10px] md:text-xs text-gray-500 font-medium">KYC verified - Government ID confirmed</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm">
                          <Shield size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-gray-900">Escrow protected</p>
                          <p className="text-[10px] md:text-xs text-gray-500 font-medium">Transactions secured via Escrow</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-4 border-2 border-red-50 text-red-600 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                    <Shield size={16} />
                    Report User
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-8 uppercase tracking-tight">User Reviews</h2>
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mb-12">
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl font-black text-gray-900 mb-2">4.9<span className="text-xl text-gray-300">/5</span></div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest">23 Reviews</p>
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
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 w-10 md:w-12">{item.stars} Star</span>
                        <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(item.count / 158) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-gray-400 w-8 md:w-10">({item.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-xs md:text-sm font-bold text-gray-900">{review.user}</p>
                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-100"} />
                        ))}
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium mb-4">{review.comment}</p>
                      <div className="flex items-center justify-end">
                        <span className="text-[9px] md:text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded uppercase tracking-widest border border-primary/10">Buyer Side</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-8 uppercase tracking-tight">Recent activity</h2>
                <div className="space-y-4 md:space-y-5">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-2xl group cursor-pointer hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-sm ${activity.color}`}>
                          <activity.icon size={18} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-gray-900">{activity.type} — <span className="text-primary">{activity.title}</span></p>
                          <p className="text-[9px] md:text-xs text-gray-400 font-bold mt-1 uppercase tracking-tight">VIA USER-ID — {activity.date}</p>
                        </div>
                      </div>
                      <button className="text-gray-300 group-hover:text-primary transition-colors">
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 border-2 border-red-50 text-red-600 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                  <Shield size={16} />
                  Report User
                </button>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="hidden lg:block">
            {/* Empty or reserved for layout balance */}
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

export default BuyerProfile;
