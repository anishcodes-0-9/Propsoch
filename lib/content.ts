// Copy verified against the live propsoch.com landing page (checked 2026-09-22).
// Comparison points are adapted from the site's own "How are we different" table
// and "Brokers show you the brochure. We show the reality" section, condensed for
// this redesign while preserving their original meaning.

export const nav = {
  links: [
    { label: "How We're Different", href: "#different" },
    { label: "25-Day Journey", href: "#journey" },
    { label: "Real Stories", href: "#stories" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Book a Free Call", href: "mailto:club@propsoch.com" },
};

export const hero = {
  // First entry is what renders with no JS / prefers-reduced-motion; the
  // other two cycle in on top of it. Echoes the live site's own rotating
  // pain-point framing ("Sales Pitch? Fake Claims? Half Info?") in our voice.
  eyebrowRotation: [
    "Independent home buying research",
    "No broker sales pitch",
    "No fake claims. No half info.",
  ],
  headline: "Before you trust the sales pitch, see the reality.",
  subhead:
    "Propsoch is a research-led home buying platform. Instead of a broker's brochure, you get verified site visits, an 80-point property report and a trained advisor working for you — not the builder.",
  primaryCta: { label: "Book a Free Call", href: "mailto:club@propsoch.com" },
  secondaryCta: { label: "See the 25-day journey", href: "#journey" },
  reassurance: "RERA registered · No cost until you're matched",
  // Short verification labels for the hero's measurement-line motif.
  // Relocated from the previous HeroVisual mockup card's checklist, not
  // new copy — same three points, now centralized here as content.
  verificationPoints: [
    "Layout & sunlight, checked on-site",
    "Builder track record reviewed",
    "RERA & legal status confirmed",
  ],
};

export const trust = {
  heading: "Trusted by buyers from",
  companies: [
    "Amazon",
    "Google",
    "Microsoft",
    "Jupiter",
    "Deloitte",
    "Flipkart",
    "Atlassian",
    "xto10x",
    "PhonePe",
    "Navi",
  ],
  stats: [
    { value: "700+", label: "Projects analysed across Bangalore" },
    { value: "2,500+", label: "Homebuyers guided" },
    { value: "8,500+", label: "Hours of advisory given" },
    { value: "290+", label: "Partner builders vetted" },
  ],
};

export const brochureReality = {
  heading: "Brokers show you the brochure. We show you the reality.",
  copy:
    "Glamorous model flats and polished renders hide the details that decide whether a home actually works for you. Every Propsoch shortlist is checked against what's really there.",
  brochure: {
    label: "Brochure",
    caption: "What a sales pitch shows you",
    points: [
      "Staged model flats and CGI renders",
      "Only the advantages highlighted",
      "High-pressure, time-limited offers",
      "A generic shortlist, not tailored to you",
    ],
  },
  reality: {
    label: "Reality",
    caption: "What Propsoch verifies before you decide",
    points: [
      "Actual layout, orientation and daylight, checked on-site",
      "Pros and cons documented side by side",
      "Consultative guidance, with no pressure to close",
      "A shortlist curated against 20+ livability factors",
    ],
  },
};

export const journey = {
  heading: "From first call to keys in hand — in 25 days",
  copy:
    "A structured process, not an open-ended search. Nine in ten buyers we've guided closed within this window.",
  stages: [
    {
      day: "Today",
      title: "A quick, free call",
      description:
        "We walk you through the service, answer immediate questions and set the stage for what's next.",
    },
    {
      day: "Week 1",
      title: "Discovery & longlist",
      description:
        "Tell us what you're looking for. Your advisor curates 10–12 verified projects and walks you through each one.",
    },
    {
      day: "Week 2",
      title: "Site visits",
      description:
        "Once narrowed to 4–5 properties, you see and analyse them in person with an on-ground expert.",
    },
    {
      day: "Week 3",
      title: "Deep dive",
      description:
        "Found the one? Get your Peace of Mind report within a day, plus loan assistance.",
    },
    {
      day: "Last week",
      title: "Negotiation & closure",
      description:
        "We handle the negotiation and help you seal the best deal, on your timeline.",
    },
  ],
  conclusion: "Congratulations — you've found your home sweet home.",
};

export const finalCta = {
  heading: "Choose the smart way to save ~₹4.78L and 3 months of your life.",
  subhead:
    "You're about to make the biggest purchase of your life. Make sure you do it with evidence, not a sales pitch.",
  benefits: [
    "Work with trained architects, not commission-driven agents",
    "See pros and cons exhaustively, before you decide",
    "Negotiate from a position of leverage, not guesswork",
  ],
  cta: { label: "Book a Free Call", href: "mailto:club@propsoch.com" },
};

// "How are we different?" — condensed to bullets in the brochureReality
// section above; here it's the full source table, verified directly against
// propsoch.com (checked 2026-09-23), both comparison modes it actually
// offers (vs. local brokers, vs. online portals — different row sets on
// production, not the same rows with a relabeled competitor column).
export const differentiators = {
  eyebrow: "What you care about",
  heading: "How are we different?",
  copy: "Nine ways a research-led advisor works differently from a commission-driven one — compared against local brokers, and against listing portals.",
  modes: [
    {
      id: "broker",
      label: "Local brokers",
      competitorLabel: "Local brokers",
      rows: [
        { dimension: "Sales Practices", propsoch: "Consultative, no pressure", competitor: "High-pressure sales tactics" },
        { dimension: "Transparency", propsoch: "Detailed pros & cons", competitor: "Only pros highlighted" },
        { dimension: "Project Curation", propsoch: "Based on 20+ factors", competitor: "Not curated" },
        { dimension: "Spam", propsoch: "No spam", competitor: "High spamming until closure" },
        { dimension: "Post-Sales Support", propsoch: "End-to-end support", competitor: "None" },
        { dimension: "Site Visits", propsoch: "Assisted by on-ground market experts", competitor: "No market expertise" },
        { dimension: "Negotiation", propsoch: "High leverage via insights", competitor: "No insights to leverage" },
        { dimension: "In-Depth Reports", propsoch: "2 complimentary Peace of Mind reports", competitor: "None" },
        { dimension: "Advisor", propsoch: "Trained architects", competitor: "Local sales people" },
      ],
    },
    {
      id: "portal",
      label: "Online portals",
      competitorLabel: "Online portals",
      rows: [
        { dimension: "Information Depth", propsoch: "80+ data points", competitor: "20–40 data points" },
        { dimension: "Transparency", propsoch: "Detailed pros & cons", competitor: "Only pros highlighted" },
        { dimension: "Data Accuracy", propsoch: "Verified by architects", competitor: "Loose verification" },
        { dimension: "Service Validity", propsoch: "Till you find your home", competitor: "Based on number of contacts" },
        { dimension: "Data Sources", propsoch: "RERA, Google Maps, CDP etc.", competitor: "Added by developer & broker" },
      ],
    },
  ],
};

// Real Stories — 4 real, named people from production's testimonial rail
// (checked 2026-09-23). Two carry only a video (no separate text quote was
// ever published for them); inventing a quote for those two would be
// fabricating a claim, so they render as video-only cards.
//
// Video IDs were re-verified against each video's actual thumbnail frame
// and YouTube's oEmbed title after the first pass paired them wrong —
// production's own alt-text ("Thumbnail for testimonial from X") did not
// reliably line up with the adjacent thumbnail <img> src when read out of
// the DOM, and the first pass trusted that pairing without checking the
// image content itself. Confirmed correct as of this fix:
//   Nid3XKVEApg  → thumbnail + oEmbed title "Meet Bharath & Neerja"
//   XrsfHS7tCN0  → thumbnail shows "Ankita & Vishal"
//   OZMT9fgbH_c  → thumbnail shows D.L. Narasimham (this is the video ID
//                  given in the brief — it belongs to his story, not
//                  Bharat Singh's).
export const realStories = {
  eyebrow: "04",
  heading: "Real stories from people who've been there, bought that.",
  copy: "Four buyers, in their own words — not selected quotes without names attached.",
  stories: [
    {
      name: "Bharat Singh & Neerja Ahuja",
      role: "Investment Professional in VC · Founder, EthinxThread",
      quote: "They helped me say no to impulse buying & yes to framework-based buying.",
      youtubeId: "Nid3XKVEApg",
    },
    {
      name: "Dr. Ankita Srivastava",
      role: "Propsoch buyer",
      quote: null,
      youtubeId: "XrsfHS7tCN0",
    },
    {
      name: "D.L. Narasimham",
      role: "Propsoch buyer",
      quote: null,
      youtubeId: "OZMT9fgbH_c",
    },
    {
      name: "Roshik Shenoy",
      role: "Partner, Human Capital — Deloitte",
      quote:
        "Their scientific and research-based approach to homebuying gave us a lot of comfort and solved our biggest pain point.",
      youtubeId: null,
    },
  ],
};

// Featured In — publication names read directly off production's media-wall
// screenshot (logos carry no alt text there, so this required visually
// reading the wall, not text extraction). Self-authored text cards only —
// no publication mastheads/logos are reproduced.
export const featuredIn = {
  heading: "Featured in India's top media",
  publications: [
    "ThePrint",
    "The Times of India",
    "CNBC",
    "ANI",
    "The Economic Times",
    "Outlook Business",
    "Inc42",
    "mint",
    "The Hindu",
    "Business Standard",
    "RealtyNXT",
  ],
};

// FAQ — a curated subset of production's real 30-question, 4-category
// accordion (checked 2026-09-23), verbatim question and answer text.
// Production's own answers are only mounted into the DOM on open (never
// server-rendered), so its FAQ is not actually crawlable despite looking
// like a normal accordion — ours renders the full answer in HTML always,
// see FAQ.tsx.
export const faq = {
  heading: "Frequently asked questions",
  copy: "99% of your questions should get answered here — for anything else, you can always talk to us.",
  categories: [
    {
      label: "About the Service",
      items: [
        {
          q: "What is Guided Home Buying? How does it work?",
          a: "We have divided the home-buying journey into five stages: Discovery, where we understand your needs in detail (about 10 minutes); Shortlisting, where we curate projects that match your preferences and discuss the pros and cons of each; Site Visits, where our architects accompany you and get exact availability and pricing while inspecting the location and project; Deep Dive, where we analyse the floor plans, ventilation, lighting, vastu and pricing in detail; and Booking, where we help you negotiate, connect with financing experts and seal the deal — and stay with you after you book.",
        },
        {
          q: "Will you assist with negotiations?",
          a: "Yes. Our market experts are trained on negotiation strategies and leverage the insights we find during research to get the best possible offer. Since we track on-ground transactions in real time, we understand demand, supply and how far we can push the builder on your behalf.",
        },
        {
          q: "What are the timelines?",
          a: "On average, every homebuyer takes 24 days to book a property with us. You get a dedicated advisor and a direct communication channel from day one; a Discovery Call within 24 hours; a curated shortlist of 10–12 projects within 48 hours; site visits once you've narrowed to 4–5 properties; a Peace of Mind report within 24 hours of your site visits; negotiation and closure in 5–7 days; and post-booking support through legal verification and paperwork, typically another 7–10 days.",
        },
        {
          q: "Do you also assist with home loans, taxation & legal matters?",
          a: "Yes — we've tied up with vendors and experts who help with home loans, taxation (including capital gains) and legal review of real estate agreements. Fees for these vendors are paid separately as you progress to the booking stage, at rates we've negotiated in advance.",
        },
        {
          q: "Does someone physically travel to the property to analyse them?",
          a: "Yes. Our on-ground team constantly monitors pricing, availability and upcoming developments, and walks you through both the pros and cons of the neighbourhood and builder pedigree when you visit sites with them — while shielding you from high-pressure sales tactics.",
        },
      ],
    },
    {
      label: "Fees",
      items: [
        {
          q: "What are the charges for Guided Home Buying?",
          a: "A flat service fee of ₹4,999, inclusive of taxes, valid for 6 months. If you're not satisfied with the service, it's refunded in full, no questions asked.",
        },
        {
          q: "Is the signup fee a one-time charge, or will there be additional charges?",
          a: "No additional charges. For ₹4,999 you get access to our database of 500+ verified projects, subject matter expert architects, and on-ground market experts through shortlisting, visits and closing.",
        },
        {
          q: "What is the refund policy?",
          a: "If you leverage our insights and services but proceed with another channel partner or directly with the builder for options we curated, the fee isn't refundable. In any other case, we're happy to refund you if you're unsatisfied with the service.",
        },
        {
          q: "How does Propsoch make money?",
          a: "We're eligible to collect a referral fee from the builder when you buy through us — not from you.",
        },
      ],
    },
    {
      label: "Why Work With Us",
      items: [
        {
          q: "How does it compare to online platforms like Magicbricks, 99Acres, NoBroker or Housing?",
          a: "Those are classified-ad platforms where builders and brokers promote projects they have a vested interest in and pay to get your contact information — with no independent verification of the data. Propsoch has an independent team of architects that curates information from RERA, sub-registrar portals, Google Maps, Google Earth and on-ground staff, so you don't have to compromise your privacy or get spammed to access basic information.",
        },
        {
          q: "What is the difference between Propsoch & other channel partners / brokers?",
          a: "A channel partner or broker is an extended marketing arm of builders, often working a single localised market and one portfolio, with high-pressure tactics and an incomplete narrative. Propsoch is a team of industry experts and architects acting on the buyer's behalf — highlighting both pros and cons, negotiating on your behalf, and providing end-to-end support through to the keys.",
        },
        {
          q: "What are the benefits of going with this service vs doing it myself?",
          a: "Our team evaluates RERA-approved projects and hand-picks 10–12 that match your requirements, saving you the months of research and cold-calling a self-search takes. We analyse pricing, builder track record, approvals and future development rather than just marketing material, negotiate using real market data instead of leaving you to face a builder's sales team alone, and stay with you through paperwork and legal checks — on a fixed fee, not a builder commission.",
        },
      ],
    },
    {
      label: "Trust",
      items: [
        {
          q: "What's Propsoch? How long have you been in the market?",
          a: "Propsoch started more than 3 years ago. In the first year, the team collected and analysed data for 500+ projects in Bangalore to build an exhaustive real-estate reference. Founded by Ashish Acharya, an industry veteran with 17+ years assessing land risk at Godrej and Anarock, the team spans geographic, architectural, legal and financial expertise.",
        },
        {
          q: "Is Propsoch just a channel partner?",
          a: "No. Propsoch is a buyer-centric home-buying advisory platform that uses subject matter experts and technology to help homebuyers make informed decisions, empanelled with 200+ builders rather than limited to a small set.",
        },
        {
          q: "Why should I trust you?",
          a: "Online portals typically give 20–40 data points; Propsoch's Peace of Mind report covers 80+ parameters verified by architects, from legal clearances to future resale value. Data is sourced from RERA, Google Maps, CDP and other independent sources — not just what a developer or broker wants shown — and pros and cons are both documented, not just the pros.",
        },
        {
          q: "What if I am not satisfied with the service?",
          a: "If our shortlist hasn't lived up to expectations, we take another look and send a refined list. If you're still not satisfied within the service validity period, the fee is refunded in full within 15 working days — this doesn't apply once site visits have been conducted with or without our team.",
        },
      ],
    },
  ],
};

// Footer legal block reproduced as displayed on production (checked
// 2026-09-23). Note: the GSTIN and CIN strings shown there don't parse as
// standard-format Indian GSTIN/CIN numbers — that's what's on production,
// not a transcription error here. The two RERA registration numbers are
// independently verifiable via the linked government portals.
export const footer = {
  company: "Thinkr Proptech Private Limited",
  year: new Date().getFullYear(),
  email: "club@propsoch.com",
  tagline: "An independent home-buying research platform for India's biggest purchase decision.",
  legal: {
    gstin: "12314ASDAD213",
    cin: "21312215151661",
    rera: [
      {
        label: "Karnataka RERA Reg. No.",
        value: "PRM/KA/RERA/1251/446/AG/220927/003103",
        href: "https://rera.karnataka.gov.in/home?language=en",
      },
      {
        label: "Maharashtra RERA Reg. No.",
        value: "A041182600110",
        href: "https://maharera.maharashtra.gov.in/",
      },
    ],
  },
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "How We're Different", href: "#different" },
        { label: "Brochure vs Reality", href: "#reality" },
        { label: "25-Day Journey", href: "#journey" },
        { label: "Real Stories", href: "#stories" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Privacy Policy", href: "https://www.propsoch.com/meta/privacy" },
        { label: "Terms & Conditions", href: "https://www.propsoch.com/meta/terms" },
      ],
    },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/propsoch.club" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/propsoch" },
    { label: "YouTube", href: "https://www.youtube.com/@club.propsoch" },
  ],
};
