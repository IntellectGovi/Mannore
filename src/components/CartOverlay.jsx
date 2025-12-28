import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';

const CartOverlay = ({ isOpen, onClose }) => {
  // Hardcoded initial state to match the HTML preview
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Evening Silk Dress',
      meta: 'Black / M',
      price: 360,
      image: 'https://images.unsplash.com/photo-1542272454324-9927c7453013?auto=format&fit=crop&q=80&w=200',
      qty: 1
    },
    {
      id: 2,
      name: 'Acetate Sunglasses',
      meta: 'Tortoise / One Size',
      price: 145,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200',
      qty: 1
    }
  ]);

  const updateQty = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + change);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className={`cart-overlay-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart ({items.length})</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {items.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} className="cart-item-img" alt={item.name} />
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-meta">{item.meta}</span>
                <div className="item-qty-price">
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="item-price">${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p style={{ textAlign: 'center', color: '#666', fontSize: '0.8rem', marginBottom: '1rem' }}>
            Shipping and taxes calculated at checkout.
          </p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </aside>
    </div>
  );
};

export default CartOverlay;
