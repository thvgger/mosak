import { useState } from 'react';
import { User, MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const MultiStepBecomeBuyer = ({ onClose, onSubmit, loading, user }) => {
  const [formData, setFormData] = useState({
    address: '',
    date_of_birth: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.date_of_birth) {
      setError('Date of birth is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const result = await onSubmit(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError(result.error || 'Failed to create buyer account. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
        <p className="text-gray-600 mb-4">
          Your buyer account has been set up successfully!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Complete Your Buyer Profile</h2>
        <p className="text-sm text-gray-600">
          Tell us a bit more to enhance your shopping experience
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your shipping address"
              required
              disabled={loading || isSubmitting}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={loading || isSubmitting}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full btn mt-4"
          disabled={loading || isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              SETTING UP...
            </span>
          ) : (
            'COMPLETE SETUP →'
          )}
        </button>
      </form>
    </div>
  );
};

export default MultiStepBecomeBuyer;