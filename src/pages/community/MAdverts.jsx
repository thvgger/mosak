import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Star,
  Share2,
  Heart,
  MessageCircle,
  ChevronDown
} from 'lucide-react';

const MAdverts = () => {
  const [filter, setFilter] = useState('latest');

  const ads = [
    {
      id: 1,
      title: "Premium Digital Marketing Course",
      seller: "Chioma Adeleke",
      avatar: "CA",
      badge: "Gold Seller",
      price: "₦45,000",
      oldPrice: "₦65,000",
      discount: "-30%",
      description: "Complete digital marketing masterclass with certification. 50+ hours of content, lifetime access.",
      image: "📱",
      category: "Education",
      expires: "3 days left",
      views: 234,
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "Handmade African Beaded Jewelry",
      seller: "Amina Sule",
      avatar: "AS",
      badge: "Platinum Seller",
      price: "₦12,500",
      description: "Authentic handmade beads from Northern Nigeria. Perfect for weddings and special occasions.",
      image: "💎",
      category: "Fashion",
      expires: "5 days left",
      views: 567,
      likes: 89,
      comments: 23
    },
    {
      id: 3,
      title: "Web Development Services",
      seller: "Tunde Bakare",
      avatar: "TB",
      badge: "Silver Freelancer",
      price: "₦150,000",
      description: "Full-stack web development. React, Node.js, MongoDB. 3+ years experience.",
      image: "💻",
      category: "Services",
      expires: "7 days left",
      views: 123,
      likes: 34,
      comments: 8
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">M-Adverts</h1>
            <p className="text-gray-600">Promote your products and services to the community</p>
          </div>
          <button className="btn px-6 py-2.5 whitespace-nowrap">
            Create Advert
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search adverts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option>All Categories</option>
              <option>Education</option>
              <option>Fashion</option>
              <option>Services</option>
              <option>Electronics</option>
            </select>
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b pb-2 overflow-x-auto">
          {['Latest', 'Trending', 'Expiring Soon', 'Most Viewed', 'Most Liked'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab.toLowerCase())}
              className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors
                ${filter === tab.toLowerCase() 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Adverts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Ad Type */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    M-Advert
                  </span>
                  {ad.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {ad.discount}
                    </span>
                  )}
                </div>

                {/* Seller Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {ad.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{ad.seller}</p>
                    <p className="text-xs text-gray-500">{ad.badge}</p>
                  </div>
                </div>

                {/* Ad Content */}
                <div className="mb-4">
                  <div className="text-4xl mb-2">{ad.image}</div>
                  <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{ad.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">{ad.price}</span>
                  {ad.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">{ad.oldPrice}</span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{ad.expires}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <TrendingUp size={14} />
                      {ad.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={14} />
                      {ad.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {ad.comments}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm hover:bg-primary/90">
                    View Deal
                  </button>
                  <button className="px-3 border rounded-lg hover:bg-gray-50">
                    <Share2 size={16} />
                  </button>
                  <button className="px-3 border rounded-lg hover:bg-gray-50">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MAdverts;