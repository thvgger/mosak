import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Package,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SellerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Stats data
  const stats = [
    { label: 'Total Orders', value: '124', icon: Package, color: 'bg-blue-500' },
    { label: 'In Escrow', value: '8', icon: Shield, color: 'bg-yellow-500' },
    { label: 'Shipped', value: '5', icon: Truck, color: 'bg-purple-500' },
    { label: 'Completed', value: '111', icon: CheckCircle, color: 'bg-green-500' }
  ];

  // Sample orders data
  const orders = [
    {
      id: 1,
      product: 'Logo Design Service',
      orderId: '#MH-23849',
      buyer: 'Ahmed Hassan',
      amount: '30,000',
      escrowStatus: 'held',
      shipping: 'pending',
      time: '12 May, 2024'
    },
    {
      id: 2,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyer: 'John Doe',
      amount: '1,250,000',
      escrowStatus: 'held',
      shipping: 'pending',
      time: '10 May, 2024'
    },
    {
      id: 3,
      product: 'Website UI Design',
      orderId: '#MH-23850',
      buyer: 'Sarah Smith',
      amount: '150,000',
      escrowStatus: 'released',
      shipping: 'shipped',
      time: '08 May, 2024'
    },
    {
      id: 4,
      product: 'Content Writing',
      orderId: '#MH-23851',
      buyer: 'Mike Ross',
      amount: '45,000',
      escrowStatus: 'released',
      shipping: 'in transit',
      time: '05 May, 2024'
    },
    {
      id: 5,
      product: 'SEO Audit',
      orderId: '#MH-23852',
      buyer: 'Jessica Pearson',
      amount: '80,000',
      escrowStatus: 'disputed',
      shipping: 'delivered',
      time: '01 May, 2024'
    }
  ];

  // Get status color and styling
  const getEscrowStatusStyle = (status) => {
    const styles = {
      held: 'bg-yellow-100 text-yellow-700',
      released: 'bg-green-100 text-green-700',
      disputed: 'bg-red-100 text-red-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getShippingStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      shipped: 'bg-blue-100 text-blue-700',
      'in transit': 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  // Filter orders based on search
  const filteredOrders = orders.filter(order =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (order) => {
    // Strip # from orderId for the URL if needed, or just pass it directly.
    navigate(`/seller/orders/${order.orderId.replace('#', '')}`);
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <ul className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
        <Link to="/seller"> Dashboard </Link>
        <ChevronRight size={16} className="flex" />
        <Link to="/seller/orders"> Orders </Link>
      </ul>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">Order</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                {/* <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 mb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">Orders History</h2>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gray-100 transition-all w-full md:w-auto">
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gray-50 transition-all w-full md:w-auto">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Orders Table/Cards */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buyer</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Escrow</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipping</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{order.product}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{order.orderId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{order.buyer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">₦{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight ${getEscrowStatusStyle(order.escrowStatus)}`}>
                      {order.escrowStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight ${getShippingStatusStyle(order.shipping)}`}>
                      {order.shipping}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleViewDetails(order)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-gray-50">
          {paginatedOrders.map((order) => (
            <div 
              key={order.id} 
              className="p-5 active:bg-gray-50 transition-colors space-y-4"
              onClick={() => handleViewDetails(order)}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{order.product}</p>
                  <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">{order.orderId} • {order.time}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">₦{order.amount}</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-[10px] font-bold uppercase">
                    {order.buyer.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{order.buyer}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-tight ${getEscrowStatusStyle(order.escrowStatus)}`}>
                    {order.escrowStatus}
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-tight ${getShippingStatusStyle(order.shipping)}`}>
                    {order.shipping}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No orders found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 px-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length}
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-xl border transition-all ${
                currentPage === 1 
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    currentPage === index + 1
                      ? 'bg-primary text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-xl border transition-all ${
                currentPage === totalPages 
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerOrders;