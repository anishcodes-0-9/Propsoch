# Propsoch Landing Page Redesign

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
  the first viewport on both mobile and desktop. The supporting visual is an
  original illustration (see 20.2), not the original site's photography.
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

No stock photography and no scraped assets from propsoch.com were used.
The hero visual and the Brochure vs Reality panels are original CSS/SVG
compositions (a "glossy brochure" card vs. a "verified reality check" card
with a magnifying-glass motif) that directly illustrate the core value
proposition — investigate before you trust the sales pitch — rather than
decorative photography. This was a deliberate trade-off: it keeps every
visual on-brand and license-clean, and it means the largest visual on the
page costs zero image bytes. The only generated raster asset is a 505-byte
on-brand PNG app icon (`app/icon.tsx`, built with `next/og`), replacing the
default Next.js favicon.

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

_Deployed URL: TBD — see repository for local run instructions
(`npm install && npm run dev`)._

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
