import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UrgentDealsSection } from './components/UrgentDealsSection';
import { BundlesHub } from './components/BundlesHub';
import { FastValuationCalculator } from './components/FastValuationCalculator';
import { GeoExplorer } from './components/GeoExplorer';
import { EscrowSafetyHub } from './components/EscrowSafetyHub';
import { DiasporaHub } from './components/DiasporaHub';
import { ScoutNetworkHub } from './components/ScoutNetworkHub';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

// Modals
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { SellerWizardModal } from './components/SellerWizardModal';
import { AuthModal } from './components/AuthModal';
import { ChatModal } from './components/ChatModal';
import { CallModal } from './components/CallModal';
import { ApiConsoleModal } from './components/ApiConsoleModal';
import { AccountDashboardModal } from './components/AccountDashboardModal';

// Mock Data & Services
import { JAPA_LISTINGS } from './data/mockData';
import { authApi } from './services/api';

export function App() {
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('selljapa_listings');
      return saved ? JSON.parse(saved) : JAPA_LISTINGS;
    } catch {
      return JAPA_LISTINGS;
    }
  });

  const [activeTab, setActiveTab] = useState('explore'); // explore, bundles, calculator, escrow, diaspora, scouts
  const [userPersona, setUserPersona] = useState('seller'); // seller, buyer
  const [selectedState, setSelectedState] = useState("All 36 States + FCT");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('NGN');

  // Active User Auth State
  const [currentUser, setCurrentUser] = useState(() => authApi.getCurrentUser());

  // Modal State Controls
  const [selectedListing, setSelectedListing] = useState(null);
  const [isSellerWizardOpen, setIsSellerWizardOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'signup'
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isApiConsoleOpen, setIsApiConsoleOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Active Call State
  const [activeCallSession, setActiveCallSession] = useState(null);

  // Sync listings to local storage
  useEffect(() => {
    try {
      localStorage.setItem('selljapa_listings', JSON.stringify(listings));
    } catch (err) {
      console.error(err);
    }
  }, [listings]);

  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const handleMarkListingSold = (listingId) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        return { ...item, isSold: true, status: 'SOLD VIA ESCROW' };
      }
      return item;
    }));
  };

  const handleStartChat = (listing) => {
    setSelectedListing(null);
    setIsChatModalOpen(true);
  };

  const handleStartCall = (partnerName, callType = "video") => {
    setActiveCallSession({
      partnerName: partnerName || "Relocation Seller",
      callType: callType || "video"
    });
  };

  const handleUpdateUserRole = (newRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    localStorage.setItem('selljapa_current_user', JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await authApi.logout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#050a08] text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Navbar */}
      <Navbar
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        currency={currency}
        setCurrency={setCurrency}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
        onOpenApiConsole={() => setIsApiConsoleOpen(true)}
        onOpenChat={() => setIsChatModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Dynamic Workspace / Tabs */}
      <main className="flex-1">
        
        {/* EXPLORE / HOME TAB */}
        {activeTab === 'explore' && (
          <>
            <HeroSection
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
              userPersona={userPersona}
              setUserPersona={setUserPersona}
              onExploreClick={() => {
                const el = document.getElementById('marketplace-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCalculator={() => setActiveTab('calculator')}
              onOpenScoutHub={() => setActiveTab('scouts')}
              onOpenAuth={handleOpenAuth}
              currentUser={currentUser}
            />

            <div id="marketplace-grid">
              <UrgentDealsSection
                listings={listings}
                currency={currency}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectListing={(listing) => setSelectedListing(listing)}
                onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
              />
            </div>

            <GeoExplorer
              selectedState={selectedState}
              setSelectedState={(st) => {
                setSelectedState(st);
                const el = document.getElementById('marketplace-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <TestimonialsSection onOpenSellerWizard={() => setIsSellerWizardOpen(true)} />
          </>
        )}

        {/* WHOLE-HOUSE BUNDLES TAB */}
        {activeTab === 'bundles' && (
          <BundlesHub
            listings={listings}
            currency={currency}
            onSelectListing={(listing) => setSelectedListing(listing)}
            onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}

        {/* FAST VALUATION CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <FastValuationCalculator
            currency={currency}
            onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}

        {/* ESCROW & SAFETY HUB TAB */}
        {activeTab === 'escrow' && (
          <EscrowSafetyHub
            onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}

        {/* DIASPORA BUYERS LOUNGE TAB */}
        {activeTab === 'diaspora' && (
          <DiasporaHub
            currency={currency}
            setCurrency={setCurrency}
            onExploreClick={() => setActiveTab('explore')}
            onBackToExplore={() => setActiveTab('explore')}
            onStartCall={handleStartCall}
          />
        )}

        {/* CERTIFIED SCOUT NETWORK TAB */}
        {activeTab === 'scouts' && (
          <ScoutNetworkHub
            currency={currency}
            selectedState={selectedState}
            onSelectState={(st) => setSelectedState(st)}
            onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectState={(st) => {
          setSelectedState(st);
          setActiveTab('explore');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* 1. Property / Bundle Deal Room Detail Modal with Masked Details for Guests */}
      <PropertyDetailModal
        listing={selectedListing}
        currency={currency}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onClose={() => setSelectedListing(null)}
        onStartChat={handleStartChat}
        onStartCall={handleStartCall}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* 2. Seller Wizard Modal for Confidential Relocation Listing */}
      <SellerWizardModal
        isOpen={isSellerWizardOpen}
        onClose={() => setIsSellerWizardOpen(false)}
        onAddListing={handleAddListing}
      />

      {/* 3. Authentication & SSO Modal (Google, Apple, Microsoft, Email, OTP) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setUserPersona(user.role === 'relocator_seller' ? 'seller' : 'buyer');
          setIsDashboardOpen(true);
        }}
      />

      {/* 4. Encrypted Deal Chat Room */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        initialListing={selectedListing}
        onStartCall={handleStartCall}
        currentUser={currentUser}
      />

      {/* 5. Live 4K WebRTC Video/Audio Property Inspection Simulator */}
      {activeCallSession && (
        <CallModal
          partnerName={activeCallSession.partnerName}
          callType={activeCallSession.callType}
          onClose={() => setActiveCallSession(null)}
        />
      )}

      {/* 6. Demo API Console & Network Inspector */}
      <ApiConsoleModal
        isOpen={isApiConsoleOpen}
        onClose={() => setIsApiConsoleOpen(false)}
      />

      {/* 7. Dedicated Buyer vs Seller Account Dashboard Modal */}
      <AccountDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUser={currentUser}
        onUpdateUserRole={handleUpdateUserRole}
        onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
        onSelectListing={(listing) => setSelectedListing(listing)}
        listings={listings}
        currency={currency}
        onStartCall={handleStartCall}
        onLogout={handleLogout}
        onMarkListingSold={handleMarkListingSold}
      />

    </div>
  );
}

export default App;
