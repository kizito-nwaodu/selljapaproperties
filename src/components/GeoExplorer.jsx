import React, { useState } from 'react';
import { MapPin, Building, ChevronRight, Sparkles, Navigation, Globe, CheckCircle2 } from 'lucide-react';
import { NIGERIAN_ZONES } from '../data/mockData';

export function GeoExplorer({ selectedState, setSelectedState, onSelectStateAndExplore }) {
  const [activeZone, setActiveZone] = useState("South West");

  const currentZoneData = NIGERIAN_ZONES.find(z => z.name === activeZone) || NIGERIAN_ZONES[0];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>Nationwide Nigerian Liquidation Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Explore Japa Deals Across <span className="text-gradient-emerald">36 States + FCT</span>
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm">
          From Lagos and Abuja to Port Harcourt, Ibadan, Enugu, Asaba, and Kano — our certified field scouts and legal title searchers cover every corner of Nigeria.
        </p>
      </div>

      {/* Geopolitical Zone Selector Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6">
        {NIGERIAN_ZONES.map((zone) => (
          <button
            key={zone.name}
            onClick={() => setActiveZone(zone.name)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
              activeZone === zone.name
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/40'
                : 'bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            {zone.name}
          </button>
        ))}
      </div>

      {/* Zone Details & States Grid */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-stone-800 bg-[#0e1613]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-4 mb-6 gap-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-400" />
              <span>{activeZone} Region</span>
            </h3>
            <p className="text-xs text-amber-400/90 font-medium mt-0.5">{currentZoneData.highlight}</p>
          </div>
          <span className="text-xs text-stone-400">
            {currentZoneData.states.length} Active States Monitored
          </span>
        </div>

        {/* States Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {currentZoneData.states.map((st) => (
            <div
              key={st}
              onClick={() => onSelectStateAndExplore(st)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
                selectedState === st
                  ? 'bg-emerald-950/80 border-emerald-500 shadow-md'
                  : 'bg-stone-900/70 border-stone-800/80 hover:border-amber-500/50 hover:bg-stone-800/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">STATE</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {st}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-800/60 text-[10px] text-stone-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Active Scouts</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for local agents/scouts */}
        <div className="mt-8 pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-400 gap-2">
          <span>Are you a registered Nigerian surveyor, lawyer, or estate scout in {activeZone}?</span>
          <span className="text-amber-400 font-semibold cursor-pointer hover:underline">
            Join SellJapa Certified Scout Network &rarr;
          </span>
        </div>

      </div>

    </section>
  );
}
