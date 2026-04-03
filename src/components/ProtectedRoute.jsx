import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuthModal } from '../contexts/AuthModalContext';
// import BecomeSellerPopup from '../components/auth/BecomeSellerPopup';

const ProtectedRoute = ({ children }) => {
  const { openModal } = useAuthModal();
  const { user, isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div className='h-screen flex flex-col gap-4 items-center justify-center text-sm'>
        <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
        <span className='text-gray-600'> Loading... </span>
      </div>
    );
  }

  // Not logged in → redirect
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but NOT a seller → show popup
  // if (!hasRole('seller')) {
  //   return (
  //     <>
  //       <Navigate to="/" replace />;
  //       {openModal('become-seller')}
  //     </>
  //   );
  //   // return null; 
  // }


  return children;
};

export default ProtectedRoute;
