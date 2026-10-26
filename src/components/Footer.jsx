import React from 'react';
import { MapPin, ShieldCheck, Heart, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer({ onNavigateSection, onOpenReport, onOpenAuth }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* Top Footer Banner */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <div className="logo-icon-wrapper">
                <svg
                  className="logo-svg"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="18" r="16" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="1.5" />
                  <path
                    d="M18 7C14.134 7 11 10.134 11 14C11 19.25 18 28 18 28C18 28 25 19.25 25 14C25 10.134 21.866 7 18 7Z"
                    fill="url(#logoGradFooter)"
                  />
                  <circle cx="18" cy="13.5" r="3" fill="#FFFFFF" />
                  <defs>
                    <linearGradient id="logoGradFooter" x1="11" y1="7" x2="25" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7C3AED" />
                      <stop offset="0.6" stopColor="#FB7185" />
                      <stop offset="1" stopColor="#FDBA9A" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">Campus<span className="brand-accent">Find</span></span>
                <span className="brand-tagline">Recovery Portal</span>
              </div>
            </div>

            <p className="footer-desc">
              The cinematic university lost-and-found portal connecting students, staff, and campus safety through zero-knowledge ownership challenges and secure QR pickup tokens.
            </p>

            <div className="footer-demo-badge">
              <span className="demo-indicator-dot" />
              <span>Frontend UI/UX Practice Demonstration</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Portal Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); onNavigateSection('hero'); }}>
                  Cinematic Hero
                </a>
              </li>
              <li>
                <a href="#intro" onClick={(e) => { e.preventDefault(); onNavigateSection('intro'); }}>
                  Campus Network
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => { e.preventDefault(); onNavigateSection('features'); }}>
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); onNavigateSection('how-it-works'); }}>
                  Three-Step Workflow
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); onNavigateSection('gallery'); }}>
                  Active Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Security & Safety</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#verify" onClick={(e) => { e.preventDefault(); onNavigateSection('verify'); }}>
                  Verify Ownership Simulator
                </a>
              </li>
              <li>
                <a href="#community" onClick={(e) => { e.preventDefault(); onNavigateSection('community'); }}>
                  Campus Community
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); onNavigateSection('about'); }}>
                  About CampusFind
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); onNavigateSection('faq'); }}>
                  FAQ & Policies
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="footer-btn-link"
                >
                  Student Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Hubs */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Campus Hubs</h4>
            <p className="footer-zones-text">
              Central Library • Student Union • Engineering Pavilion • Athletic Center • Dining Hall North • Science Quad • West Parking Lot.
            </p>
            <button
              onClick={() => onOpenReport('lost')}
              className="btn btn-primary btn-footer-report"
            >
              Report Lost Belonging
            </button>
          </div>
        </div>

        {/* Bottom Legal & Credits */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p>© {new Date().getFullYear()} CampusFind Portal. Built as a cinematic university UI/UX practice experience.</p>
            <p className="footer-demo-subtext">
              Notice: All student names, photos, and item records shown are mock data for local frontend simulation. No real personal data or payment credentials are processed.
            </p>
          </div>

          <div className="footer-bottom-right">
            <button
              onClick={scrollToTop}
              className="btn-scroll-top"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
