import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import QuickViewModal from '../components/QuickViewModal';
import { ShoppingBag, Search, Heart } from 'lucide-react';

const Shop = () => {
  const {
    filteredProducts,
    addToCart,
    addToWishlist,
    isInWishlist,
    filters,
    setFilters,
    loading,
    products,
  } = useShop();

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Handlers for filter inputs
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const categories = checked
        ? [...prev.categories, value]
        : prev.categories.filter((c) => c !== value);
      return { ...prev, categories };
    });
  };

  const handlePriceChange = (e) => {
    const max = Number(e.target.value);
    setFilters((prev) => ({ ...prev, priceRange: [0, max] }));
  };

  const handleStockChange = (e) => {
    const { checked } = e.target;
    setFilters((prev) => ({ ...prev, inStock: checked }));
  };

  const handleSaleChange = (e) => {
    const { checked } = e.target;
    setFilters((prev) => ({ ...prev, onSale: checked }));
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  return (
    <div className="shop-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="filter-group">
          <span className="filter-title">Categories</span>
          <div className="checkbox-group">
            {['Men', 'Women', 'Accessories', 'Beauty'].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  onChange={handleCategoryChange}
                  checked={filters.categories.includes(cat)}
                />{' '}
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-title">Filter by Price</span>
          <input
            type="range"
            min="0"
            max="1000"
            className="price-range"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
            <span>$0</span>
            <span>Up to ${filters.priceRange[1]}</span>
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-title">Stock Status</span>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" onChange={handleStockChange} checked={filters.inStock} /> In Stock
            </label>
            <label>
              <input type="checkbox" onChange={handleSaleChange} checked={filters.onSale} /> On Sale
            </label>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="main-content">
        {loading ? (
          <div className="shop-loader">
            <div className="spinner"></div>
            <p>Refining Selection...</p>
          </div>
        ) : (
          <>
            <div className="toolbar">
              <span className="result-count">
                Showing {filteredProducts.length} results
              </span>
              <select className="sort-select" value={filters.sortBy} onChange={handleSortChange}>
                <option value="default">Default Sorting</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="latest">Sort by Latest</option>
                <option value="price-low">Sort by Price: Low to High</option>
                <option value="price-high">Sort by Price: High to Low</option>
              </select>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image-wrapper">
                    {(product.is_sale || product.sale) && (
                      <span className="sale-badge">
                        {product.discount || 'SALE'}
                      </span>
                    )}
                    <img
                      src={product.image_url || product.image}
                      className="product-image"
                      alt={product.name}
                      onClick={() => setQuickViewProduct(product)}
                    // onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
                    />
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
                        onClick={() => addToWishlist(product)}
                        title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <Heart
                          size={20}
                          fill={isInWishlist(product.id) ? "red" : "none"}
                          color={isInWishlist(product.id) ? "red" : "currentColor"}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="product-details">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">
                      {(product.original_price || product.originalPrice) && (
                        <span className="old-price">${product.original_price || product.originalPrice}</span>
                      )}{' '}
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Shop;
