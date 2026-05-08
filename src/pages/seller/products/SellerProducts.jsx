import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MoreVertical, Eye, Trash2, ChevronLeft, ChevronRight, Plus, Image as ImageIcon } from 'lucide-react';

const SellerProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      category: "Phones",
      status: 'Active',
      price: '#1,250,000',
      stock: 24,
      sales: 143
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max 256GB',
      status: 'Active',
      price: '#1,250,000',
      stock: 12,
      sales: 456
    },
    {
      id: 3,
      name: 'iPhone 15 Pro Max 256GB',
      status: 'Active',
      price: '#1,250,000',
      stock: 7,
      sales: 46
    },
    {
      id: 4,
      name: 'iPhone 15 Pro Max 256GB',
      status: 'Active',
      price: '#1,250,000',
      stock: 9,
      sales: 9
    },
    {
      id: 5,
      name: 'iPhone 15 Pro Max 256GB',
      status: 'Draft',
      price: '#1,250,000',
      stock: 70,
      sales: 70
    }
  ];

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleView = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleDelete = (productId) => {
    console.log('Delete product:', productId);
    // Handle delete action
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <ul className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
        <Link to="/seller"> Dashboard </Link>
        <ChevronRight size={16} className="flex" />
        <Link to="/seller/products"> My Products </Link>
      </ul>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <Link to="/seller/add-products" className='btn btn-primary px-4 py-2.5 flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95'>
          <Plus size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">Add New Product</span>
        </Link>
      </div>

      <div className='mb-6'>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search your products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Mobile Card View (Hidden on Desktop) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-400">
                <ImageIcon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate mb-1">{product.name}</h3>
                <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-50">
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
                <p className="text-xs font-bold text-gray-900">{product.price}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stock</p>
                <p className="text-xs font-bold text-gray-900">{product.stock}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sales</p>
                <p className="text-xs font-bold text-gray-900">{product.sales}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleView(product.id)}
                className="flex-1 py-2.5 bg-primary/5 text-primary text-xs font-bold rounded-xl hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <Eye size={14} />
                View Detail
              </button>
              <button 
                onClick={() => handleDelete(product.id)}
                className="flex-1 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Products Table (Hidden on Mobile) */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sales</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">{product.name}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">{product.price}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">{product.stock}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-900">{product.sales}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleView(product.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
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

export default SellerProducts;