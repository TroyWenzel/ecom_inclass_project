import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductSearch from "./components/ProductSearch/ProductSearch"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./components/Cart/Cart"
import Favorites from "./components/Favorites/Favorites"
import Checkout from "./components/Checkout/Checkout"
import Navbar from "./components/Navbar/Navbar"
import { CartProvider } from "./contexts/CartContext"
import { FavoritesProvider } from "./contexts/FavoritesContext" // Add this import
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider> {/* Add FavoritesProvider here */}
        <BrowserRouter>
          <Navbar />
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Flip}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/search" element={<ProductSearch />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider> {/* Close FavoritesProvider here */}
    </CartProvider>
  )
}

export default App