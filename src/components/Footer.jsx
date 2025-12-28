import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo" style={{ marginBottom: '1rem' }}>MANNORÉ</div>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Redefining modern luxury.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h5>Shop</h5>
            <ul>
              <li><Link to="/shop">New Arrivals</Link></li>
              <li><Link to="/shop">Men</Link></li>
              <li><Link to="/shop">Women</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>About</h5>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><a href="#">Careers</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; 2025 MANNORÉ Fashion. All rights reserved.
      </div>
      <div className="copyright">
        &copy; Created by <a href="">Govind ⚡❤️</a>
      </div>
    </footer>
  );
};

export default Footer;
