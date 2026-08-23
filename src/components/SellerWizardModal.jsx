import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ImageIcon, 
  RefreshCw, 
  Lock, 
  CreditCard, 
  Landmark, 
  Smartphone, 
  FileText, 
  Receipt, 
  CheckCheck,
  Percent,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_STATES } from '../data/mockData';
import { mediaApi, logApiCall } from '../services/api';

export function SellerWizardModal({ isOpen, onClose, onAddListing }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Timeline, 2: Location/Type, 3: Photos/Bundle, 4: Pricing/Inspect, 5: ₦5,000 Platform Service Fee
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  ]);

  const [formData, setFormData] = useState({
    destination: "International Relocation",
    targetClosingDays: 14,
    state: "Lagos",
    lga: "Eti-Osa",
    location: "Ikoyi / Lekki Phase 1, Lagos",
    title: "",
    category: "bundle", // bundle, house, land, furnishing
    type: "Whole-House Relocation Bundle",
    priceNGN: 145000000,
    originalValueNGN: 195000000,
    sellerName: "",
    sellerProfession: "",
    verifiedTitle: "Governor's Consent / C of O",
    description: "",
    bundledItems: [
      { item: "Fully Furnished 4-Bed Terrace Duplex", individualValue: "₦160,000,000" },
      { item: "2021 Toyota RAV4 (Mint Condition)", individualValue: "₦25,000,000" },
      { item: "5KVA Lithium Solar Inverter System", individualValue: "₦6,500,000" }
    ],
    inspectionDate: "Tomorrow (Within 24 Hrs)",
    scoutCommissionPercent: 2.0 // Scout success percentage from seller upon closing
  });

  const [newItemName, setNewItemName] = useState("");
  const [newItemValue, setNewItemValue] = useState("");

  // Payment state for ₦5,000 platform service token fee
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, transfer, ussd
  const [cardNumber, setCardNumber] = useState('5399 4100 2938 1102');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleImageFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingImage(true);
    try {
      for (const file of files) {
        const uploaded = await mediaApi.uploadImage(file);
        setUploadedImages(prev => [uploaded.url, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (idx) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddBundleItem = () => {
    if (!newItemName.trim()) return;
    setFormData(prev => ({
      ...prev,
      bundledItems: [
        ...prev.bundledItems,
        { item: newItemName.trim(), individualValue: newItemValue.trim() || 'Included' }
      ]
    }));
    setNewItemName("");
    setNewItemValue("");
  };

  const handleRemoveBundleItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      bundledItems: prev.bundledItems.filter((_, i) => i !== idx)
    }));
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    // Simulate Paystack / Monnify ₦5,000 token payment gateway
    setTimeout(() => {
      const generatedRef = `SJ-FEE-${Date.now().toString().slice(-6)}-VERIFIED`;
      setPaymentRef(generatedRef);
      setIsProcessingPayment(false);
      setPaymentSuccess(true);

      logApiCall({
        endpoint: '/api/v1/payments/verify-token-fee',
        method: 'POST',
        requestPayload: {
          amountNGN: 5000,
          paymentMethod,
          purpose: 'SellJapa ₦5,000 Platform Service & Anti-Spam Token Fee',
          sellerName: formData.sellerName || 'Anonymous Relocator'
        },
        responsePayload: {
          status: 'success',
          reference: generatedRef,
          paidAt: new Date().toISOString(),
          escrowTagged: true,
          scoutDispatched: true
        }
      });

      // Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Finalize and post listing after short delay
      setTimeout(() => {
        const discountCalc = Math.max(5, Math.round(((formData.originalValueNGN - formData.priceNGN) / formData.originalValueNGN) * 100));
        
        const finalListing = {
          id: `jp-reloc-${Date.now().toString().slice(-4)}`,
          title: formData.title || `${formData.type} in ${formData.location}`,
          category: formData.category,
          type: formData.type,
          priceNGN: Number(formData.priceNGN),
          originalValueNGN: Number(formData.originalValueNGN),
          discountPercent: discountCalc > 0 ? discountCalc : 15,
          location: formData.location || `${formData.lga}, ${formData.state}`,
          state: formData.state,
          lga: formData.lga,
          destination: formData.destination,
          targetClosingDays: Number(formData.targetClosingDays) || 14,
          sellerName: formData.sellerName || "Verified Relocating Expat",
          sellerProfession: formData.sellerProfession || "IT / Health Professional",
          sellerRating: 5.0,
          verifiedTitle: formData.verifiedTitle,
          inspectionScore: 98,
          isSold: false,
          badges: ["₦5k Fee Paid", "100% Escrow", "2% Scout Tagged"],
          images: uploadedImages.length > 0 ? uploadedImages : [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
          ],
          features: [
            formData.verifiedTitle,
            "100% Escrow Protected Handover",
            `2% Scout Verification Commission Attached`,
            `${formData.targetClosingDays} Days Relocation Window`
          ],
          bundledItems: formData.category === 'bundle' ? formData.bundledItems : [],
          paymentReference: generatedRef,
          scoutCommissionPercent: 2.0
        };

        if (onAddListing) {
          onAddListing(finalListing);
        }
        setSubmitted(true);
      }, 1200);

    }, 1500);
  };

  const discountEstimate = Math.max(0, Math.round(((formData.originalValueNGN - formData.priceNGN) / formData.originalValueNGN) * 100));
  const estimatedScoutPayout = (Number(formData.priceNGN) * 0.02);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="seller-wizard-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl glass-panel-gold rounded-3xl p-5 sm:p-8 bg-[#0b1410] border border-amber-500/40 shadow-2xl text-stone-100 max-h-[92vh] flex flex-col justify-between overflow-y-auto pb-8 sm:pb-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer border border-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* ================= SUCCESS CONFIRMATION ================= */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Listing & Escrow Deal Room Initialized
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                ₦5,000 Token Fee Verified! Your Japa Asset is Live.
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
                Payment Ref: <code className="text-amber-400 font-mono font-bold">{paymentRef}</code>. Certified local scouts in {formData.state} State have received instant alert to inspect and verify title deeds.
              </p>
            </div>

            <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="font-bold text-white flex items-center justify-between border-b border-stone-800 pb-2">
                <span>Summary of Escrow Deal Terms</span>
                <span className="text-emerald-400">Active Listing</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Liquidation Asking Price:</span>
                <span className="font-extrabold text-amber-400">₦{Number(formData.priceNGN).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Territory:</span>
                <span className="font-bold text-white">{formData.state} State ({formData.lga})</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Scout Success Fee (On Escrow Handover):</span>
                <span className="font-bold text-emerald-400">2.0% (₦{estimatedScoutPayout.toLocaleString()})</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Platform Service Token Fee:</span>
                <span className="font-bold text-emerald-400">₦5,000.00 (Paid & Verified)</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="btn-gold px-8 py-3 text-sm font-bold shadow-xl"
              >
                Go to Marketplace Deals &rarr;
              </button>
            </div>
          </div>
        ) : (
          /* ================= 5-STEP WIZARD FORM ================= */
          <div className="space-y-6">
            
            {/* Header with Step Tracker */}
            <div className="space-y-3 border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="seller-wizard-title" className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    Confidential Relocation Asset Liquidation
                  </h2>
                  <p className="text-xs text-stone-400">
                    Step {step} of 5 • Certified Valuation & 100% Escrow Protection
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[
                  { num: 1, label: "Timeline" },
                  { num: 2, label: "Asset & State" },
                  { num: 3, label: "Inventory" },
                  { num: 4, label: "Pricing & Scout" },
                  { num: 5, label: "₦5k Token Fee" }
                ].map(s => (
                  <div key={s.num} className="space-y-1">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.num ? 'bg-gradient-to-r from-amber-500 to-emerald-400' : 'bg-stone-800'
                    }`}></div>
                    <span className={`text-[10px] block font-bold truncate ${
                      step === s.num ? 'text-amber-400' : step > s.num ? 'text-emerald-400' : 'text-stone-500'
                    }`}>
                      {s.num}. {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 1: RELOCATION TIMELINE & TARGET WINDOW */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                    Where & When Are You Relocating?
                  </label>
                  <p className="text-xs text-stone-400">
                    Setting a realistic closing timeline triggers emergency discount highlights for cash-ready diaspora buyers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">Target Relocation Destination</label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-amber-400"
                    >
                      <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                      <option value="Canada (Express Entry / Study)">Canada (Express Entry / Study)</option>
                      <option value="United States (USA)">United States (USA)</option>
                      <option value="European Union / Ireland">European Union / Ireland</option>
                      <option value="Australia / New Zealand">Australia / New Zealand</option>
                      <option value="Other International Relocation">Other Relocation Destination</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">Target Days to Escrow Close</label>
                    <select
                      value={formData.targetClosingDays}
                      onChange={(e) => setFormData({ ...formData, targetClosingDays: Number(e.target.value) })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-amber-400"
                    >
                      <option value={7}>🚨 Urgent 7 Days (Highest Discount Appeal)</option>
                      <option value={10}>⚡ 10 Days Express</option>
                      <option value={14}>🗓️ 14 Days Standard Japa Window</option>
                      <option value={21}>🕒 21 Days</option>
                      <option value={30}>📅 30 Days Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">Seller Alias / Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. A. Adeleke (Relocating Consultant)"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">Profession / Background</label>
                    <input
                      type="text"
                      placeholder="e.g. NHS Senior Registrar / Software Engineer"
                      value={formData.sellerProfession}
                      onChange={(e) => setFormData({ ...formData, sellerProfession: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="bg-amber-950/40 p-3.5 rounded-2xl border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Strict Confidentiality Guarantee:</strong> Your exact street address and personal identity remain hidden from public search engines. Only verified escrow bidders receive access during physical scout verification.
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: NIGERIAN STATE & ASSET CATEGORY */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                    Select Territory & Asset Type
                  </label>
                  <p className="text-xs text-stone-400">
                    We cover all 36 Nigerian States + FCT Abuja with on-ground certified surveyors.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">State Location</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-amber-400"
                    >
                      {ALL_STATES.filter(s => s !== "All 36 States + FCT").map(st => (
                        <option key={st} value={st}>{st} State</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">LGA / Neighborhood</label>
                    <input
                      type="text"
                      placeholder="e.g. Eti-Osa / Lekki Phase 1 / Guzape"
                      value={formData.lga}
                      onChange={(e) => setFormData({ ...formData, lga: e.target.value, location: `${e.target.value}, ${formData.state}` })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300">Select Liquidation Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'bundle', label: 'Whole-House Bundle', desc: 'House + Car + Solar', icon: '✨' },
                      { id: 'house', label: 'Duplex / House', desc: 'Residential Property', icon: '🏡' },
                      { id: 'land', label: 'Land & Plots', desc: 'Titled Land', icon: '📐' },
                      { id: 'furnishing', label: 'Appliances / Car', desc: 'Movable Assets', icon: '🚗' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id, type: cat.label })}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          formData.category === cat.id
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className="text-xl mb-1">{cat.icon}</div>
                        <div className="text-xs font-bold text-white leading-tight">{cat.label}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">{cat.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Listing Headline / Catchphrase</label>
                  <input
                    type="text"
                    placeholder="e.g. Urgent Japa Sale: Fully Furnished 4-Bed Duplex + 2021 RAV4 + 5KVA Solar"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Land / Property Title Document</label>
                  <select
                    value={formData.verifiedTitle}
                    onChange={(e) => setFormData({ ...formData, verifiedTitle: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                  >
                    <option value="Governor's Consent">Governor's Consent (High Liquidity)</option>
                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                    <option value="Registered Gazette & Survey Plan">Registered Gazette & Survey Plan</option>
                    <option value="Deed of Assignment & Power of Attorney">Deed of Assignment & Power of Attorney</option>
                    <option value="Federal C of O (FCT Abuja)">Federal C of O (FCT Abuja)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: ITEMIZE WHOLE-HOUSE BUNDLE & PHOTOS */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                    Upload Photos & Itemize Assets
                  </label>
                  <p className="text-xs text-stone-400">
                    Buyers love "Take-All" bundles because they get a turnkey house + car + solar setup in one wire transaction.
                  </p>
                </div>

                {/* Photo Upload Box */}
                <div className="bg-stone-900/80 p-4 rounded-2xl border border-dashed border-stone-700 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Upload Asset & Interior Photos</div>
                        <div className="text-[11px] text-stone-400">PNG, JPG or WebP (Up to 10 photos)</div>
                      </div>
                    </div>

                    <label className="btn-secondary text-xs px-4 py-2 cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>{uploadingImage ? "Uploading..." : "Browse Photos"}</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageFileChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Image Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pt-3 pb-1">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-stone-700 shrink-0 group">
                          <img src={img} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {formData.category === 'bundle' && (
                  <div className="bg-stone-900/70 p-4 rounded-2xl border border-stone-800 space-y-3">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center justify-between">
                      <span>Itemize What's Included in this Japa Bundle:</span>
                      <span className="text-[10px] text-stone-400">{formData.bundledItems.length} items added</span>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {formData.bundledItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-stone-800 text-xs">
                          <div className="truncate pr-2">
                            <span className="text-stone-200 font-semibold">• {item.item}</span>
                            <span className="text-stone-400 text-[10px] ml-2">({item.individualValue})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBundleItem(idx)}
                            className="text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="e.g. 5KVA Felicity Solar Inverter with 4 Lithium Batteries"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="sm:col-span-7 bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-2.5 text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Estimated value (e.g. ₦6.5M)"
                        value={newItemValue}
                        onChange={(e) => setNewItemValue(e.target.value)}
                        className="sm:col-span-3 bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-2.5 text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddBundleItem}
                        className="sm:col-span-2 btn-gold text-xs py-2 justify-center"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: FAST LIQUIDATION PRICING & SCOUT VERIFICATION */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                    Pricing & Scout Verification Payout
                  </label>
                  <p className="text-xs text-stone-400">
                    Price below market rate to attract instant cash settlement before your flight departure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300">Original / Market Value (₦ NGN)</label>
                    <input
                      type="number"
                      step="500000"
                      value={formData.originalValueNGN}
                      onChange={(e) => setFormData({ ...formData, originalValueNGN: Number(e.target.value) })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-mono font-bold focus:outline-none"
                    />
                    <span className="text-[10px] text-stone-400">₦{Number(formData.originalValueNGN).toLocaleString()}</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-amber-300">Emergency Liquidation Asking Price (₦ NGN)</label>
                    <input
                      type="number"
                      step="500000"
                      value={formData.priceNGN}
                      onChange={(e) => setFormData({ ...formData, priceNGN: Number(e.target.value) })}
                      className="w-full bg-stone-900 border-2 border-amber-400 text-amber-400 rounded-xl p-3 text-xs font-mono font-extrabold focus:outline-none shadow-lg"
                    />
                    <span className="text-[10px] text-amber-400 font-bold">₦{Number(formData.priceNGN).toLocaleString()} ({discountEstimate}% distress discount)</span>
                  </div>
                </div>

                {/* 2% Scout Commission Breakdown Box */}
                <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-extrabold text-white">Certified Scout Success Commission:</span>
                    </div>
                    <span className="font-bold text-emerald-400 text-sm">2.0% on Closing</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-3 rounded-xl border border-stone-800">
                    <div>
                      <span className="text-stone-400 text-[10px] block">Estimated Scout Payout:</span>
                      <span className="text-sm font-black text-gradient-gold">₦{estimatedScoutPayout.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Payout Timing:</span>
                      <span className="text-xs font-bold text-stone-200">Direct from Escrow upon Handover</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    <strong>Zero upfront fee to the scout:</strong> The certified surveyor in {formData.state} State performs physical title validation, video tour recording, and electrical diagnostics free of charge. Their 2% success fee is paid automatically from the escrow release.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5: ₦5,000 PLATFORM SERVICE TOKEN FEE CHECKOUT */}
            {step === 5 && (
              <form onSubmit={handleProcessPayment} className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                    Anti-Spam & Dedicated Deal Room Activation
                  </label>
                  <p className="text-xs text-stone-400">
                    To prevent fraudulent or duplicate listings, relocating sellers pay a nominal <strong>₦5,000 platform service token fee</strong>. This covers cloud 4K video hosting, WhatsApp scout dispatch, and lawyer escrow setup.
                  </p>
                </div>

                {/* ₦5,000 Receipt Card */}
                <div className="bg-gradient-to-r from-amber-950/80 via-[#132019] to-stone-900 p-4 rounded-2xl border-2 border-amber-400 shadow-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-amber-300 font-extrabold uppercase tracking-wide">Platform Service & Escrow Token Fee</div>
                    <div className="text-xs text-stone-300">Listing: {formData.title || formData.type}</div>
                    <div className="text-[10px] text-stone-400">{formData.state} State Territory • 100% Tax Inclusive</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-amber-400 font-display">₦5,000.00</div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-semibold">
                      One-Time Only
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300">Select Instant Payment Gateway</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Debit Card', desc: 'Mastercard / Visa / Verve', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'transfer', label: 'Bank Transfer', desc: 'Dedicated Providus NUBAN', icon: <Landmark className="w-4 h-4" /> },
                      { id: 'ussd', label: 'USSD / OPay', desc: '*737# / *919# / OPay', icon: <Smartphone className="w-4 h-4" /> }
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          paymentMethod === p.id 
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg' 
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className="text-amber-400 mb-1">{p.icon}</div>
                        <div className="text-xs font-bold text-white">{p.label}</div>
                        <div className="text-[10px] text-stone-400 truncate">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Fields Simulator */}
                {paymentMethod === 'card' && (
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 text-stone-100 font-mono font-bold rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-300 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 text-stone-100 font-mono font-bold rounded-xl p-2.5 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-300 mb-1">CVV (3 Digits)</label>
                        <input
                          type="password"
                          maxLength="3"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 text-stone-100 font-mono font-bold rounded-xl p-2.5 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                    <div className="text-stone-400">Transfer ₦5,000 to Dedicated Checkout Account:</div>
                    <div className="bg-black/50 p-3 rounded-xl border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-400">Bank: Providus Bank / Paystack Titan</div>
                        <div className="text-sm font-mono font-black text-amber-400">9928 1049 20</div>
                        <div className="text-[10px] text-stone-300">Account: SellJapa Liquidation Escrow</div>
                      </div>
                      <span className="text-[10px] bg-amber-500 text-stone-950 px-2 py-1 rounded font-bold">Auto-Confirm</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'ussd' && (
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                    <div className="text-stone-400">Dial the code on your registered SIM:</div>
                    <div className="bg-black/50 p-3 rounded-xl border border-amber-500/30 text-center font-mono font-black text-amber-400 text-base">
                      *737*50*5000*9928#
                    </div>
                  </div>
                )}

                {/* Submit Payment CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full btn-gold py-3.5 text-sm sm:text-base font-extrabold shadow-2xl justify-center cursor-pointer flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                        <span>Verifying ₦5,000 Payment with Bank Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-stone-950" />
                        <span>Pay ₦5,000 & Publish Relocation Listing</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

            {/* Navigation Footers */}
            {step < 5 && (
              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-gold text-xs px-6 py-2.5 font-extrabold flex items-center gap-1 cursor-pointer shadow-lg"
                >
                  <span>Continue to Step {step + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
