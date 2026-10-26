import React from 'react';
import { PlusCircle, Search, ShieldCheck, CheckCircle2, ArrowRight, Bell, Tag, Lock, QrCode } from 'lucide-react';

export default function FeatureShowcase({ onOpenReport, onBrowseItems, onNavigateVerify }) {
  const features = [
    {
      id: 'report-lost',
      title: 'Report a Lost Item',
      subtitle: 'Instant Campus-wide Indexing',
      description: 'Upload descriptions, estimated loss radius, and confidential proof identifiers. Our system immediately cross-references all registered found items.',
      icon: PlusCircle,
      accent: 'violet',
      tags: ['Smart Matching', 'Instant Alert', 'Private Proof'],
      actionText: 'File Lost Report',
      action: () => onOpenReport('lost'),
    },
    {
      id: 'register-found',
      title: 'Register a Found Item',
      subtitle: 'Effortless Community Assistance',
      description: 'Found keys, a phone, or an ID card? Snap a photo, choose the discovery location, and log it into the secure registry in less than 60 seconds.',
      icon: Search,
      accent: 'coral',
      tags: ['Quick Scan', 'Designated Drop-box', 'Finder Karma'],
      actionText: 'Register Found Item',
      action: () => onOpenReport('found'),
    },
    {
      id: 'verify-ownership',
      title: 'Verify Ownership',
      subtitle: 'Zero-Knowledge Security Challenge',
      description: 'Prevent wrongful claims with our automated ownership questionnaire. Answer device passcode details, hidden scratches, or serial numbers safely.',
      icon: ShieldCheck,
      accent: 'mint',
      tags: ['Encrypted Tokens', 'Serial Matching', 'Anti-Fraud'],
      actionText: 'Launch Verification Demo',
      action: onNavigateVerify,
    },
    {
      id: 'return-items',
      title: 'Return Items to Owners',
      subtitle: 'Verified Safe Handoff Protocol',
      description: 'Once ownership is confirmed, generate a time-limited QR Claim Pass. Redeem at any participating university front desk or smart locker bay.',
      icon: CheckCircle2,
      accent: 'peach',
      tags: ['QR Claim Pass', 'Campus Lockers', 'Staff Logged'],
      actionText: 'Explore Directory',
      action: onBrowseItems,
    },
  ];

  return (
    <section id="features" className="features-section section-padding" aria-label="Feature Showcase">
      <div className="container">
        <div className="section-header">
          <div className="badge-pill badge-coral">
            <Tag size={14} />
            <span>Core Capabilities</span>
          </div>
          <h2 className="heading-section">
            Engineered for Fast, <br />
            <span className="text-gradient">Foolproof Reunification</span>
          </h2>
          <p className="subheading-section">
            Every feature in CampusFind is architected around security, ease of use, and respectful privacy for students and staff.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.id} className={`glass-card feature-card feature-accent-${feat.accent}`}>
                <div className="feature-top-bar">
                  <div className={`feature-icon-badge badge-accent-${feat.accent}`}>
                    <Icon size={26} />
                  </div>
                  <div className="feature-tags-group">
                    {feat.tags.map((t) => (
                      <span key={t} className="feature-mini-pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="feature-card-body">
                  <span className="feature-card-subtitle">{feat.subtitle}</span>
                  <h3 className="feature-card-title">{feat.title}</h3>
                  <p className="feature-card-desc">{feat.description}</p>
                </div>

                <div className="feature-card-footer">
                  <button
                    onClick={feat.action}
                    className="feature-action-link"
                    aria-label={`${feat.actionText} for ${feat.title}`}
                  >
                    <span>{feat.actionText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
