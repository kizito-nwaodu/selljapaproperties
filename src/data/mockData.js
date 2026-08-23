// Nigerian States & Geopolitical Zones
export const NIGERIAN_ZONES = [
  {
    name: "South West",
    states: ["Lagos", "Oyo", "Ogun", "Ondo", "Osun", "Ekiti"],
    highlight: "High Demand (Lekki, Ikeja, Bodija, Abeokuta)"
  },
  {
    name: "North Central & FCT",
    states: ["Abuja FCT", "Plateau", "Kwara", "Niger", "Nasarawa", "Benue", "Kogi"],
    highlight: "Diplomatic & Prime Estates (Maitama, Guzape, Jos)"
  },
  {
    name: "South South",
    states: ["Rivers", "Delta", "Edo", "Akwa Ibom", "Cross River", "Bayelsa"],
    highlight: "Oil & Commercial Hubs (Port Harcourt GRA, Asaba, Benin)"
  },
  {
    name: "South East",
    states: ["Enugu", "Anambra", "Imo", "Abia", "Ebonyi"],
    highlight: "Thriving Commercial Centers (Independence Layout, Onitsha, Owerri)"
  },
  {
    name: "North West",
    states: ["Kano", "Kaduna", "Katsina", "Sokoto", "Zamfara", "Kebbi", "Jigawa"],
    highlight: "Commercial & Historic Hubs (Nassarawa GRA, Kaduna North)"
  },
  {
    name: "North East",
    states: ["Bauchi", "Gombe", "Adamawa", "Taraba", "Borno", "Yobe"],
    highlight: "Agricultural & Urban Centers"
  }
];

export const ALL_STATES = [
  "All 36 States + FCT",
  "Lagos",
  "Abuja FCT",
  "Rivers",
  "Oyo",
  "Enugu",
  "Delta",
  "Edo",
  "Ogun",
  "Anambra",
  "Imo",
  "Akwa Ibom",
  "Kwara",
  "Plateau",
  "Kaduna",
  "Kano",
  "Ondo",
  "Osun",
  "Ekiti",
  "Cross River",
  "Abia",
  "Ebonyi",
  "Benue",
  "Niger",
  "Nasarawa",
  "Kogi",
  "Bayelsa",
  "Bauchi",
  "Gombe",
  "Adamawa",
  "Taraba",
  "Sokoto",
  "Katsina",
  "Kebbi",
  "Zamfara",
  "Jigawa",
  "Borno",
  "Yobe"
];

// Exchange Rates
export const EXCHANGE_RATES = {
  NGN: { symbol: "₦", rate: 1, name: "Nigerian Naira" },
  USD: { symbol: "$", rate: 1550, name: "US Dollar" },
  GBP: { symbol: "£", rate: 1980, name: "British Pound" },
  EUR: { symbol: "€", rate: 1680, name: "Euro" },
  CAD: { symbol: "CA$", rate: 1140, name: "Canadian Dollar" }
};

// Rich Japa Properties & Bundles Mock Data (Privacy & Security Compliant - No Flight Details)
export const JAPA_LISTINGS = [
  {
    id: "jp-001",
    title: "Luxury 4-Bedroom Semi-Detached Duplex + 2022 RX350 + 5KVA Solar (Take-All Bundle)",
    type: "Whole-House Relocation Bundle",
    category: "bundle",
    state: "Lagos",
    lga: "Eti-Osa",
    location: "Lekki Phase 1 (Off Admiralty Way), Lagos",
    priceNGN: 185000000,
    originalValueNGN: 245000000,
    discountPercent: 24,
    targetClosingDays: 9,
    destination: "International Relocation",
    sellerName: "Dr. Tunde & Folake A.",
    sellerProfession: "Medical & Tech Professional",
    verifiedTitle: "Governor's Consent & Building Approval",
    inspectionScore: 98,
    inspectionStatus: "100% Inspected & Clear Title",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["4 Bedrooms En-suite", "Fitted Italian Kitchen", "5KVA Felicity Lithium Solar Inverter", "Private BQ", "Swimming Pool Access"],
    bundledItems: [
      { item: "4-Bedroom Semi-Detached Duplex in Lekki Phase 1", individualValue: "₦200,000,000" },
      { item: "2022 Lexus RX 350 (Foreign Used, Full Option, 34k miles)", individualValue: "₦28,000,000" },
      { item: "5KVA 48V Felicity Lithium Solar Setup + 8 Tier-1 Panels", individualValue: "₦7,500,000" },
      { item: "Samsung 75-inch QLED TV + Bose Surround Sound System", individualValue: "₦3,800,000" },
      { item: "Custom Italian 8-Seater Velvet Dining & Chesterfield Sofas", individualValue: "₦5,700,000" }
    ],
    description: "Family undergoing international relocation. Expedited full liquidation of house and personal assets. Keys and deed transfer processed securely through SellJapa Escrow upon closing. Fully furnished and move-in ready.",
    urgencyLevel: "critical",
    escrowEligible: true,
    virtualTourAvailable: true
  },
  {
    id: "jp-002",
    title: "5-Bedroom Contemporary Villa with Penthouse & City View",
    type: "Residential Property",
    category: "house",
    state: "Abuja FCT",
    lga: "Municipal",
    location: "Guzape Diplomatic Zone, Abuja",
    priceNGN: 290000000,
    originalValueNGN: 370000000,
    discountPercent: 21,
    targetClosingDays: 14,
    destination: "International Relocation",
    sellerName: "Barr. Chukwuma E.",
    sellerProfession: "Corporate Legal Counsel",
    verifiedTitle: "Certificate of Occupancy (FCDA C of O)",
    inspectionScore: 100,
    inspectionStatus: "Full Legal Search & Structural Certified",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["5 Bedrooms (All En-suite)", "Private Elevator", "Automated Smart Home", "Infinity Terrace", "10KVA Solar Hybrid System"],
    bundledItems: [
      { item: "5-Bedroom Villa on 800sqm plot in Guzape", individualValue: "₦340,000,000" },
      { item: "Integrated Smart Lighting, Automated Curtains & CCTV", individualValue: "₦15,000,000" },
      { item: "10KVA Solar + 30KVA Soundproof Perkins Generator", individualValue: "₦15,000,000" }
    ],
    description: "Expedited sale due to overseas relocation. Direct FCDA allocation with clean unencumbered C of O. Price optimized for quick closing through escrow.",
    urgencyLevel: "critical",
    escrowEligible: true,
    virtualTourAvailable: true
  },
  {
    id: "jp-003",
    title: "Prime 1,200 SQM Dry Commercial/Residential Corner Piece Land",
    type: "Land Plot",
    category: "land",
    state: "Rivers",
    lga: "Port Harcourt",
    location: "Old GRA, Phase 2, Port Harcourt, Rivers State",
    priceNGN: 95000000,
    originalValueNGN: 130000000,
    discountPercent: 27,
    targetClosingDays: 19,
    destination: "International Relocation",
    sellerName: "Engr. Tamuno Briggs",
    sellerProfession: "Petroleum Engineering Specialist",
    verifiedTitle: "Deed of Conveyance & Registered Survey Plan",
    inspectionScore: 96,
    inspectionStatus: "Boundary Beacon & Ministry of Lands Vetted",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["1,200 SQM Dry Corner Land", "Fully Fenced with Gate", "Paved Access Road", "100% Non-Flood Zone", "Immediate Building Approval"],
    bundledItems: [],
    description: "Seller liquidating Nigerian assets for overseas relocation. Land is fenced and gated in a secure community in Old GRA. Verified free from all encumbrances.",
    urgencyLevel: "high",
    escrowEligible: true,
    virtualTourAvailable: false
  },
  {
    id: "jp-004",
    title: "Brand New 3-Bedroom Serviced Apartment + 2020 Mercedes C300",
    type: "Whole-House Relocation Bundle",
    category: "bundle",
    state: "Oyo",
    lga: "Ibadan North",
    location: "Bodija Estate (Near Housing Corp), Ibadan, Oyo State",
    priceNGN: 68000000,
    originalValueNGN: 88000000,
    discountPercent: 22,
    targetClosingDays: 8,
    destination: "International Relocation",
    sellerName: "Dr. Oladipo S.",
    sellerProfession: "Medical Consultant",
    verifiedTitle: "Registered Conveyance & Red Copy Survey",
    inspectionScore: 97,
    inspectionStatus: "Clean Search at Oyo State Lands Registry",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["3 Ensuite Bedrooms", "Dedicated Transformer", "2020 Benz C300 (Mint Condition)", "Modern POP & Chandeliers"],
    bundledItems: [
      { item: "3-Bedroom Apartment in Prime Bodija", individualValue: "₦65,000,000" },
      { item: "2020 Mercedes-Benz C300 (Clean Nigerian Registered)", individualValue: "₦18,500,000" },
      { item: "Complete Modern Home Furnishings & Inverter", individualValue: "₦4,500,000" }
    ],
    description: "Complete sale of apartment and vehicle together at an expedited discount. Direct seller transaction protected by verified escrow.",
    urgencyLevel: "critical",
    escrowEligible: true,
    virtualTourAvailable: true
  },
  {
    id: "jp-005",
    title: "4-Bedroom Detached Duplex on 2 Plots of Land",
    type: "Residential Property",
    category: "house",
    state: "Enugu",
    lga: "Enugu North",
    location: "Independence Layout, Enugu",
    priceNGN: 110000000,
    originalValueNGN: 145000000,
    discountPercent: 24,
    targetClosingDays: 22,
    destination: "International Relocation",
    sellerName: "Kenechukwu & Nneka O.",
    sellerProfession: "Software Architect",
    verifiedTitle: "Certificate of Occupancy (C of O)",
    inspectionScore: 99,
    inspectionStatus: "Physical Surveyor Inspection Passed",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["4 Massive Bedrooms", "2 Plots Compound (Can build another duplex)", "Borehole with Industrial Filtration", "Security Post"],
    bundledItems: [],
    description: "Relocation sale in high-brow Independence Layout, Enugu. Verified genuine title with prompt handover upon escrow confirmation.",
    urgencyLevel: "high",
    escrowEligible: true,
    virtualTourAvailable: true
  },
  {
    id: "jp-006",
    title: "Whole-House Home Appliance & Electronics Liquidation Pack",
    type: "Asset & Home Liquidation",
    category: "furnishing",
    state: "Lagos",
    lga: "Ikeja",
    location: "Ikeja GRA, Lagos State",
    priceNGN: 12500000,
    originalValueNGN: 19800000,
    discountPercent: 37,
    targetClosingDays: 6,
    destination: "International Relocation",
    sellerName: "Adeyemi B.",
    sellerProfession: "Finance Executive",
    verifiedTitle: "Original Purchase Invoices & Receipts Available",
    inspectionScore: 100,
    inspectionStatus: "Tested & Fully Functional",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["LG 65\" OLED TV", "LG Double Door French Refrigerator", "5 AC Inverter Units (1.5HP & 2HP)", "Washing Machine & Dryer Combo", "Complete Royal Oak Dining Set"],
    bundledItems: [
      { item: "LG Side-by-Side Inverter Refrigerator (1 yr old)", individualValue: "₦2,400,000" },
      { item: "LG 65-inch OLED 4K Cinema Smart TV", individualValue: "₦2,100,000" },
      { item: "5 Units of Panasonic 1.5HP Dual Inverter ACs", individualValue: "₦3,500,000" },
      { item: "Samsung 12kg EcoBubble Front Loader Washer/Dryer", individualValue: "₦1,800,000" },
      { item: "8-Seater Hardwood Dining Set + 7-Seater Sectional Sofa", individualValue: "₦4,800,000" },
      { item: "3.5KVA Pure Sine Wave Inverter + 2 Tubular Batteries", individualValue: "₦2,200,000" }
    ],
    description: "Complete household move-out liquidation. All items purchased brand new within the last 12-18 months with receipts. Must be picked up or dispatched together.",
    urgencyLevel: "critical",
    escrowEligible: true,
    virtualTourAvailable: true
  },
  {
    id: "jp-007",
    title: "Modern 4-Bedroom Terrace Duplex in Gated Estate",
    type: "Residential Property",
    category: "house",
    state: "Delta",
    lga: "Oshimili South",
    location: "Core Area, Asaba, Delta State",
    priceNGN: 75000000,
    originalValueNGN: 95000000,
    discountPercent: 21,
    targetClosingDays: 16,
    destination: "International Relocation",
    sellerName: "Engr. & Mrs. Okonjo",
    sellerProfession: "Civil Engineering Professional",
    verifiedTitle: "Deed of Assignment & Registered Survey",
    inspectionScore: 95,
    inspectionStatus: "Clean Title & Ministry Clearance",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["4 Ensuite Bedrooms", "Interlocked Compound", "24/7 Estate Security", "Tarred Access", "Solar Inverter Installed"],
    bundledItems: [],
    description: "Seller liquidating for international relocation. Located in a secure gated community with active diaspora homeowners.",
    urgencyLevel: "high",
    escrowEligible: true,
    virtualTourAvailable: true
  },
  {
    id: "jp-008",
    title: "1,500 SQM Industrial/Commercial Plot along Abeokuta Expressway",
    type: "Commercial Land",
    category: "land",
    state: "Ogun",
    lga: "Abeokuta South",
    location: "Abeokuta-Sagamu Expressway Corridor, Ogun State",
    priceNGN: 48000000,
    originalValueNGN: 65000000,
    discountPercent: 26,
    targetClosingDays: 25,
    destination: "International Relocation",
    sellerName: "Chief Alabi S.",
    sellerProfession: "Agricultural Exporter",
    verifiedTitle: "Ogun State C of O",
    inspectionScore: 94,
    inspectionStatus: "Boundary Verified & Unencumbered",
    images: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["1,500 SQM Solid Dry Land", "Direct Expressway Facing", "Ideal for Warehouse / Fuel Station / Commercial Plaza", "Clean C of O"],
    bundledItems: [],
    description: "Prime commercial land along busy industrial corridor. Fast sale needed for overseas business relocation.",
    urgencyLevel: "moderate",
    escrowEligible: true,
    virtualTourAvailable: false
  }
];

// Success stories / Testimonials (No flight details)
export const JAPA_STORIES = [
  {
    name: "Dr. Ogechi Nwafor",
    route: "Enugu ➡️ International Relocation",
    asset: "Sold 4-Bed Duplex + SUV in 11 Days",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    quote: "I was busy with overseas preparations and packing. Traditional agents were giving me unrealistic promises. SellJapa inspected my duplex in Independence Layout, verified my title, and matched me with a verified diaspora buyer via escrow. My money was paid in full and secured before my move-out date!"
  },
  {
    name: "Segun Adeleke",
    route: "Lekki, Lagos ➡️ International Relocation",
    asset: "Whole-House Relocation Bundle (₦140M)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "Selling a house, car, generator, and appliances one by one takes months. The 'Whole-House Bundle' feature allowed me to list everything in one package with full privacy. An investor took everything at once with zero hassle."
  },
  {
    name: "Amina & Farouk Bello",
    route: "Abuja FCT ➡️ Diaspora Investor",
    asset: "Guzape Villa (₦240M Closed via Escrow)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "As a diaspora buyer living abroad, finding genuine properties in Abuja without getting duped was impossible until SellJapa. Their lawyer-verified title check and physical inspection video gave me 100% confidence. Escrow kept my funds safe until deed registry transfer."
  }
];
