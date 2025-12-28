import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuickViewModal from '../components/QuickViewModal';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{wishlist.length} Items</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/shop" className="continue-shopping">Browse Shop</Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                {product.sale && (
                  <span className="sale-badge">
                    {product.discount || 'SALE'}
                  </span>
                )}
                <img src={product.image} className="product-image" alt={product.name} />
                <div className="product-actions">
                  <button 
                    className="action-btn cart-btn"
                    onClick={() => addToCart(product)}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={20} />
                  </button>
                  <button 
                    className="action-btn quickview-btn"
                    onClick={() => setQuickViewProduct(product)}
                    title="Quick View"
                  >
                    <Search size={20} />
                  </button>
                  <button 
                    className="action-btn wishlist-btn"
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from Wishlist"
                  >
                    <Heart size={20} fill="red" color="red" />
                  </button>
                </div>
              </div>
              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">
                  {product.originalPrice && <span className="old-price">Rs.{product.originalPrice}</span>}
                  Rs.{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Wishlist;
