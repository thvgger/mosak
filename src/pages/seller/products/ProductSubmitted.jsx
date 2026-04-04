// src/pages/seller/ProductSubmitted.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, PlusCircle, List } from 'lucide-react';

const ProductSubmitted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName = 'your product' } = location.state || {};
  
  // Calculate expected review date (48 hours from now)
  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() + 2);
  const formattedDate = expectedDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Submitted Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your product "{productName}" is now under review
          </p>
          
          {/* What happens next */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
            <ol className="space-y-2">
              <li className="flex items-start gap-3 text-gray-600">
                <span className="font-medium text-primary">1.</span>
                <span>Our team reviews your product</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="font-medium text-primary">2.</span>
                <span>You'll receive a notification</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="font-medium text-primary">3.</span>
                <span>Usually takes maximum of 24-48 hours</span>
              </li>
            </ol>
          </div>
          
          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Product Status:</p>
              <p className="font-semibold text-yellow-700">Pending Review</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Expected review:</p>
              <p className="font-semibold text-blue-700">{formattedDate}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to={`/seller/products`}
              className="block w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              View Product Details
            </Link>
            
            <div className="flex gap-3">
              <Link
                to="/seller/products"
                className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <List size={18} />
                View All Products
              </Link>
              
              <Link
                to="/seller/add-product"
                className="flex-1 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                Add Another
              </Link>
            </div>
          </div>
        </div>
        
        {/* Help Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Need help? <Link to="/seller/help" className="text-primary hover:underline">Contact support</Link>
        </p>
      </div>
    </div>
  );
};

export default ProductSubmitted;