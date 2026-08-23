import React from 'react';
import { ShieldCheck, Lock, Landmark, FileCheck, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Building, FileText, UserCheck, KeyRound, Percent, DollarSign } from 'lucide-react';

export function EscrowSafetyHub({ onOpenSellerWizard, onBackToExplore }) {
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

        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          100% Lawyer & Bank Backed
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Trust & Transparent Fee Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          How SellJapa Escrow & <span className="text-gradient-emerald">Scout Commission</span> Works
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm">
          A fair, modern proptech model: Small ₦5,000 platform token for services rendered, and on-ground scouts earn a commission percentage only upon successful deal closing.
        </p>
      </div>

      {/* 2 Fee Pillars Infographic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: Platform Service Fee */}
        <div className="glass-panel p-6 rounded-3xl border-amber-500/30 bg-[#0e1913] space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-base border border-amber-500/40">
            ₦5k
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">Platform Listing & Service Fee</h3>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">₦5,000 Flat</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Paid upfront by the seller for the technology services rendered by the platform:
          </p>
          <ul className="text-xs text-stone-400 space-y-1.5 pl-4 list-disc">
            <li>AI liquidation valuation and dynamic pricing algorithm.</li>
            <li>Marketing reach to 25,000+ local and diaspora cash buyers (UK, US, Canada).</li>
            <li>Dedicated Deal Room hosting and 4K virtual inspection streaming.</li>
            <li>Custodial bank escrow infrastructure and document vault.</li>
          </ul>
        </div>

        {/* Pillar 2: Scout Success Commission */}
        <div className="glass-panel p-6 rounded-3xl border-emerald-500/30 bg-[#0e1913] space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-base border border-emerald-500/40">
            <Percent className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">On-Ground Scout Success Commission</h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">~2% on Success</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Certified field scouts on the ground in all 36 states work strictly on a success-fee commission:
          </p>
          <ul className="text-xs text-stone-400 space-y-1.5 pl-4 list-disc">
            <li><strong>Zero upfront viewing charges</strong> to sellers or buyers.</li>
            <li>Conducts physical walk-throughs, video recordings, and vehicle inspections.</li>
            <li>Earns an agreed percentage (e.g. 2%) paid by the seller from final escrow release.</li>
            <li>Aligns incentives: Scouts only get paid when the seller successfully sells.</li>
          </ul>
        </div>

      </div>

      {/* 4 Steps Escrow Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
        
        <div className="glass-panel p-5 rounded-2xl border-stone-800 relative space-y-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="text-sm font-bold text-white">Physical Title & Asset Verification</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            On-ground scouts conduct on-site inspections, inspect structural integrity, and search deeds at the State Ministry of Lands.
          </p>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> No unregistered land disputes
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-stone-800 relative space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="text-sm font-bold text-white">Bank Custodial Escrow Lock</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Buyer deposits purchase funds into a licensed CBN-regulated custodial trust account. The seller cannot withdraw until handover.
          </p>
          <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Funds protected in vault
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-stone-800 relative space-y-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h3 className="text-sm font-bold text-white">Legal Conveyancing & Key Handover</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Our legal team drafts and witnesses the Deed of Assignment, vehicle change of ownership, and physical key handover.
          </p>
          <div className="text-[10px] text-blue-400 font-semibold flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Official legal deeds signed
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-stone-800 relative space-y-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <h3 className="text-sm font-bold text-white">Instant Escrow Release</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Upon verified handover confirmation, net escrow funds are disbursed to the seller, and the scout commission is settled automatically.
          </p>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5" /> Direct wire transfer
          </div>
        </div>

      </div>

    </section>
  );
}
