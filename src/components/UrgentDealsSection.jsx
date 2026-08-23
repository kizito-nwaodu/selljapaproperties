import React, { useState } from 'react';
import { ListingCard } from './ListingCard';
import { Sparkles, Filter, SlidersHorizontal, Flame, Clock, MapPin, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ALL_STATES } from '../data/mockData';

export function UrgentDealsSection({
  listings,
  currency,
  selectedState,
  setSelectedState,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectListing,
  onOpenSellerWizard
}) {
  const [urgencyFilter, setUrgencyFilter] = useState('all'); // all, critical (< 10 days), high (< 20 days)
  const [sortBy, setSortBy] = useState('countdown'); // countdown, discount, priceAsc, priceDesc

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (selectedState !== "All 36 States + FCT" && item.state !== selectedState) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    const days = item.targetClosingDays || 14;
    if (urgencyFilter === 'critical' && days > 10) return false;
    if (urgencyFilter === 'high' && days > 20) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchState = item.state.toLowerCase().includes(q);
      const matchSeller = item.sellerName.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchState && !matchSeller) return false;
    }

    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    const daysA = a.targetClosingDays || 14;
    const daysB = b.targetClosingDays || 14;
    if (sortBy === 'countdown') return daysA - daysB;
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    if (sortBy === 'priceAsc') return a.priceNGN - b.priceNGN;
    if (sortBy === 'priceDesc') return b.priceNGN - a.priceNGN;
    return 0;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Relocation & Move-Out Listings</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Live Relocation Deals Across <span className="text-gradient-emerald">Nigeria</span>
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            Inspected properties and whole-house packages with clean verified title deeds. Priced for fast escrow closing.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSellerWizard}
            className="btn-gold text-xs px-4 py-2.5"
          >
            <span>+ List Your Asset (Confidential)</span>
          </button>
        </div>
      </div>

      {/* Filter Controls & State Pills */}
      <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4 border-stone-800 bg-[#0f1714]">
        
        {/* Category & Urgency Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-stone-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-stone-400" /> Type:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              All Assets ({listings.length})
            </button>
            <button
              onClick={() => setSelectedCategory('bundle')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                selectedCategory === 'bundle'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-900 text-amber-300 hover:bg-stone-800 border border-amber-500/20'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Whole-House Bundles
            </button>
            <button
              onClick={() => setSelectedCategory('house')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'house'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              Duplexes & Houses
            </button>
            <button
              onClick={() => setSelectedCategory('land')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'land'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              Lands & Plots
            </button>
            <button
              onClick={() => setSelectedCategory('furnishing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'furnishing'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              Appliances & Vehicles
            </button>
          </div>

          {/* Sort & Urgency Filter Dropdowns */}
          <div className="flex items-center gap-2">
            
            {/* Urgency Filter */}
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">⚡ All Handover Windows</option>
              <option value="critical">🚨 Expedited: Close in &lt; 10 Days</option>
              <option value="high">⏳ Fast Close: Target &lt; 20 Days</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="countdown">⏳ Sort: Fastest Handover Window</option>
              <option value="discount">🔥 Sort: Highest Relocation Discount (%)</option>
              <option value="priceAsc">💰 Sort: Price Low to High</option>
              <option value="priceDesc">💎 Sort: Price High to Low</option>
            </select>

          </div>

        </div>

        {/* Quick States Scroll Bar */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] text-stone-400 font-semibold shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" /> States:
          </span>
          {["All 36 States + FCT", "Lagos", "Abuja FCT", "Rivers", "Oyo", "Enugu", "Delta", "Ogun", "Edo", "Anambra", "Kano", "Kwara"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                selectedState === st
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50 font-bold'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Listings Grid */}
      {sortedListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currency={currency}
              onSelectListing={onSelectListing}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-2xl border-stone-800 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center mx-auto text-amber-400">
            <Building2 className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-lg font-bold text-white">No listings found matching this criteria</h3>
          <p className="text-stone-400 text-xs">
            Try resetting your state or category filters to view all relocation liquidation opportunities across Nigeria.
          </p>
          <button
            onClick={() => { setSelectedState("All 36 States + FCT"); setSelectedCategory("all"); setSearchQuery(""); setUrgencyFilter("all"); }}
            className="btn-emerald text-xs px-4 py-2"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
}
