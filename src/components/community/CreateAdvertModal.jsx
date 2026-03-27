import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle, ChevronDown, ThumbsUp, Flame, Smile } from 'lucide-react';

// Base Modal Component (reuse the same Modal from your MAdvertCard)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-5000 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 z-4999" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 z-50 scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

// Preview Modal Component
const AdvertPreviewModal = ({ isOpen, onClose, onBack, onPublish, formData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Advert Preview</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">This is how your advert will appear in M-Advert</p>

        {/* Preview Card */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              {formData?.avatar || 'CA'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formData?.author || 'Chioma Adeleke'}</span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Platinum</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">Seller</span>
              </div>
              <span className="text-xs text-gray-500">10:24 AM</span>
            </div>
          </div>

          {formData?.productTitle && (
            <div className="mb-3">
              <p className="text-sm font-medium">{formData.productTitle}</p>
              {formData.price && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-blue-600 font-bold">{formData.price}</span>
                  {formData.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">{formData.oldPrice}</span>
                  )}
                </div>
              )}
              {formData.location && (
                <div className="flex items-center gap-1 mt-1 text-xs text-blue-500">
                  <span>{formData.location}</span>
                </div>
              )}
            </div>
          )}

          {formData?.image && (
            <div className="mb-3">
              <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            </div>
          )}

          {formData?.postText && (
            <p className="text-sm text-gray-700 mb-2">{formData.postText}</p>
          )}

          {formData?.link && (
            <a href={formData.link} className="text-sm text-blue-600 underline block mb-3">
              {formData.link}
            </a>
          )}

          <div className="flex items-center gap-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <ThumbsUp size={12} /> 0
            </button>
            <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Flame size={12} /> 0
            </button>
            <button className="p-1 rounded-full border border-gray-300">
              <Smile size={14} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Edit
          </button>
          <button
            onClick={onPublish}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Publish Advert
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Success Modal
const CreateSuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Success!</h2>
        <p className="text-gray-600">Your advert has been posted to M-Advert</p>
      </div>
    </Modal>
  );
};

// Main Create Advert Modal
const CreateAdvertModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: select type, 2: fill details, 3: preview
  const [advertType, setAdvertType] = useState('marketplace');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
    productTitle: 'Premium Leatherbag',
    price: '₦22,000,000',
    oldPrice: '₦44,000,000',
    location: 'Lagos',
    author: 'Chioma Adeleke',
    avatar: 'CA',
    postText: '',
    link: ''
  });
  
  // Mock products data
  const products = [
    { id: 1, name: 'Premium Leatherbag', price: '₦22,000,000', oldPrice: '₦44,000,000' },
    { id: 2, name: 'Wireless Headphones', price: '₦15,000', oldPrice: '₦25,000' },
    { id: 3, name: 'Smart Watch Series 5', price: '₦45,000', oldPrice: '₦65,000' },
  ];

  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dailyLimitReached] = useState(false); // This would come from your user data
  const [isPremium] = useState(false); // This would come from your user data

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFormData(prev => ({
      ...prev,
      productTitle: product.name,
      price: product.price,
      oldPrice: product.oldPrice
    }));
    setShowProductDropdown(false);
  };

  const handlePublish = () => {
    setShowPreview(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setStep(1);
      setAdvertType('marketplace');
      setSelectedProduct(null);
      setFormData({
        title: '',
        description: '',
        image: null,
        imagePreview: null,
        productTitle: 'Premium Leatherbag',
        price: '₦22,000,000',
        oldPrice: '₦44,000,000',
        location: 'Lagos',
        author: 'Chioma Adeleke',
        avatar: 'CA',
        postText: '',
        link: ''
      });
    }, 2000);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Create M-Advert</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Promote your product or service to the Mosalak community
          </p>

          <div className="space-y-6">
            {/* Advert Type Selection */}
            <div>
              <h3 className="text-sm font-medium mb-3">Select Advert Type</h3>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer ${
                  advertType === 'marketplace' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="advertType"
                    checked={advertType === 'marketplace'}
                    onChange={() => setAdvertType('marketplace')}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium block">Marketplace Product</span>
                    <span className="text-sm text-gray-500">Promote physical or digital products from your store</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer ${
                  advertType === 'service' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="advertType"
                    checked={advertType === 'service'}
                    onChange={() => setAdvertType('service')}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium block">Service Listing</span>
                    <span className="text-sm text-gray-500">Advertise your freelance or professional services</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Product Selection */}
            {advertType === 'marketplace' && (
              <div>
                <h3 className="text-sm font-medium mb-3">Select a Product to Advertise</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                    className="w-full p-3 border border-gray-200 rounded-lg text-left flex items-center justify-between"
                  >
                    <span className={selectedProduct ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedProduct ? selectedProduct.name : 'Select from your listings'}
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {showProductDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {products.map(product => (
                        <button
                          key={product.id}
                          onClick={() => handleSelectProduct(product)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.price} {product.oldPrice && <span className="line-through ml-2">{product.oldPrice}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedProduct && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{selectedProduct.name}</span>
                  </div>
                )}
              </div>
            )}

            {/* Advert Details */}
            <div>
              <h3 className="text-sm font-medium mb-3">Advert Details</h3>
              
              {/* Title Input */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 block mb-2">Advert Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Premium Leatherbag -30%OFF"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                />
                {formData.title && (
                  <p className="mt-2 text-sm font-medium">{formData.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 block mb-2">Short Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what makes your product special..."
                  className="w-full p-3 border border-gray-200 rounded-lg min-h-25"
                  maxLength={advertType === 'marketplace' ? 140 : 60}
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Keep it short. This will appear directly in the M-Advert feed.
                  </p>
                  <span className="text-xs text-gray-400">
                    {formData.description.length}/{advertType === 'marketplace' ? 140 : 60}
                  </span>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm text-gray-600 block mb-2">Advert Image</label>
                
                {!formData.imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex flex-col items-center"
                    >
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-sm text-blue-600 mb-1">Click to upload image</span>
                      <span className="text-xs text-gray-500">JPG or PNG • Max 5MB</span>
                      <span className="text-xs text-gray-500 mt-2">Recommended: 1:1 (square)</span>
                      <button className="mt-3 px-4 py-2 border border-gray-300 rounded-lg text-sm">
                        Choose File
                      </button>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={formData.imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex gap-2 mt-2">
                      <label 
                        htmlFor="image-upload"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-center cursor-pointer hover:bg-gray-50"
                      >
                        Change Image
                      </label>
                      <button 
                        onClick={handleRemoveImage}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Posting Rules */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">M-Advert Posting Rules</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• M-Advert is a read-only channel—users cannot reply</li>
                <li>• Your advert will be visible to all community members</li>
                <li>• Users can react with emojis to show interest</li>
                <li>• Clicking your image redirects to your product page</li>
              </ul>
            </div>

            {/* Daily Limit / Premium Status */}
            {dailyLimitReached ? (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Daily Limit Reached</h3>
                <p className="text-xs text-yellow-700 mb-3">
                  You've used all 2 M-Adverts for today. Want to post more? Upgrade your plan for unlimited daily adverts and priority placement.
                </p>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700">
                  Upgrade
                </button>
              </div>
            ) : isPremium && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Gold Member</h3>
                <p className="text-xs text-yellow-700">
                  Unlimited daily M-Adverts • Priority feed placement enabled
                </p>
                <button className="mt-2 px-3 py-1 text-xs border border-yellow-300 rounded hover:bg-yellow-100">
                  Upgrade
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={() => {
                setShowPreview(true);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Publish Advert
            </button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <AdvertPreviewModal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onBack={() => setShowPreview(false)}
        onPublish={handlePublish}
        formData={{
          ...formData,
          postText: formData.description,
          link: 'https://mosalak.com/product/123'
        }}
      />

      {/* Success Modal */}
      <CreateSuccessModal 
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    </>
  );
};

export default CreateAdvertModal;