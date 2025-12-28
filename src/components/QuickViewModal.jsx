import { X, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart, addToWishlist, isInWishlist } = useShop();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <aside className="quickview-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="quickview-header">
          <button className="close-btn" onClick={onClose} aria-label="Close quick view">
            <X size={24} />
          </button>
        </div>
        <div className="quickview-content">
          <div className="quickview-image-side">
            <img 
              src={product.image_url || product.image} 
              alt={product.name} 
              className="quickview-image" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }} 
            />
          </div>
          <div className="quickview-details-side">
            <h2 className="quickview-title">{product.name}</h2>
            <p className="quickview-description">{product.description}</p>
            <p className="quickview-price">
              {(product.original_price || product.originalPrice) && (
                <span className="old-price" style={{ textDecoration: 'line-through', color: '#999', marginRight: '1rem', fontSize: '1.5rem' }}>
                  ${product.original_price || product.originalPrice}
                </span>
              )}
              ${product.price}
            </p>
            <div className="quickview-actions">
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button 
                className="quickview-wishlist-btn" 
                onClick={() => addToWishlist(product)}
                title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={28} fill={isLiked ? "red" : "none"} color={isLiked ? "red" : "currentColor"} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default QuickViewModal;
