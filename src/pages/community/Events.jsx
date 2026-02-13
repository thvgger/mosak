import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Search,
  Filter,
  Plus,
  ChevronRight,
  Video,
  Gift,
  Award
} from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const events = [
    {
      id: 1,
      title: 'Monthly Seller Meetup',
      type: 'Virtual Meetup',
      date: '2024-03-25',
      time: '15:00 WAT',
      attendees: 45,
      maxAttendees: 100,
      host: 'Mosalak Team',
      hostAvatar: 'MT',
      description: 'Join us for our monthly seller meetup where we discuss marketplace trends, tips, and network with other sellers.',
      location: 'Zoom (Link provided after RSVP)',
      tags: ['Sellers', 'Networking'],
      image: '🎯'
    },
    {
      id: 2,
      title: 'Freelancer Workshop: Pricing Strategies',
      type: 'Workshop',
      date: '2024-03-28',
      time: '14:00 WAT',
      attendees: 32,
      maxAttendees: 50,
      host: 'Ngozi Okonkwo',
      hostAvatar: 'NO',
      description: 'Learn effective pricing strategies for your freelance services. Perfect for new and experienced freelancers.',
      location: 'Community Channel #workshops',
      tags: ['Freelancers', 'Workshop'],
      image: '💼'
    },
    {
      id: 3,
      title: 'Community Giveaway Event',
      type: 'Special Event',
      date: '2024-04-01',
      time: '12:00 WAT',
      attendees: 128,
      maxAttendees: 500,
      host: 'Mosalak Team',
      hostAvatar: 'MT',
      description: 'Participate in our biggest giveaway event! Prizes include premium badges, account credits, and more.',
      location: 'Online',
      tags: ['Giveaway', 'All Members'],
      image: '🎁'
    },
    {
      id: 4,
      title: 'Buyers Guide: Safe Shopping',
      type: 'Webinar',
      date: '2024-04-05',
      time: '16:00 WAT',
      attendees: 67,
      maxAttendees: 200,
      host: 'Security Team',
      hostAvatar: 'ST',
      description: 'Learn how to shop safely on Mosalak, identify trusted sellers, and protect your transactions.',
      location: 'Community Live Channel',
      tags: ['Buyers', 'Security'],
      image: '🛡️'
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Community Events</h1>
            <p className="text-gray-600">Join events, workshops, and connect with members</p>
          </div>
          <button className="btn px-6 py-2.5 flex items-center gap-2 whitespace-nowrap">
            <Plus size={18} />
            Create Event
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2.5 border rounded-lg bg-white text-sm">
              <option>All Categories</option>
              <option>Webinars</option>
              <option>Workshops</option>
              <option>Meetups</option>
              <option>Giveaways</option>
            </select>
            <button className="px-4 py-2.5 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={18} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6 overflow-x-auto pb-1">
          {['upcoming', 'ongoing', 'past', 'hosting'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab} {tab === 'upcoming' && '(6)'}
              {tab === 'ongoing' && '(1)'}
            </button>
          ))}
        </div>

        {/* Featured Event */}
        <div className="bg-linear-to-br from-primary to-blue-700 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="text-4xl">🎉</div>
              <div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Featured Event</span>
                <h2 className="text-xl font-bold mt-2 mb-1">Mosalak Anniversary Celebration</h2>
                <p className="text-white/90 text-sm mb-4">Join us as we celebrate 2 years of Mosalak!</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>April 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>14:00 WAT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>234 attending</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-white text-primary rounded-lg font-medium text-sm hover:bg-gray-100">
              RSVP Now
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg border p-5 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Event Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  {event.image}
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{event.title}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
                      {event.type}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={14} />
                      <span>{event.attendees}/{event.maxAttendees} attending</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Host & Action */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        {event.hostAvatar}
                      </div>
                      <span className="text-xs text-gray-600">{event.host}</span>
                    </div>
                    <button className="text-primary text-sm font-medium flex items-center gap-1">
                      View Details
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar View Link */}
        <div className="mt-6 text-center">
          <button className="text-primary text-sm flex items-center gap-2 mx-auto">
            <Calendar size={16} />
            View Full Calendar
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;