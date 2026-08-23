import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Building2, 
  PlusCircle, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Video, 
  FileText, 
  Lock, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Eye, 
  Flame, 
  Landmark, 
  CheckCheck,
  Percent,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXCHANGE_RATES } from '../data/mockData';

export function AccountDashboardModal({
  isOpen,
  onClose,
  currentUser,
  onOpenSellerWizard,
  onSelectListing,
  listings,
  currency,
  onStartCall,
  onLogout,
  onMarkListingSold
}) {
  if (!isOpen || !currentUser) return null;

  const isSeller = currentUser.role === 'relocator_seller';
  const [activeTab, setActiveTab] = useState(isSeller ? 'my_listings' : 'my_offers');
  
  // Track accepted offers and released escrow statuses
  const [offerStatuses, setOfferStatuses] = useState({
    "off-001": { status: "pending", stage: 1 },
    "off-002": { status: "pending", stage: 1 }
  });

  const [totalSettledBalance, setTotalSettledBalance] = useState(180000000);

  const curr = EXCHANGE_RATES[currency] || EXCHANGE_RATES.NGN;

  // Filter listings
  const sellerListings = listings.slice(0, 3);
  const savedDeals = listings.slice(1, 4);

  const handleAcceptOffer = (offerId) => {
    setOfferStatuses(prev => ({
      ...prev,
      [offerId]: { status: "accepted", stage: 2 }
    }));
    try {
      confetti({ particleCount: 80, spread: 60 });
    } catch (err) {}
  };

  const handleReleaseEscrowFunds = (offerId, listingId, amount, scoutPercent = 2) => {
    const netPayout = amount - ((amount * scoutPercent) / 100);
    setOfferStatuses(prev => ({
      ...prev,
      [offerId]: { status: "released", stage: 3, netPayout }
    }));
    setTotalSettledBalance(prev => prev + netPayout);

    try {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    } catch (err) {}

    // Automatically mark the listing as SOLD across the entire platform!
    if (onMarkListingSold) {
      onMarkListingSold(listingId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl glass-panel rounded-3xl bg-[#09120e] border border-stone-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header with Profile Info */}
        <div className="bg-[#0e1a14] px-4 sm:px-6 py-4 border-b border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">{currentUser.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                  isSeller ? 'bg-amber-500 text-stone-950 shadow-sm' : 'bg-emerald-600 text-white shadow-sm'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isSeller ? "Relocator (Seller Portal)" : "Verified Buyer / Investor Portal"}</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800 cursor-pointer transition-colors"
              title="Close Dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-[#0b1611] px-4 sm:px-6 border-b border-stone-800 flex overflow-x-auto gap-2 py-2 text-xs font-bold">
          {isSeller ? (
            /* SELLER TABS */
            <>
              <button
                onClick={() => setActiveTab('my_listings')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'my_listings' ? 'bg-amber-500 text-stone-950 font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>My Relocation Listings ({sellerListings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('received_offers')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'received_offers' ? 'bg-amber-500 text-stone-950 font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Received Escrow Offers (2)</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              </button>

              <button
                onClick={() => setActiveTab('escrow_payouts')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'escrow_payouts' ? 'bg-amber-500 text-stone-950 font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Escrow Payout Vault</span>
              </button>
            </>
          ) : (
            /* BUYER TABS */
            <>
              <button
                onClick={() => setActiveTab('my_offers')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'my_offers' ? 'bg-emerald-600 text-white font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>My Active Escrow Offers (2)</span>
              </button>

              <button
                onClick={() => setActiveTab('watchlist')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'watchlist' ? 'bg-emerald-600 text-white font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Saved Relocation Deals ({savedDeals.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('video_tours')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'video_tours' ? 'bg-emerald-600 text-white font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>Booked 4K Video Tours (1)</span>
              </button>

              <button
                onClick={() => setActiveTab('wallet')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'wallet' ? 'bg-emerald-600 text-white font-extrabold shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Diaspora Multi-Currency Wallet</span>
              </button>
            </>
          )}
        </div>

        {/* Dashboard Main Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          
          {/* SELLER VIEWS */}
          {isSeller && (
            <>
              {/* Seller Overview Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Total Liquidated Payout</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display mt-0.5">
                    ₦{totalSettledBalance.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Settled to Bank Vault</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Escrow Offers Received</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-display mt-0.5">2 Deals</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">10% Deposit in Escrow</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Target Closing Velocity</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">9 Days Left</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Fast-track legal transfer</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Title Deed Status</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-display mt-0.5">100% Vetted</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Ministry of Lands Cleared</div>
                </div>
              </div>

              {/* TAB: My Relocation Listings */}
              {activeTab === 'my_listings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Your Confidential Relocation Listings</h3>
                      <p className="text-xs text-stone-400">Manage your active whole-house packages and property liquidations.</p>
                    </div>
                    <button
                      onClick={() => { onClose(); onOpenSellerWizard(); }}
                      className="btn-gold py-2 px-4 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-stone-950" />
                      <span>Add New Asset / Bundle</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sellerListings.map((listing) => (
                      <div
                        key={listing.id}
                        className={`glass-panel p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                          listing.isSold ? 'border-red-600/40 bg-red-950/20' : 'border-stone-800 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-20 h-16 rounded-xl object-cover shrink-0 border border-stone-700"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white truncate max-w-md">{listing.title}</span>
                              {listing.isSold ? (
                                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded shadow">
                                  🔴 SOLD VIA ESCROW
                                </span>
                              ) : (
                                <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-600/40">
                                  Live & Inspected
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-amber-400 font-extrabold mt-1">
                              Asking: ₦{(listing.priceNGN).toLocaleString()} (-{listing.discountPercent}% Discount)
                            </div>
                            <div className="text-[11px] text-stone-400 mt-0.5">
                              📍 {listing.location} • Target Close: {listing.targetClosingDays || 14} Days
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => { onClose(); onSelectListing(listing); }}
                            className="btn-secondary py-1.5 px-3 text-xs cursor-pointer"
                          >
                            <span>View Deal Room</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Received Escrow Offers with Complete Fund Release & Sold Mark */}
              {activeTab === 'received_offers' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Live Escrow Purchase Offers Received</h3>
                    <p className="text-xs text-stone-400">Buyers have deposited 10% commitment deposit into the custodial bank trust.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        id: "off-001",
                        listingId: "jp-001",
                        buyerName: "Engr. Adekunle O. (Diaspora - London, UK)",
                        listingTitle: "Luxury 4-Bedroom Semi-Detached Duplex + 2022 RX350 + 5KVA Solar (Lekki Phase 1)",
                        offerAmount: 180000000,
                        askingPrice: 185000000,
                        depositStatus: "₦18,000,000 (10% in Escrow Bank)",
                        proposedClosing: "5 Days Handover",
                        scoutPercent: 2.0,
                        timeAgo: "2 hours ago"
                      },
                      {
                        id: "off-002",
                        listingId: "jp-002",
                        buyerName: "Dr. Ngozi Nwosu (Victoria Island, Lagos)",
                        listingTitle: "5-Bedroom Contemporary Villa in Guzape, Abuja",
                        offerAmount: 280000000,
                        askingPrice: 290000000,
                        depositStatus: "₦28,000,000 (10% in Escrow Bank)",
                        proposedClosing: "7 Days Handover",
                        scoutPercent: 2.0,
                        timeAgo: "Yesterday"
                      }
                    ].map((offer) => {
                      const offerState = offerStatuses[offer.id] || { status: "pending", stage: 1 };
                      const scoutCommission = (offer.offerAmount * offer.scoutPercent) / 100;
                      const netSellerPayout = offer.offerAmount - scoutCommission;

                      return (
                        <div key={offer.id} className="glass-panel p-5 rounded-2xl border-stone-800 space-y-3 bg-[#0d1712]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                            <div>
                              <div className="text-xs font-bold text-white">{offer.buyerName}</div>
                              <div className="text-[11px] text-stone-400">{offer.listingTitle}</div>
                            </div>
                            <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 self-start sm:self-auto">
                              {offer.timeAgo}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
                              <span className="text-[10px] text-stone-400">Total Agreed Offer:</span>
                              <div className="text-sm font-extrabold text-amber-300">₦{offer.offerAmount.toLocaleString()}</div>
                            </div>
                            <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
                              <span className="text-[10px] text-stone-400">Scout Commission ({offer.scoutPercent}%):</span>
                              <div className="text-xs font-bold text-stone-300">₦{scoutCommission.toLocaleString()}</div>
                            </div>
                            <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
                              <span className="text-[10px] text-stone-400">Net Seller Settlement:</span>
                              <div className="text-xs font-extrabold text-emerald-400">₦{netSellerPayout.toLocaleString()}</div>
                            </div>
                          </div>

                          {/* ACTION BUTTONS & ESCROW SETTLEMENT STAGES */}
                          <div className="pt-2 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                            
                            {offerState.stage === 1 && (
                              <>
                                <div className="text-xs text-stone-400">
                                  Stage 1: Review Escrow Offer & Deposit Proof
                                </div>
                                <button
                                  onClick={() => handleAcceptOffer(offer.id)}
                                  className="btn-emerald py-2 px-5 text-xs font-bold cursor-pointer"
                                >
                                  <CheckCheck className="w-4 h-4" />
                                  <span>Accept Escrow Offer & Start Deed Signing</span>
                                </button>
                              </>
                            )}

                            {offerState.stage === 2 && (
                              <>
                                <div className="text-xs text-emerald-300 flex items-center gap-1.5">
                                  <FileText className="w-4 h-4 text-amber-400" />
                                  <span>Deed of Assignment Prepared • Buyer 100% Escrow Deposited</span>
                                </div>
                                <button
                                  onClick={() => handleReleaseEscrowFunds(offer.id, offer.listingId, offer.offerAmount, offer.scoutPercent)}
                                  className="btn-gold py-2.5 px-6 text-xs font-black cursor-pointer shadow-xl flex items-center gap-2"
                                >
                                  <Landmark className="w-4 h-4 text-stone-950" />
                                  <span>Confirm Handover & Release ₦{netSellerPayout.toLocaleString()} to My Bank</span>
                                </button>
                              </>
                            )}

                            {offerState.stage === 3 && (
                              <div className="w-full bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-300">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                  <span className="font-extrabold">
                                    🎉 Escrow Funds Released! ₦{netSellerPayout.toLocaleString()} Disbursed to Bank.
                                  </span>
                                </div>
                                <span className="bg-red-600 text-white font-extrabold px-2.5 py-1 rounded-lg text-[10px] uppercase shadow">
                                  Marked as SOLD on Marketplace
                                </span>
                              </div>
                            )}

                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB: Escrow Payout Vault */}
              {activeTab === 'escrow_payouts' && (
                <div className="space-y-4 text-xs">
                  <div className="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/30 space-y-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-emerald-400" />
                      <span>Settlement Payout Account for Relocation Funds</span>
                    </h3>
                    <p className="text-stone-300">
                      When your property closing completes and funds are released, your 100% escrow balance is instantly transferred to your designated bank account.
                    </p>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border-stone-800 space-y-4">
                    <h4 className="font-bold text-white uppercase text-xs tracking-wider">Designated Bank Payout Details:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                        <div className="text-[10px] text-stone-400">Account Name</div>
                        <div className="text-xs font-bold text-white mt-0.5">{currentUser.name}</div>
                      </div>
                      <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                        <div className="text-[10px] text-stone-400">Bank Name</div>
                        <div className="text-xs font-bold text-emerald-400 mt-0.5">Zenith Bank Plc / Access Bank</div>
                      </div>
                      <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                        <div className="text-[10px] text-stone-400">NUBAN Account Number</div>
                        <div className="text-xs font-bold text-white mt-0.5">0249821940 (Verified)</div>
                      </div>
                      <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800">
                        <div className="text-[10px] text-stone-400">International Wire / IBAN</div>
                        <div className="text-xs font-bold text-amber-400 mt-0.5">GB89 BARC 2004 1599 2819 01</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* BUYER VIEWS */}
          {!isSeller && (
            <>
              {/* Buyer Overview Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Active Escrow Bids</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-display mt-0.5">2 Submitted</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Held in Trust Custody</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Saved Deals Watchlist</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">{savedDeals.length} Assets</div>
                  <div className="text-[10px] text-amber-300 mt-0.5">Up to 30% Relocation Discount</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Booked 4K Video Tours</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display mt-0.5">1 Scheduled</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Live WebRTC Walkthrough</div>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-stone-800">
                  <div className="text-[11px] text-stone-400">Escrow Security</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-display mt-0.5">100% Guarded</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Refundable deposit policy</div>
                </div>
              </div>

              {/* TAB: My Active Escrow Offers */}
              {activeTab === 'my_offers' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Your Submitted Escrow Offers</h3>
                    <p className="text-xs text-stone-400">Track legal deed preparation and escrow disbursement status.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: "buy-off-1",
                        title: "Luxury 4-Bedroom Semi-Detached Duplex + 2022 RX350 + 5KVA Solar",
                        location: "Lekki Phase 1, Lagos",
                        offerAmount: 180000000,
                        status: "Seller Reviewing / Escrow Locked",
                        statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
                        deposit: "₦18,000,000 (10%)"
                      },
                      {
                        id: "buy-off-2",
                        title: "Brand New 3-Bedroom Serviced Apartment + 2020 Mercedes C300",
                        location: "Bodija Estate, Ibadan, Oyo State",
                        offerAmount: 88000000,
                        status: "Deed of Assignment Drafting in Progress",
                        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                        deposit: "₦8,800,000 (10%)"
                      }
                    ].map((item) => (
                      <div key={item.id} className="glass-panel p-5 rounded-2xl border-stone-800 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                          <div>
                            <div className="text-xs font-bold text-white">{item.title}</div>
                            <div className="text-[11px] text-stone-400">📍 {item.location}</div>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.statusColor} self-start sm:self-auto`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-stone-400 text-[11px]">Your Escrow Bid: </span>
                            <span className="font-extrabold text-amber-400 text-sm">₦{item.offerAmount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 text-[11px]">Trustee Deposit: </span>
                            <span className="font-bold text-emerald-400">{item.deposit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Saved Watchlist */}
              {activeTab === 'watchlist' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Your Saved Relocation Listings</h3>
                    <p className="text-xs text-stone-400">Properties you bookmarked for expedited takeover.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedDeals.map((deal) => (
                      <div
                        key={deal.id}
                        onClick={() => { onClose(); onSelectListing(deal); }}
                        className="glass-panel p-3.5 rounded-2xl border-stone-800 hover:border-emerald-500/50 transition-all cursor-pointer space-y-2.5"
                      >
                        <div className="relative h-36 rounded-xl overflow-hidden">
                          <img src={deal.images[0]} alt={deal.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 right-2 bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
                            -{deal.discountPercent}% Off
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">{deal.title}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-amber-400 font-extrabold">₦{(deal.priceNGN).toLocaleString()}</span>
                          <span className="text-[10px] text-stone-400">📍 {deal.state}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Booked Video Tours */}
              {activeTab === 'video_tours' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h3 className="text-base font-bold text-white">Scheduled Live 4K Property Tours</h3>
                    <p className="text-xs text-stone-400">Connect with on-ground surveyor and seller via encrypted WebRTC video.</p>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 bg-emerald-950/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold text-white text-sm">4-Bedroom Duplex in Lekki Phase 1, Lagos</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-500/40">
                        Confirmed for Today
                      </span>
                    </div>

                    <p className="text-stone-300 text-[11px]">
                      The physical surveyor will walk through the kitchen, solar inverter room, BQ, and run engine diagnostics on the Lexus RX350.
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                      <div className="text-stone-400 text-[11px]">Time: Today at 2:00 PM (WAT)</div>
                      <button
                        onClick={() => { onClose(); onStartCall("Dr. Babatunde Alabi", "video"); }}
                        className="btn-gold py-1.5 px-4 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-stone-950" />
                        <span>Join Live Video Room</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Diaspora Multi-Currency Wallet */}
              {activeTab === 'wallet' && (
                <div className="space-y-4 text-xs">
                  <div className="glass-panel p-5 rounded-2xl border-stone-800 space-y-3">
                    <h3 className="text-base font-bold text-white">Diaspora Foreign Currency Trust Inflow</h3>
                    <p className="text-stone-300">
                      Deposit funds in USD, GBP, EUR, or CAD from your UK/US/Canadian bank. Funds remain in your name until you authorize release upon successful inspection.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1">
                      <div className="text-amber-400 font-bold">🇬🇧 UK Wire Transfer (GBP)</div>
                      <div className="text-[11px] text-stone-300">Sort Code: 20-04-15 | Acc: 83920194</div>
                      <div className="text-[10px] text-stone-500">Beneficiary: SellJapa Global Trust Escrow Ltd</div>
                    </div>
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1">
                      <div className="text-emerald-400 font-bold">🇺🇸 US Wire / ACH (USD)</div>
                      <div className="text-[11px] text-stone-300">Routing (ABA): 026009593 | Acc: 9482019401</div>
                      <div className="text-[10px] text-stone-500">Beneficiary: SellJapa Custodial Escrow LLC</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#0b1611] px-4 sm:px-6 py-3 border-t border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-End Escrow Custody Protected</span>
          </div>

          <button
            onClick={() => { onLogout(); onClose(); }}
            className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Account</span>
          </button>
        </div>

      </div>
    </div>
  );
}
