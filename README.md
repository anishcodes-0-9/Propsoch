# Propsoch Landing Page Redesign

A redesign and rebuild of the Propsoch landing page for a frontend engineering
assessment. The goal was to keep Propsoch's actual value proposition —
independent research before you trust a broker's pitch — but express it
through an editorial, evidence-driven interface: oversized typography,
asymmetric composition, and interaction that responds to the visitor instead
of a generic SaaS marketing template.

## Live Demo

[propsoch-chi.vercel.app](https://propsoch-chi.vercel.app/)

## Repository

[github.com/anishcodes-0-9/Propsoch](https://github.com/anishcodes-0-9/Propsoch)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

No animation library, no component library, no state-management library.
Interaction is built from native React state, CSS transitions/transforms and
plain browser APIs (`IntersectionObserver`, Pointer Events).

## Design Approach

The direction is editorial rather than "premium SaaS": large serif/sans
type pairing, a numbered FIG. plate system (FIG. 01 Investigation, FIG. 02
Evidence, FIG. 03 Reality, FIG. 04 Stories, FIG. 05 Proof, FIG. 06
Differentiation) running through the page, hairline rules instead of card
shadows, and restrained, purposeful motion. Reference points for pacing,
type scale and asymmetry were studied for principle, not copied — nothing on
the page is a clone of a specific site or template.

## 1. Part 1 — Analysis

**Original production baseline** — measured against `propsoch.com` via
PageSpeed Insights on 22 September 2026.

### Mobile

| | Lab | Field |
|---|---|---|
| Performance | **43** | — |
| Accessibility | **84** | — |
| Best Practices | **100** | — |
| SEO | **100** | — |
| LCP | 5.9s | 3.1s |
| TBT / INP | 1,750ms | 397ms |
| CLS | 0 | 0 |
| Core Web Vitals | — | Failed |

### Desktop

| | Lab | Field |
|---|---|---|
| Performance | **57** | — |
| Accessibility | **80** | — |
| Best Practices | **100** | — |
| SEO | **92** | — |
| LCP | 1.7s | 1.3s |
| TBT / INP | 1,570ms | 106ms |
| CLS | 0.001 | 0 |
| Core Web Vitals | — | Passed |

Lab data is a single Lighthouse run under simulated throttling. Field data is
real Chrome UX Report traffic to the live site. Mobile lab and field diverge
sharply (Performance 43 vs. a passing-adjacent field LCP) because lab
throttling is deliberately harsher than most real mobile traffic to that
domain — both are reported rather than only the more flattering one.

## 2. Five UX/UI Issues

### Issue 1 — Mobile performance is significantly weaker than desktop

**Evidence:** Mobile Lighthouse Performance 43 vs. Desktop 57; mobile lab LCP
5.9s, TBT 1,750ms, Speed Index 8.4s; mobile field LCP 3.1s, INP 397ms, Core
Web Vitals failed.

**Why it matters:** a mobile visitor — the primary channel for a real-estate
research decision made on the go — waits meaningfully longer for the page to
become visually complete and responsive.

**Fix:** reduce JavaScript and main-thread work, defer non-critical
functionality, optimize images, and reduce render-blocking resources.

### Issue 2 — Image delivery is heavier than necessary

**Evidence:** PageSpeed estimated 461 KiB of potential image savings on
mobile and 594 KiB on desktop.

**Why it matters:** oversized, unoptimized images increase transfer and delay
visual completion, disproportionately on slower mobile connections.

**Fix:** replace raster imagery with self-authored SVG where the content is
diagrammatic (comparisons, timelines, evidence visuals), and use `next/image`
with lazy loading and controlled priority for anything that remains a real
photograph.

### Issue 3 — Excessive JavaScript and main-thread work

**Evidence:** mobile: 4.1s JS execution, 6.6s main-thread work, 423 KiB
unused JS, 17 long tasks. Desktop: 3.2s JS execution, 5.0s main-thread work,
416 KiB unused JS, 15 long tasks.

**Why it matters:** the browser keeps busy processing JavaScript well after
the page starts rendering, delaying interactivity.

**Fix:** a server-first architecture — React Server Components by default,
client components only where a section genuinely needs browser-side state or
event handling.

### Issue 4 — Render-blocking resources delay meaningful content

**Evidence:** PageSpeed estimated 860ms of render-blocking savings on mobile
and 190ms on desktop.

**Why it matters:** resources required before first meaningful paint push out
the point where a visitor can actually see and understand the page.

**Fix:** keep critical CSS lean, use `next/font` with `display: swap`, and
avoid third-party scripts on the critical rendering path entirely.

### Issue 5 — Accessibility has measurable gaps

**Evidence:** Lighthouse Accessibility 84 (mobile) / 80 (desktop) on
production.

**Why it matters:** gaps in semantics, contrast, focus visibility or
keyboard support directly exclude users relying on assistive technology or
keyboard navigation.

**Fix:** semantic HTML throughout, correct heading hierarchy, visible focus
states, sufficient contrast, keyboard-operable interactions, and
`prefers-reduced-motion` support — validated with a full-page automated audit
rather than assumed.

## 3. Design Changes

- **Hero** — a large editorial headline with a rotating eyebrow phrase and a
  self-authored SVG "site-plan evidence board" in place of a stock photo,
  framing the page's core question: why trust a broker's pitch at all.
- **Trust** — a continuous logo marquee of real client/employer names,
  rendered as text wordmarks rather than copied logo images.
- **How We're Different** — a pointer/keyboard-driven comparison instrument
  contrasting Propsoch against local brokers and online portals across nine
  real dimensions, restored from production content and rebuilt as an
  interactive instrument rather than a static table.
- **Brochure vs. Reality** — a draggable/hoverable split comparison between
  the marketed and the investigated version of a property, built on two
  self-authored SVG panels.
- **25-Day Journey** — a scroll-revealed timeline of the actual Propsoch
  engagement process, with a route/measurement visual layer.
- **Real Stories** — real customer video testimonials, presented behind a
  click-to-activate facade so no video loads before the visitor asks for it.
- **Featured In** — a self-authored, text-based editorial media wall citing
  the actual publications that have covered Propsoch, in place of copied
  press logos.
- **FAQ** — real production questions and answers, restored as a
  server-rendered, keyboard-native disclosure list.
- **Final CTA** — a single, high-contrast closing call to action.
- **Footer** — real legal entity details (GSTIN, CIN, RERA registrations),
  site navigation, and contact information.

## 4. Interaction Design

- **Hero eyebrow rotation** — a pure-CSS `@keyframes` cycle across three
  phrases in a single grid cell, so no layout shift occurs as they swap;
  disabled under reduced motion.
- **Trust marquee** — one continuous CSS transform looping a doubled item
  list, no carousel library.
- **How We're Different** — pointer-hover (mouse/pen only), click, and full
  keyboard support (Arrow Up/Down, Home, End) all drive the same active-row
  state; touch devices get tap.
- **Brochure vs. Reality** — pointer-drag and hover both move the split line,
  built on `useLayoutEffect` + refs rather than re-rendering per pixel.
- **25-Day Journey** — `IntersectionObserver` marks the active stage as it
  scrolls into view; no scroll-jacking.
- **Real Stories** — a click-to-activate facade; the YouTube iframe (via
  `youtube-nocookie.com`) mounts only after explicit user interaction, and
  only one video is ever mounted at a time.
- **FAQ** — native `<details>`/`<summary>`; keyboard support and content
  visibility come from the browser, not custom JavaScript.
- **Reduced motion** — a global `prefers-reduced-motion: reduce` rule
  collapses all animation/transition durations site-wide, plus targeted
  handling for the Hero eyebrow cycle.

## 5. Performance

| Metric | Original production (lab) | Redesigned — deployed |
|---|---|---|
| Mobile Performance | 43 | **95** |
| Mobile Accessibility | 84 | **100** |
| Mobile Best Practices | 100 | **100** |
| Mobile SEO | 100 | **100** |
| Desktop Performance | 57 | **100** |
| Desktop Accessibility | 80 | **100** |
| Desktop Best Practices | 100 | **100** |
| Desktop SEO | 92 | **100** |
| Mobile LCP | 5.9s | **2.3s** |
| Mobile TBT | 1,750ms | **50ms** |
| Desktop LCP | 1.7s | **0.5s** |
| Desktop TBT | 1,570ms | **0ms** |
| CLS (mobile/desktop) | 0 / 0.001 | **0 / 0** |
| Total page transfer | — | **~230 KiB** |

Deployed numbers were measured directly against
[propsoch-chi.vercel.app](https://propsoch-chi.vercel.app/) with Lighthouse,
not against a local dev server. They are lab data, measured the same way as
the original baseline, so the two rows are directly comparable; field (real
user) data for the redesign isn't available yet since the site is newly
deployed with no Chrome UX Report traffic history.

Engineering choices behind these numbers:

- React Server Components by default — only `NavBar`, `Differentiators`,
  `RealStories`, `JourneyTimeline` and `BrochureRealityCompare` are client
  components, each because it owns real interactive state (a mobile menu
  toggle, a pointer/keyboard-driven comparison, a facade-to-iframe video
  swap, a scroll-linked active stage, and a pointer-drag split). Every other
  section is a server component.
- No animation library — all motion is CSS transitions/transforms or
  `requestAnimationFrame`-free CSS keyframes.
- The YouTube testimonial video never loads before the user clicks it.
- No unoptimized raster images — the page's imagery is self-authored inline
  SVG; the one raster asset on the whole page is the YouTube facade's poster,
  lazy-loaded and below the fold.
- No third-party JavaScript.

## 6. Accessibility

- Full-page `axe-core` audit: **0 violations**, both on the local production
  build and on the deployed URL.
- Keyboard navigation covers every interactive section, including the
  comparison instrument (Arrow Up/Down, Home, End) and the FAQ (native
  disclosure semantics).
- A visible, high-contrast `:focus-visible` style applies site-wide.
- `prefers-reduced-motion: reduce` is respected globally.
- Semantic HTML and a single `<h1>` with a correct heading hierarchy
  throughout.
- Interactive controls use `aria-pressed`/`aria-expanded` only where native
  semantics don't already communicate state; the comparison instrument
  intentionally uses plain `role="group"` + buttons rather than a formal
  `tablist`/`listbox` pattern it doesn't fully implement the keyboard
  contract for.

## 7. SEO

- Accurate title, description, and Open Graph/Twitter metadata in
  `app/layout.tsx`.
- `alternates.canonical` set to the deployed origin.
- `app/robots.ts` and `app/sitemap.ts` generate `/robots.txt` and
  `/sitemap.xml`.
- The FAQ is server-rendered — every question and answer exists in the raw
  HTML with no JavaScript required, verified directly with `curl` against
  the deployed URL. `FAQPage` JSON-LD is emitted from the same content the
  page visibly renders, so it doesn't assert anything not actually on the
  page.

## 8. Architecture

```
app/
  page.tsx        composition — imports and orders every section
  layout.tsx       metadata, fonts, root HTML shell
  globals.css       design tokens, keyframes, reduced-motion rules
  robots.ts         /robots.txt
  sitemap.ts        /sitemap.xml
  icon.tsx          generated favicon

components/
  NavBar.tsx                  client — mobile menu state
  Hero.tsx
  TrustBar.tsx
  patterns/Marquee.tsx
  Differentiators.tsx         client — pointer/keyboard comparison state
  BrochureReality.tsx
  BrochureRealityCompare.tsx  client — pointer-drag split state
  JourneyTimeline.tsx         client — IntersectionObserver active stage
  RealStories.tsx             client — facade/iframe activation state
  FeaturedIn.tsx
  FinalCta.tsx
  Faq.tsx
  Footer.tsx

lib/
  content.ts        all page copy and structured content
```

Only sections that own real interactive state are client components; the
rest render on the server. Copy and structured data live in `lib/content.ts`
rather than being hard-coded inline, so content and presentation stay
separate.

## 9. Asset Strategy

Production `propsoch.com`'s own Terms of Use prohibit reproducing site
content, including images, without permission — and the assignment brief
grants no rights to do so. Every image and logo on this page is
self-authored: inline SVG for diagrams and comparisons (the Hero evidence
board, the Journey route visual, the Brochure vs. Reality panels), and text
wordmarks in place of copied company/press logos. The only raster image on
the page is the YouTube facade poster, served directly from YouTube's own
public thumbnail CDN for a video that's linked to, not re-hosted. Verified
textual facts (comparison content, FAQ answers, testimonial names, legal
entity details) were checked against the production site and are used as
real content, not invented copy.

## 10. Validation

- `npm run build` — production build succeeds
- `tsc --noEmit` — no type errors
- `eslint` — no lint errors
- Full-page `axe-core` — 0 violations (local build and deployed)
- Keyboard traversal of every interactive section
- Responsive check at 320, 375, 390, 768, 1024, 1280, 1440 and 1920px — 0px
  horizontal overflow
- `prefers-reduced-motion: reduce` behavior checked directly
- Console errors and failed/4xx/5xx network requests — none, on the deployed
  URL
- Lighthouse mobile and desktop, run against the deployed URL

## 11. Tradeoffs

- The FAQ ships a curated subset of production's real questions rather than
  every one, to keep the section readable instead of exhaustive.
- The testimonial video is intentionally click-to-activate rather than
  autoplaying or preloading — it protects the mobile performance budget at
  the cost of one extra tap before playback starts.
- Diagrammatic visuals (comparisons, evidence boards) are self-authored SVG
  recreations rather than photography, both to avoid reproducing Propsoch's
  own assets and to keep every visual under direct performance/accessibility
  control.
- Motion is deliberately restrained — no scroll-hijacking, no large
  animation library — because the page carries a strict ≥95 performance
  target on both mobile and desktop.

## 12. Running Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

## 13. Submission

**Live:** [propsoch-chi.vercel.app](https://propsoch-chi.vercel.app/)

**GitHub:** [github.com/anishcodes-0-9/Propsoch](https://github.com/anishcodes-0-9/Propsoch)
