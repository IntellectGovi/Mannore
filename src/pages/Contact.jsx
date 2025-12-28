import React from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! Our team will get back to you shortly.');
    e.target.reset();
  };

  return (
    <div className="contact-container">
      {/* Left: Form */}
      <div className="contact-form-section">
        <h1 className="section-title">Get in Touch</h1>
        <p className="subtitle">
          We'd love to hear from you. Whether you have a question about pricing, products, or
          anything else, our team is ready to answer all your questions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-input" placeholder="+91 9876543210" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      {/* Right: Info */}
      <div className="contact-info-section">
        <div className="info-block">
          <h3 className="info-title">MANNORÉ Headquarters</h3>
          <p className="info-text">
            Sitapur<br />
            Uttar Pradesh<br /> 
            India
          </p>
        </div>
        <div className="info-block">
          <h3 className="info-title">Contact</h3>
          <p className="info-text">
            +91 9876543210<br />
            bags@mannore-fashion.com
          </p>
        </div>
        <div className="info-block">
          <h3 className="info-title">Support Hours</h3>
          <p className="info-text">
            Monday - Friday: 9am - 6pm <br />
            Saturday: 10am - 4pm 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
