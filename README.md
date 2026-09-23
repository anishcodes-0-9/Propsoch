# Propsoch Landing Page Redesign

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

For a production-equivalent build (this is what every Lighthouse number
in this README was measured against — `next dev` is not representative):

```bash
npm run build
npm run start     # http://localhost:3000
```

Requires Node 18.18+ and no environment variables — there is no backend,
no API keys and no third-party service to configure. `npm run lint` runs
ESLint; TypeScript is checked automatically as part of `npm run build`.

**Deployment status:** not yet deployed. See §21.10 for what's outstanding
and why.

**Document map**, in the order they were produced:
[`docs/REDESIGN_AUDIT.md`](docs/REDESIGN_AUDIT.md) (repo/architecture
audit), [`docs/PHASE3_VISUAL_REDESIGN_PLAN.md`](docs/PHASE3_VISUAL_REDESIGN_PLAN.md)
(the approved visual plan), [`docs/INTERACTION_AUDIT.md`](docs/INTERACTION_AUDIT.md)
and [`docs/DESIGN_DIRECTION.md`](docs/DESIGN_DIRECTION.md) (earlier
reference research). §21 below is the current, authoritative account of
what's actually in the repository today; §1–20 are kept as the
project's real working history rather than edited to look
retroactively tidy — where something they describe was later
superseded, that's called out inline with a pointer forward to §21.

---

## Assessment Overview

This project is a redesign of the Propsoch landing page, based on the
provided frontend engineering assessment.

The assignment asks us to:

1.  Analyze the current Propsoch landing page
2.  Document the current Lighthouse scores
3.  Identify five UX/UI issues and explain how to fix them
4.  Build an improved landing page
5.  Redesign the hero
6.  Rebuild two additional sections from the original website
7.  Support mobile and desktop layouts
8.  Optimize images
9.  Use Next.js, TypeScript and Tailwind CSS
10. Explain the improvements in the repository README
11. Submit the GitHub repository and deployed site

The assessment is evaluated across:

Area Weight

---

Analysis depth 25
Design improvement 30
Responsive & performant 25
Code quality 20
**Total** **100**

The assignment has a two day timeline.

Source: Frontend Engineering Task provided for this assessment.
fileciteturn3file0L3-L31

---

# 1. Approach

The redesign is being approached as an engineering and product problem
rather than a purely visual redesign.

The process is:

```text
Existing website
      ↓
Evidence based audit
      ↓
Lighthouse + real user performance data
      ↓
UX / UI observations
      ↓
Design decisions
      ↓
Lean Next.js implementation
      ↓
Responsive QA
      ↓
Performance optimization
      ↓
Accessibility QA
      ↓
Before / after validation
```

The goal is to preserve the parts of Propsoch that communicate its
identity and value while improving clarity, performance, accessibility
and responsive behavior.

A major principle is to avoid making claims that cannot be supported by
observation or measurement.

---

# 2. Current Site Audit

## 2.1 What we inspected

The existing Propsoch landing page was reviewed through:

- Live page inspection
- Chrome DevTools Elements inspection
- Responsive viewport inspection
- PageSpeed Insights
- Chrome UX Report data exposed through PageSpeed Insights
- Lighthouse performance diagnostics

The hero was also inspected directly in the DOM to distinguish actual
rendered content from hidden or animated states.

### Important correction from the initial audit

An earlier text extraction appeared to show duplicated hero content and
duplicated page sections. Direct browser inspection did not support that
conclusion.

The hero contains separate spans for the headline and rotating
messaging. The visible state is intentional rather than a broken
duplicate headline.

Similarly, we are **not** treating duplicated page content as a
confirmed issue.

This distinction is important because the final analysis should be based
on evidence rather than assumptions.

---

# 3. Lighthouse Baseline

The following measurements were captured from PageSpeed Insights on 22
September 2026.

## 3.1 Mobile

### Category scores

Category Score

---

Performance **43**
Accessibility **84**
Best Practices **100**
SEO **100**

### Lab metrics

Metric Result

---

First Contentful Paint **1.5s**
Largest Contentful Paint **5.9s**
Total Blocking Time **1,750ms**
Cumulative Layout Shift **0**
Speed Index **8.4s**

### Field data

Metric Result

---

LCP **3.1s**
INP **397ms**
CLS **0**
FCP **2.3s**
TTFB **1.3s**
Core Web Vitals **Failed**

The mobile result is the primary performance concern.

---

## 3.2 Desktop

### Category scores

Category Score

---

Performance **57**
Accessibility **80**
Best Practices **100**
SEO **92**

### Lab metrics

Metric Result

---

First Contentful Paint **0.3s**
Largest Contentful Paint **1.7s**
Total Blocking Time **1,570ms**
Cumulative Layout Shift **0.001**
Speed Index **2.7s**

### Field data

Metric Result

---

LCP **1.3s**
INP **106ms**
CLS **0**
FCP **0.7s**
TTFB **0.3s**
Core Web Vitals **Passed**

Desktop has substantially better real user loading behavior, but the
Lighthouse report still shows significant JavaScript and main thread
work.

---

# 4. Key Performance Findings

## 4.1 Mobile JavaScript and main thread work

The mobile report shows:

- JavaScript execution time: **4.1s**
- Main thread work: **6.6s**
- Unused JavaScript: **423 KiB**
- 17 long tasks

This indicates that the browser is spending substantial time executing
and processing client side work.

### Planned response

The redesign should:

- Keep most content server rendered
- Minimize client components
- Avoid unnecessary hydration
- Keep interactive behavior isolated to components that genuinely need
  it
- Defer noncritical functionality
- Prefer CSS based presentation and animation where appropriate
- Avoid adding large dependencies for small interactions

---

## 4.2 Desktop JavaScript and main thread work

Desktop shows:

- JavaScript execution time: **3.2s**
- Main thread work: **5.0s**
- Unused JavaScript: **416 KiB**
- 15 long tasks

The desktop experience therefore has good initial paint characteristics
but still carries significant execution cost.

### Planned response

The implementation should not optimize only for initial paint. It should
also reduce unnecessary client side work after the page becomes visible.

---

## 4.3 Image delivery

PageSpeed estimates:

### Mobile

**461 KiB potential savings**

### Desktop

**594 KiB potential savings**

This is one of the clearest opportunities available to us because the
landing page is visually rich and image heavy.

### Planned response

Use:

- Next.js image optimization
- Responsive image dimensions
- Appropriate image sizing
- Modern image formats where supported
- Explicit image dimensions
- Priority loading only for the true above the fold visual
- Lazy loading for below the fold imagery

The goal is not simply to compress everything. Images should be loaded
according to their role in the user experience.

---

## 4.4 Render blocking

PageSpeed reports:

### Mobile

**860ms estimated savings**

### Desktop

**190ms estimated savings**

The mobile path is substantially more affected.

### Planned response

The redesign should minimize resources required before meaningful
content becomes visible.

This includes:

- Critical CSS kept small
- Optimized font loading
- Avoiding unnecessary client side dependencies
- Deferring noncritical resources
- Loading below the fold functionality progressively

---

## 4.5 Caching

PageSpeed reports approximately:

- **360 KiB** estimated savings from more efficient cache lifetimes on
  mobile
- **360 KiB** estimated savings on desktop

Where the implementation controls caching behavior, static assets should
be fingerprinted and served with appropriate long lived caching.

---

## 4.6 Legacy JavaScript

The mobile report identifies approximately **60 KiB** of potential
savings from legacy JavaScript.

The redesigned page should target modern browsers and avoid unnecessary
compatibility overhead where the application and deployment environment
allow it.

---

# 5. Five Issues Selected for the Assessment

The assignment asks for five UX/UI issues covering areas such as visual
design, spacing, mobile behavior, performance and accessibility.

The five selected issues are intentionally evidence based.

## Issue 1: Mobile performance is significantly weaker than desktop

### Evidence

Mobile Lighthouse Performance: **43**

Mobile lab LCP: **5.9s**

Mobile TBT: **1,750ms**

Mobile Speed Index: **8.4s**

Mobile real user LCP: **3.1s**

Mobile real user INP: **397ms**

Mobile Core Web Vitals assessment: **Failed**

### User impact

A mobile visitor can wait significantly longer for the main content to
become visually complete and can experience delayed interaction
response.

### Fix

Reduce JavaScript, minimize main thread work, optimize images, reduce
render blocking resources and defer noncritical functionality.

---

## Issue 2: Image delivery is heavier than necessary

### Evidence

PageSpeed estimates:

- 461 KiB potential savings on mobile
- 594 KiB potential savings on desktop

### User impact

Large or inefficient image delivery increases network transfer and can
delay visual completion, especially on slower mobile connections.

### Fix

Use responsive `next/image` configurations, appropriate dimensions,
modern formats, lazy loading for below the fold imagery and controlled
priority loading for the primary hero visual.

---

## Issue 3: Excessive JavaScript and main thread work

### Evidence

Mobile:

- 4.1s JavaScript execution
- 6.6s main thread work
- 423 KiB unused JavaScript
- 17 long tasks

Desktop:

- 3.2s JavaScript execution
- 5.0s main thread work
- 416 KiB unused JavaScript
- 15 long tasks

### User impact

The browser has to spend substantial time processing JavaScript even
after the initial page begins rendering.

### Fix

Use a server first architecture, minimize client components, avoid
unnecessary hydration and keep interactive functionality isolated.

---

## Issue 4: Render blocking resources delay meaningful content

### Evidence

PageSpeed estimates:

- 860ms savings on mobile
- 190ms savings on desktop

### User impact

Resources required before the page can render meaningful content
increase the time before the user sees and can understand the
experience.

### Fix

Reduce critical dependencies, optimize font loading, keep critical
styling lean and defer nonessential resources.

---

## Issue 5: Accessibility has room for improvement

### Evidence

Lighthouse Accessibility:

- Mobile: **84**
- Desktop: **80**

### User impact

The existing experience has measurable accessibility gaps that can
affect users who rely on keyboard navigation, assistive technologies,
clear focus states, sufficient contrast or reduced motion preferences.

### Fix

The redesign will use:

- Semantic HTML
- Correct heading hierarchy
- Accessible navigation
- Keyboard accessible interactions
- Visible focus states
- Appropriate button and link semantics
- Meaningful image alternative text
- Sufficient contrast
- Reduced motion support
- ARIA only where native HTML semantics are insufficient

We will validate the final implementation rather than claiming
individual violations that have not been separately inspected.

---

# 6. Existing Strengths to Preserve

The redesign should not erase Propsoch's identity.

The current site already communicates several useful ideas:

- Independent home buying guidance
- Trust and transparency
- Comparison against traditional broker experiences
- A structured home buying process
- Quantifiable savings
- Strong visual branding
- Social proof
- A clear orange brand accent

The redesign should improve the presentation of these ideas rather than
replace them with generic real estate marketing.

---

# 7. Sections Selected for the Rebuild

The assignment requires the redesigned hero plus two additional sections
from the original website.

We selected:

## Section 1: Brochure vs Reality

The current experience communicates the idea:

> Brokers show you the brochure. Propsoch shows you the reality.

This is a strong product differentiator and gives the redesign an
opportunity to demonstrate visual storytelling and interaction.

### Redesign direction

Create a visually strong comparison component that:

- Makes the contrast immediately understandable
- Works naturally on mobile
- Uses optimized imagery
- Avoids unnecessary JavaScript
- Maintains keyboard accessibility
- Does not force a desktop interaction model onto mobile

---

## Section 2: 25 Day Home Buying Journey

The existing page presents a staged journey through:

- Today
- Week 1
- Week 2
- Week 3
- Last week

This is valuable because it explains how the Propsoch service works
rather than simply describing it.

### Redesign direction

Create a responsive process timeline that:

- Establishes a clear progression
- Is easy to scan
- Works naturally on mobile
- Uses visual hierarchy rather than excessive text
- Can use lightweight animation without creating unnecessary main
  thread work

---

# 8. Proposed Page Structure

The working structure is:

```text
Navigation
    ↓
Hero
    ↓
Trust / credibility
    ↓
Brochure vs Reality
    ↓
25 Day Home Buying Journey
    ↓
Testimonials / proof
    ↓
Final CTA
    ↓
Footer
```

Each section should have a clear purpose.

The page should move the user through:

```text
Understand Propsoch
        ↓
Trust Propsoch
        ↓
Understand the service
        ↓
See how the process works
        ↓
Build confidence
        ↓
Take action
```

---

# 9. Hero Direction

The existing hero concept is built around questioning whether buyers
should blindly trust a broker's sales pitch.

The redesign should preserve the core idea while improving the hierarchy
and clarity.

The hero should communicate:

1.  What Propsoch does
2.  Why a homebuyer should care
3.  Why the service is trustworthy
4.  What the visitor should do next

### Desktop

Use a strong two dimensional composition with:

- Clear headline
- Supporting value proposition
- Primary CTA
- Optional supporting trust signal
- Strong property or Propsoch visual
- Controlled brand color usage

### Mobile

The composition should be intentionally redesigned rather than simply
compressed.

Priorities:

- Headline remains readable
- CTA remains obvious
- Visual does not dominate the content
- No horizontal overflow
- Appropriate spacing
- Shorter text blocks
- Touch friendly controls

---

# 10. Responsive Strategy

The implementation will be designed around content behavior rather than
arbitrary device sizes.

We will validate at least:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1280px
- 1440px

Responsive behavior should consider:

- Typography
- Content hierarchy
- Navigation
- CTA layout
- Image cropping
- Section spacing
- Cards
- Timeline composition
- Comparison interaction
- Touch targets

Mobile should be treated as its own composition rather than a smaller
desktop layout.

---

# 11. Technical Direction

## Stack

- Next.js
- TypeScript
- Tailwind CSS

## Architecture principles

Keep the application simple and appropriate for a landing page.

Prefer:

```text
Server components
    ↓
Static content
    ↓
Optimized HTML
```

and only introduce:

```text
Client components
    ↓
Actual interaction
```

where necessary.

### Component responsibilities

Potential structure:

```text
app/
  page.tsx

components/
  navigation/
  hero/
  trust/
  brochure-reality/
  journey/
  testimonials/
  final-cta/
  footer/

lib/
  constants/
  utilities/
```

The exact structure should follow the implementation rather than
creating unnecessary abstraction.

---

# 12. Performance Strategy

The redesigned page will target:

- Strong mobile LCP
- Low TBT
- Low INP
- Minimal CLS
- Reduced JavaScript
- Optimized image delivery
- Minimal render blocking
- Minimal third party JavaScript
- Appropriate caching
- Lightweight animation

We should not add a dependency simply because it makes an animation
easier.

For a landing page, the default should be:

> HTML + CSS + optimized assets first, JavaScript only where interaction
> genuinely requires it.

---

# 13. Accessibility Strategy

Accessibility is part of the implementation, not a final cleanup step.

The page should include:

- Semantic landmarks
- One clear H1
- Logical heading hierarchy
- Keyboard navigation
- Focus states
- Accessible interactive controls
- Correct link/button semantics
- Image alt text
- Decorative image handling
- Contrast checks
- Reduced motion support
- Appropriate form labeling if forms are introduced

Final accessibility should be verified with Lighthouse and manual
keyboard testing.

---

# 14. What We Are Not Doing

To stay aligned with the two day assessment, we are deliberately
avoiding unnecessary scope.

We are not building:

- A complete Propsoch application
- Backend functionality
- Authentication
- A property search engine
- A full design system
- A CMS
- Complex state management
- Multiple competing design directions
- A large animation framework
- Unnecessary third party libraries

The goal is a highly polished landing page that demonstrates strong
engineering judgment.

---

# 15. Validation Plan

After implementation, we will compare the redesigned page against the
captured baseline.

## Performance

Run PageSpeed Insights for:

- Mobile
- Desktop

Compare:

- Performance score
- LCP
- FCP
- TBT
- CLS
- Speed Index
- INP where available
- JavaScript execution
- Main thread work
- Image delivery

## Accessibility

Run Lighthouse and manually test:

- Keyboard navigation
- Focus states
- Screen reader semantics where relevant
- Reduced motion
- Contrast

## Responsive QA

Test the target viewport sizes and inspect:

- Overflow
- Typography
- Images
- Navigation
- CTA
- Comparison section
- Journey section
- Spacing

## Code quality

Review:

- TypeScript correctness
- Component boundaries
- Server/client boundaries
- Unnecessary dependencies
- Image configuration
- Semantic markup
- Maintainability

---

# 16. Definition of Done

The assessment is complete when:

### Analysis

- Five evidence based issues are documented
- Each issue explains the user impact
- Each issue has a corresponding solution
- Baseline Lighthouse scores are documented

### Design

- Hero is substantially improved
- Two original Propsoch sections are redesigned
- Brand identity remains recognizable
- Visual hierarchy is intentional
- Mobile and desktop compositions are polished

### Engineering

- Next.js is used
- TypeScript is used
- Tailwind CSS is used
- Images are optimized
- Client side JavaScript is minimized
- Components are appropriately structured
- Accessibility is considered throughout

### Validation

- Mobile and desktop are tested
- Lighthouse is rerun
- Performance changes are measured
- Accessibility is rerun
- README documents what changed and why

### Submission

- GitHub repository is available
- README contains the analysis
- Application is deployed
- Deployed URL is included

---

# 17. Current Project Status

Phase Status

---

Understand assignment Complete
Inspect existing website Complete
Inspect hero DOM Complete
Capture mobile PageSpeed baseline Complete
Capture desktop PageSpeed baseline Complete
Identify evidence based issues Complete
Select two original sections Complete
Define redesign direction In progress
Create repository Next
Implement foundation Pending
Implement hero Pending
Implement Brochure vs Reality Pending
Implement 25 Day Journey Pending
Responsive QA Pending
Accessibility QA Pending
Performance optimization Pending
Before/after PageSpeed comparison Pending
Final README update Pending
Deployment Pending

---

# 18. Next Execution Plan

The remaining work should be executed in this order:

### Step 1

Create the GitHub repository and initialize the Next.js + TypeScript +
Tailwind project.

### Step 2

Inspect the repository and establish the clean component structure.

### Step 3

Implement the redesigned hero first.

### Step 4

Implement the Brochure vs Reality section.

### Step 5

Implement the 25 Day Home Buying Journey.

### Step 6

Add supporting trust/proof and final CTA content only where it improves
the page flow.

### Step 7

Implement responsive behavior and test the target viewport sizes.

### Step 8

Optimize images, fonts, JavaScript and loading behavior.

### Step 9

Run accessibility and performance audits.

### Step 10

Compare the new results with the original baseline.

### Step 11

Polish the UI and fix remaining issues.

### Step 12

Deploy, update the README with final results and submit the repository
and deployed URL.

---

# 19. Engineering Goal

The objective is not to make the largest possible website.

The objective is to demonstrate that we can take an existing production
experience, identify real problems from evidence, make deliberate
product and design decisions, implement them cleanly and then measure
whether those decisions actually improved the experience.

That is the standard we should hold the implementation to throughout the
assessment.

---

# 20. Implementation Summary (Part 2 & 3)

The build is implemented in `app/`, `components/` and `lib/content.ts`,
following the architecture in Section 11. This section documents what was
actually built, the decisions made along the way, and the measured result
against the Section 3 baseline.

## 20.1 What was built

- **Hero (redesigned)** — headline, value proposition and a single primary
  CTA answer "what is Propsoch / why should I care / what do I do next" in
  the first viewport on both mobile and desktop. The supporting visual was
  an original illustration at this point in the project (see 20.2) — it
  was later replaced by a different, still zero-image device; see §21 for
  the current state, which supersedes this description.
- **Brochure vs Reality** — an accessible drag comparison (desktop) / tap
  toggle (mobile) between overlaid "Brochure" and "Reality" panels, built
  with `clip-path` + vanilla pointer events (no slider library). See
  §20.7 for why this reverses an earlier "CSS-only, no drag" decision.
- **25-Day Journey** — a responsive timeline (vertical with a connecting
  line on mobile, horizontal on large screens), built with the real staged
  copy from the live site (Today → Week 1 → Week 2 → Week 3 → Last Week).
- **Trust bar, testimonial, final CTA, footer, nav** — minimal supporting
  sections using verified copy/stats from the live site (client names,
  700+/2,500+/8,500+/290+ stats, the Roshik Shenoy / Deloitte quote). No
  invented claims, statistics or testimonials.

## 20.2 Image strategy

No stock photography and no scraped assets from propsoch.com were used, at
this point in the project or later. At this stage the hero visual and the
Brochure vs Reality panels were original CSS/SVG compositions (a "glossy
brochure" card vs. a "verified reality check" card with a magnifying-glass
motif) illustrating the core value proposition — investigate before you
trust the sales pitch — rather than decorative photography. The hero
mockup card was later replaced by a different device (§21); the zero-image
principle itself did not change. This was a deliberate trade-off throughout:
it keeps every visual on-brand and license-clean, and it means the largest
visual on the page costs zero image bytes. The only generated raster asset
is a 505-byte on-brand PNG app icon (`app/icon.tsx`, built with `next/og`),
replacing the default Next.js favicon. No raster or vector image files
exist anywhere in the repository at any point in this project — verified
by search, not assumed, during the §21 final audit.

## 20.3 Accessibility

Implemented alongside each component, then verified rather than assumed:

- Semantic landmarks (`header`/`nav`, `main`, `section[aria-label]`,
  `footer`), one `h1`, logical heading order.
- Full keyboard operability, including the mobile nav disclosure
  (Tab → Enter opens it, Escape closes it — tested programmatically, not
  just by inspection).
- Every color pair actually in use was checked against WCAG AA with a
  contrast calculator, then verified with an automated `axe-core` scan
  (0 violations, `wcag2a`/`wcag2aa`/`wcag21aa`, both with the mobile menu
  closed and open). The scan caught three real failures the first pass
  missed — white text on the base brand orange (3.45–3.69:1) — which is
  why buttons/badges use the darker `brand-dark` token (5.34:1+) and the
  lighter orange is reserved for icon-only, non-text circles.
- `prefers-reduced-motion` is respected on every animated element added
  after the initial build too (hero word-cycle, trust marquee, comparison
  transitions) — see §20.7.

## 20.4 Performance

Two client components: `NavBar` (mobile menu) and `BrochureRealityCompare`
(the drag/toggle comparison, added in §20.7). Everything else stays a
server component. No animation library, no third-party scripts, no image
CDN — self-hosted fonts via `next/font`, CSS/pointer-event interactions
only. Total page transfer on a production build is ~218 KB across 12
requests.

### Lighthouse: before vs. after

Baseline is the Section 3 PageSpeed Insights data for the live site. "After"
is Lighthouse run locally against a production (`next build` + `next start`)
build — a lab measurement, not a field measurement, so it isn't directly
the same methodology as PSI's field data; PSI on the deployed URL is the
number that should be quoted going forward, and this table should be
refreshed once that's available.

**Mobile**

| Metric | Live Propsoch baseline | Static build (§20.1-20.4) | After motion/interaction (§20.7) |
|---|---|---|---|
| Performance | 43 | 99 | **98** |
| Accessibility | 84 | 100 | **100** |
| Best Practices | 100 | 100 | **100** |
| SEO | 100 | 100 | **100** |
| LCP | 5.9s | 2.3s | **2.3s** |
| TBT | 1,750ms | 50ms | **50ms** |
| Speed Index | 8.4s | 1.1s | **1.1s** |
| CLS | 0 | 0 | **0** |

**Desktop**

| Metric | Live Propsoch baseline | Static build (§20.1-20.4) | After motion/interaction (§20.7) |
|---|---|---|---|
| Performance | 57 | 100 | **100** |
| Accessibility | 80 | 100 | **100** |
| Best Practices | 100 | 100 | **100** |
| SEO | 92 | 100 | **100** |
| LCP | 1.7s | 0.5s | **0.5s** |
| TBT | 1,570ms | 0ms | **0ms** |
| Speed Index | 2.7s | 0.3s | **0.3s** |
| CLS | 0.001 | 0 | **0** |

Mobile Performance moving 99→98 between builds is normal Lighthouse
run-to-run variance (the same ±1 spread shows up between individual runs of
the *same* build) — see §20.7 for the request/byte-level breakdown of what
was actually added.

## 20.5 Reference research

Two research documents were produced and reviewed before touching this
code further: `docs/INTERACTION_AUDIT.md` (reverse-engineers the live
Propsoch site's own hero word-cycle, trust-logo marquee and drag-compare
slider) and `docs/DESIGN_DIRECTION.md` (a recursive pass across the
HubSpot theme marketplace, Dribbble, an editorial round-up of real premium
real-estate sites, and the live site again, extracting ~20 reusable
patterns with a keep/reject rationale for each). §20.7 is what came out of
implementing the approved subset.

## 20.6 Deployed site

Deployed: [propsoch-chi.vercel.app](https://propsoch-chi.vercel.app) —
see §22.11 for the final deployment verification. (This section
predates deployment; left as historical record of project state at
the time it was written.)

## 20.7 Motion & interaction upgrade (post-launch, approved from §20.5's research)

Implemented in five small, individually-verified commits, each gated on a
production-build Lighthouse run + `axe-core` scan before moving to the
next:

- **Serif-italic accent typography.** One self-hosted weight (Instrument
  Serif, italic only) applied to exactly one word — "reality" — in two
  headings. +16KB, zero LCP/CLS impact (it's not the LCP element).
- **Hero rotating eyebrow phrase.** Three phrases cycling in the hero
  badge, CSS-only (`opacity`/`transform`, ~6s loop), `prefers-reduced-
  motion`-aware, full meaning available via a group `aria-label` rather
  than depending on the animation. Caught and fixed a real regression here:
  `aria-label` on a bare `<span>` is an axe "aria-prohibited-attr"
  violation and dropped Accessibility 100→96/95 — fixed with `role="group"`.
- **CSS-only trust-logo marquee.** Continuous `translateX` loop, no
  carousel library, duplicate list `aria-hidden`, pauses on hover/focus,
  swaps to the original static row entirely under reduced motion.
- **Brochure vs Reality interactive comparison** — the significant one.
  Desktop: click-anywhere-and-drag a divider between overlaid panels
  (`clip-path` + pointer events, position driven by direct DOM refs, not
  React state, so dragging triggers zero re-renders; container width read
  once per drag, never inside `pointermove`). Mobile: a tap toggle instead
  of a shrunk drag, so touch never fights vertical scroll. Full keyboard
  support (`role="slider"`, arrow keys/Home/End, `aria-valuenow`/
  `valuetext`, visible focus ring). Caught and fixed a real bug here too:
  the handle/reality-layer originally had static `transform`/`clipPath`
  values in their JSX `style` props, which React would silently reset on
  every re-render (triggered by the mobile toggle's `setState`), undoing
  the drag position — fixed by deriving the reality layer's clip-path from
  the same state that drives the toggle, and keeping the handle's
  transform purely imperative (safe because it's `display:none` whenever
  that state changes).
- **Optional polish, evaluated before keeping:** the hero's display type
  scale was nudged up (desktop-only effect — the accent word now breaks
  onto its own line) and small "01/02/03" markers were added above the
  three sections that carry the core narrative beats. A third contrast
  bug was caught this way too (`text-brand` at 3.45–3.69:1 on light
  backgrounds) and fixed with `text-brand-dark`.

**What this did not touch:** no dependency was added (`package.json` is
unchanged end to end — two client components exist in the whole app,
`NavBar` and the new `BrochureRealityCompare`); no video, WebGL, Lottie,
GSAP or animation library; no third-party analytics; the YouTube-embedded
testimonial pattern from the audit was deliberately not reproduced (no
rights to real video).

**Net measured effect:** +19KB transfer (199KB → 218KB), +1 request
(11 → 12), zero change to LCP, TBT or CLS, zero net change to any
Lighthouse category score. Full before/after detail is in §20.4's table.

---

# 21. Phase 3 — Editorial Redesign & Final Audit

Everything above this point (§1–20) is kept as the project's real
working history, not rewritten after the fact. This section documents
a second, later design pass — requested separately, after §20 had
already shipped and passed its own validation — plus the final
whole-page audit performed at the end of it. **This section reflects
the current, actual state of the repository.**

## 21.1 Why a second pass

§20's build was already measuring 98–100 across every Lighthouse
category with 0 axe violations. What it hadn't solved was a design
judgment, not an engineering one: reviewed as a whole page, it read as
a technically excellent but conventional landing page — `rounded-2xl`
mockup cards, centered content blocks, a four-card stat grid — the
kind of page that's correctly built but not distinctive. The brief for
this phase asked specifically for a page that "would make a reviewer
think this engineer understands product design" and reads as
composed rather than assembled section-by-section. That's a real,
separate bar from "fast and accessible," and closing that gap without
regressing the engineering quality already in place is what this phase
is about.

## 21.2 Process

1. **Repository audit** ([`docs/REDESIGN_AUDIT.md`](docs/REDESIGN_AUDIT.md))
   — inspected the actual codebase (not assumed) for architecture,
   duplication, CSS token gaps, accessibility posture and, most
   importantly, *why* the page read as generic: rounded-card/shadow
   language, uniform centered section openers, dashboard-style metric
   tiles.
2. **Design architecture proposal** (same document) — a 3-tier
   `ui/patterns/sections` structure, each candidate component justified
   against a genuine duplication or reuse case, not created on spec.
3. **Visual redesign plan**
   ([`docs/PHASE3_VISUAL_REDESIGN_PLAN.md`](docs/PHASE3_VISUAL_REDESIGN_PLAN.md))
   — reference research against two external sites (Les Grandes-Serres
   de Pantin, Coperni) for composition *principles* only — oversized
   authored typography, asymmetric layout, a sparing full-bleed
   "moment," restrained numbered wayfinding — never their visual
   identity. Concrete per-section composition decisions, three
   deliberately distinct "signature moments," and an explicit
   brand-fidelity guardrail against the page drifting toward a generic
   architecture-studio aesthetic.
4. **Phased implementation** — one section at a time (Hero → Trust →
   Comparison → Journey → Testimonial + Final CTA), each phase gated on
   a full production Lighthouse run, an `axe-core` scan, a 7-breakpoint
   overflow check and (where relevant) a full interaction re-test
   *before* moving to the next section. Small, logical commits — see
   `git log` for the individual phase commits.
5. **Final whole-page audit** (this section) — the page reviewed as one
   composition rather than six independently-approved sections, plus a
   compliance check against the original assignment requirements from
   §0/§1 of this README.

## 21.3 What changed, section by section

- **Hero.** The `rounded-2xl` product-mockup card is gone. The headline
  is now the primary device: an asymmetric 12-column grid, authored
  3-line breaks that only activate at `lg:` (so the oversized type scale
  never has to survive a forced break on a 320px screen — below `lg` the
  same text just flows and wraps as it always did), and a supporting
  "measurement line" motif — a rule with a few tick marks labeled from
  Propsoch's own verification points, not an abstract graphic.
- **Trust.** Split into two asymmetric bands (label+marquee, then a flat
  stat row with rule dividers) instead of one centered caption + a
  4-card stat grid. The marquee mechanism itself (CSS-only `translateX`
  loop, duplicate-and-`aria-hidden`, reduced-motion fallback,
  pause-on-hover) is unchanged, just extracted into
  `components/patterns/Marquee.tsx`.
- **Comparison.** The signature moment: an oversized "01" numeral, an
  asymmetric two-column intro, and the comparison widget itself broken
  out to true full-bleed (edge-to-edge at every breakpoint, not just
  desktop) with all card chrome (`rounded-2xl`/border/shadow) removed.
  The drag/keyboard/pointer interaction inside it is **completely
  unchanged** — same `role="slider"` semantics, same imperative-paint
  architecture — only its visual framing changed.
- **Journey.** Five stages at uneven widths (15/25/20/25/15%) instead of
  five equal cards, threaded along one continuous baseline rule with
  inline "01 — Today" labels replacing the old circle badges. Ships
  fully static — no scroll-driven state — because a static composition
  is genuinely cheaper and nothing about the redesign required
  otherwise; see §21.4.
- **Testimonial.** A calm, asymmetric offset pull-quote instead of a
  centered block — the page's one deliberate "rest beat," unchanged in
  content and given no new motion.
- **Final CTA.** An asymmetric ~60/35 split on the existing dark
  background that deliberately echoes the Hero's own asymmetric grid —
  an intentional compositional bookend for the page, not a coincidence.

## 21.4 What was deliberately not changed

- **The Brochure vs Reality interaction mechanics** — pointer capture,
  clamp math, keyboard semantics, the imperative-DOM-write architecture
  that avoids React re-renders during drag. Verified with the same
  automated drag/keyboard/mobile-toggle/scroll test after every visual
  change to the section that contains it, not assumed preserved.
- **`lib/content.ts`'s factual copy.** No invented claims, statistics,
  customer names or testimonials at any point in this phase, matching
  the rule that has held since §20.
- **The dependency graph.** `package.json` has never changed beyond the
  original `create-next-app` scaffold across this entire project —
  `next`, `react`, `react-dom` and standard dev tooling only.
- **The client/server boundary.** Still exactly two client components in
  the whole application: `NavBar` (mobile menu state) and
  `BrochureRealityCompare` (the drag interaction). `Marquee` is a plain
  server component — its animation is pure CSS, needs no JavaScript at
  all.
- **The information architecture** — Navigation → Hero → Trust →
  Comparison → Journey → Testimonial → Final CTA → Footer, unchanged
  from §7's original section selection.
- **Two motion ideas that were designed but deliberately never built:**
  a scroll-triggered entrance animation for the Comparison panel, and a
  scroll-driven active/muted state for Journey's stages. Both were
  specified in the visual plan, then dropped before implementation
  because neither passed a simple test applied consistently through
  this phase — *what does this motion communicate that the static
  version doesn't* — and the honest answer for both was "nothing, it
  would just look more sophisticated." Journey and Comparison ship fully
  static as a result.

## 21.5 Design system notes

Token additions this phase (`--text-display-lg`, `--text-eyebrow`,
`--text-metadata`) and a documented radius policy (`rounded-full`
reserved for pills/buttons/avatars; card-style rounded corners retired
in favor of hairline rules) both live in `app/globals.css`. Component
extraction followed an "opportunistic, not speculative" rule the whole
way through: `components/patterns/Marquee.tsx` was built the moment
Trust actually needed it lifted out of `TrustBar.tsx`; a `Metric`
component, a `TimelineStep` component and a shared `useInView` hook
were all *proposed* in the plan as conditional candidates and never
built, because nothing in the final implementation ever needed them —
a real example of the project's own anti-speculative-abstraction
principle holding under actual conditions, not just stated as policy.

## 21.6 Accessibility work in this phase

Verified with `axe-core` after every single phase (0 violations at
every checkpoint that follows a fix), plus manual keyboard and
reduced-motion checks re-run whenever a change touched an interactive
or animated element. Three real, evidence-based issues were caught and
fixed along the way, not assumed away:

1. **Comparison's numeral contrast.** The first-draft oversized "01"
   used a 15%-opacity brand tint intended to read as "receded." `axe`
   correctly flagged it: `aria-hidden` exempts an element from screen
   readers, but WCAG's visual contrast requirement still applies to
   anything actually rendered as text, and 15% opacity measured
   ~1.2:1 against the page background — nowhere near the 3:1 large-text
   minimum. Fixed by computing the actual luminance curve with a small
   Node script (not guessed) and landing on 80% opacity (~3.6:1, real
   margin over the minimum) — still visibly secondary to the bold black
   heading next to it.
2. **"02"/"03" section-marker tracking.** `tracking-[0.2em]` on a
   2-character numeral has only one letter-gap to stretch, so it read
   as "0 2"/"0 3" rather than a single compact numeral. Fixed
   consistently on both markers with `tracking-tight`.
3. **Mobile nav touch target.** Found during the final whole-page audit
   (§21.8): NavBar's hamburger button measured 40×40px, under this
   project's own established 44px touch-target bar (the bar already
   in use for the Comparison drag handle and its mobile toggle
   buttons) — though still inside WCAG 2.2's 24×24px AA minimum either
   way. Bumped to 44×44px for consistency with the rest of the site.

Also re-verified at the end of this phase, on the fully assembled
page: 0 axe violations with the mobile nav menu open, 0 axe violations
under `prefers-reduced-motion`, correct landmark structure (one
`header`, one `main`, two `nav` — primary + footer, each independently
`aria-label`led — two `footer` elements — the page footer plus the
Testimonial's own semantic attribution `<footer>`, both valid uses),
exactly one `h1`, and a clean heading order with no skipped levels.

## 21.7 Lighthouse: before vs. after (final)

Same methodology note as §20.4 applies and is worth repeating given
how easy it is to conflate: the "Live Propsoch baseline" column is
**lab data from PageSpeed Insights** against the real deployed site
(§3), which also has separate **field/CrUX data** reported alongside
it in §3.1/§3.2 (mobile field LCP 3.1s / INP 397ms / Core Web Vitals
**Failed**; desktop field LCP 1.3s / INP 106ms / Core Web Vitals
**Passed**) — real users, not a lab run. Every "after" column below is
a **lab measurement** from Lighthouse run locally against a production
(`next build` + `next start`) build on localhost. These are not the
same methodology and are not directly comparable to each other; once
this project is deployed, a PSI run against the live URL is the number
that should be quoted for field comparison, and this table should be
refreshed at that point.

**Mobile**

| Metric | Live baseline (lab) | Static build | Motion upgrade (§20.7) | Phase 3 + final audit (§21) |
|---|---|---|---|---|
| Performance | 43 | 99 | 98 | **99** |
| Accessibility | 84 | 100 | 100 | **100** |
| Best Practices | 100 | 100 | 100 | **100** |
| SEO | 100 | 100 | 100 | **100** |
| LCP | 5.9s | 2.3s | 2.3s | **2.3s** |
| TBT | 1,750ms | 50ms | 50ms | **50ms** |
| Speed Index | 8.4s | 1.1s | 1.1s | **1.1s** |
| CLS | 0 | 0 | 0 | **0** |

**Desktop**

| Metric | Live baseline (lab) | Static build | Motion upgrade (§20.7) | Phase 3 + final audit (§21) |
|---|---|---|---|---|
| Performance | 57 | 100 | 100 | **100** |
| Accessibility | 80 | 100 | 100 | **100** |
| Best Practices | 100 | 100 | 100 | **100** |
| SEO | 92 | 100 | 100 | **100** |
| LCP | 1.7s | 0.5s | 0.5s | **0.5s** |
| TBT | 1,570ms | 0ms | 0ms | **0ms** |
| Speed Index | 2.7s | 0.3s | 0.3s | **0.3s** |
| CLS | 0.001 | 0 | 0 | **0** |

Transfer/requests moved from 218KB/12 requests (§20.7) to **219KB/12
requests** — the entire Phase 3 redesign (a genuinely large visual
change across six sections) added roughly 1KB, because it changed
Tailwind classes and composition, not the underlying assets. The
mobile Performance score moving between 98 and 99 across runs is
ordinary Lighthouse run-to-run variance, the same spread that shows up
between repeated runs of the *identical* build — not a real
regression or improvement to read into.

## 21.8 Final whole-page audit findings

Performed against the fully assembled page, not per-section:

- **Responsive:** 0px horizontal overflow at 320/375/390/768/1024/
  1280/1440, verified on the complete page (all sections together, not
  isolated).
- **LCP element, confirmed directly** (via a `PerformanceObserver` in a
  real browser, not inferred from a Lighthouse label): the Hero
  `<h1>` text itself, painting at 152ms. Text, not an image, is the
  page's largest paint event — a direct, measured consequence of the
  zero-image strategy in §20.2/§21.4.
- **Render-blocking resources:** Lighthouse's insight audit flags the
  single compiled CSS file (8KB, ~350ms estimated FCP/LCP savings if
  inlined). This is an inherent, expected cost of shipping any CSS via
  a stylesheet at all, not a defect introduced by this project — and
  with Performance already at 99–100, inlining critical CSS was judged
  not worth the added build complexity for a marginal, mostly
  theoretical gain. Left as-is, documented rather than silently
  ignored.
- **Unused JavaScript:** ~55KB combined across two framework chunks
  (of a ~140KB total JS payload). Confirmed via the network request
  breakdown that these are React/Next.js/Turbopack runtime chunks, not
  application code — the same finding already documented in §20.4,
  unchanged by this phase, and not addressable without ejecting from
  the framework the assignment requires.
- **Two small code-quality fixes made and verified** (see §21.6 for the
  touch-target one): four unused CSS custom properties
  (`--duration-micro`/`--duration-standard`/`--duration-editorial`/
  `--ease-standard`) from the Phase 3 token-foundation commit that
  nothing ever ended up consuming, plus a pre-existing unused
  `--animate-fade-up`/`@keyframes fade-up` pair left over from the
  original project scaffold — both confirmed via a full-codebase grep
  to have zero consumers, then removed.
- **One duplication found, deliberately left alone:** `AccentWord` (the
  small helper that wraps one word in the serif-italic accent face) is
  defined identically in `Hero.tsx` and `BrochureReality.tsx`. This
  project's own stated rule, applied consistently since §21.2, is to
  extract a shared helper only once a genuine third usage appears —
  none has — so two small, harmless copies stay rather than becoming a
  premature shared component.
- Full drag/keyboard/mobile-toggle/scroll interaction test re-run on
  the final build with zero change in behavior; reduced-motion fallback
  re-confirmed; `axe-core` re-run with 0 violations.

## 21.9 Assignment requirements — final compliance check

Checked against the repository directly, not assumed:

| Requirement | Status | Evidence |
|---|---|---|
| Redesigned landing page | Done | `app/page.tsx` composes 7 redesigned sections |
| Redesigned hero | Done | §21.3; `components/Hero.tsx` |
| Two additional original sections rebuilt | Done | Brochure vs Reality + 25-Day Journey (§7, §21.3) |
| Desktop responsive | Done | §21.8; verified 1024/1280/1440 |
| Mobile responsive | Done | §21.8; verified 320/375/390/768 |
| Optimized images/assets | Done, by a documented alternative | Zero raster image files in the repo — self-authored SVG throughout; see §22 for the full media-layer and licensing history (this claim was briefly false mid-project when real propsoch.com assets were used, then reversed — §22.5) |
| Next.js | Done | `next@16.3.5`, App Router |
| TypeScript | Done | `tsc --noEmit` passes clean |
| Tailwind CSS | Done | Tailwind v4, CSS-based `@theme` config |
| Analysis/documentation in README | Done | §2–6 (audit), §21 (this section) |
| Lighthouse baseline documented | Done | §3, sourced from PageSpeed Insights against the live site |
| Five UX/UI issues documented | Done | §5 |
| Explanation of how each issue was addressed | Done | §5 "Fix" subsections, cross-referenced against the actual implementation in §20/§21 |
| Before/after performance evidence | Done | §21.7 (Phase 3), §22.9 (final, supersedes it) |
| GitHub repository | Done | this repository |
| Deployed site | Done | §22.11 |

## 21.10 Deployment status

Superseded by §22.11 — deployed after this section was originally
written. Left in place as a historical record of project state at the
end of Phase 3, before Phase 4/5's media layer and final ship.

# 22. Phase 4–5 — Media Layer, Final Redesign & Ship (2026-09-23)

Phase 3 (§21) closed the page's structural/editorial pass. This phase
covers everything since: the media layer (Hero, Journey, Comparison
visuals), two rounds of design-direction correction, a licensing
question that changed what those visuals are actually made of, and the
final ship. Written as the same evidence chain as the rest of this
document — production problem → evidence → decision → implementation →
validation — because that chain is what the rest of this README has
been arguing for as the right way to justify a design decision, and
this phase should be held to it too.

## 22.1 Why this phase happened

Phase 3 left Hero, Journey, and Comparison structurally strong but
visually thin — typography and hairline rules doing all the work, no
imagery anywhere. A staff-engineer-style review of the deployed-so-far
work against propsoch.com production and two design references
(Coperni, Les Grandes Serres de Pantin) concluded the page was
optimizing for "smallest possible bundle" rather than "most defensible
design," and that Lighthouse being high (98–100) wasn't itself evidence
the design was strong — a real production comparison, not just clean
CSS, was needed to check.

## 22.2 Hero — final decision

**First attempt (superseded):** a real Propsoch team photo, full-bleed
behind the headline. Sourced legitimately (first-party, unwatermarked)
but dropped after direct critique: a group photo answers "does Propsoch
have employees," not "why should you trust this research" — it doesn't
communicate property investigation, evidence, or verification, which is
what the section actually needs to be about. Coperni's imagery is the
product (clothing); Les Grandes Serres's imagery is the actual subject
(the building). A team photo is neither.

**Final decision:** a self-authored "investigative technical plate" —
an evidence-board SVG scaled up from a small Phase 4 accent into the
Hero's real visual anchor. Asymmetric dominant footprint bled off the
frame edge (not centered), true dimension lines with tick ends and
measured values, a six-point numbered index where three are
filled-orange-and-labeled (the three real facts already in the hero
copy: 80-point report, on-site verification, RERA registration) and
three stay bare/neutral (density without fabricating claims), and a
large faint "FIG. 01" plate caption. H1 stays the largest text element
on the page; the diagram is texture and evidence, not competition for
it.

Two real bugs were caught and fixed during this build, not after:
a negative margin meant to create "overlap with typography" instead
covered the headline text outright (reverted); the wide desktop
viewBox broke on mobile because HTML label chips were positioned by
container percentage while the SVG letterboxed at a different aspect
ratio (fixed by cropping instead of letterboxing and hiding the labels
below `sm`, per the same "hide rather than shrink" rule already used
elsewhere in this codebase).

## 22.3 Journey — final decision

**First attempt (superseded):** five real per-project master-plan
images (from propsoch.com's own property pages), swapped per stage.
Dropped after direct critique: none of the five corresponded
narratively to the stage they sat behind — interchangeable decoration,
not communication, which fails the actual test ("does the visitor
understand the concept before reading the paragraph").

**Final decision:** one shared, self-authored diagram that gets
*more annotated* as the stage advances — each layer maps directly to
real copy already in the stage descriptions, not a new claim:

| Stage | Layer added | Maps to existing copy |
|---|---|---|
| 1 — Today | none (bare footprint) | nothing surveyed yet |
| 2 — Week 1 | measurement ticks, "SHORTLIST DRAFTED" | "curates 10–12 verified projects" |
| 3 — Week 2 | site-visit marker, "SITE VISIT LOGGED" | "you see and analyse them in person" |
| 4 — Week 3 | flagged callout, "PEACE OF MIND REPORT" | "Get your Peace of Mind report" |
| 5 — Last week | closure seal, "DEAL CLOSED" | "help you seal the best deal" |

Lines draw in via `stroke-dashoffset`, markers pop via a small scale
transform, and a corner caption reads "FIG. 02 — EVIDENCE 0X/04,"
incrementing with the stage — verified directly via DOM text at every
stage, `00/04` through `04/04`. An off-by-one was caught during that
verification (layers were appearing one stage early — "Peace of Mind
report" showing at "Site visits" instead of "Deep dive," where the copy
actually places it) and fixed before shipping. Motion exists only on
the desktop shared viewport, where there's live progression to show;
each mobile stage renders once at its own fixed state, so nothing
animates there — a deliberate scope, not a gap.

## 22.4 Comparison — final decision

Kept the drag-reveal interaction model from Phase 4, but two things
changed:

- **Pointer-follow, no press required.** `pointermove` (rAF-throttled)
  drives the split on fine-pointer devices (`event.pointerType ===
  "mouse" | "pen"`), gated per-event rather than by media query so a
  touchscreen — which never fires `pointermove` without contact — falls
  through to the existing press-drag path untouched. Touch drag,
  mobile tap-toggle, and keyboard (Home/End/Arrow) all unchanged and
  re-verified. Confirmed directly: moving the mouse with no `mousedown`
  at all changed the split from 35% to 75%, at both 1440px and 1920px.
- **Contained width at `xl` (≥1280px).** Full-bleed 100vw at large
  desktop sizes had stopped reading as "the comparison" and started
  reading as "the whole section." Capped at `max-w-5xl` (1024px),
  centered within the full-bleed strip — confirmed visually at 1920px
  showing clear paper margin on both sides, plus a "FIG. 03" caption
  (see §22.5) so the contained size reads as a deliberate plate, not a
  shrunk leftover.

## 22.5 Asset licensing — found, decided, resolved

Mid-Phase-5, a check of propsoch.com's own Terms of Use (`/meta/terms`,
§7) found it explicitly prohibits reproducing site content — including
images — without Propsoch's written consent. At that point the Hero
photo, the Journey images, the Comparison images, and the trust-bar
logos were all sourced from propsoch.com's own CDN.

Rather than assume the assessment context made this acceptable, the
actual assignment brief (`Frontend Engr Task.pdf`) was read directly to
check. It says only "Analyze the Propsoch landing page and build an
improved version" — nothing granting rights to reproduce their site
content, explicit or implicit. No genuine assessment-context
authorization exists.

**Resolution:** every propsoch.com-derived asset has been replaced.

- Hero and Journey were already moved to self-authored SVG for
  independent design reasons (§22.2, §22.3) before this was fully
  resolved, which happened to close the question for those two
  sections regardless.
- **Comparison images** — replaced with `BrochurePanel` and
  `RealityPanel`, two self-authored inline SVGs sharing one footprint
  layout (same site, two lenses: soft/rounded/unannotated vs
  sharp/outlined/measured-and-flagged), captioned "FIG. 03" to match.
- **Trust-bar logos** — removed entirely. Every company now renders as
  a text wordmark (the treatment already used for one company, xto10x,
  extended to all nine) — a plain company name in text is a different
  act from reproducing a copied logo image, and was judged lower-risk
  on its own terms, but removed anyway for one consistent story rather
  than two different risk tolerances in the same page.

**Net effect: `public/images/` is empty. The entire page is 100%
self-authored SVG, CSS and typography — no raster assets anywhere.**
Full provenance history (what was sourced, why it was rejected or kept,
and the two watermarked-render candidates that were caught and
discarded before ever reaching the page) is in
`docs/PHASE4_MEDIA_LAYER_PLAN.md §8`.

One real bug was caught while building the Comparison replacement: the
new panels' outer `<svg>` was missing `fill="none"` (present on the
Hero/Journey diagrams but omitted here), so the grid pattern's
unfilled `<path>` defaulted to solid black fill instead of a thin
stroke, rendering as a black-and-white checkerboard instead of a subtle
grid. Caught in a screenshot check before shipping, fixed immediately.

## 22.6 Motion system

Three moments, not motion everywhere, in priority order:

1. **Hero eyebrow rotation** (P0) — three phrases cycling via CSS
   `@keyframes`, unchanged since Phase 3.
2. **Comparison pointer-follow** (P0) — §22.4.
3. **Journey evidence accumulation** (P1) — §22.3's dash-draw/scale-pop.

No scroll hijacking, no animation library — CSS transitions/transforms
and native SVG throughout. Every transition/animation in the codebase
collapses to ~0.01ms under `prefers-reduced-motion: reduce` via the one
global rule in `app/globals.css`, verified directly (not assumed) for
both the pre-existing eyebrow animation and the new Journey transitions.

## 22.7 Accessibility validation (this phase)

Full-page `axe-core` (wcag2a/wcag2aa/wcag21aa), run against the
production build, after scrolling the entire page to trigger lazy
content:

- **First run after the licensing-driven asset swap: 8 violations**,
  `color-contrast`, serious impact. Root cause: converting all trust
  logos to text wordmarks kept the old `opacity-60` treatment, which
  was fine for grayscale *logo images* (WCAG's logotype exception
  covers those) but faded real text down to ~3.25:1 against white —
  a genuine failure, not a false positive. Fixed by switching to
  `text-muted` at full opacity (measures ~5.2:1) instead of opacity-based
  fading — same "quiet until interacted with" look, real contrast.
- A ninth flagged node (the Hero eyebrow phrase) was checked separately
  under `prefers-reduced-motion` (steady state, no live animation to
  catch mid-transition) and came back clean — confirmed as an
  animation-timing artifact from axe sampling mid-keyframe, not a real
  defect, before being ruled out.
- **Final state: 0 violations, full page**, plus 0 on every earlier
  per-section run this phase.

Keyboard traversal: every interactive element (nav, both CTAs, the
Comparison slider, footer links) reachable via Tab, every stop showing
a visible `:focus-visible` outline — checked directly via
`el.matches(':focus-visible')` on each of 20 tab stops, not inferred
from CSS alone.

## 22.8 Responsive validation (this phase)

0px horizontal overflow confirmed at 320, 375, 390, 768, 1024, 1280,
1440, and 1920 — the full range the project has been checked against
since Phase 3, extended to 1920 this phase for the Comparison
contained-width check (§22.4). Comparison pointer-follow re-verified
working at both 1440 and 1920 specifically, since that's the exact
breakpoint boundary the `xl:max-w-5xl` change targets.

## 22.9 Performance validation — local (supersedes §21.7 for current numbers)

Measured against `npm run build && npm run start` (the same production
build the deployed site in §22.11 is built from), 2026-09-23, after the
final licensing-driven asset swap:

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | 98 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1.1s | 0.3s |
| LCP | 2.4s | 0.6s |
| TBT | 40ms | 0ms |
| CLS | 0 | 0 |
| Speed Index | 1.1s | 0.3s |
| Total transfer | 213 KiB | 213 KiB |

Total transfer dropped from 278 KiB to 213 KiB between the previous
Phase 5 checkpoint and this one — removing the propsoch.com-sourced
raster images (§22.5) reduced page weight; it wasn't a tradeoff against
the richer visual system, the two moved together.

## 22.10 Baseline vs. local vs. deployed — kept separate on purpose

Per explicit instruction earlier in this project: the original baseline
is never rewritten, and each measurement is labeled with what it
actually measured, since PageSpeed Insights (production, real network)
and Lighthouse CLI (local, simulated throttling) are different
methodologies, not directly comparable apples-to-apples.

| | Mobile Perf | Desktop Perf | Mobile LCP | Desktop LCP | Source | Captured |
|---|---|---|---|---|---|---|
| **Original baseline** | 43 | 57 | 5.9s | 1.7s | PageSpeed Insights, propsoch.com | 2026-09-22 |
| **Local redesign (this phase)** | 98 | 100 | 2.4s | 0.6s | Lighthouse CLI, `next start`, local | 2026-09-23 |
| **Deployed redesign** | 97 | 100 | 2.1s | 0.4s | Lighthouse CLI, live URL | 2026-09-23 |

No overall "better/worse" verdict beyond these measured numbers — the
methodology differs too much for that framing to mean anything
precise. Worth noting as a data point, not a judgment: the deployed
Mobile Speed Index (4.0s) reads higher than the local run (1.1s) —
expected real-network/edge-latency variance from measuring an actual
deployed origin instead of a local loopback, not a regression, and
Performance score itself (97) and LCP (2.1s, actually faster than
local's 2.4s) don't show the same pattern.

## 22.11 Deployment

**Live**: [propsoch-chi.vercel.app](https://propsoch-chi.vercel.app)
(Vercel), deployed from commit `26b2fff` on 2026-09-23.

Verified directly against the live URL, not assumed from the local
build:

- HTTP 200, correct `<title>` and `<h1>`, all seven sections present
  (Hero/Trust/Comparison/Journey/Testimonial/FinalCta/Footer)
- **Zero `<img>` tags on the deployed page** — confirms the licensing
  resolution (§22.5) actually shipped, not just passed locally
- 0 axe violations (full page, post-scroll), 0 console/page errors,
  0 failed requests
- 0px horizontal overflow at 390, 1440, and 1920 — screenshotted and
  visually confirmed, including the Comparison section's contained
  width at 1920 showing clear paper margin on both sides
- Lighthouse: **Mobile 97/100/100/100, Desktop 100/100/100/100** — full
  numbers in §22.10's table above

No further deployment steps outstanding.
