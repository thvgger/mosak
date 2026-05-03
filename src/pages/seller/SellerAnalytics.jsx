import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  TrendingUp, 
  ShoppingBag, 
  Clock,
  Box,
  Download
} from 'lucide-react';
import { ResponsiveLine } from '@nivo/line';

const SellerAnalytics = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('monthly');

  const dataMap = {
    daily: {
      sales: [
        { x: "12am", y: 5000 }, { x: "4am", y: 2000 }, { x: "8am", y: 15000 }, 
        { x: "12pm", y: 45000 }, { x: "4pm", y: 35000 }, { x: "8pm", y: 25000 }, { x: "11pm", y: 10000 }
      ],
      conversion: [
        { x: "12am", y: 2.1 }, { x: "4am", y: 1.5 }, { x: "8am", y: 3.2 }, 
        { x: "12pm", y: 5.8 }, { x: "4pm", y: 4.1 }, { x: "8pm", y: 3.9 }, { x: "11pm", y: 2.5 }
      ],
      stats: { sales: "₦142,000", orders: "24", conv: "3.5%", salesRef: "Today", orderRef: "Avg: ₦5,916" }
    },
    weekly: {
      sales: [
        { x: "Mon", y: 95000 }, { x: "Tue", y: 142000 }, { x: "Wed", y: 145000 }, 
        { x: "Thu", y: 155000 }, { x: "Fri", y: 145000 }, { x: "Sat", y: 155000 }, { x: "Sun", y: 140000 }
      ],
      conversion: [
        { x: "Mon", y: 4.5 }, { x: "Tue", y: 2.9 }, { x: "Wed", y: 7.2 }, 
        { x: "Thu", y: 7.8 }, { x: "Fri", y: 7.1 }, { x: "Sat", y: 8.0 }, { x: "Sun", y: 6.5 }
      ],
      stats: { sales: "₦977,000", orders: "165", conv: "5.2%", salesRef: "This week", orderRef: "Avg: ₦5,921" }
    },
    monthly: {
      sales: [
        { x: "W1", y: 450000 }, { x: "W2", y: 620000 }, { x: "W3", y: 580000 }, 
        { x: "W4", y: 800000 }
      ],
      conversion: [
        { x: "W1", y: 3.8 }, { x: "W2", y: 4.2 }, { x: "W3", y: 4.0 }, 
        { x: "W4", y: 4.5 }
      ],
      stats: { sales: "₦2,450,000", orders: "400", conv: "4.1%", salesRef: "This month", orderRef: "Avg: ₦6,125" }
    },
    yearly: {
      sales: [
        { x: "Jan", y: 1200000 }, { x: "Feb", y: 1500000 }, { x: "Mar", y: 1400000 }, 
        { x: "Apr", y: 1800000 }, { x: "May", y: 2100000 }, { x: "Jun", y: 1950000 },
        { x: "Jul", y: 2450000 }
      ],
      conversion: [
        { x: "Jan", y: 3.5 }, { x: "Feb", y: 3.8 }, { x: "Mar", y: 3.7 }, 
        { x: "Apr", y: 4.2 }, { x: "May", y: 4.5 }, { x: "Jun", y: 4.3 },
        { x: "Jul", y: 4.1 }
      ],
      stats: { sales: "₦12.4M", orders: "2,150", conv: "4.2%", salesRef: "This year", orderRef: "Avg: ₦5,767" }
    }
  };

  const currentData = dataMap[timeFilter];

  const salesData = [{ id: "sales", color: "#0024FF", data: currentData.sales }];
  const conversionData = [{ id: "conversion", color: "#8b5cf6", data: currentData.conversion }];

  const productsData = [
    { product: "iPhone 15 Pro", revenue: 45000 },
    { product: "MacBook Air M3", revenue: 42000 },
    { product: "Samsung S24 Ultra", revenue: 35000 },
    { product: "AirPods Max", revenue: 30000 },
    { product: "iPad Pro M2", revenue: 25000 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12 text-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Business Analytics</h1>
          <p className="text-sm text-gray-500 font-medium">Insights into your store performance</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 overflow-x-auto scrollbar-hide shrink-0">
          {['daily', 'weekly', 'monthly', 'yearly'].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                timeFilter === filter 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Gross Revenue', value: currentData.stats.sales, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Orders', value: currentData.stats.orders, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Avg Order Val', value: currentData.stats.orderRef, icon: Box, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Conversion', value: currentData.stats.conv, icon: Clock, color: 'text-green-600', bg: 'bg-green-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm group">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight mb-1">{stat.value}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10 text-left">
            <h3 className="font-bold text-gray-900">Revenue Performance</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveLine
              data={salesData}
              margin={{ top: 10, right: 10, bottom: 40, left: 45 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
              curve="monotoneX"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 15,
                tickRotation: 0,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 10,
                format: (v) => v >= 1000 ? `${v / 1000}k` : v
              }}
              enableGridX={false}
              gridYValues={5}
              colors={['#0024FF']}
              lineWidth={4}
              pointSize={0}
              enableArea={true}
              areaOpacity={0.08}
              useMesh={true}
              theme={{
                axis: { ticks: { text: { fontSize: 10, fontWeight: 700, fill: '#94a3b8', fontFamily: 'Inter' } } },
                grid: { line: { stroke: '#f1f5f9' } }
              }}
            />
          </div>
        </div>

        {/* Conversion Chart */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10 text-left">
            <h3 className="font-bold text-gray-900">Conversion Trend</h3>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveLine
              data={conversionData}
              margin={{ top: 10, right: 10, bottom: 40, left: 45 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 0, max: 10, stacked: false, reverse: false }}
              curve="monotoneX"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 15,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 10,
                format: (v) => `${v}%`
              }}
              enableGridX={false}
              gridYValues={5}
              colors={['#8b5cf6']}
              lineWidth={4}
              pointSize={0}
              enableArea={true}
              areaOpacity={0.08}
              useMesh={true}
              theme={{
                axis: { ticks: { text: { fontSize: 10, fontWeight: 700, fill: '#94a3b8', fontFamily: 'Inter' } } },
                grid: { line: { stroke: '#f1f5f9' } }
              }}
            />
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm text-left">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Top Performing Products</h3>
            <p className="text-sm text-gray-500 font-medium">Ranked by total revenue contribution</p>
          </div>
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <Box size={20} />
          </div>
        </div>

        <div className="space-y-6">
          {productsData.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-800">{item.product}</span>
                <span className="font-mono font-bold text-primary">₦{item.revenue.toLocaleString()}</span>
              </div>
              <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                <div 
                  className="h-full bg-linear-to-r from-primary to-blue-400 rounded-full shadow-[0_0_8px_rgba(0,36,255,0.2)]" 
                  style={{ width: `${(item.revenue / 45000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 py-3.5 bg-gray-50 text-gray-700 text-[10px] font-bold rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-[0.2em]">
          Detailed Inventory Report
        </button>
      </div>
    </div>
  );
};

export default SellerAnalytics;