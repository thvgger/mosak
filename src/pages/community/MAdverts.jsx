import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Pin, 
  Calendar, 
  User, 
  Tag, 
  MessageCircle, 
  Share2, 
  Eye,
  Heart,
  ShoppingBag,
  TrendingUp,
  Clock,
  MapPin,
  PanelLeftOpen,
  PanelRightOpen,
  Filter,
  ChevronDown,
  Star,
  Award,
  ThumbsUp
} from 'lucide-react';

const MAdverts = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Sample M-Adverts data based on the image
  const adverts = [
    {
      id: 1,
      title: "🎉 Limited Offer: 50% Off on Premium Services!",
      author: "Mosalak Promotions",
      avatar: "MP",
      badge: "Gold",
      role: "Official",
      date: "2 hours ago",
      pinned: true,
      category: "Promotion",
      content: "Get 50% off on all premium services this weekend only. Use code: PREMIUM50. Offer ends Sunday!",
      image: null,
      stats: {
        views: 1245,
        likes: 234,
        comments: 45,
        shares: 23
      },
      location: "Lagos, NG"
    },
    {
      id: 2,
      title: "🚀 New Freelance Opportunities Available",
      author: "Chioma Adeleke",
      avatar: "CA",
      badge: "Platinum",
      role: "Seller",
      date: "5 hours ago",
      pinned: true,
      category: "Opportunity",
      content: "Looking for UI/UX designers and frontend developers for a major project. Remote work available. Apply now!",
      image: null,
      stats: {
        views: 3456,
        likes: 567,
        comments: 89,
        shares: 45
      },
      location: "Remote"
    },
    {
      id: 3,
      title: "📢 Weekly Deals: Electronics & Gadgets",
      author: "TechHub Nigeria",
      avatar: "TN",
      badge: "Gold",
      role: "Seller",
      date: "1 day ago",
      pinned: false,
      category: "Deals",
      content: "Check out our weekly deals on smartphones, laptops, and accessories. Up to 40% off on selected items.",
      image: null,
      stats: {
        views: 2341,
        likes: 123,
        comments: 34,
        shares: 12
      },
      location: "Abuja, NG"
    },
    {
      id: 4,
      title: "🎓 Free Webinar: Mastering Online Sales",
      author: "Tunde Bakare",
      avatar: "TB",
      badge: "Silver",
      role: "Trainer",
      date: "2 days ago",
      pinned: false,
      category: "Event",
      content: "Join our free webinar this Saturday to learn proven strategies for increasing your online sales. Limited slots available!",
      image: null,
      stats: {
        views: 1876,
        likes: 234,
        comments: 56,
        shares: 78
      },
      location: "Online"
    },
    {
      id: 5,
      title: "🏆 Seller of the Month: Ngozi Okonkwo",
      author: "Mosalak Team",
      avatar: "MT",
      badge: "Platinum",
      role: "Official",
      date: "3 days ago",
      pinned: true,
      category: "Announcement",
      content: "Congratulations to Ngozi Okonkwo for being crowned Seller of the Month! Check out her store for amazing products.",
      image: null,
      stats: {
        views: 4567,
        likes: 890,
        comments: 123,
        shares: 67
      },
      location: "Port Harcourt, NG"
    },
    {
      id: 6,
      title: "💼 Job Opening: Customer Support Specialist",
      author: "Aminu Suleiman",
      avatar: "AS",
      badge: "Gold",
      role: "Employer",
      date: "4 days ago",
      pinned: false,
      category: "Job",
      content: "We're hiring a customer support specialist to join our team. Competitive salary and benefits. Apply today!",
      image: null,
      stats: {
        views: 2890,
        likes: 156,
        comments: 67,
        shares: 34
      },
      location: "Kano, NG"
    }
  ];

  // Filter and sort logic
  const filteredAdverts = adverts
    .filter(ad => {
      if (filter === 'all') return true;
      if (filter === 'pinned') return ad.pinned;
      if (filter === 'promotion') return ad.category === 'Promotion';
      if (filter === 'deals') return ad.category === 'Deals';
      if (filter === 'opportunity') return ad.category === 'Opportunity';
      if (filter === 'event') return ad.category === 'Event';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'popular') {
        return b.stats.views - a.stats.views;
      }
      if (sortBy === 'likes') {
        return b.stats.likes - a.stats.likes;
      }
      return 0;
    });

  const getBadgeColor = (badge) => {
    const colors = {
      platinum: 'bg-purple-100 text-purple-700',
      gold: 'bg-yellow-100 text-yellow-700',
      silver: 'bg-gray-100 text-gray-700',
      bronze: 'bg-orange-100 text-orange-700'
    };
    return colors[badge?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="h-full overflow-y-auto flex-1 flex flex-col min-w-0 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="min-h-14 flex items-center justify-between gap-3 px-4">
          <div className="flex items-center">
            {!isSidebarOpen ? (
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                <PanelLeftOpen size={20} className='text-gray-400' />
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                <PanelRightOpen size={20} className='text-gray-400' />
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg text-nowrap"> M-Adverts </h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full text-nowrap">
                {filteredAdverts.length} active
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Adverts</option>
                  <option value="pinned">Pinned</option>
                  <option value="promotion">Promotions</option>
                  <option value="deals">Deals</option>
                  <option value="opportunity">Opportunities</option>
                  <option value="event">Events</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative hidden md:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 md:hidden">
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Adverts Ticker (like in the image) */}
        <div className="bg-primary/5 border-t border-b border-primary/20 px-4 py-2 overflow-hidden">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              <Pin size={12} />
              Pinned:
            </span>
            {adverts.filter(a => a.pinned).map(ad => (
              <span key={ad.id} className="text-xs text-gray-600 hover:text-primary cursor-pointer">
                {ad.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Adverts Grid */}
      <div className="p-4 md:p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredAdverts.map((advert) => (
            <div 
              key={advert.id} 
              className={`hidden bg-white rounded-lg border ${advert.pinned ? 'border-primary/30 bg-primary/5' : 'border-gray-200'} p-4 md:p-5 hover:shadow-lg transition-all cursor-pointer`}
            >
              {/* Pin Badge */}
              {advert.pinned && (
                <div className="flex items-center gap-1 text-xs text-primary mb-3 bg-primary/10 px-2 py-1 rounded-full w-fit">
                  <Pin size={12} />
                  <span>Pinned advert</span>
                </div>
              )}

              {/* Header with Category */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  {advert.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {advert.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                {advert.title}
              </h3>

              {/* Author Info - Like in the image */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {advert.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="font-medium text-sm truncate">{advert.author}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(advert.badge)}`}>
                      {advert.badge}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {advert.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {advert.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {advert.content}
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {advert.stats.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {advert.stats.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {advert.stats.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 size={14} />
                  {advert.stats.shares}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition flex items-center justify-center gap-2">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Heart size={16} className={advert.stats.likes > 0 ? 'text-red-500' : 'text-gray-600'} />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Share2 size={16} />
                </button>
              </div>

              {/* Engagement Bar (optional) */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${Math.min(100, (advert.stats.views / 5000) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">Engagement</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredAdverts.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition flex items-center gap-2">
              Load More Adverts
              <ChevronDown size={16} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredAdverts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No adverts found</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for new M-Adverts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MAdverts;