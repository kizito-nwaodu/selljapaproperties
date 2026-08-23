// Simulated REST & Realtime API Service Layer for SellJapaProperties
// Fully privacy and security compliant (no flight dates/numbers)

const STORAGE_KEYS = {
  USER: 'selljapa_current_user',
  ACCOUNTS_DB: 'selljapa_accounts_db',
  LISTINGS: 'selljapa_listings',
  MESSAGES: 'selljapa_chat_threads',
  API_LOGS: 'selljapa_api_logs'
};

const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

export const logApiCall = (endpoint, method, payload, response, status = 200) => {
  try {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.API_LOGS) || '[]');
    const newLog = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      endpoint,
      method,
      payload,
      response,
      status
    };
    const updatedLogs = [newLog, ...logs].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.API_LOGS, JSON.stringify(updatedLogs));
    window.dispatchEvent(new CustomEvent('selljapa:api_logged', { detail: newLog }));
  } catch (err) {
    console.error(err);
  }
};

export const getApiLogs = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.API_LOGS) || '[]');
  } catch {
    return [];
  }
};

// Helper to get registered accounts
const getAccountsDb = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS_DB) || '{}');
  } catch {
    return {};
  }
};

const saveAccountToDb = (email, account) => {
  try {
    const db = getAccountsDb();
    db[email.toLowerCase()] = account;
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS_DB, JSON.stringify(db));
  } catch (err) {
    console.error(err);
  }
};

// ================= AUTH API ================= //
export const authApi = {
  getCurrentUser: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  loginWithEmail: async (email, password, preferredRole = 'relocator_seller') => {
    await delay(450);
    const db = getAccountsDb();
    const existing = db[email.toLowerCase()];
    
    const user = {
      id: existing?.id || `usr_${Date.now()}`,
      name: existing?.name || email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || "Japa User",
      email,
      avatar: existing?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      phone: existing?.phone || "+234 802 345 6789",
      role: existing?.role || preferredRole || "relocator_seller",
      isVerified: true,
      authProvider: "email"
    };

    saveAccountToDb(email, user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    logApiCall('/api/v1/auth/login', 'POST', { email, password: '***', role: user.role }, { success: true, user, token: `jwt_${Date.now()}` });
    return user;
  },

  loginWithSSO: async (provider, preferredRole = 'relocator_seller') => {
    await delay(500);
    const providerProfiles = {
      google: { name: "Dr. Babatunde Alabi", email: "babatunde.alabi@gmail.com", phone: "+234 803 456 7890" },
      apple: { name: "Chiamaka Okafor", email: "chiamaka.okafor@icloud.com", phone: "+234 812 345 6789" },
      microsoft: { name: "Engr. Folake Briggs", email: "f.briggs@outlook.com", phone: "+234 813 999 1234" }
    };
    
    const profile = providerProfiles[provider] || { name: "Verified User", email: `user@${provider}.com`, phone: "+234 800 000 0000" };
    const db = getAccountsDb();
    const existing = db[profile.email.toLowerCase()];

    const user = {
      id: existing?.id || `usr_${provider}_${Date.now()}`,
      name: existing?.name || profile.name,
      email: profile.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`,
      phone: existing?.phone || profile.phone,
      role: preferredRole || existing?.role || "relocator_seller",
      isVerified: true,
      authProvider: provider
    };

    saveAccountToDb(profile.email, user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    logApiCall(`/api/v1/auth/sso/${provider}`, 'POST', { provider, preferredRole: user.role }, { success: true, user, token: `sso_jwt_${Date.now()}` });
    return user;
  },

  registerWithEmail: async ({ name, email, password, phone, role }) => {
    await delay(450);
    const user = {
      id: `usr_${Date.now()}`,
      name: name || "Verified User",
      email,
      phone: phone || "+234 800 000 0000",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: role || "relocator_seller",
      isVerified: true,
      authProvider: "email"
    };

    saveAccountToDb(email, user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    logApiCall('/api/v1/auth/register', 'POST', { name, email, phone, role: user.role }, { success: true, user, message: "Account created successfully" });
    return user;
  },

  requestPasswordResetOtp: async (email) => {
    await delay(400);
    const simulatedOtp = "489215";
    logApiCall('/api/v1/auth/forgot-password', 'POST', { email }, { success: true, message: "6-digit OTP sent to email and SMS", demoOtp: simulatedOtp });
    return { success: true, demoOtp: simulatedOtp };
  },

  verifyResetOtpAndSetPassword: async (email, otp, newPassword) => {
    await delay(500);
    logApiCall('/api/v1/auth/reset-password', 'POST', { email, otp, newPassword: '***' }, { success: true, message: "Password updated successfully" });
    return { success: true };
  },

  logout: async () => {
    await delay(200);
    const current = authApi.getCurrentUser();
    localStorage.removeItem(STORAGE_KEYS.USER);
    logApiCall('/api/v1/auth/logout', 'POST', { userId: current?.id }, { success: true });
    return true;
  }
};

// ================= MEDIA / IMAGE UPLOAD API ================= //
export const mediaApi = {
  uploadImage: async (file) => {
    await delay(600);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultUrl = reader.result;
        logApiCall('/api/v1/media/upload', 'POST', { fileName: file.name, fileSize: `${(file.size / 1024).toFixed(1)} KB`, mimeType: file.type }, {
          success: true,
          url: resultUrl,
          cdnAssetId: `cdn_asset_${Date.now()}`
        });
        resolve({ url: resultUrl, name: file.name, size: file.size });
      };
      reader.readAsDataURL(file);
    });
  }
};

// ================= CHAT & MESSAGING API ================= //
const INITIAL_CHAT_THREADS = [
  {
    threadId: "thr-001",
    listingId: "jp-001",
    listingTitle: "Luxury 4-Bedroom Duplex + RX350 + Solar (Lekki Phase 1)",
    listingPrice: "₦185,000,000",
    listingImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80",
    partner: {
      id: "seller-001",
      name: "Dr. Tunde & Folake A.",
      role: "Verified Relocator (Target Close: 9 Days)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      status: "online",
      destination: "International Relocation"
    },
    messages: [
      {
        id: "msg-1",
        sender: "seller-001",
        text: "Hello! Thank you for your interest in our Lekki Phase 1 home bundle. We are preparing for overseas relocation, so we have priced everything for a swift handover through escrow.",
        timestamp: "10:14 AM",
        isOffer: false
      },
      {
        id: "msg-2",
        sender: "buyer",
        text: "Good morning Dr. Tunde. I saw that the Lexus RX350 and 5KVA Felicity solar setup are included. Are the vehicle customs duty papers and Lagos Governor's Consent readily available?",
        timestamp: "10:16 AM",
        isOffer: false
      },
      {
        id: "msg-3",
        sender: "seller-001",
        text: "Yes, 100%! All original C of O and Consent documents have been physically vetted by SellJapa's legal team at Alausa. Vehicle customs papers and spare keys are in our safety vault ready for signing.",
        timestamp: "10:18 AM",
        isOffer: false
      }
    ]
  },
  {
    threadId: "thr-002",
    listingId: "jp-002",
    listingTitle: "5-Bedroom Contemporary Villa in Guzape, Abuja",
    listingPrice: "₦290,000,000",
    listingImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=300&q=80",
    partner: {
      id: "seller-002",
      name: "Barr. Chukwuma E.",
      role: "Verified Relocator (Target Close: 14 Days)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      status: "online",
      destination: "International Relocation"
    },
    messages: [
      {
        id: "msg-201",
        sender: "seller-002",
        text: "Good day. I am liquidating my Nigerian real estate for international relocation. If you have an escrow offer ready, we can complete the FCDA search today.",
        timestamp: "Yesterday",
        isOffer: false
      }
    ]
  }
];

export const chatApi = {
  getThreads: async () => {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_CHAT_THREADS));
      return INITIAL_CHAT_THREADS;
    }
    return JSON.parse(stored);
  },

  sendMessage: async (threadId, text, isOffer = false, offerAmount = null) => {
    await delay(300);
    const threads = await chatApi.getThreads();
    const targetThread = threads.find(t => t.threadId === threadId) || threads[0];
    
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: "buyer",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOffer,
      offerAmount
    };

    targetThread.messages.push(newMsg);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(threads));
    
    logApiCall(`/api/v1/chat/threads/${threadId}/messages`, 'POST', { text, isOffer, offerAmount }, { success: true, messageId: newMsg.id });

    // Auto-respond simulation
    setTimeout(async () => {
      const updated = await chatApi.getThreads();
      const thr = updated.find(t => t.threadId === threadId);
      if (thr) {
        const autoReply = {
          id: `msg_${Date.now() + 1}`,
          sender: thr.partner.id,
          text: isOffer 
            ? `Thank you for the escrow offer of ₦${Number(offerAmount).toLocaleString()}! I have accepted and sent the details to our conveyancer.`
            : "Received! Would you like to do a quick live video call so I can show you around the compound?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOffer: false
        };
        thr.messages.push(autoReply);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('selljapa:new_message', { detail: autoReply }));
      }
    }, 2000);

    return newMsg;
  },

  createThreadForListing: async (listing) => {
    await delay(200);
    const threads = await chatApi.getThreads();
    let thread = threads.find(t => t.listingId === listing.id);
    if (!thread) {
      thread = {
        threadId: `thr_${listing.id}_${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: `₦${Number(listing.priceNGN).toLocaleString()}`,
        listingImage: listing.images[0],
        partner: {
          id: `seller_${listing.id}`,
          name: listing.sellerName,
          role: `Verified Seller (Target Close: ${listing.targetClosingDays || 14} Days)`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.sellerName}`,
          status: "online",
          destination: "International Relocation"
        },
        messages: [
          {
            id: `msg_init_${Date.now()}`,
            sender: `seller_${listing.id}`,
            text: `Hello! I'm ${listing.sellerName}. I'm liquidating my property for international relocation with target closing in ${listing.targetClosingDays || 14} days. Feel free to ask about the property, bundle contents, or title deed inspection.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOffer: false
          }
        ]
      };
      threads.unshift(thread);
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(threads));
    }
    logApiCall('/api/v1/chat/threads', 'POST', { listingId: listing.id }, { success: true, threadId: thread.threadId });
    return thread;
  }
};

// ================= CALL & WEBRTC SIMULATOR API ================= //
export const callApi = {
  initiateCall: async (partnerName, callType = "video") => {
    await delay(500);
    const session = {
      callId: `call_${Date.now()}`,
      roomToken: `rtc_tok_${Math.random().toString(36).substr(2, 10)}`,
      partnerName,
      callType,
      encryption: "AES-256 WebRTC Peer-to-Peer",
      serverRegion: "Lagos / London Edge Node",
      status: "connected"
    };
    logApiCall('/api/v1/calls/initiate', 'POST', { partnerName, callType }, { success: true, session });
    return session;
  },

  endCall: async (callId, durationSeconds) => {
    await delay(300);
    logApiCall(`/api/v1/calls/${callId}/end`, 'POST', { durationSeconds }, { success: true, message: "Call session ended" });
    return { success: true };
  }
};
