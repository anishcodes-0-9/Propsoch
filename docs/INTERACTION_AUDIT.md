# Propsoch Interaction Audit

Methodology note: this audit was produced by inspecting `https://www.propsoch.com/`
directly with a headless-Chromium (Playwright) session — reading computed
styles, DOM structure, `@keyframes` from the served CSS bundles, network
requests, and by scripting real hover/scroll/drag interactions and sampling
the DOM before/after. Every claim below is tagged **confirmed** (directly
observed via one of those methods), **inferred** (strong circumstantial
evidence — e.g. a keyframe exists in the CSS but the exact element/trigger
wasn't isolated), or **visual-only** (only seen in the provided screenshots,
not independently tested). No proprietary JavaScript source was copied or
read — only public, servable CSS/DOM/network output, the same information
any visitor's browser devtools would show.

---

## Executive Summary

The original site feels more "alive" than our current build for four
concrete, cheap-to-reproduce reasons, and one expensive reason we should
explicitly avoid:

1. **A CSS-only rotating headline** (`bromatkar-word-cycle`, confirmed) that
   cycles through several pain-point phrases in the hero subhead — blur +
   vertical drift crossfade, 6s loop, `prefers-reduced-motion`-aware. Zero
   JS. This alone does a lot of the "premium, dynamic" work in the hero.
2. **A continuously auto-scrolling trust-logo marquee** (confirmed via
   transform sampling — the strip's `translateX` changes every frame,
   looping) instead of our static wrapped row of company names.
3. **A genuinely interactive Brochure-vs-Reality slider** — two images with
   `clip-path: inset()` on each half, dragged via pointer events (confirmed,
   full DOM structure captured). This is the single most "interactive-
   feeling" moment on their page, and it is the thing our brief explicitly
   told us not to reproduce.
4. **Radix UI-driven chrome** (tabs, accordion) with small, fast (~200ms)
   state-driven CSS animations — confirmed via `data-state`/`data-orientation`
   attributes and the `accordion-up`/`accordion-down` keyframes.

Set against that: the original also ships **~1.7MB** of scripts, fonts and
images on first load (674KB of JS across 60 script requests, 924KB of
images across 29 images — confirmed via network capture), a large chunk of
it five different marketing/analytics scripts (Clarity, Meta Pixel, two GTM
containers, Google Ads conversion tracking, Calendly, and an unidentified
OpenAI-hosted script). That is a direct, measured explanation for their
43/100 mobile Lighthouse baseline, and none of it is a UX pattern worth
reproducing.

**Recommendation:** adopt #1 and #2 as cheap, high-value, CSS-only
additions. Treat #3 as a decision that needs your explicit sign-off, since
it reverses guidance you gave earlier in this project. Do not reproduce the
decorative flourishes (shine sweeps, glow, globe-spin, the "Bromatker"
wordplay ticker) or the analytics stack.

---

## Section by Section Audit

### 1. Header / Navigation
- **Sees:** Logo, dropdown mega-menus (Properties/Services/Resources/Company), search icon, share icon, wishlist heart, "Get Started" CTA.
- **Scroll:** `position: sticky; top: 0; z-index: 100` (**confirmed**) — stays pinned, no shrink/hide-on-scroll-down behavior observed.
- **Hover/click:** Dropdown menus open on click (Radix-pattern `data-state` chrome — **inferred** from the same design system used elsewhere).
- **Mechanism:** CSS `position: sticky` + Radix dropdown/menu primitives.
- **Complexity / cost:** Low. We already have the sticky-header equivalent.
- **Reproduce:** Already done (`NavBar.tsx`). No change needed.

### 2. Hero
- **Sees:** Large headline "Blindly trusting a broker's **[rotating word]**?", city selector, primary CTA, supporting copy.
- **Changes over time:** The bracketed word cycles continuously — "Sales Pitch?" → "Fake Claims?" → "Half Info?" (inferred content mapping from copy captured earlier in this project; the *mechanism* is **confirmed**: see Animation Inventory #1).
- **Viewport:** Separate class hooks for mobile vs desktop word (`temporary-hero-rotating-word` vs `temporary-desktop-hero-word`) — **confirmed**, suggests two slightly different layouts/timings per breakpoint, not just a reflow.
- **Mechanism:** Pure CSS `@keyframes`, no JS. **Confirmed.**
- **Purpose:** Communicates multiple pain points in the space of one headline instead of picking just one — directly on-message for "why should I trust a broker."
- **Complexity:** Low (a handful of stacked `<span>`/`<i>` elements on the same grid cell, staggered `animation-delay`).
- **Reproduce:** **Yes — P0.** See Recommended Interactions.

### 3. Hero image / character
- **Sees (screenshot only):** A person wearing hypnotic-spiral sunglasses, mid-laugh — a literal illustration of "don't get hypnotized by the sales pitch."
- **Mechanism:** Static photography/illustration composite, no animation observed on it directly.
- **Purpose:** Visual pun on the headline's "blindly trusting" line — strong concept, but it's photography of a real person, which is exactly the category of asset our approved image strategy deliberately avoids (licensing, and it doesn't fit our SVG/CSS illustration language).
- **Reproduce:** **No.** Our own hero illustration (brochure/reality cards + magnifying glass) already carries an equivalent "don't take it at face value" idea in our own visual language, per the brief's explicit instruction to stay visually distinct.

### 4. "Bromatker" repeating banner
- **Sees:** A diagonal, full-bleed band repeating the wordmark "Bro·mat·ker" (a pun on "Bro" + "match/matter" + "ker[osoch]"?) under the hero.
- **Mechanism:** The CSS bundle defines four dedicated keyframes for this — `anim-bro`, `anim-mat`, `anim-ker`, `anim-chevron` (**confirmed** to exist; the exact element and live motion were **not** isolated by automated query — likely a small animated accent, e.g. a chevron/checkmark pulsing mid-word, rather than the whole band translating). Visually it reads as a static repeated strip in the screenshots provided.
- **Purpose:** Pure brand wordplay/texture. No product-communication value — it's a pun on their own name.
- **Reproduce:** **No.** Not transferable to our brand, decorative-only, not worth the investigation cost to nail the exact mechanism.

### 5. City selection (Bangalore / Mumbai)
- **Sees:** Two-button toggle under the hero headline.
- **Mechanism:** Radix Tabs — `role="tab"`/`role="tablist"`, `data-[state=active]` (**confirmed** via DOM query).
- **Purpose:** Filters the CTA/experience by city — functional, not decorative.
- **Complexity:** Low (this is exactly the same primitive as the FAQ tabs, #14 below).
- **Reproduce:** **Not applicable** — we're single-market/portfolio scope, no multi-city data to toggle.

### 6. Trust logos
- **Sees:** A row of client company wordmarks/logos ("Trusted by homebuyers like you from...").
- **Continuous change:** The strip's `transform: translateX(...)` value changes every ~250ms sample, monotonically, with what looks like duplicated slide sets for a seamless loop (**confirmed** via repeated sampling — values like `318.61px → 305.81px → …` and mirrored `±3455px` clone offsets). This is a continuously auto-scrolling marquee, most likely Embla Carousel with an autoplay/loop plugin given the DOM shape (`flex` wrapper + `shrink-0 basis-1/5` slides — Embla's canonical output).
- **Purpose:** Ambient, low-effort social proof — keeps the section visually "alive" without asking for any interaction, and fits more logos in less vertical space than a static grid.
- **Complexity / cost:** Embla itself is a real (if small, ~5-6KB gzip) JS dependency running a rAF loop continuously while in view.
- **Reproduce:** **Yes — P1, but CSS-only**, not Embla. See Recommended Interactions.

### 7. Comparison section ("How are we different?")
- **Sees:** A table (Factor / Propsoch / Local Brokers), with a "Compare our services with: Local brokers | Online portals" toggle above it.
- **Mechanism:** Same Radix Tabs primitive as city selection (**confirmed**, `role="tab"`/`role="tablist"` on the "Local brokers"/"Online portals" buttons) swapping the table's right-hand column content.
- **Purpose:** Functional content filter, not decorative.
- **Reproduce:** We already communicate this comparison via our Brochure vs Reality section using real verified claims from this same table; a second literal comparison table would be redundant for a 3-section brief. **No** (out of scope, not a motion/interaction gap).

### 8. Metrics (700+ / 2,500+ / 8,500+ / 290+)
- **Sees:** Four large stat numbers.
- **Tested for count-up-on-scroll:** Sampled the DOM every 150ms while scrolling the section into view — **confirmed the numbers do NOT animate/count up**, they render as static text immediately. (Flagging this because count-up-on-scroll is a very common assumption for this kind of stat row, and it would have been easy to over-claim it without checking.)
- **Reproduce:** N/A — already matched (our `TrustBar.tsx` renders these statically too).

### 9. Testimonial / video section
- **Sees:** A "Real stories from people who've been there, bought that" carousel with prev/next arrows, playing a video with burned-in captions.
- **Mechanism:** The "video" is a lazy-mounted **YouTube iframe embed** (`youtube.com/embed/…?autoplay=1&mute=1`) that only enters the DOM once the section is scrolled into view (**confirmed** — zero `<video>`/`<iframe>` elements exist at initial load; the iframe appears only after scrolling to and dwelling on the section). This is the standard "facade" pattern: show a static thumbnail/poster until the section is actually visible, then swap in the real (heavy) embed.
- **Purpose:** Real customer social proof in video form — high-trust content type for a "biggest purchase of your life" product.
- **Reproduce:** **No, not now.** We have no rights to real customer video, and inventing one would violate the brief's "no fabricated testimonials" rule. Worth keeping the *lazy-load-on-intersection* technique in mind as a **future note** if real video is ever provided.

### 10. Brochure vs Reality interaction
- **Sees:** A single image split down the middle by a drag handle; dragging reveals more of the "broker" master-plan render on one side and more of the annotated "Propsoch reality" plan (with callouts like "High Tension line", "Water treatment plant") on the other.
- **Mechanism (fully confirmed via DOM capture):** two `<img>` elements, each in an `absolute inset-0` wrapper; the left wrapper has `clip-path: inset(0 50% 0 0)`, the right has `clip-path: inset(0 0 0 50%)`; a `w-0.5` vertical divider line with a pill-shaped, two-chevron drag handle sits on top; the whole container has `cursor: ew-resize`. Dragging updates the two `inset()` percentages (and the divider's position) together, driven by pointer events.
- **Purpose:** This is the single most concrete, literal demonstration of the site's core promise ("we show you what's actually there") — it's not decorative, it *is* the product pitch.
- **Complexity:** Low-to-moderate — no library required, roughly a pointer-events hook (`pointerdown`/`pointermove`/`pointerup`) updating one percentage value, applied as a CSS custom property to two `clip-path: inset()` declarations. Very compositor-friendly (`clip-path` doesn't trigger layout).
- **Performance cost:** Negligible at rest; a few KB of code, no library, no continuous work when not being dragged.
- **Reproduce:** **This is the one real conflict with prior guidance in this project.** Section 2 of your original build brief explicitly said *"Do not reproduce the original site's drag slider… Do not add a JavaScript slider library."* Technically, this pattern doesn't require a library (it's ~40 lines of vanilla pointer-event code, not "a slider library"), so it wouldn't violate the spirit of "no heavy dependency" — but it would reverse the explicit "no drag slider" instruction. **Flagged for your decision, not auto-recommended.** See Recommended Interactions.

### 11. 25-Day Journey
- **Sees:** A vertical stepped list (Today / Week 1 / Week 2 / Week 3 / Last week) with a checkmark on completed-looking steps and a diamond/sparkle marker on the current step, connected by a vertical line; a "Book An Appointment" CTA and the Deloitte testimonial sit alongside it.
- **Scroll:** No reveal/count animation detected on this section in the samples taken (consistent with finding #8 — this site is generally less "animate everything on scroll" than it might first appear; the movement budget is concentrated in a few specific, high-purpose spots: the hero word, the logo marquee, the compare slider).
- **Mechanism:** Static state markers (checkmark vs. sparkle icon) — visually-only, not independently tested for interactivity.
- **Purpose:** Progression/trust — "you're not just reading marketing copy, here's literally where you'd be on day N."
- **Reproduce:** We already have an equivalent (numbered circles + connecting line). No motion gap here worth closing — this section is intentionally calm on both sites.

### 12. Media section ("Featured in India's top media")
- **Sees:** A static grid/strip of press logos (TOI, CNBC, ANI, Economic Times, etc.).
- **Mechanism:** Not tested for auto-scroll; visually reads as a static wrapped grid in the screenshot, unlike the trust-logo strip.
- **Reproduce:** N/A — we don't have real press mentions to display; fabricating this would violate the "no invented claims" rule.

### 13. Dark CTA / "Guided Home Buying" section
- **Sees:** Inverted (dark background) panel with the ₹4.78L savings headline, benefit list, "Book A Free Call" and "See How You Will Save" CTAs.
- **Mechanism:** Static, no animation observed.
- **Reproduce:** N/A — we already have this pattern (`FinalCta.tsx` inverted section).

### 14. FAQ tabs
- **Sees:** "About the Service / Fees / Why Work With Us / Trust" horizontal tab bar above the accordion.
- **Mechanism:** Radix Tabs (**confirmed**, same primitive as #5 and #7).
- **Reproduce:** N/A — we don't have an FAQ section in the 3-section brief.

### 15. FAQ accordion
- **Sees:** Expandable question rows with a `+` icon.
- **Mechanism (confirmed via CSS):** Radix Accordion, animated via `@keyframes accordion-down`/`accordion-up`, driven by CSS grid-template-rows (the standard Radix technique — animating to `var(--radix-accordion-content-height)`), `animation-duration: 0.2s`, `ease-out`. This is why accordions built this way don't "jump" — the height is measured then animated, not just toggled with `display: none`.
- **Purpose:** Functional content disclosure.
- **Reproduce:** N/A for this brief (no FAQ section), but this is the right technique to reach for *if* we ever add one — cheap, no layout jump, ~10 lines of CSS.

### 16. Footer
- **Sees:** Company/legal info, RERA numbers, a QR code image, link columns, social icons, and a huge gradient-filled "Propsoch" wordmark as a bottom-of-page flourish.
- **Mechanism:** Static; the giant wordmark uses a CSS gradient fill on text, no animation.
- **Reproduce:** N/A — decorative sign-off flourish, not a pattern our footer needs.

---

## Animation Inventory

| # | Element | Trigger | Initial → Final state | Duration | Easing | Repeat | Mechanism | Perf cost |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero rotating word (`bromatkar-word-cycle`) | Continuous, on page load | `opacity:0, blur(4px), translateY(.45em)` → `opacity:1, blur(0), translateY(0)` → `opacity:0, blur(4px), translateY(-.45em)` (0%→10-30%→40-100%) | 6s per cycle | `ease` | infinite | CSS `@keyframes`, confirmed | Very low (compositor: opacity/transform; `filter:blur` is the one mildly costlier property, on a small text element only) |
| 2 | Trust-logo marquee | Continuous, on scroll into view | Horizontal `translateX` decreasing continuously, wraps via duplicated slide set | ~30-40s per full loop (estimated from sampled px/ms rate) | linear (typical for marquees; not independently confirmed) | infinite loop | Confirmed via live transform sampling; DOM shape matches Embla Carousel | Low-moderate — continuous JS/rAF-driven translate while in view if it is Embla; would be ~zero if reimplemented in pure CSS |
| 3 | Brochure/Reality drag | Pointer drag | `clip-path: inset()` percentages move with cursor X | n/a (1:1 with pointer) | n/a | while dragging | Confirmed: two `clip-path: inset()` layers + pointer events | Negligible at rest; `clip-path` is compositor-friendly |
| 4 | FAQ accordion open/close | Click | height `0` → measured content height | 0.2s | `ease-out` | once per toggle | Confirmed: Radix `accordion-up`/`accordion-down` keyframes, CSS grid-rows technique | Negligible |
| 5 | Tabs (city / comparison / FAQ) | Click | `data-state=inactive` → `active` style swap | Not sampled, likely near-instant | n/a | once per click | Confirmed: Radix Tabs (`role=tab`/`tablist`) | Negligible |
| 6 | "Bromatker" band accents (`anim-bro`/`anim-mat`/`anim-ker`/`anim-chevron`) | Unclear — likely continuous | Unclear | Unclear | Unclear | Unclear | Keyframes confirmed to exist in CSS; live element/trigger not isolated | Unknown, presumed low (small decorative element) |
| 7 | Misc. decorative keyframes seen in CSS but not attributed to a specific visible element in this audit: `aurora`, `glow`, `text-shimmer`, `nri-shine-sweep`, `globe-spin`, `k-full-anim`, `k-notched-anim`, `bounce`, `ping`, `pulse`, `spin`, `word-rotate` | — | — | — | — | — | Confirmed to exist in the shared CSS bundle (a component-library "kitchen sink"); likely used sparingly on specific service cards/icons elsewhere on the site (e.g. an NRI-advisory card, a globe icon), not on the homepage sections we screenshotted | Low individually, but collectively signal a large, general-purpose animation utility set shipped to every page regardless of use |
| 8 | Radix generic enter/exit (`--tw-enter-*`/`--tw-exit-*`, `fade-in-left`, `fade-in-scale`, `slide-up`, `scale-in`) | Dropdown/menu/dialog open-close (tailwindcss-animate plugin defaults) | — | — | — | once per toggle | Confirmed to exist (tailwindcss-animate signature); **tested and confirmed NOT applied** to scroll-triggered section reveals (see Section 8 audit) | Negligible, UI-chrome only |

---

## Interaction Inventory

| Interaction | Sections | Input | CSS or JS | Continuous/Triggered | Product-communication value |
|---|---|---|---|---|---|
| Rotating headline word | Hero | none (auto) | CSS only | Continuous | High — communicates multiple pain points |
| Logo marquee | Trust logos | none (auto) | JS (likely Embla) or could be CSS | Continuous | Medium — ambient social proof |
| Drag-to-compare | Brochure vs Reality | pointer drag | JS (pointer events) + CSS `clip-path` | Triggered, held | Very high — literal product demo |
| Tabs (3 instances) | City select, comparison table, FAQ | click/keyboard | JS (Radix) + CSS state | Triggered | Medium — functional filtering |
| Accordion | FAQ | click | JS (Radix) + CSS height animation | Triggered | Medium — functional disclosure |
| Video facade | Testimonials | scroll into view (auto-load), then native YouTube controls | JS (intersection-triggered iframe mount) | Triggered once | High — real social proof, but heavy |
| Sticky header | Nav | scroll | CSS `position: sticky` | Continuous (passive) | Low direct value, high usability value |
| Hover dropdowns | Nav menus | hover/click | JS (Radix) + CSS | Triggered | Medium — navigation |

---

## Visual Storytelling Patterns

Distilling *why* the interactive moments work, independent of implementation:

1. **Show, don't tell, the core claim.** The drag-to-compare slider doesn't describe the difference between a broker's pitch and reality — it makes you physically drag to reveal it. This is the strongest pattern on the site and the one most worth the underlying *idea* (even if we don't reproduce the literal drag mechanic — see below).
2. **Rotate through evidence instead of picking one.** The hero word-cycle avoids having to choose a single pain point by cycling through several, cheaply, in the same headline real estate.
3. **Ambient motion as a trust signal, not a demand for attention.** The logo marquee moves continuously but asks nothing of the user — it reads as "this is a living, active business" without competing for focus with the CTA.
4. **Reserve real interaction cost for the moment that earns it.** Everything else on the page (accordion, tabs) is cheap, standard, low-latency UI chrome. The one place they spent real interaction budget — the compare slider — is also the one place it maps directly to the product's value proposition. That's the right allocation principle for us to copy, even if we don't copy the specific widget.

---

## Performance Considerations

Measured via network capture on the live site (initial load, before further scrolling):

| Resource type | Requests | Transfer |
|---|---|---|
| Scripts | 60 | ~675 KB |
| Images | 29 | ~924 KB |
| Fonts | 3 | ~104 KB |
| Stylesheets | 6 | ~1 KB (mostly inlined/cached) |
| **Total (tracked types)** | **98** | **~1.7 MB** |

Third-party scripts identified by URL: Microsoft Clarity (session replay), Meta/Facebook Pixel + a Conversions API param-builder bundle, two separate Google Tag Manager containers, Google Ads conversion tracking, Calendly's widget (booking flow), and one OpenAI-hosted script (`oaiq.min.js` — purpose not identifiable from the outside; possibly an AI concierge/chat widget or an internal analytics SDK).

Our current build, for comparison: ~223 KB total transfer across 11 requests, one client component, zero third-party scripts, Lighthouse 99/100 (mobile) and 100/100 (desktop) across all four categories.

**Conclusion:** none of the interaction patterns worth keeping (word-cycle, marquee, compare-slider) are the reason the original is slow — that's almost entirely the analytics/marketing stack and unoptimized image weight. We can add all three P0/P1 recommendations below and very likely stay at or near our current Lighthouse scores, because every one of them is implementable in CSS or a few lines of vanilla JS with no new dependency.

---

## Recommended Interactions

### P0 — Essential

**P0-1: Hero rotating word/phrase (CSS-only crossfade)**
- **Why it improves UX:** Lets the hero communicate more than one reason-to-believe without lengthening the headline or adding a carousel. It's the single highest-leverage motion pattern on the reference site, and it's free.
- **Where it belongs:** `components/Hero.tsx`, in the subhead or a short accent phrase near the headline — not the H1 itself (keep the H1 static for SEO/accessibility clarity and LCP stability).
- **How to implement:** 2-3 stacked `<span>`s (`position: absolute` on the same grid cell, or `grid-row-start/col-start` like the reference), a shared `@keyframes` doing `opacity`/`translateY` (skip the `blur()` — cheaper, and blur on text can look muddy at small sizes), staggered `animation-delay` per span, wrapped in `@media (prefers-reduced-motion: reduce)` to disable and show only the first word.
- **Complexity:** Low — one CSS keyframe + a small markup change, no new client component (pure CSS keeps it a server component).
- **Performance cost:** Negligible — opacity/transform only, GPU-composited, no layout thrash, no JS.

### P1 — Strong enhancement

**P1-1: CSS-only trust-logo marquee**
- **Why it improves UX:** Currently our trust bar is a static wrapped row — correct, but inert. A slow, continuous, pausable-on-hover marquee reads as "active business" the way the original's does, without the cost of a carousel library.
- **Where it belongs:** `components/TrustBar.tsx`.
- **How to implement:** Duplicate the company list once in the DOM (`[...companies, ...companies]`), lay both copies out in a single flex row, animate the row with `@keyframes marquee { to { transform: translateX(-50%) } }`, `animation: marquee 32s linear infinite`, `hover:animation-play-state: paused`, and disable entirely under `prefers-reduced-motion` (fall back to the current static wrapped row). `aria-hidden` the duplicated copy so screen readers only hear the list once.
- **Complexity:** Low — CSS + one duplicated array map, no new dependency, no client component needed (animation is pure CSS).
- **Performance cost:** Negligible — one continuously-animating `transform`, GPU-composited; the only real cost is it never "settles" so it holds a compositor layer while in view, which is standard and cheap for a single small element.

### P1-2 (decision needed) — Brochure vs Reality drag interaction

- **Why it might improve UX:** It's the reference site's strongest single moment and directly demonstrates the product's promise physically rather than describing it.
- **Where it belongs:** Would replace or sit alongside the current stacked/side-by-side CSS panels in `components/BrochureReality.tsx`.
- **How it could be implemented:** No library needed — a small client component, one `useState`/`useRef` pair, `pointerdown`/`pointermove`/`pointerup` listeners updating a percentage, applied as a CSS variable driving `clip-path: inset()` on two stacked images (or, since we have no photography, two stacked *illustration* panels in our own visual language). Fully keyboard-accessible version would also need arrow-key support on a `role="slider"` element with `aria-valuenow`.
- **Expected complexity:** Low-moderate — roughly 60-80 lines including the accessible keyboard path.
- **Expected performance cost:** Negligible — `clip-path` is compositor-only, no continuous work when not being interacted with.
- **Why this is flagged, not just recommended:** Your instructions for this exact section explicitly said *"Do not reproduce the original site's drag slider"* and *"Build a lightweight CSS first comparison experience."* Technically this implementation wouldn't need "a JS slider library" (it's vanilla pointer events), so it doesn't violate the letter of "no dependency" — but it does reverse "do not reproduce the drag slider" at the level of interaction pattern, not just library choice. **I'm not implementing this without you explicitly saying so.** If you'd rather keep the current CSS-only stacked/side-by-side version (which already communicates the same brochure-vs-reality contrast, just without the physical drag), that's a completely reasonable call to stick with — say so and I'll leave it as-is.

### P2 — Optional polish

- **P2-1: Subtle scroll-reveal (fade + translateY-up, ~400ms, one-time, IntersectionObserver-driven) on major section headings.** Not something the original actually does (we tested and confirmed it doesn't, on the one heading we sampled) — this would be an independent enhancement, not a reproduction. Cheap (one tiny reusable hook, no library), but adds a small maintenance surface. Nice-to-have, not necessary.
- **P2-2: A small accent icon micro-interaction on the Journey timeline's current-step marker** (e.g. a gentle pulse on the active step), echoing the sparkle/checkmark distinction on the reference site. Very low cost, very low value — purely decorative polish.

---

## Interactions We Should NOT Reproduce

- **The full third-party analytics/marketing stack** (Clarity, Meta Pixel + CAPI bundle, two GTM containers, Google Ads, Calendly, the unidentified OpenAI script). This is ~500KB+ of the original's JS weight and is the single biggest measured contributor to their 43/100 mobile baseline. Not relevant to this brief, and directly contradicts the lightweight/lean direction already agreed for this project.
- **Decorative shine/glow/aurora/globe-spin flourishes** (`nri-shine-sweep`, `aurora`, `glow`, `text-shimmer`, `globe-spin`, `k-full-anim`, `k-notched-anim`). These read as a general-purpose animation utility kit applied inconsistently across the site's many pages, not specifically tuned for the homepage. They're also exactly the category of "excessive decorative animation" your design-quality guidance for this project already told us to avoid.
- **The "Bromatker" wordplay ticker band.** A pun on Propsoch's own brand name — has zero meaning transferred to our identity, purely decorative typography, not worth the effort to even fully reverse-engineer its mechanism.
- **An Embla/carousel dependency for the logo strip or anything else.** The visual effect (continuous marquee) is fully reproducible in CSS with no dependency; adding a carousel library to get an effect CSS already does natively for free would be a straightforward regression against the "no unnecessary dependencies" rule.
- **A YouTube-embedded testimonial carousel**, unless/until real customer video with usage rights is available. Fabricating one would violate the "no invented testimonials" rule already established for this project.

---

## Proposed Motion System

A small, consistent set of primitives, so any future motion added stays coherent instead of ad hoc:

| Token | Value | Used for |
|---|---|---|
| `--motion-fast` | 150ms | hover/focus micro-states |
| `--motion-base` | 220ms | UI state changes (menu open, accordion, tab switch) |
| `--motion-cycle` | 6s | ambient/looping content (hero word-cycle) |
| `--motion-marquee` | 32s | continuous marquee loop |
| Easing (entrances) | `ease-out` | anything appearing/expanding |
| Easing (continuous) | `linear` | the marquee only — anything else looks like it's stuttering |
| Properties allowed | `opacity`, `transform` (and `clip-path` for the one flagged interaction) | compositor-only, no layout-triggering properties (`width`, `height`, `top`, `left`) except where a library (Radix-style) already measures content height first |
| Universal guard | Every animation wrapped in `@media (prefers-reduced-motion: reduce)`, disabling or reducing to a single static state | matches what the reference site itself does for its own word-cycle |

This keeps us to two or three reusable animation primitives total (crossfade-drift, linear-marquee, and the existing accessible focus/hover transitions we already ship), rather than the reference site's dozen-plus bespoke keyframes.

---

## Implementation Plan

Pending your review of this document — no code has been changed yet. Proposed order if approved:

1. **P0-1 Hero word-cycle** — isolated change to `app/globals.css` (new keyframe) + `components/Hero.tsx` (markup). Re-run `axe-core` and Lighthouse after.
2. **P1-1 Trust-logo marquee** — isolated change to `app/globals.css` + `components/TrustBar.tsx`. Re-run `axe-core` and Lighthouse after.
3. **Decision point:** confirm whether P1-2 (Brochure vs Reality drag) should be built, kept as-is, or revisited in some other form. I'll hold here rather than guess.
4. **P2 items** — only if you want them; not scheduled by default.
5. After any of the above, re-verify: 320-1440px responsive check, `axe-core` 0-violations, and a fresh production-build Lighthouse run, the same way Phase 7-10 were verified for the current build — to confirm we haven't traded away the 99/100 baseline for motion.
