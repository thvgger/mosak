// components/auth/ForgotPasswordPopup.jsx
import { useState } from "react";

const ForgotPasswordPopup = ({ onSubmit, onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await onSubmit(email);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Failed to send reset code');
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-semibold text-center mb-4">Check Your Email</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We've sent a password reset code to <span className="font-semibold">{email}</span>
        </p>
        <button
          onClick={onBackToLogin}
          className="w-full btn"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-semibold text-center mb-2">Forgot Password</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your email address and we'll send you a code to reset your password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <button 
          type="submit"
          className="w-full btn mb-4"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'SEND RESET CODE'}
        </button>
      </form>
      
      <div className="text-center">
        <button 
          onClick={onBackToLogin}
          className="text-primary hover:underline text-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;