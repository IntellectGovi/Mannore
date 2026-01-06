import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Instagram } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { setCategory, products: allProducts, loading } = useShop();

  const handleCategoryClick = (category) => {
    setCategory(category);
    navigate('/shop');
  };

  const topPicks = allProducts?.slice(0, 3) || [];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Elevate <br /> Your <span>Essence</span></h1>
          <p>
            Discover the new Autumn/Winter 2025 collection. curated for the modern minimalist.
          </p>
          <Link to="/shop" className="cta-btn">Explore Collection</Link>
        </div>
        <div className="hero-image"></div>
      </section>

      {/* Browse by Category */}
      <section className="categories">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
        </div>
        <div className="grid category-grid">
          <div className="card category-card" onClick={() => handleCategoryClick('Men')} style={{ cursor: 'pointer' }}>
            <img src="https://images.unsplash.com/photo-1617137968427-b2b161ca1a18?q=80&w=1780" alt="Men" />
            <div className="card-info">
              <h3>Men</h3>
            </div>
          </div>
          <div className="card category-card" onClick={() => handleCategoryClick('Women')} style={{ cursor: 'pointer' }}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" alt="Women" />
            <div className="card-info">
              <h3>Women</h3>
            </div>
          </div>
          <div className="card category-card" onClick={() => handleCategoryClick('Accessories')} style={{ cursor: 'pointer' }}>
            <img src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?q=80&w=1887" alt="Accessories" />
            <div className="card-info">
              <h3>Accessories</h3>
            </div>
          </div>
          <div className="card category-card" onClick={() => handleCategoryClick('Beauty')} style={{ cursor: 'pointer' }}>
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1887" alt="Beauty" />
            <div className="card-info">
              <h3>Beauty</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="top-picks" style={{ padding: '6rem 4rem' }}>
        <div className="section-header">
          <h2 className="section-title">Top Picks For You</h2>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/shop" style={{ borderBottom: '1px solid black', paddingBottom: '5px', color: 'black' }}>Best Sellers</Link>
            <Link to="/shop" style={{ color: 'grey' }}>New Arrivals</Link>
            <Link to="/shop" style={{ color: 'grey' }}>Trending</Link>
          </div>
        </div>
        <div className="grid">
          {loading ? (
            <div className="shop-loader" style={{ gridColumn: '1/-1' }}>
              <div className="spinner"></div>
            </div>
          ) : (
            topPicks.map(product => (
              <div className="card" key={product.id} onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>
                <img src={product.image_url || product.image} alt={product.name} />
                <div className="card-info">
                  <h3>{product.name}</h3>
                  <p>Rs.{product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="feature-item">
          <span className="feature-icon">&#128142;</span>
          <h4 style={{ marginBottom: '0.5rem' }}>Premium Quality</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Sourced from the finest materials.</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">&#128666;</span>
          <h4 style={{ marginBottom: '0.5rem' }}>Express Shipping</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Global delivery within 3-5 days.</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">&#128737;</span>
          <h4 style={{ marginBottom: '0.5rem' }}>Secure Payment</h4>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>100% secure checkout process.</p>
        </div>
      </section>

      {/* Social Showcase */}
      <section className="social-showcase">
        <div className="social-header-container">
          <h2 className="social-header">TAG US @MANNORÉ &rarr;</h2>
        </div>
        <div className="social-grid">
          <div className="social-card">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" alt="Social 1" />
            <div className="social-overlay">
              <Instagram size={32} color="white" />
            </div>
          </div>
          <div className="social-card">
            <img src="https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=1000&auto=format&fit=crop" alt="Social 2" />
            <div className="social-overlay">
              <Instagram size={32} color="white" />
            </div>
          </div>
          <div className="social-card">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" alt="Social 3" />
            <div className="social-overlay">
              <Instagram size={32} color="white" />
            </div>
          </div>
          <div className="social-card">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop" alt="Social 4" />
            <div className="social-overlay">
              <Instagram size={32} color="white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
