import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  TrendingUp, 
  ShoppingBag, 
  Clock,
  Box
} from 'lucide-react';
// import { ResponsiveLine } from '@nivo/line';
// import { ResponsiveBar } from '@nivo/bar';

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
      stats: { sales: "₦142,000", orders: "24", conv: "3.5%", salesRef: "Today", orderRef: "Avg: ₦5,916 / order" }
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
      stats: { sales: "₦977,000", orders: "165", conv: "5.2%", salesRef: "This week", orderRef: "Avg: ₦5,921 / order" }
    },
    monthly: {
      sales: [
        { x: "Week 1", y: 450000 }, { x: "Week 2", y: 620000 }, { x: "Week 3", y: 580000 }, 
        { x: "Week 4", y: 800000 }
      ],
      conversion: [
        { x: "Week 1", y: 3.8 }, { x: "Week 2", y: 4.2 }, { x: "Week 3", y: 4.0 }, 
        { x: "Week 4", y: 4.5 }
      ],
      stats: { sales: "₦2,450,000", orders: "400", conv: "4.1%", salesRef: "This month", orderRef: "Avg: ₦333 per order" }
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
      stats: { sales: "₦12,400,000", orders: "2,150", conv: "4.2%", salesRef: "This year", orderRef: "Avg: ₦5,767 / order" }
    }
  };

  const currentData = dataMap[timeFilter];

  const salesData = [{ id: "sales", color: "hsl(220, 100%, 50%)", data: currentData.sales }];
  const conversionData = [{ id: "conversion", color: "hsl(220, 100%, 50%)", data: currentData.conversion }];

  const productsData = [
    { product: "Traditional Dress", revenue: 45000 },
    { product: "Handmade Pottery", revenue: 42000 },
    { product: "Leather Bag", revenue: 35000 },
    { product: "Silver Jewelry", revenue: 30000 },
    { product: "Woven Basket", revenue: 25000 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-8">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/seller')}>Dashboard</span>
        <ChevronRight size={16} className="mx-1" />
        <span className="text-gray-900 font-medium">Analytics</span>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2 w-fit">
        {['daily', 'weekly', 'monthly', 'yearly'].map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              timeFilter === filter 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg w-fit mb-4">
            <TrendingUp size={24} />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Sales</p>
          <h2 className="text-2xl font-bold text-gray-900">{currentData.stats.sales}</h2>
          <p className="text-xs text-gray-400 mt-1">{currentData.stats.salesRef}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-purple-50 text-purple-600 p-2 rounded-lg w-fit mb-4">
            <Box size={24} />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Orders</p>
          <h2 className="text-2xl font-bold text-gray-900">{currentData.stats.orders}</h2>
          <p className="text-xs text-gray-400 mt-1">{currentData.stats.orderRef}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-orange-50 text-orange-600 p-2 rounded-lg w-fit mb-4">
            <Clock size={24} />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Conversion Rate</p>
          <h2 className="text-2xl font-bold text-gray-900">{currentData.stats.conv}</h2>
          <p className="text-xs text-gray-400 mt-1">{currentData.stats.salesRef === 'Today' ? 'Daily average' : 'Average conversion'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp size={20} className="text-blue-600" />
          <h3 className="font-bold text-gray-900">Sales Over Time</h3>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveLine
            data={salesData}
            margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (v) => `${v / 1000}K`
            }}
            enableGridX={false}
            colors={['#2563eb']}
            lineWidth={3}
            pointSize={8}
            pointColor="#ffffff"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableArea={true}
            areaOpacity={0.05}
            useMesh={true}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fill: '#94a3b8'
                  }
                }
              },
              grid: {
                line: {
                  stroke: '#f1f5f9',
                  strokeWidth: 1
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <Clock size={20} className="text-blue-600" />
          <h3 className="font-bold text-gray-900">Conversion Rate Trend</h3>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveLine
            data={conversionData}
            margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 10, stacked: false, reverse: false }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (v) => `${v}%`
            }}
            enableGridX={false}
            colors={['#2563eb']}
            lineWidth={3}
            pointSize={8}
            pointColor="#ffffff"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableArea={true}
            areaOpacity={0.05}
            useMesh={true}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fill: '#94a3b8'
                  }
                }
              },
              grid: {
                line: {
                  stroke: '#f1f5f9',
                  strokeWidth: 1
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <Box size={20} className="text-blue-600" />
          <h3 className="font-bold text-gray-900">Best-Selling Products</h3>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveBar
            data={productsData}
            keys={['revenue']}
            indexBy="product"
            margin={{ top: 10, right: 30, bottom: 50, left: 140 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#2563eb']}
            borderRadius={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (v) => `${v / 1000}K`
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            enableGridX={true}
            enableGridY={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fill: '#94a3b8'
                  }
                }
              },
              grid: {
                line: {
                  stroke: '#f1f5f9',
                  strokeWidth: 1
                }
              }
            }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;