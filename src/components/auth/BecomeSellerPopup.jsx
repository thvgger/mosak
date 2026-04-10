// components/auth/BecomeSellerPopup.jsx
import { useState } from 'react';
import { X, Store, Building2, MapPin, FileText, Phone, Mail, CheckCircle } from 'lucide-react';

const BecomeSellerPopup = ({ onClose, onSubmit, loading, user }) => {
  const [formData, setFormData] = useState({
    business_name: '',
    business_address: '',
    business_description: '',
    business_phone: user?.phone_number || '',
    business_email: user?.email || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.business_name.trim()) {
      setError('Business name is required');
      return false;
    }
    if (!formData.business_address.trim()) {
      setError('Business address is required');
      return false;
    }
    if (!formData.business_description.trim()) {
      setError('Business description is required');
      return false;
    }
    if (formData.business_phone && !/^[\d\s+()-]{10,}$/.test(formData.business_phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (formData.business_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.business_email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await onSubmit(formData);
    if (result.success) {
      setSuccess(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError(result.error || 'Failed to create seller account. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Success!</h2>
        <p className="text-gray-600 mb-4">
          Your seller account has been created successfully!
        </p>
        <p className="text-sm text-gray-500">
          You can now access the Seller Dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide relative">
      {/* <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        disabled={loading}
      >
        <X size={20} />
      </button> */}
      
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Become a Seller</h2>
        <p className="text-sm text-gray-600">
          Start selling your products and grow your business on Mosak Hub
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your business/store name"
              required
              disabled={loading}
            />
          </div>
        </div>
        
        {/* Business Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="business_address"
              value={formData.business_address}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Full business address"
              required
              disabled={loading}
            />
          </div>
        </div>
        
        {/* Business Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="business_description"
              value={formData.business_description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe what you sell, your values, shipping policy, etc."
              required
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This will appear on your store page
          </p>
        </div>
        
        {/* Business Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Phone <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="business_phone"
              value={formData.business_phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Business contact number"
              disabled={loading}
            />
          </div>
        </div>
        
        {/* Business Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Email <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="business_email"
              value={formData.business_email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Business contact email"
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Leave blank to use your account email
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full btn mt-4"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              CREATING SELLER ACCOUNT...
            </span>
          ) : (
            'BECOME A SELLER'
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          By becoming a seller, you agree to our 
          <a href="/terms" className="text-primary hover:underline ml-1">Seller Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default BecomeSellerPopup;