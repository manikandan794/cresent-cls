import React, { useState } from 'react';
import { FileEdit, ShieldCheck, QrCode, ArrowRight, Sparkles, Building2, MapPin } from 'lucide-react';

export default function HowItWorks({ onOpenReport, onNavigateVerify }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Report or Discover',
      summary: 'Submit your listing in under 60 seconds with location tagging and confidential proof marks.',
      details: [
        'Select item category and upload clear photos.',
        'Tag specific campus buildings, floor numbers, or GPS landmarks.',
        'Enter confidential details (e.g., custom keychain initials, serial prefix) hidden from public view.',
      ],
      icon: FileEdit,
      color: 'violet',
      badge: 'Step 1 • Logging',
      previewHeading: 'Instant Smart Indexing',
      previewText: 'Algorithms scan recent submissions across campus for instant match probabilities.',
    },
    {
      stepNumber: '02',
      title: 'Verify Ownership',
      summary: 'A secure question-challenge mechanism ensures items only go to their rightful owners.',
      details: [
        'Finder or campus desk poses a non-public challenge question.',
        'Claimant provides exact matching details (e.g., screen lock pattern or engravement).',
        'System validates match confidence without compromising student personal data.',
      ],
      icon: ShieldCheck,
      color: 'coral',
      badge: 'Step 2 • Verification',
      previewHeading: 'Zero-Knowledge Challenge',
      previewText: 'No personal identification is shared until the verification challenge successfully clears.',
    },
    {
      stepNumber: '03',
      title: 'Reconnect & Recover',
      summary: 'Collect your verified item at designated campus safety desks or smart lockers.',
      details: [
        'Receive a cryptographic QR Claim Token on your university device.',
        'Present the pass to the desk attendant or scan at the 24/7 Smart Locker bay.',
        'Item handoff is logged and closed with mutual confirmation.',
      ],
      icon: QrCode,
      color: 'emerald',
      badge: 'Step 3 • Safe Return',
      previewHeading: 'Authorized Redemption',
      previewText: 'Official campus staff and electronic locker audit logs prevent misplacement or theft.',
    },
  ];

  return (
    <section id="how-it-works" className="how-section section-padding" aria-label="How It Works">
      <div className="container">
        <div className="section-header">
          <div className="badge-pill badge-mint">
            <Sparkles size={14} />
            <span>Seamless Workflow</span>
          </div>
          <h2 className="heading-section">
            Three Steps to <br />
            <span className="text-gradient">Complete Recovery</span>
          </h2>
          <p className="subheading-section">
            From the moment an item is misplaced to its safe return into your hands, our automated workflow makes campus recovery effortless.
          </p>
        </div>

        {/* Interactive Step Switcher */}
        <div className="how-timeline-container">
          <div className="steps-tracker-bar">
            {steps.map((st, idx) => (
              <button
                key={st.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`step-tracker-item ${activeStep === idx ? 'step-active' : ''}`}
                aria-label={`View step ${st.stepNumber}: ${st.title}`}
              >
                <div className="step-circle">{st.stepNumber}</div>
                <div className="step-tracker-label">
                  <span className="step-sub">{st.badge}</span>
                  <span className="step-name">{st.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content Display */}
          <div className="step-display-card glass-panel">
            <div className="step-content-grid">
              <div className="step-info-col">
                <div className="badge-pill badge-hero">
                  <span>{steps[activeStep].badge}</span>
                </div>
                <h3 className="step-title">{steps[activeStep].title}</h3>
                <p className="step-summary">{steps[activeStep].summary}</p>

                <div className="step-bullets-list">
                  {steps[activeStep].details.map((bullet, i) => (
                    <div key={i} className="step-bullet-item">
                      <div className="bullet-check">✓</div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="step-action-row">
                  {activeStep === 0 && (
                    <button onClick={() => onOpenReport('lost')} className="btn btn-primary">
                      <span>Report Lost Item Now</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                  {activeStep === 1 && (
                    <button onClick={onNavigateVerify} className="btn btn-coral">
                      <span>Try Ownership Challenge Demo</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                  {activeStep === 2 && (
                    <button onClick={() => setActiveStep(0)} className="btn btn-secondary">
                      <span>Back to Step 1</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Visual Interactive Mockup Card */}
              <div className="step-visual-col">
                <div className="step-visual-card">
                  <div className="visual-card-glow" />
                  <div className="visual-card-header">
                    <span className="mockup-dot red" />
                    <span className="mockup-dot yellow" />
                    <span className="mockup-dot green" />
                    <span className="mockup-title">CampusFind Verification Protocol v2.4</span>
                  </div>

                  <div className="visual-card-body">
                    <div className="visual-step-badge">
                      <span>{steps[activeStep].previewHeading}</span>
                    </div>

                    <div className="visual-status-box">
                      <div className="status-indicator-live" />
                      <div>
                        <strong>Live System Simulation</strong>
                        <p>{steps[activeStep].previewText}</p>
                      </div>
                    </div>

                    <div className="visual-metric-row">
                      <div className="metric-box">
                        <span className="metric-label">Avg Recovery Time</span>
                        <span className="metric-val">3.4 Hours</span>
                      </div>
                      <div className="metric-box">
                        <span className="metric-label">Verification Accuracy</span>
                        <span className="metric-val">99.8%</span>
                      </div>
                    </div>

                    <div className="visual-campus-location-tag">
                      <MapPin size={14} />
                      <span>Supported across all 18 University Pickup Hubs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
