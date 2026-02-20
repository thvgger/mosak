import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  MapPin,
  MessageCircle,
  MoreHorizontal,
  User,
  CheckCircle,
  Award,
  ShoppingBag,
  Briefcase,
  Volume,
  Search,
  Users
} from 'lucide-react';

const UserProfileSidebar = ({ isOpen, onClose, selectedUser, isMobile }) => {
  const [isDesktop, setIsDesktop] = useState(!isMobile);

  useEffect(() => {
    setIsDesktop(!isMobile);
  }, [isMobile]);

  if (!isOpen || !selectedUser) return null;

  // Sample user data structure (you can expand this)
  const userData = {
    id: selectedUser.id,
    name: selectedUser.name,
    role: selectedUser.role,
    avatar: selectedUser.avatar || selectedUser.name.split(' ').map(n => n[0]).join(''),
    badges: selectedUser.badges || ['Verified'],
    rating: selectedUser.rating || 4.9,
    joined: selectedUser.joined || '2023',
    location: selectedUser.location || 'Lagos, NG',
    bio: selectedUser.bio || 'Community member passionate about connecting and sharing knowledge.',
    stats: {
      sales: selectedUser.sales || 0,
      purchases: selectedUser.purchases || 0,
      projects: selectedUser.projects || 0,
      reviews: selectedUser.reviews || 124
    }
  };

  // Desktop Sidebar View
  if (isDesktop) {
    return (
      <>
        {/* Mobile Overlay - only shows on mobile but we keep it for consistency */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden flex"
            onClick={onClose}
          />
        )}

        {/* Desktop Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 right-0 z-50
          w-72 bg-white border-l border-gray-200
          flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-full'}
        `}>
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Profile</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Profile Header */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                {userData.avatar}
              </div>
              
              <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-600 text-sm">{userData.role}</p>
              
              {/* Rating and Location */}
              <div className="flex items-center justify-center gap-3 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="font-medium">{userData.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600 flex items-center gap-1">
                  <MapPin size={14} />
                  {userData.location}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {userData.badges.map((badge, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-1">
                    {badge === 'Verified' && <CheckCircle size={12} className="text-blue-500" />}
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2 mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {userData.stats.sales || userData.stats.projects || '0'}
                </div>
                <div className="text-xs text-gray-600">
                  {selectedUser.sales ? 'Sales' : selectedUser.projects ? 'Projects' : 'Posts'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {userData.stats.purchases || '0'}
                </div>
                <div className="text-xs text-gray-600">Purchases</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{userData.rating}</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {userData.stats.reviews || '0'}
                </div>
                <div className="text-xs text-gray-600">Reviews</div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h3 className="font-medium mb-2 text-sm">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {userData.bio}
              </p>
            </div>

            {/* Recent Activity Preview */}
            <div className="mt-6">
              <h3 className="font-medium mb-3 text-sm">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MessageCircle size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">
                      Commented on "Looking for UI/UX Designer"
                    </p>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">
                      Received "Top Contributor" badge
                    </p>
                    <span className="text-xs text-gray-400">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                <MessageCircle size={16} />
                Message
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                <MoreHorizontal size={16} />
                More
              </button>
            </div>

            {/* Report/Block Options */}
            <button className="w-full mt-4 text-sm text-gray-400 hover:text-red-500 transition text-center">
              Report User
            </button>
          </div>
        </aside>
      </>
    );
  }

  // Mobile Popup View
  return (
    <div className="fixed inset-0 z-50 flex items-end md:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="relative bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
        {/* Handle bar for drag to close */}
        <div className="sticky top-0 bg-white pt-3 pb-2 flex justify-center border-b border-gray-100">
          <div 
            className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <X size={20} />
        </button> */}

        {/* Content */}
        <div className="px-6 pb-8">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {userData.avatar}
            </div>
            
            <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
            <p className="text-gray-600 text-sm">{userData.role}</p>
            
            {/* Rating and Location */}
            <div className="flex items-center justify-center gap-3 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="font-medium">{userData.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 flex items-center gap-1">
                <MapPin size={14} />
                {userData.location}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {userData.badges.map((badge, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-1">
                  {badge === 'Verified' && <CheckCircle size={12} className="text-blue-500" />}
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-6 p-2 bg-gray-300 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {userData.stats.sales || userData.stats.projects || '0'}
              </div>
              <div className="text-xs text-gray-600">
                {selectedUser.sales ? 'Sales' : selectedUser.projects ? 'Projects' : 'Posts'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {userData.stats.purchases || '0'}
              </div>
              <div className="text-xs text-gray-600">Purchases</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{userData.rating}</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {userData.stats.reviews || '0'}
              </div>
              <div className="text-xs text-gray-600">Reviews</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <h3 className="font-medium mb-2 text-sm">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {userData.bio}
            </p>
          </div>

          {/* Recent Activity Preview */}
          <div className="mt-6">
            <h3 className="font-medium mb-3 text-sm">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MessageCircle size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">
                    Commented on "Looking for UI/UX Designer"
                  </p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Award size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">
                    Received "Top Contributor" badge
                  </p>
                  <span className="text-xs text-gray-400">Yesterday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
              <MessageCircle size={16} />
              Message
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
              <MoreHorizontal size={16} />
              More
            </button>
          </div>

          {/* Report/Block Options */}
          <button className="w-full mt-4 text-sm text-gray-400 hover:text-red-500 transition text-center">
            Report User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;