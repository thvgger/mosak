import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  Clock, 
  CheckCircle,
  Plus,
  TrendingUp,
  MessageCircle,
  Share2
} from 'lucide-react';

const Polls = () => {
  const [activeTab, setActiveTab] = useState('active');

  const polls = [
    {
      id: 1,
      title: 'What features would you like to see next?',
      author: 'Mosalak Team',
      avatar: 'MT',
      timeAgo: '2 hours ago',
      votes: 234,
      comments: 45,
      status: 'active',
      endsIn: '3 days',
      options: [
        { id: 1, text: 'Advanced search filters', votes: 89, percentage: 38 },
        { id: 2, text: 'Video product listings', votes: 76, percentage: 32 },
        { id: 3, text: 'Bulk messaging tool', votes: 45, percentage: 19 },
        { id: 4, text: 'Analytics dashboard', votes: 24, percentage: 11 }
      ]
    },
    {
      id: 2,
      title: 'Preferred payment method?',
      author: 'Community Team',
      avatar: 'CT',
      timeAgo: '1 day ago',
      votes: 156,
      comments: 23,
      status: 'active',
      endsIn: '5 days',
      options: [
        { id: 1, text: 'Bank Transfer', votes: 78, percentage: 50 },
        { id: 2, text: 'Card Payment', votes: 45, percentage: 29 },
        { id: 3, text: 'USSD', votes: 23, percentage: 15 },
        { id: 4, text: 'Crypto', votes: 10, percentage: 6 }
      ]
    },
    {
      id: 3,
      title: 'Best time for community workshops?',
      author: 'Events Team',
      avatar: 'ET',
      timeAgo: '3 days ago',
      votes: 89,
      comments: 12,
      status: 'ended',
      endsIn: 'Ended',
      options: [
        { id: 1, text: 'Weekdays (Evening)', votes: 45, percentage: 51 },
        { id: 2, text: 'Weekends (Morning)', votes: 32, percentage: 36 },
        { id: 3, text: 'Weekends (Afternoon)', votes: 12, percentage: 13 }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Community Polls</h1>
            <p className="text-gray-600">Share your opinion and help shape the community</p>
          </div>
          <button className="btn px-6 py-2.5 flex items-center gap-2 whitespace-nowrap">
            <Plus size={18} />
            Create Poll
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-600">Active Polls</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-xs text-gray-600">Total Votes</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-gray-600">Participation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6 overflow-x-auto pb-1">
          {['active', 'ended', 'popular', 'my-votes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab} {tab === 'active' && '(6)'}
              {tab === 'ended' && '(12)'}
            </button>
          ))}
        </div>

        {/* Polls List */}
        <div className="space-y-4">
          {polls.map((poll) => (
            <div key={poll.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              {/* Poll Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                    {poll.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{poll.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${poll.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {poll.status === 'active' ? `Ends in ${poll.endsIn}` : poll.endsIn}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>Posted by {poll.author}</span>
                      <span>•</span>
                      <span>{poll.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Share2 size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Poll Options */}
              <div className="space-y-3 mb-4">
                {poll.options.map((option) => (
                  <div key={option.id} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{option.text}</span>
                      <span className="text-sm font-medium">{option.percentage}% ({option.votes} votes)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Poll Footer */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {poll.votes} votes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {poll.comments} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {poll.endsIn}
                  </span>
                </div>
                <div className="flex gap-2">
                  {poll.status === 'active' ? (
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                      Vote Now
                    </button>
                  ) : (
                    <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                      View Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Polls;