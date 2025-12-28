import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const Account = () => {
  const { user, logout, updateProfile, updatePassword } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const success = await updateProfile(profileData.name, profileData.email);
    if (success) {
      toast.success('Profile updated successfully!');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    const success = await updatePassword(passwordData.newPassword);
    if (success) {
      toast.success('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Welcome back, {user.name}</p>
      </div>

      <div className="account-container">
        {/* Sidebar Navigation */}
        <aside className="account-sidebar">
          <button 
            className={`account-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile Details</span>
            <ChevronRight size={16} className="chevron" />
          </button>
          <button 
            className={`account-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18} />
            <span>Security</span>
            <ChevronRight size={16} className="chevron" />
          </button>
          <button 
            className={`account-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={18} />
            <span>Order History</span>
            <ChevronRight size={16} className="chevron" />
          </button>
          
          {user?.role === 'admin' && (
            <button className="account-nav-item admin-link" onClick={() => navigate('/admin')}>
              <Lock size={18} />
              <span>Admin Dashboard</span>
              <ChevronRight size={16} className="chevron" />
            </button>
          )}

          <button className="account-nav-item logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="account-content">
          {activeTab === 'profile' && (
            <div className="account-section animate-fade-in">
              <h2>Profile Information</h2>
              <form onSubmit={handleProfileUpdate} className="account-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="save-btn">Update Profile</button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="account-section animate-fade-in">
              <h2>Security Settings</h2>
              <form onSubmit={handlePasswordUpdate} className="account-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="save-btn">Update Password</button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="account-section animate-fade-in">
              <h2>Order History</h2>
              <div className="empty-orders">
                <ShoppingBag size={48} />
                <p>You haven't placed any orders yet.</p>
                <button onClick={() => navigate('/shop')} className="browse-btn">Start Shopping</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
