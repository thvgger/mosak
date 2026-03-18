// import { useState } from "react";
// import { Eye, EyeClosed } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// const LoginPopup = ({ onClose, onCreateAccountClick, onSuccess }) => {
//   const { login, loading } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
  
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const result = await login(formData.email, formData.password);
    
//     if (result.success) {
//       onSuccess();
//       onClose();
//     } else {
//       setError(result.error);
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
//       <h2 className="text-xl font-semibold tracking-normal text-center mb-6">Sign in to your account</h2>
      
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
//           {error}
//         </div>
//       )}
      
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm mb-1">Email Address</label>
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
//           <label className="block text-sm mb-1">Password</label>
//           <div className="relative">
//             <input 
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               required
//             />
//             <button 
//               type="button"
//               className="absolute top-1/2 right-4 -translate-y-1/2 text-dark/40 cursor-pointer"
//               onClick={toggleShowPassword}
//             > 
//               {!showPassword ? <Eye /> : <EyeClosed />}
//             </button>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <label className="flex items-center">
//             <input 
//               type="checkbox" 
//               name="rememberMe"
//               checked={formData.rememberMe}
//               onChange={handleChange}
//               className="mr-2 rounded text-primary focus:ring-primary" 
//             />
//             <span className="text-sm text-gray-700">Remember me</span>
//           </label>
//           <button type="button" className="text-xs text-primary/80 hover:underline">
//             Forgot Password?
//           </button>
//         </div>
        
//         <button 
//           type="submit"
//           className="w-full btn mt-2"
//           disabled={loading}
//         >
//           {loading ? 'Logging in...' : 'LOGIN'}
//         </button>
//       </form>
      
//       <div className="text-center mt-6 flex flex-col gap-4 relative">
//         <div className="relative">
//           <hr className="border-gray-300" />
//           <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-dark/60 text-sm text-nowrap">
//             Don't have an account
//           </span>
//         </div>
//         <button 
//           className="btn btn-tertiary"
//           onClick={onCreateAccountClick}
//           disabled={loading}
//         >
//           CREATE ACCOUNT
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;



// components/auth/LoginPopup.jsx (fixed)
import { useState } from "react";
import { Eye, EyeClosed } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPopup = ({ onClose, onCreateAccountClick, onSuccess, onForgotPassword }) => {
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onSuccess(); // Call onSuccess which will trigger handleModalSuccess and close
    } else {
      setLocalError(result.error || 'Login failed');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-semibold tracking-normal text-center mb-6">Sign in to your account</h2>
      
      {(localError || error) && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
          {localError || error}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">Email Address</label>
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
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button 
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-dark/40 cursor-pointer"
              onClick={toggleShowPassword}
            > 
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2 rounded text-primary focus:ring-primary" 
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <button 
            type="button" 
            onClick={() => onForgotPassword(formData.email)}
            className="text-xs text-primary/80 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        
        <button 
          type="submit"
          className="w-full btn mt-2"
          disabled={loading}
        >
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
      </form>
      
      <div className="text-center mt-6 flex flex-col gap-4 relative">
        <div className="relative">
          <hr className="border-gray-300" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-dark/60 text-sm text-nowrap">
            Don't have an account
          </span>
        </div>
        <button 
          className="btn btn-tertiary"
          onClick={onCreateAccountClick}
          disabled={loading}
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;