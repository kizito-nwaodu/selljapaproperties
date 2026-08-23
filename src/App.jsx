import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UrgentDealsSection } from './components/UrgentDealsSection';
import { Footer } from './components/Footer';

// Lazy loaded sub-hubs
const BundlesHub = lazy(() => import('./components/BundlesHub').then(m => ({ default: m.BundlesHub })));
const FastValuationCalculator = lazy(() => import('./components/FastValuationCalculator').then(m => ({ default: m.FastValuationCalculator })));
const GeoExplorer = lazy(() => import('./components/GeoExplorer').then(m => ({ default: m.GeoExplorer })));
const EscrowSafetyHub = lazy(() => import('./components/EscrowSafetyHub').then(m => ({ default: m.EscrowSafetyHub })));
const DiasporaHub = lazy(() => import('./components/DiasporaHub').then(m => ({ default: m.DiasporaHub })));
const ScoutNetworkHub = lazy(() => import('./components/ScoutNetworkHub').then(m => ({ default: m.ScoutNetworkHub })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));

// Lazy loaded Modals
const PropertyDetailModal = lazy(() => import('./components/PropertyDetailModal').then(m => ({ default: m.PropertyDetailModal })));
const SellerWizardModal = lazy(() => import('./components/SellerWizardModal').then(m => ({ default: m.SellerWizardModal })));
const AuthModal = lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const ChatModal = lazy(() => import('./components/ChatModal').then(m => ({ default: m.ChatModal })));
const CallModal = lazy(() => import('./components/CallModal').then(m => ({ default: m.CallModal })));
const ApiConsoleModal = lazy(() => import('./components/ApiConsoleModal').then(m => ({ default: m.ApiConsoleModal })));
const AccountDashboardModal = lazy(() => import('./components/AccountDashboardModal').then(m => ({ default: m.AccountDashboardModal })));

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
  
  // Modals state
  const [selectedListing, setSelectedListing] = useState(null);
  const [isSellerWizardOpen, setIsSellerWizardOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // login, register, scout
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isApiConsoleOpen, setIsApiConsoleOpen] = useState(false);
  const [activeCallSession, setActiveCallSession] = useState(null); // { partnerName, callType }

  // Sync listings with local storage
  useEffect(() => {
    try {
      localStorage.setItem('selljapa_listings', JSON.stringify(listings));
    } catch (e) {
      console.warn('Could not save listings to localStorage', e);
    }
  }, [listings]);

  // Handler to add a new confidential listing
  const handleAddListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]);
    setIsSellerWizardOpen(false);
  };

  // Auth Modal openers
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
    setIsDashboardOpen(false);
  };

  const handleUpdateUserRole = (newRole) => {
    const updated = authApi.updateRole(newRole);
    if (updated) {
      setCurrentUser({ ...updated });
      setUserPersona(newRole === 'relocator_seller' ? 'seller' : 'buyer');
    }
  };

  const handleStartChat = (listing) => {
    setSelectedListing(listing);
    setIsChatModalOpen(true);
  };

  const handleStartCall = (partnerName, callType = 'video') => {
    setActiveCallSession({ partnerName, callType });
  };

  const handleMarkListingSold = (listingId) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        return {
          ...item,
          status: 'Sold',
          badges: ['Escrow Released', 'Deal Completed']
        };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-[#060a08] text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Universal Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
        onOpenApiConsole={() => setIsApiConsoleOpen(true)}
        userPersona={userPersona}
        setUserPersona={setUserPersona}
      />

      {/* Main Dynamic Workspace / Tabs */}
      <main className="flex-1">
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-emerald-400"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div></div>}>
        
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

        {/* SCOUT NETWORK HUB TAB */}
        {activeTab === 'scouts' && (
          <ScoutNetworkHub
            selectedState={selectedState}
            onSelectState={(st) => setSelectedState(st)}
            onOpenSellerWizard={() => setIsSellerWizardOpen(true)}
            onBackToExplore={() => setActiveTab('explore')}
          />
        )}
        </Suspense>
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
      <Suspense fallback={null}>

      {/* 1. Property / Bundle Deal Room Detail Modal with Masked Details for Guests */}
      {selectedListing && (
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
      )}

      {/* 2. Seller Wizard Modal for Confidential Relocation Listing */}
      {isSellerWizardOpen && (
      <SellerWizardModal
        isOpen={isSellerWizardOpen}
        onClose={() => setIsSellerWizardOpen(false)}
        onAddListing={handleAddListing}
      />
      )}

      {/* 3. Authentication & SSO Modal (Google, Apple, Microsoft, Email, OTP) */}
      {isAuthModalOpen && (
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
      )}

      {/* 4. Encrypted Deal Chat Room */}
      {isChatModalOpen && (
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        initialListing={selectedListing}
        onStartCall={handleStartCall}
        currentUser={currentUser}
      />
      )}

      {/* 5. Live 4K WebRTC Video/Audio Property Inspection Simulator */}
      {activeCallSession && (
        <CallModal
          partnerName={activeCallSession.partnerName}
          callType={activeCallSession.callType}
          onClose={() => setActiveCallSession(null)}
        />
      )}

      {/* 6. Demo API Console & Network Inspector */}
      {isApiConsoleOpen && (
      <ApiConsoleModal
        isOpen={isApiConsoleOpen}
        onClose={() => setIsApiConsoleOpen(false)}
      />
      )}

      {/* 7. Dedicated Buyer vs Seller Account Dashboard Modal */}
      {isDashboardOpen && (
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
      )}
      </Suspense>

    </div>
  );
}

export default App;
