import React from 'react';
import { Award, Star, Shield, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const Badges = () => {
  const badges = [
    {
      name: 'Verified Buyer',
      icon: CheckCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      description: 'Completed 10+ purchases',
      earned: true,
      date: 'Jan 2026'
    },
    {
      name: 'Trusted Seller',
      icon: Shield,
      color: 'text-green-600',
      bg: 'bg-green-100',
      description: '50+ positive reviews',
      earned: true,
      date: 'Feb 2026'
    },
    {
      name: 'Gold Member',
      icon: Award,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      description: 'Active member for 1+ year',
      earned: true,
      date: 'Mar 2026'
    },
    {
      name: 'Top Contributor',
      icon: Star,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      description: 'Helped 100+ community members',
      earned: false,
      progress: 75
    },
    {
      name: 'Rising Star',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      description: 'Complete 20 orders in 30 days',
      earned: false,
      progress: 60
    },
    {
      name: 'Early Adopter',
      icon: Clock,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
      description: 'Joined in the first year',
      earned: false,
      progress: 0
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Badges & Achievements</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Earned Badges</p>
          <p className="text-2xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-orange-600">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Total Available</p>
          <p className="text-2xl font-bold text-blue-600">6</p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${badge.bg} rounded-lg`}>
                  <Icon size={24} className={badge.color} />
                </div>
                {badge.earned ? (
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                    Earned
                  </span>
                ) : badge.progress > 0 ? (
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                    {badge.progress}%
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    Locked
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{badge.description}</p>
              {badge.earned && (
                <p className="text-xs text-gray-400">Earned on {badge.date}</p>
              )}
              {!badge.earned && badge.progress > 0 && (
                <div className="mt-2">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;