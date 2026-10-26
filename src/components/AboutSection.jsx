import React from 'react';
import { Compass, GraduationCap, ShieldCheck, HeartHandshake, Sparkles, Building2, Check } from 'lucide-react';

export default function AboutSection() {
  const benefits = [
    {
      title: 'Eliminates Lost Property Chaos',
      description: 'Replaces scattered physical lost & found boxes across 18 campus buildings with a unified, real-time searchable index.',
    },
    {
      title: 'Protects Sensitive Student Data',
      description: 'Proprietary challenge questions verify genuine ownership without exposing student phone numbers, addresses, or emails.',
    },
    {
      title: 'Saves Hundreds in Replacement Costs',
      description: 'Recovers expensive textbooks, graphing calculators, laptops, prescription glasses, and university keys before replacement deadlines.',
    },
    {
      title: 'Staff-Approved Chain of Custody',
      description: 'Integrates directly with university front desks and campus safety officers to log pickups with time-stamped digital passes.',
    },
  ];

  return (
    <section id="about" className="about-section section-padding" aria-label="About CampusFind">
      <div className="container">
        <div className="about-layout-grid">
          {/* Left Column: Mission & Narrative */}
          <div className="about-text-col">
            <div className="badge-pill badge-hero">
              <GraduationCap size={14} />
              <span>Our Purpose & Vision</span>
            </div>

            <h2 className="heading-section about-title">
              Built for Students, <br />
              <span className="text-gradient">Driven by Integrity</span>
            </h2>

            <p className="about-paragraph">
              CampusFind was conceived to solve one of the most frustrating experiences of university life: misplacing essential belongings amidst a bustling campus with dozens of lecture halls, libraries, dining commons, and sports facilities.
            </p>

            <p className="about-paragraph">
              Traditional lost-and-found systems are fragmented, disorganized, and often rely on informal group chats or static bulletin boards. CampusFind introduces a modern, cinematic, and privacy-conscious web platform where every student, faculty member, and campus employee can quickly reconnect with their lost items.
            </p>

            <div className="about-principles-list">
              {benefits.map((b, i) => (
                <div key={i} className="principle-item">
                  <div className="principle-check">
                    <Check size={16} />
                  </div>
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="about-visual-col">
            <div className="about-card glass-panel">
              <div className="about-card-badge">
                <Sparkles size={16} />
                <span>Next-Gen Campus Experience</span>
              </div>

              <h3>A Modern Portal Inspired by Cinematic Clarity</h3>
              <p>
                From the golden hour sunset gradients of our campus architecture to our tactile challenge cards, CampusFind creates an atmosphere of reassurance, precision, and collegiate warmth.
              </p>

              <div className="about-stats-highlight">
                <div className="about-stat-mini">
                  <span className="mini-num">100%</span>
                  <span className="mini-lbl">Frontend Prototype</span>
                </div>
                <div className="about-stat-mini">
                  <span className="mini-num">300</span>
                  <span className="mini-lbl">Cinematic Frames</span>
                </div>
                <div className="about-stat-mini">
                  <span className="mini-num">0s</span>
                  <span className="mini-lbl">External API Delay</span>
                </div>
              </div>

              <div className="about-collaboration-note">
                <ShieldCheck size={20} className="icon-violet" />
                <span>Designed to comply with student union privacy standards & open campus safety protocols.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
