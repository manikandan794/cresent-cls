import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Tag, ShieldCheck, Eye, PlusCircle, ArrowUpDown, CheckCircle, AlertCircle } from 'lucide-react';

export const INITIAL_DEMO_ITEMS = [
  {
    id: 'CF-1082',
    title: 'Student ID Card — Engineering Faculty',
    type: 'Found',
    category: 'IDs & Cards',
    location: 'Central Library — 2nd Floor Silent Study',
    date: 'Today, 2:15 PM',
    description: 'Gold-stripe university student badge belonging to "Jane D." Found on table near window overlooking Quad.',
    colorTag: 'violet',
    secretHint: 'Last 3 digits of student matriculation ID',
    status: 'In Campus Locker #14',
    iconBg: '#EDE9FE',
    badgeText: 'Awaiting Owner',
  },
  {
    id: 'CF-1083',
    title: 'The North Face Sage Green Backpack',
    type: 'Lost',
    category: 'Bags',
    location: 'Science Complex — Courtyard Benches',
    date: 'Yesterday, 5:30 PM',
    description: '28L water-resistant backpack containing biochemistry textbooks and a pastel pink pencil pouch.',
    colorTag: 'coral',
    secretHint: 'Specific keychain plushie attached to front zipper',
    status: 'Actively Searching',
    iconBg: '#FFE4E6',
    badgeText: 'Lost Alert',
  },
  {
    id: 'CF-1084',
    title: 'Apple iPhone 15 Pro — Natural Titanium',
    type: 'Found',
    category: 'Electronics',
    location: 'Student Union Cafeteria — Booth 8',
    date: 'Today, 11:45 AM',
    description: 'Enclosed in a translucent lilac shockproof case. Screen wallpaper shows a golden retriever.',
    colorTag: 'mint',
    secretHint: 'Lock-screen notification initials & passcode pattern',
    status: 'Secured at Union Info Desk',
    iconBg: '#D1FAE5',
    badgeText: 'Secured at Desk',
  },
  {
    id: 'CF-1085',
    title: 'Hydro Flask 32oz Wide Mouth — Coral Pink',
    type: 'Found',
    category: 'Essentials',
    location: 'Athletic Center — Weight Room Bleachers',
    date: 'Oct 25, 4:20 PM',
    description: 'Features several national park stickers (Yosemite & Zion) and a silicone boot protector on the base.',
    colorTag: 'peach',
    secretHint: 'Specific sticker placed underneath the boot cover',
    status: 'In Gym Front Desk Bin',
    iconBg: '#FED7AA',
    badgeText: 'Claim Available',
  },
  {
    id: 'CF-1086',
    title: 'Organic Chemistry II Spiral Notebook',
    type: 'Lost',
    category: 'Study Materials',
    location: 'Lecture Hall B — Row 14 Seat 6',
    date: 'Oct 24, 1:10 PM',
    description: 'Thick 200-page blue spiral notebook with detailed multi-colored handwritten reaction mechanisms for Exam 2.',
    colorTag: 'violet',
    secretHint: 'Name written on inner back cover margin',
    status: 'Actively Searching',
    iconBg: '#EDE9FE',
    badgeText: 'Critical Lost Item',
  },
  {
    id: 'CF-1087',
    title: 'Subaru Key Fob with Brass House Keys',
    type: 'Found',
    category: 'Keys',
    location: 'West Student Parking Lot — Near Gate 3',
    date: 'Oct 24, 6:45 PM',
    description: 'Black electronic key fob attached to a distinctive woven lavender university lanyard with three brass keys.',
    colorTag: 'coral',
    secretHint: 'Brand stamp on the small brass padlock key',
    status: 'Secured at Campus Security HQ',
    iconBg: '#FFE4E6',
    badgeText: 'Safe Custody',
  },
];

export default function ItemGallery({
  items = INITIAL_DEMO_ITEMS,
  onSelectItem,
  onStartVerifyItem,
  onOpenReport
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All'); // All, Lost, Found
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'IDs & Cards', 'Bags', 'Essentials', 'Study Materials', 'Keys'];

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'All' || item.type === selectedType;
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [items, searchTerm, selectedType, selectedCategory]);

  return (
    <section id="gallery" className="gallery-section section-padding" aria-label="Explore Lost and Found Items">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <Tag size={14} />
            <span>Interactive Campus Registry</span>
          </div>
          <h2 className="heading-section">
            Explore Lost & Found <br />
            <span className="text-gradient">Campus Directory</span>
          </h2>
          <p className="subheading-section">
            Browse through active reports across campus. Click any item to inspect its custody location or initiate a confidential ownership claim challenge.
          </p>

          <div className="demo-notice-pill" role="note">
            <span className="notice-dot" />
            <span>Interactive UI/UX Prototype • Displays simulated university demo listings</span>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="gallery-controls-card glass-panel">
          <div className="controls-top-row">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items by keyword, location, or ID (e.g. 'iPhone', 'Library', 'Keys')..."
                className="gallery-search-input"
                aria-label="Search directory listings"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="search-clear-btn"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Type Filter Buttons (All / Lost / Found) */}
            <div className="type-filter-group" role="tablist" aria-label="Filter by listing type">
              <button
                role="tab"
                aria-selected={selectedType === 'All'}
                onClick={() => setSelectedType('All')}
                className={`type-tab-btn ${selectedType === 'All' ? 'active' : ''}`}
              >
                All Items ({items.length})
              </button>
              <button
                role="tab"
                aria-selected={selectedType === 'Lost'}
                onClick={() => setSelectedType('Lost')}
                className={`type-tab-btn ${selectedType === 'Lost' ? 'active' : ''}`}
              >
                Lost Items
              </button>
              <button
                role="tab"
                aria-selected={selectedType === 'Found'}
                onClick={() => setSelectedType('Found')}
                className={`type-tab-btn ${selectedType === 'Found' ? 'active' : ''}`}
              >
                Found Items
              </button>
            </div>
          </div>

          {/* Category Pills Row */}
          <div className="category-pills-row" role="group" aria-label="Filter by category">
            <span className="category-label">
              <Filter size={14} />
              <span>Category:</span>
            </span>
            <div className="category-scroll-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredItems.length === 0 ? (
          <div className="empty-state-card glass-panel">
            <AlertCircle size={48} className="empty-icon" />
            <h3>No matching items found</h3>
            <p>Try refining your search terms or resetting the category filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedType('All');
              }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => {
              const isFound = item.type === 'Found';
              return (
                <article key={item.id} className="glass-card item-card" tabIndex={0}>
                  {/* Card Header */}
                  <div className="item-card-header">
                    <span className={`item-type-badge ${isFound ? 'badge-found' : 'badge-lost'}`}>
                      {item.type}
                    </span>
                    <span className="item-id-badge">{item.id}</span>
                  </div>

                  {/* Title & Category */}
                  <div className="item-card-body">
                    <span className="item-category-tag">{item.category}</span>
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-desc">{item.description}</p>
                  </div>

                  {/* Metadata: Location, Date, Status */}
                  <div className="item-card-meta">
                    <div className="meta-row">
                      <MapPin size={15} className="meta-icon" />
                      <span className="meta-text">{item.location}</span>
                    </div>
                    <div className="meta-row">
                      <Calendar size={15} className="meta-icon" />
                      <span className="meta-text">{item.date}</span>
                    </div>
                    <div className="meta-status-pill">
                      <ShieldCheck size={14} />
                      <span>{item.status}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="item-card-actions">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="btn btn-secondary btn-item-details"
                      aria-label={`View full details for ${item.title}`}
                    >
                      <Eye size={16} />
                      <span>Inspect Details</span>
                    </button>

                    {isFound ? (
                      <button
                        onClick={() => onStartVerifyItem(item)}
                        className="btn btn-primary btn-item-claim"
                        aria-label={`Verify ownership and claim ${item.title}`}
                      >
                        <ShieldCheck size={16} />
                        <span>Verify & Claim</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenReport('found')}
                        className="btn btn-coral btn-item-claim"
                        aria-label={`Report I Found this item: ${item.title}`}
                      >
                        <CheckCircle size={16} />
                        <span>I Found This</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Banner to Add Item */}
        <div className="gallery-bottom-cta glass-panel">
          <div className="cta-left">
            <PlusCircle size={28} className="cta-icon" />
            <div>
              <h4>Don't see your item in the registry?</h4>
              <p>File an instant report and our automated matching algorithm will alert you the moment a matching belonging is registered.</p>
            </div>
          </div>
          <div className="cta-right">
            <button
              onClick={() => onOpenReport('lost')}
              className="btn btn-primary"
            >
              Report Lost Belonging
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
