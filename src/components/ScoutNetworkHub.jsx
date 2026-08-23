import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Bell, 
  BellRing, 
  Plus, 
  CheckCircle2, 
  UserCheck, 
  DollarSign, 
  Phone, 
  Mail, 
  Award, 
  Eye, 
  Compass, 
  Calculator, 
  Clock, 
  Check, 
  ArrowRight, 
  Camera, 
  Video, 
  FileText, 
  Building2, 
  RefreshCw, 
  Flame, 
  Star, 
  User, 
  BadgeCheck, 
  Percent, 
  Lock, 
  Send,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_STATES, CERTIFIED_SCOUTS, INITIAL_SCOUT_MISSIONS, EXCHANGE_RATES } from '../data/mockData';

export function ScoutNetworkHub({
  currency = 'NGN',
  selectedState = "All 36 States + FCT",
  onSelectState,
  onOpenSellerWizard,
  onBackToExplore
}) {
  const currentRate = EXCHANGE_RATES[currency] || EXCHANGE_RATES.NGN;

  // Active view tab inside Scout Hub
  const [scoutTab, setScoutTab] = useState('missions'); // 'missions', 'register', 'directory', 'calculator'

  // Missions & Notifications State
  const [missions, setMissions] = useState(() => {
    try {
      const saved = localStorage.getItem('selljapa_scout_missions');
      return saved ? JSON.parse(saved) : INITIAL_SCOUT_MISSIONS;
    } catch {
      return INITIAL_SCOUT_MISSIONS;
    }
  });

  // Registered Scouts
  const [scoutsList, setScoutsList] = useState(() => {
    try {
      const saved = localStorage.getItem('selljapa_registered_scouts');
      return saved ? [...JSON.parse(saved), ...CERTIFIED_SCOUTS] : CERTIFIED_SCOUTS;
    } catch {
      return CERTIFIED_SCOUTS;
    }
  });

  // Current logged in / registered scout profile
  const [myScoutProfile, setMyScoutProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('selljapa_my_scout_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active notification toast
  const [activeToast, setActiveToast] = useState(null);
  const [filterState, setFilterState] = useState("All 36 States + FCT");
  const [isSimulating, setIsSimulating] = useState(false);

  // Selected mission for inspection report submission modal
  const [inspectingMission, setInspectingMission] = useState(null);
  const [inspectionReportForm, setInspectionReportForm] = useState({
    structuralScore: 98,
    titleVerified: true,
    boundaryOk: true,
    solarTested: true,
    videoTourUrl: "https://selljapa.ng/tours/4k-diaspora-vetted-tour",
    inspectorNotes: "Comprehensive physical check completed. Structural foundation solid, inverter lithium pack in 100% health. Ready for escrow close."
  });

  // Registration Form State
  const [regStep, setRegStep] = useState(1); // 1: Personal, 2: Coverage & Credentials, 3: Payout Account
  const [regForm, setRegForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "Lagos",
    lgasCovered: "Eti-Osa, Lekki, Ikoyi, Victoria Island",
    profession: "Registered Surveyor & Drone Operator",
    certBody: "SURCON (Surveyors Council of Nigeria)",
    certNumber: "SUR-2026-",
    experienceYears: "5+ Years",
    bankName: "Providus Bank / Zenith Bank",
    accountNumber: "",
    accountName: ""
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Calculator State
  const [calcPrice, setCalcPrice] = useState(150000000); // ₦150M

  // Sync missions to local storage
  useEffect(() => {
    try {
      localStorage.setItem('selljapa_scout_missions', JSON.stringify(missions));
    } catch (e) {
      console.error(e);
    }
  }, [missions]);

  // Simulate new listing push notification
  const handleSimulateNewListing = () => {
    setIsSimulating(true);
    const sampleAreas = [
      { area: "Maitama Diplomatic Zone", state: "Abuja FCT", lga: "Maitama", price: 320000000, title: "5-Bed Ambassadorial Villa + 15KVA Solar" },
      { area: "Lekki Phase 1", state: "Lagos", lga: "Eti-Osa", price: 185000000, title: "4-Bed Waterfront Terrace + 2022 GLE 450 + Whole Bundle" },
      { area: "Peter Odili Road", state: "Rivers", lga: "Port Harcourt", price: 110000000, title: "4-Bed Luxury Duplex + 100KVA Generator" },
      { area: "Independence Layout", state: "Enugu", lga: "Enugu North", price: 85000000, title: "4-Bed Executive Duplex on 2 Plots" },
      { area: "Bodija Estate", state: "Oyo", lga: "Ibadan North", price: 75000000, title: "Detached 5-Bed House + Furnishings" }
    ];
    const picked = sampleAreas[Math.floor(Math.random() * sampleAreas.length)];
    const comm = (picked.price * 2) / 100;

    const newMsn = {
      id: `msn-${Date.now().toString().slice(-4)}`,
      listingId: `jp-sim-${Date.now().toString().slice(-4)}`,
      title: `🚨 New Japa Listing: ${picked.title}`,
      location: `${picked.area}, ${picked.state}`,
      state: picked.state,
      lga: picked.lga,
      priceNGN: picked.price,
      potentialCommissionNGN: comm,
      urgency: "Expedited (10 Days)",
      closingTargetDays: 10,
      status: "Open Mission",
      assignedScoutId: null,
      assignedScoutName: null,
      timestamp: "Just now",
      details: "Seller relocating abroad. Fast physical survey and 4K diaspora inspection video requested. 2% success commission credited upon closing.",
      tasks: [
        "Physical title document & beacon confirmation",
        "Record 4K Ultra-HD interior and street video tour",
        "Test electrical & power backup equipment",
        "Submit verified inspection score"
      ]
    };

    setMissions(prev => [newMsn, ...prev]);
    setActiveToast({
      title: `🔔 Real-Time Scout Alert: ${picked.state} State`,
      message: `${picked.title} listed in ${picked.area}! Potential 2% Commission: ₦${comm.toLocaleString()}`,
      missionId: newMsn.id
    });

    setTimeout(() => {
      setIsSimulating(false);
    }, 600);

    // Audio chime simulation (Web Audio API)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (err) {}
  };

  // Accept a mission
  const handleAcceptMission = (missionId) => {
    const scoutName = myScoutProfile ? myScoutProfile.fullName : "Engr. Kayode Balogun (Certified Scout)";
    const scoutId = myScoutProfile ? myScoutProfile.id : "sct-001";

    setMissions(prev => prev.map(m => {
      if (m.id === missionId) {
        return {
          ...m,
          status: "In Progress",
          assignedScoutId: scoutId,
          assignedScoutName: scoutName
        };
      }
      return m;
    }));

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  // Submit inspection report
  const handleSubmitInspectionReport = (e) => {
    e.preventDefault();
    if (!inspectingMission) return;

    setMissions(prev => prev.map(m => {
      if (m.id === inspectingMission.id) {
        return {
          ...m,
          status: "Inspection Completed",
          inspectionScore: inspectionReportForm.structuralScore,
          inspectionReport: {
            ...inspectionReportForm,
            submittedAt: new Date().toLocaleTimeString(),
            scoutName: m.assignedScoutName || (myScoutProfile ? myScoutProfile.fullName : "Certified Scout")
          }
        };
      }
      return m;
    }));

    setInspectingMission(null);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Complete Scout Registration
  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    const newScoutId = `SCT-${regForm.state.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProfile = {
      id: newScoutId,
      name: regForm.fullName || "Certified On-Ground Scout",
      fullName: regForm.fullName,
      title: regForm.profession,
      badge: `${regForm.certBody} #${regForm.certNumber || 'SUR-9021'}`,
      state: regForm.state,
      lgas: regForm.lgasCovered.split(',').map(s => s.trim()),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      inspectionsCompleted: 0,
      totalCommissionEarnedNGN: 0,
      turnaround: "Under 12 Hours",
      phone: regForm.phone || "+234 800 000 0000",
      email: regForm.email || "scout@selljapa.ng",
      specializations: ["Physical Boundary Audit", "4K Video Tour", "Title Deed Search"],
      bankDetails: {
        bankName: regForm.bankName,
        accountNumber: regForm.accountNumber,
        accountName: regForm.accountName || regForm.fullName
      },
      status: "Active & Certified",
      registeredAt: new Date().toLocaleDateString()
    };

    setMyScoutProfile(newProfile);
    setScoutsList(prev => [newProfile, ...prev]);

    try {
      localStorage.setItem('selljapa_my_scout_profile', JSON.stringify(newProfile));
      const existing = JSON.parse(localStorage.getItem('selljapa_registered_scouts') || '[]');
      localStorage.setItem('selljapa_registered_scouts', JSON.stringify([newProfile, ...existing]));
    } catch (err) {}

    setRegSuccess(true);

    try {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.55 }
      });
    } catch (e) {}
  };

  // Filtered Missions by State
  const filteredMissions = missions.filter(m => {
    if (filterState !== "All 36 States + FCT" && m.state !== filterState) return false;
    return true;
  });

  const filteredScouts = scoutsList.filter(s => {
    if (filterState !== "All 36 States + FCT" && s.state !== filterState) return false;
    return true;
  });

  // Calculate live 2% commission
  const calculatedCommission = (calcPrice * 2) / 100;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Real-time Notification Toast Banner */}
      {activeToast && (
        <div className="bg-gradient-to-r from-amber-950/95 via-emerald-950/90 to-stone-900 border-2 border-amber-400 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40 animate-pulse">
              <BellRing className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-black text-amber-300 uppercase tracking-wider">{activeToast.title}</div>
              <div className="text-sm font-bold text-white">{activeToast.message}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setScoutTab('missions');
                setActiveToast(null);
                const el = document.getElementById('scout-missions-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold py-2 px-4 text-xs font-bold w-full sm:w-auto justify-center"
            >
              View Mission & Accept
            </button>
            <button
              onClick={() => setActiveToast(null)}
              className="p-2 rounded-xl bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Hero Banner with Nationwide Scout Value Proposition */}
      <div className="relative glass-panel-emerald p-6 sm:p-10 rounded-3xl border border-emerald-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-emerald-500/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified On-Ground Scout & Valuation Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
              Earn <span className="text-gradient-gold">2% Success Commission</span> on Verified Relocation Deals.
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
              Are you a licensed surveyor, valuer, drone pilot, or estate verification specialist? Join SellJapa's certified scout network across all 36 States + FCT. <strong>Zero upfront fee to inspect</strong> — receive guaranteed 2% payout directly from closed escrow proceeds upon property handover.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setScoutTab('register')}
                className="btn-gold py-3 px-6 text-xs sm:text-sm font-extrabold shadow-xl cursor-pointer flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-stone-950" />
                <span>Register as Certified Scout (Free)</span>
              </button>

              <button
                onClick={handleSimulateNewListing}
                disabled={isSimulating}
                className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold border-amber-500/40 text-amber-300 hover:bg-amber-950/40 cursor-pointer flex items-center gap-2"
              >
                <BellRing className={`w-4 h-4 ${isSimulating ? 'animate-bounce' : ''}`} />
                <span>Simulate New Listing Alert</span>
              </button>

              <button
                onClick={() => setScoutTab('calculator')}
                className="btn-secondary py-3 px-5 text-xs sm:text-sm font-bold border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 cursor-pointer flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Commission Calculator</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics & Commission Card */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-80 shrink-0">
            <div className="bg-stone-900/90 border border-emerald-800/40 p-4 rounded-2xl text-center">
              <div className="text-2xl font-black text-amber-400 font-display">2.0%</div>
              <div className="text-[11px] text-stone-400 font-semibold mt-0.5">Scout Commission per Closed Deal</div>
            </div>
            <div className="bg-stone-900/90 border border-emerald-800/40 p-4 rounded-2xl text-center">
              <div className="text-2xl font-black text-emerald-400 font-display">₦0.00</div>
              <div className="text-[11px] text-stone-400 font-semibold mt-0.5">Upfront Inspection Fee to Scout</div>
            </div>
            <div className="bg-stone-900/90 border border-emerald-800/40 p-4 rounded-2xl text-center">
              <div className="text-2xl font-black text-white font-display">36 + FCT</div>
              <div className="text-[11px] text-stone-400 font-semibold mt-0.5">States Territory Coverage</div>
            </div>
            <div className="bg-stone-900/90 border border-emerald-800/40 p-4 rounded-2xl text-center">
              <div className="text-2xl font-black text-blue-400 font-display">&lt; 18 Hrs</div>
              <div className="text-[11px] text-stone-400 font-semibold mt-0.5">Avg. Physical Verification Time</div>
            </div>
          </div>
        </div>

        {/* Registered Scout Active Badge if logged in */}
        {myScoutProfile && (
          <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm shadow">
                ID
              </div>
              <div>
                <div className="font-extrabold text-white flex items-center gap-1.5">
                  <span>{myScoutProfile.fullName}</span>
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.2 rounded border border-emerald-500/40 font-mono">
                    {myScoutProfile.id}
                  </span>
                </div>
                <div className="text-[11px] text-stone-400">
                  Certified Area: <strong>{myScoutProfile.state} State</strong> ({myScoutProfile.lgas?.join(', ')}) • Payout: {myScoutProfile.bankDetails?.bankName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge-verified px-3 py-1 rounded-full text-[11px] font-bold">
                ✓ Ready for Missions
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setScoutTab('missions')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              scoutTab === 'missions'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <BellRing className="w-4 h-4 text-amber-400" />
            <span>Live Mission Alerts ({missions.length})</span>
          </button>

          <button
            onClick={() => setScoutTab('register')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              scoutTab === 'register'
                ? 'bg-amber-500 text-stone-950 shadow-lg'
                : 'bg-stone-900 text-amber-300/90 hover:text-white hover:bg-stone-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Scout Registration Portal</span>
          </button>

          <button
            onClick={() => setScoutTab('directory')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              scoutTab === 'directory'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Certified Scouts Directory ({scoutsList.length})</span>
          </button>

          <button
            onClick={() => setScoutTab('calculator')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              scoutTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>2% Commission Calculator</span>
          </button>
        </div>

        {/* State Filter for Missions / Directory */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="bg-stone-900 border border-stone-700 text-emerald-300 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="All 36 States + FCT">All 36 States + FCT</option>
            {ALL_STATES.filter(s => s !== "All 36 States + FCT").map(st => (
              <option key={st} value={st}>{st} State</option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= TAB 1: LIVE MISSION ALERTS & TASK BOARD ================= */}
      {scoutTab === 'missions' && (
        <div id="scout-missions-section" className="space-y-6 animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c1611] p-4 rounded-2xl border border-stone-800">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-display flex items-center gap-2">
                <span>Real-Time Relocation Asset Inspection Feed</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Whenever a relocating seller uploads a property or whole-house bundle, scouts in that state receive an instant task alert. Accept missions to earn your 2% escrow closing commission.
              </p>
            </div>
            <button
              onClick={handleSimulateNewListing}
              className="btn-gold py-2 px-4 text-xs font-extrabold shrink-0 shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Incoming Listing</span>
            </button>
          </div>

          {/* Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMissions.map((mission) => {
              const convertedPrice = (mission.priceNGN / currentRate.rate).toLocaleString('en-US', { maximumFractionDigits: 0 });
              const convertedCommission = (mission.potentialCommissionNGN / currentRate.rate).toLocaleString('en-US', { maximumFractionDigits: 0 });

              return (
                <div 
                  key={mission.id}
                  className="glass-panel p-5 rounded-2xl border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 relative"
                >
                  {/* Top Status & Timestamp */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="bg-stone-900 text-stone-300 font-semibold px-2.5 py-1 rounded-lg border border-stone-700 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {mission.state} State
                      </span>
                      <span className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {mission.timestamp}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                      mission.status === 'Open Mission'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40 animate-pulse'
                        : mission.status === 'In Progress'
                          ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                          : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {mission.status}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug">
                      {mission.title}
                    </h3>
                    <div className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                      <strong className="text-emerald-300">{mission.location}</strong> • LGA: {mission.lga}
                    </div>
                    <p className="text-xs text-stone-300 mt-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800 leading-relaxed">
                      {mission.details}
                    </p>
                  </div>

                  {/* Required Inspection Tasks List */}
                  <div className="space-y-1.5 bg-black/40 p-3 rounded-xl border border-stone-800/80 text-xs">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                      Assigned Scout Mission Scope:
                    </div>
                    {mission.tasks?.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-stone-300 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>

                  {/* Commission Calculation & Action Footer */}
                  <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-stone-400">
                        Asset Liquidation Price: <strong className="text-stone-200">{currentRate.symbol}{convertedPrice}</strong>
                      </div>
                      <div className="text-sm font-extrabold text-gradient-gold">
                        Potential 2% Payout: {currentRate.symbol}{convertedCommission}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {mission.status === 'Open Mission' ? (
                        <button
                          onClick={() => handleAcceptMission(mission.id)}
                          className="btn-gold py-2 px-4 text-xs font-bold shadow cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept & Claim Task</span>
                        </button>
                      ) : mission.status === 'In Progress' ? (
                        <button
                          onClick={() => setInspectingMission(mission)}
                          className="btn-emerald py-2 px-4 text-xs font-bold shadow cursor-pointer flex items-center gap-1"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Submit Verification Report</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verified ({mission.inspectionScore || 98}%)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Assigned Scout Badge if accepted */}
                  {mission.assignedScoutName && (
                    <div className="text-[11px] text-stone-400 bg-stone-900/90 px-3 py-1.5 rounded-xl flex items-center justify-between border border-stone-800">
                      <span>Assigned Scout: <strong className="text-white">{mission.assignedScoutName}</strong></span>
                      <span className="text-amber-400 font-semibold">2% Escrow Tagged</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ================= TAB 2: INTERACTIVE SCOUT REGISTRATION PORTAL ================= */}
      {scoutTab === 'register' && (
        <div className="max-w-3xl mx-auto glass-panel-emerald p-6 sm:p-10 rounded-3xl border border-emerald-500/40 bg-[#09120e] shadow-2xl animate-in fade-in">
          
          {!regSuccess ? (
            <form onSubmit={handleCompleteRegistration} className="space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SellJapa Certified Scout Network Enrollment</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Scout Registration & Payout Onboarding
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Get verified to conduct physical property inspections, verify land title deeds, and film 4K video walkthroughs for diaspora buyers in your state.
                </p>

                {/* 3 Step Progress */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-800">
                  {[
                    { num: 1, label: "Profile & Contact" },
                    { num: 2, label: "Territory & License" },
                    { num: 3, label: "Payout Bank Account" }
                  ].map((s) => (
                    <div key={s.num} className="flex flex-col gap-1">
                      <div className={`h-1.5 rounded-full transition-all ${
                        regStep >= s.num ? 'bg-gradient-to-r from-amber-500 to-emerald-400' : 'bg-stone-800'
                      }`}></div>
                      <span className={`text-[10px] font-bold ${
                        regStep === s.num ? 'text-amber-400' : regStep > s.num ? 'text-emerald-400' : 'text-stone-500'
                      }`}>
                        {s.num}. {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 1: Personal & WhatsApp Contact */}
              {regStep === 1 && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">Full Legal Name (As in NIN / Bank)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Babatunde Kayode"
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Active WhatsApp Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803 892 1092"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Official Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. surveyor.kayode@gmail.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200">
                    💡 <strong>Instant Alert Integration:</strong> When verified, new listings within your territory are sent directly to your phone and SellJapa scout dashboard.
                  </div>
                </div>
              )}

              {/* STEP 2: Territory & Professional Qualifications */}
              {regStep === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Primary State Territory</label>
                      <select
                        value={regForm.state}
                        onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                      >
                        {ALL_STATES.filter(s => s !== "All 36 States + FCT").map(st => (
                          <option key={st} value={st}>{st} State</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Professional Discipline</label>
                      <select
                        value={regForm.profession}
                        onChange={(e) => setRegForm({ ...regForm, profession: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                      >
                        <option value="Registered Surveyor & Drone Operator">Registered Surveyor & Drone Operator</option>
                        <option value="Architect & Valuation Inspector">Architect & Valuation Inspector</option>
                        <option value="Estate Surveyor & Valuer (NIESV)">Estate Surveyor & Valuer (NIESV)</option>
                        <option value="Property Solicitor / Legal Auditor">Property Solicitor / Legal Auditor</option>
                        <option value="Certified Civil / Structural Engineer">Certified Civil / Structural Engineer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">LGAs / Neighborhoods Covered</label>
                    <input
                      type="text"
                      placeholder="e.g. Eti-Osa, Lekki Phase 1, Ikoyi, Victoria Island, Ikeja"
                      value={regForm.lgasCovered}
                      onChange={(e) => setRegForm({ ...regForm, lgasCovered: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Professional Body / Accreditation</label>
                      <input
                        type="text"
                        placeholder="e.g. SURCON / ARCON / NIESV / NBA"
                        value={regForm.certBody}
                        onChange={(e) => setRegForm({ ...regForm, certBody: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">License / Reg Number</label>
                      <input
                        type="text"
                        placeholder="e.g. SUR-2026-8941"
                        value={regForm.certNumber}
                        onChange={(e) => setRegForm({ ...regForm, certNumber: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Payout Settlement Account */}
              {regStep === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-200">
                    💰 <strong>Automatic 2% Escrow Settlement:</strong> When a buyer pays and the escrow is released upon property handover, your 2% commission is deposited directly into this bank account without intermediary delays.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">Nigerian Commercial / Fintech Bank</label>
                      <select
                        value={regForm.bankName}
                        onChange={(e) => setRegForm({ ...regForm, bankName: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                      >
                        <option value="Providus Bank">Providus Bank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="GTBank (Guaranty Trust)">GTBank (Guaranty Trust)</option>
                        <option value="Access Bank">Access Bank</option>
                        <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                        <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                        <option value="OPay / Moniepoint / PalmPay">OPay / Moniepoint / PalmPay</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1">NUBAN Account Number (10 Digits)</label>
                      <input
                        type="text"
                        maxLength="10"
                        required
                        placeholder="e.g. 0123456789"
                        value={regForm.accountNumber}
                        onChange={(e) => setRegForm({ ...regForm, accountNumber: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 text-amber-400 font-mono font-bold rounded-xl p-3 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">Account Holder Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BABATUNDE KAYODE"
                      value={regForm.accountName}
                      onChange={(e) => setRegForm({ ...regForm, accountName: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                {regStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setRegStep(regStep - 1)}
                    className="btn-secondary text-xs px-4 py-2"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {regStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setRegStep(regStep + 1)}
                    className="btn-gold text-xs px-6 py-2.5 font-bold flex items-center gap-1"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-emerald text-xs sm:text-sm px-8 py-3 font-extrabold shadow-xl cursor-pointer flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Complete Enrollment & Issue Scout ID</span>
                  </button>
                )}
              </div>

            </form>
          ) : (
            /* Registration Success & Digital ID Card */
            <div className="text-center py-6 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <BadgeCheck className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Certified Scout Enrollment Approved!
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-md mx-auto">
                  Welcome to the SellJapa Property Inspection Network. Your official digital Scout ID has been generated and linked to your territory.
                </p>
              </div>

              {/* Digital Scout ID Card */}
              {myScoutProfile && (
                <div className="max-w-md mx-auto bg-gradient-to-br from-stone-900 via-[#0d1f17] to-stone-950 p-6 rounded-3xl border-2 border-amber-500/50 shadow-2xl text-left relative overflow-hidden space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center justify-center text-xs">
                        SJ
                      </div>
                      <span className="font-extrabold text-white text-xs">SellJapa Certified Scout ID</span>
                    </div>
                    <span className="badge-verified px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      ACTIVE & VERIFIED
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={myScoutProfile.avatar}
                      alt={myScoutProfile.fullName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/60 shadow"
                    />
                    <div>
                      <div className="text-base font-black text-white">{myScoutProfile.fullName}</div>
                      <div className="text-xs text-amber-400 font-semibold">{myScoutProfile.title}</div>
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">ID: {myScoutProfile.id}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/40 p-3 rounded-xl border border-stone-800">
                    <div>
                      <span className="text-stone-400">Territory:</span>
                      <div className="font-bold text-white">{myScoutProfile.state} State</div>
                    </div>
                    <div>
                      <span className="text-stone-400">Commission Rate:</span>
                      <div className="font-bold text-emerald-400">2.0% on Closing</div>
                    </div>
                    <div>
                      <span className="text-stone-400">Accreditation:</span>
                      <div className="font-bold text-stone-200 truncate">{myScoutProfile.badge}</div>
                    </div>
                    <div>
                      <span className="text-stone-400">Payout Bank:</span>
                      <div className="font-bold text-stone-200">{myScoutProfile.bankDetails?.bankName}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setScoutTab('missions')}
                  className="btn-gold px-8 py-3 text-xs sm:text-sm font-extrabold cursor-pointer"
                >
                  View Open Mission Alerts &rarr;
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= TAB 3: CERTIFIED SCOUTS DIRECTORY ACROSS 36 STATES ================= */}
      {scoutTab === 'directory' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="bg-[#0c1611] p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-display">
                Certified On-Ground Property & Asset Scouts Directory
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Every scout is professionally vetted (SURCON, ARCON, NIESV, NBA) to perform physical boundary surveys, drone recordings, and title registry validations.
              </p>
            </div>

            <button
              onClick={() => setScoutTab('register')}
              className="btn-gold py-2 px-4 text-xs font-bold shrink-0"
            >
              + Join as Certified Scout
            </button>
          </div>

          {/* Scouts Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredScouts.map((scout) => (
              <div 
                key={scout.id}
                className="glass-panel p-5 rounded-2xl border-stone-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={scout.avatar}
                        alt={scout.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40"
                      />
                      <div>
                        <h3 className="text-sm font-black text-white leading-snug">{scout.name}</h3>
                        <div className="text-[11px] text-amber-400 font-semibold">{scout.title}</div>
                        <div className="text-[10px] text-stone-400">{scout.badge}</div>
                      </div>
                    </div>

                    <span className="badge-verified px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0">
                      ★ {scout.rating}
                    </span>
                  </div>

                  {/* Territory & LGAs */}
                  <div className="mt-3 text-xs bg-stone-900/60 p-2.5 rounded-xl border border-stone-800 space-y-1">
                    <div className="text-stone-300 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{scout.state} State</span>
                    </div>
                    <div className="text-[11px] text-stone-400 line-clamp-1">
                      LGAs: {scout.lgas?.join(', ')}
                    </div>
                  </div>

                  {/* Specializations Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {scout.specializations?.map((spec, idx) => (
                      <span key={idx} className="text-[10px] bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600/30">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats & Request Inspection Button */}
                <div className="pt-3 border-t border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>Inspections Done: <strong className="text-white">{scout.inspectionsCompleted}</strong></span>
                    <span>Turnaround: <strong className="text-emerald-400">{scout.turnaround}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${scout.phone}`}
                      className="btn-secondary py-2 px-3 text-xs flex-1 justify-center flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call Scout</span>
                    </a>
                    <button
                      onClick={() => onOpenSellerWizard()}
                      className="btn-emerald py-2 px-3 text-xs flex-1 justify-center flex items-center gap-1 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Book Scout</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= TAB 4: 2% SCOUT COMMISSION CALCULATOR ================= */}
      {scoutTab === 'calculator' && (
        <div className="max-w-3xl mx-auto glass-panel-gold p-6 sm:p-10 rounded-3xl border border-amber-500/40 bg-[#111814] shadow-2xl space-y-8 animate-in fade-in">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
              <Percent className="w-3.5 h-3.5" />
              <span>Interactive Scout Earning Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Calculate Your 2% Scout Success Commission
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
              Scouts do not charge any fee to the seller upfront. Upon escrow deal closing and property handover, 2% of the deal sum is automatically disbursed to the certified scout.
            </p>
          </div>

          {/* Interactive Price Slider */}
          <div className="bg-stone-900/90 p-6 rounded-2xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-300">Property / Bundle Liquidation Value:</label>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-display">
                ₦{Number(calcPrice).toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="15000000"
              max="500000000"
              step="5000000"
              value={calcPrice}
              onChange={(e) => setCalcPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>₦15M (Plot / Mini-flat)</span>
              <span>₦150M (Duplex Bundle)</span>
              <span>₦500M (Luxury Estate)</span>
            </div>
          </div>

          {/* Payout Display Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-500/40 space-y-1 text-center">
              <div className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">Your Scout 2% Escrow Payout</div>
              <div className="text-3xl sm:text-4xl font-black text-white font-display">
                ₦{calculatedCommission.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400">Direct Wire to NUBAN on Closing</div>
            </div>

            <div className="bg-stone-900/90 p-5 rounded-2xl border border-stone-800 space-y-2 text-xs text-stone-300">
              <div className="font-bold text-white flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>How Escrow Payout Works:</span>
              </div>
              <div className="space-y-1 text-[11px] text-stone-400 leading-relaxed">
                <div>• Upfront Platform Token Fee: <strong>₦5,000</strong> (Paid by Seller for listing/marketing)</div>
                <div>• Scout Fee to inspect: <strong>₦0.00</strong> (Free for seller)</div>
                <div>• Scout Success Commission: <strong>2%</strong> (Deducted directly from escrow release)</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setScoutTab('register')}
              className="btn-gold py-3 px-8 text-xs sm:text-sm font-extrabold shadow-xl cursor-pointer"
            >
              Enroll & Start Earning 2% Commissions &rarr;
            </button>
          </div>

        </div>
      )}

      {/* ================= SUBMIT INSPECTION REPORT MODAL ================= */}
      {inspectingMission && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-xl glass-panel-emerald rounded-3xl p-6 bg-[#0b1410] border border-emerald-500/40 shadow-2xl space-y-5">
            <button
              onClick={() => setInspectingMission(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white"
            >
              ✕
            </button>

            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Scout Verification Filing Desk</span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-display">
                Submit Physical Inspection Report
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Mission: <strong className="text-stone-200">{inspectingMission.title}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmitInspectionReport} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-300 mb-1">
                  Overall Structural & Asset Quality Score: <strong className="text-emerald-400">{inspectionReportForm.structuralScore}%</strong>
                </label>
                <input
                  type="range"
                  min="75"
                  max="100"
                  value={inspectionReportForm.structuralScore}
                  onChange={(e) => setInspectionReportForm({ ...inspectionReportForm, structuralScore: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 bg-stone-900 p-3 rounded-xl border border-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inspectionReportForm.titleVerified}
                    onChange={(e) => setInspectionReportForm({ ...inspectionReportForm, titleVerified: e.target.checked })}
                    className="accent-emerald-500"
                  />
                  <span className="font-semibold text-stone-200">Title Registry Verified</span>
                </label>

                <label className="flex items-center gap-2 bg-stone-900 p-3 rounded-xl border border-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inspectionReportForm.solarTested}
                    onChange={(e) => setInspectionReportForm({ ...inspectionReportForm, solarTested: e.target.checked })}
                    className="accent-emerald-500"
                  />
                  <span className="font-semibold text-stone-200">Power & Solar Diagnostic Ok</span>
                </label>
              </div>

              <div>
                <label className="block font-bold text-stone-300 mb-1">4K Walkthrough Video / Drone Cloud Tour Link</label>
                <input
                  type="url"
                  value={inspectionReportForm.videoTourUrl}
                  onChange={(e) => setInspectionReportForm({ ...inspectionReportForm, videoTourUrl: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-300 mb-1">Scout Certification Notes & Findings</label>
                <textarea
                  rows="3"
                  value={inspectionReportForm.inspectorNotes}
                  onChange={(e) => setInspectionReportForm({ ...inspectionReportForm, inspectorNotes: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-2.5 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInspectingMission(null)}
                  className="btn-secondary py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-emerald py-2.5 px-6 font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Verified Inspection Report</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
