// Copy verified against the live propsoch.com landing page (checked 2026-09-22).
// Comparison points are adapted from the site's own "How are we different" table
// and "Brokers show you the brochure. We show the reality" section, condensed for
// this redesign while preserving their original meaning.

export const nav = {
  links: [
    { label: "Brochure vs Reality", href: "#reality" },
    { label: "25-Day Journey", href: "#journey" },
    { label: "Reviews", href: "#reviews" },
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
    "Deloitte",
    "Flipkart",
    "Atlassian",
    "NVIDIA",
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

export const testimonial = {
  quote:
    "Their scientific and research-based approach to homebuying gave us a lot of comfort and solved our biggest pain point.",
  name: "Roshik Shenoy",
  role: "Partner, Human Capital — Deloitte",
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

export const footer = {
  company: "Thinkr Proptech Pvt. Ltd.",
  year: new Date().getFullYear(),
  email: "club@propsoch.com",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};
