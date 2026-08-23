import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  Video, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Paperclip, 
  Sparkles, 
  CheckCheck, 
  User, 
  Lock, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Check 
} from 'lucide-react';
import { chatApi } from '../services/api';
import confetti from 'canvas-confetti';

export function ChatModal({ 
  isOpen, 
  onClose, 
  initialListing, 
  onStartCall, 
  currentUser 
}) {
  if (!isOpen) return null;

  const isSeller = currentUser?.role === 'relocator_seller';

  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [offerInput, setOfferInput] = useState('');
  const [acceptedOfferIds, setAcceptedOfferIds] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadThreads = async () => {
      const allThreads = await chatApi.getThreads();
      
      // If seller, customize threads so partner is a Buyer
      const adaptedThreads = allThreads.map(thr => {
        if (isSeller) {
          return {
            ...thr,
            partner: {
              id: "buyer-001",
              name: "Engr. Adekunle O. (Diaspora - London)",
              role: "Verified Cash Buyer (10% Escrow Funded)",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
              status: "online",
              destination: "UK Investor"
            }
          };
        }
        return thr;
      });

      if (initialListing) {
        const thread = await chatApi.createThreadForListing(initialListing);
        setThreads(adaptedThreads);
        setActiveThreadId(thread.threadId);
      } else {
        setThreads(adaptedThreads);
        if (adaptedThreads.length > 0) setActiveThreadId(adaptedThreads[0].threadId);
      }
    };

    loadThreads();

    const handleNewMessage = (e) => {
      chatApi.getThreads().then(t => setThreads([...t]));
    };
    window.addEventListener('selljapa:new_message', handleNewMessage);
    return () => window.removeEventListener('selljapa:new_message', handleNewMessage);
  }, [initialListing, isSeller]);

  const activeThread = threads.find(t => t.threadId === activeThreadId) || threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    const textToSend = inputText;
    setInputText('');
    await chatApi.sendMessage(activeThread.threadId, textToSend);
    const updated = await chatApi.getThreads();
    setThreads([...updated]);
  };

  const handleSendOffer = async (e) => {
    e.preventDefault();
    if (!offerInput || !activeThread) return;
    const amount = offerInput;
    setIsOfferOpen(false);
    setOfferInput('');
    await chatApi.sendMessage(
      activeThread.threadId, 
      `🤝 Official Escrow Offer Submitted: ₦${Number(amount).toLocaleString()}`, 
      true, 
      amount
    );
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (err) {}
    const updated = await chatApi.getThreads();
    setThreads([...updated]);
  };

  const handleAcceptOfferInChat = (msgId) => {
    setAcceptedOfferIds(prev => [...prev, msgId]);
    try {
      confetti({ particleCount: 100, spread: 70 });
    } catch (err) {}
    chatApi.sendMessage(
      activeThread.threadId, 
      "✅ I have accepted your escrow purchase offer! Our conveyancing lawyer has been notified to draft the Deed of Assignment."
    );
  };

  const sendQuickPrompt = (promptText) => {
    setInputText(promptText);
  };

  // Quick suggestions tailored distinctly for Seller vs Buyer
  const sellerQuickPrompts = [
    "Yes, title documents & C of O are physically vetted.",
    "I am available for a live 4K video walkthrough right now.",
    "All vehicle customs papers & solar warranties are in the safe box.",
    "Escrow terms accepted, we can conclude closing in 5 days."
  ];

  const buyerQuickPrompts = [
    "Is the C of O registered at the State Land Registry?",
    "Can we schedule a live 4K video inspection today?",
    "Are all car customs papers & spare keys available?",
    "What is your bottom price for fast escrow closing?"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl h-[85vh] glass-panel rounded-3xl bg-[#09120e] border border-stone-700 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header with Role Distinction */}
        <div className="bg-[#0e1a14] px-4 sm:px-6 py-3 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl p-0.5 flex items-center justify-center ${
              isSeller ? 'bg-gradient-to-br from-amber-500 to-amber-700' : 'bg-gradient-to-br from-emerald-500 to-amber-500'
            }`}>
              <div className="w-full h-full bg-[#09120e] rounded-[9px] flex items-center justify-center">
                {isSeller ? <Building2 className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-emerald-400" />}
              </div>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{isSeller ? "Seller Deal Room & Escrow Desk" : "Buyer Encrypted Negotiation Room"}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSeller ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'badge-escrow'
                }`}>
                  {isSeller ? "🏡 Seller Mode" : "💼 Buyer Mode"}
                </span>
              </h2>
              <p className="text-[11px] text-stone-400">
                {isSeller 
                  ? "Direct, confidential negotiation with verified cash buyers & diaspora investors." 
                  : "Direct negotiation with vetted property owners under bank escrow protection."}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Split Layout: Threads (left) & Chat Window (right) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Threads List Sidebar */}
          <div className="w-full sm:w-80 border-r border-stone-800 flex flex-col bg-[#070e0b]">
            <div className="p-3 border-b border-stone-800 text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
              <span>{isSeller ? "Buyer Inquiries" : "Active Negotiations"} ({threads.length})</span>
              <span className="text-[10px] text-emerald-400">Encrypted</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-stone-800/60">
              {threads.map((thread) => {
                const isActive = thread.threadId === activeThreadId;
                const lastMsg = thread.messages[thread.messages.length - 1];
                return (
                  <div
                    key={thread.threadId}
                    onClick={() => setActiveThreadId(thread.threadId)}
                    className={`p-3 cursor-pointer transition-all ${
                      isActive ? 'bg-emerald-950/60 border-l-4 border-amber-500' : 'hover:bg-stone-900/50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <img
                        src={thread.partner.avatar}
                        alt={thread.partner.name}
                        className="w-9 h-9 rounded-full object-cover border border-amber-500/30 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-white truncate">{thread.partner.name}</span>
                          <span className="text-[10px] text-stone-500">{lastMsg?.timestamp}</span>
                        </div>
                        <div className="text-[11px] text-amber-400 font-semibold truncate mb-1">
                          {thread.listingTitle}
                        </div>
                        <p className="text-[11px] text-stone-400 truncate">
                          {lastMsg?.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Chat Conversation Pane */}
          {activeThread ? (
            <div className="flex-1 flex flex-col bg-[#09120e]">
              
              {/* Partner Bar & Call Action */}
              <div className="px-4 py-2.5 bg-[#0d1813] border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeThread.partner.avatar}
                    alt={activeThread.partner.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{activeThread.partner.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    </div>
                    <div className="text-[11px] text-stone-400 flex items-center gap-2">
                      <span className="text-amber-300 font-semibold">{activeThread.partner.role}</span>
                      <span>•</span>
                      <span>Target: {activeThread.listingPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Call & Video Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartCall(activeThread.partner.name, "audio")}
                    className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-emerald-400 hover:border-emerald-500 transition-all flex items-center gap-1 text-xs cursor-pointer"
                    title="Audio Call"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Call</span>
                  </button>

                  <button
                    onClick={() => onStartCall(activeThread.partner.name, "video")}
                    className="btn-gold py-1.5 px-3 text-xs flex items-center gap-1.5 cursor-pointer font-bold"
                    title="Live 4K Video Tour"
                  >
                    <Video className="w-3.5 h-3.5 text-stone-950" />
                    <span>Live 4K Tour</span>
                  </button>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                
                <div className="text-center my-2">
                  <span className="text-[10px] bg-stone-900 text-stone-400 px-3 py-1 rounded-full border border-stone-800">
                    🔒 Protected under SellJapa Legal Trustee & Bank Custodial Escrow
                  </span>
                </div>

                {activeThread.messages.map((msg) => {
                  const isMe = isSeller ? (msg.sender === 'seller' || msg.sender === 'seller-001' || msg.sender?.startsWith('seller')) : (msg.sender === 'buyer');
                  const isOfferMsg = msg.isOffer;
                  const isAccepted = acceptedOfferIds.includes(msg.id);

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1.5 shadow ${
                        isMe
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-medium rounded-br-none'
                          : 'bg-stone-900/90 text-stone-100 border border-stone-800 rounded-bl-none'
                      }`}>
                        
                        {/* Escrow Offer Card inside Message */}
                        {isOfferMsg && (
                          <div className="bg-black/40 p-3 rounded-xl border border-amber-500/30 text-[11px] mb-2 space-y-2">
                            <div className="text-amber-300 font-extrabold flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-emerald-400" />
                                <span>OFFICIAL ESCROW PURCHASE OFFER</span>
                              </span>
                              <span className="text-xs font-mono font-black text-white">
                                ₦{Number(msg.offerAmount).toLocaleString()}
                              </span>
                            </div>

                            <div className="text-[10px] text-stone-300">
                              🔒 10% commitment deposit held securely in Custodial Bank Vault.
                            </div>

                            {/* If Seller, allow 1-click acceptance directly in chat */}
                            {isSeller && !isMe && (
                              <div className="pt-1">
                                {!isAccepted ? (
                                  <button
                                    type="button"
                                    onClick={() => handleAcceptOfferInChat(msg.id)}
                                    className="w-full btn-emerald py-1.5 text-xs font-bold justify-center flex items-center gap-1 cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Accept Escrow Offer</span>
                                  </button>
                                ) : (
                                  <div className="text-center text-[10px] font-bold text-emerald-400 bg-emerald-950/80 py-1 rounded border border-emerald-500/30">
                                    ✓ Offer Accepted • Conveyancer Notified
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        <p className="leading-relaxed">{msg.text}</p>
                        
                        <div className={`text-[9px] text-right flex items-center justify-end gap-1 ${
                          isMe ? 'text-stone-900 font-semibold' : 'text-stone-500'
                        }`}>
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Suggestions Tailored by Role */}
              <div className="px-4 py-1.5 bg-[#09120e] border-t border-stone-800/60 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <span className="text-stone-500 font-semibold shrink-0">
                  {isSeller ? "Seller Quick Reply:" : "Buyer Quick Ask:"}
                </span>
                {(isSeller ? sellerQuickPrompts : buyerQuickPrompts).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendQuickPrompt(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 hover:text-amber-300 hover:bg-stone-800 border border-stone-800 text-[11px] transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input & Action Footer */}
              <div className="p-3 bg-[#0c1611] border-t border-stone-800">
                {/* BUYER ONLY: Offer Input Drawer */}
                {!isSeller && isOfferOpen && (
                  <form onSubmit={handleSendOffer} className="mb-3 p-3 rounded-2xl bg-black/60 border border-amber-500/40 flex items-center gap-2 text-xs">
                    <span className="text-amber-400 font-bold">Lock Escrow Bid:</span>
                    <input
                      type="number"
                      placeholder="e.g. 175000000"
                      value={offerInput}
                      onChange={(e) => setOfferInput(e.target.value)}
                      className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-white font-bold focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="btn-gold py-1.5 px-4 text-xs font-bold cursor-pointer"
                    >
                      Submit Offer
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOfferOpen(false)}
                      className="text-stone-400 hover:text-white p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                )}

                <form onSubmit={handleSend} className="flex items-center gap-2">
                  {/* ONLY BUYERS SEE THE "MAKE OFFER" BUTTON IN CHAT */}
                  {!isSeller && (
                    <button
                      type="button"
                      onClick={() => setIsOfferOpen(!isOfferOpen)}
                      className="btn-gold py-2 px-3 text-xs font-extrabold flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <DollarSign className="w-4 h-4 text-stone-950" />
                      <span className="hidden sm:inline">Make Offer</span>
                    </button>
                  )}

                  <input
                    type="text"
                    placeholder={
                      isSeller 
                        ? "Reply to buyer or confirm inspection timeline..." 
                        : "Type your message or ask about property title..."
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-stone-900/90 border border-stone-700 text-stone-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                  />

                  <button
                    type="submit"
                    className="btn-emerald py-2.5 px-4 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-stone-500">
              Select a conversation thread to start messaging.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
