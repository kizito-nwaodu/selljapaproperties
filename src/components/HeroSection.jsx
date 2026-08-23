import React from 'react';
import { Search, ShieldCheck, Zap, TrendingUp, Sparkles, Building, MapPin, Clock, ArrowRight, CheckCircle2, Lock, PlusCircle, Calculator, ChevronRight, UserCheck } from 'lucide-react';
import { ALL_STATES } from '../data/mockData';

export function HeroSection({
  selectedState,
  setSelectedState,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onOpenSellerWizard,
  userPersona,
  setUserPersona,
  onExploreClick,
  onOpenCalculator,
  onOpenScoutHub,
  onOpenAuth,
  currentUser
}) {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background Glows & Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-950/40 via-amber-950/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Persona Switcher Tabs - Clean & Responsive on All Devices */}
        <div className="flex justify-center mb-6">
          <div 
            role="tablist"
            aria-label="Account Perspective Switcher"
            className="flex flex-col sm:inline-flex sm:flex-row w-full sm:w-auto p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800 backdrop-blur-md shadow-2xl gap-1 sm:gap-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={userPersona === 'seller'}
              onClick={() => setUserPersona('seller')}
              className={`px-4 sm:px-6 py-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                userPersona === 'seller'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>I am Relocating (Sell Assets Privately)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={userPersona === 'buyer'}
              onClick={() => setUserPersona('buyer')}
              className={`px-4 sm:px-6 py-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                userPersona === 'buyer'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Building className="w-4 h-4 shrink-0" />
              <span>I am an Investor / Buyer (Find Deals)</span>
            </button>
          </div>
        </div>

        {/* Security & Nationwide Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Serving All 36 Nigerian States & FCT Abuja • 100% Privacy & Escrow Protection</span>
          </div>
        </div>

        {/* Dynamic Persona Hero Content */}
        {userPersona === 'seller' ? (
          /* ================= SELLER VIEW ================= */
          <div className="text-center max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-tight">
              Relocating Abroad? Liquidate Your Nigerian Properties <br className="hidden sm:inline" />
              <span className="text-gradient-gold">Without Middlemen or Privacy Leaks.</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
              Don't let slow agents delay your relocation. Get certified on-ground valuation, verified buyers from Nigeria and the diaspora, and 100% escrow payment released securely upon handover.
            </p>

            {/* Seller Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenSellerWizard}
                className="btn-gold px-7 py-3.5 text-sm sm:text-base shadow-xl"
              >
                <Zap className="w-4 h-4 text-stone-950" />
                <span>List Relocation Asset / Whole-House Bundle</span>
              </button>
              
              <button
                onClick={onOpenCalculator}
                className="btn-secondary px-6 py-3.5 text-sm sm:text-base border border-emerald-600/40 text-emerald-300 hover:bg-emerald-950/40"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Liquidation Value</span>
              </button>
            </div>

            {/* 3 Steps for Relocators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto text-left">
              <div className="bg-stone-900/70 p-3.5 rounded-2xl border border-stone-800 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <div className="text-xs font-bold text-white">Post Asset Confidentially</div>
                  <div className="text-[11px] text-stone-400">Bundle house + car + solar in 1 listing.</div>
                </div>
              </div>

              <div 
                onClick={() => onOpenScoutHub && onOpenScoutHub()}
                className="bg-stone-900/70 p-3.5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 flex items-start gap-2.5 cursor-pointer transition-all hover:bg-emerald-950/20 group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 group-hover:scale-110 transition-transform">2</div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Verified Scout Inspection</span>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">2% Earn</span>
                  </div>
                  <div className="text-[11px] text-stone-400">Physical surveyor check within 24h. <span className="text-emerald-400 group-hover:underline">Explore Scout Hub &rarr;</span></div>
                </div>
              </div>

              <div className="bg-stone-900/70 p-3.5 rounded-2xl border border-stone-800 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <div className="text-xs font-bold text-white">Guaranteed Escrow Payout</div>
                  <div className="text-[11px] text-stone-400">Receive 100% funds before move-out.</div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ================= BUYER / INVESTOR VIEW ================= */
          <div className="text-center max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-tight">
              Invest in Verified Relocation Deals Across Nigeria <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">At 15%–35% Below Market Valuation.</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
              Buy directly from verified Nigerian relocators with clean Government title searches, 4K live video inspections for diaspora buyers, and lawyer-backed escrow protection.
            </p>

            {/* Buyer Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="btn-emerald px-7 py-3.5 text-sm sm:text-base shadow-xl"
              >
                <Search className="w-4 h-4" />
                <span>Explore Verified Relocation Listings</span>
              </button>
              
              {!currentUser && (\n                <button\n                  onClick={onOpenAuth}\n                  className=\"btn-secondary px-6 py-3.5 text-sm sm:text-base border border-amber-500/40 text-amber-300 hover:bg-amber-950/40\"\n                >\n                  <UserCheck className=\"w-4 h-4 text-amber-400\" />\n                  <span>Create Free Account / SSO</span>\n                </button>\n              )}
            </div>
          </div>
        )}

        {/* Real-Time Liquidation Search Bar */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="glass-panel p-3 sm:p-4 rounded-2xl shadow-2xl border border-stone-700/60 bg-[#121c18]/90">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              
              {/* Keyword Search */}
              <div className="sm:col-span-4 flex items-center gap-2 bg-stone-900/90 px-3.5 py-2.5 rounded-xl border border-stone-800">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Area (e.g. Lekki, Guzape, Bodija...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none w-full"
                />
              </div>

              {/* State Filter */}
              <div className="sm:col-span-3 flex items-center gap-2 bg-stone-900/90 px-3.5 py-2.5 rounded-xl border border-stone-800">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm text-stone-100 focus:outline-none w-full cursor-pointer"
                >
                  {ALL_STATES.map((state) => (
                    <option key={state} value={state} className="bg-stone-900 text-stone-200">
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="sm:col-span-3 flex items-center gap-2 bg-stone-900/90 px-3.5 py-2.5 rounded-xl border border-stone-800">
                <Building className="w-4 h-4 text-amber-400 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm text-stone-100 focus:outline-none w-full cursor-pointer"
                >
                  <option value="all" className="bg-stone-900 text-stone-200">All Asset Types</option>
                  <option value="bundle" className="bg-stone-900 text-amber-400 font-bold">✨ Whole-House Bundles</option>
                  <option value="house" className="bg-stone-900 text-stone-200">Duplexes & Houses</option>
                  <option value="land" className="bg-stone-900 text-stone-200">Lands & Plots</option>
                  <option value="furnishing" className="bg-stone-900 text-stone-200">Home Appliances & Cars</option>
                </select>
              </div>

              {/* Search CTA */}
              <div className="sm:col-span-2">
                <button
                  onClick={onExploreClick}
                  className="w-full h-full min-h-[42px] btn-emerald justify-center text-xs sm:text-sm py-2"
                >
                  <span>Filter Deals</span>
                </button>
              </div>

            </div>

            {/* Quick Popular Search Tags */}
            <div className="mt-3 pt-3 border-t border-stone-800/80 flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
              <span className="font-semibold text-stone-300">Hot Relocation Areas:</span>
              <button 
                onClick={() => { setSelectedState("Lagos"); setSearchQuery("Lekki"); }}
                className="hover:text-amber-300 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800"
              >
                📍 Lekki Phase 1, Lagos
              </button>
              <button 
                onClick={() => { setSelectedState("Abuja FCT"); setSearchQuery("Guzape"); }}
                className="hover:text-amber-300 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800"
              >
                📍 Guzape, Abuja
              </button>
              <button 
                onClick={() => { setSelectedState("Rivers"); setSearchQuery("Old GRA"); }}
                className="hover:text-amber-300 bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800"
              >
                📍 Old GRA, Port Harcourt
              </button>
              <button 
                onClick={() => { setSelectedCategory("bundle"); }}
                className="hover:text-amber-300 bg-amber-950/40 text-amber-300 px-2 py-0.5 rounded border border-amber-800/40"
              >
                ✨ House + Car + Solar Bundles
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics Ticker Banner */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-panel p-4 rounded-xl text-center border-emerald-800/20">
            <div className="text-xl sm:text-2xl font-extrabold text-gradient-gold font-display">₦4.2 Billion+</div>
            <div className="text-xs text-stone-400 font-medium mt-0.5">Liquidated Property Value</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-emerald-800/20">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">14 Days</div>
            <div className="text-xs text-stone-400 font-medium mt-0.5">Average Time to Close</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-emerald-800/20">
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">36 States + FCT</div>
            <div className="text-xs text-stone-400 font-medium mt-0.5">Certified On-Ground Scouts</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center border-emerald-800/20">
            <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-display">100% Escrow</div>
            <div className="text-xs text-stone-400 font-medium mt-0.5">Lawyer-Backed Security</div>
          </div>
        </div>

      </div>
    </section>
  );
}
