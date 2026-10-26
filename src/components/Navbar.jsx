import React, { useState, useEffect } from 'react';
import { MapPin, Search, ShieldCheck, PlusCircle, User, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenReport, onOpenAuth, onFilterCategory }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', 'intro', 'features', 'how-it-works', 'gallery', 'verify', 'community', 'about', 'faq'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId, categoryFilter = null) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (categoryFilter && onFilterCategory) {
      onFilterCategory(categoryFilter);
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`site-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="brand-logo"
          aria-label="CampusFind Home"
        >
          <div className="logo-icon-wrapper">
            <svg
              className="logo-svg"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="logoGrad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" />
                  <stop offset="0.55" stopColor="#FB7185" />
                  <stop offset="1" stopColor="#FDBA9A" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Soft pulsing pin circle */}
              <circle cx="18" cy="18" r="16" fill="url(#logoGrad)" fillOpacity="0.12" stroke="url(#logoGrad)" strokeWidth="1.5" />
              {/* Outer compass/radar tick */}
              <circle cx="18" cy="18" r="11" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="3 3" />
              {/* Location pin & beacon */}
              <path
                d="M18 7C14.134 7 11 10.134 11 14C11 19.25 18 28 18 28C18 28 25 19.25 25 14C25 10.134 21.866 7 18 7Z"
                fill="url(#logoGrad)"
                filter="url(#glow)"
              />
              {/* Inner glowing recovery star/heart */}
              <circle cx="18" cy="13.5" r="3" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">Campus<span className="brand-accent">Find</span></span>
            <span className="brand-tagline">Recovery Portal</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links-list">
            <li>
              <a
                href="#hero"
                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'hero')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'gallery', 'Lost')}
              >
                Lost Items
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'gallery', 'Found')}
              >
                Found Items
              </a>
            </li>
            <li>
              <a
                href="#verify"
                className={`nav-link ${activeSection === 'verify' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'verify')}
              >
                Verify Ownership
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'how-it-works')}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </a>
            </li>
          </ul>
        </nav>

        {/* Action CTAs */}
        <div className="navbar-actions">
          <button
            onClick={() => onOpenAuth('login')}
            className="btn btn-ghost btn-auth"
            aria-label="Student Login"
          >
            <User size={16} />
            <span>Login</span>
          </button>

          <button
            onClick={() => onOpenAuth('signup')}
            className="btn btn-secondary btn-signup"
            aria-label="Student Sign Up"
          >
            <span>Sign Up</span>
          </button>

          <button
            onClick={() => onOpenReport('lost')}
            className="btn btn-primary btn-report-nav"
            aria-label="Report an Item"
          >
            <PlusCircle size={16} />
            <span>Report Item</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <ul className="mobile-nav-list">
            <li>
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, 'hero')}
                className={activeSection === 'hero' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, 'gallery', 'Lost')}
              >
                Lost Items
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, 'gallery', 'Found')}
              >
                Found Items
              </a>
            </li>
            <li>
              <a
                href="#verify"
                onClick={(e) => handleNavClick(e, 'verify')}
                className={activeSection === 'verify' ? 'active' : ''}
              >
                Verify Ownership
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className={activeSection === 'how-it-works' ? 'active' : ''}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#community"
                onClick={(e) => handleNavClick(e, 'community')}
                className={activeSection === 'community' ? 'active' : ''}
              >
                Campus Community
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className={activeSection === 'about' ? 'active' : ''}
              >
                About CampusFind
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, 'faq')}
                className={activeSection === 'faq' ? 'active' : ''}
              >
                FAQ
              </a>
            </li>
          </ul>

          <div className="mobile-actions-stack">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport('lost');
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <PlusCircle size={18} />
              <span>Report Lost or Found Item</span>
            </button>
            <div className="mobile-auth-row">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="btn btn-coral"
                style={{ flex: 1 }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
