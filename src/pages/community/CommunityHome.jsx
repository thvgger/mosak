import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  ShoppingBag, 
  Bell, 
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const CommunityHome = () => {
  const navigate = useNavigate();

  const channels = [
    { id: 'general', name: 'General', icon: MessageSquare, members: '1.2k', description: 'General discussions' },
    { id: 'm-adverts', name: 'M-Adverts', icon: ShoppingBag, members: '856', description: 'Marketplace ads' },
    { id: 'announcements', name: 'Announcements', icon: Bell, members: '2.3k', description: 'Official news' },
    { id: 'buyers-lounge', name: 'Buyers Lounge', icon: Users, members: '643', description: 'Buyers community' },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-br from-primary to-blue-700 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Mosalak Community</h1>
          <p className="text-white/90 mb-6">Connect, learn, and grow with other members</p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100">
              Start a Discussion
            </button>
            <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30">
              Browse Channels
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Users size={24} className="text-primary mb-2" />
            <p className="text-2xl font-bold">1.2k</p>
            <p className="text-sm text-gray-600">Online Members</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <MessageSquare size={24} className="text-primary mb-2" />
            <p className="text-2xl font-bold">3.4k</p>
            <p className="text-sm text-gray-600">Messages Today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ShoppingBag size={24} className="text-primary mb-2" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Active Ads</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Award size={24} className="text-primary mb-2" />
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-gray-600">New Members</p>
          </div>
        </div>

        {/* Popular Channels */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Popular Channels</h2>
            <button className="text-primary flex items-center gap-1 text-sm">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => navigate(`/community/channel/${channel.id}`)}
                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <channel.icon size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">{channel.name}</h3>
                    <p className="text-sm text-gray-500">{channel.description}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {channel.members} members
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg border divide-y">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                    U{i+1}
                  </div>
                  <div>
                    <p className="font-medium">User Name</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Started a new discussion in #general
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHome;