import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuthModal } from '../contexts/AuthModalContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { openModal } = useAuthModal();
  const { user, isAuthenticated, loading, hasRole, hasCompleteSellerProfile } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && requiredRole) {
      if (requiredRole === 'seller') {
        if (!hasRole('seller') || !hasCompleteSellerProfile()) {
          openModal('become-seller');
        }
      } else if (requiredRole === 'buyer' && !hasRole('buyer')) {
        openModal('become-buyer');
      }
    }
  }, [loading, isAuthenticated, requiredRole, hasRole, hasCompleteSellerProfile, openModal]);

  if (loading) {
    return (
      <div className='h-screen flex flex-col gap-4 items-center justify-center text-sm'>
        <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        <span className='text-gray-600'>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Seller-only routes
  if (requiredRole === 'seller' && (!hasRole('seller') || !hasCompleteSellerProfile())) {
    return <Navigate to="/" replace />;
  }

  // Buyer-only routes
  if (requiredRole === 'buyer' && !hasRole('buyer')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;