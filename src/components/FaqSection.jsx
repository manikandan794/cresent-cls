import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

export default function FaqSection({ onOpenReport }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How does ownership verification work without exposing my personal data?',
      answer: 'CampusFind uses a zero-knowledge challenge-response method. When an item is registered as found, the finder or custodian notes a hidden identifier (such as a lock screen pattern, hidden scratch, or specific sticker). To claim the item, you provide this exact detail. The system verifies the answer without publicly disclosing the secret question or exposing your personal contact information to other students.',
    },
    {
      question: 'Where are found items physically stored until claimed?',
      answer: 'Items are held at authorized campus partner hubs based on where they were found. For example, items found in the library are kept at the Library Circulation Desk, athletic gear is placed in the Gym Equipment Room, and valuables (like phones and laptops) are secured in the Campus Safety Office or 24/7 smart lockers.',
    },
    {
      question: 'What is the "Campus Pickup Pass" and how do I use it?',
      answer: 'Once you successfully clear the ownership challenge, the system generates a secure, time-limited digital QR pass on your screen. You simply present this pass on your phone to the campus desk attendant or scan it at an automated smart locker to release your item. The pass expires after 48 hours for security.',
    },
    {
      question: 'How do I report an item if I am in a hurry between classes?',
      answer: 'Our quick-report interface takes less than 60 seconds. Simply tap "Report Lost Item" or "Report Found Item", select the approximate campus building or zone, snap or upload a photo, and add a brief 1-sentence note. You can return later to update details if needed.',
    },
    {
      question: 'Can I report a found item anonymously without sharing my identity?',
      answer: 'Yes! Finders can submit items anonymously or choose to receive "Good Samaritan" campus recognition credits. Either way, finders are never required to meet claimants directly in private spaces; all exchanges happen via authorized campus desks or public locker bays.',
    },
    {
      question: 'Is CampusFind free for all enrolled students, faculty, and university staff?',
      answer: 'Yes, 100% free! CampusFind is built specifically as a public university student welfare project. There are no fees to list, search, or verify ownership.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section section-padding" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="section-header">
          <div className="badge-pill badge-coral">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="heading-section">
            Frequently Asked <br />
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="subheading-section">
            Everything you need to know about reporting, claiming, security protocols, and item recovery across campus.
          </p>
        </div>

        <div className="faq-accordion-wrapper">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-btn-${index}`}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-chevron-icon">
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className="faq-answer-collapse"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="faq-support-box glass-panel">
          <div className="support-icon-wrap">
            <MessageCircle size={24} />
          </div>
          <div className="support-text">
            <h4>Still have questions or need immediate campus help?</h4>
            <p>Visit any of our 18 student union assistance desks or submit an inquiry to Campus Safety.</p>
          </div>
          <button onClick={() => onOpenReport('lost')} className="btn btn-secondary">
            File New Report
          </button>
        </div>
      </div>
    </section>
  );
}
