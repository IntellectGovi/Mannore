import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Header = ({ isTransparent, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, wishlist, cart } = useShop();

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
      <Link to="/" className="logo">MANNORÉ</Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="icons">
        <Search size={20} />
        <Link to="/wishlist" className="icon-link">
          <Heart size={20} />
          {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </Link>
        <Link to={user ? "/account" : "/login"} className="icon-link">
            <User size={20} />
        </Link>
        <div onClick={onCartClick} style={{ cursor: 'pointer' }} className="icon-link">
          <ShoppingBag size={20} />
          {cart.length > 0 && <span className="badge">{cart.reduce((acc, item)=> acc + item.qty, 0)}</span>}
        </div>
        <Menu size={24} className="mobile-menu-icon" style={{ display: 'none' }} /> 
      </div>
    </header>
  );
};

export default Header;
