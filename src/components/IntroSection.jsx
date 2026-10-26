import React from 'react';
import { Compass, Sparkles, Shield, HeartHandshake, Zap, Building } from 'lucide-react';

export default function IntroSection({ onOpenReport, onBrowseItems }) {
  return (
    <section id="intro" className="intro-section section-padding" aria-label="Introduction to CampusFind">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-pill">
            <Sparkles size={14} />
            <span>The Campus Recovery Network</span>
          </div>
          <h2 className="heading-section">
            Bridging the Gap Between <br />
            <span className="text-gradient">Lost and Reunited</span>
          </h2>
          <p className="subheading-section">
            University life moves fast. Items get misplaced in lecture halls, libraries, and athletic centers every hour. CampusFind connects students, faculty, and campus desks through one seamless, verified recovery ecosystem.
          </p>
        </div>

        {/* 3 Main Pillars / Highlight Grid */}
        <div className="intro-grid">
          <div className="glass-card intro-card">
            <div className="intro-card-icon-wrap icon-violet">
              <Compass size={28} />
            </div>
            <div className="intro-card-content">
              <h3>Centralized Campus Directory</h3>
              <p>
                No more checking twenty separate bulletin boards or lost & found boxes. Every reported lost and found item across all campus departments is indexed in one searchable, categorized feed.
              </p>
              <div className="intro-card-tag">18 Campus Zones Synced</div>
            </div>
          </div>

          <div className="glass-card intro-card intro-card-featured">
            <div className="featured-ribbon">Core Innovation</div>
            <div className="intro-card-icon-wrap icon-coral">
              <Shield size={28} />
            </div>
            <div className="intro-card-content">
              <h3>Cryptographic Verification</h3>
              <p>
                Protect personal belongings from false claims. Our proprietary question-challenge system verifies genuine ownership through private serials, unique marks, and lock screen proof before disclosing pickup coordinates.
              </p>
              <div className="intro-card-tag tag-coral">Zero Fraud Guarantees</div>
            </div>
          </div>

          <div className="glass-card intro-card">
            <div className="intro-card-icon-wrap icon-mint">
              <HeartHandshake size={28} />
            </div>
            <div className="intro-card-content">
              <h3>Safe Authorized Hand-offs</h3>
              <p>
                Items are delivered directly to verified university front desks, student union lockers, or campus safety checkpoints with a unique QR claim pass, ensuring safe, documented returns.
              </p>
              <div className="intro-card-tag tag-mint">Staff Supervised Desks</div>
            </div>
          </div>
        </div>

        {/* Campus Map & Lifestyle Visual Banner */}
        <div className="intro-banner-card glass-panel">
          <div className="banner-text-col">
            <span className="badge-pill badge-mint">Designed for Students & Faculty</span>
            <h3>Built to Match the Rhythm of Modern University Life</h3>
            <p>
              Whether you left your laptop charger in the engineering pavilion or found an ID card by the dining commons, CampusFind makes reconnecting fast, transparent, and rewarding for honest finders.
            </p>
            <div className="banner-actions">
              <button
                onClick={() => onOpenReport('lost')}
                className="btn btn-primary"
              >
                Report Lost Belonging
              </button>
              <button
                onClick={onBrowseItems}
                className="btn btn-secondary"
              >
                Browse Current Listings
              </button>
            </div>
          </div>

          <div className="banner-visual-col">
            <div className="visual-graphic-hub">
              <div className="hub-center-circle">
                <Building size={32} />
                <span>Campus Hub</span>
              </div>
              <div className="hub-orbital-node node-1">
                <span>📚 Library Quad</span>
              </div>
              <div className="hub-orbital-node node-2">
                <span>🔬 Science Hall</span>
              </div>
              <div className="hub-orbital-node node-3">
                <span>☕ Student Union</span>
              </div>
              <div className="hub-orbital-node node-4">
                <span>🏃 Sports Complex</span>
              </div>
              <div className="orbital-ring" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
