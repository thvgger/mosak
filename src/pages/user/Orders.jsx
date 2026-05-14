import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronDown,
  Clock,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  AlertCircle,
  Download,
  ShoppingBag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Orders = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  

  // Sample orders data based on the image
  const initialOrders = [
    {
      id: 'ORD-2024-1547',
      product: 'iPhone 15 Pro Max 256GB',
      status: 'Delivered',
      seller: 'TechHub Nigeria',
      escrow: 'Held',
      amount: '₦1,250,000',
      statusColor: 'green'
    },
    {
      id: 'ORD-2024-1547',
      product: 'iPhone 15 Pro Max 256GB',
      status: 'Processing',
      seller: 'AudioPro Store',
      escrow: 'Awaiting Confirmation',
      amount: '₦1,250,000',
      statusColor: 'yellow'
    },
    {
      id: 'ORD-2024-1547',
      product: 'iPhone 15 Pro Max 256GB',
      status: 'Processing',
      seller: 'CompuWorld Ltd',
      escrow: 'Released',
      amount: '₦1,250,000',
      statusColor: 'yellow'
    },
    {
      id: 'ORD-2024-1547',
      product: 'iPhone 15 Pro Max 256GB',
      status: 'In Transit',
      seller: 'AudioPro Store',
      escrow: 'Released',
      amount: '₦1,250,000',
      statusColor: 'blue'
    },
    {
      id: 'ORD-2024-1547',
      product: 'iPhone 15 Pro Max 256GB',
      status: 'Completed',
      seller: 'AudioPro Store',
      escrow: 'Released',
      amount: '₦1,250,000',
      statusColor: 'green'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'processing':
        return <Clock size={16} className="text-yellow-500" />;
      case 'in transit':
        return <Truck size={16} className="text-blue-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Package size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEscrowColor = (escrow) => {
    if (escrow.toLowerCase().includes('held')) {
      return 'bg-orange-100 text-orange-800';
    } else if (escrow.toLowerCase().includes('awaiting')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (escrow.toLowerCase().includes('released')) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-800';
  };


  
  const [orders, setOrders] = useState(initialOrders);
  
  const toggleOrders = () => {
    if (orders.length > 0) {
      setOrders([]);
    } else {
      setOrders(initialOrders);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-sm text-gray-500 my-1">Manage and track all your purchases</p>

          {/* <button className='btn text-xs' onClick={toggleOrders}>
            {orders.length > 0 ? "Hide Orders" : "Show Orders"}
          </button> */}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders by ID, product, or seller..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <button className="p-2 px-2.5 border border-gray-300 rounded-lg hover:bg-gray-50" title='Filter'>
            <Filter size={20} className="text-gray-600" />
          </button>
          <button className="p-2 px-2.5 border border-gray-300 rounded-lg hover:bg-gray-50" title='Export'>
            <Download size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escrow</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full divide-y divide-gray-200 overflow-x-auto">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 text-nowrap">{order.product}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{order.seller}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEscrowColor(order.escrow)}`}>
                      {order.escrow}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-700">
                      <Eye size={16} />
                      <span>View</span>
                    </button> */}
                    <button
                      onClick={() => navigate(`/account/orders/${order.id}`)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-700"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State - Uncomment if no orders */}
        {/* {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Start Shopping
              </button>
            </div>
          </div>
        )} */}

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">5</span> orders
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="text-center py-16 border border-gray-200 rounded-lg">
          <span className='bg-primary/10 p-3 rounded-full flex w-fit mx-auto'>
            <ShoppingBag size={30} className="" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            No Orders Summary Yet
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Your orders activity will appear here once you make orders
          </p>

          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
            Go to Marketplace
          </button>
        </div>
      )}

      {/* Quick Stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold">24</p>
            </div>
            <Package className="text-primary" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold text-green-600">18</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-xl font-bold text-yellow-600">4</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Escrow</p>
              <p className="text-xl font-bold text-blue-600">₦125,000</p>
            </div>
            <AlertCircle className="text-blue-500" size={24} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Orders;