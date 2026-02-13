import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  CheckCircle,
  MessageCircle,
  MoreVertical,
  Award,
  ShoppingBag,
  Briefcase,
  Users,
  Crown,
  Shield
} from 'lucide-react';

const Members = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const members = [
    {
      id: 1,
      name: 'Chioma Adeleke',
      avatar: 'CA',
      role: 'Gold Seller',
      badges: ['Top Seller', 'Verified', 'Expert'],
      status: 'online',
      joined: '2023',
      contributions: 234,
      rating: 4.9,
      location: 'Lagos, NG'
    },
    {
      id: 2,
      name: 'Tunde Bakare',
      avatar: 'TB',
      role: 'Silver Buyer',
      badges: ['Frequent Buyer', 'Verified'],
      status: 'online',
      joined: '2024',
      contributions: 89,
      rating: 4.7,
      location: 'Abuja, NG'
    },
    {
      id: 3,
      name: 'Ngozi Okonkwo',
      avatar: 'NO',
      role: 'Platinum Freelancer',
      badges: ['Top Rated', 'Verified', 'Expert', 'Mentor'],
      status: 'away',
      joined: '2022',
      contributions: 456,
      rating: 4.9,
      location: 'Port Harcourt, NG'
    },
    {
      id: 4,
      name: 'Aminu Suleiman',
      avatar: 'AS',
      role: 'Gold Freelancer',
      badges: ['Web Developer', 'Verified'],
      status: 'offline',
      joined: '2023',
      contributions: 92,
      rating: 4.8,
      location: 'Kano, NG'
    },
    {
      id: 5,
      name: 'Folake Coker',
      avatar: 'FC',
      role: 'Platinum Seller',
      badges: ['Top Seller', 'Verified', 'Fashion Expert'],
      status: 'online',
      joined: '2021',
      contributions: 567,
      rating: 5.0,
      location: 'Ibadan, NG'
    },
    {
      id: 6,
      name: 'Emeka Okafor',
      avatar: 'EO',
      role: 'Moderator',
      badges: ['Staff', 'Verified', 'Helper'],
      status: 'online',
      joined: '2022',
      contributions: 789,
      rating: 4.9,
      location: 'Enugu, NG'
    }
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Community Members</h1>
            <p className="text-gray-600">Connect with other members and grow your network</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <span className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm">
                1,247 total members
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search members by name, role, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2.5 border rounded-lg bg-white text-sm">
              <option>All Roles</option>
              <option>Buyers</option>
              <option>Sellers</option>
              <option>Freelancers</option>
              <option>Moderators</option>
            </select>
            <button className="px-4 py-2.5 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6 overflow-x-auto pb-1">
          {['all', 'online', 'verified', 'experts', 'staff'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab} {tab === 'all' && '(247)'}
              {tab === 'online' && '(89)'}
              {tab === 'verified' && '(156)'}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg border p-5 hover:shadow-md transition-shadow">
              {/* Member Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {member.avatar}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${getStatusColor(member.status)} border-2 border-white rounded-full`}></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{member.name}</h3>
                      {member.badges.includes('Verified') && (
                        <CheckCircle size={14} className="text-blue-500" />
                      )}
                      {member.role.includes('Moderator') && (
                        <Shield size={14} className="text-purple-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-4">
                {member.badges.slice(0, 3).map((badge, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                    {badge}
                  </span>
                ))}
                {member.badges.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                    +{member.badges.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="font-semibold">{member.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
                <div className="text-center border-x">
                  <div className="font-semibold">{member.contributions}</div>
                  <span className="text-xs text-gray-500">Contributions</span>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{member.joined}</div>
                  <span className="text-xs text-gray-500">Joined</span>
                </div>
              </div>

              {/* Location & Actions */}
              <div className="text-sm text-gray-500 mb-4">
                📍 {member.location}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                  <MessageCircle size={16} />
                  Message
                </button>
                <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;