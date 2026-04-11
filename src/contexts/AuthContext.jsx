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
  const [user, setUser] = useState({
    /* 
    |--------------------------------------------------------------------------
    | TEMPORARY BYPASS - DELETE THIS MOCK USER WHEN AUTH IS READY
    |--------------------------------------------------------------------------
    | This hardcoded user allows you to access the Seller Dashboard without 
    | logging in. To restore real auth, set this back to 'useState(null)'.
    */
    id: "mock-seller-id",
    full_name: "Demo Seller",
    email: "seller@example.com",
    roles: ["SELLER", "BUYER"],
    kyc_status: "VERIFIED",
    business_profile: {
      business_name: "Demo Store",
      business_address: "123 Mock Street",
      business_description: "A demo store for testing"
    }
    // END OF TEMPORARY BYPASS
  });
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
    /* 
    |--------------------------------------------------------------------------
    | TEMPORARY BYPASS - DELETE THIS WHEN AUTH IS READY
    |--------------------------------------------------------------------------
    | This bypasses the real session check. To restore real auth, uncomment 
    | the code below and delete the premature 'return'.
    */
    setLoading(true);
    setTimeout(() => setLoading(false), 500); // Simulate network request
    return;
    // END OF TEMPORARY BYPASS

    // try {
    //   const response = await fetch(`${API_URL}/api/auth/me`, {
    //     method: 'GET',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setUser(data.user || data);
    //   } else {
    //     setUser(null);
    //   }
    // } catch (err) {
    //   console.error('Auth check failed:', err);
    //   setUser(null);
    // } finally {
    //   setLoading(false);
    // }
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

  // Add this new function to force refresh user data
  const refreshUserData = async () => {
    try {
      console.log('Refreshing user data...');
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user || data;
        console.log('User data refreshed:', userData);
        console.log('Business profile:', userData.business_profile);
        setUser(userData);
        return userData;
      } else {
        console.error('Failed to refresh user data:', response.status);
      }
    } catch (err) {
      console.error('Failed to refresh user data:', err);
    }
    return null;
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


  // Replace addSellerRole with this comprehensive function
  // Add these functions to your AuthContext

  const addRole = async (roleData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/add-role`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add role');
      }

      // Update the user state with new role data
      setUser(prevUser => ({
        ...prevUser,
        roles: data.roles || prevUser?.roles
      }));
      
      return { success: true, roles: data.roles };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const createBusinessProfile = async (profileData) => {
    setError(null);
    setLoading(true);

    try {
      console.log('Sending profile data:', profileData);
      
      const response = await fetch(`${API_URL}/api/users/profile?type=business`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      console.log('Profile creation response:', { status: response.status, data });

      if (!response.ok) {
        // If profile already exists, try to update it instead
        if (response.status === 400 && data.message?.includes('already exists')) {
          console.log('Profile already exists, attempting to update...');
          // Try PUT request for update if your API supports it
          const updateResponse = await fetch(`${API_URL}/api/users/profile?type=business`, {
            method: 'PUT', // or PATCH, depending on your API
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });
          
          if (updateResponse.ok) {
            const updateData = await updateResponse.json();
            await refreshUserData();
            return { success: true, profile: updateData.profile };
          }
        }
        throw new Error(data.message || 'Failed to create business profile');
      }

      // Force refresh user data to get the new profile
      await refreshUserData();
      
      return { success: true, profile: data.profile };
    } catch (err) {
      console.error('Create business profile error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Complete seller onboarding - handles both steps atomically
  // In AuthContext.jsx, update the becomeSeller function:
  const becomeSeller = async (businessData) => {
    setError(null);
    
    try {
      let hasSellerRole = false;
      
      // Step 1: Check if user already has SELLER role
      if (user?.roles?.includes('SELLER')) {
        hasSellerRole = true;
        console.log('User already has SELLER role, skipping role addition');
      } else {
        // Try to add SELLER role
        const roleResult = await addRole({ role: 'SELLER' });
        
        if (!roleResult.success) {
          // If error is not "already assigned", throw it
          if (!roleResult.error?.includes('already assigned') && !roleResult.error?.includes('already has this role')) {
            throw new Error(roleResult.error);
          }
          // If role already exists, that's fine
          hasSellerRole = true;
        } else {
          hasSellerRole = true;
        }
      }
      
      // Step 2: Check if business profile already exists
      const existingProfile = user?.business_profile;
      if (existingProfile?.business_name && existingProfile?.business_address && existingProfile?.business_description) {
        console.log('Business profile already exists, no need to create');
        return { success: true, user, message: 'Profile already exists' };
      }
      
      // Step 3: Create or update business profile
      console.log('Creating business profile with data:', businessData);
      const profileResult = await createBusinessProfile({
        business_name: businessData.business_name,
        business_address: businessData.business_address,
        business_description: businessData.business_description,
      });
      
      if (!profileResult.success) {
        throw new Error(profileResult.error);
      }
      
      // Step 4: Force refresh user data
      await refreshUserData();
      
      return { success: true, user: profileResult.user };
    } catch (err) {
      console.error('Become seller error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // For buyer role (might need address and date_of_birth)
  const becomeBuyer = async (buyerData = null) => {
    setError(null);
    setLoading(true);

    try {
      // Step 1: Add BUYER role
      const roleResult = await addRole({ role: 'BUYER' });
      
      if (!roleResult.success && !roleResult.error?.includes('already assigned')) {
        throw new Error(roleResult.error);
      }
      
      // Step 2: If buyer data provided, create buyer profile
      if (buyerData && (buyerData.address || buyerData.date_of_birth)) {
        const profileResponse = await fetch(`${API_URL}/api/users/profile?type=buyer`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: buyerData.address,
            date_of_birth: buyerData.date_of_birth
          }),
        });
        
        if (!profileResponse.ok) {
          const profileData = await profileResponse.json();
          throw new Error(profileData.message || 'Failed to create buyer profile');
        }
      }
      
      await checkAuthStatus();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if seller has complete profile
  const hasCompleteSellerProfile = () => {
    if (!user) {
      console.log('No user object');
      return false;
    }
    
    const hasSellerRole = user.roles?.includes('SELLER');
    console.log('Has seller role:', hasSellerRole);
    
    if (!hasSellerRole) {
      console.log('User does not have SELLER role');
      return false;
    }
    
    const businessProfile = user.business_profile;
    console.log('Business profile object:', businessProfile);
    
    if (!businessProfile) {
      console.log('No business_profile found in user object');
      return false;
    }
    
    const { business_name, business_address, business_description } = businessProfile;
    const isComplete = !!(business_name && business_address && business_description);
    
    console.log('Profile fields:', { business_name, business_address, business_description });
    console.log('Is profile complete?', isComplete);
    
    return isComplete;
  };

  // Get seller profile data if it exists
  const getSellerProfile = () => {
    return user?.business_profile || user?.seller_profile || null;
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
      becomeBuyer, 
      becomeSeller, 
      hasCompleteSellerProfile,
      addRole,
      createBusinessProfile,
      getSellerProfile,
      refreshUserData,
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