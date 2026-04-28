// src/pages/seller/SellerAddProducts.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useBlocker } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Upload, 
  X, 
  Plus, 
  Trash2,
  Image as ImageIcon,
  Video,
  CheckCircle,
  AlertCircle,
  Eye,
  ChevronDown,
  Star,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const SellerAddProducts = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  
  // Navigation blocker for internal links
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentStep > 1 && !isSubmitting && !isSaved && currentLocation.pathname !== nextLocation.pathname
  );

  // Handle native browser navigation (refresh/close)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentStep > 1 && !isSubmitting && !isSaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentStep, isSubmitting, isSaved]);
  
  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    productName: '',
    shortDescription: '',
    category: '',
    subCategory: '',
    tags: [],
    brand: '',
    
    // Step 2: Images & Media
    images: [],
    video: null,
    
    // Step 3: Pricing
    isNegotiable: false,
    price: '',
    compareAtPrice: '',
    sku: `PROD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    quantity: '',
    enableLowStockAlert: false,
    lowStockThreshold: 5,
    trackInventory: true,
    
    // Step 4: Description & Variations
    fullDescription: '',
    variations: [],
    material: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    
    // Step 5: Shipping
    shipsFrom: 'Lagos, Nigeria',
    deliveryRegions: {
      nationwide: true,
      lagosOnly: false,
      specificStates: [],
      international: false
    },
    shippingFeeType: 'flat_rate',
    flatRateFee: '2000',
    minDeliveryDays: '3',
    maxDeliveryDays: '7',
    returnPolicy: '7-day return policy',
    
    // Step 6: Additional Info (from preview)
    status: 'draft'
  });
  
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [variationType, setVariationType] = useState('');
  const [variationOptions, setVariationOptions] = useState([]);
  const [variationOptionInput, setVariationOptionInput] = useState('');
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  // Categories data (would come from API)
  const categories = [
    { id: 'electronics', name: 'Electronics', subCategories: ['Phones', 'Laptops', 'Accessories', 'Audio'] },
    { id: 'fashion', name: 'Fashion', subCategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { id: 'automobile', name: 'Automobile', subCategories: ['Cars', 'Parts', 'Accessories', 'Services'] },
    { id: 'home', name: 'Home & Living', subCategories: ['Furniture', 'Decor', 'Kitchen', 'Appliances'] },
  ];
  
  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
    'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
    'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
  ];
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleDimensionsChange = (dimension, value) => {
    setFormData(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value }
    }));
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    if (formData.images.length + newImages.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };
  
  const removeImage = (index) => {
    URL.revokeObjectURL(formData.images[index].preview);
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 50 * 1024 * 1024) { // 50MB
      setFormData(prev => ({
        ...prev,
        video: {
          file,
          preview: URL.createObjectURL(file),
          name: file.name
        }
      }));
    } else {
      alert('Video must be less than 50MB');
    }
  };
  
  const removeVideo = () => {
    if (formData.video) {
      URL.revokeObjectURL(formData.video.preview);
      setFormData(prev => ({ ...prev, video: null }));
    }
  };
  
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (formData.tags.length < 10) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
        setTagInput('');
      }
    }
  };
  
  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };
  
  const handleAddVariation = () => {
    if (!variationType || variationOptions.length === 0) {
      alert('Please enter variation type and at least one option');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      variations: [...prev.variations, {
        id: Date.now(),
        type: variationType,
        options: [...variationOptions],
        prices: variationOptions.reduce((acc, opt) => ({ ...acc, [opt]: '' }), {}),
        stocks: variationOptions.reduce((acc, opt) => ({ ...acc, [opt]: '' }), {})
      }]
    }));
    
    setVariationType('');
    setVariationOptions([]);
  };
  
  const removeVariation = (id) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.filter(v => v.id !== id)
    }));
  };
  
  const addVariationOption = () => {
    if (variationOptionInput.trim()) {
      setVariationOptions(prev => [...prev, variationOptionInput.trim()]);
      setVariationOptionInput('');
    }
  };
  
  const removeVariationOption = (index) => {
    setVariationOptions(prev => prev.filter((_, i) => i !== index));
  };
  
  const updateVariationPrice = (variationId, option, value) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.map(v => {
        if (v.id === variationId) {
          return {
            ...v,
            prices: { ...v.prices, [option]: value }
          };
        }
        return v;
      })
    }));
  };
  
  const updateVariationStock = (variationId, option, value) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.map(v => {
        if (v.id === variationId) {
          return {
            ...v,
            stocks: { ...v.stocks, [option]: value }
          };
        }
        return v;
      })
    }));
  };
  
  const validateStep = () => {
    const newErrors = {};
    
    switch(currentStep) {
      case 1:
        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        if (formData.productName.length > 100) newErrors.productName = 'Product name must be less than 100 characters';
        if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
        if (formData.shortDescription.length > 200) newErrors.shortDescription = 'Short description must be less than 200 characters';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 2:
        if (formData.images.length === 0) newErrors.images = 'At least one product image is required';
        if (formData.images.length > 10) newErrors.images = 'Maximum 10 images allowed';
        break;
      case 3:
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
        if (!formData.quantity || parseInt(formData.quantity) < 0) newErrors.quantity = 'Valid quantity is required';
        if (!formData.sku) newErrors.sku = 'SKU is required';
        break;
      case 4:
        if (!formData.fullDescription || formData.fullDescription.length < 50) {
          newErrors.fullDescription = `Description must be at least 50 characters (${formData.fullDescription.length}/50)`;
        }
        break;
      case 5:
        // Shipping validation is optional
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  
  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      // API call to save as draft
      console.log('Saving draft:', formData);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSaved(true);
      setShowSaveSuccess(true);
      
      // Auto-navigate after a short delay
      setTimeout(() => {
        if (blocker.state === "blocked") {
          blocker.proceed();
        } else {
          navigate('/seller/products');
        }
      }, 2000);
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (currentStep < 6) {
      setCurrentStep(6);
      return;
    }

    if (validateStep()) {
      setIsSubmitting(true);
      try {
        // API call to submit product
        const productData = {
          ...formData,
          status: 'pending_review',
          submittedAt: new Date().toISOString()
        };
        console.log('Submitting product:', productData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaved(true);
        // Navigate to confirmation page or show modal
        navigate('/seller/products/submitted', { 
          state: { productName: formData.productName }
        });
      } catch (error) {
        console.error('Error submitting product:', error);
        alert('Failed to submit product. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };  
  // Step Components
  const renderStepIndicator = () => (
    <div className="mb-10 w-full flex flex-col items-center justify-center gap-4">
      <p className="text-gray-600 text-center! font-semibold"> Step {currentStep} of 6 </p>

      <div className='flex items-center gap-3'> 
        {[1, 2, 3, 4, 5, 6].map(step => (
          <div key={step} className="flex-1 relative">
            <div className="flex flex-col items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full flex items-center justify-center font-semibold z-10 relative bg-gray-200 text-gray-500
                  
                  ${currentStep === step ? 'bg-primary w-6' : ''}
                `}
              >
                {/* {currentStep > step ? <CheckCircle size={20} /> : step} */}
              </div>
            </div>
              {/* <span className="text-xs mt-2 text-gray-600 hidden sm:block">
                Step {step}
              </span> */}
            {/* {step < 6 && (
              <div
                className={`absolute top-1.5 left-1/2 w-full h-0.5 -translate-y-1/2
                  ${currentStep > step ? 'bg-primary' : 'bg-gray-200'}
                `}
              />
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.productName}
          onChange={(e) => handleInputChange('productName', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
            ${errors.productName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="e.g., Premium Cotton T-Shirt"
          maxLength={100}
        />
        <div className="flex justify-between mt-1">
          {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
          <p className="text-gray-400 text-sm ml-auto">{formData.productName.length}/100</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.shortDescription}
          onChange={(e) => handleInputChange('shortDescription', e.target.value)}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
            ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Brief description that appears in search results..."
          maxLength={200}
        />
        <div className="flex justify-between mt-1">
          {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription}</p>}
          <p className="text-gray-400 text-sm ml-auto">{formData.shortDescription.length}/200</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => {
              handleInputChange('category', e.target.value);
              handleInputChange('subCategory', '');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="">Choose category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sub-category</label>
          <select
            value={formData.subCategory}
            onChange={(e) => handleInputChange('subCategory', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            disabled={!formData.category}
          >
            <option value="">Choose sub-category</option>
            {formData.category && categories.find(c => c.id === formData.category)?.subCategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags (Press enter to add)
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-sm">
              {tag}
              <button onClick={() => removeTag(index)} className="hover:text-red-500">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Add tag..."
        />
        <p className="text-gray-400 text-sm mt-1">Help buyers discover your product</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <input
          type="text"
          value={formData.brand}
          onChange={(e) => handleInputChange('brand', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Add brand name..."
        />
      </div>
    </div>
  );
  
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images <span className="text-red-500">*</span> (Min 1, Max 10)
        </label>
        
        {/* Image Grid */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img src={image.preview} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg border" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <Upload className="mx-auto mb-2 text-gray-400" size={32} />
          <p className="text-gray-600">Drag and drop files here, or click to browse</p>
          <p className="text-gray-400 text-sm mt-1">JPG, PNG, WebP • Max 5MB per file</p>
          <p className="text-gray-400 text-sm">Recommended: 1000×1000px minimum</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />
        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Video (Optional)
        </label>
        
        {formData.video ? (
          <div className="relative inline-block">
            <video src={formData.video.preview} className="w-48 h-32 object-cover rounded-lg border" controls />
            <button
              onClick={removeVideo}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => videoInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <Video className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-600">Upload video • MP4 • Max 50MB</p>
            <p className="text-gray-400 text-sm mt-1">Boost engagement with a product demo</p>
          </div>
        )}
        <input
          ref={videoInputRef}
          type="file"
          accept="video/mp4"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
  
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-700">Negotiable</label>
          <button
            onClick={() => handleInputChange('isNegotiable', !formData.isNegotiable)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${formData.isNegotiable ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${formData.isNegotiable ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary
                  ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Strike through price (Optional)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <input
                type="number"
                value={formData.compareAtPrice}
                onChange={(e) => handleInputChange('compareAtPrice', e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="0.00"
              />
            </div>
            <p className="text-gray-400 text-sm mt-1">Shows as "on sale"</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            Similar products sell for ₦15,000 - ₦25,000 in your category
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU (Stock Keeping Unit)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => handleInputChange('sku', `PROD-${Date.now()}-${Math.floor(Math.random() * 10000)}`)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Regenerate
              </button>
            </div>
            {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Available <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary
                ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="0"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enableLowStockAlert}
              onChange={(e) => handleInputChange('enableLowStockAlert', e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
            <span className="text-sm text-gray-700">Enable low stock alerts</span>
          </label>
          
          {formData.enableLowStockAlert && (
            <div className="ml-7">
              <label className="block text-sm text-gray-600 mb-1">Alert me when quantity drops below</label>
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value))}
                className="w-32 px-3 py-1 border border-gray-300 rounded-lg"
              />
              <span className="ml-2 text-sm text-gray-600">Units</span>
            </div>
          )}
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.trackInventory}
              onChange={(e) => handleInputChange('trackInventory', e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
            <span className="text-sm text-gray-700">Track inventory (Recommended)</span>
          </label>
          <p className="text-gray-400 text-sm ml-7">Automatically update stock after each sale</p>
        </div>
      </div>
    </div>
  );
  
  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Product Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.fullDescription}
          onChange={(e) => handleInputChange('fullDescription', e.target.value)}
          rows={8}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary
            ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Describe your product in detail..."
        />
        <div className="flex justify-between mt-1">
          {errors.fullDescription && <p className="text-red-500 text-sm">{errors.fullDescription}</p>}
          <p className={`text-sm ml-auto ${formData.fullDescription.length >= 50 ? 'text-green-500' : 'text-gray-400'}`}>
            Minimum 50 characters ({formData.fullDescription.length}/50)
          </p>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">Product Variations (Optional)</label>
          <button
            onClick={() => {
              setVariationType('');
              setVariationOptions([]);
              // Show variation modal or inline form
              const type = prompt('Enter variation type (e.g., Size, Color, Material):');
              if (type) {
                setVariationType(type);
                // Let's use a simple prompt chain for demo
                const options = prompt('Enter options separated by commas (e.g., S,M,L or Red,Blue,Green):');
                if (options) {
                  setVariationOptions(options.split(',').map(opt => opt.trim()));
                  handleAddVariation();
                }
              }
            }}
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            + Add Variation
          </button>
        </div>
        
        {formData.variations.map(variation => (
          <div key={variation.id} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{variation.type}</h4>
              <button onClick={() => removeVariation(variation.id)} className="text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {variation.options.map(option => (
                <div key={option} className="grid grid-cols-2 gap-3">
                  <span className="text-sm text-gray-600">{option}</span>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Price"
                      value={variation.prices[option]}
                      onChange={(e) => updateVariationPrice(variation.id, option, e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={variation.stocks[option]}
                      onChange={(e) => updateVariationStock(variation.id, option, e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
          <input
            type="text"
            value={formData.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Cotton"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (Optional)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="0.5"
            />
            <span className="px-3 py-2 bg-gray-100 rounded-lg text-gray-600">Kg</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (L × W × H)</label>
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            value={formData.dimensions.length}
            onChange={(e) => handleDimensionsChange('length', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Length"
          />
          <input
            type="text"
            value={formData.dimensions.width}
            onChange={(e) => handleDimensionsChange('width', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Width"
          />
          <input
            type="text"
            value={formData.dimensions.height}
            onChange={(e) => handleDimensionsChange('height', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Height"
          />
        </div>
        <p className="text-gray-400 text-sm mt-1">cm</p>
      </div>
    </div>
  );
  
  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ships From</label>
        <input
          type="text"
          value={formData.shipsFrom}
          onChange={(e) => handleInputChange('shipsFrom', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Regions</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.deliveryRegions.nationwide}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                deliveryRegions: { ...prev.deliveryRegions, nationwide: e.target.checked }
              }))}
              className="w-4 h-4 text-primary rounded"
            />
            <span>Nationwide (Nigeria)</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.deliveryRegions.lagosOnly}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                deliveryRegions: { ...prev.deliveryRegions, lagosOnly: e.target.checked }
              }))}
              className="w-4 h-4 text-primary rounded"
            />
            <span>Lagos only</span>
          </label>
          
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.deliveryRegions.specificStates.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      deliveryRegions: { ...prev.deliveryRegions, specificStates: [] }
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      deliveryRegions: { ...prev.deliveryRegions, specificStates: [] }
                    }));
                  }
                }}
                className="w-4 h-4 text-primary rounded"
              />
              <span>Select specific states</span>
            </label>
            
            {formData.deliveryRegions.specificStates && (
              <div className="ml-7 mt-2">
                <select
                  multiple
                  value={formData.deliveryRegions.specificStates}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData(prev => ({
                      ...prev,
                      deliveryRegions: { ...prev.deliveryRegions, specificStates: values }
                    }));
                  }}
                  className="w-full max-h-32 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <p className="text-gray-400 text-sm mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
                )}
                </div>
                </div>
                </div>      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Fee</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shippingFeeType"
              value="flat_rate"
              checked={formData.shippingFeeType === 'flat_rate'}
              onChange={(e) => handleInputChange('shippingFeeType', e.target.value)}
              className="w-4 h-4 text-primary"
            />
            <span>Flat rate</span>
            {formData.shippingFeeType === 'flat_rate' && (
              <div className="flex items-center gap-2 ml-2">
                <span>₦</span>
                <input
                  type="text"
                  value={formData.flatRateFee}
                  onChange={(e) => handleInputChange('flatRateFee', e.target.value)}
                  className="w-32 px-2 py-1 border rounded"
                  placeholder="2000"
                />
                <span>per order</span>
              </div>
            )}
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shippingFeeType"
              value="free"
              checked={formData.shippingFeeType === 'free'}
              onChange={(e) => handleInputChange('shippingFeeType', e.target.value)}
              className="w-4 h-4 text-primary"
            />
            <span>Free shipping</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shippingFeeType"
              value="buyer_pays"
              checked={formData.shippingFeeType === 'buyer_pays'}
              onChange={(e) => handleInputChange('shippingFeeType', e.target.value)}
              className="w-4 h-4 text-primary"
            />
            <span>Buyer pays shipping (calculated at checkout)</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shippingFeeType"
              value="varies"
              checked={formData.shippingFeeType === 'varies'}
              onChange={(e) => handleInputChange('shippingFeeType', e.target.value)}
              className="w-4 h-4 text-primary"
            />
            <span>Varies by location</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Time</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={formData.minDeliveryDays}
            onChange={(e) => handleInputChange('minDeliveryDays', e.target.value)}
            className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Min"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            value={formData.maxDeliveryDays}
            onChange={(e) => handleInputChange('maxDeliveryDays', e.target.value)}
            className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Max"
          />
          <span className="text-gray-600 ml-1">business days</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Return Policy</label>
        <select
          value={formData.returnPolicy}
          onChange={(e) => handleInputChange('returnPolicy', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option>7-day return policy</option>
          <option>14-day return policy</option>
          <option>30-day return policy</option>
          <option>No returns accepted</option>
        </select>
        <p className="text-gray-400 text-sm mt-1">Clear return policies increase buyer trust</p>
      </div>
    </div>
  );
  
  const renderStep6 = () => (
    <div className="space-y-6">
      {/* Product Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Product Preview</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-primary"
          >
            <Eye size={16} />
            {showPreview ? 'Hide Preview' : 'Preview how buyers will see your product'}
          </button>
        </div>
        
        {showPreview && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Preview Content */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-gray-500">Step 6 of 6</span>
                <h2 className="text-xl font-bold mt-1">Product Preview</h2>
                <p className="text-gray-600">Preview how buyers will see your product</p>
              </div>
              <button className="text-primary cursor-not-allowed" disabled>Edit</button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                {formData.images[0] && (
                  <div className="relative group">
                    <img src={formData.images[0].preview} alt="Product" className="w-24 h-24 object-cover rounded" />
                    {formData.images.length > 1 && (
                      <>
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-0.5 shadow-sm">
                          <ChevronLeft size={14} />
                        </button>
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-0.5 shadow-sm">
                          <ChevronRight size={14} />
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Foreign Used</span>
                    <span className="text-sm font-medium">{formData.productName || 'Product Name'}</span>
                    <button className="text-primary text-sm cursor-not-allowed" disabled>Edit</button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{formData.shortDescription || 'Product description preview...'}</p>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">₦{parseFloat(formData.price || 0).toLocaleString()}</span>
                    {formData.compareAtPrice && (
                      <>
                        <span className="text-gray-400 line-through ml-2">₦{parseFloat(formData.compareAtPrice).toLocaleString()}</span>
                        <span className="text-green-600 ml-2">
                          {Math.round((1 - parseFloat(formData.price) / parseFloat(formData.compareAtPrice)) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  
                  {formData.variations.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {formData.variations[0].options.map(opt => (
                        <button key={opt} className="px-3 py-1 border rounded hover:border-primary">{opt}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-2 border border-primary text-primary rounded-lg cursor-not-allowed" disabled>
                Buy Now
              </button>
              <button className="flex-1 py-2 bg-primary text-white rounded-lg cursor-not-allowed" disabled>
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Before you submit:</h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-center gap-2">
            <CheckCircle size={16} />
            Ensure all product information is accurate
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} />
            Review your product images for quality
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} />
            Verify pricing and shipping details
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} />
            Products will be reviewed within 24-48 hours
          </li>
        </ul>
      </div>
    </div>
  );
  
  const renderModals = () => {
    return (
      <>
        {/* Navigation Blocker Modal */}
        {blocker.state === "blocked" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 text-amber-600 mb-4">
                <AlertCircle size={24} />
                <h3 className="text-lg font-bold text-gray-900">Unsaved Changes</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                You have unsaved changes. Would you like to save this product as a draft before leaving?
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleSaveDraft()}
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Saving...' : (
                    <>
                      <Save size={18} />
                      Save as Draft and Leave
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => blocker.proceed()}
                  className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Leave without Saving
                </button>
                
                <button
                  onClick={() => blocker.reset()}
                  className="w-full py-2 text-gray-500 font-medium hover:text-gray-700 transition-colors"
                >
                  Stay on Page
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSaveSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Product saved as draft successfully.</p>
              <div className="mt-6 flex justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-sm text-gray-400 mt-4">Redirecting...</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="">
      {renderModals()}
      {/* Breadcrumb & Top Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`p-2 rounded-full border transition-colors ${
            currentStep === 1 
              ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed' 
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
          title="Previous Step"
        >
          <ArrowLeft size={20} />
        </button>
        <ul className="text-sm text-gray-500 flex items-center gap-1.5">
          <Link to="/seller"> Dashboard </Link>
          <ChevronRight size={16} className="flex" />
          <Link to="/seller/add-products"> Add Products </Link>
        </ul>
      </div>
          
      {/* <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        <button
          onClick={handleSaveDraft}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Save size={16} />
          Save Draft
        </button>
      </div> */}
        
      {/* Step Indicator */}
      {renderStepIndicator()}
      
      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleSaveDraft}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Save size={16} />
          Save Draft
        </button>
        
        {currentStep < 6 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Next
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                Submit Product
                <CheckCircle size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SellerAddProducts;