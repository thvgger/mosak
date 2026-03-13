// components/auth/ResetPasswordPopup.jsx
import { useState } from "react";
import { Eye, EyeClosed } from 'lucide-react';

const ResetPasswordPopup = ({ email, onSubmit, onClose, onBackToLogin }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    const result = await onSubmit(email, otpCode, newPassword);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-semibold text-center mb-2">Reset Password</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Enter the 6-digit code sent to your email and your new password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Verification Code</label>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`reset-otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button 
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-dark/40 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            > 
              {!showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input 
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <button 
          type="submit"
          className="w-full btn mb-4"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'RESET PASSWORD'}
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

export default ResetPasswordPopup;