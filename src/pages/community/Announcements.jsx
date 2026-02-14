import React from 'react';
import { Bell, Pin, Calendar, User, Tag, MessageCircle, Share2 } from 'lucide-react';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "🎉 New Platform Features Released!",
      author: "Mosalak Team",
      avatar: "MT",
      date: "2 hours ago",
      pinned: true,
      category: "Platform Update",
      content: "We're excited to announce new features including improved search filters, faster checkout, and enhanced security. Check them out now!",
      comments: 45,
      likes: 234
    },
    {
      id: 2,
      title: "📢 Community Guidelines Update",
      author: "Moderator Team",
      avatar: "MD",
      date: "1 day ago",
      pinned: false,
      category: "Policy",
      content: "We've updated our community guidelines to ensure a safer environment for everyone. Please review the changes.",
      comments: 23,
      likes: 89
    },
    {
      id: 3,
      title: "🎊 100,000 Users Celebration!",
      author: "Founders",
      avatar: "FD",
      date: "3 days ago",
      pinned: true,
      category: "Event",
      content: "We hit 100,000 users! To celebrate, we're giving away special badges to all active members this week.",
      comments: 156,
      likes: 567
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Bell size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Announcements</h1>
            <p className="text-sm md:text-base text-gray-600">Stay updated with the latest news from Mosalak</p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4 md:space-y-6">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="bg-white rounded-lg border border-gray-300 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              {/* Pin Badge */}
              {announcement.pinned && (
                <div className="flex items-center gap-1 text-sm text-primary mb-3">
                  <Pin size={14} />
                  <span>Pinned announcement</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {announcement.title}
                </h2>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs whitespace-nowrap">
                  {announcement.category}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  {announcement.avatar}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{announcement.author}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {announcement.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {announcement.content}
              </p>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {announcement.comments} comments
                  </span>
                  <span className="flex items-center gap-1">
                    👍 {announcement.likes} likes
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50">
                    Read More
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={16} />
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

export default Announcements;