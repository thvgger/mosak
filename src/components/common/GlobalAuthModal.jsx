import React from 'react';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { X } from 'lucide-react';
import RolePopup from '../header/RolePopup';
import LoginPopup from '../header/LoginPopup';
import SignupPopup from '../header/SignupPopup';

const GlobalAuthModal = () => {
  const { 
    activeModal, 
    setActiveModal,
    selectedRole, 
    setSelectedRole,
    closeModal, 
    handleRoleSelect,
    handleModalSuccess 
  } = useAuthModal();

  if (!activeModal) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-999999 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <button 
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10000"
        onClick={closeModal}
      >
        <X size={24} />
      </button>

      {/* Role Selection Popup */}
      {activeModal === "role" && (
        <RolePopup
          onClose={closeModal}
          onContinue={handleRoleSelect}
          onSignInClick={() => setActiveModal("login")}
        />
      )}

      {/* Sign Up Form Popup */}
      {activeModal === "signup" && (
        <SignupPopup
          onClose={closeModal}
          onSignInClick={() => setActiveModal("login")}
          selectedRole={selectedRole}
          onSuccess={handleModalSuccess}
        />
      )}

      {/* Login Form Popup */}
      {activeModal === "login" && (
        <LoginPopup
          onClose={closeModal}
          onCreateAccountClick={() => {
            setSelectedRole(null);
            setActiveModal("role");
          }}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};

export default GlobalAuthModal;