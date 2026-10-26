import React from 'react';
import { X, MapPin, Calendar, ShieldCheck, Tag, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ItemDetailModal({ item, onClose, onVerifyItem }) {
  if (!item) return null;

  const isFound = item.type === 'Found';

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="item-modal-title">
      <div className="dialog-content item-detail-modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className={`item-type-badge ${isFound ? 'badge-found' : 'badge-lost'}`}>
              {item.type} Item
            </span>
            <span className="item-id-badge">{item.id}</span>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close item details modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-item-detail-body">
          <span className="item-category-tag">{item.category}</span>
          <h3 id="item-modal-title" className="modal-item-title">{item.title}</h3>

          <p className="modal-item-description">{item.description}</p>

          {/* Metadata Grid */}
          <div className="detail-meta-box glass-panel">
            <div className="meta-detail-row">
              <MapPin size={18} className="icon-coral" />
              <div>
                <span className="detail-label">Current Custody Location</span>
                <strong className="detail-val">{item.location}</strong>
              </div>
            </div>

            <div className="meta-detail-row">
              <Calendar size={18} className="icon-violet" />
              <div>
                <span className="detail-label">Reported Timestamp</span>
                <strong className="detail-val">{item.date}</strong>
              </div>
            </div>

            <div className="meta-detail-row">
              <ShieldCheck size={18} className="icon-mint" />
              <div>
                <span className="detail-label">Current Security Status</span>
                <strong className="detail-val">{item.status}</strong>
              </div>
            </div>
          </div>

          {/* Campus Pickup Safe Protocol Note */}
          <div className="pickup-protocol-callout">
            <Building2 size={20} className="icon-violet" />
            <div>
              <strong>Authorized Hand-off Hub</strong>
              <p>
                To recover this item, initiate an ownership challenge. Upon verification, you will receive a secure QR Claim Pass to present to campus staff.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="detail-modal-actions">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>

            {isFound ? (
              <button
                onClick={() => {
                  onClose();
                  onVerifyItem(item);
                }}
                className="btn btn-primary"
              >
                <ShieldCheck size={18} />
                <span>Verify Ownership & Claim</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  // open found report
                  alert('Thank you! Please file a Found Report to register that you discovered this item.');
                }}
                className="btn btn-coral"
              >
                <CheckCircle2 size={18} />
                <span>I Found This Belonging</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
