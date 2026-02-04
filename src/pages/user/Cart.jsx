import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Shield, 
  Package, 
  Truck,
  X,
  Heart,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useShopping } from '../../contexts/ShoppingContext';

const Cart = () => {
  const { isAuthenticated, user } = useAuth();
  const { 
    cart, 
    cartTotal, 
    cartItemCount, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    addToWishlist 
  } = useShopping();
  const navigate = useNavigate();
  
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Calculate delivery fee (example: free over ₦50,000, otherwise ₦2,500)
  const deliveryFee = cartTotal > 50000 ? 0 : 2500;
  const serviceFee = Math.round(cartTotal * 0.02); // 2% service fee
  const totalWithFees = cartTotal + deliveryFee + serviceFee;

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  // Move item to wishlist
  const handleMoveToWishlist = (product) => {
    removeFromCart(product.id);
    addToWishlist(product);
  };

  // Clear cart confirmation
  const handleClearCart = () => {
    if (cart.length === 0) return;
    
    if (!isClearingCart) {
      setIsClearingCart(true);
      return;
    }
    
    clearCart();
    setIsClearingCart(false);
  };

  // Toggle item selection
  const toggleItemSelection = (productId) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Calculate selected items total
  const selectedItemsTotal = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setCheckoutLoading(true);
    
    // In a real app, you might save the cart to session storage
    // or prepare order data here
    
    setTimeout(() => {
      setCheckoutLoading(false);
      navigate('/checkout');
    }, 500);
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="text-primary" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-8">
                Please sign in to view your cart and continue shopping.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login', { state: { from: '/cart' } })}
                  className="w-full btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup', { state: { from: '/cart' } })}
                  className="w-full btn btn-tertiary"
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate('/marketplace')}
                  className="w-full text-sm text-gray-600 hover:text-gray-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="text-gray-400" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/marketplace')}
                  className="w-full btn"
                >
                  Start Shopping
                </button>
                <button
                  onClick={() => navigate('/wishlist')}
                  className="w-full btn btn-tertiary"
                >
                  View Wishlist
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
          <button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </span>
              <button
                onClick={handleClearCart}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isClearingCart
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Trash2 size={18} />
                {isClearingCart ? 'Confirm Clear Cart' : 'Clear Cart'}
              </button>
              {isClearingCart && (
                <button
                  onClick={() => setIsClearingCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {/* Cart Summary Banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Your Shopping Cart</h3>
                    <p className="text-sm text-gray-600">
                      {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} • Total: ₦{cartTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="btn px-6"
                >
                  {checkoutLoading ? 'Processing...' : 'Checkout Now'}
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/150'}
                          alt={item.title}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => toggleItemSelection(item.id)}
                          className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedItems.includes(item.id)
                              ? 'bg-primary border-primary text-white'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {selectedItems.includes(item.id) && '✓'}
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              <Link to={`/product/${item.id}`} className="hover:text-primary">
                                {item.title}
                              </Link>
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                                {item.condition}
                              </span>
                              <span className="text-gray-500">•</span>
                              <span className="text-sm text-gray-600">{item.brand}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-xl font-bold mb-2">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₦{item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleMoveToWishlist(item)}
                                className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                              >
                                <Heart size={18} />
                                <span className="text-sm">Move to Wishlist</span>
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                              >
                                <Trash2 size={18} />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Escrow Protection Info */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Escrow Protection</h3>
                  <p className="text-gray-700 mb-3">
                    All purchases on Mosalak Hub are protected by our Escrow system. Your payment is held securely until you confirm receipt of your items.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Payment held securely until delivery confirmation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>7-day return policy for defective items</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>24/7 customer support for disputes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItemCount} items)</span>
                    <span className="font-semibold">₦{cartTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                      {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee (2%)</span>
                    <span className="font-semibold">₦{serviceFee.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₦{totalWithFees.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="text-gray-600" size={20} />
                    <span className="font-semibold">Delivery Estimate</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {deliveryFee === 0 
                      ? 'Free delivery! Your order will arrive in 2-3 business days.'
                      : 'Standard delivery: 3-5 business days'
                    }
                  </p>
                </div>

                {/* Package Protection */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="text-primary" size={20} />
                    <span className="font-semibold">Package Protection</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Add ₦500 for protection against loss, theft, or damage during delivery.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary" />
                    <span className="text-sm">Add Package Protection (+₦500)</span>
                  </label>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full btn py-4 text-lg mb-4"
                >
                  {checkoutLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    `Proceed to Checkout (₦${totalWithFees.toLocaleString()})`
                  )}
                </button>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Secure payment with:</p>
                  <div className="flex justify-center gap-4">
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded">Paystack</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded">Flutterwave</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded">Card</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded">Bank Transfer</span>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold mb-4">Continue Shopping</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="w-full btn btn-tertiary"
                  >
                    Browse Marketplace
                  </button>
                  <button
                    onClick={() => navigate('/wishlist')}
                    className="w-full text-sm text-gray-600 hover:text-gray-800"
                  >
                    View Your Wishlist
                  </button>
                  <button
                    onClick={() => navigate('/account/orders')}
                    className="w-full text-sm text-gray-600 hover:text-gray-800"
                  >
                    View Order History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;