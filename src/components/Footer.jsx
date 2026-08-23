import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Globe, Sparkles, Heart, Lock } from 'lucide-react';
import { ALL_STATES } from '../data/mockData';

export function Footer({ onSelectState, onOpenSellerWizard, setActiveTab }) {
  return (
    <footer className="bg-[#050907] border-t border-emerald-950/80 pt-16 pb-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Banner: Expedited Relocation Liquidation */}
        <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              🛡️ 24-HOUR CONFIDENTIAL LIQUIDATION DESK
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Need to Liquidate Assets for Overseas Relocation?
            </h3>
            <p className="text-stone-300 text-xs max-w-xl">
              Our institutional buyout desk matches your Nigerian property or whole-house bundle with verified cash buyers under strict privacy and bank escrow protection.
            </p>
          </div>

          <button
            onClick={onOpenSellerWizard}
            className="btn-gold px-6 py-3 text-xs sm:text-sm shrink-0"
          >
            <span>Request Confidential Liquidation &rarr;</span>
          </button>
        </div>

        {/* 4 Columns Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#080d0b] rounded-[6px] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-display">
                Sell<span className="text-amber-400">Japa</span><span className="text-emerald-400">Properties</span>.ng
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Nigeria's #1 dedicated asset liquidation & verified escrow marketplace for relocating professionals, families, and global investors.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Licensed Escrow & Legal Trustee Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Marketplace Hubs</h4>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li><button onClick={() => setActiveTab('explore')} className="hover:text-amber-400">Verified Relocation Deals</button></li>
              <li><button onClick={() => setActiveTab('bundles')} className="hover:text-amber-400">Whole-House Bundles (House + Car + Solar)</button></li>
              <li><button onClick={() => setActiveTab('scouts')} className="hover:text-amber-400 text-amber-300 font-semibold flex items-center gap-1"><span>⚡ Certified Scout Network (2% Commission)</span></button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-amber-400">Fast Liquidation Valuation Calculator</button></li>
              <li><button onClick={() => setActiveTab('diaspora')} className="hover:text-amber-400">Diaspora Buyers Lounge (UK, US, Canada)</button></li>
              <li><button onClick={() => setActiveTab('escrow')} className="hover:text-amber-400">Escrow Security & Deed Registry Search</button></li>
            </ul>
          </div>

          {/* Top States */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Nigerian States</h4>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              {["Lagos", "Abuja FCT", "Rivers", "Oyo", "Enugu", "Delta", "Ogun", "Edo"].map((st) => (
                <button
                  key={st}
                  onClick={() => onSelectState(st)}
                  className="text-left text-stone-400 hover:text-emerald-400 truncate"
                >
                  • {st} State
                </button>
              ))}
            </div>
          </div>

          {/* Support & Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Relocation Support Concierge</h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+234 (0) 800-SELL-JAPA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>concierge@selljapaproperties.ng</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Lagos • Abuja • Port Harcourt • London • Toronto</span>
              </div>
            </div>
          </div>

        </div>

        {/* All 36 States Directory Pill Footer */}
        <div className="pt-6 border-t border-stone-800/80">
          <div className="text-[10px] font-bold uppercase text-stone-500 mb-2">
            Coverage Directory across all 36 States & Federal Capital Territory:
          </div>
          <div className="flex flex-wrap gap-1 text-[10px] text-stone-400">
            {ALL_STATES.filter(s => s !== "All 36 States + FCT").map((st) => (
              <button
                key={st}
                onClick={() => onSelectState(st)}
                className="hover:text-amber-300 hover:underline mr-1"
              >
                {st} •
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <div>
            © {new Date().getFullYear()} SellJapaProperties.ng — Confidential Relocation Proptech. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Terms of Escrow</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy & Security Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Deed Verification Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
