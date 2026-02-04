import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Mock user database - will be replaced with real backend
const MOCK_USERS = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'buyer',
    phone: '+1234567890'
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
      const userData = { 
        ...foundUser, 
        token: 'mock-jwt-token-' + Date.now() 
      };
      
      // Remove password from stored user object
      const { password: _, ...userWithoutPassword } = userData;
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', userData.token);
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
    
    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
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

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    const updatedUser = { ...user, ...updates };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    return { success: true, user: updatedUser };
  };

  // Check authentication status
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile
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