import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { AuthProvider } from './contexts/AuthContext';
import { ShoppingProvider } from './contexts/ShoppingContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShoppingProvider>
          <MarketplaceProvider>
            <AppRoutes />
          </MarketplaceProvider>
        </ShoppingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;