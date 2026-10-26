import React from 'react';
import { Users, Heart, Award, Sparkles, Building, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CommunitySection({ onOpenReport, onBrowseItems }) {
  const stats = [
    {
      value: '94%',
      label: 'Verified Recovery Rate',
      detail: 'Belongings reunited with owners within 48h',
      color: 'violet',
    },
    {
      value: '1,420+',
      label: 'Reunited Belongings',
      detail: 'From student ID cards to laptops & textbooks',
      color: 'coral',
    },
    {
      value: '18',
      label: 'Campus Pickup Zones',
      detail: 'Connected across libraries, dorms & athletic hubs',
      color: 'mint',
    },
    {
      value: '4,800+',
      label: 'Student & Staff Members',
      detail: 'Actively reporting and assisting fellow peers',
      color: 'peach',
    },
  ];

  return (
    <section id="community" className="community-section section-padding" aria-label="Campus Community">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-pill badge-mint">
            <Heart size={14} />
            <span>Campus Solidarity</span>
          </div>
          <h2 className="heading-section">
            A Compassionate Campus <br />
            <span className="text-gradient">Where Belongings Return</span>
          </h2>
          <p className="subheading-section">
            CampusFind is fueled by the honesty and integrity of students, faculty, and campus staff working together to turn moments of distress into moments of relief.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="community-stats-grid">
          {stats.map((s, idx) => (
            <div key={idx} className={`glass-card stat-card stat-accent-${s.color}`}>
              <div className="stat-number-wrapper">
                <span className="stat-number">{s.value}</span>
              </div>
              <h3 className="stat-title">{s.label}</h3>
              <p className="stat-detail">{s.detail}</p>
            </div>
          ))}
        </div>

        {/* Explicit Demo Disclaimer for Metrics */}
        <p className="community-demo-notice">
          * Notice: The statistics displayed above represent illustrative demo figures and target metrics for this UI/UX design project.
        </p>

        {/* Community Testimonial & Pledge Card */}
        <div className="community-pledge-card glass-panel">
          <div className="pledge-left">
            <div className="quote-badge">
              <Award size={18} />
              <span>Campus Finder Spotlight</span>
            </div>
            <blockquote className="pledge-quote">
              "I left my entire semester’s chemistry notebook and lab badge in Lecture Hall B right before midterms. Someone logged it on CampusFind within twenty minutes, and I had it back before my next class started!"
            </blockquote>
            <div className="pledge-author">
              <div className="author-avatar">JD</div>
              <div>
                <strong>Jordan D.</strong>
                <span>Sophomore, Biomedical Engineering</span>
              </div>
            </div>
          </div>

          <div className="pledge-right">
            <div className="join-hub-box">
              <Sparkles size={28} className="icon-violet" />
              <h4>Join the Good Samaritan Finder Honor Roll</h4>
              <p>Every item you report helps keep our university supportive, accountable, and interconnected.</p>
              <div className="pledge-actions">
                <button
                  onClick={() => onOpenReport('found')}
                  className="btn btn-primary"
                >
                  Register a Found Item
                </button>
                <button
                  onClick={onBrowseItems}
                  className="btn btn-secondary"
                >
                  Browse Directory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
