import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartOverlay = ({ isOpen, onClose }) => {
  const { cart, updateQty, removeFromCart } = useShop();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (!isOpen) return null;

  return (
    <div className={`cart-overlay-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart ({cart.length})</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              Your cart is empty.
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={`${item.id}-${item.meta}`}>
                <img src={item.image} className="cart-item-img" alt={item.name} />
                <div className="item-details">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span className="item-name">{item.name}</span>
                    <button 
                      onClick={() => removeFromCart(item.id, item.meta)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <span className="item-meta">{item.meta}</span>
                  <div className="item-qty-price">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1, item.meta)}>
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1, item.meta)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="item-price">Rs.{item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Shipping and taxes calculated at checkout.
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartOverlay;
