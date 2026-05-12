// App.jsx
import AppRoutes from "./routes/AppRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModalProvider } from './contexts/AuthModalContext';
import { ShoppingProvider } from './contexts/ShoppingContext';
import AuthModal from "./components/auth/AuthModal";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useAuthModal } from "./contexts/AuthModalContext";

// Inner component to handle pending verification
const AppContent = () => {
  const { pendingVerification, isAuthenticated } = useAuth();
  const { openModal, setPendingEmail } = useAuthModal();

  useEffect(() => {
    // If there's a pending verification and user is not authenticated, show verification modal
    if (pendingVerification.isPending && !isAuthenticated) {
      setPendingEmail(pendingVerification.email);
      openModal('verify');
    }
  }, [pendingVerification, isAuthenticated, openModal, setPendingEmail]);

  return <AppRoutes />;
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <AppContent />,
  },
]);

function App() {
  return (
    <AuthModalProvider>
      <AuthProvider>
        <ShoppingProvider>
          <MarketplaceProvider>
            <AuthModal />
            <RouterProvider router={router} />
          </MarketplaceProvider>
        </ShoppingProvider>
      </AuthProvider>
    </AuthModalProvider>
  );
}

export default App;