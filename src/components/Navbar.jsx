import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Menu, 
  X, 
  MessageSquare, 
  PhoneCall, 
  KeyRound, 
  User, 
  LogOut, 
  ChevronDown,
  Globe,
  PlusCircle,
  Calculator,
  Terminal,
  Lock,
  LayoutDashboard,
  LogIn,
  UserPlus
} from 'lucide-react';
import { ALL_STATES, EXCHANGE_RATES } from '../data/mockData';

export function Navbar({
  selectedState,
  setSelectedState,
  currency,
  setCurrency,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenSellerWizard,
  onOpenApiConsole,
  onOpenChat,
  onOpenDashboard,
  activeTab,
  setActiveTab
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#080f0c]/95 backdrop-blur-md border-b border-emerald-900/40 transition-all">
      {/* Top Security & Privacy Sub-bar */}
      <div className="bg-[#050a08] border-b border-emerald-950 px-4 py-1 text-[11px] text-stone-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="badge-verified px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            VERIFIED RELOCATION
          </span>
          <span className="hidden sm:inline text-stone-400">
            Relocating abroad? Liquidate properties, vehicles & whole-house bundles swiftly with 100% privacy & escrow protection.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenApiConsole}
            className="text-amber-400 hover:text-amber-300 font-mono text-[10px] flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 cursor-pointer"
          >
            <Terminal className="w-3 h-3" />
            <span>&gt;_ Demo APIs</span>
          </button>
          
          <div className="hidden md:flex items-center gap-1 text-emerald-400 font-medium">
            <Lock className="w-3 h-3" />
            <span>100% Escrow Protected</span>
          </div>

          <span className="text-stone-500 hidden md:inline">|</span>

          <span className="text-amber-400 font-semibold hidden md:inline">
            36 States + FCT
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-amber-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#080f0c] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-400 group-hover:rotate-6 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
                    Sell<span className="text-amber-400">Japa</span><span className="text-emerald-400">Properties</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-600/40">
                    .ng
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium tracking-wide">
                  Confidential & Verified Relocation Asset Liquidation
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-stone-300">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'hover:text-amber-400 hover:bg-stone-900/60'
              }`}
            >
              Browse Deals
            </button>

            <button
              onClick={() => setActiveTab('bundles')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'bundles'
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-500/50 shadow'
                  : 'hover:text-amber-400 hover:bg-stone-900/60 text-amber-300/90'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Whole-House Bundles</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'hover:text-amber-400 hover:bg-stone-900/60'
              }`}
            >
              Fast Valuation
            </button>

            <button
              onClick={() => setActiveTab('escrow')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === 'escrow'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'hover:text-amber-400 hover:bg-stone-900/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Escrow & Safety</span>
            </button>

            <button
              onClick={() => setActiveTab('diaspora')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === 'diaspora'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow'
                  : 'hover:text-amber-400 hover:bg-stone-900/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diaspora Hub</span>
            </button>
          </div>

          {/* Right Action Tools, Currency, Auth & Post Asset */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Live Deal Negotiation Chat Trigger */}
            <button
              onClick={onOpenChat}
              className="p-2 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors relative cursor-pointer"
              title="Encrypted Deal Rooms"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-stone-900/90 border border-stone-700 text-amber-400 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                {Object.keys(EXCHANGE_RATES).map((curr) => (
                  <option key={curr} value={curr}>
                    {EXCHANGE_RATES[curr].symbol} {curr}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter Pill Dropdown */}
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-stone-900/90 border border-emerald-800/80 text-emerald-300 text-xs font-semibold rounded-xl px-2 py-1.5 focus:outline-none cursor-pointer max-w-[110px] truncate"
              >
                {ALL_STATES.map((st) => (
                  <option key={st} value={st}>
                    📍 {st}
                  </option>
                ))}
              </select>
            </div>

            {/* User Auth or Profile Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-stone-900 border border-amber-500/50 rounded-xl p-1.5 pr-2.5 text-xs text-white hover:border-amber-400 transition-all cursor-pointer shadow-md"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-lg object-cover"
                  />
                  <span className="font-bold truncate max-w-[90px]">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#0f1714] border border-stone-800 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in">
                    <div className="px-3 py-2 border-b border-stone-800">
                      <div className="font-bold text-white truncate">{currentUser.name}</div>
                      <div className="text-[10px] text-stone-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 text-[10px] text-amber-400 font-extrabold uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{currentUser.role === 'relocator_seller' ? 'Relocating Seller Portal' : 'Investor / Buyer Portal'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => { onOpenDashboard(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 rounded-xl flex items-center gap-2 mt-2 font-bold cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-400" />
                      <span>Open {currentUser.role === 'relocator_seller' ? 'Seller' : 'Buyer'} Dashboard</span>
                    </button>

                    <button
                      onClick={() => { onOpenSellerWizard(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-stone-200 hover:bg-emerald-950/60 rounded-xl flex items-center gap-2 mt-1 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-400" />
                      <span>Post Relocation Listing</span>
                    </button>

                    <button
                      onClick={() => { onOpenChat(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-stone-200 hover:bg-emerald-950/60 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Deal Messages & Offers</span>
                    </button>

                    <div className="border-t border-stone-800 my-1"></div>

                    <button
                      onClick={() => { onLogout(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-950/40 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* STANDARD DISTINCT LOG IN AND SIGN UP BUTTONS */
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-amber-400 hover:border-amber-500/50 transition-all text-xs font-bold cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* List Property / Bundle CTA */}
            <button
              onClick={onOpenSellerWizard}
              className="btn-gold py-2 px-3 text-xs flex items-center gap-1.5 shadow-lg cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>List Asset</span>
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-900 text-stone-300 border border-stone-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a120e] border-b border-stone-800 p-4 space-y-3 animate-in fade-in">
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { setActiveTab('explore'); setIsMobileMenuOpen(false); }}
              className="p-2 rounded-xl bg-stone-900 text-white font-bold text-center border border-stone-800"
            >
              Browse Deals
            </button>
            <button
              onClick={() => { setActiveTab('bundles'); setIsMobileMenuOpen(false); }}
              className="p-2 rounded-xl bg-amber-950/40 text-amber-300 font-bold text-center border border-amber-500/30"
            >
              Whole-House Bundles
            </button>
            <button
              onClick={() => { setActiveTab('calculator'); setIsMobileMenuOpen(false); }}
              className="p-2 rounded-xl bg-stone-900 text-stone-300 font-bold text-center border border-stone-800"
            >
              Fast Valuation
            </button>
            <button
              onClick={() => { setActiveTab('escrow'); setIsMobileMenuOpen(false); }}
              className="p-2 rounded-xl bg-stone-900 text-emerald-300 font-bold text-center border border-stone-800"
            >
              Escrow & Safety
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onOpenAuth('login'); setIsMobileMenuOpen(false); }}
                  className="w-full btn-secondary justify-center py-2.5 text-xs font-bold flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setIsMobileMenuOpen(false); }}
                  className="w-full btn-emerald justify-center py-2.5 text-xs font-bold flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up Free</span>
                </button>
              </div>
            ) : (
              <div className="p-3 bg-stone-900 rounded-xl flex items-center justify-between text-xs">
                <span className="text-white font-bold">{currentUser.name} ({currentUser.role === 'relocator_seller' ? 'Seller' : 'Buyer'})</span>
                <div className="flex gap-2">
                  <button onClick={() => { onOpenDashboard(); setIsMobileMenuOpen(false); }} className="text-amber-400 font-bold">Dashboard</button>
                  <button onClick={onLogout} className="text-red-400 font-bold">Sign Out</button>
                </div>
              </div>
            )}

            <button
              onClick={() => { onOpenSellerWizard(); setIsMobileMenuOpen(false); }}
              className="w-full btn-gold justify-center py-3 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>List Relocation Asset / Whole-House Bundle</span>
            </button>
          </div>

        </div>
      )}
    </nav>
  );
}
