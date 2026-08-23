import React from 'react';
import { Globe, DollarSign, Video, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Building2, MapPin, Zap } from 'lucide-react';
import { EXCHANGE_RATES } from '../data/mockData';

export function DiasporaHub({ currency, setCurrency, onExploreClick, onBackToExplore, onStartCall }) {
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

        <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
          <Globe className="w-4 h-4" />
          Diaspora Multi-Currency Desk
        </span>
      </div>

      {/* Hero Banner for Diaspora */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden bg-gradient-to-br from-[#0c1813] via-[#0d2218] to-[#0a1410] border border-emerald-500/40 shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Dedicated Desk for Nigerians in UK, US, Canada & Europe</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
            Buy Prime Nigerian Properties <br />
            <span className="text-gradient-gold">Without Sending Money to Untrusted Relatives.</span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Thousands of diaspora Nigerians have lost hard-earned foreign exchange trusting friends or family with house purchases. 
            <strong className="text-amber-300"> SellJapa eliminates the risk:</strong> View properties via live 4K WebRTC video calls, receive certified lawyer title reports, and pay in USD, GBP, EUR, or CAD through custodial escrow.
          </p>

          {/* Currency Switcher Quick Bar */}
          <div className="bg-black/50 p-4 rounded-2xl border border-stone-800 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-stone-300">View Real-Time Prices in:</span>
            {Object.keys(EXCHANGE_RATES).map((currKey) => {
              const c = EXCHANGE_RATES[currKey];
              return (
                <button
                  key={currKey}
                  onClick={() => setCurrency(currKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currency === currKey
                      ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {c.symbol} {c.name} ({currKey})
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="btn-gold text-xs sm:text-sm px-6 py-3 cursor-pointer"
            >
              <span>Explore Verified Relocation Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStartCall("SellJapa Diaspora Concierge", "video")}
              className="btn-emerald text-xs sm:text-sm px-5 py-3 flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Test Live 4K Inspection Call</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3 Pillars for Diaspora Buyers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Live 4K Virtual Walkthrough</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Our on-ground engineer walks through every room, tests plumbing, examines the roof, and verifies the neighborhood live on a secure WebRTC video call with you.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Deed Search & Legal Verification</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Registered Nigerian property lawyers perform independent title investigations at the State Ministry of Lands before you release a single dollar or pound.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Multi-Currency Escrow Lock</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Pay from your UK/US/Canadian bank account directly into our regulated escrow trust account. Conversion occurs at real-time interbank transparent exchange rates.
          </p>
        </div>

      </div>

    </section>
  );
}
