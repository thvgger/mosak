import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModalProvider } from './contexts/AuthModalContext';
import { ShoppingProvider } from './contexts/ShoppingContext';
// import GlobalAuthModal from "./components/common/GlobalAuthModal";
import AuthModal from "./components/auth/AuthModal";

function App() {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <AuthProvider>
          <ShoppingProvider>
            <MarketplaceProvider>
              <AuthModal />
              <AppRoutes />
            </MarketplaceProvider>
          </ShoppingProvider>
        </AuthProvider>
      </AuthModalProvider>
    </BrowserRouter>
  )
}

export default App;