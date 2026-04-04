// contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useAuthModal } from './AuthModalContext';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "https://mosakapi-production.up.railway.app";

// Add token refresh configuration
const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (slightly less than token expiry)
let refreshInterval = null;

export const AuthProvider = ({ children }) => {
  const { openModal } = useAuthModal();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [pendingVerification, setPendingVerification] = useState({
    email: null,
    timestamp: null,
    isPending: false
  });
  
  // Use ref to track if token refresh is in progress
  const isRefreshing = useRef(false);
  // Store pending requests to avoid multiple refreshes
  const pendingRequests = useRef([]);

  // Check for pending verification from localStorage on mount
  useEffect(() => {
    const savedPending = localStorage.getItem('pendingVerification');
    if (savedPending) {
      const pendingData = JSON.parse(savedPending);
      const now = Date.now();
      const fifteenMinutes = 15 * 60 * 1000;
      
      if (now - pendingData.timestamp < fifteenMinutes) {
        setPendingVerification(pendingData);
      } else {
        localStorage.removeItem('pendingVerification');
      }
    }
  }, []);

  // Check for existing session on mount - THIS IS THE KEY PART
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Set up automatic token refresh when user is authenticated
  useEffect(() => {
    if (user && !loading) {
      startTokenRefresh();
    } else {
      stopTokenRefresh();
    }
    
    return () => {
      stopTokenRefresh();
    };
  }, [user, loading]);

  const startTokenRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    
    refreshInterval = setInterval(() => {
      refreshToken();
    }, TOKEN_REFRESH_INTERVAL);
  };

  const stopTokenRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  };

  // Queue failed requests to retry after token refresh
  const queueRequest = (request) => {
    return new Promise((resolve, reject) => {
      pendingRequests.current.push({ resolve, reject, request });
    });
  };

  const processQueue = (error = null) => {
    pendingRequests.current.forEach(({ resolve, reject, request }) => {
      if (error) {
        reject(error);
      } else {
        resolve(request());
      }
    });
    pendingRequests.current = [];
  };

  // Enhanced fetch with automatic token refresh
  const fetchWithAuth = useCallback(async (url, options = {}) => {
    const makeRequest = () => {
      return fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
    };

    if (!isRefreshing.current) {
      let response = await makeRequest();
      
      if (response.status === 401 && user) {
        isRefreshing.current = true;
        
        try {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            response = await makeRequest();
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          await logout();
        } finally {
          isRefreshing.current = false;
          processQueue();
        }
      }
      
      return response;
    }
    
    return queueRequest(makeRequest);
  }, [user]);

  // CRITICAL: This function checks the actual session via HttpOnly cookies
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      // console.log('Checking auth status with server...');
      
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include', // This sends the HttpOnly cookies automatically
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('Auth check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        // console.log('Auth check successful - user restored from session');
        
        // Set user from the server response
        const userData = data.user || data;
        setUser(userData);
        
        // Clear any pending verification if user is now verified
        if (pendingVerification.isPending) {
          localStorage.removeItem('pendingVerification');
          setPendingVerification({ email: null, timestamp: null, isPending: false });
        }
      } else {
        // If unauthorized, try to refresh token once
        if (response.status === 401) {
          console.log('Initial auth failed, trying token refresh...');
          const refreshSuccess = await refreshToken();
          
          if (refreshSuccess) {
            // If refresh successful, retry getting user data
            console.log('Token refresh successful, retrying auth check...');
            const retryResponse = await fetch(`${API_URL}/api/auth/me`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              const userData = retryData.user || retryData;
              setUser(userData);
              console.log('Auth check successful after refresh');
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  };

  // Login function
  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.message.includes('verify your email')) {
          const pendingData = {
            email,
            timestamp: Date.now(),
            isPending: true
          };
          localStorage.setItem('pendingVerification', JSON.stringify(pendingData));
          setPendingVerification(pendingData);
          throw new Error('EMAIL_NOT_VERIFIED');
        }
        throw new Error(data.message || 'Login failed');
      }

      // Clear pending verification
      localStorage.removeItem('pendingVerification');
      setPendingVerification({ email: null, timestamp: null, isPending: false });
      
      // Set user from response
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    setError(null);
    setLoading(true);

    try {
      const requestData = {
        full_name: userData.name || userData.fullName,
        username: userData.username,
        email: userData.email,
        phone_number: userData.phone,
        password: userData.password,
        role: (userData.role || 'BUYER').toUpperCase(),
      };

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save pending verification
      const pendingData = {
        email: userData.email,
        timestamp: Date.now(),
        isPending: true
      };
      localStorage.setItem('pendingVerification', JSON.stringify(pendingData));
      setPendingVerification(pendingData);

      return { 
        success: true, 
        message: data.message,
        requiresVerification: true,
        email: userData.email 
      };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Verify email with OTP
  const verifyEmail = async (email, otp) => {
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      localStorage.removeItem('pendingVerification');
      setPendingVerification({ email: null, timestamp: null, isPending: false });
      
      setUser(data.user);
      startTokenRefresh();
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async (email) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      const pendingData = {
        email,
        timestamp: Date.now(),
        isPending: true
      };
      localStorage.setItem('pendingVerification', JSON.stringify(pendingData));
      setPendingVerification(pendingData);

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      
      // Update user if returned in response
      if (data.user) {
        setUser(data.user);
      }
      
      return true;
    } catch (err) {
      console.error('Token refresh failed:', err);
      return false;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };


  // Change Password
  const changePassword = async (currentPassword, newPassword) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          current_password: currentPassword, 
          new_password: newPassword 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password change failed');
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email, otp, newPassword) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      
      // Clear all auth-related state
      setUser(null);
      localStorage.removeItem('pendingVerification');
      setPendingVerification({ email: null, timestamp: null, isPending: false });
      checkAuthStatus();
      
      // Stop token refresh
      stopTokenRefresh();
      
      // Clear any pending requests
      pendingRequests.current = [];
      isRefreshing.current = false;
      
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Clear pending verification
  const clearPendingVerification = () => {
    localStorage.removeItem('pendingVerification');
    setPendingVerification({ email: null, timestamp: null, isPending: false });
  };

  // Create profile (for authenticated users)
  const createProfile = async (profileData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetchWithAuth(`${API_URL}/api/users/profile`, {
        method: 'POST',
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile creation failed');
      }

      if (data.profile) {
        setUser(prev => ({ ...prev, ...data.profile }));
      }

      return { success: true, profile: data.profile };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.some(r => r.toLowerCase() === role.toLowerCase());
  };


  const addRole = async (businessData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/add-role`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add role');
      }

      // Update the user state with new role data
      setUser(data.user);
      openModal('become-seller');
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated: !!user,
      pendingVerification,
      fetchWithAuth,
      login,
      signup,
      verifyEmail,
      forgotPassword,
      changePassword,
      resetPassword,
      refreshToken,
      logout,
      createProfile,
      hasRole,
      checkAuthStatus,
      resendOtp,
      clearPendingVerification,
      addRole, 
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