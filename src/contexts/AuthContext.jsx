// // contexts/AuthContext.jsx (updated)
import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "https://mosak-api.onrender.com";

// Mock user database with multiple roles
const MOCK_USERS = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'buyer', 
    roles: ['buyer', 'seller', 'freelancer'], 
    primaryRole: 'buyer',
    phone: '+1234567890',
    verified: true,
    avatar: null
  },
  {
    id: 2,
    email: 'sam@example.com',
    password: 'password123',
    name: 'Sam Doe',
    role: 'seller',
    roles: ['seller', 'buyer', 'freelancer'],
    primaryRole: 'seller',
    phone: '+1234567890',
    verified: true,
    avatar: null
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user in mock database
    const foundUser = MOCK_USERS.find(
      user => user.email === email && user.password === password
    );
    
    if (foundUser) {
      // Ensure roles array exists (for backward compatibility)
      const userWithRoles = {
        ...foundUser,
        roles: foundUser.roles || [foundUser.role], // Fallback to single role if roles doesn't exist
        token: 'mock-jwt-token-' + Date.now()
      };
      
      // Remove password from stored user object
      const { password: _, ...userWithoutPassword } = userWithRoles;
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', userWithRoles.token);
      setUser(userWithoutPassword);
      
      setLoading(false);
      return { success: true, user: userWithoutPassword };
    } else {
      setLoading(false);
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }
  };

  // Mock signup function
  const signup = async (userData) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === userData.email);
    
    if (userExists) {
      setLoading(false);
      return { 
        success: false, 
        error: 'User already exists' 
      };
    }
    
    // Create new user with roles array
    const newUser = {
      id: Date.now(),
      ...userData,
      roles: userData.roles || [userData.role || 'buyer'], // Default to buyer if no role specified
      createdAt: new Date().toISOString()
    };
    
    const userDataWithToken = { 
      ...newUser, 
      token: 'mock-jwt-token-' + Date.now() 
    };
    
    // Remove password from stored user object
    const { password: _, ...userWithoutPassword } = userDataWithToken;
    
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('token', userDataWithToken.token);
    setUser(userWithoutPassword);
    
    setLoading(false);
    return { success: true, user: userWithoutPassword };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return user?.roles?.includes(role) || user?.role === role || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


// contexts/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// const API_URL = import.meta.env.VITE_API_URL || "https://mosak-api.onrender.com";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Check for existing session on mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   // Check if user is authenticated by fetching current user
//   const checkAuthStatus = async () => {
//     try {
//       setLoading(true);
//       // Try to get current user info - cookies are sent automatically
//       const response = await fetch(`${API_URL}/api/users/me`, {
//         method: 'GET',
//         credentials: 'include', // Important: This sends cookies
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       } else {
//         // Not authenticated or session expired
//         setUser(null);
//       }
//     } catch (err) {
//       console.error('Auth check failed:', err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login function
//   const login = async (email, password) => {
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/auth/login`, {
//         method: 'POST',
//         credentials: 'include', // Important: This receives and stores cookies
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       // Set user from response
//       setUser(data.user);
//       return { success: true, user: data.user };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Signup function
//   const signup = async (userData) => {
//     setError(null);
//     setLoading(true);

//     try {
//       // Format data for backend
//       const requestData = {
//         full_name: userData.name || userData.fullName,
//         email: userData.email,
//         phone_number: userData.phone,
//         password: userData.password,
//         role: (userData.role || 'BUYER').toUpperCase(),
//       };

//       const response = await fetch(`${API_URL}/api/auth/register`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       // Don't set user here - email needs verification first
//       return { 
//         success: true, 
//         message: data.message,
//         requiresVerification: true,
//         email: userData.email 
//       };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify email with OTP
//   const verifyEmail = async (email, otp) => {
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/auth/verify-email`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Verification failed');
//       }

//       // Set user after successful verification
//       setUser(data.user);
//       return { success: true, user: data.user };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Forgot password
//   const forgotPassword = async (email) => {
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Request failed');
//       }

//       return { success: true, message: data.message };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset password
//   const resetPassword = async (email, otp, newPassword) => {
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/auth/reset-password`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, otp, new_password: newPassword }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Password reset failed');
//       }

//       return { success: true, message: data.message };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh token (optional - can be called manually if needed)
//   const refreshToken = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Token refresh failed');
//       }

//       return { success: true };
//     } catch (err) {
//       console.error('Token refresh failed:', err);
//       return { success: false };
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     setLoading(true);
    
//     try {
//       // Optional: Call logout endpoint if available
//       // await fetch(`${API_URL}/api/auth/logout`, {
//       //   method: 'POST',
//       //   credentials: 'include',
//       // });
      
//       // Clear user state
//       setUser(null);
      
//       // Note: You might want to clear cookies, but HttpOnly cookies
//       // can't be cleared from JavaScript. The backend should handle this.
      
//       return { success: true };
//     } catch (err) {
//       console.error('Logout error:', err);
//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create profile (for authenticated users)
//   const createProfile = async (profileData) => {
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/users/profile`, {
//         method: 'POST',
//         credentials: 'include', // Cookies are sent automatically
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profileData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Profile creation failed');
//       }

//       // Update user with profile info
//       if (data.profile) {
//         setUser(prev => ({ ...prev, ...data.profile }));
//       }

//       return { success: true, profile: data.profile };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if user has a specific role
//   const hasRole = (role) => {
//     return user?.role?.toLowerCase() === role.toLowerCase() || false;
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       error,
//       isAuthenticated: !!user,
//       login,
//       signup,
//       verifyEmail,
//       forgotPassword,
//       resetPassword,
//       refreshToken,
//       logout,
//       createProfile,
//       hasRole,
//       checkAuthStatus,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };