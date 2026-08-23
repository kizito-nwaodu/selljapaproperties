import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, ArrowLeft, Box, Car, Sun, Tv, Home, Lock } from 'lucide-react';
import { ListingCard } from './ListingCard';

export function BundlesHub({ listings, currency, onSelectListing, onOpenSellerWizard, onBackToExplore }) {
  const bundleListings = listings.filter(l => l.category === 'bundle');

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Prominent Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToExplore}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-stone-300 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 transition-all text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Deals</span>
        </button>

        <span className="text-xs text-stone-400 font-semibold">
          Flagship Feature: Whole-House Takeover
        </span>
      </div>

      {/* High-Impact Hero Banner for Whole House Bundles */}
      <div className="glass-panel-gold p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>The SellJapa Flagship Innovation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
            Whole-House <span className="text-gradient-gold">"Take-All"</span> Relocation Bundles
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            When preparing to relocate overseas, selling your Duplex, then hunting buyers for your SUV, then negotiating for your Solar Inverter and TV one by one is exhausting. 
            <strong className="text-amber-300"> List everything in one verified bundle</strong> for instant takeover by investors and home seekers with complete confidentiality.
          </p>

          {/* Key Advantages Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="bg-black/40 p-3 rounded-xl border border-amber-500/20 flex items-start gap-2.5">
              <div className="p-1 rounded bg-amber-500/20 text-amber-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">1-Click Total Liquidation</div>
                <div className="text-[11px] text-stone-400">Hand over keys, car and contents in a single closing.</div>
              </div>
            </div>

            <div className="bg-black/40 p-3 rounded-xl border border-amber-500/20 flex items-start gap-2.5">
              <div className="p-1 rounded bg-amber-500/20 text-amber-400 shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Solar + Furnishings Included</div>
                <div className="text-[11px] text-stone-400">Turnkey move-in ready for buyers or instant Airbnb setup.</div>
              </div>
            </div>

            <div className="bg-black/40 p-3 rounded-xl border border-amber-500/20 flex items-start gap-2.5">
              <div className="p-1 rounded bg-amber-500/20 text-amber-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">20%–35% Bundle Savings</div>
                <div className="text-[11px] text-stone-400">Priced to reward swift cash buyers and diaspora investors.</div>
              </div>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button 
              onClick={onOpenSellerWizard}
              className="btn-gold text-xs sm:text-sm px-6 py-3 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Create a Whole-House Bundle Listing</span>
            </button>

            <button 
              onClick={onBackToExplore}
              className="btn-secondary text-xs sm:text-sm px-5 py-3 cursor-pointer"
            >
              <span>Explore Individual Properties</span>
            </button>
          </div>

        </div>
      </div>

      {/* Typical Bundle Breakdown Example Infographic */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-stone-800 bg-[#101a15]">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            How a Japa Relocation Bundle Works
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Example: A typical Lagos or Abuja family liquidating everything before overseas relocation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
            <Home className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">4-Bed Duplex</div>
            <div className="text-[10px] text-stone-400 mt-0.5">Standalone: ₦200M</div>
          </div>
          <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
            <Car className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">Lexus RX350</div>
            <div className="text-[10px] text-stone-400 mt-0.5">Standalone: ₦28M</div>
          </div>
          <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
            <Sun className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">5KVA Solar & Lithium</div>
            <div className="text-[10px] text-stone-400 mt-0.5">Standalone: ₦7.5M</div>
          </div>
          <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
            <Tv className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">QLED TVs & Audio</div>
            <div className="text-[10px] text-stone-400 mt-0.5">Standalone: ₦3.8M</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-amber-950/40 p-4 rounded-xl border border-amber-500/40">
            <div className="text-xs font-bold text-amber-300">Bundle Price</div>
            <div className="text-base font-extrabold text-white mt-1">₦185M</div>
            <div className="text-[9px] text-emerald-400 font-bold mt-0.5">Buyer Saves ₦60 Million!</div>
          </div>
        </div>
      </div>

      {/* Active Bundle Listings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Active Whole-House Bundles</h3>
            <p className="text-stone-400 text-xs">Inspected packages ready for immediate deed & key transfer</p>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {bundleListings.length} Available Bundles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bundleListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currency={currency}
              onSelectListing={onSelectListing}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
