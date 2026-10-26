import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, QrCode, AlertCircle, Sparkles, RefreshCw, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerificationSection({ preselectedItem, onResetPreselected }) {
  const [selectedItemId, setSelectedItemId] = useState(preselectedItem?.id || 'CF-1084');
  const [claimantName, setClaimantName] = useState('Alex Morgan');
  const [studentId, setStudentId] = useState('STU-882941');
  const [secretAnswer, setSecretAnswer] = useState('Golden retriever with red collar / Initials AM');
  const [verificationState, setVerificationState] = useState('idle'); // idle, analyzing, verified
  const [matchScore, setMatchScore] = useState(0);

  // Sample items available for verification demo
  const verificationCatalog = [
    {
      id: 'CF-1084',
      title: 'Apple iPhone 15 Pro — Natural Titanium',
      question: 'Describe lock screen wallpaper details or serial number prefix:',
      defaultAnswer: 'Golden retriever with red collar / Initials AM',
      location: 'Student Union Zone A Info Desk',
      custodian: 'Officer Miller (Badge #402)',
    },
    {
      id: 'CF-1082',
      title: 'Student ID Card — Engineering Faculty',
      question: 'Enter the last 3 digits of matriculation ID and birth month:',
      defaultAnswer: '482 — November',
      location: 'Central Library Front Circulation Desk',
      custodian: 'Attendant Sarah (Library Services)',
    },
    {
      id: 'CF-1085',
      title: 'Hydro Flask 32oz — Coral Pink',
      question: 'Name the hidden sticker placed underneath the rubber boot:',
      defaultAnswer: 'Yellow smiley face with Yosemite badge',
      location: 'Athletic Center Equipment Desk',
      custodian: 'Coach Vance',
    },
    {
      id: 'CF-1087',
      title: 'Subaru Key Fob with Brass House Keys',
      question: 'Identify the brand stamp engraved on the smallest brass padlock key:',
      defaultAnswer: 'MasterLock 140D brass engraving',
      location: 'Campus Security HQ — West Gate',
      custodian: 'Campus Police Desk',
    },
  ];

  const currentItem = verificationCatalog.find((c) => c.id === selectedItemId) || verificationCatalog[0];

  const handleRunVerification = (e) => {
    e.preventDefault();
    if (!secretAnswer.trim()) return;

    setVerificationState('analyzing');

    // Simulate cryptographic matching sequence
    setTimeout(() => {
      setMatchScore(99.4);
      setVerificationState('verified');

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#FB7185', '#6EE7B7', '#FDBA9A', '#C4B5FD'],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 1200);
  };

  const handleReset = () => {
    setVerificationState('idle');
    setMatchScore(0);
    if (onResetPreselected) onResetPreselected();
  };

  return (
    <section id="verify" className="verify-section section-padding" aria-label="Ownership Verification">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-pill badge-coral">
            <Lock size={14} />
            <span>Cryptographic Trust Engine</span>
          </div>
          <h2 className="heading-section">
            Zero-Knowledge <br />
            <span className="text-gradient">Ownership Verification</span>
          </h2>
          <p className="subheading-section">
            Our challenge-response protocol allows genuine owners to prove possession using confidential markers, without revealing private personal data to strangers.
          </p>
        </div>

        {/* 3 Trust Pillars */}
        <div className="verify-pillars-grid">
          <div className="glass-card pillar-card">
            <div className="pillar-icon-box icon-violet">
              <KeyRound size={22} />
            </div>
            <h4>Blind Challenge Proofs</h4>
            <p>Finders and staff cannot see your confidential answers until the cryptographic checksum matches.</p>
          </div>
          <div className="glass-card pillar-card">
            <div className="pillar-icon-box icon-coral">
              <ShieldCheck size={22} />
            </div>
            <h4>Tamper-Proof QR Claim Pass</h4>
            <p>A time-bound cryptographic token is generated for in-person handoff with authorized campus staff.</p>
          </div>
          <div className="glass-card pillar-card">
            <div className="pillar-icon-box icon-mint">
              <UserCheck size={22} />
            </div>
            <h4>Full Audit Trail</h4>
            <p>Every recovery generates a mutual digital receipt confirming item condition and custody transfer.</p>
          </div>
        </div>

        {/* Interactive Verification Simulator Card */}
        <div className="interactive-simulator-card glass-panel">
          <div className="simulator-header-bar">
            <div className="sim-badge">
              <Sparkles size={14} />
              <span>Interactive Simulator</span>
            </div>
            <h3 className="sim-title">Test the Ownership Verification Flow</h3>
            <p className="sim-subtitle">
              Try verifying a demo item below to experience how the challenge-response algorithm and QR claim generation operate.
            </p>
          </div>

          <div className="simulator-main-grid">
            {/* Form Column */}
            <div className="sim-form-col">
              <form onSubmit={handleRunVerification} className="sim-form">
                <div className="form-group">
                  <label htmlFor="verify-item-select" className="form-label">
                    Select Demo Found Item to Claim:
                  </label>
                  <select
                    id="verify-item-select"
                    value={selectedItemId}
                    onChange={(e) => {
                      setSelectedItemId(e.target.value);
                      const itm = verificationCatalog.find((c) => c.id === e.target.value);
                      if (itm) setSecretAnswer(itm.defaultAnswer);
                      setVerificationState('idle');
                    }}
                    className="form-select"
                    disabled={verificationState === 'analyzing'}
                  >
                    {verificationCatalog.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.id}] {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="claimant-name" className="form-label">
                      Your Full Name (Demo):
                    </label>
                    <input
                      id="claimant-name"
                      type="text"
                      value={claimantName}
                      onChange={(e) => setClaimantName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="student-id" className="form-label">
                      Student Matriculation ID:
                    </label>
                    <input
                      id="student-id"
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group challenge-group">
                  <div className="challenge-prompt-header">
                    <span className="challenge-badge">Confidential Challenge</span>
                    <span className="challenge-rule">Answer known only to legitimate owner</span>
                  </div>
                  <label htmlFor="secret-answer" className="challenge-question-label">
                    {currentItem.question}
                  </label>
                  <textarea
                    id="secret-answer"
                    rows={3}
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    className="form-textarea"
                    placeholder="Enter identifying characteristics, marks, or screen lock patterns..."
                    required
                  />
                  <span className="input-hint">
                    Sample hint: {currentItem.defaultAnswer}
                  </span>
                </div>

                <div className="form-actions-row">
                  <button
                    type="submit"
                    disabled={verificationState === 'analyzing'}
                    className="btn btn-primary btn-run-verify"
                  >
                    {verificationState === 'analyzing' ? (
                      <>
                        <RefreshCw size={18} className="spinner" />
                        <span>Verifying Cryptographic Markers...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Submit Ownership Challenge</span>
                      </>
                    )}
                  </button>

                  {verificationState === 'verified' && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-secondary"
                    >
                      Reset Simulator
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Simulated Live Token / Status Column */}
            <div className="sim-token-col">
              {verificationState === 'idle' && (
                <div className="token-preview-idle">
                  <div className="idle-shield-icon">
                    <ShieldCheck size={48} />
                  </div>
                  <h4>Ready for Challenge Submission</h4>
                  <p>
                    Fill in the challenge fields on the left and submit. The system will calculate feature similarities against the encrypted intake log.
                  </p>
                  <div className="sim-security-specs">
                    <div className="spec-row">
                      <span>Encryption:</span>
                      <strong>AES-256 + Zero-Knowledge Proof</strong>
                    </div>
                    <div className="spec-row">
                      <span>Custody Location:</span>
                      <strong>{currentItem.location}</strong>
                    </div>
                  </div>
                </div>
              )}

              {verificationState === 'analyzing' && (
                <div className="token-preview-analyzing">
                  <RefreshCw size={44} className="spinner icon-violet" />
                  <h4>Evaluating Ownership Markers...</h4>
                  <p>Comparing submitted descriptors with intake custody records...</p>
                  <div className="analyzing-progress-bar">
                    <div className="analyzing-progress-fill" />
                  </div>
                </div>
              )}

              {verificationState === 'verified' && (
                <div className="verified-claim-pass glass-card">
                  <div className="pass-ribbon">
                    <CheckCircle2 size={16} />
                    <span>CLAIM VERIFIED • 99.4% MATCH</span>
                  </div>

                  <div className="pass-header">
                    <h4>CampusFind Pickup Pass</h4>
                    <span className="pass-code">TOKEN: #CF-SEC-89412</span>
                  </div>

                  <div className="pass-body">
                    <div className="pass-item-details">
                      <span className="pass-label">Verified Item:</span>
                      <strong className="pass-val">{currentItem.title}</strong>
                    </div>

                    <div className="pass-meta-grid">
                      <div>
                        <span className="pass-label">Claimant:</span>
                        <span className="pass-val">{claimantName}</span>
                      </div>
                      <div>
                        <span className="pass-label">Student ID:</span>
                        <span className="pass-val">{studentId}</span>
                      </div>
                      <div>
                        <span className="pass-label">Pickup Hub:</span>
                        <span className="pass-val">{currentItem.location}</span>
                      </div>
                      <div>
                        <span className="pass-label">Desk Custodian:</span>
                        <span className="pass-val">{currentItem.custodian}</span>
                      </div>
                    </div>

                    {/* Simulated High-Res QR Code Card */}
                    <div className="pass-qr-box">
                      <div className="qr-simulated-graphic">
                        <QrCode size={120} className="qr-icon-svg" />
                      </div>
                      <span className="qr-caption">Scan at Campus Desk or Smart Locker</span>
                      <span className="qr-timer">⏱ Valid for 48 Hours</span>
                    </div>
                  </div>

                  <div className="pass-footer">
                    <span className="pass-demo-badge">✓ Demo Pass Generated Locally</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prototype Disclaimer */}
          <div className="simulator-disclaimer">
            <AlertCircle size={15} />
            <span>
              Disclaimer: This is a frontend UI/UX demonstration. In an actual deployment, verification challenges are validated through secure university administrative backends and authorized staff credentials.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
