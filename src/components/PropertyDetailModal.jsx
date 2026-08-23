import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  DollarSign, 
  Calendar, 
  Lock, 
  User, 
  FileText, 
  PhoneCall, 
  Share2, 
  MessageSquare, 
  ArrowLeft, 
  UserCheck, 
  KeyRound, 
  EyeOff, 
  ShieldAlert,
  LayoutDashboard,
  CheckCheck,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXCHANGE_RATES } from '../data/mockData';

export function PropertyDetailModal({ 
  listing, 
  currency, 
  onClose, 
  onStartChat, 
  onStartCall, 
  currentUser, 
  onOpenAuth,
  onOpenDashboard 
}) {
  if (!listing) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [offerAmount, setOfferAmount] = useState(listing.priceNGN);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, bundle, inspection

  const isSellerUser = currentUser?.role === 'relocator_seller';
  const isBuyerUser = currentUser?.role === 'diaspora_investor';

  const curr = EXCHANGE_RATES[currency] || EXCHANGE_RATES.NGN;
  const convertedPrice = (listing.priceNGN / curr.rate).toLocaleString('en-US', { maximumFractionDigits: 0 });
  const convertedOriginal = (listing.originalValueNGN / curr.rate).toLocaleString('en-US', { maximumFractionDigits: 0 });
  const convertedOffer = (offerAmount / curr.rate).toLocaleString('en-US', { maximumFractionDigits: 0 });

  const handleMakeOffer = (e) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth('signup');
      return;
    }
    setOfferSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 60 });
    } catch (err) {}
  };

  const handleActionWithAuth = (callback) => {
    if (!currentUser) {
      onOpenAuth('login');
    } else {
      callback();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl glass-panel rounded-3xl bg-[#0a120e] border border-stone-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header with Prominent BACK Button */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#0d2319] to-emerald-950 px-4 sm:px-6 py-3 text-xs font-bold text-stone-200 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/90 text-stone-200 hover:text-amber-400 hover:bg-stone-800 border border-stone-700 transition-all cursor-pointer text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Deals</span>
            </button>

            {listing.isSold ? (
              <span className="inline-flex items-center gap-1 bg-red-600 text-white px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider font-extrabold shadow">
                🔴 SOLD & ESCROW SETTLED
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-600/90 text-white px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider font-extrabold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Relocation Asset</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!listing.isSold && (
              <div className="flex items-center gap-1 text-amber-400 font-extrabold">
                <Clock className="w-3.5 h-3.5" />
                <span>Target Close: {listing.targetClosingDays || 14} Days</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* SOLD BANNER IF PROPERTY HAS BEEN SOLD */}
          {listing.isSold && (
            <div className="bg-gradient-to-r from-red-950 via-stone-950 to-red-950 p-4 rounded-2xl border border-red-600/50 flex items-center justify-between gap-3 text-xs shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-base shrink-0 border border-red-600/40">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">This Asset Has Been Sold & Closed via Escrow</div>
                  <p className="text-stone-300 text-xs mt-0.5">
                    100% legal title transfer completed and seller settlement funds successfully disbursed.
                  </p>
                </div>
              </div>
              <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider shrink-0">
                Closed Deal
              </span>
            </div>
          )}

          {/* Guest Global Gated Alert Banner */}
          {!currentUser && !listing.isSold && (
            <div className="bg-gradient-to-r from-amber-950/90 via-[#1a1708] to-amber-950/90 p-4 rounded-2xl border-2 border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-2xl">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white flex items-center gap-2 justify-center sm:justify-start">
                    <span>🔒 House Details & Exact Address are Masked</span>
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-1.5 py-0.2 rounded uppercase">Protected</span>
                  </div>
                  <p className="text-xs text-stone-300 mt-0.5">
                    For seller privacy and security, specific house location, interior photos, and title deeds are strictly masked until you sign in.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="btn-gold py-2.5 px-5 text-xs font-extrabold shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-stone-950" />
                  <span>Sign In with SSO to Unlock</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Top Grid: Gallery & Action Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Main Image with Mask for Guests */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-800">
                <img
                  src={listing.images[activeImageIndex] || listing.images[0]}
                  alt={listing.title}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    !currentUser ? 'filter blur-md scale-105 opacity-60' : ''
                  }`}
                />

                {/* Sold Watermark Stamp */}
                {listing.isSold && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="border-4 border-red-600 text-red-500 font-black text-3xl sm:text-4xl px-8 py-3 rounded-2xl rotate-[-12deg] tracking-widest uppercase shadow-2xl bg-black/80">
                      SOLD VIA ESCROW
                    </div>
                  </div>
                )}

                {/* Mask Overlay on Photos for Unauthenticated Users */}
                {!currentUser && !listing.isSold && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-white">4K High-Res Photos & Video Walkthrough Locked</div>
                    <p className="text-xs text-stone-300 max-w-xs">
                      Sign in with Google, Apple, or Email to view full exterior and interior photo galleries.
                    </p>
                    <button
                      onClick={() => onOpenAuth('login')}
                      className="btn-gold py-1.5 px-4 text-xs font-bold mt-1"
                    >
                      Unlock Photo Gallery
                    </button>
                  </div>
                )}

                <div className="absolute top-3 left-3 flex gap-2">
                  {listing.category === 'bundle' && (
                    <span className="badge-bundle px-3 py-1 rounded-lg text-xs font-extrabold backdrop-blur-md">
                      ✨ Whole-House Bundle
                    </span>
                  )}
                  <span className="bg-stone-900/80 text-stone-200 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md">
                    {listing.state} State
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg shadow-lg">
                    -{listing.discountPercent}% Relocation Discount
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!currentUser) onOpenAuth('login');
                        else setActiveImageIndex(idx);
                      }}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className={`w-full h-full object-cover ${!currentUser ? 'filter blur-sm' : ''}`} />
                      {!currentUser && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-amber-300" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Deal Action Box (5 cols) */}
            <div className="lg:col-span-5 glass-panel-gold p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Escrow Protected Transaction</span>
                </div>

                <div className="text-xs text-stone-400 line-through">
                  Regular Market Valuation: {curr.symbol}{convertedOriginal}
                </div>
                <div className="text-3xl font-extrabold text-white font-display">
                  {curr.symbol}{convertedPrice}
                </div>
                <div className="text-[11px] text-amber-300 font-semibold mt-0.5">
                  Buyer Saves {curr.symbol}{((listing.originalValueNGN - listing.priceNGN) / curr.rate).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>

              {/* Seller Snapshot Box */}
              <div className="bg-black/50 p-3.5 rounded-xl border border-stone-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-stone-300 font-bold">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    {currentUser ? listing.sellerName : `[🔒 Masked Seller Name]`}
                  </span>
                  <span className="text-emerald-400 font-semibold">Verified Owner</span>
                </div>
                <div className="text-[11px] text-stone-400">
                  Profession: <span className="text-amber-300 font-semibold">{currentUser ? listing.sellerProfession : "[🔒 Masked - Sign In to View]"}</span>
                </div>
                <div className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Relocation: International Handover</span>
                </div>
              </div>

              {/* DISTINCT VIEW LOGIC: SELLER VS BUYER VS GUEST */}
              {isSellerUser ? (
                /* ================= SELLER VIEW (NO OFFER FORM) ================= */
                <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-500/40 space-y-2.5 text-xs text-left">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Viewing in Relocator Seller Mode</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    As a verified seller, you manage property listings, receive buyer escrow bids, and track payout releases in your dedicated dashboard.
                  </p>
                  <button
                    type="button"
                    onClick={() => { onClose(); onOpenDashboard(); }}
                    className="w-full btn-gold py-2.5 text-xs font-bold justify-center flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <LayoutDashboard className="w-4 h-4 text-stone-950" />
                    <span>Go to My Seller Dashboard & Payouts</span>
                  </button>
                </div>
              ) : isBuyerUser ? (
                /* ================= BUYER VIEW (OFFER & CHAT ALLOWED) ================= */
                !listing.isSold ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleActionWithAuth(() => onStartChat(listing))}
                        className="btn-secondary justify-center py-2 text-xs flex items-center gap-1 border-amber-500/40 text-amber-300 hover:bg-amber-950/40 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat With Seller</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleActionWithAuth(() => onStartCall(listing.sellerName, "video"))}
                        className="btn-emerald justify-center py-2 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Live Video Call</span>
                      </button>
                    </div>

                    {!offerSubmitted ? (
                      <form onSubmit={handleMakeOffer} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            Make an Urgent Purchase Offer (₦):
                          </label>
                          <input
                            type="number"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(Number(e.target.value))}
                            className="w-full bg-stone-900 border border-stone-700 text-amber-300 font-bold rounded-xl p-2.5 text-sm focus:outline-none"
                          />
                          <div className="text-[10px] text-stone-400 mt-1 flex justify-between">
                            <span>In {currency}: {curr.symbol}{convertedOffer}</span>
                            <span className="text-emerald-400">Escrow Hold: 10% Deposit</span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full btn-gold justify-center py-3 text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
                        >
                          <Lock className="w-4 h-4 text-stone-950" />
                          <span>Submit Offer & Lock Escrow Vault</span>
                        </button>
                      </form>
                    ) : (
                      <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/40 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                        <div className="text-xs font-bold text-white">Offer Received & Logged into Escrow!</div>
                        <p className="text-[10px] text-stone-300">
                          The seller and legal conveyancer have been notified. Check your Buyer Dashboard to track status.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-stone-900 p-4 rounded-xl text-center text-xs text-stone-400">
                    Offers closed for this sold listing.
                  </div>
                )
              ) : (
                /* ================= GUEST VIEW (PROMPT TO SIGN IN) ================= */
                !listing.isSold ? (
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={() => onOpenAuth('signup')}
                      className="w-full btn-gold justify-center py-3 text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-stone-950" />
                      <span>Sign In as Buyer to Make Offer</span>
                    </button>
                    <p className="text-center text-[10px] text-stone-400">
                      Create free account with Google SSO in 5 seconds.
                    </p>
                  </div>
                ) : (
                  <div className="bg-stone-900 p-4 rounded-xl text-center text-xs text-stone-400">
                    This property has been sold via SellJapa Escrow.
                  </div>
                )
              )}

            </div>

          </div>

          {/* Navigation Tabs for Property Detail */}
          <div className="border-b border-stone-800 flex gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 transition-all cursor-pointer ${
                activeTab === 'overview' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-stone-400 hover:text-white'
              }`}
            >
              Description & Details
            </button>
            {listing.bundledItems && listing.bundledItems.length > 0 && (
              <button
                onClick={() => setActiveTab('bundle')}
                className={`pb-2 transition-all flex items-center gap-1 cursor-pointer ${
                  activeTab === 'bundle' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                Whole-House Bundle Inventory ({listing.bundledItems.length})
                {!currentUser && <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">Locked</span>}
              </button>
            )}
            <button
              onClick={() => setActiveTab('inspection')}
              className={`pb-2 transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === 'inspection' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-stone-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              Inspection & Title Scorecard ({listing.inspectionScore}%)
              {!currentUser && <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 rounded">Locked</span>}
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-300">
              
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {currentUser ? listing.title : `[🔒 Masked Relocation Asset] - Verified in ${listing.state} State`}
                </h3>

                {/* Location: Fully Masked */}
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-3 bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  {currentUser ? (
                    <span className="font-bold text-stone-200">{listing.location}</span>
                  ) : (
                    <span className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{listing.state} State • [🔒 Exact Area, Estate & House Address Masked — Sign In to View]</span>
                    </span>
                  )}
                </div>

                {/* Description: Masked with Teaser Overlay for Guests */}
                <div className="relative rounded-xl overflow-hidden">
                  <p className={`leading-relaxed bg-stone-900/60 p-4 rounded-xl border border-stone-800 ${
                    !currentUser ? 'filter blur-md select-none' : ''
                  }`}>
                    {listing.description}
                  </p>

                  {!currentUser && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center rounded-xl border border-stone-800">
                      <Lock className="w-5 h-5 text-amber-400 mb-1" />
                      <div className="text-xs font-bold text-white">Full Property Description Masked</div>
                      <p className="text-[11px] text-stone-400 max-w-sm mt-0.5">
                        Create an account or sign in to read the full description and structural report.
                      </p>
                      <button
                        onClick={() => onOpenAuth('login')}
                        className="btn-gold py-1.5 px-4 text-xs font-bold mt-2"
                      >
                        Sign In to Unlock Description
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Key Features:</h4>
                <div className="relative">
                  <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 ${
                    !currentUser ? 'filter blur-sm select-none' : ''
                  }`}>
                    {listing.features.map((feat, idx) => (
                      <div key={idx} className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-xs text-stone-200">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {!currentUser && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-xl border border-stone-800">
                      <span className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Sign In with SSO to View Complete Property Feature List</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Whole-House Bundle Inventory */}
          {activeTab === 'bundle' && (
            <div className="space-y-4 relative">
              <div className="bg-amber-950/30 p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-200">
                <strong>Whole-House Bundle Advantage:</strong> Take over house, car, solar power setup, and home furnishings in one single closing.
              </div>

              <div className={!currentUser ? "filter blur-md select-none pointer-events-none space-y-2" : "space-y-2"}>
                {listing.bundledItems.map((b, idx) => (
                  <div key={idx} className="glass-panel p-3.5 rounded-xl border-stone-800 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      {b.item}
                    </span>
                    <span className="font-bold text-amber-400 bg-black/40 px-3 py-1 rounded-lg border border-stone-800">
                      Standalone: {b.individualValue}
                    </span>
                  </div>
                ))}
              </div>

              {!currentUser && (
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-md rounded-2xl border border-amber-500/40 text-center space-y-2">
                  <Lock className="w-6 h-6 text-amber-400" />
                  <div className="text-sm font-bold text-white">Full Bundle Itemized Inventory Masked</div>
                  <p className="text-xs text-stone-300 max-w-sm">
                    Sign in with SSO to view individual asset valuations and specifications.
                  </p>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="btn-gold py-2 px-6 text-xs font-bold cursor-pointer"
                  >
                    Unlock Full Inventory &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Inspection & Title Scorecard */}
          {activeTab === 'inspection' && (
            <div className="space-y-4 text-xs relative">
              <div className={!currentUser ? "filter blur-md select-none pointer-events-none space-y-4" : "space-y-4"}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                    <div className="text-2xl font-extrabold text-emerald-400">{listing.inspectionScore}%</div>
                    <div className="text-[11px] text-stone-400 mt-1">Field Surveyor Quality Score</div>
                  </div>
                  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                    <div className="text-sm font-bold text-white">{listing.verifiedTitle}</div>
                    <div className="text-[11px] text-stone-400 mt-1">Government Registered Title</div>
                  </div>
                  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-center">
                    <div className="text-sm font-bold text-emerald-400">Zero Encumbrance</div>
                    <div className="text-[11px] text-stone-400 mt-1">Ministry of Lands Cleared</div>
                  </div>
                </div>

                <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Certified Inspection Summary Report:</span>
                  </div>
                  <ul className="space-y-1 text-stone-300 pl-4 list-disc">
                    <li>Structural integrity, foundation, and roof verified sound by registered Nigerian civil surveyor.</li>
                    <li>Title document inspected and confirmed matching owner identity on international passport.</li>
                    <li>No pending estate inheritance litigation or community issues.</li>
                    <li>Solar inverter load test and vehicle engine diagnosis passed.</li>
                  </ul>
                </div>
              </div>

              {!currentUser && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-md rounded-2xl border border-emerald-500/40 text-center space-y-2 z-10">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  <div className="text-sm font-bold text-white">Certified Surveyor & Legal Search Report Masked</div>
                  <p className="text-xs text-stone-300 max-w-sm">
                    Sign in with Google, Apple SSO or Email to download the legal inspection certificate.
                  </p>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="btn-emerald py-2 px-6 text-xs font-bold cursor-pointer"
                  >
                    Sign In to Unlock Full Legal Report &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
