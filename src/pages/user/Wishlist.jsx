import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  X,
  ShoppingBag,
  Package,
  Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useShopping } from '../../contexts/ShoppingContext';
import ProductCard from "../../components/marketplace/ProductCard.jsx";

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { 
    wishlist, 
    addToCart, 
    removeFromWishlist,
    clearWishlist,
    isInWishlist 
  } = useShopping();
  const navigate = useNavigate();
  
  const [isClearingWishlist, setIsClearingWishlist] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'available', 'sold'

  // Filter wishlist items
  const filteredWishlist = wishlist.filter(item => {
    if (filter === 'available') return item.stock > 0;
    if (filter === 'sold') return item.stock === 0;
    return true;
  });

  // Add all to cart
  const handleAddAllToCart = () => {
    const availableItems = wishlist.filter(item => item.stock > 0);
    
    if (availableItems.length === 0) {
      alert('No available items to add to cart');
      return;
    }
    
    availableItems.forEach(item => {
      addToCart(item);
    });
    
    alert(`${availableItems.length} items added to cart!`);
  };

  // Move item to cart
  const handleMoveToCart = (product) => {
    if (product.stock === 0) {
      alert('This item is currently out of stock');
      return;
    }
    
    addToCart(product);
    removeFromWishlist(product.id);
    alert(`${product.title} moved to cart!`);
  };

  // Clear wishlist confirmation
  const handleClearWishlist = () => {
    if (wishlist.length === 0) return;
    
    if (!isClearingWishlist) {
      setIsClearingWishlist(true);
      return;
    }
    
    clearWishlist();
    setIsClearingWishlist(false);
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-primary/60" size={40} fill="currentColor" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-8">
                Please sign in to view your wishlist and saved items.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login', { state: { from: '/wishlist' } })}
                  className="w-full btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup', { state: { from: '/wishlist' } })}
                  className="w-full btn btn-tertiary"
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate('/marketplace')}
                  className="w-full text-sm text-gray-600 hover:text-gray-800"
                >
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-gray-400" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8">
                Save items you love to your wishlist. Review them anytime and easily move them to your cart.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/marketplace')}
                  className="w-full btn"
                >
                  Start Shopping
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full btn btn-tertiary"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          {/* <button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button> */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold"> Wishlist ({wishlist.length}) </h1>
              {/* <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p> */}
            </div>
            <div className="flex items-center gap-4">
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Items</option>
                  <option value="available">Available</option>
                  <option value="sold">Sold Out</option>
                </select>
              </div>

              {/* Clear Wishlist */}
              <button
                onClick={handleClearWishlist}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isClearingWishlist
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Trash2 size={18} />
                {isClearingWishlist ? 'Confirm Clear' : 'Clear All'}
              </button>
              {isClearingWishlist && (
                <button
                  onClick={() => setIsClearingWishlist(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Wishlist Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
                <Heart className="text-primary" size={28} fill="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your Wishlist</h3>
                <p className="text-gray-600">
                  Save items you love and move them to cart when you're ready to buy
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddAllToCart}
                className="btn"
              >
                <ShoppingCart size={20} />
                Add All Available to Cart
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="btn btn-tertiary"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>

        {/* Empty filter state */}
        {filteredWishlist.length === 0 && wishlist.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No Items Found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'available' 
                ? 'All items in your wishlist are currently out of stock'
                : 'No sold out items in your wishlist'
              }
            </p>
            <button
              onClick={() => setFilter('all')}
              className="btn btn-tertiary"
            >
              View All Items
            </button>
          </div>
        )}

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredWishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {/* Tips Section */}
        <div className="hidden mt-12 bg-linear-to-r from-primary/5 to-blue-50 rounded-2xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-primary" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Wishlist Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-bold mb-2">Save for Later</h4>
                <p className="text-sm text-gray-600">
                  Save items you're interested in but not ready to buy yet.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-bold mb-2">Price Alerts</h4>
                <p className="text-sm text-gray-600">
                  Get notified when prices drop on items in your wishlist.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-bold mb-2">Quick Purchase</h4>
                <p className="text-sm text-gray-600">
                  Move items to cart with one click when you're ready to buy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Suggestions */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-6"> Just For You </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4">
            {/* This would be populated with recommended products */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="shrink-0 w-64">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <h4 className="font-semibold mb-2">Recommended Product {i}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Great addition to your collection
                  </p>
                  <button className="w-full btn btn-text text-sm">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;