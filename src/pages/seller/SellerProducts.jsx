import React, { useState } from 'react';
import { Search, MoreVertical, Eye, Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const SellerProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
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
    console.log('View product:', productId);
    // Handle view action
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
      <div className="text-sm text-gray-500 mb-6">
        Dashboard &gt; My Products
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">My Products</h1>
        <button className='btn btn-primary px-3'>
          <Plus size={16} />
          Add New Product
        </button>
      </div>

        
      <div className='mb-6'>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Product</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Price</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Stock</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Sales</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
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