import React, { useState, useEffect, useRef } from "react";
import { MapPin, MoreVertical, Flame, ThumbsUp, Smile, TrendingUp, Tag, Trash2, X, CheckCircle } from "lucide-react";
import car from "../../assets/car.png";

// Base Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto mx-4 z-50 scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

// Promote to General Feed Modal
const PromoteGeneralModal = ({ isOpen, onClose, onProceed }) => {
  const [selectedProduct, setSelectedProduct] = useState("Samsung Galaxy S23 Ultra 256GB");
  const [quantity, setQuantity] = useState(1);
  const [agreedPrice, setAgreedPrice] = useState("₱850,000");
  const [promotionFee] = useState("₦5,000");

  const products = [
    "Samsung Galaxy S23 Ultra 256GB",
    "iPhone 15 Pro Max 256GB",
    "Google Pixel 8 Pro 128GB"
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <h2 className="text-lg font-semibold p-4 bg-primary text-white">Request Admin Approval</h2>
        
        <div className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selected Product</label>
            <div className="border border-gray-300 rounded-lg p-3">
              <select 
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
              >
                {products.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
              <div className="flex items-center justify-between text-sm">
                <span>Quantity: {quantity}</span>
                <button className="text-blue-600 text-sm"> Change Product </button>
              </div>
              <div className="w-full flex items-center justify-start gap-2 mt-2">
                <label className="block text-sm text-nowrap"> Agreed Price </label>
                <input
                  type="text"
                  value={agreedPrice}
                  onChange={(e) => setAgreedPrice(e.target.value)}
                  className="w-fit text-sm"
                />
                <p className="text-xs bg-primary/10 rounded-full px-2 py-0.5 text-nowrap">Normal Visibility</p>
              </div>
            </div>
          </div>


          <div className="bg-primary/10 border border-gray-300 p-3 rounded-md">
            <p className="text-sm font-medium">Promotion Visibility</p>
            <p className="text-xs text-gray-600 mt-1">This ad will be posted in the General Community after admin approval</p>
          </div>

          <div className="w-full flex justify-between items-center border-b border-gray-300 pb-4">
            <span className="font-semibold text-sm">
              Promotion Fee: 
            </span>
            <span>
              {promotionFee}
            </span>
          </div>

          <p className="text-xs text-gray-500">Note: Admin approval is required before your ad goes live. You'll be notified once approved.</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="btn btn-tertiary w-full"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onProceed?.();
                onClose();
              }}
              className="btn btn-primary w-full"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Promote to Category Feed Modal (First Step)
const PromoteCategoryModal = ({ isOpen, onClose, onNext }) => {
  const [promotionType, setPromotionType] = useState("seller");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <div className="bg-primary text-white p-4">
          <h2 className="text-lg font-semibold">Promote to Category Feed</h2>
          <p className="text-sm">Boost visibility within a specific category</p>
        </div>
        
        <div className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Choose Promotion Type</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="promotionType"
                  checked={promotionType === "seller"}
                  onChange={() => setPromotionType("seller")}
                  className="text-blue-600"
                />
                <span>Run ad as Seller</span>
              </label>
              <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="promotionType"
                  checked={promotionType === "freelancer"}
                  onChange={() => setPromotionType("freelancer")}
                  className="text-blue-600"
                />
                <span>Run ad as Freelancer</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="btn btn-tertiary w-full"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onNext?.(promotionType);
                onClose();
              }}
              className="btn btn-primary w-full"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Category Feed Details Modal (Second Step)
const CategoryDetailsModal = ({ isOpen, onClose, promotionType, onPay }) => {
  const [category, setCategory] = useState("Automobile");
  const [cost] = useState("N2,500");

  const categories = [
    "Automobile",
    "Design & Creative",
    "Electronics",
    "Fashion",
    "Real Estate"
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <div className="bg-primary text-white p-4">
          <h2 className="text-lg font-semibold">Promote to Category Feed</h2>
          <p className="text-sm">Boost visibility within a specific category</p>
        </div>
        
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <label className="text-sm"> Promotion Type: </label>
            <p className="text-sm capitalize">{promotionType}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded border border-gray-300 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Placement:</span>
              <span className="font-medium">Category Feed (Pinned)</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">7 Days (Fixed)</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">Visibility:</span>
              <span className="font-medium">{category}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-semibold">Cost:</span>
              <span className="font-semibold text-blue-600">{cost}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="btn btn-tertiary w-full"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onPay?.(category);
                onClose();
              }}
              className="btn btn-primary w-full"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Payment Modal
const PaymentModal = ({ isOpen, onClose, promotionType = "General Feed", amount = "₦5,000", category = "" }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <div className="bg-primary text-white p-4">
          <h2 className="text-lg font-semibold">Complete Payment</h2>
          <p className="text-sm">Choose your payment method</p>
        </div>
        
        <div className="space-y-4 p-4">
          <div className="bg-gray-50 p-4 rounded border border-gray-300 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Promotion Type:</span>
              <span className="font-medium">{promotionType}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">7 Days</span>
            </div>
            {/* {category && ( */}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{category}</span>
              </div>
            {/* )} */}
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold text-blue-600">{amount}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="text-blue-600"
                />
                <div>
                  <span className="font-medium">Card Payment</span>
                  <p className="text-xs text-gray-500">Pay with Debit/Credit Card</p>
                </div>
              </label>
              <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="text-blue-600"
                />
                <div>
                  <span className="font-medium">Bank Transfer</span>
                  <p className="text-xs text-gray-500">Direct bank transfer</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Processing ${paymentMethod} payment...`);
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Pay {amount}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Slots Full Modal
const SlotsFullModal = ({ isOpen, onClose, onTryCategory }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Slots Currently Full</h2>
        <p className="text-sm text-gray-600 mb-6">
          General feed is currently full. Try category feed instead or check back later.
        </p>
        
        <button
          onClick={() => {
            onTryCategory?.();
            onClose();
          }}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Promote to Category Feed
        </button>
      </div>
    </Modal>
  );
};

// Success Modal
const SuccessModal = ({ isOpen, onClose, message, type = "general" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-lg font-semibold mb-2">Successful!</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        
        {type === "general" ? (
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View
            </button>
            <p className="text-xs text-gray-500">Premium Active</p>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Done
          </button>
        )}
      </div>
    </Modal>
  );
};

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">Delete Advert?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this advert? This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Advert
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Main Component
const MAdvertCard = ({ advert }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPromoteGeneral, setShowPromoteGeneral] = useState(false);
  const [showPromoteCategory, setShowPromoteCategory] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSlotsFull, setShowSlotsFull] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const [promotionType, setPromotionType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePromoteGeneral = () => {
    setShowMenu(false);
    setShowPromoteGeneral(true);
  };

  const handlePromoteCategory = () => {
    setShowMenu(false);
    setShowPromoteCategory(true);
  };

  const handleCategoryNext = (type) => {
    setPromotionType(type);
    setShowCategoryDetails(true);
  };

  const handleCategoryPay = (category) => {
    setSelectedCategory(category);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setSuccessMessage("Your advert has been pinned to the General Feed");
    setShowSuccess(true);
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowDelete(true);
  };

  const handleDeleteConfirm = () => {
    setSuccessMessage("Your advert has been deleted");
    setShowSuccess(true);
    // Here you would typically handle the actual deletion
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Avatar */}
            <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] sm:text-sm font-semibold shrink-0">
              {advert.avatar}
            </div>

            <div className="flex flex-col leading-tight">
              <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                <span className="font-semibold text-[11px] sm:text-sm truncate max-w-[60px] sm:max-w-none">{advert.author}</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full hidden sm:block"></span>
                <div className="hidden sm:flex items-center gap-1">
                  <span className="bg-yellow-200 text-yellow-800 text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full">
                    {advert.badge}
                  </span>
                  <span className="bg-gray-200 text-gray-700 text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full">
                    {advert.role}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{advert.time}</span>
            </div>
          </div>

          <div ref={menuRef} className="relative">
            <MoreVertical
              size={18}
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <>
                {/* Mobile Backdrop Overlay */}
                <div 
                  className="fixed inset-0 z-30 md:hidden" 
                  onClick={() => setShowMenu(false)}
                />
              <div className="absolute right-0 mt-2 w-48 sm:w-64 bg-white rounded shadow-lg border border-gray-200 z-40">
                  <button 
                    onClick={handlePromoteGeneral}
                    className="flex items-center gap-2.5 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <TrendingUp size={16} className="text-gray-400 sm:w-[18px] sm:h-[18px]"/>
                    <span>Promote to General</span>
                  </button>

                  <button 
                    onClick={handlePromoteCategory}
                    className="flex items-center gap-2.5 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <Tag size={16} className="text-gray-400 sm:w-[18px] sm:h-[18px]"/>
                    <span>Promote to Category</span>
                  </button>

                  <div className="h-px bg-gray-100 my-1" />
  
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2.5 sm:gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]"/>
                    <span>Delete Advert</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* IMAGE */}
        <div className="bg-white border border-[#cfd3ff] rounded-b-2xl rounded-tr-2xl p-2 sm:p-3 shadow-xs">
          <div className="rounded-t-xl overflow-hidden">
            <img
              src={advert?.image || car}
              alt=""
              className="w-full h-32 sm:h-56 object-cover"
            />
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-b-lg p-2 sm:p-3 mb-3">
            <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 min-h-[2.5rem] sm:min-h-0">{advert.productTitle}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 mt-1">
              <span className="text-blue-600 font-bold text-xs sm:text-sm">{advert.price}</span>
              {advert.oldPrice && (
                <span className="text-[9px] sm:text-xs text-gray-400 line-through">{advert.oldPrice}</span>
              )}
            </div>
            {/* Hide description on mobile to save space */}
            <p className="hidden sm:block text-xs text-gray-400 mt-1">{advert.description}</p>
            <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-blue-500 truncate">
              <MapPin size={10} className="sm:w-3 sm:h-3" />
              <span className="truncate">{advert.location}</span>
            </div>
          </div>

          {/* POST TEXT */}
          <p className="text-[11px] sm:text-sm text-gray-700 mb-2 line-clamp-2">{advert.postText}</p>
          <a href={advert.link} className="text-[10px] sm:text-sm text-blue-600 underline break-all line-clamp-1 block">
            {advert.link}
          </a>

          {/* REACTIONS */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-3 mt-3">
            <button className="flex items-center gap-1 bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs">
              <ThumbsUp size={10} className="sm:w-3 sm:h-3" />
              {advert.likes}
            </button>
            <button className="flex items-center gap-1 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs">
              <Flame size={10} className="sm:w-3 sm:h-3" />
              {advert.fires}
            </button>
            <button className="p-1 rounded-full border border-gray-300">
              <Smile size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PromoteGeneralModal 
        isOpen={showPromoteGeneral}
        onClose={() => setShowPromoteGeneral(false)}
        onProceed={() => {
          setShowPromoteGeneral(false);
          setShowPayment(true);
        }}
      />

      <PromoteCategoryModal 
        isOpen={showPromoteCategory}
        onClose={() => setShowPromoteCategory(false)}
        onNext={handleCategoryNext}
      />

      <CategoryDetailsModal 
        isOpen={showCategoryDetails}
        onClose={() => setShowCategoryDetails(false)}
        promotionType={promotionType}
        onPay={handleCategoryPay}
      />

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        promotionType={promotionType ? "Category Feed" : "General Feed"}
        amount={promotionType ? "N2,500" : "₦5,000"}
        category={selectedCategory}
      />

      <SlotsFullModal 
        isOpen={showSlotsFull}
        onClose={() => setShowSlotsFull(false)}
        onTryCategory={() => {
          setShowSlotsFull(false);
          setShowPromoteCategory(true);
        }}
      />

      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
        type={successMessage.includes("pinned") ? "general" : "delete"}
      />

      <DeleteModal 
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default MAdvertCard;