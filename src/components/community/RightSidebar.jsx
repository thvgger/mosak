import React, { useState } from 'react';
import { 
  X, 
  User, 
  Star, 
  ShoppingBag, 
  Award, 
  Calendar,
  MessageCircle,
  Shield,
  Flag,
  Users,
  TrendingUp,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  Send,
  MoreHorizontal,
  Volume,
  Search,
  Pin,
  Info
} from 'lucide-react';

const RightSidebar = ({ isOpen, onClose, selectedUser, onSelectUser }) => {
  const [activeTab, setActiveTab] = useState('online');

  // Sample online users
  const onlineUsers = [
    {
      id: 1,
      name: 'Chioma Adeleke',
      role: 'Gold Seller',
      avatar: 'CA',
      status: 'online',
      badges: ['Top Seller', 'Verified'],
      rating: 4.9,
      sales: 234,
      joined: '2023',
      location: 'Lagos, NG',
      bio: 'Digital marketer specializing in social media growth. 5+ years experience.',
      lastActive: 'Just now'
    },
    {
      id: 2,
      name: 'Tunde Bakare',
      role: 'Silver Buyer',
      avatar: 'TB',
      status: 'online',
      badges: ['Frequent Buyer'],
      rating: 4.7,
      purchases: 89,
      joined: '2024',
      location: 'Abuja, NG',
      bio: 'Tech enthusiast and early adopter. Love discovering new products.',
      lastActive: '2 min ago'
    },
    {
      id: 3,
      name: 'Ngozi Okonkwo',
      role: 'Platinum Freelancer',
      avatar: 'NO',
      status: 'away',
      badges: ['Top Rated', 'Verified', 'Expert'],
      rating: 4.9,
      projects: 156,
      joined: '2022',
      location: 'Port Harcourt, NG',
      bio: 'UI/UX Designer with 7 years experience. Google certified.',
      lastActive: '15 min ago'
    },
    {
      id: 4,
      name: 'Aminu Suleiman',
      role: 'Gold Freelancer',
      avatar: 'AS',
      status: 'offline',
      badges: ['Web Developer'],
      rating: 4.8,
      projects: 92,
      joined: '2023',
      location: 'Kano, NG',
      bio: 'Full-stack developer specializing in React and Node.js',
      lastActive: '1 hour ago'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Right Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50
        w-64 bg-white
        flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-300 text-gray-400 pl-8">
          <button>
            <Volume size={18} strokeWidth={1.5} />
          </button>
          <Search size={18} strokeWidth={1.5} />
          <Pin size={18} strokeWidth={1.5} />

          <button className="font-semibold flex items-center gap-2">
            <Users size={18} />
          </button>
          <Info size={18} strokeWidth={1.5} />
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 px-4">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors
              ${activeTab === 'online' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Online (12)
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors
              ${activeTab === 'profile' && selectedUser
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors
              ${activeTab === 'all' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            All Members
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'online' && (
            <div className="p-4 space-y-2">
              {onlineUsers.filter(u => u.status === 'online').map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    onSelectUser(user);
                    setActiveTab('profile');
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user.avatar}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{user.name}</span>
                      {user.badges.includes('Verified') && (
                        <CheckCircle size={12} className="text-blue-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{user.role}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'profile' && selectedUser ? (
            <div className="p-6">
              {/* User Profile Card */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                  {selectedUser.avatar}
                </div>
                <h2 className="mt-4 text-xl font-bold">{selectedUser.name}</h2>
                <p className="text-gray-600">{selectedUser.role}</p>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{selectedUser.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{selectedUser.joined}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin size={12} />
                    {selectedUser.location}
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {selectedUser.badges.map((badge, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">
                    {selectedUser.sales || selectedUser.purchases || selectedUser.projects}
                  </div>
                  <div className="text-xs text-gray-600">
                    {selectedUser.sales ? 'Sales' : selectedUser.purchases ? 'Purchases' : 'Projects'}
                  </div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-lg font-bold">4.9</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">3</div>
                  <div className="text-xs text-gray-600">Badges</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-gray-600">{selectedUser.bio}</p>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  <MessageCircle size={16} />
                  Message
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MoreHorizontal size={16} />
                  More
                </button>
              </div>
            </div>
          ) : activeTab === 'profile' && (
            <div className="p-6 text-center text-gray-500">
              <User size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a member to view their profile</p>
            </div>
          )}

          {activeTab === 'all' && (
            <div className="p-4 space-y-2">
              {onlineUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    onSelectUser(user);
                    setActiveTab('profile');
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user.avatar}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full
                      ${user.status === 'online' ? 'bg-green-500' : 
                        user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                    </span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 truncate">{user.role}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400">{user.lastActive}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;