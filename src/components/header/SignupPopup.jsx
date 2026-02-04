import { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';

const SignupPopup = ({ onClose, onSignInClick, selectedRole, onSuccess }) => {
  const { signup, loading } = useAuth();
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: selectedRole || "buyer"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setError('');
    setPasswordError('');
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role
    };
    
    const result = await signup(userData);
    
    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="bg-white rounded-md p-6 md:p-8 max-w-md w-full shadow-xl">
      {selectedRole && (
        <div className="mb-4 py-2 px-3 bg-primary/10 rounded-lg text-center">
          <span className="text-sm">Creating account as a: </span>
          <span className="text-sm font-semibold text-primary">
            {selectedRole.toUpperCase()}
          </span>
        </div>
      )}
      
      <h2 className="text-xl font-semibold text-center mb-6">Create Your Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>
        
        <button 
          type="submit"
          className="w-full btn"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'CREATE ACCOUNT →'}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <span className="text-gray-600">Already have an account? </span>
        <button 
          className="text-primary font-semibold hover:underline"
          onClick={onSignInClick}
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignupPopup;