import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, User, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import logo from '../assets/logo.png';
const Header = ({ isTransparent, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, wishlist, cart } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine header class based on props and scroll state
  let headerClass = '';
  if (isTransparent && !isScrolled) {
    headerClass = 'transparent';
  } else {
    headerClass = 'fixed-header';
  }

  return (
    <header className={headerClass}>
      <Link to="/" className="logo">Mannore</Link>
      <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

        <div className="mobile-nav-icons">
          {/* <Link to="/shop" className="mobile-icon-link" onClick={() => setIsMobileMenuOpen(false)}>
            <Search size={20} />
            <span>Search</span>
          </Link> */}
          <Link to="/wishlist" className="mobile-icon-link" onClick={() => setIsMobileMenuOpen(false)}>
            <Heart size={20} />
            <span>Wishlist ({wishlist.length})</span>
          </Link>
          <Link to={user ? "/account" : "/login"} className="mobile-icon-link" onClick={() => setIsMobileMenuOpen(false)}>
            <User size={20} />
            <span>Account</span>
          </Link>
          <div className="mobile-icon-link" onClick={() => { onCartClick(); setIsMobileMenuOpen(false); }}>
            <ShoppingBag size={20} />
            <span>Cart ({cart.reduce((acc, item) => acc + item.qty, 0)})</span>
          </div>
        </div>
      </nav>
      <div className="icons">
        {/* <Search size={20} /> */}
        <Link to="/wishlist" className="icon-link">
          <Heart size={20} />
          {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </Link>
        <Link to={user ? "/account" : "/login"} className="icon-link">
          <User size={20} />
        </Link>
        <div onClick={onCartClick} style={{ cursor: 'pointer' }} className="icon-link">
          <ShoppingBag size={20} />
          {cart.length > 0 && <span className="badge">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>}
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
