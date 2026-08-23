import React, { useState } from 'react';
import { Calculator, Zap, ShieldCheck, TrendingUp, Sparkles, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, Clock, Lock } from 'lucide-react';
import { ALL_STATES, EXCHANGE_RATES } from '../data/mockData';

export function FastValuationCalculator({ currency, onOpenSellerWizard, onBackToExplore }) {
  const [calcState, setCalcState] = useState("Lagos");
  const [assetType, setAssetType] = useState("duplex"); // duplex, terrace, flat, land, bundle, electronics
  const [estimatedValueInput, setEstimatedValueInput] = useState(150000000); // 150M NGN default
  const [departureWindow, setDepartureWindow] = useState("14"); // 7, 14, 30, 60 days
  const [hasClearTitle, setHasClearTitle] = useState(true);
  const [includeFurnishings, setIncludeFurnishings] = useState(true);

  const curr = EXCHANGE_RATES[currency] || EXCHANGE_RATES.NGN;

  // Calculate dynamic recommendations
  const discountMultiplier = departureWindow === "7" ? 0.75 : departureWindow === "14" ? 0.82 : departureWindow === "30" ? 0.88 : 0.94;
  const suggestedLiquidationPrice = estimatedValueInput * discountMultiplier;
  const buyerDemandCount = calcState === "Lagos" ? 485 : calcState === "Abuja FCT" ? 340 : calcState === "Rivers" ? 210 : calcState === "Oyo" ? 175 : 95;
  const estimatedDaysToClose = departureWindow === "7" ? "3–6 Days" : departureWindow === "14" ? "8–12 Days" : "15–20 Days";
  const speedScore = departureWindow === "7" ? 98 : departureWindow === "14" ? 92 : departureWindow === "30" ? 85 : 72;

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-300">
      
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
          Proptech Valuation Model
        </span>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>AI & Proptech Liquidation Estimator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Fast-Sale & Relocation <span className="text-gradient-gold">Valuation Calculator</span>
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm">
          Planning your international relocation? Calculate your optimal liquidation discount and estimated days to receive full escrow funds with complete confidentiality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border-stone-800 space-y-6 bg-[#0f1713]">
          
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-stone-800 pb-3">
            <span>1. Asset & Relocation Parameters</span>
          </h3>

          {/* State & LGA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Nigerian State where Asset is Located
              </label>
              <select
                value={calcState}
                onChange={(e) => setCalcState(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:border-amber-500 focus:outline-none"
              >
                {ALL_STATES.filter(s => s !== "All 36 States + FCT").map((st) => (
                  <option key={st} value={st}>{st} State</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Asset Category
              </label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:border-amber-500 focus:outline-none"
              >
                <option value="duplex">Detached / Semi-Detached Duplex</option>
                <option value="bundle">✨ Whole-House Bundle (House + Car + Solar)</option>
                <option value="terrace">Terrace Duplex / Townhouse</option>
                <option value="flat">Block of Flats / Serviced Apartment</option>
                <option value="land">Residential / Commercial Land Plot</option>
                <option value="electronics">Household Contents & Appliances Pack</option>
              </select>
            </div>
          </div>

          {/* Target Handover Window Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>What is your target handover / closing window?</span>
              </label>
              <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                {departureWindow === "7" ? "🚨 Expedited (< 7 Days)" : departureWindow === "14" ? "⚡ Fast Close (14 Days)" : departureWindow === "30" ? "⏳ 30 Days" : "Standard (60 Days)"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { val: "7", label: "< 7 Days", desc: "Express Cash-out" },
                { val: "14", label: "14 Days", desc: "Fast Auction" },
                { val: "30", label: "30 Days", desc: "Target Close" },
                { val: "60", label: "60 Days", desc: "Standard" }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setDepartureWindow(item.val)}
                  className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                    departureWindow === item.val
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-stone-500">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Normal Market Value */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-300">
                Estimated Normal Market Value (₦ Naira)
              </label>
              <span className="text-xs font-extrabold text-emerald-400">
                ₦{(estimatedValueInput).toLocaleString('en-US')}
              </span>
            </div>
            <input
              type="range"
              min="5000000"
              max="500000000"
              step="5000000"
              value={estimatedValueInput}
              onChange={(e) => setEstimatedValueInput(Number(e.target.value))}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-semibold">
              <span>₦5M</span>
              <span>₦150M</span>
              <span>₦300M</span>
              <span>₦500M+</span>
            </div>
          </div>

          {/* Verification Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasClearTitle}
                onChange={(e) => setHasClearTitle(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 bg-stone-900 border-stone-700 focus:ring-0"
              />
              <span className="text-xs text-stone-300 font-medium">
                I have original Title Deed (C of O, Governor's Consent, or Registered Survey)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFurnishings}
                onChange={(e) => setIncludeFurnishings(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-stone-900 border-stone-700 focus:ring-0"
              />
              <span className="text-xs text-stone-300 font-medium">
                I want to bundle furniture, solar inverter, or vehicle for faster single-buyer takeover
              </span>
            </label>
          </div>

        </div>

        {/* Right Card: Output & Speed Analysis */}
        <div className="lg:col-span-5 glass-panel-gold p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              AI Liquidation Projection
            </div>
            <span className="badge-verified text-[11px] px-2 py-0.5 rounded-full font-bold">
              Instant Estimate
            </span>
          </div>

          {/* Recommended Fast-Close Liquidation Price */}
          <div className="space-y-1">
            <div className="text-xs text-stone-300 font-medium">
              Suggested Fast-Close Price ({Math.round((1 - discountMultiplier) * 100)}% Relocation Discount):
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {curr.symbol}{(suggestedLiquidationPrice / curr.rate).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-stone-400">
              Normal Market Rate: {curr.symbol}{(estimatedValueInput / curr.rate).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>

          {/* Speed & Metrics Matrix */}
          <div className="grid grid-cols-2 gap-3 bg-black/40 p-4 rounded-2xl border border-amber-500/20">
            <div>
              <div className="text-[11px] text-stone-400">Liquidation Speed Score</div>
              <div className="text-xl font-extrabold text-emerald-400 font-display mt-0.5">{speedScore}/100</div>
              <div className="text-[10px] text-stone-400">High closing velocity</div>
            </div>
            <div>
              <div className="text-[11px] text-stone-400">Est. Time to Close</div>
              <div className="text-xl font-extrabold text-amber-300 font-display mt-0.5">{estimatedDaysToClose}</div>
              <div className="text-[10px] text-stone-400">Via Verified Escrow</div>
            </div>
            <div>
              <div className="text-[11px] text-stone-400">Active Verified Buyers</div>
              <div className="text-xl font-extrabold text-white font-display mt-0.5">{buyerDemandCount}+</div>
              <div className="text-[10px] text-stone-400">In {calcState} & Diaspora</div>
            </div>
            <div>
              <div className="text-[11px] text-stone-400">Escrow Security</div>
              <div className="text-xl font-extrabold text-blue-400 font-display mt-0.5">100%</div>
              <div className="text-[10px] text-stone-400">Protected payout</div>
            </div>
          </div>

          {/* Next Step Action */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onOpenSellerWizard}
              className="w-full btn-gold justify-center py-3.5 text-sm font-bold shadow-lg cursor-pointer"
            >
              <span>List at this Price & Book Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-stone-400">
              A certified SellJapa on-ground scout will verify physical condition within 24 hours.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
