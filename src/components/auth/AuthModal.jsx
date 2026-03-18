// components/auth/AuthModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { useAuth } from '../../contexts/AuthContext';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import RolePopup from './RolePopup';
import OTPVerificationPopup from './OTPVerificationPopup';
import ForgotPasswordPopup from './ForgotPasswordPopup';
import ResetPasswordPopup from './ResetPasswordPopup';

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
  
  const { verifyEmail, forgotPassword, resetPassword } = useAuth();

  if (!activeModal) return null;

  

  // Handle OTP verification
  // const handleVerify = async (email, otp) => {
  //   const result = await verifyEmail(email, otp);
  //   if (result.success) {
  //     handleModalSuccess();
  //   }
  //   return result;
  // };

  // In AuthModal.jsx
  const handleVerify = async (email, otp) => {
    console.log('Verifying:', { email, otp });
    const result = await verifyEmail(email, otp);
    console.log('Verification result:', result);
    if (result.success) {
      console.log('Verification successful, user:', result.user);
      handleModalSuccess();
    }
    return result;
  };

  // Handle forgot password request
  const handleForgotPassword = async (email) => {
    const result = await forgotPassword(email);
    if (result.success) {
      setPendingEmail(email);
      openModal('reset-password');
    }
    return result;
  };

  // Handle password reset
  const handleResetPassword = async (email, otp, newPassword) => {
    const result = await resetPassword(email, otp, newPassword);
    if (result.success) {
      handleModalSuccess();
      openModal('login'); // Redirect to login after successful reset
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
              openModal('role'); // Open role selection modal
            }}
            onSuccess={() => {
              handleModalSuccess();
              closeModal();
            }}
            onForgotPassword={(email) => {
              closeModal(); // Close login modal
              handleForgotPassword(email); // This will open forgot-password modal
            }}
          />
        );
      
      case 'role':
        return (
          <RolePopup
            onContinue={(role) => handleRoleSelect(role)}
            onSignInClick={() => {
              openModal('login'); // Switch to login modal
            }}
          />
        );
      
      case 'signup':
        return (
          <SignupPopup
            onClose={closeModal}
            onSignInClick={() => {
              openModal('login'); // Switch to login modal
            }}
            selectedRole={selectedRole}
            onSuccess={(email) => {
              // After successful signup, show verification modal
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
              openModal('login'); // Go back to login
            }}
            onResend={(email) => {
              // Resend OTP (reuse forgot password endpoint or separate resend endpoint)
              return handleForgotPassword(email);
            }}
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPasswordPopup
            onSubmit={handleForgotPassword}
            onClose={() => {
              openModal('login'); // Back to login
            }}
            onBackToLogin={() => {
              openModal('login'); // Back to login
            }}
          />
        );
      
      case 'reset-password':
        return (
          <ResetPasswordPopup
            email={pendingEmail}
            onSubmit={handleResetPassword}
            onClose={() => {
              openModal('login'); // Back to login
            }}
            onBackToLogin={() => {
              openModal('login'); // Back to login
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-999999 flex items-center justify-center p-4">
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