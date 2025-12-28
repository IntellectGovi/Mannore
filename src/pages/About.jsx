import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">"Timeless Elegance, Consciously Crafted"</h1>
        <p className="about-text">
          We bring the essence of modern luxury into your everyday life.
          Rooted in the belief that true style is timeless, we curate collections that transcend fleeting trends.
          Our mission is to provide you with apparel that not only looks exquisite but feels exceptional.
        </p>
      </div>

      <section className="philosophy-section">
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">&#10024;</span>
            <h3 className="value-title">Curated Excellence</h3>
            <p className="value-desc">Every piece is hand-selected effectively ensuring that you receive only the finest
              quality garments that stand the test of time.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">&#127811;</span>
            <h3 className="value-title">Sustainable Practices</h3>
            <p className="value-desc">We are committed to reducing our footprint. Our materials are ethically sourced,
              prioritizing organic and recycled fabrics.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">&#129489;</span>
            <h3 className="value-title">Artisan Craftsmanship</h3>
            <p className="value-desc">We work directly with skilled artisans who pour their heritage and expertise into
              every stitch, creating wearable art.</p>
          </div>
          <div className="value-card">
            <span className="value-icon">&#128151;</span>
            <h3 className="value-title">Customer First</h3>
            <p className="value-desc">Your experience is paramount. From personalized styling advice to seamless
              delivery, we are dedicated to your satisfaction.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '2rem' }}>Experience the Difference
        </h2>
        <Link to="/shop" className="cta-btn">Explore Our Collection</Link>
      </section>
    </div>
  );
};

export default About;
