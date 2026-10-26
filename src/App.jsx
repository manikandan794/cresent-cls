import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CinematicHero from './components/CinematicHero';
import IntroSection from './components/IntroSection';
import FeatureShowcase from './components/FeatureShowcase';
import HowItWorks from './components/HowItWorks';
import ItemGallery, { INITIAL_DEMO_ITEMS } from './components/ItemGallery';
import VerificationSection from './components/VerificationSection';
import CommunitySection from './components/CommunitySection';
import AboutSection from './components/AboutSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

import ReportModal from './components/ReportModal';
import AuthModal from './components/AuthModal';
import ItemDetailModal from './components/ItemDetailModal';

export default function App() {
  const [items, setItems] = useState(INITIAL_DEMO_ITEMS);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportInitialType, setReportInitialType] = useState('lost');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [verifyPreselectedItem, setVerifyPreselectedItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Open Report Modal
  const handleOpenReport = (type = 'lost') => {
    setReportInitialType(type);
    setReportModalOpen(true);
  };

  // Open Auth Modal
  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  // Add Item callback from ReportModal
  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  // Start verification from card
  const handleStartVerifyItem = (item) => {
    setVerifyPreselectedItem(item);
    scrollToSection('verify');
  };

  return (
    <div className="campusfind-app">
      {/* 1. Fixed Top Navbar */}
      <Navbar
        onOpenReport={handleOpenReport}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
      />

      <main id="main-content">
        {/* 2. Scroll-Controlled Cinematic Hero */}
        <CinematicHero
          onOpenReport={handleOpenReport}
          onBrowseItems={() => scrollToSection('gallery')}
        />

        {/* 3. Lost and Found Introduction */}
        <IntroSection
          onOpenReport={handleOpenReport}
          onBrowseItems={() => scrollToSection('gallery')}
        />

        {/* 4. Feature Showcase */}
        <FeatureShowcase
          onOpenReport={handleOpenReport}
          onBrowseItems={() => scrollToSection('gallery')}
          onNavigateVerify={() => scrollToSection('verify')}
        />

        {/* 5. How It Works */}
        <HowItWorks
          onOpenReport={handleOpenReport}
          onNavigateVerify={() => scrollToSection('verify')}
        />

        {/* 6. Explore Lost and Found Items Gallery */}
        <ItemGallery
          items={items}
          onSelectItem={(item) => setSelectedDetailItem(item)}
          onStartVerifyItem={handleStartVerifyItem}
          onOpenReport={handleOpenReport}
        />

        {/* 7. Ownership Verification Simulator */}
        <VerificationSection
          preselectedItem={verifyPreselectedItem}
          onResetPreselected={() => setVerifyPreselectedItem(null)}
        />

        {/* 8. Campus Community */}
        <CommunitySection
          onOpenReport={handleOpenReport}
          onBrowseItems={() => scrollToSection('gallery')}
        />

        {/* 9. About CampusFind */}
        <AboutSection />

        {/* 10. FAQ Accordion */}
        <FaqSection onOpenReport={handleOpenReport} />
      </main>

      {/* 11. Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenReport={handleOpenReport}
        onOpenAuth={handleOpenAuth}
      />

      {/* Interactive Modals */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        initialType={reportInitialType}
        onAddItem={handleAddItem}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onVerifyItem={handleStartVerifyItem}
      />
    </div>
  );
}
