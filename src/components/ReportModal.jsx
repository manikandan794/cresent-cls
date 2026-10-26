import React, { useState } from 'react';
import { X, PlusCircle, Upload, CheckCircle2, AlertCircle, MapPin, Tag, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportModal({ isOpen, onClose, initialType = 'lost', onAddItem }) {
  if (!isOpen) return null;

  const [itemType, setItemType] = useState(initialType === 'found' ? 'Found' : 'Lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [location, setLocation] = useState('Central Library — 2nd Floor Study Room');
  const [dateStr, setDateStr] = useState('Today, Just now');
  const [description, setDescription] = useState('');
  const [secretHint, setSecretHint] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const campusLocations = [
    'Central Library — 2nd Floor Study Room',
    'Student Union Cafeteria',
    'Science Complex — Courtyard Benches',
    'Engineering Pavilion — Lab 304',
    'Athletic Center — Locker Room Bleachers',
    'Lecture Hall B — Auditorium',
    'West Student Parking Lot — Near Gate 3',
    'Dining Commons North',
    'Other / Custom Campus Location',
  ];

  const categories = ['Electronics', 'IDs & Cards', 'Bags', 'Essentials', 'Study Materials', 'Keys', 'Clothing & Accessories'];

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Please enter an item title or name.';
    if (!description.trim()) errs.description = 'Please provide a brief visual description.';
    if (!location.trim()) errs.location = 'Please select or specify a campus location.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newItem = {
      id: `CF-${Math.floor(1090 + Math.random() * 800)}`,
      title,
      type: itemType,
      category,
      location,
      date: dateStr,
      description,
      secretHint: secretHint || 'No specific confidential marker provided',
      status: itemType === 'Found' ? 'Secured by Student Finder' : 'Actively Searching',
      colorTag: itemType === 'Found' ? 'mint' : 'coral',
      badgeText: itemType === 'Found' ? 'Newly Reported Found' : 'Newly Reported Lost',
    };

    onAddItem(newItem);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#7C3AED', '#FB7185', '#6EE7B7', '#FDBA9A'],
      });
    } catch (err) {}
  };

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="report-modal-title">
      <div className="dialog-content report-modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="badge-pill badge-hero">
              <Sparkles size={14} />
              <span>Campus Registry</span>
            </div>
            <h3 id="report-modal-title">
              {submitted ? 'Report Successfully Registered!' : `Report ${itemType === 'Lost' ? 'Lost Item' : 'Found Item'}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close report modal"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="icon-emerald" />
            </div>
            <h4>Listing Active in Campus Directory</h4>
            <p>
              Your report has been indexed. Fellow students and campus safety desks can now cross-reference this item with our automated verification system.
            </p>
            <div className="success-demo-callout">
              <AlertCircle size={16} />
              <span>Notice: Added to your active browser session directory. Data is not sent to external servers.</span>
            </div>
            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
            >
              Done & View in Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="report-form">
            {/* Toggle Lost vs Found */}
            <div className="report-type-toggle" role="radiogroup" aria-label="Select report type">
              <button
                type="button"
                onClick={() => setItemType('Lost')}
                className={`type-toggle-btn ${itemType === 'Lost' ? 'active-lost' : ''}`}
                role="radio"
                aria-checked={itemType === 'Lost'}
              >
                I Lost Something
              </button>
              <button
                type="button"
                onClick={() => setItemType('Found')}
                className={`type-toggle-btn ${itemType === 'Found' ? 'active-found' : ''}`}
                role="radio"
                aria-checked={itemType === 'Found'}
              >
                I Found Something
              </button>
            </div>

            {/* Title */}
            <div className="form-group">
              <label htmlFor="report-title" className="form-label">
                Item Name / Title *
              </label>
              <input
                id="report-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sony WH-1000XM5 Headphones (Silver)"
                className={`form-input ${errors.title ? 'input-error' : ''}`}
                required
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            {/* Category & Date */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="report-category" className="form-label">Category</label>
                <select
                  id="report-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="report-date" className="form-label">Date & Time</label>
                <input
                  id="report-date"
                  type="text"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Today, 3:30 PM"
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="report-location" className="form-label">Campus Location *</label>
              <select
                id="report-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-select"
              >
                {campusLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="report-desc" className="form-label">Visual Description *</label>
              <textarea
                id="report-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Color, brand, key marks, case design, approximate condition..."
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                required
              />
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>

            {/* Confidential Proof Identifier */}
            <div className="form-group challenge-input-box">
              <div className="challenge-label-row">
                <label htmlFor="report-hint" className="form-label challenge-label">
                  <ShieldCheck size={16} />
                  <span>Confidential Proof Marker (Zero-Knowledge)</span>
                </label>
                <span className="hint-pill">Hidden from public view</span>
              </div>
              <input
                id="report-hint"
                type="text"
                value={secretHint}
                onChange={(e) => setSecretHint(e.target.value)}
                placeholder="e.g. Serial prefix, lock-screen initials, custom sticker underneath..."
                className="form-input"
              />
              <span className="input-hint">
                Used to verify rightful ownership when a claim is initiated.
              </span>
            </div>

            {/* Simulated Photo Upload */}
            <div className="form-group">
              <label className="form-label">Photo Upload (Optional)</label>
              <label className="photo-upload-dropzone">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden-file-input"
                  aria-label="Upload photo of item"
                />
                {photoPreview ? (
                  <div className="photo-preview-wrapper">
                    <img src={photoPreview} alt="Item preview" className="photo-preview-img" />
                    <span className="photo-change-text">Click to change photo</span>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <Upload size={24} className="icon-violet" />
                    <span>Click or drag image to attach photo</span>
                    <span className="upload-subtext">JPG, PNG, WebP up to 10MB</span>
                  </div>
                )}
              </label>
            </div>

            {/* Actions */}
            <div className="modal-actions-row">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <span>Submit {itemType} Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
