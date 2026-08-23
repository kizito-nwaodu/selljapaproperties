import React from 'react';
import { Clock, ShieldCheck, MapPin, Sparkles, ChevronRight, Eye, CheckCircle2, DollarSign, Lock } from 'lucide-react';
import { EXCHANGE_RATES } from '../data/mockData';

export function ListingCard({ listing, currency, onSelectListing }) {
  const currentRate = EXCHANGE_RATES[currency] || EXCHANGE_RATES.NGN;
  const convertedPrice = (listing.priceNGN / currentRate.rate).toLocaleString('en-US', {
    maximumFractionDigits: 0
  });
  const convertedOriginal = (listing.originalValueNGN / currentRate.rate).toLocaleString('en-US', {
    maximumFractionDigits: 0
  });

  const isUrgent = (listing.targetClosingDays || 14) <= 10;
  const isCritical = (listing.targetClosingDays || 14) <= 7;

  return (
    <div 
      onClick={() => onSelectListing(listing)}
      className="glass-panel group rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 cursor-pointer flex flex-col h-full relative"
    >
      {/* Target Closing & Privacy Shield Banner */}
      <div className={`px-3 py-1.5 text-xs font-bold flex items-center justify-between transition-colors ${
        listing.isSold
          ? 'bg-red-950/90 text-red-300 border-b border-red-800/60'
          : isCritical 
            ? 'bg-red-950/80 text-red-300 border-b border-red-800/40' 
            : isUrgent 
              ? 'bg-amber-950/80 text-amber-300 border-b border-amber-800/40' 
              : 'bg-emerald-950/80 text-emerald-300 border-b border-emerald-800/40'
      }`}>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{listing.isSold ? "Escrow Settlement Completed" : "Verified Relocation Liquidation"}</span>
        </div>
        <div className="flex items-center gap-1">
          {listing.isSold ? (
            <span className="bg-red-600 text-white px-2 py-0.2 rounded text-[10px] font-black uppercase">
              SOLD
            </span>
          ) : (
            <>
              <Clock className="w-3 h-3 animate-pulse" />
              <span className="font-extrabold">{listing.targetClosingDays || 14} Days Target Close</span>
            </>
          )}
        </div>
      </div>

      {/* Image Gallery Preview with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-900">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.category === 'bundle' && (
            <span className="badge-bundle px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 backdrop-blur-md shadow">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Whole-House Bundle
            </span>
          )}
          <span className="bg-stone-900/80 backdrop-blur-md border border-stone-700 text-stone-200 px-2 py-0.5 rounded-lg text-[11px] font-semibold">
            {listing.state} State
          </span>
        </div>

        {/* Discount or Sold Badge */}
        <div className="absolute top-3 right-3">
          {listing.isSold ? (
            <span className="bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg shadow-xl border border-red-400 uppercase tracking-wider">
              SOLD
            </span>
          ) : (
            <span className="bg-red-600/90 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-lg border border-red-400/40 flex items-center gap-1">
              <span>-{listing.discountPercent}%</span>
              <span className="text-[9px] font-normal uppercase opacity-90">Distress Off</span>
            </span>
          )}
        </div>

        {/* Sold Overlay on Image */}
        {listing.isSold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="border-2 border-red-500 text-red-400 font-extrabold text-sm px-4 py-1.5 rounded-xl rotate-[-8deg] tracking-wider uppercase bg-black/80 shadow-lg">
              SOLD VIA ESCROW
            </div>
          </div>
        )}

        {/* Bottom Image Info */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-stone-200">
          <div className="flex items-center gap-1 text-[11px] bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-amber-300">
            <Lock className="w-3 h-3 text-amber-400" />
            <span className="font-bold">Direct Escrow Handover</span>
          </div>
          <span className="text-[11px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {listing.inspectionScore}% Vetted
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Location & Title */}
          <div className="flex items-center gap-1 text-xs text-stone-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {listing.title}
          </h3>

          {/* Seller Snapshot */}
          <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1.5 bg-stone-900/60 p-1.5 rounded-lg border border-stone-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
            <span className="truncate">Seller: <strong className="text-stone-300">{listing.sellerName}</strong> ({listing.sellerProfession})</span>
          </div>

          {/* Bundle Items or Key Features preview */}
          {listing.bundledItems && listing.bundledItems.length > 0 ? (
            <div className="mt-2.5 space-y-1">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                <span>Included in Take-All Deal ({listing.bundledItems.length} items):</span>
              </div>
              <div className="text-xs text-stone-300 space-y-0.5 pl-1 border-l-2 border-amber-500/40">
                {listing.bundledItems.slice(0, 2).map((b, idx) => (
                  <div key={idx} className="truncate text-[11px] text-stone-300">
                    • {b.item}
                  </div>
                ))}
                {listing.bundledItems.length > 2 && (
                  <div className="text-[10px] text-amber-400 font-semibold">
                    + {listing.bundledItems.length - 2} more assets (Click to view full inventory)
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {listing.features.slice(0, 3).map((feat, idx) => (
                <span key={idx} className="text-[10px] bg-stone-900 text-stone-300 px-2 py-0.5 rounded border border-stone-800">
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-800 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-stone-400 line-through">
              Valued at: {currentRate.symbol}{convertedOriginal}
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-gradient-gold font-display">
              {currentRate.symbol}{convertedPrice}
            </div>
          </div>

          <button 
            type="button"
            aria-label={`View deal room for ${listing.title}`}
            onClick={(e) => { e.stopPropagation(); onSelectListing(listing); }}
            className="btn-gold py-2 px-3.5 min-h-[40px] text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>View Deal Room</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
