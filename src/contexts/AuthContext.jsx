// contexts/AuthContext.jsx (updated)
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

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