import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./Component/Shared/CartContext.jsx";
import { WishlistProvider } from "./Component/Shared/WishlistContext.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <WishlistProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </WishlistProvider>
  </StrictMode>,
);



