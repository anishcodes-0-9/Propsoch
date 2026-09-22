# Propsoch Design Direction

Research-driven design direction document. **No application code was changed
and no dependencies were installed while producing this document** — this is
a decision record for review before any implementation.

---

## 1. Research Methodology

Four source types were treated as recursive reference hubs, not single
pages:

- **Live inspection** via headless-Chromium (Playwright) for JavaScript-
  rendered sources (Dribbble, competitor sites) — DOM/CSS/network capture
  plus full-page screenshots read directly, not judged from thumbnails.
- **Content extraction** via a fetch-and-summarize tool for static/SSR
  pages (HubSpot listings, the Mockplus article, most individual reference
  sites), always asked to describe hero design, typography, navigation,
  image treatment, storytelling devices and interaction patterns — never
  just "is this good."
- Every candidate was filtered through one question before going deeper:
  **"Could a pattern from this actually improve our Propsoch redesign?"**
  Sources that failed this (generic SaaS dashboards, dead links, template
  marketplace filler) were logged and discarded rather than silently
  dropped, so the negative results are traceable too.
- Findings were cross-checked against `docs/INTERACTION_AUDIT.md` (the
  existing technical audit of the live Propsoch site) so nothing here
  duplicates or contradicts that work without saying so explicitly.

**Honesty note on depth achieved:** Dribbble began rate-limiting automated
requests after ~5 individual shot pages, capping how many shots could be
inspected at full resolution (4 loaded successfully; 2 of those gave full
visual detail). Two of the nine sites named in the Mockplus article were
dead (`kamerton.house` — connection refused; `oaksprg.com` — 404) and one
domain (`gizmo-experience.com`) now 301-redirects to an unrelated
GDPR-compliance site and was discarded rather than followed. These gaps are
called out inline below rather than papered over.

---

## 2. Reference Sources Examined

| # | Source | Type | Depth reached |
|---|---|---|---|
| 1 | `propsoch.com` | Live competitor | Already deep (see `INTERACTION_AUDIT.md`); re-checked for changes, none found |
| 2 | HubSpot Real Estate Marketplace | Template marketplace, 41 listings | Full listing surveyed; 1 listing (Vistara) inspected in depth |
| 3 | Dribbble "real estate" search | Design inspiration, ~65 shots indexed | 4 individual shots inspected at full resolution before rate-limiting |
| 4 | Mockplus "Real Estate Web Design" article | Editorial round-up | Full article read; 9 named example sites + 3 template resources extracted; 6 of 9 named sites successfully inspected (2 dead, 1 redirected/discarded) |

---

## 3. Important Linked References Discovered

From the Mockplus article (the highest-signal source of the four — a
curated list of real, live premium real estate sites, not templates):

- **Hilton & Hyland** (`hiltonhyland.com`) — luxury LA brokerage. **Inspected visually (screenshot).**
- **Les Grandes-Serres de Pantin** (`lesgrandesserresdepantin.com`) — Paris urban-regeneration marketing site. **Inspected visually (screenshot).**
- **Copernico** (`coperni.co`) — premium coworking/flexible-office provider (property-adjacent, not residential, but directly relevant editorial/interaction patterns). Inspected via content extraction.
- **Jackson Shaw** (`jacksonshaw.com`) — boutique hospitality/industrial developer. Inspected via content extraction.
- **Charbonnel Towns** (`charbonneltowns.com`) — Toronto luxury townhomes. Inspected via content extraction.
- **Caledon Build** (`caledonbuild.com`) — high-end custom residential builder. Inspected via content extraction.
- ~~Kamerton Premium Apartments~~ — dead (connection refused). Discarded.
- ~~The Oaks Prague~~ — dead (404). Discarded.
- ~~Gizmo~~ — domain now redirects to an unrelated site. Discarded, not followed.
- Colorlib/UICookies free template previews (`Haus`, `Bluesky`, generic "Real Estate" theme) — linked from the article as further examples. Not inspected in depth: these are the same category as the HubSpot marketplace (free generic templates), and the marketplace survey already gave a clear, honest verdict on that category (see §4).

From Dribbble, the two shots worth citing individually are both by the same
studio (**Ronas IT**) — "Luxury Real Estate Agency Website Design" and
"Real Estate Landing Page" — which turned out to be the two strongest,
most production-plausible visual references in the entire pass (see §4).

---

## 4. Strongest Individual Design References

### Hilton & Hyland — full-bleed editorial luxury hero
Confirmed by screenshot: a full-bleed, desaturated black-and-white
photograph (a close, intimate detail shot — a hand and cufflink, not a
building), a large serif-leaning display headline ("The Leading
International Luxury Real Estate Brokerage") in white, a minimal
tracked-out small-caps nav, and exactly **one** CTA ("View Details," ghost/
outline style). Trust is built through specific, verifiable numbers (sold
prices from $115M–$160M, "Founded in 1993") rather than adjectives. This is
the cleanest example in the whole pass of "restraint reads as premium."

### Les Grandes-Serres de Pantin — temporal contrast narrative
The site's core structural device is a **"Today / Tomorrow" split** —
today's active, lived-in industrial site vs. the rendered future
development — used to build anticipation while staying credible (today
validates tomorrow). This is structurally the same move as our own
"Brochure → Reality" and "Claims → Evidence" narrative, just applied to
time instead of to broker-vs-Propsoch. Also observed, and worth flagging as
a **cautionary** finding: the homepage's entry animation is a heavy
block-wipe text reveal — screenshotting it mid-load produced a genuinely
broken-looking half-revealed wordmark. That's a real risk of "impressive"
entrance animation: it has a state that looks like a bug if the network or
device is anything less than fast. Inspiration for the narrative structure,
explicit anti-pattern for the loading mechanic.

### Ronas IT — "Luxury Real Estate Agency Website Design" (Dribbble)
Confirmed by screenshot. Mixes a clean sans-serif for structure with a
**serif italic treatment on specific accent words** inside headlines
("Redefining *modern living*", "Best *properties*") — the whole headline
isn't serif, just the emphasis word. A search/filter bar sits overlaid at
the bottom edge of the hero photo, bridging hero into content. A four-stat
trust row sits directly under the hero (2012 / 72 / 164 / 2637-style).

### Ronas IT — "Real Estate Landing Page" (Dribbble)
Confirmed by screenshot. An oversized, bold sans headline ("Find Your
Perfect Place to Call Home") sized large enough to visually compete with,
even slightly overlap, the full-width architectural photo beneath it —
scale itself is doing the hierarchy work, not color or weight tricks.

### OnPoint Studio — "Innovative Real Estate Marketplace Design" (Dribbble)
Confirmed by screenshot, included deliberately as a **negative** reference:
a generic property-portal dashboard — left filter sidebar, card grid, map
pane, "Order Now" buttons. Competent, but this is exactly the "generic SaaS
landing page" look our project brief already told us to avoid. Useful as a
calibration point for what *not* to drift toward.

### Copernico — numbered sections & progressive disclosure
Content-extraction only (JS-heavy site, not screenshotted). Uses `.001` /
`.002`-style numbered section markers down a long single page for
wayfinding and editorial confidence, plus sequential "reveal one concept,
then the next" content blocks. Cheap pattern, easy to imitate with static
CSS counters.

### Jackson Shaw — type-only hero, zero photography
Content-extraction only. A large, confident, all-caps stacked headline
("YOU NEED MORE THAN JUST A DEVELOPER / YOU NEED A TRENDSETTER…") with
**no** hero image at all — authority built entirely through typography and
copy. Directly validates that our own no-stock-photography constraint
doesn't have to cost us a "premium" read.

### Caledon Build — methodology-as-narrative
Content-extraction only. Each of the firm's three build methods gets its
own named, credited mini-story ("Bone House," "Silo House") rather than a
generic feature list — the same instinct our 25-Day Journey section already
applies to the buying *process*.

### Charbonnel Towns — quantified-location trust
Content-extraction only. Uses hyper-specific metrics (Walk Score 86,
Transit Score 88) instead of "great location" copy — the same
verified-specifics-over-adjectives principle we're already applying with
our trust-bar stats.

### HubSpot Marketplace (41 listings, 1 inspected in depth: Vistara)
Surveyed broadly, one listing inspected closely. **Honest verdict: this
entire category is not a useful design reference for this project.**
Every listing is a broad-applicability CMS theme, optimized for
customer-agnostic reuse, not for one brand's specific story. The one
recurring "premium" signal across the category is a **gold-accent +
serif-display** combination — which is worth naming explicitly as a
*cliché to avoid*, not a pattern to adopt. Our existing orange-accent +
geometric-sans system is already more distinct than the market default.

---

## 5. Design Pattern Extraction

Each entry follows: **PATTERN → SOURCE → WHY IT WORKS → PROPSOCH
APPLICATION → PERFORMANCE → IMPLEMENTATION → DECISION.**

**PATTERN: Full-bleed restraint hero (one image, one headline, one CTA)**
SOURCE: Hilton & Hyland.
WHY IT WORKS: Nothing competes for attention; the eye has exactly one path.
PROPSOCH APPLICATION: We already follow this structurally (headline →
subhead → one primary + one secondary CTA). No change needed, but worth
stating explicitly as a rule we keep, not just a coincidence.
PERFORMANCE: N/A (no image in our version).
IMPLEMENTATION: Already implemented.
DECISION: **KEEP (validated, no change).**

**PATTERN: Verified-specific numbers over adjectives**
SOURCE: Hilton & Hyland (sold prices, founding year), Charbonnel Towns
(Walk/Transit Score).
WHY IT WORKS: Specific, checkable numbers read as more trustworthy than
superlatives — directly matches our own "no invented claims" constraint.
PROPSOCH APPLICATION: Already implemented via our trust-bar stats (700+ /
2,500+ / 8,500+ / 290+, sourced from the live site).
PERFORMANCE: N/A.
IMPLEMENTATION: Already implemented.
DECISION: **KEEP (validated, no change).**

**PATTERN: Serif-italic accent words inside a sans headline**
SOURCE: Ronas IT, "Luxury Real Estate Agency Website Design."
WHY IT WORKS: One warm, editorial accent face applied to two or three
words gives a "considered, premium" signal without committing to a whole
second typeface family for body copy, and without the cost of swapping the
workhorse font.
PROPSOCH APPLICATION: Apply to one or two emphasis words in the Hero
headline and/or the Brochure-vs-Reality heading (e.g. italicize "reality").
PERFORMANCE: One additional self-hosted variable font via `next/font`,
subset to the Latin characters actually used, applied to a handful of
words only — a few KB, non-render-blocking, doesn't touch LCP since the H1
container is already sized by the sans font.
IMPLEMENTATION: `next/font/google` (e.g. Fraunces or Instrument Serif,
italic axis only) + a CSS class applied to specific `<em>`/`<span>`
elements.
DECISION: **KEEP WITH MODIFICATION** — apply sparingly (≤3 words per page),
not as a body-text swap.

**PATTERN: Oversized headline scale, tension with the visual beneath it**
SOURCE: Ronas IT, "Real Estate Landing Page."
WHY IT WORKS: Scale alone creates hierarchy and a sense of confidence,
without needing color or animation.
PROPSOCH APPLICATION: Our `--text-display` clamp already scales
aggressively; consider pushing the upper bound slightly and letting the
headline's line-height interact more tightly with the hero illustration's
position (already close via the `lg:grid-cols-[1.08fr_0.92fr]` layout).
PERFORMANCE: Zero — pure CSS clamp value change.
IMPLEMENTATION: One-line change to `--text-display` in `globals.css`.
DECISION: **CONSIDER** — small, low-risk, worth a visual A/B look during
implementation rather than a blind change.

**PATTERN: Numbered section markers for wayfinding**
SOURCE: Copernico (`.001` / `.002`).
WHY IT WORKS: Signals "this is a structured, edited experience" and gives
the eye a small anchor at the top of each section, cheaply.
PROPSOCH APPLICATION: A small `01 / 02 / 03…` label (CSS `counter()` or
static text) beside/above major section headings (Trust, Brochure vs
Reality, Journey, Testimonial, Final CTA).
PERFORMANCE: Zero — static markup or a CSS counter, no JS.
IMPLEMENTATION: A small shared heading pattern (not a new component,
just a consistent class) in each section.
DECISION: **CONSIDER** — nice editorial touch, genuinely free, but purely
decorative; only worth doing if it doesn't visually clutter the mobile
heading layout (verify at 320-375px before committing).

**PATTERN: Temporal contrast narrative ("Today/Tomorrow")**
SOURCE: Les Grandes-Serres de Pantin.
WHY IT WORKS: Uses time instead of a second party as the contrast device,
building anticipation while staying grounded in the present.
PROPSOCH APPLICATION: Not a fit for the Brochure-vs-Reality section (we
already have a working two-party contrast: broker vs. Propsoch), but the
*structure* — "here's where you are → here's where you'll be" — is
literally what the 25-Day Journey section already does (Today → Last
Week). No new work needed; this validates the existing section rather than
suggesting a change.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **KEEP (validated, no change).**

**PATTERN: Heavy block-wipe loading/reveal animation**
SOURCE: Les Grandes-Serres de Pantin.
WHY IT WORKS (for them): Creates a memorable, agency-portfolio-grade first
impression.
WHY IT'S RISKY: Screenshotted mid-load, it produced a half-revealed,
broken-looking wordmark — that's a real failure mode on slower connections
or devices, not a hypothetical one; it was reproduced on the first attempt.
It also necessarily delays whatever it's gating, working directly against
LCP.
PROPSOCH APPLICATION: None.
PERFORMANCE: RED — directly antagonistic to LCP/FCP by design.
IMPLEMENTATION: N/A.
DECISION: **REJECT.**

**PATTERN: Type-only hero, no photography, authority via copy + scale**
SOURCE: Jackson Shaw.
WHY IT WORKS: Proves a developer/brokerage site can feel premium with zero
imagery — confidence comes from typographic hierarchy and declarative
copy.
PROPSOCH APPLICATION: Validates our approved no-stock-photography
direction; doesn't require a change since our Hero already pairs type with
an original illustration rather than a photo, which is a stronger
"visual storytelling" move than Jackson Shaw's type-only approach while
keeping the same zero-photography discipline.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **KEEP (validated, no change).**

**PATTERN: Methodology/process-as-narrative**
SOURCE: Caledon Build.
WHY IT WORKS: Turns a process explanation into a story with named,
specific stages rather than a generic feature list.
PROPSOCH APPLICATION: Already implemented — the 25-Day Journey section
does exactly this with real staged copy from the live site.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **KEEP (validated, no change).**

**PATTERN: Overlaid search/filter bar bridging hero → content**
SOURCE: Ronas IT ("Luxury Real Estate Agency Website Design").
WHY IT WORKS: A functional tool (property search) doubles as a visual
transition device between hero and body.
PROPSOCH APPLICATION: Not applicable — we have no property search/listing
functionality in scope for this landing page.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **REJECT (out of scope).**

**PATTERN: Generic filter-sidebar + card-grid marketplace dashboard**
SOURCE: OnPoint Studio, "Innovative Real Estate Marketplace Design."
WHY IT'S HERE: Negative reference — confirms what "generic SaaS" actually
looks like so we have a concrete thing to compare against and stay away
from.
PROPSOCH APPLICATION: None — explicitly the aesthetic to avoid.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **REJECT (anti-pattern, logged for calibration only).**

**PATTERN: Gold-accent + serif-display "luxury real estate" visual cliché**
SOURCE: HubSpot Marketplace category-wide observation (Vistara and others).
WHY IT'S HERE: Negative reference — the market-default way to signal
"luxury real estate," which is exactly why it no longer reads as
distinctive.
PROPSOCH APPLICATION: Confirms we should *not* chase this combination;
our orange + geometric-sans system (with a small serif-italic accent per
the pattern above, not a full serif system) stays more distinct.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **REJECT (anti-pattern, logged for calibration only).**

**PATTERN: Single CTA per viewport, no competing actions**
SOURCE: Cross-cutting observation — Hilton & Hyland, Jackson Shaw,
Charbonnel Towns all do this consistently.
WHY IT WORKS: Every additional competing CTA measurably dilutes the
primary conversion action; premium sites are disciplined about this.
PROPSOCH APPLICATION: Already our practice (one primary + at most one
secondary CTA per section). Worth writing down as an explicit rule in §17
(Accessibility/Design Rules) rather than leaving it implicit.
PERFORMANCE: N/A.
IMPLEMENTATION: N/A.
DECISION: **KEEP (validated, formalize as a rule).**

**PATTERN: Hero rotating word/phrase (CSS-only crossfade)**
SOURCE: Live Propsoch (carried forward from `INTERACTION_AUDIT.md`, not
re-litigated here).
DECISION: **KEEP** — already recommended P0 in the interaction audit;
this research pass found nothing that changes that recommendation, and
found supporting precedent (type-forward heroes generally, Jackson Shaw
especially) for leaning further into typography-driven hero motion.

**PATTERN: CSS-only trust-logo marquee**
SOURCE: Live Propsoch (carried forward from `INTERACTION_AUDIT.md`).
DECISION: **KEEP** — already recommended P1; nothing new here changes it.

**PATTERN: Brochure vs Reality drag interaction**
SOURCE: Live Propsoch (carried forward from `INTERACTION_AUDIT.md`,
still pending your decision).
DECISION: **CONSIDER, unresolved** — this research pass didn't turn up a
strong new argument either way. If anything, the Les Grandes-Serres
loading-animation failure is a reminder that added interaction surface
needs to be tested on slow/real devices before shipping, which applies
whether or not we build the drag slider. Not changing the recommendation
in the prior audit: still a decision that needs your explicit sign-off,
not an auto-implement.

**PATTERN: Video hero background**
SOURCE: Hilton & Hyland (property video hero).
WHY IT'S HERE: Named because it's common in this category and worth
explicitly ruling out.
PROPSOCH APPLICATION: None — video hero backgrounds are one of the more
reliable ways to tank mobile LCP/TBT, and we have no licensed video
content in the first place.
PERFORMANCE: RED.
IMPLEMENTATION: N/A.
DECISION: **REJECT.**

**PATTERN: 3D/VR property previews, WebGL scenes**
SOURCE: Named generically in the Mockplus article as a real-estate trend.
PROPSOCH APPLICATION: None — no such assets exist, and this is squarely
the "large animation library / WebGL" category the project brief already
told us to avoid without an extraordinary reason.
PERFORMANCE: RED.
IMPLEMENTATION: N/A.
DECISION: **REJECT.**

---

## 6. Propsoch Interaction Comparison

Cross-referencing this pass against the live Propsoch interactions already
catalogued in `INTERACTION_AUDIT.md`:

| Live Propsoch interaction | Reference-research verdict |
|---|---|
| Hero rotating word (CSS-only) | No reference site does this better or cheaper. Still **KEEP** (P0, from prior audit). |
| Trust-logo marquee (likely Embla) | Reference research found a strictly *cheaper* equivalent is achievable (pure CSS, no library) — reinforces the prior audit's P1 recommendation to reproduce the **effect**, not the **library**. |
| Brochure vs Reality drag slider | No reference site does anything more effective for this exact purpose — it remains the standout interaction of the whole research pass, original site included. Still a **decision point**, not an auto-recommendation, because of your explicit prior instruction against it. |
| FAQ tabs/accordion (Radix) | Out of scope (no FAQ section in this brief); no reference changed that. |
| Testimonial video carousel (lazy YouTube facade) | No reference site suggested a better *lightweight* version of real video testimonials; we still have no rights to real video, so this stays **N/A**. |
| Decorative flourishes (shine/glow/globe-spin) | Nothing in this research pass argues for reviving these — if anything, the strongest references (Hilton & Hyland, Jackson Shaw) are notable for having *none* of this kind of decoration. Reinforces **REJECT**. |

**Simpler-than-the-original alternatives found:** the CSS-only marquee (§5)
and the CSS-only numbered-section markers (§5) are both concrete instances
of "do the same job with less JavaScript than either Propsoch's own
implementation or the reference sites use."

---

## 7. Candidate Patterns (Consolidated List, 20)

1. Full-bleed restraint hero (one image/illustration, one headline, one CTA) — **KEEP**
2. Verified-specific numbers over adjectives — **KEEP**
3. Serif-italic accent words in headlines — **KEEP WITH MODIFICATION**
4. Oversized headline scale — **CONSIDER**
5. Numbered section wayfinding markers — **CONSIDER**
6. Temporal contrast narrative (Today/Tomorrow) — **KEEP** (already expressed via Journey section)
7. Block-wipe loading/reveal animation — **REJECT**
8. Type-only hero, no photography — **KEEP** (already our direction)
9. Methodology/process-as-narrative — **KEEP** (already our Journey section)
10. Overlaid search/filter bar — **REJECT** (out of scope)
11. Generic filter-sidebar + card-grid dashboard aesthetic — **REJECT** (anti-pattern)
12. Gold + serif-display "luxury" cliché — **REJECT** (anti-pattern)
13. Single CTA per viewport discipline — **KEEP**, formalize as a rule
14. Hero rotating word/phrase (CSS-only) — **KEEP** (P0, carried from interaction audit)
15. CSS-only trust-logo marquee — **KEEP** (P1, carried from interaction audit)
16. Brochure vs Reality drag interaction — **CONSIDER**, decision pending
17. Video hero background — **REJECT**
18. 3D/VR/WebGL property previews — **REJECT**
19. Heavy custom page-load sequence (any kind) — **REJECT** (generalized from #7)
20. Third-party analytics/marketing script stack — **REJECT** (carried from interaction audit §"Interactions We Should NOT Reproduce")

---

## 8. Performance Analysis (Every Serious Candidate)

Only patterns marked KEEP / KEEP WITH MODIFICATION / CONSIDER get a full
performance pass (REJECTed patterns are RED by definition and not
re-analyzed):

| Pattern | LCP | INP | CLS | TBT | Network | JS? | Class |
|---|---|---|---|---|---|---|---|
| Serif-italic accent words | None (H1 already sized by primary font; accent applied to secondary elements) | None | None if `font-display: swap` + matched fallback metrics | None | +1 font file (~5-15KB, self-hosted, subsetted) | No | **GREEN** |
| Oversized headline scale | None (CSS value only) | None | None (clamp, no layout jump) | None | None | No | **GREEN** |
| Numbered section markers | None | None | None | None | None (static text/CSS counter) | No | **GREEN** |
| Hero rotating word (P0, from audit) | None (opacity/transform only, not the LCP element itself if applied to subhead) | None | None | Negligible | None | No | **GREEN** |
| CSS-only marquee (P1, from audit) | None | None | None | Negligible (one continuous compositor-only transform) | None | No | **GREEN** |
| Brochure vs Reality drag | None at rest | Needs care — pointer handlers must stay off the main thread's critical path; fine if implemented with passive listeners and no synchronous layout reads per frame | None (`clip-path`, no layout) | Low if implemented correctly | Small (~1-2KB component code) | Yes, small isolated client component | **YELLOW** |

Everything in the GREEN row is implementable without moving off the current
223KB / 99-100 Lighthouse baseline in any measurable way. The one YELLOW
item (drag interaction) is not expensive by nature, but is the one place
where a careless implementation (synchronous state updates on every
`pointermove`, no `will-change`/passive listeners) could introduce INP
regressions — which is exactly why, independent of the "should we build it
at all" question, it would need its own before/after Lighthouse and INP
check if approved.

---

## 9. Accessibility Analysis

| Pattern | Keyboard | Focus | Screen reader | Reduced motion | Notes |
|---|---|---|---|---|---|
| Serif-italic accent words | N/A (not interactive) | N/A | Reads identically to normal text — purely visual styling on real text, not an image | N/A | Safe by construction |
| Oversized headline scale | N/A | N/A | No change to DOM/semantics | N/A | Safe by construction |
| Numbered section markers | N/A | N/A | Should be `aria-hidden="true"` if purely decorative (the section already has a real, announced `<h2>`); otherwise it risks screen readers hearing "01" before every heading with no context | N/A | Implementation detail to get right, not a blocker |
| Hero rotating word | N/A (no interactive control) | N/A | Must not be the *only* place a claim is stated — keep the full list of pain points somewhere static (e.g. in the illustration or nearby copy) so the message isn't lost if a user can't perceive the animation | Required — must respect `prefers-reduced-motion` (matches what the original site itself does) | Carried from `INTERACTION_AUDIT.md` |
| CSS-only marquee | N/A | N/A | Duplicate the logo list once for the seamless loop and `aria-hidden` the duplicate so it's announced once, not twice | Required — fall back to the current static wrapped row | Carried from `INTERACTION_AUDIT.md` |
| Brochure vs Reality drag | Must support arrow-key adjustment if built as a `role="slider"`; must not be drag-only | Visible focus ring required | Needs `aria-valuenow`/`aria-valuemin`/`aria-valuemax` if implemented as a real slider role, or a clear accessible alternative (e.g. a visible toggle) so the comparison isn't only perceivable by dragging | Required | The reason this is the one YELLOW/decision-gated item — doing it accessibly is a real, non-trivial requirement, not an afterthought |

General rule carried forward and reaffirmed: **no information may be
conveyed only through motion.** Every animated element's content must also
exist in a static, immediately-readable form.

---

## 10. Mobile Analysis

| Pattern | 320px | 375px | Notes |
|---|---|---|---|
| Serif-italic accent words | Fine — applied to 1-3 words, not a layout-affecting change | Fine | No risk |
| Oversized headline scale | Needs the existing `clamp()` lower bound re-checked at 320px so a larger upper bound doesn't imply a larger lower bound too | Fine | Verify, don't assume — same rigor as the original Hero build |
| Numbered section markers | Risk of clutter next to already-tight heading text at 320px; may need to move below/beside rather than inline | Fine | Verify visually before committing (already flagged as CONSIDER, not KEEP, for this reason) |
| Hero rotating word | Must not increase hero height enough to push the CTA below the fold (same constraint already enforced in the current Hero build) | Fine | Test the tallest word in the rotation, not just the first one |
| CSS-only marquee | Marquee row must not force horizontal page overflow; duplicate-content width math needs to be verified at the narrowest breakpoint | Fine | Standard marquee implementation risk, easy to get right |
| Brochure vs Reality drag | Drag/touch behavior is fundamentally different on mobile (no hover affordance, touch-drag competes with page scroll) — would need a distinct mobile interaction (e.g. tap-to-toggle instead of drag) rather than a shrunk version of the desktop drag | N/A until decided | Another reason this stays a decision point, not an automatic yes |

No pattern in this list requires "compress the desktop layout" as its
mobile strategy — each either degrades gracefully to a static equivalent
(marquee → static row, rotating word → first word only) or needs a
genuinely different mobile-native interaction (drag → tap), consistent with
the "mobile is a deliberate composition" rule already established for this
project.

---

## 11. Keep / Modify / Consider / Reject Matrix

| Pattern | Source | URL | UX value | Visual impact | Brand fit | Mobile quality | A11y | LCP | INP | CLS | TBT | Network | JS complexity | Impl. complexity | Cheaper alt. | Decision |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Restraint hero (1 image/1 headline/1 CTA) | Hilton & Hyland | hiltonhyland.com | High | High | High | High | High | None | None | None | None | None | None | Already done | — | **KEEP** |
| Verified-specific numbers | Hilton & Hyland, Charbonnel | hiltonhyland.com, charbonneltowns.com | High | Med | High | High | High | None | None | None | None | None | None | Already done | — | **KEEP** |
| Serif-italic accent words | Ronas IT (Dribbble) | dribbble.com/shots/27200931 | Med | High | High | High | High | None | None | None | None | Low | None | Low | — | **KEEP W/ MOD** |
| Oversized headline scale | Ronas IT (Dribbble) | dribbble.com/shots/26850015 | Med | High | Med | Med | High | None | None | None | None | None | None | Trivial | — | **CONSIDER** |
| Numbered section markers | Copernico | coperni.co/en | Low | Med | Med | Med (needs mobile check) | Med (needs `aria-hidden`) | None | None | None | None | None | None | Low | — | **CONSIDER** |
| Temporal contrast narrative | Les Grandes-Serres | lesgrandesserresdepantin.com | High | Med | High | High | High | — | — | — | — | — | — | Already done | — | **KEEP** |
| Block-wipe load animation | Les Grandes-Serres | lesgrandesserresdepantin.com | Low | High (for them) | Low (for us) | Low | Low | RED | — | — | RED | Low | JS | Med-High | None needed | **REJECT** |
| Type-only hero | Jackson Shaw | jacksonshaw.com | High | Med-High | High | High | High | — | — | — | — | — | — | Already done | — | **KEEP** |
| Methodology-as-narrative | Caledon Build | caledonbuild.com | High | Med | High | High | High | — | — | — | — | — | — | Already done | — | **KEEP** |
| Overlaid search bar | Ronas IT (Dribbble) | dribbble.com/shots/27200931 | N/A | N/A | N/A | N/A | N/A | — | — | — | — | — | — | — | — | **REJECT** (out of scope) |
| Generic dashboard aesthetic | OnPoint Studio (Dribbble) | dribbble.com/shots/25412111 | Low | Low (for us) | Low | Low | Med | — | — | — | — | — | — | — | — | **REJECT** (anti-pattern) |
| Gold+serif luxury cliché | HubSpot Marketplace | ecosystem.hubspot.com/marketplace/website/real-estate | Low | Low (for us) | Low | — | — | — | — | — | — | — | — | — | — | **REJECT** (anti-pattern) |
| Single-CTA-per-viewport discipline | Hilton & Hyland, Jackson Shaw, Charbonnel | (as above) | High | Med | High | High | High | — | — | — | — | — | — | Already done | — | **KEEP**, formalize as rule |
| Hero rotating word | Live Propsoch | propsoch.com | High | Med-High | High | High | High (w/ reduced-motion) | None | None | None | Negligible | None | None (CSS) | Low | — | **KEEP** (P0, from audit) |
| CSS-only marquee | Live Propsoch (effect), reimplemented cheaper | propsoch.com | Med | Med | High | High | High | None | None | None | Negligible | None | None (CSS) | Low | Embla → CSS | **KEEP** (P1, from audit) |
| Brochure vs Reality drag | Live Propsoch | propsoch.com | Very High | High | High | Needs mobile-specific redesign | Needs real work (slider role + keyboard) | None | Yellow — needs care | None | Low if done well | Low | Small client component | Med | Keep current CSS-only version | **CONSIDER**, decision pending |
| Video hero background | Hilton & Hyland | hiltonhyland.com | Med | High | Med | Low | Med | RED | — | — | RED | RED | — | — | Static illustration | **REJECT** |
| 3D/VR/WebGL previews | Mockplus article (general) | mockplus.com/blog/post/real-estate-web-design | Low (no assets exist) | High (in theory) | Low | Low | Low | RED | RED | — | RED | RED | Large lib | High | N/A | **REJECT** |
| Heavy load sequences (general) | Les Grandes-Serres | lesgrandesserresdepantin.com | Low | High (for them) | Low | Low | Low | RED | — | — | RED | Med | JS | Med-High | None | **REJECT** |
| 3rd-party analytics stack | Live Propsoch | propsoch.com | None (for a portfolio piece) | None | None | None | None | RED | RED | — | RED | RED | Multiple scripts | — | Omit entirely | **REJECT** (carried from audit) |

---

## 12. Three Hero Directions

**Direction A — "Typographic Authority" (Jackson Shaw-inspired)**
Pure type-led hero: push the display headline scale further, drop the
brochure/reality illustration entirely, single ghost-outline CTA, minimal
nav. Pros: theoretically the fastest possible LCP (text only, nothing
else to paint), maximally restrained/editorial. Cons: loses the one
element that visually explains the product in the first viewport (our
brochure/reality illustration is doing real "show don't tell" work); would
need the copy alone to carry 100% of the explanatory load.

**Direction B — "Illustrated Evidence, Refined" (current direction +
targeted upgrades) — Recommended**
Keep the existing brochure/reality card illustration (it already does the
Jackson-Shaw-style "authority without stock photography" job, plus adds
the visual storytelling a pure-type hero lacks). Layer in, specifically:
the CSS-only rotating word/phrase (from the interaction audit) on the
subhead or a short accent line; a serif-italic treatment on one word in
the headline (e.g. "see the *reality*"); a small nudge to the display type
scale. Every addition here is GREEN-classified in §8.

**Direction C — "Editorial Split / Temporal" (Les Grandes-Serres-inspired)**
Split the hero itself into two contrasting typographic zones —
"What they show you" / "What we show you" — previewing the whole page's
narrative arc before the user even reaches the dedicated Brochure vs
Reality section. Pros: maximally on-message, immediately legible thesis.
Cons: real risk of redundancy with the section directly below it; a
two-zone hero has less room for the CTA and reassurance line, especially
at 320-375px, without feeling cramped; would require re-testing the "what
is it / why care / what next" first-viewport requirement from scratch.

**Recommendation: Direction B.** It's the only one that's additive to
already-approved, already-verified work rather than a rebuild, every
component of it is GREEN in the performance table, and it's consistent
with both Jackson Shaw's "type carries authority" lesson and Ronas IT's
two lightweight typographic devices — without touching the parts of the
current Hero (LCP behavior, mobile composition, accessibility) that are
already tested and working.

---

## 13. Recommended Visual Language

- **Color:** keep the existing warm-paper background + single brand-orange
  accent system. Explicitly do *not* drift toward the gold+serif "luxury
  real estate" market default identified in §4/§11 — staying with orange is
  what keeps us visually distinct from every HubSpot-marketplace-style
  competitor.
- **Type — workhorse:** keep Plus Jakarta Sans for all body copy and UI
  chrome (unchanged).
- **Type — accent:** add one self-hosted serif/italic display face, used
  sparingly (a handful of words total across the page, never body text),
  for the "considered, premium" signal identified in the Ronas IT
  reference. Candidate: a contemporary editorial serif with a genuine
  italic (e.g. Fraunces or Instrument Serif via `next/font/google`) —
  exact choice to be confirmed visually during implementation, not
  pre-committed here.
- **Imagery:** unchanged — original CSS/SVG illustration only, no stock or
  licensed photography, reaffirmed by the Jackson Shaw reference as a
  legitimate premium direction rather than a compromise.
- **Decoration:** explicitly *not* adopting shine/glow/gradient flourishes,
  video backgrounds, or 3D/WebGL — reaffirmed by both the interaction audit
  and this research pass as low value relative to cost for this project.

---

## 14. Section by Section Design

**1. Navigation**
PURPOSE: Orientation + a low-friction path to the primary CTA.
VISUAL DIRECTION: Unchanged — sticky, minimal, brand wordmark left,
links center/right, CTA right.
INTERACTION: Unchanged (mobile disclosure menu, already keyboard-tested).
MOTION: None new.
MOBILE BEHAVIOR: Unchanged, already verified.
PERFORMANCE STRATEGY: Unchanged (still the only client component).
ACCESSIBILITY STRATEGY: Unchanged (already 0 axe violations, keyboard-
tested open/close).

**2. Hero**
PURPOSE: Answer "what is Propsoch / why care / what next" in one
viewport, on both breakpoints.
VISUAL DIRECTION: Direction B (§12) — existing illustration retained,
serif-italic accent on one headline word, display scale nudged.
INTERACTION: None new beyond the rotating word.
MOTION: Hero rotating word/phrase (P0, CSS-only crossfade, `prefers-
reduced-motion` aware).
MOBILE BEHAVIOR: Unchanged layout order; re-verify the rotating word's
tallest state doesn't push the CTA below the fold at 320-390px.
PERFORMANCE STRATEGY: Serif font self-hosted/subsetted, applied only to
non-LCP text if possible; rotating word restricted to `opacity`/`transform`.
ACCESSIBILITY STRATEGY: Full pain-point list must exist statically nearby
(not only inside the animated cycle); reduced-motion fallback shows first
phrase only.

**3. Trust**
PURPOSE: Ambient, low-effort social proof.
VISUAL DIRECTION: Unchanged — stat row + logo wordmarks.
INTERACTION: None (marquee is ambient, not user-triggered).
MOTION: CSS-only trust-logo marquee (P1, from audit), pausable on
hover/focus, disabled under reduced-motion.
MOBILE BEHAVIOR: Marquee width/loop math re-verified at 320px; must not
cause horizontal page overflow.
PERFORMANCE STRATEGY: Duplicate list once, single continuous `transform`,
no JS/library.
ACCESSIBILITY STRATEGY: Duplicated copy `aria-hidden`; static wrapped-row
fallback under reduced-motion.

**4. Brochure vs Reality**
PURPOSE: The literal "claims vs. evidence" demonstration — the
narrative's core moment.
VISUAL DIRECTION: Unchanged base layout (side-by-side desktop / stacked
mobile, distinct panel treatments).
INTERACTION: **Decision pending** — either keep the current CSS-only
static comparison, or (only with explicit sign-off) build the accessible
drag/toggle version described in §5/§8/§9.
MOTION: None beyond whatever the interaction decision implies.
MOBILE BEHAVIOR: If the drag interaction is approved, it must ship as a
distinct tap/toggle-based mobile interaction, not a shrunk desktop drag.
PERFORMANCE STRATEGY: If approved, `clip-path` + small isolated client
component only, no library.
ACCESSIBILITY STRATEGY: If approved, real `role="slider"` semantics with
keyboard support, or an equally accessible non-drag alternative exposed
alongside it — never drag-only.

**5. 25-Day Journey**
PURPOSE: Make the process concrete and credible via specific staged
copy.
VISUAL DIRECTION: Unchanged — already applies the "methodology as
narrative" pattern validated in §5/§11.
INTERACTION: None new.
MOTION: Optionally, the small numbered-section marker treatment from §5,
if it reads well at mobile widths.
MOBILE BEHAVIOR: Unchanged, already verified vertical timeline.
PERFORMANCE STRATEGY: Unchanged.
ACCESSIBILITY STRATEGY: Unchanged.

**6. Testimonial**
PURPOSE: Real, verified social proof.
VISUAL DIRECTION: Unchanged — single verified quote, no video (no rights
to real video).
INTERACTION: None.
MOTION: None.
MOBILE BEHAVIOR: Unchanged.
PERFORMANCE STRATEGY: Unchanged — this is already the cheapest possible
version of "testimonial section."
ACCESSIBILITY STRATEGY: Unchanged.

**7. Final CTA**
PURPOSE: Close the case, single clear conversion action.
VISUAL DIRECTION: Unchanged — inverted dark section, matches the
"single-CTA-per-viewport" rule (§5/§11) already in place.
INTERACTION: None new.
MOTION: None.
MOBILE BEHAVIOR: Unchanged.
PERFORMANCE STRATEGY: Unchanged.
ACCESSIBILITY STRATEGY: Unchanged (contrast already verified via
axe-core against this exact dark background).

**8. Footer**
PURPOSE: Legal/contact/social close-out.
VISUAL DIRECTION: Unchanged.
INTERACTION: None.
MOTION: None.
MOBILE BEHAVIOR: Unchanged.
PERFORMANCE STRATEGY: Unchanged.
ACCESSIBILITY STRATEGY: Unchanged.

**New section?** No new section is strongly justified by this research.
One candidate came up in the reference material worth naming explicitly
rather than silently dropping: an **"About the advisors" / credentials
section**, echoed by Hilton & Hyland's leadership pages and Jackson Shaw's
people-first framing. It's a legitimate pattern for a real guided-buying
product, but it's out of scope for a 3-section brief (Hero + 2 sections)
and we have no real advisor bios/photos to populate it honestly without
inventing content, which the project's content rules already prohibit.
**Considered, not recommended, for this scope.**

---

## 15. Motion System

Extends, does not replace, the motion system already defined in
`INTERACTION_AUDIT.md` §"Proposed Motion System":

| Token | Value | Used for |
|---|---|---|
| `--motion-fast` | 150ms | hover/focus micro-states (unchanged) |
| `--motion-base` | 220ms | UI state changes (unchanged) |
| `--motion-cycle` | 6s | hero word-cycle (unchanged, from audit) |
| `--motion-marquee` | 32s | trust-logo marquee (unchanged, from audit) |
| Easing (entrances) | `ease-out` | anything appearing/expanding |
| Easing (continuous) | `linear` | marquee only |
| Properties allowed | `opacity`, `transform`, `clip-path` (the last only for the decision-gated drag interaction) | compositor-only |
| New: accent typography | No animation — the serif-italic treatment is a static style, not a motion pattern | N/A |
| Universal guard | `prefers-reduced-motion: reduce` on every animated rule, no exceptions | unchanged |

No new animation primitives are being introduced by this research pass —
everything recommended either reuses the existing system or is explicitly
static (typography, numbering).

---

## 16. Performance Budget

Unchanged as a target, restated as a hard budget rather than an aspiration:

- **Mobile Lighthouse:** Performance ≥ 95 (currently 99), Accessibility
  100, Best Practices 100, SEO 100.
- **Desktop Lighthouse:** 100/100/100/100 (currently achieved).
- **LCP:** stay at or below the current 2.3s mobile / 0.5s desktop —
  no recommended pattern in this document touches the LCP element.
- **CLS:** 0, unchanged — no recommended pattern introduces layout-
  affecting properties.
- **Total transfer:** current ~223KB baseline may grow by roughly the
  size of one subsetted italic font file (est. +5-15KB) if the
  serif-accent pattern is adopted — everything else recommended is CSS/
  markup-only with no new network requests.
- **New client-side JS:** zero, unless the Brochure-vs-Reality drag
  interaction is explicitly approved, in which case it should stay under
  ~2KB of component code with no new dependency.

Any implementation step that would break this budget gets re-scoped or
dropped before it ships — the same discipline already applied in
Phases 7-10 of the original build.

---

## 17. Accessibility Rules

Consolidated, including the new rule surfaced by this research pass:

1. Every animation respects `prefers-reduced-motion: reduce` — no
   exceptions.
2. No information is conveyed only through motion — every animated
   element's content also exists in a static, immediately-readable form.
3. Purely decorative additions (numbered section markers, accent
   typography) are either semantically inert (styled real text) or
   explicitly `aria-hidden`.
4. **New:** any interactive comparison/slider pattern must expose a real
   `role="slider"` with keyboard support, or an equally accessible
   non-drag alternative — drag-only interaction is not acceptable
   (directly informs the Brochure-vs-Reality decision).
5. **New:** one primary CTA per viewport/section — consistent with the
   single-CTA-discipline pattern validated in §5/§11, which is as much an
   accessibility/clarity rule (reduces choice overload, keeps tab order
   predictable) as a visual one.
6. Contrast is verified with a calculator and `axe-core`, never assumed —
   unchanged standing rule from the original build.

---

## 18. Implementation Architecture

No structural change to the existing lean architecture
(`app/`, `components/`, `lib/content.ts`). Specifically:

- The serif-accent font is a `next/font/google` import in `app/layout.tsx`
  or scoped locally to the two components that use it — no new file
  needed if scoped narrowly.
- Numbered section markers and the display-scale nudge are CSS-only
  changes inside existing component files and `app/globals.css`.
- The hero rotating word and CSS marquee (already specced in
  `INTERACTION_AUDIT.md`) remain pure CSS/markup changes to `Hero.tsx`
  and `TrustBar.tsx` respectively — no new component files.
- The only scenario that would add a new client component is the
  Brochure-vs-Reality drag interaction, and only if explicitly approved —
  it would live inside `components/BrochureReality.tsx` as a small
  `"use client"` island, not a new top-level component, keeping the
  `NavBar`-is-the-only-client-component discipline intact except for that
  one explicitly-approved exception.
- **Zero new dependencies** in every scenario described in this document.

---

## 19. Implementation Phases

Pending review — nothing below has been started:

1. **Phase A — Typography system:** add the serif-italic accent font,
   apply to 1-3 words total (Hero headline + Brochure-vs-Reality heading).
   Re-run `axe-core` + Lighthouse after.
2. **Phase B — Hero word-cycle:** implement the P0 pattern from
   `INTERACTION_AUDIT.md`. Re-verify LCP/CLS unaffected, reduced-motion
   fallback works, full pain-point list still exists statically.
3. **Phase C — Trust-logo marquee:** implement the P1 pattern from
   `INTERACTION_AUDIT.md`, CSS-only. Re-verify no horizontal overflow at
   320px, reduced-motion fallback, `aria-hidden` on the duplicate.
4. **Phase D (optional) — Numbered section markers + display-scale
   nudge:** small visual polish, verified at 320-1440px before committing.
5. **Phase E (decision-gated) — Brochure vs Reality interaction:** only
   proceeds on your explicit go-ahead; includes the accessible
   slider/keyboard implementation, mobile-specific tap/toggle behavior,
   and its own before/after Lighthouse + INP check.
6. **Phase F — Full re-verification:** the same rigor as the original
   build's Phases 7-10 — 320-1440px responsive pass, `axe-core`
   zero-violations, fresh production-build Lighthouse run, compared
   against the current 99/100/100/100 baseline.

---

## 20. Final Proposed Experience

A page that keeps everything already validated in the current build —
lean architecture, one client component, zero third-party scripts,
original CSS/SVG illustration instead of photography, real verified copy
throughout — and layers on exactly three cheap, GREEN-classified,
narrative-reinforcing upgrades: a CSS-only rotating hero phrase, a
CSS-only ambient trust-logo marquee, and a restrained serif-italic
typographic accent on the words that carry the brochure-vs-reality thesis.
Everything else surfaced by this research pass — block-wipe loaders, video
heroes, WebGL, generic dashboard chrome, the gold-and-serif luxury
cliché — is explicitly rejected, with the reasoning recorded above rather
than just omitted.

The one open question this document deliberately does not resolve is the
Brochure vs Reality drag interaction: the strongest single interaction
found anywhere in this research (original site included), technically
cheap to build without a library, but a direct reversal of your earlier
explicit instruction. It stays a decision for you, not a default.

No code has been written or dependencies installed. This document and
`docs/INTERACTION_AUDIT.md` together are the full decision record for
whatever you approve next.
