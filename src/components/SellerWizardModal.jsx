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
    setFormData({
      ...formData,
      bundledItems: [
        ...formData.bundledItems,
        { item: newItemName, individualValue: newItemValue ? `₦${Number(newItemValue).toLocaleString()}` : "Included" }
      ]
    });
    setNewItemName("");
    setNewItemValue("");
  };

  const handleRemoveBundleItem = (idx) => {
    setFormData({
      ...formData,
      bundledItems: formData.bundledItems.filter((_, i) => i !== idx)
    });
  };

  const handleProcessTokenPayment = async (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    // Simulate gateway processing (Paystack / Flutterwave / Moniepoint)
    await new Promise(r => setTimeout(r, 1500));
    
    const txRef = `PAY-JAPA-${Date.now().toString().slice(-6)}`;
    setPaymentRef(txRef);
    setPaymentSuccess(true);
    setIsProcessingPayment(false);

    logApiCall('/api/v1/payments/platform-service-fee', 'POST', {
      amountNGN: 5000,
      currency: "NGN",
      purpose: "SellJapa Platform Service & Listing Marketing Token Fee",
      sellerName: formData.sellerName || "Relocating Seller",
      paymentMethod,
      state: formData.state
    }, {
      success: true,
      transactionReference: txRef,
      status: "PAID",
      amountPaid: "₦5,000.00",
      timestamp: new Date().toISOString()
    });

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // Complete Listing creation
    const newListing = {
      id: `jp-user-${Date.now()}`,
      title: formData.title || `${formData.category === 'bundle' ? 'Whole-House Relocation Bundle' : 'Property'} in ${formData.location}`,
      type: formData.category === 'bundle' ? 'Whole-House Relocation Bundle' : 'Residential Property',
      category: formData.category,
      state: formData.state,
      lga: formData.lga,
      location: formData.location,
      priceNGN: Number(formData.priceNGN),
      originalValueNGN: Number(formData.originalValueNGN),
      discountPercent: Math.round(((formData.originalValueNGN - formData.priceNGN) / formData.originalValueNGN) * 100) || 20,
      targetClosingDays: Number(formData.targetClosingDays),
      destination: "International Relocation",
      sellerName: formData.sellerName || "Dr. Babatunde A. (Relocator)",
      sellerProfession: formData.sellerProfession || "Medical / Professional",
      verifiedTitle: formData.verifiedTitle,
      inspectionScore: 99,
      inspectionStatus: "Platform Fee Paid (₦5,000) • Active Listing",
      scoutCommissionPercent: formData.scoutCommissionPercent,
      images: uploadedImages.length > 0 ? uploadedImages : [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      ],
      features: ["Verified Title", "Platform Service Fee Paid", "Fast Escrow Close"],
      bundledItems: formData.category === 'bundle' ? formData.bundledItems : [],
      description: formData.description || `Seller liquidating assets for international relocation with target closing within ${formData.targetClosingDays} days. Protected under legal escrow.`,
      urgencyLevel: formData.targetClosingDays <= 10 ? "critical" : "high",
      escrowEligible: true,
      virtualTourAvailable: true,
      platformFeePaid: true,
      paymentRef: txRef
    };

    onAddListing(newListing);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-3xl glass-panel-emerald rounded-3xl p-4 sm:p-8 bg-[#0b1410] border border-emerald-500/40 shadow-2xl overflow-y-auto max-h-[94vh] sm:max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            {/* Header with Step Progress */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SellJapa Confidential Onboarding Wizard</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                List Your Relocation Asset Privately
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Reach over 25,000 local & diaspora buyers with certified on-ground scout network and 100% escrow protection.
              </p>

              {/* Progress Steps Indicators - 5 Steps */}
              <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-stone-800">
                {[
                  { num: 1, label: "Timeline" },
                  { num: 2, label: "Location" },
                  { num: 3, label: "Photos" },
                  { num: 4, label: "Pricing" },
                  { num: 5, label: "₦5,000 Fee" }
                ].map((s) => (
                  <div key={s.num} className="flex flex-col gap-1">
                    <div className={`h-1.5 rounded-full transition-all ${
                      step >= s.num ? 'bg-gradient-to-r from-amber-500 to-emerald-400' : 'bg-stone-800'
                    }`}></div>
                    <span className={`text-[10px] font-bold truncate ${
                      step === s.num ? 'text-amber-400' : step > s.num ? 'text-emerald-400' : 'text-stone-500'
                    }`}>
                      {s.num}. {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 1: Target Closing Timeline */}
            {step === 1 && (
              <div className="space-y-4 pt-2">
                <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Privacy First:</strong> Your specific travel details, flight numbers, and dates are never shown to buyers or third parties. Buyers only see your preferred closing window (e.g. 14 days) to facilitate prompt transactions.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Relocation Type
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                    >
                      <option value="International Relocation">International Relocation (Overseas Move)</option>
                      <option value="Inter-State Relocation">Inter-State Nigerian Relocation</option>
                      <option value="Corporate / Embassy Transfer">Corporate / Diplomatic Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Preferred Closing & Handover Window (Days)
                    </label>
                    <input
                      type="number"
                      value={formData.targetClosingDays}
                      onChange={(e) => setFormData({ ...formData, targetClosingDays: e.target.value })}
                      min="3"
                      max="90"
                      placeholder="e.g. 14"
                      className="w-full bg-stone-900 border border-stone-700 text-amber-300 font-bold rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 text-xs space-y-1.5 text-stone-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>How SellJapa Protects Your Privacy:</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Personal identity and sensitive documents are held strictly under bank trustee custody. Direct contact with prospective buyers is handled through the in-app Deal Room with simulated or live WebRTC video inspection without exposing your personal phone number until escrow is locked.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: Location & Asset Category */}
            {step === 2 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Nigerian State (36 States + FCT)
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                    >
                      {ALL_STATES.filter(s => s !== "All 36 States + FCT").map((st) => (
                        <option key={st} value={st}>{st} State</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Exact Area / Neighborhood Address
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Lekki Phase 1, Off Admiralty, Lagos"
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-2">
                    Select Asset Sale Structure
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'bundle', type: 'Whole-House Relocation Bundle' })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.category === 'bundle'
                          ? 'bg-amber-950/50 border-amber-500 text-amber-200 shadow-md'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm text-white">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>✨ Whole-House Bundle (Recommended)</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">
                        Sell your house together with car, solar inverter, and furniture in a single fast takeover transaction.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'house', type: 'Residential Property' })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.category === 'house'
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm text-white">
                        <span>🏠 Property Only</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">
                        Duplex, Terrace, Flat, or Land plot without household contents.
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Listing Headline / Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. 4-Bedroom Semi-Detached Duplex + 2022 RX350 + 5KVA Solar"
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Upload Photos, Bundle Items & Docs */}
            {step === 3 && (
              <div className="space-y-4 pt-2">
                
                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center justify-between">
                    <span>Upload Property & Asset Photos ({uploadedImages.length} images)</span>
                    <span className="text-[10px] text-amber-400">JPG, PNG up to 10MB</span>
                  </label>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-stone-700 bg-stone-900/60 hover:border-amber-500/60 transition-colors text-center cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      {uploadingImage ? (
                        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                      ) : (
                        <Upload className="w-8 h-8 text-stone-400" />
                      )}
                      <div className="text-xs font-bold text-white">
                        {uploadingImage ? "Processing & Uploading to CDN..." : "Click or drag & drop property photos here"}
                      </div>
                      <p className="text-[10px] text-stone-400">Upload photos of compound, interior living room, solar setup & vehicle</p>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pt-3 pb-1">
                      {uploadedImages.map((img, idx) => (\n                        <div key={idx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-stone-700 shrink-0 group">
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

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {formData.bundledItems.map((b, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-stone-800 text-xs">
                          <span className="text-stone-200 font-medium">• {b.item}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">{b.individualValue}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveBundleItem(idx)}
                              className="text-stone-500 hover:text-red-400 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add new item input */}
                    <div className="flex gap-2 pt-2 border-t border-stone-800">
                      <input
                        type="text"
                        placeholder="e.g. LG 65' OLED TV or 2019 Camry"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="flex-1 bg-black/50 border border-stone-700 text-xs text-stone-100 rounded-lg p-2 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Estimated Val (₦)"
                        value={newItemValue}
                        onChange={(e) => setNewItemValue(e.target.value)}
                        className="w-32 bg-black/50 border border-stone-700 text-xs text-stone-100 rounded-lg p-2 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddBundleItem}
                        className="btn-gold py-1.5 px-3 text-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Title Document Classification
                  </label>
                  <select
                    value={formData.verifiedTitle}
                    onChange={(e) => setFormData({ ...formData, verifiedTitle: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                    <option value="Governor's Consent">Governor's Consent</option>
                    <option value="Deed of Assignment & Registered Survey">Deed of Assignment & Registered Survey</option>
                    <option value="Gazette / Excision">Gazette / Government Excision</option>
                    <option value="Original Purchase Invoices (For Furnishings/Cars)">Original Purchase Invoices & Receipts</option>
                  </select>
                </div>

              </div>
            )}

            {/* STEP 4: Pricing & Scout Success Commission Structure */}
            {step === 4 && (
              <div className="space-y-4 pt-2">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      Normal Open Market Value (₦)
                    </label>
                    <input
                      type="number"
                      value={formData.originalValueNGN}
                      onChange={(e) => setFormData({ ...formData, originalValueNGN: Number(e.target.value) })}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-100 rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-400 mb-1">
                      Expedited Relocation Asking Price (₦)
                    </label>
                    <input
                      type="number"
                      value={formData.priceNGN}
                      onChange={(e) => setFormData({ ...formData, priceNGN: Number(e.target.value) })}
                      className="w-full bg-stone-900 border border-amber-500/60 text-amber-300 font-extrabold rounded-xl p-3 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Scout Success Commission Notice */}
                <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-emerald-400" />
                    <span>On-Ground Scout Success Commission Model</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Certified local scouts in {formData.state} State assist with physical buyer walkthroughs and physical inspection. <strong className="text-amber-300">Scouts do not charge upfront fees to inspect</strong> — for any successful deal, the scout earns an agreed <strong>{formData.scoutCommissionPercent}% success commission</strong> deducted from the seller payout only upon final escrow release.
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between text-xs bg-black/40 p-2.5 rounded-xl border border-emerald-500/20">
                    <span className="text-stone-300">Agreed Scout Success Fee Upon Deal Close:</span>
                    <span className="font-extrabold text-amber-400">
                      {formData.scoutCommissionPercent}% (₦{((formData.priceNGN * formData.scoutCommissionPercent) / 100).toLocaleString()})
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 5: ₦5,000 Platform Service Token Fee */}
            {step === 5 && (
              <div className="space-y-4 pt-2 animate-in fade-in">
                
                {/* Fee Breakdown Card */}
                <div className="glass-panel-gold p-5 rounded-2xl border-amber-500/40 space-y-3 bg-[#111c16]">
                  <div className="flex items-center justify-between border-b border-amber-500/30 pb-2.5">
                    <div>
                      <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">SellJapa Platform Fee</span>
                      <h3 className="text-base font-extrabold text-white">Platform Listing & Marketing Service Token Fee</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-amber-300 font-display">₦5,000</div>
                      <span className="text-[10px] text-emerald-400 font-bold">One-Time Token</span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Services Rendered by Platform:</strong> Nationwide hosting, AI liquidation valuation, and priority exposure to 25,000+ local & diaspora cash buyers.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Dedicated Encrypted Deal Room & Escrow Management infrastructure.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>4K virtual inspection video streaming and buyer matchmaking desk.</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 text-[11px] pt-1 border-t border-stone-800">
                      <Percent className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span><em>Scout compensation: Local field scouts receive their {formData.scoutCommissionPercent}% commission directly from final closed escrow proceeds.</em></span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-2">Select Payment Method for ₦5,000 Platform Service Fee:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow' : 'bg-stone-900 border-stone-800 text-stone-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Debit / Verve / Visa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'transfer' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow' : 'bg-stone-900 border-stone-800 text-stone-400'
                      }`}
                    >
                      <Landmark className="w-4 h-4" />
                      <span>Bank Transfer / NIP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ussd')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'ussd' ? 'bg-blue-500/20 border-blue-500 text-blue-300 shadow' : 'bg-stone-900 border-stone-800 text-stone-400'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>USSD / OPay / PalmPay</span>
                    </button>
                  </div>
                </div>

                {/* Payment Forms */}
                {paymentMethod === 'card' && (
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 mb-1">Card Number</label>
                      <div className="flex items-center gap-2 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="bg-transparent border-none text-white font-mono focus:outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 text-white text-xs rounded-xl px-3 py-2 font-mono focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength="3"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 text-white text-xs rounded-xl px-3 py-2 font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                    <div className="text-[11px] text-stone-400">Transfer exactly ₦5,000 to this dedicated dynamic account:</div>
                    <div className="bg-black/50 p-3 rounded-xl border border-stone-800 space-y-1">
                      <div className="flex justify-between"><span className="text-stone-400">Bank:</span> <strong className="text-white">Providus Bank / Wema</strong></div>
                      <div className="flex justify-between"><span className="text-stone-400">Account Number:</span> <strong className="text-amber-400 text-sm font-mono">9920194821</strong></div>
                      <div className="flex justify-between"><span className="text-stone-400">Account Name:</span> <strong className="text-emerald-400">SellJapa Platform Services</strong></div>
                    </div>
                    <div className="text-[10px] text-stone-500 text-center">Payment automatically confirmed in ~5 seconds</div>
                  </div>
                )}

                {paymentMethod === 'ussd' && (
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 text-center space-y-2 text-xs">
                    <div className="text-stone-300 font-bold">Dial GTBank / Zenith / UBA USSD:</div>
                    <div className="text-lg font-mono font-black text-amber-400 bg-black/60 py-2 rounded-xl border border-stone-800">
                      *737*50*5000*8921#
                    </div>
                    <p className="text-[10px] text-stone-400">Follow prompts on your mobile phone to complete payment</p>
                  </div>
                )}

              </div>
            )}

            {/* Navigation & Submit Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary text-xs px-4 py-2 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-gold text-xs px-6 py-2.5 flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  <span>{step === 4 ? "Proceed to ₦5,000 Platform Service Fee" : "Next Step"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleProcessTokenPayment}
                  className="btn-emerald text-xs sm:text-sm px-7 py-3 font-extrabold shadow-xl cursor-pointer flex items-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing ₦5,000 Platform Fee...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₦5,000 & Complete Verified Upload</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Submission Success State with Receipt */
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCheck className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              ₦5,000 Platform Fee Paid & Listing Published!
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your relocation asset in <strong className="text-amber-400">{formData.state} State</strong> has been published to over 25,000 buyers. Local field scouts are notified and earn their <strong className="text-emerald-400">{formData.scoutCommissionPercent}% success commission</strong> only when your deal successfully closes.
            </p>

            {/* Official Payment Receipt Card */}
            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <span>SellJapa Platform Service Receipt</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  PAID SUCCESSFUL
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Transaction Ref:</span>
                <strong className="text-amber-400 font-mono">{paymentRef}</strong>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Service Fee Paid:</span>
                <strong className="text-white">₦5,000.00 (Platform Services)</strong>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Scout Commission Model:</span>
                <strong className="text-emerald-400">{formData.scoutCommissionPercent}% on Success (Paid from Escrow Close)</strong>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Listing State:</span>
                <strong className="text-stone-200">{formData.state} State</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-gold px-8 py-3 text-xs sm:text-sm font-bold cursor-pointer"
            >
              View in Live Marketplace &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
