import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword } = useShop();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {!submitted ? (
          <>
            <h2>Reset Password</h2>
            <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="auth-btn">Send Reset Link</button>
            </form>
            <Link to="/login" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </Link>
          </>
        ) : (
          <div className="auth-success animate-fade-in">
            <CheckCircle size={64} color="#84b035" />
            <h2>Check your email</h2>
            <p>We've sent a password reset link to <strong>{email}</strong>.</p>
            <Link to="/login" className="auth-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
