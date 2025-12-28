import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAdmin } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      if (email === 'govind.upadhayay19@gmail.com') {
        toast.info('Logged in as Admin');
        navigate('/admin');
      } else {
        toast.success(`Welcome back!`);
        navigate('/');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              // type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-options">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
