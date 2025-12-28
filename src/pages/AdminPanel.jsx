import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Package } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const { products, addProduct, isAdmin, logout } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Men',
    price: '',
    salePrice: '',
    image: '',
    description: '',
    inStock: true,
    sale: false
  });

  if (!isAdmin) {
    return (
      <div className="admin-container" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => navigate('/login')} className="auth-btn">Go to Login</button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.sale ? parseFloat(formData.price) + 50 : null,
      price: formData.sale && formData.salePrice ? parseFloat(formData.salePrice) : parseFloat(formData.price)
    };
    
    const success = await addProduct(newProduct);
    if (success) {
      setFormData({
        name: '',
        category: 'Men',
        price: '',
        salePrice: '',
        image: '',
        description: '',
        inStock: true,
        sale: false
      });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => { logout(); navigate('/login'); }} className="logout-btn">Logout</button>
      </div>

      <div className="admin-grid">
        {/* Add Product Form */}
        <div className="admin-card">
          <div className="card-header">
            <Plus size={20} />
            <h2>Add New Product</h2>
          </div>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Product Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Classic Silk Shirt" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>
              <div className="form-group">
                <label>Base Price (Rs.)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>In Stock</label>
                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>On Sale</label>
                <input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange} />
              </div>
            </div>
            {formData.sale && (
              <div className="form-group">
                <label>Sale Price (Rs.)</label>
                <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} required />
              </div>
            )}
            <div className="form-group">
              <label>Image URL</label>
              <input name="image" value={formData.image} onChange={handleChange} required placeholder="Unsplash URL preferred" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"></textarea>
            </div>
            <button type="submit" className="add-btn">Add Product</button>
          </form>
        </div>

        {/* Product List */}
        <div className="admin-card">
          <div className="card-header">
            <Package size={20} />
            <h2>Current Inventory ({products.length})</h2>
          </div>
          <div className="admin-product-list">
            {products.map(p => (
              <div key={p.id} className="admin-product-item">
                <img src={p.image_url || p.image} alt={p.name} />
                <div className="item-details">
                  <h4>{p.name}</h4>
                  <span>{p.category} | Rs.{p.price}</span>
                </div>
                <button className="del-btn"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
