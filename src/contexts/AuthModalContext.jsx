// import React, { createContext, useState, useContext } from 'react';

// const AuthModalContext = createContext();

// export const useAuthModal = () => {
//   const context = useContext(AuthModalContext);
//   if (!context) {
//     throw new Error('useAuthModal must be used within an AuthModalProvider');
//   }
//   return context;
// };

// export const AuthModalProvider = ({ children }) => {
//   const [activeModal, setActiveModal] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [modalCallback, setModalCallback] = useState(null);

//   const openModal = (modalType, callback = null) => {
//     setActiveModal(modalType);
//     if (callback) setModalCallback(() => callback);
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//     setSelectedRole(null);
//     setModalCallback(null);
//   };

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//     setActiveModal('signup');
//   };

//   const handleModalSuccess = () => {
//     closeModal();
//     if (modalCallback) {
//       modalCallback();
//     }
//   };

//   return (
//     <AuthModalContext.Provider
//       value={{
//         activeModal,
//         setActiveModal,
//         selectedRole,
//         setSelectedRole,
//         openModal,
//         closeModal,
//         handleRoleSelect,
//         handleModalSuccess
//       }}
//     >
//       {children}
//     </AuthModalContext.Provider>
//   );
// };


// import React, { createContext, useState, useContext } from 'react';
// const AuthModalContext = createContext();

// export const useAuthModal = () => {
//   const context = useContext(AuthModalContext);
//   if (!context) {
//     throw new Error('useAuthModal must be used within an AuthModalProvider');
//   }
//   return context;
// };

// export const AuthModalProvider = ({ children }) => {
//   const [activeModal, setActiveModal] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [pendingEmail, setPendingEmail] = useState(null); // For OTP verification
//   const [modalCallback, setModalCallback] = useState(null);

//   const openModal = (modalType, callback = null, email = null) => {
//     setActiveModal(modalType);
//     if (email) setPendingEmail(email);
//     if (callback) setModalCallback(() => callback);
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//     setSelectedRole(null);
//     setPendingEmail(null);
//     setModalCallback(null);
//   };

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//     setActiveModal('signup');
//   };

//   const handleModalSuccess = () => {
//     closeModal();
//     if (modalCallback) {
//       modalCallback();
//     }
//   };

//   return (
//     <AuthModalContext.Provider
//       value={{
//         activeModal,
//         setActiveModal,
//         selectedRole,
//         setSelectedRole,
//         pendingEmail,
//         setPendingEmail,
//         openModal,
//         closeModal,
//         handleRoleSelect,
//         handleModalSuccess
//       }}
//     >
//       {children}
//     </AuthModalContext.Provider>
//   );
// };



// contexts/AuthModalContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export const AuthModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [modalCallback, setModalCallback] = useState(null);
  const [modalData, setModalData] = useState(null); // For passing data between modals

  const openModal = (modalType, callback = null, email = null, data = null) => {
    setActiveModal(modalType);
    if (email) setPendingEmail(email);
    if (callback) setModalCallback(() => callback);
    if (data) setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRole(null);
    setPendingEmail(null);
    setModalCallback(null);
    setModalData(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setActiveModal('signup');
  };

  const handleModalSuccess = () => {
    closeModal();
    if (modalCallback) {
      modalCallback();
    }
  };

  return (
    <AuthModalContext.Provider
      value={{
        activeModal,
        setActiveModal,
        selectedRole,
        setSelectedRole,
        pendingEmail,
        setPendingEmail,
        modalData,
        setModalData,
        openModal,
        closeModal,
        handleRoleSelect,
        handleModalSuccess
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};