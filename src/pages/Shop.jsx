import React from 'react';

const Shop = () => {
  return (
    <div className="shop-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="filter-group">
          <span className="filter-title">Categories</span>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> Men <span className="count">(12)</span>
            </label>
            <label>
              <input type="checkbox" /> Women <span className="count">(24)</span>
            </label>
            <label>
              <input type="checkbox" /> Accessories <span className="count">(8)</span>
            </label>
            <label>
              <input type="checkbox" /> Beauty <span className="count">(15)</span>
            </label>
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-title">Filter by Price</span>
          <input type="range" className="price-range" />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666' }}>
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-title">Stock Status</span>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> In Stock
            </label>
            <label>
              <input type="checkbox" /> On Sale
            </label>
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="main-content">
        <div className="toolbar">
          <span className="result-count">Showing 1-9 of 45 results</span>
          <select className="sort-select">
            <option>Default Sorting</option>
            <option>Sort by Popularity</option>
            <option>Sort by Latest</option>
            <option>Sort by Price: Low to High</option>
            <option>Sort by Price: High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {/* Product 1 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <span className="sale-badge">-20%</span>
              <img src="https://images.unsplash.com/photo-1542272454324-9927c7453013?auto=format&fit=crop&q=80&w=1587"
                className="product-image" alt="Dress" />
            </div>
            <div className="product-details">
              <span className="product-category">Women</span>
              <h3 className="product-title">Evening Silk Dress</h3>
              <p className="product-price"><span className="old-price">$450</span> $360</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1636"
                className="product-image" alt="Jacket" />
            </div>
            <div className="product-details">
              <span className="product-category">Men</span>
              <h3 className="product-title">Wool Overcoat</h3>
              <p className="product-price">$550</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="https://images.unsplash.com/photo-1627918543450-705b4618a80d?auto=format&fit=crop&q=80&w=1636"
                className="product-image" alt="Bag" />
            </div>
            <div className="product-details">
              <span className="product-category">Accessories</span>
              <h3 className="product-title">Leather Tote</h3>
              <p className="product-price">$295</p>
            </div>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=1636"
                className="product-image" alt="Top" />
            </div>
            <div className="product-details">
              <span className="product-category">Women</span>
              <h3 className="product-title">Linen Blouse</h3>
              <p className="product-price">$120</p>
            </div>
          </div>

          {/* Product 5 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <span className="sale-badge">HOT</span>
              <img src="https://images.unsplash.com/photo-1605763240004-7d93b47266a9?auto=format&fit=crop&q=80&w=1587"
                className="product-image" alt="Shoes" />
            </div>
            <div className="product-details">
              <span className="product-category">Men</span>
              <h3 className="product-title">Classic Chelsea Boots</h3>
              <p className="product-price">$220</p>
            </div>
          </div>

          {/* Product 6 */}
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="https://images.unsplash.com/photo-1576487140836-39ce84462cb3?auto=format&fit=crop&q=80&w=1587"
                className="product-image" alt="Watch" />
            </div>
            <div className="product-details">
              <span className="product-category">Accessories</span>
              <h3 className="product-title">Minimalist Watch</h3>
              <p className="product-price">$180</p>
            </div>
          </div>
        </div>

        <div className="pagination">
          <a href="#" className="page-link active">1</a>
          <a href="#" className="page-link">2</a>
          <a href="#" className="page-link">&#8594;</a>
        </div>
      </main>
    </div>
  );
};

export default Shop;
