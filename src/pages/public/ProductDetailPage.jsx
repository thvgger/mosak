import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { useAuth } from '../../contexts/AuthContext';
import { useShopping } from '../../contexts/ShoppingContext';
import { useAuthModal } from '../../contexts/AuthModalContext'; // Add this import
import car from "../../assets/car.png";
import avatarImg from "../../assets/avatar.png"; // Add this import if needed
import { Heart, Share2, ShoppingCart, Truck, Box, RotateCcw, ShieldCheck, Shield, MessageCircle, Star, ArrowRight } from 'lucide-react';
import pattern from "../../assets/pattern.png";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useMarketplace();
  const { isAuthenticated, user } = useAuth();
  const { openModal } = useAuthModal(); // Use the global modal context
  
  const { 
    cart, 
    wishlist, 
    addToCart: addToShoppingCart, 
    removeFromCart: removeFromShoppingCart, 
    addToWishlist: addToShoppingWishlist, 
    removeFromWishlist: removeFromShoppingWishlist,
    cartItemCount 
  } = useShopping();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  const product = getProductById(id);
  const images = product?.images || [];

  // Check if product is in wishlist
  const isInWishlist = wishlist?.some(item => item.id === product?.id);
  
  // Check if product is in cart
  const isInCart = cart?.some(item => item.id === product?.id);
  const cartQuantity = isInCart ? cart.find(item => item.id === product?.id)?.quantity : 0;

  const showPrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button 
            onClick={() => navigate('/marketplace')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openModal("login", () => {
        // This callback runs after successful login
        handleAddToCart();
      });
      return;
    }
    
    addToShoppingCart(product, quantity);
    // Show success message (you could use a toast notification here)
    alert(`${product.title} added to cart!`);
  };
  
  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      openModal("login", () => {
        // This callback runs after successful login
        handleWishlistToggle();
      });
      return;
    }
    
    if (isInWishlist) {
      removeFromShoppingWishlist(product.id);
      alert(`${product.title} removed from wishlist`);
    } else {
      addToShoppingWishlist(product);
      alert(`${product.title} added to wishlist`);
    }
  };
  
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Calculate escrow fee (3%)
  const escrowFee = Math.round(product.price * 0.03);
  const totalAmount = product.price + escrowFee;

  const handleEscrowPurchase = () => {
    if (!isAuthenticated) {
      openModal("login", () => {
        // This callback runs after successful login
        handleEscrowPurchase();
      });
      return;
    }
    setIsEscrowModalOpen(true);
  };

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      openModal("login", () => {
        // This callback runs after successful login
        proceedToCheckout();
      });
      setIsEscrowModalOpen(false);
      return;
    }
    
    // Add to cart if not already added
    if (!isInCart) {
      addToShoppingCart(product, quantity);
    }
    
    navigate('/checkout');
    setIsEscrowModalOpen(false);
  };

  // Handle direct checkout without escrow modal
  const handleDirectCheckout = () => {
    if (!isAuthenticated) {
      openModal("login", () => {
        // This callback runs after successful login
        handleDirectCheckout();
      });
      return;
    }
    
    if (!isInCart) {
      addToShoppingCart(product, quantity);
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 text-nowrap overflow-x-auto scrollbar-hide">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">
            Home
          </button>
          <span className="mx-2">  &rsaquo; </span>
          <button onClick={() => navigate('/marketplace')} className="hover:text-blue-600">
            Marketplace
          </button>
          <span className="mx-2">  &rsaquo; </span>
          <button 
            onClick={() => navigate(`/marketplace/${product.category}`)}
            className="hover:text-blue-600 capitalize"
          >
            {product.category}
          </button>
          <span className="mx-2">  &rsaquo; </span>
          <span className="text-gray-900">{product.title.substring(0, 30)}...</span>
        </div>

        {/* User greeting (if logged in) */}
        {isAuthenticated && user && (
          <div className="mb-4 bg-primary/5 p-3 rounded-lg">
            <p className="text-sm text-dark/80">
              Welcome back, <span className="font-semibold text-dark">{user.name}</span>! Ready to purchase?
            </p>
          </div>
        )}

        <div className="overflow-hidden">
          <div className="flex items-start flex-wrap lg:flex-nowrap gap-8 p-0">
            {/* Product Images */}
            <div className='w-full h-94 flex justify-start gap-2'>
              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="w-26 flex flex-col gap-2 overflow-x-auto scrollbar-hide">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex flex-col items-center justify-start w-full h-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={product.images?.[selectedImage] || "https://via.placeholder.com/600x600" || car}
                  alt={product.title}
                  className="w-full h-full object-cover object-center text-xs"
                />
              </div>

              {/* Lightbox Modal */}
              {isLightboxOpen && (
                <div
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-100 p-4"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  {/* Prevent closing when clicking image area */}
                  <div
                    className="relative w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Image */}
                    <img
                      src={images[selectedImage]}
                      alt={product.title}
                      className="max-w-full h-full max-h-120 object-contain rounded-xl"
                    />

                    {/* Close */}
                    <button
                      onClick={() => setIsLightboxOpen(false)}
                      className="absolute top-4 right-2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
                    >
                      ✕
                    </button>

                    {/* Prev */}
                    {images.length > 1 && (
                      <button
                        onClick={showPrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        ‹
                      </button>
                    )}

                    {/* Next */}
                    {images.length > 1 && (
                      <button
                        onClick={showNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        ›
                      </button>
                    )}

                    {/* Image counter */}
                    <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className='w-full'>
              <h1 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h1>
              <p className='text-sm mb-4 text-dark/60'> {product?.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus tempore porro incidunt, eius similique rerum ducimus eos error veritatis ipsum." } </p>
              
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-base font-bold text-dark">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-base">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <span className='flex items-center gap-1 text-primary'>
                  <Star size={14} strokeWidth={1} />
                  <Star size={14} strokeWidth={1} />
                  <Star size={14} strokeWidth={1} />
                  <Star size={14} strokeWidth={1} />
                  <Star size={14} strokeWidth={1} />
                  <span className='text-dark text-xs'> {product.reviews} Reviews </span>
                </span>
              </div>

              <hr className='w-full border-px border-dark/10 flex items-center my-6' />

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className='flex items-center gap-2'>
                  {/* Buy with Escrow Button */}
                  <button
                    onClick={handleEscrowPurchase}
                    className="btn"
                  >
                    <Shield size={18} />
                    Buy Now
                  </button>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-tertiary"
                    disabled={isInCart}
                  >
                    <ShoppingCart size={18} strokeWidth={1.5} />
                    {isInCart ? `In Cart (${cartQuantity})` : 'Add to Cart'}
                  </button>
                </div>

                <div className='flex items-center gap-1'>
                  <button 
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-full ${isInWishlist ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
                    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={shareProduct}
                    className="p-2 rounded-full hover:bg-gray-100"
                    title="Share product"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Cart & Wishlist Status */}
              {isAuthenticated && (
                <div className="mb-4 text-sm text-gray-600">
                  {isInCart && (
                    <p className="text-green-600 mb-1">
                      ✓ This item is in your cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})
                    </p>
                  )}
                  {isInWishlist && (
                    <p className="text-red-600">
                      ♥ This item is in your wishlist
                    </p>
                  )}
                </div>
              )}

              <div className='bg-primary/20 text-dark p-4 px-6 rounded-t-xl'>
                <strong className='flex items-center gap-1.5 mb-1.5'><Shield size={18} strokeWidth={2} className='text-primary' /> Escrow Protection Active </strong>
                <p className='text-sm text-dark/60 leading-relaxed'> Your payment is held securely until you confirm receipt. Buy with confidence. </p>
              </div>
            </div>

            <div className='w-full lg:max-w-80 border border-primary/30 rounded-sm overflow-hidden'>
              <div className='p-4 bg-primary/30 text-base flex items-center gap-2'>
                <Truck size={18} className="text-primary" />
                <p className='font-medium'> Delivery via Sarri Ride </p>
              </div>

              <div className='p-4 flex flex-col sm:flex-row lg:flex-col items-start gap-2'>
                <div className='w-full rounded p-2 border border-dark/10 flex gap-1'>
                  <Box size={18} className='mt-2' />
                  <span className='flex flex-col'>
                    <p className='font-semibold'> Delivery </p>
                    <small className='leading-tight flex text-dark/80'> Same-day / Next-day delivery within Lagos </small>
                    <p className='font-semibold'> N1,500 </p>
                  </span>
                </div>

                <div className='w-full rounded p-2 border border-dark/10 flex gap-1'>
                  <RotateCcw size={18} className="mt-2" />
                  <span className='flex flex-col'>
                    <p className='font-semibold'> Returns </p>
                    <small className='leading-tight flex text-dark/80'> 7-day return policy </small>
                  </span>
                </div>

                <div className='w-full rounded p-2 border border-dark/10 flex gap-1'>
                  <ShieldCheck size={18} className="mt-2 w-fit" />
                  <span className='flex flex-col w-full'>
                    <p className='font-semibold'> Inspection Safety: </p>
                    <small className='leading-tight text-xs text-dark/80'> 
                      Keep your transaction safe, all payments should stay in Mosak Hub for fraud protection and support.
                    </small>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-6 space-y-6">
            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide" >
              {[
                { key: "details", label: "Details" },
                { key: "specs", label: "Specifications" },
                { key: "reviews", label: `Reviews (${product.reviews || 0})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-4 font-medium whitespace-nowrap transition
                    ${
                      activeTab === tab.key
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            
            <div className="p-0">
              {/* Details */}
              {activeTab === "details" && (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Product Details</h3>
                  <p className="text-gray-700">{product.description}</p>

                  <h4 className="font-bold mt-6">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="text-gray-700">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {activeTab === "specs" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Specifications</h3>

                  <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="p-3 text-gray-600">Brand</td>
                        <td className="p-3 font-medium">{product.brand}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="p-3 text-gray-600">Year</td>
                        <td className="p-3 font-medium">{product.year}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="p-3 text-gray-600">Mileage</td>
                        <td className="p-3 font-medium">
                          {product.mileage?.toLocaleString()} km
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Condition</td>
                        <td className="p-3 font-medium capitalize">
                          {product.condition?.replace("-", " ")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Customer Reviews</h3>

                  {product.reviews > 0 ? (
                    <div className="text-gray-600 space-y-4">
                      <div className='flex items-center gap-6'>  
                        <div className='flex flex-col items-start'>
                          <span className='text-3xl font-semibold'>
                            4.9/5
                          </span>
                          <span> ⭐⭐⭐⭐⭐ </span>
                          <span> 
                            {product.reviews} reviews
                          </span>
                        </div>
                        <span className='w-px h-30 bg-gray-400'></span>

                        <div className='w-full flex flex-col items-start gap-0'>
                          <div className='w-full flex items-center justify-start gap-2 text-nowrap'> 
                            <span className="w-16"> 5 Star </span>
                            <span className='h-2 w-[90%] bg-primary rounded-full'></span>
                            <span className='ml-auto'> (12) </span>
                          </div>
                          <div className='w-full flex items-center justify-start gap-2 text-nowrap'> 
                            <span className="w-16"> 4 Star </span>
                            <span className='h-2 w-[80%] bg-primary rounded-full'></span>
                            <span className='ml-auto'> (4) </span>
                          </div>
                          <div className='w-full flex items-center justify-start gap-2 text-nowrap'> 
                            <span className="w-16 mr-0"> 3 Star </span>
                            <span className='h-2 w-[60%] bg-primary rounded-full'></span>
                            <span className='ml-auto'> (10) </span>
                          </div>
                          <div className='w-full flex items-center justify-start gap-2 text-nowrap'> 
                            <span className="w-16"> 2 Star </span>
                            <span className='h-2 w-[40%] bg-primary rounded-full'></span>
                            <span className='ml-auto'> (2) </span>
                          </div>
                          <div className='w-full flex items-center justify-start gap-2 text-nowrap'> 
                            <span className="w-16"> 1 Star </span>
                            <span className='h-2 w-[20%] bg-primary rounded-full'></span>
                            <span className='ml-auto'> (1) </span>
                          </div>
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className='flex flex-col items-start gap-2 border-t border-gray-400 pt-4'>
                        <span> Stacey </span>
                        <span> ⭐⭐⭐⭐ </span>
                        <p className='text-sm'> 
                          I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                        </p>

                        <div className='text-sm space-x-4 font-medium'>
                          <span> Stacey Sam </span>
                          <span> 21-12-2025 </span>
                        </div>
                      </div>
                      <div className='flex flex-col items-start gap-2 border-t border-gray-400 pt-4'>
                        <span> James </span>
                        <span> ⭐⭐⭐⭐ </span>
                        <p className='text-sm'> 
                          I bought it 3 weeks ago and now come back just to say "Awesome Product". I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident.
                        </p>

                        <div className='text-sm space-x-4 font-medium'>
                          <span> Stacey Sam </span>
                          <span> 21-12-2025 </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No reviews yet. Be the first to review this product.
                      </p>
                      {isAuthenticated ? (
                        <button className="btn btn-text">
                          Write a Review
                        </button>
                      ) : (
                        <button 
                          onClick={() => openModal("login")}
                          className="btn btn-text"
                        >
                          Login to Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className='text-2xl'> Seller Information </h3>
                  <div className="flex items-center gap-2 my-4">
                    <span className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center'>{product.seller.name[0]}</span>
                    <div className='flex flex-col gap-0'>
                      <h5 className="text-sm font-semibold">{product.seller.name}</h5>
                      {product.seller.verified && (
                        <span className='flex items-center gap-1 text-xs'>
                          <ShieldCheck size={12} />
                          Verified Seller
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 text-sm text-gray-600 mb-3">
                    <div> Location: {product.location} </div>
                    <div> Response Rate: </div>
                    <div className="flex items-center">
                      Rating: {product.seller.rating}
                    </div>
                  </div>
                  {/* Chat with seller button - now using global modal */}
                  <button 
                    className='btn btn-tertiary' 
                    onClick={() => {
                      if (!isAuthenticated) {
                        openModal("login", () => {
                          // This callback runs after successful login
                          navigate("/account/messages", { 
                            state: { 
                              product: {
                                id: product.id,
                                name: product.title,
                                image: product.images?.[0] || car,
                                price: product.price,
                                status: 'available',
                                seller: product.seller
                              },
                              seller: {
                                id: `seller_${product.id}`,
                                name: product.seller?.name || 'Seller',
                                avatar: product.seller?.avatar || avatarImg,
                                verified: product.seller?.verified || false,
                                rating: product.seller?.rating || 4.0
                              }
                            }
                          });
                        });
                        return;
                      }
                      navigate("/account/messages", { 
                        state: { 
                          product: {
                            id: product.id,
                            name: product.title,
                            image: product.images?.[0] || car,
                            price: product.price,
                            status: 'available',
                            seller: product.seller
                          },
                          seller: {
                            id: `seller_${product.id}`,
                            name: product.seller?.name || 'Seller',
                            avatar: product.seller?.avatar || avatarImg,
                            verified: product.seller?.verified || false,
                            rating: product.seller?.rating || 4.0
                          }
                        }
                      });
                    }}
                  >
                    <MessageCircle size={16} strokeWidth={1.75} /> Chat with seller
                  </button>
                </div>
              </div>
            </div>

            {/* How Escrow Works */}
            <div className='p-4 bg-primary/30 rounded-lg relative'>
              <div className='absolute z-0 inset-0 opacity-15' style={{
              backgroundImage: `url(${pattern})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}></div>
              <h4 className="font-bold mb-3 z-2"> How Escrow Works </h4>
              <ul className="space-y-1 text-sm md:text-base relative z-2">
                <li className="flex items-start gap-1">
                  1. <span> Payment is held securely in escrow by Paystack. </span>
                </li>
                <li className="flex items-start gap-1">
                  2. <span> Sellers ships your order </span>
                </li>
                <li className="flex items-start gap-1">
                  3. <span> You receive and inspect the item </span>
                </li>
                <li className="flex items-start gap-1">
                  4. <span> Payment released to seller after confirmation </span>
                </li>
              </ul>
              <button className='btn relative mt-4 z-10'> Read Full Details <ArrowRight size={18} /> </button>
            </div>

            {/* Return Policy */}
            <div className='bg-primary/10 p-4 rounded-lg'>
              <h3> Return Policy </h3>
              <p> 7-day return for items that are defective or not as described. </p>
              <button onClick={() => {navigate("/return-policy")}} className='text-sm flex items-center gap-1 text-primary mt-4 cursor-pointer'>
                Read Full Policy <ArrowRight size={16} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6"> Best Selling </h2>
        </div>

        {/* Recently Viewed Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6"> Recently Viewed </h2>
        </div>
      </div>

      {/* Escrow Modal */}
      {isEscrowModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-90 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Modal Header */}
            <div className="sticky top-0 w-full bg-primary text-white flex items-center justify-between p-4 border-b">
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-base font-bold flex gap-2"> 
                  <Shield className="" size={20} /> 
                  Escrow Payment Request 
                </h2>
                <p className='text-sm'> Secure payment protected by Paystack </p>
              </div>
              <button
                onClick={() => setIsEscrowModalOpen(false)}
                className=" hover:bg-gray-100/30 rounded-full p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Buyer/Seller Info */}
              {isAuthenticated && user && (
                <div className='grid grid-cols-2 gap-2 mb-4'>
                  <div className='flex flex-col items-center gap-1 p-2 bg-primary/5 rounded-md'>
                    <span className='text-xs'> Buyer </span>
                    <span className='text-sm font-semibold'>{user.name}</span>
                    <span className='text-xs text-gray-500'>{user.email}</span>
                  </div>

                  <div className='flex flex-col items-center gap-1 p-2 bg-primary/10 rounded-md'>
                    <span className='text-xs'> Seller </span>
                    <span className="text-sm font-semibold">{product.seller.name}</span>
                    {product.seller.verified && (
                      <span className='text-xs text-green-600 flex items-center gap-1'>
                        <ShieldCheck size={12} />
                        Verified Seller
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Product Info */}
              <div className="mb-4">
                <img src={product.images[0]} alt='' className='w-full h-40 object-center object-cover rounded-xl mb-2' />
                <h3 className="font-bold text-base mb-2">{product.title}</h3>
                <p className='text-xs mb-2 line-clamp-2'>{product.description}</p>

                <div className='mt-4 space-y-1'>
                  <p className='text-sm'> Agreed Amount (₦) </p>
                  <form>
                    <input 
                      type='text' 
                      className='border border-gray-300 text-base px-3 py-1.5 w-full rounded-md'
                      placeholder='₦285,000'
                      defaultValue={product.price.toLocaleString()}
                    />
                  </form>
                  <small> Enter the final price you and the seller agreed on </small>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="mb-6 bg-primary/10 p-2 rounded-md">
                <h4 className="font-bold mb-2 text-sm">Payment Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className='text-sm'>Product Amount</span>
                    <span className="font-bold">₦{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className='text-sm'>Escrow Fee (3%)</span>
                    <span className="font-bold">₦{escrowFee.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* How Escrow Works */}
              <div className="mb-4 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-blue-600" size={20} />
                  How Escrow Works
                </h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Payment is held securely in escrow by Paystack.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Sellers ships your order.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>You receive and inspect the item.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Payment released to seller after confirmation.</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEscrowModalOpen(false)}
                  className="flex-1 btn btn-tertiary"
                >
                  Cancel
                </button>
                <button
                  onClick={proceedToCheckout}
                  className="flex-1 btn"
                >
                  Proceed to Checkout
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* REMOVED Login Prompt Modal - Now handled globally */}
    </div>
  );
};

export default ProductDetailPage;