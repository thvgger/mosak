import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart/wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save cart/wishlist to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Get cart total
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // Get cart item count
  const cartItemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Move all available items from wishlist to cart
  const moveAllToCart = () => {
    const availableItems = wishlist.filter(item => item.stock > 0);
    availableItems.forEach(item => addToCart(item));
    setWishlist(prev => prev.filter(item => item.stock === 0));
    return availableItems.length;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Get cart quantity for a product
  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <ShoppingContext.Provider value={{
      cart,
      wishlist,
      cartTotal,
      cartItemCount,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      clearWishlist, // Add this
      moveAllToCart, // Add this
      isInCart, // Add this
      getCartQuantity, // Add this
      isInWishlist
    }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};