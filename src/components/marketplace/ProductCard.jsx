import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useShopping } from '../../contexts/ShoppingContext';
import car from "../../assets/car.png";
import avatarImg from "../../assets/avatar.png";
import platinumImg from "../../assets/badges/platinum.png";
import goldImg from "../../assets/badges/gold.png";
import silverImg from "../../assets/badges/silver.png";
import bronzeImg from "../../assets/badges/bronze.png";
import { CircleQuestionMarkIcon, Eye, Heart, ShoppingCart, Shield } from 'lucide-react';

const ProductCard = ({ product, showBadge = true }) => {
  const [showActions, setShowActions] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    isInCart 
  } = useShopping();
  
  const isProductInWishlist = isInWishlist(product?.id);
  const isProductInCart = isInCart(product?.id);
  
  const getBadgeColor = (badge) => {
    const colors = {
      platinum: 'bg-purple-200',
      gold: 'bg-yellow-200',
      silver: 'bg-[#EAEAEA] text-[#393A40]',
      bronze: 'bg-red-200',
    };
    return colors[badge.toLowerCase()] || 'bg-gray-200';
  };

  const getBadgeImage = (badge) => {
    const images = {
      platinum: platinumImg,
      gold: goldImg,
      silver: silverImg,
      bronze: bronzeImg,
    };
    return images[badge.toLowerCase()] || null; 
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
    scrollTo(0,0);
  };

  const handleActionClick = () => {
    setShowActions(!showActions);
  };

  // Handle Add to Cart with authentication check
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (isProductInCart) {
      navigate('/cart');
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      await addToCart(product);
      // You could add a toast notification here instead of alert
      console.log(`${product.title} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
      setShowActions(false);
    }
  };

  // Handle Wishlist toggle with authentication check
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
    setIsAddingToWishlist(true);
    
    try {
      if (isProductInWishlist) {
        await removeFromWishlist(product.id);
        console.log(`${product.title} removed from wishlist`);
      } else {
        await addToWishlist(product);
        console.log(`${product.title} added to wishlist`);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsAddingToWishlist(false);
      setShowActions(false);
    }
  };

  // Handle Quick View
  const handleQuickView = (e) => {
    e.stopPropagation();
    handleProductClick();
  };

  // Handle Buy Now (with escrow)
  const handleBuyNow = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Add to cart and navigate to checkout
    addToCart(product);
    navigate('/checkout');
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    navigate('/login', { 
      state: { 
        from: `/product/${product.id}`,
        message: 'Please login to continue' 
      } 
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl rounded-tr-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden! group relative">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-100">
          <div className="aspect-4/3 w-full cursor-pointer" onClick={handleProductClick}>
            <img 
              src={product.images[0] || car} 
              alt={product.title}
              loading='lazy'
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>

          {/* Badge Image */}
          {showBadge && product.badge && (
            <div className="absolute top-0 -right-0.5">
              <span className={`flex flex-col items-center p-2 px-4 rounded-tr-2xl rounded-bl-2xl ${getBadgeColor(product.badge)}`}>
                <img
                  src={getBadgeImage(product.badge)}
                  alt={`${product.badge} badge`}
                  className="w-fit h-4 object-cover"
                  />
                  <small className='font-medium uppercase text-[10px]'> {product.badge} </small>
              </span>
            </div>
          )}

          {/* Quick Actions Button for Mobile */}
          <button 
            className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition cursor-pointer hover:bg-white flex md:hidden" 
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick();
            }}
          >
            <CircleQuestionMarkIcon size={14} />
          </button>

          {/* Mobile Actions Menu */}
          <div 
            className={`flex md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 z-20 transition-all duration-500 ${
              showActions ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className='bg-white rounded-full p-2 cursor-pointer shadow-lg hover:shadow-xl transition-shadow'
              onClick={handleWishlistToggle}
              disabled={isAddingToWishlist}
              title={isProductInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart 
                size={16} 
                className={isProductInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700'}
              />
            </button>
            <button 
              className='bg-white rounded-full p-2 cursor-pointer shadow-lg hover:shadow-xl transition-shadow'
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              title={isProductInCart ? 'View in cart' : 'Add to cart'}
            >
              <ShoppingCart 
                size={16} 
                className={isProductInCart ? 'text-green-600' : 'text-gray-700'}
              />
            </button>
            <button 
              className='bg-white rounded-full p-2 cursor-pointer shadow-lg hover:shadow-xl transition-shadow'
              onClick={handleQuickView}
              title="Quick view"
            >
              <Eye size={16} className="text-gray-700" />
            </button>
          </div>

          {/* Desktop Hover Actions */}
          <div 
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2 z-20 transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className='bg-white rounded-full p-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-105'
              onClick={handleWishlistToggle}
              disabled={isAddingToWishlist}
              title={isProductInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart 
                size={18} 
                className={isProductInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700'}
              />
            </button>
            <button 
              className='bg-white rounded-full p-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-105'
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              title={isProductInCart ? 'View in cart' : 'Add to cart'}
            >
              <ShoppingCart 
                size={18} 
                className={isProductInCart ? 'text-green-600' : 'text-gray-700'}
              />
            </button>
            <button 
              className='bg-white rounded-full p-2.5 cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-105'
              onClick={handleQuickView}
              title="Quick view"
            >
              <Eye size={18} className="text-gray-700" />
            </button>
          </div>

          {/* Condition Badge */}
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {product.condition}
          </div>

          {/* Cart Indicator */}
          {/* {isProductInCart && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              In Cart
            </div>
          )} */}

          {/* Wishlist Indicator */}
          {/* {isProductInWishlist && (
            <div className="absolute top-10 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Saved
            </div>
          )} */}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 
            onClick={handleProductClick}
            className="text-sm line-clamp-1 mb-2 hover:text-blue-600 cursor-pointer font-semibold"
          >
            {product.title}
          </h3>        

          <div className="flex items-center gap-1.5 mb-3" onClick={handleProductClick}>
            <span className="text-base font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-xs mt-1">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm line-clamp-1 mb-3" onClick={handleProductClick}>
            {product.description}
          </p>

          <div className="flex items-center justify-between text-sm mb-4" onClick={handleProductClick}>
            <div className='flex items-center'>
              <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className='text-primary text-xs'>
                {product.location}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              {/* {product.seller?.verified && (
                <Shield size={12} className="text-green-500" />
              )} */}
              <img 
                src={product.seller?.avatar || avatarImg} 
                alt={product.seller?.name || 'Seller'} 
                className='w-6 h-6 rounded-full object-cover border border-gray-200'
                title={product.seller?.name}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              className="flex-1 btn rounded-sm flex items-center justify-center gap-2"
              onClick={handleBuyNow}
            >
              {/* <Shield size={16} /> */}
              Buy Now
            </button>
            {/* <button 
              className="w-10 btn-tertiary rounded-sm flex items-center justify-center"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              title={isProductInCart ? 'View in cart' : 'Add to cart'}
            >
              {isAddingToCart ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ShoppingCart size={18} className={isProductInCart ? 'text-green-600' : ''} />
              )}
            </button> */}
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-90 p-4"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Sign In Required</h3>
                <p className="text-gray-600">
                  Please sign in to add items to your cart, wishlist, or make purchases.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleLoginRedirect}
                  className="w-full btn"
                >
                  Login to Your Account
                </button>
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    navigate('/signup', { 
                      state: { 
                        from: `/product/${product.id}`,
                        message: 'Create an account to continue' 
                      } 
                    });
                  }}
                  className="w-full btn btn-tertiary"
                >
                  Create New Account
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center mb-3">
                  Benefits of creating an account:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Save items to your wishlist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Add items to cart for later purchase</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Secure escrow-protected purchases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Track your orders and history</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full text-sm text-gray-600 hover:text-gray-800"
              >
                Continue browsing without signing in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;