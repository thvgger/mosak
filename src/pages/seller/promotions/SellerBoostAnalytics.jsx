import React from 'react';
import { 
  ArrowLeft, 
  Eye, 
  MousePointer, 
  MessageSquare, 
  Heart, 
  BarChart2, 
  Users,
  ChevronUp,
  TrendingUp,
  Info,
  CheckCircle2,
  Lightbulb,
  MoreVertical,
  Star,
  Clock,
  MapPin,
  Pause,
  Play,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const SellerBoostAnalytics = ({ promotion, onBack }) => {
  // Sample data for the chart
  const performanceData = [
    { name: 'Mon', impressions: 85000, clicks: 125000 },
    { name: 'Tue', impressions: 142000, clicks: 158000 },
    { name: 'Wed', impressions: 90000, clicks: 135000 },
    { name: 'Thu', impressions: 82000, clicks: 145000 },
    { name: 'Fri', impressions: 84000, clicks: 148000 },
    { name: 'Sat', impressions: 81000, clicks: 146000 },
    { name: 'Sun', impressions: 88000, clicks: 152000 },
  ];

  const engagementBreakdown = [
    { label: 'Marketplace', value: 61, color: 'bg-blue-600', views: '845 views' },
    { label: 'Community Posts', value: 22, color: 'bg-purple-600', views: '273 views' },
    { label: 'Search Results', value: 10, color: 'bg-emerald-600', views: '124 views' },
  ];

  const deviceUsage = [
    { label: 'Mobile', value: 76, color: 'bg-emerald-500', views: '945 views' },
    { label: 'Desktop', value: 24, color: 'bg-gray-700', views: '297 views' },
  ];

  const topLocations = [
    { name: 'Lagos', percentage: '45%' },
    { name: 'Abuja', percentage: '23%' },
    { name: 'Ibadan', percentage: '18%' },
    { name: 'Other', percentage: '14%' },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header / Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Promotions
      </button>

      {/* Promotion Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm relative">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400" 
                alt="Product" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Wireless Bluetooth Headphones</h1>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold border border-purple-100 uppercase tracking-wider">
                  <Star size={12} fill="currentColor" />
                  Premium Boost
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100 uppercase tracking-wider">
                  <CheckCircle2 size={12} />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mb-1">Daily Cost</p>
                  <p className="text-lg font-black text-gray-900">₦500</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mb-1">Remaining Days</p>
                  <p className="text-lg font-black text-gray-900">5 days</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mb-1">Views</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-lg font-black text-gray-900">1,247</p>
                    <TrendingUp size={16} className="text-emerald-500" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mb-1">Clicks</p>
                  <p className="text-lg font-black text-gray-900">89</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-3 min-w-[200px]">
             <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-1">
                <span>Started 1/8/2026</span>
                <span>5 days left</span>
             </div>
             <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[60%]"></div>
             </div>
             <div className="flex gap-3 pt-4">
                <button className="flex-1 py-3 border-2 border-gray-100 rounded-xl text-sm font-bold text-blue-600 hover:bg-gray-50 transition-all">
                  Pause Boost
                </button>
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
                  Extend Boost
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {[
          { label: 'Impressions', value: '1,242', change: '+ 12%', icon: Eye, color: 'text-blue-500', bgColor: 'bg-blue-50' },
          { label: 'Clicks', value: '156', change: '+ 8%', icon: MousePointer, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
          { label: 'Messages', value: '23', change: '+ 15%', icon: MessageSquare, color: 'text-purple-500', bgColor: 'bg-purple-50' },
          { label: 'Saves', value: '89', change: '+ 5%', icon: Heart, color: 'text-rose-500', bgColor: 'bg-rose-50' },
          { label: 'Conversion', value: '12.7%', change: '+ 2%', icon: BarChart2, color: 'text-orange-500', bgColor: 'bg-orange-50' },
          { label: 'Profile Visits', value: '67', change: '+ 18%', icon: Users, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mt-1">{stat.label}</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <TrendingUp size={12} />
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 gap-8">
        {/* Performance Over Time */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Performance Over Time</h2>
              <p className="text-sm text-gray-400 font-medium">Track your listing's visibility and engagement</p>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
                          <p className="font-bold text-gray-900 mb-2">{payload[0].payload.name}</p>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-blue-600 flex justify-between gap-4">
                              <span>Impressions:</span>
                              <span>{payload[0].value.toLocaleString()}</span>
                            </p>
                            <p className="text-xs font-bold text-emerald-500 flex justify-between gap-4">
                              <span>Clicks:</span>
                              <span>{payload[1].value.toLocaleString()}</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="left" 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '30px', fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}
                />
                <Bar dataKey="impressions" name="Impressions" fill="#0024ff" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="clicks" name="Clicks" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Engagement Breakdown</h2>
                <p className="text-sm text-gray-400 font-medium">Where Users Found Your Listing</p>
              </div>
              
              <div className="space-y-6">
                {engagementBreakdown.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-gray-900">{item.label}</span>
                      <span className="text-gray-400">{item.views}</span>
                    </div>
                    <div className="w-full h-8 bg-gray-50 rounded-lg overflow-hidden relative">
                      <div 
                        className={`h-full ${item.color} rounded-lg transition-all duration-1000 flex items-center justify-center text-[10px] font-black text-white`}
                        style={{ width: `${item.value}%` }}
                      >
                        {item.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 pt-4">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">Device Usage</p>
                <div className="space-y-4">
                  {deviceUsage.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-900">{item.label}</span>
                        <span className="text-gray-400">{item.views}</span>
                      </div>
                      <div className="w-full h-8 bg-gray-50 rounded-lg overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-lg transition-all duration-1000 flex items-center justify-center text-[10px] font-black text-white`}
                          style={{ width: `${item.value}%` }}
                        >
                          {item.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[320px] space-y-8">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">Top Locations</p>
              <div className="space-y-6">
                {topLocations.map((loc, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <span className="w-6 text-sm font-black text-gray-300 group-hover:text-blue-600 transition-colors">{i + 1}.</span>
                      <span className="text-sm font-bold text-gray-900">{loc.name}</span>
                    </div>
                    <span className="text-sm font-black text-gray-400">{loc.percentage}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-gray-50">
                 <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                   View Detailed Report
                   <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-[#f8faff] rounded-3xl border border-blue-100 p-6 sm:p-10 shadow-sm space-y-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Lightbulb className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Insights & Recommendations</h2>
            <p className="text-sm text-gray-400 font-medium">Data-driven suggestions to maximize your boost</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Your Boost Performance</p>
            <div className="space-y-5">
              {[
                '1,242 people viewed your listing',
                '156 clicked to see details (12.6% click rate)',
                '23 sent you a message (2.3% conversion)',
                '12 resulted in confirmed projects'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm font-bold text-gray-800">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-6 space-y-5">
            <div className="flex items-center gap-3 text-emerald-700">
               <TrendingUp size={20} />
               <p className="text-sm font-black uppercase tracking-wider">What's Working Well</p>
            </div>
            <div className="space-y-4">
              {[
                'Your click rate is 15% above average',
                'Profile visits increased by 67 during boost'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <p className="text-sm font-bold text-emerald-800">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-gray-900">
               <Star size={20} fill="currentColor" />
               <p className="text-sm font-black uppercase tracking-wider">Ways to Improve</p>
            </div>
            <div className="space-y-4">
              {[
                'Add 2-3 more images to increase engagement',
                'Respond to messages within 2 hours for better conversion'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm font-bold text-gray-800">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
               <span className="text-lg font-black text-gray-900">₦ ROI Summary</span>
            </div>
            <div className="space-y-2">
               <p className="text-sm font-bold text-gray-500">Spent: <span className="text-gray-900">₦13,735 Nigerian Naira (NGN).</span></p>
               <p className="text-sm font-bold text-gray-500">Estimated value from projects: <span className="text-gray-900">₦71,343.72 (NGN)</span></p>
               <p className="text-base font-black text-emerald-600 pt-2">Return on investment: 5.3x</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Footer CTA */}
      <div className="text-center space-y-8 py-10 border-t border-gray-100">
         <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900">Ready to Keep Growing?</h3>
            <p className="text-sm text-gray-500 font-medium">Your boost ends in 3 days. Extend now to maintain visibility and keep the momentum going.</p>
         </div>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-12 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-900 hover:bg-gray-50 transition-all">
               Pause
            </button>
            <button className="w-full sm:w-auto px-16 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25">
               Extend Boost
            </button>
            <button 
              onClick={onBack}
              className="w-full sm:w-auto px-12 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-900 hover:bg-gray-50 transition-all"
            >
               Back to Promotions
            </button>
         </div>
      </div>
    </div>
  );
};

export default SellerBoostAnalytics;
