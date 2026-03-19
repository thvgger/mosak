// import { useState } from "react";
// import { useAuth } from '../../contexts/AuthContext';

// const SignupPopup = ({ onClose, onSignInClick, selectedRole, onSuccess }) => {
//   const { signup, loading } = useAuth();
//   const [error, setError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
  
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     role: selectedRole || "buyer"
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     setError('');
//     setPasswordError('');
//   };

//   const validatePassword = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setPasswordError("Passwords don't match");
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setPasswordError("Password must be at least 6 characters");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validatePassword()) {
//       return;
//     }
    
//     const userData = {
//       name: formData.fullName,
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone,
//       role: formData.role
//     };
    
//     const result = await signup(userData);
    
//     if (result.success) {
//       onSuccess();
//       onClose();
//     } else {
//       setError(result.error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
//       {selectedRole && (
//         <div className="mb-4 py-2 px-3 bg-primary/10 rounded-lg text-center">
//           <span className="text-sm">Creating account as a: </span>
//           <span className="text-sm font-semibold text-primary">
//             {selectedRole.toUpperCase()}
//           </span>
//         </div>
//       )}
      
//       <h2 className="text-xl font-semibold text-center mb-6">Create Your Account</h2>
      
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
//           {error}
//         </div>
//       )}
      
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//           <input 
//             type="text" 
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//           <input 
//             type="email" 
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//           <input 
//             type="tel" 
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input 
//             type="password" 
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//           <input 
//             type="password" 
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//           {passwordError && (
//             <p className="text-red-500 text-xs mt-1">{passwordError}</p>
//           )}
//         </div>
        
//         <button 
//           type="submit"
//           className="w-full btn"
//           disabled={loading}
//         >
//           {loading ? 'Creating Account...' : 'CREATE ACCOUNT →'}
//         </button>
//       </form>
      
//       <div className="text-center mt-6">
//         <span className="text-gray-600">Already have an account? </span>
//         <button 
//           className="text-primary font-semibold hover:underline"
//           onClick={onSignInClick}
//           disabled={loading}
//         >
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignupPopup;



// components/auth/SignupPopup.jsx
import { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeClosed, Check, X } from 'lucide-react';
import PasswordStrength from "./PasswordStrength";

const SignupPopup = ({ onClose, onSignInClick, selectedRole, onSuccess }) => {
  const { signup, loading } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: selectedRole ? selectedRole.toUpperCase() : "BUYER"
  });

  // Password validation state
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    setError('');
    
    // Validate password in real-time
    if (name === 'password') {
      validatePassword(value);
    }
  };

  // Real-time password validation
  const validatePassword = (password) => {
    setPasswordValidations({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  // Comprehensive password validation
  const isPasswordValid = () => {
    return Object.values(passwordValidations).every(Boolean);
  };

  // Check if passwords match
  const doPasswordsMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  // Validate all fields before submission
  const validateForm = () => {
    // Check if all required fields are filled
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate password strength
    if (!isPasswordValid()) {
      setError('Please meet all password requirements');
      return false;
    }

    // Check if passwords match
    if (!doPasswordsMatch()) {
      setError('Passwords do not match');
      return false;
    }

    // Validate phone (optional but if provided, check format)
    if (formData.phone) {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        setError('Please enter a valid phone number');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation first
    if (!validateForm()) {
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
      onSuccess(formData.email);
    } else {
      // Display specific error from backend
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  // Validation item component
  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center gap-2 text-xs">
      {isValid ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <X size={14} className="text-red-500" />
      )}
      <span className={isValid ? 'text-green-700' : 'text-gray-500'}>{text}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
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
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>
        
        {/* Phone (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-gray-400">(optional)</span>
          </label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="+2348012345678"
          />
        </div>
        
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Create a strong password"
              required
            />
            <button 
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {/* Password Requirements */}
          {formData.password && (
            <PasswordStrength password={formData.password} />
            // <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            //   <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
            //   <div className="grid grid-cols-2 gap-2">
            //     <ValidationItem 
            //       isValid={passwordValidations.minLength}
            //       text="At least 8 characters"
            //     />
            //     <ValidationItem 
            //       isValid={passwordValidations.hasUpperCase}
            //       text="One uppercase letter"
            //     />
            //     <ValidationItem 
            //       isValid={passwordValidations.hasLowerCase}
            //       text="One lowercase letter"
            //     />
            //     <ValidationItem 
            //       isValid={passwordValidations.hasNumber}
            //       text="One number"
            //     />
            //     <ValidationItem 
            //       isValid={passwordValidations.hasSpecialChar}
            //       text="One special character (!@#$%^&*)"
            //     />
            //   </div>
            // </div>
          )}
        </div>
        
        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Re-enter your password"
              required
            />
            <button 
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className="mt-2 flex items-center gap-2">
              {doPasswordsMatch() ? (
                <>
                  <Check size={16} className="text-green-500" />
                  <span className="text-xs text-green-600">Passwords match</span>
                </>
              ) : (
                <>
                  <X size={16} className="text-red-500" />
                  <span className="text-xs text-red-600">Passwords do not match</span>
                </>
              )}
            </div>
          )}
        </div>
        
        <button 
          type="submit"
          className="w-full btn mt-2"
          disabled={loading || (formData.password && !isPasswordValid())}
        >
          {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <span className="text-gray-600">Already have an account? </span>
        <button 
          type="button"
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