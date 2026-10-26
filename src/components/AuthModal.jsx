import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldCheck, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('student@university.edu');
  const [studentId, setStudentId] = useState('STU-882941');
  const [fullName, setFullName] = useState('Alex Morgan');
  const [password, setPassword] = useState('••••••••••••');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    if (onAuthSuccess) {
      onAuthSuccess({
        name: mode === 'signup' ? fullName : 'Alex Morgan',
        studentId,
        email,
      });
    }
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#7C3AED', '#FB7185', '#6EE7B7'],
      });
    } catch (err) {}
  };

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className="dialog-content auth-modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="badge-pill badge-hero">
              <GraduationCap size={14} />
              <span>University Portal</span>
            </div>
            <h3 id="auth-modal-title">
              {success
                ? 'Welcome to CampusFind!'
                : mode === 'login'
                ? 'Student & Staff Login'
                : 'Create Student Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close authentication modal"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="icon-emerald" />
            </div>
            <h4>Authentication Successful</h4>
            <p>
              You are now signed in as <strong>{fullName}</strong> ({studentId}). Your verified badge is attached to all report and claim submissions.
            </p>
            <div className="success-demo-callout">
              <ShieldCheck size={16} />
              <span>Simulated Campus SSO session active locally.</span>
            </div>
            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
            >
              Continue to Portal
            </button>
          </div>
        ) : (
          <div className="auth-modal-body">
            {/* Mode Tabs */}
            <div className="auth-tab-switch" role="tablist">
              <button
                role="tab"
                aria-selected={mode === 'login'}
                onClick={() => setMode('login')}
                className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              >
                Sign In
              </button>
              <button
                role="tab"
                aria-selected={mode === 'signup'}
                onClick={() => setMode('signup')}
                className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
              >
                Create Account
              </button>
            </div>

            {/* University SSO Quick Action */}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-secondary btn-sso"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span>Continue with University Single Sign-On (SSO)</span>
            </button>

            <div className="auth-divider">
              <span>or continue with credentials</span>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="auth-name" className="form-label">Full Name</label>
                  <div className="auth-input-wrapper">
                    <User size={16} className="auth-input-icon" />
                    <input
                      id="auth-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="form-input has-icon"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="auth-email" className="form-label">Campus Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="form-input has-icon"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="auth-id" className="form-label">Student / Employee ID</label>
                <div className="auth-input-wrapper">
                  <GraduationCap size={16} className="auth-input-icon" />
                  <input
                    id="auth-id"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="STU-882941"
                    className="form-input has-icon"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="auth-pass" className="form-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    id="auth-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input has-icon"
                    required
                  />
                </div>
              </div>

              <div className="auth-disclaimer-note">
                <ShieldCheck size={14} />
                <span>Simulated Demo Auth: No credentials or cookies sent to remote servers.</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
              >
                {mode === 'login' ? 'Sign In to Portal' : 'Create Free Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
