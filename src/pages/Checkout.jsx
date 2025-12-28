import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, placeOrder } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
    
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await placeOrder({
      total: total,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}, ${formData.country}`
    });
    
    if (success) {
      navigate('/');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="cta-btn">Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" required onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input type="text" name="address" required onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>ZIP / Postal Code</label>
                <input type="text" name="zipCode" required onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" name="country" required onChange={handleInputChange} />
            </div>
            
            <div className="payment-method">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className="radio-label">
                  <input type="radio" name="payment" defaultChecked /> Credit Card
                </label>
                <label className="radio-label">
                  <input type="radio" name="payment" /> PayPal
                </label>
              </div>
            </div>

            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-card">
            <div className="summary-items">
              {cart.map(item => (
                <div className="summary-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <span className="name">{item.name}</span>
                    <span className="qty">Qty: {item.qty}</span>
                  </div>
                  <span className="price">Rs.{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `Rs.${shipping.toFixed(2)}`}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
