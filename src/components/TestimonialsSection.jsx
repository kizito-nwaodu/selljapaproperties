import React from 'react';
import { Quote, Star, Plane, CheckCircle2 } from 'lucide-react';
import { JAPA_STORIES } from '../data/mockData';

export function TestimonialsSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>Real Nigerian Relocation Experiences</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display">
          Closed Before Takeoff: <span className="text-gradient-gold">Japa Success Stories</span>
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm">
          Hear from Nigerians who liquidated their properties across Lagos, Abuja, Port Harcourt, and Enugu safely before their flight date.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {JAPA_STORIES.map((story, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-stone-800 flex flex-col justify-between space-y-4 bg-[#0e1612]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={story.avatar} alt={story.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
                  <div>
                    <div className="text-xs font-bold text-white">{story.name}</div>
                    <div className="text-[10px] text-amber-300 flex items-center gap-1">
                      <Plane className="w-2.5 h-2.5 transform -rotate-45" />
                      <span>{story.route}</span>
                    </div>
                  </div>
                </div>
                <Quote className="w-5 h-5 text-stone-600 opacity-60" />
              </div>

              <p className="text-xs text-stone-300 leading-relaxed italic">
                "{story.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800/80 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{story.asset}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
