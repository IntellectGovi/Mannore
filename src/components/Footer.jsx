import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Youtube, Send, Accessibility, MessageCircle } from 'lucide-react';
import Logo from '../assets/mannore-logo.png';

const Footer = () => {
  // Custom TikTok icon since Lucide might not have it or it might be different, using a placeholder text or generic svg if needed. 
  // Lucide doesn't have TikTok, so we can use a text representation or a similar icon for now, or just leave it out/use a custom SVG. 
  // For this implementation I will use a custom SVG for Tiktok if strict adherence is needed, but for now I'll use a path or omit if not critical. 
  // Actually, let's use a generic 'Music' or similar if needed, but 'Tiktok' text is fine or we can try to find an SVG.
  // I will use a simple text or just standard social icons available in Lucide for now (Twitter, FB, Insta, Youtube).
  // Added Pinterest as well if available, otherwise just use generic.

  return (
    <footer>
      <div className="footer-content">

        {/* Column 1: Brand & Social */}
        <div className="footer-column brand-column">
          <img src={Logo} alt="MANNORÉ" className="footer-logo-img" style={{ height: '80px', marginBottom: '1.5rem' }} />
          <div className="social-links">
            <a href="#" className="social-link"><Twitter size={20} /> <span className="social-text">TWITTER</span></a>
            <a href="#" className="social-link">
              {/* Custom TikTok SVG or text */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 22a6.34 6.34 0 0 0 6.33-6.4V6.6a8.33 8.33 0 0 0 5.4 2.3V5.5a4.86 4.86 0 0 1-2.94-1.2h.02z" />
              </svg>
              <span className="social-text">TIKTOK</span>
            </a>
            <a href="#" className="social-link"><Facebook size={20} /> <span className="social-text">FACEBOOK</span></a>
            <a href="#" className="social-link"><Instagram size={20} /> <span className="social-text">INSTAGRAM</span></a>
            <a href="#" className="social-link"><Youtube size={20} /> <span className="social-text">YOUTUBE</span></a>
            {/* Pinterest not always in basic sets, check if needed. TRUFF has it. */}
            <a href="#" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.487-.695-2.419-2.873-2.419-4.624 0-3.772 2.75-7.229 7.927-7.229 4.163 0 7.396 2.967 7.396 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
              </svg>
              <span className="social-text">PINTEREST</span>
            </a>
          </div>
        </div>

        {/* Column 2: Stay Updated */}
        <div className="footer-column subscribe-column">
          <h5>STAY UPDATED</h5>
          <p>Subscribe for weekly recipes, updates, and more.</p>
          <div className="newsletter-form">
            <label htmlFor="email-input">Enter your email</label>
            <input type="email" id="email-input" placeholder="Enter your email..." />
            <button type="button">SIGN UP</button>
          </div>
        </div>

        {/* Column 3: Shop */}
        <div className="footer-column">
          <h5>SHOP</h5>
          <ul>
            <li><Link to="/shop">HOT SAUCE</Link></li>
            <li><Link to="/shop">GIFTS</Link></li>
            <li><Link to="/shop">OIL</Link></li>
            <li><Link to="/shop">MAYO</Link></li>
            <li><Link to="/shop">PASTA SAUCE</Link></li>
            <li><Link to="/shop">SALT</Link></li>
            <li><Link to="/shop">GEAR</Link></li>
            <li><Link to="/shop">BUNDLE BUILDER</Link></li>
          </ul>
        </div>

        {/* Column 4: Explore */}
        <div className="footer-column">
          <h5>EXPLORE</h5>
          <ul>
            <li><Link to="#">FIND A STORE</Link></li>
            <li><Link to="#">SUBSCRIPTIONS</Link></li>
            <li><Link to="#">RECIPES</Link></li>
            <li><Link to="#">THE SAUCE BLOG</Link></li>
            <li><Link to="#">TRUFF REWARDS</Link></li> {/* Keeping 'TRUFF' specific text as per image, user can change later if they want 'MANNORÉ REWARDS' */}
            <li><Link to="#">REFERRALS</Link></li>
            <li><Link to="#">FAQS</Link></li>
          </ul>
        </div>

        {/* Column 5: Company */}
        {/* <div className="footer-column">
          <h5>COMPANY</h5>
          <ul>
            <li><Link to="/contact">CONTACT US</Link></li>
            <li><Link to="#">JOIN THE TEAM</Link></li>
            <li><Link to="#">RETURN POLICY</Link></li>
            <li><Link to="#">PRIVACY POLICY</Link></li>
            <li><Link to="#">ACCESSIBILITY</Link></li>
            <li><Link to="#">TERMS OF SERVICE</Link></li>
            <li><Link to="#">NOTICE AT COLLECTION</Link></li>
            <li><Link to="#">DO NOT SHARE MY INFO</Link></li>
            <li><Link to="#">CONSUMER PRIVACY REQUEST</Link></li>
          </ul>
        </div> */}

      </div>

      {/* Floating Actions */}
      {/* <div className="floating-actions">
        <button className="accessibility-btn" aria-label="Accessibility options">
          <Accessibility size={24} />
        </button>
        <button className="chat-btn" aria-label="Open chat">
          <MessageCircle size={24} />
        </button>
      </div> */}

    </footer>
  );
};

export default Footer;
