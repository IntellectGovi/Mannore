import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartOverlay from './components/CartOverlay';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';
import Account from './pages/Account';
import ForgotPassword from './pages/ForgotPassword';
import Breadcrumbs from './components/Breadcrumbs';
import { ShopProvider } from './context/ShopContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      <Header 
        isTransparent={isHome} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      <ToastContainer position="top-right" autoClose={3000} />
      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/account" element={<Account />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      
      <Footer />
    </>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <Layout />
      </Router>
    </ShopProvider>
  );
}

export default App;
