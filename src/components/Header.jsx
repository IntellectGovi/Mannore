import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu } from 'lucide-react';

const Header = ({ isTransparent, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <Link to="/" className="logo">MANNORE</Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="icons">
        <Search size={20} />
        <Heart size={20} />
        <div onClick={onCartClick} style={{ cursor: 'pointer' }}>
          <ShoppingBag size={20} />
        </div>
        <Menu size={24} className="mobile-menu-icon" style={{ display: 'none' }} /> 
      </div>
    </header>
  );
};

export default Header;
