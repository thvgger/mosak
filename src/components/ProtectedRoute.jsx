import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuthModal } from '../contexts/AuthModalContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { openModal } = useAuthModal();
  const { user, isAuthenticated, loading, hasRole } = useAuth();

  useEffect(() => {
    // If logged in but not a seller → show popup
    if (isAuthenticated && user && !hasRole('seller')) {
      openModal('become-seller');
    }
  }, [isAuthenticated, user, hasRole, openModal]);

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

  // Logged in but not a seller → redirect
  if (!hasRole('seller')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;



// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useAuthModal } from '../contexts/AuthModalContext';
// // import BecomeSellerPopup from '../components/auth/BecomeSellerPopup';

// const ProtectedRoute = ({ children }) => {
//   const { openModal } = useAuthModal();
//   const { user, isAuthenticated, loading, hasRole } = useAuth();

//   if (loading) {
//     return (
//       <div className='h-screen flex flex-col gap-4 items-center justify-center text-sm'>
//         <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
//         <span className='text-gray-600'> Loading... </span>
//       </div>
//     );
//   }

//   // Not logged in → redirect
//   if (!isAuthenticated || !user) {
//     return <Navigate to="/" replace />;
//   }

//   // If Logged in, but not a Seller, redirect and show seller popup
//   if (isAuthenticated && !hasRole('seller')) {
//     return(
//       <>
//         <Navigate to="/" replace />;
//         {openModal('become-seller')}
//       </>
//     )
//   }

//   // Logged in but NOT a seller → show popup
//   if (!hasRole('seller')) {
//     return (
//       <>
//         <Navigate to="/" replace />;
//         {openModal('become-seller')}
//       </>
//     );
//   }


//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useAuthModal } from '../contexts/AuthModalContext';
// import { useEffect } from 'react';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { openModal } = useAuthModal();
//   const { 
//     user, 
//     isAuthenticated, 
//     loading, 
//     hasRole, 
//     hasCompleteSellerProfile 
//   } = useAuth();

//   useEffect(() => {
//     if (!loading && isAuthenticated && requiredRole) {
//       if (requiredRole === 'seller') {
//         if (!hasRole('seller')) {
//           openModal('become-seller');
//         } else if (!hasCompleteSellerProfile()) {
//           // Has role but incomplete profile - force completion
//           openModal('become-seller');
//         }
//       } else if (requiredRole === 'buyer' && !hasRole('buyer')) {
//         openModal('become-buyer');
//       }
//     }
//   }, [loading, isAuthenticated, requiredRole, hasRole, hasCompleteSellerProfile, openModal]);

//   if (loading) {
//     return (
//       <div className='h-screen flex flex-col gap-4 items-center justify-center text-sm'>
//         <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
//         <span className='text-gray-600'>Loading...</span>
//       </div>
//     );
//   }

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/" replace />;
//   }

//   if (requiredRole === 'seller' && (!hasRole('seller') || !hasCompleteSellerProfile())) {
//     return (
//       <div className='h-screen flex flex-col gap-4 items-center justify-center text-sm'>
//         <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
//         <span className='text-gray-600'>Setting up your seller account...</span>
//       </div>
//     );
//   }

//   if (requiredRole === 'buyer' && !hasRole('buyer')) {
//     return (
//       <div className='h-screen flex flex-col gap-4 items-center justify-center text-sm'>
//         <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></span>
//         <span className='text-gray-600'>Setting up your buyer account...</span>
//       </div>
//     );
//   }

//   return children;
// };

// export default ProtectedRoute;