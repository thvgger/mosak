// components/auth/OTPVerificationPopup.jsx
import { useState, useEffect } from "react";

const OTPVerificationPopup = ({ email, onVerify, onClose, onResend, onStartOver }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
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

    setLoading(true);
    const result = await onVerify(email, otpCode);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error);
      // Clear OTP fields on error
      setOtp(['', '', '', '', '', '']);
      // Focus first input
      document.getElementById('otp-0')?.focus();
    }
  };

  const handleResend = async () => {
    setLoading(true);
    const result = await onResend(email);
    setLoading(false);
    
    if (result.success) {
      setTimer(60);
      setCanResend(false);
      setError('');
      // Show success message
      setError('New code sent successfully!');
      setTimeout(() => setError(''), 3000);
    } else {
      setError(result.error || 'Failed to resend code');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-semibold text-center mb-2">Verify Your Email</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        We've sent a 6-digit code to <span className="font-semibold">{email}</span>
      </p>
      
      {error && (
        <div className={`mb-4 p-3 rounded text-sm ${
          error.includes('success') 
            ? 'bg-green-50 text-green-600 border border-green-200' 
            : 'bg-red-50 text-red-600 border border-red-200'
        }`}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              autoComplete="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={loading}
            />
          ))}
        </div>
        
        <button 
          type="submit"
          className="w-full btn mb-4"
          disabled={loading}
        >
          {loading ? 'VERIFYING...' : 'VERIFY EMAIL'}
        </button>
      </form>
      
      <div className="text-center space-y-3">
        {!canResend ? (
          <p className="text-sm text-gray-500">
            Resend code in <span className="font-semibold">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-primary hover:underline text-sm font-medium"
            disabled={loading}
          >
            Resend Code
          </button>
        )}
        
        <div className="flex items-center justify-center gap-4 pt-2">
          <button 
            className="text-gray-500 hover:text-gray-700 text-sm"
            onClick={onClose}
            disabled={loading}
          >
            Back to Login
          </button>
          
          <span className="text-gray-300">|</span>
          
          <button 
            className="text-gray-500 hover:text-gray-700 text-sm"
            onClick={onStartOver}
            disabled={loading}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPopup;