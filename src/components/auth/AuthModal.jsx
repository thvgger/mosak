// components/auth/AuthModal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { useAuth } from '../../contexts/AuthContext';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import RolePopup from './RolePopup';
import OTPVerificationPopup from './OTPVerificationPopup';
import ForgotPasswordPopup from './ForgotPasswordPopup';
import ResetPasswordPopup from './ResetPasswordPopup';
// import BecomeSellerPopup from './BecomeSellerPopup';
import BecomeBuyerPopup from './BecomeBuyerPopup.jsx';
import MultiStepBecomeSeller from './MultiStepBecomeSeller';

const AuthModal = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedRole, 
    handleRoleSelect,
    pendingEmail,
    setPendingEmail,
    openModal,
    handleModalSuccess 
  } = useAuthModal();
  
  const { 
    verifyEmail, 
    forgotPassword, 
    resetPassword, 
    resendOtp, 
    pendingVerification, 
    clearPendingVerification, 
    // addSellerRole,
    becomeSeller,
    becomeBuyer,
    loading,
    user
  } = useAuth();

  // Check for pending verification on mount
  useEffect(() => {
    if (pendingVerification.isPending && !activeModal) {
      setPendingEmail(pendingVerification.email);
      openModal('verify');
    }
  }, [pendingVerification, activeModal, setPendingEmail, openModal]);

  if (!activeModal) return null;

  const handleVerify = async (email, otp) => {
    console.log('Verifying:', { email, otp });
    const result = await verifyEmail(email, otp);
    console.log('Verification result:', result);
    if (result.success) {
      console.log('Verification successful, user:', result.user);
      handleModalSuccess();
      closeModal();
    }
    return result;
  };

  const handleForgotPassword = async (email) => {
    const result = await forgotPassword(email);
    if (result.success) {
      setPendingEmail(email);
      openModal('reset-password');
    }
    return result;
  };

  const handleResetPassword = async (email, otp, newPassword) => {
    const result = await resetPassword(email, otp, newPassword);
    if (result.success) {
      handleModalSuccess();
      openModal('login');
    }
    return result;
  };

  const handleResendOtp = async (email) => {
    const result = await resendOtp(email);
    return result;
  };

  const handleStartOver = () => {
    clearPendingVerification();
    openModal('role');
  };


  // Handler for become seller
  const handleBecomeSeller = async (businessData) => {
    const result = await becomeSeller(businessData);
    if (result.success) {
      handleModalSuccess();
    }
    return result;
  };

  // Handler for become buyer
  const handleBecomeBuyer = async () => {
    const result = await becomeBuyer();
    if (result.success) {
      handleModalSuccess();
    }
    return result;
  };


  const renderModalContent = () => {
    switch (activeModal) {
      case 'login':
        return (
          <LoginPopup
            onClose={closeModal}
            onCreateAccountClick={() => {
              openModal('role');
            }}
            onSuccess={() => {
              handleModalSuccess();
              closeModal();
            }}
            onForgotPassword={(email) => {
              closeModal();
              handleForgotPassword(email);
            }}
          />
        );
      
      case 'role':
        return (
          <RolePopup
            onContinue={(role) => handleRoleSelect(role)}
            onSignInClick={() => {
              openModal('login');
            }}
          />
        );
      
      case 'signup':
        return (
          <SignupPopup
            onClose={closeModal}
            onSignInClick={() => {
              openModal('login');
            }}
            selectedRole={selectedRole}
            onSuccess={(email) => {
              setPendingEmail(email);
              openModal('verify');
            }}
          />
        );
      
      case 'verify':
        return (
          <OTPVerificationPopup
            email={pendingEmail}
            onVerify={handleVerify}
            onClose={() => {
              clearPendingVerification();
              openModal('login');
            }}
            onResend={handleResendOtp}
            onStartOver={handleStartOver}
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPasswordPopup
            onSubmit={handleForgotPassword}
            onClose={() => {
              openModal('login');
            }}
            onBackToLogin={() => {
              openModal('login');
            }}
          />
        );
      
      case 'reset-password':
        return (
          <ResetPasswordPopup
            email={pendingEmail}
            onSubmit={handleResetPassword}
            onClose={() => {
              openModal('login');
            }}
            onBackToLogin={() => {
              openModal('login');
            }}
          />
        );
        
      // Add the become-seller case
      // case 'become-seller':
      //   return (
      //     <BecomeSellerPopup
      //       onClose={closeModal}
      //       onSubmit={handleBecomeSeller}
      //       loading={loading}
      //       user={user}
      //     />
      //   );
        
      // Add the become-buyer case
      case 'become-buyer':
        return (
          <BecomeBuyerPopup
            onClose={closeModal}
            onSubmit={handleBecomeSeller}
            loading={loading}
            user={user}
          />
        );

      // Update the case in renderModalContent
      // Test MultiStep Format
      case 'become-seller':
        return (
          <MultiStepBecomeSeller
            onClose={closeModal}
            onSubmit={handleBecomeSeller}
            loading={loading}
            user={user}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70  z-999999 flex items-center justify-center p-4">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={closeModal}
          className="absolute top-2 right-0 text-white hover:text-gray-200"
        >
          <X size={24} />
        </button>
        {renderModalContent()}
      </div>
    </div>
  );
};

export default AuthModal;