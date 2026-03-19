// components/ProtectedRoute.jsx
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [localUser] = useState(() => localStorage.getItem('user'));

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check both context and localStorage
  if (!isAuthenticated && !localUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;