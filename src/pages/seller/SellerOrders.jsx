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
import { Link } from 'react-router-dom';

const SellerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyer: 'Ahmed Hassan',
      amount: '1,250,000',
      escrowStatus: 'held',
      shipping: 'pending'
    },
    {
      id: 2,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyer: 'Ahmed Hassan',
      amount: '1,250,000',
      escrowStatus: 'held',
      shipping: 'pending'
    },
    {
      id: 3,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyer: 'Ahmed Hassan',
      amount: '1,250,000',
      escrowStatus: 'released',
      shipping: 'shipped'
    },
    {
      id: 4,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyer: 'Ahmed Hassan',
      amount: '1,250,000',
      escrowStatus: 'released',
      shipping: 'in transit'
    },
    {
      id: 5,
      product: 'iPhone 15 Pro Max 256GB',
      orderId: '#ORD-1234',
      buyer: 'Ahmed Hassan',
      amount: '1,250,000',
      escrowStatus: 'disputed',
      shipping: 'delivered'
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

  const handleViewDetails = (orderId) => {
    console.log('View order details:', orderId);
    // Handle view details action
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Download size={16} />
            Export Orders
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Products by order id, buyer name.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full overflow-x-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Product</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Order ID</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Buyer</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Escrow Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Shipping</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-gray-200 overflow-x-auto">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className="text-sm text-gray-900 ">{order.product}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900 font-mono">{order.orderId}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">{order.buyer}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">₱{order.amount}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${getEscrowStatusStyle(order.escrowStatus)}`}>
                    {order.escrowStatus}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${getShippingStatusStyle(order.shipping)}`}>
                    {order.shipping}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button 
                    onClick={() => handleViewDetails(order.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded border ${
                currentPage === 1 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded border ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded border ${
                currentPage === totalPages 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
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