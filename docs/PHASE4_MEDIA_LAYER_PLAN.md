# Phase 4 — Media Layer: Asset Inventory & Implementation Plan

Companion to `PHASE3_VISUAL_REDESIGN_PLAN.md`. Phase 3 built the editorial
system (typography, grid, motion discipline, the tick-mark motif). Phase 4
adds a real media layer on top of it — it does not replace or re-architect
anything Phase 3 produced.

## 1. Asset inventory (from propsoch.com)

Source: `https://www.propsoch.com/`, CDN `d1zk2x7mtoyb2b.cloudfront.net` /
`propsoch-bucket.s3.ap-south-1.amazonaws.com` — both first-party Propsoch
hosting, checked 2026-09-23.

| Asset | Source | Dimensions | Verdict |
|---|---|---|---|
| `pom-master-plan-before.png` | product-page — glossy 3D rendered amenity masterplan (T1/T2/T3 towers, numbered amenities, roads) | 989×682 | **Use** — Comparison, brochure side |
| `pom-master-plan-after.png` | product-page — same site's real annotated technical plan (red callouts: *Transformer yard, High Tension line, Unsanction area, Water treatment plant, Nala/Drain*) | 987×692 | **Use** — Comparison, reality side |
| `amazon-logo.png`, `google-logo.png`, `microsoft-logo.png`, `Deloitte-Logo.png`, `flipkart-logo.webp`, `atlassian-logo.webp`, `nvidia-logo.png`, `PhonePe-Logo.webp`, `navi-logo.png` | `/websiteAssets/logos/` — full-color transparent logos, same 9 companies already in `trust.companies` | vary (e.g. Amazon 159×48) | **Use** — Trust hover state |
| `hero_new_bg.png` + `spectacles.png` | "hypnotic spiral glasses" gag photo/vector — a stock-style photo of a person's face with a joke graphic over the eyes | 880×729 / 1054×516 | **Reject** — tonally wrong (meme/gag register clashes with the editorial-evidence direction) and reuse rights on a stock face photo are unclear. Per your own fallback rule, using an original CSS/SVG treatment instead. |
| YouTube testimonial thumbnails (Bharat Singh & Neerja Ahuja, Dr. Ankita Srivastava, D.L. Narasimham) | product page testimonial carousel | — | **Reject for our testimonial.** None of these three is Roshik Shenoy (Deloitte) — the person our `content.ts` already quotes. Using one of their videos under his name would misattribute a testimonial. No video exists for the person we quote, so per your own fallback rule I'm giving the quote a stronger *editorial* treatment instead of forcing video. |
| `company_banner_1/2` (press-mention strip: TOI, CNBC, ANI, ET, Outlook Business...) | homepage | — | **Skip** — different content category (press mentions, not the "trusted by buyers from" employer trust bar), pre-composited raster card grid not reusable as individual marks, and not something `content.ts` currently claims. Out of scope, not a gap in the current sections. |

**Licensing assessment (explicit, per your ask):** the assets were
identified on Propsoch's first-party infrastructure and are currently used
by Propsoch in the same product context (employer trust bar; product-feature
illustration). Asset provenance is therefore clear, but licensing/
redistribution rights were not independently verified. The two rejected
assets are rejected specifically because reuse is unclear or would
misattribute a real person's testimonial, not because of effort.

## 2. Reference-site principles (translated, not cloned)

From Les Grandes-Serres de Pantin / Coperni, and from your brief: large
uncropped-feeling imagery, asymmetric placement (not centered "hero cards"),
image directly interacting with type (bleeding under/behind text, not boxed
separately), and restraint — one real signature image moment, not five.
Applied to Propsoch: the **Comparison** section is the one place we have a
genuinely strong, on-brand, real asset, so it becomes the single biggest
media moment on the page. Everywhere else gets a smaller, purpose-built
visual cue rather than a second competing photo.

## 3. Per-section plan

### Hero
No legitimate photographic asset exists (see rejection above), but the SVG
replacement must not read as a generic decorative illustration — it's a
supporting visual artifact, not the page's primary media moment (that's
Comparison), and it needs to feel like a Propsoch research artifact, not
clip art. Composition: an unlabeled architectural floor/site-plan line
drawing (building outline only — no specific property, so no facts are
fabricated), layered with the existing tick-mark measurement motif,
restrained metadata (small caption-style text, e.g. coordinates-style
notation or a scale reference — no invented addresses/numbers presented as
fact), a location/orientation cue (north indicator), rendered in the
brand-dark/orange line language already established in Hero's verification
line. Controlled layering (plan line-work behind, measurement ticks and
metadata in front, at different opacities) gives it depth without becoming
busy. Subtle motion only if it earns its place (e.g. a slow, low-amplitude
line-draw or metadata fade-in on load, respecting `prefers-reduced-motion`)
— static is an acceptable outcome if motion doesn't add anything. Placed
asymmetrically on the right at `lg:`, filling the current empty space below
the headline without becoming the section's dominant object. Zero images,
zero new dependencies, zero LCP risk — the H1 text stays the LCP element
exactly as today (152ms).

### Trust
Swap plain-text company names for real logos via `next/image`, `grayscale
opacity-60` at rest, `hover:grayscale-0 hover:opacity-100 hover:scale-105`
on the individual item only. **The marquee's `translateX` must keep running
while an item is hovered — hover/focus never pauses the parent animation**,
only the hovered logo's own grayscale/opacity/scale changes (parent and
child transforms compose independently on their own boxes, so this doesn't
require pausing anything). `:focus-visible` gets the same treatment as
`:hover` for keyboard users, and mouse/focus leaving smoothly restores the
muted state via a CSS transition. Reduced motion: marquee stops and becomes
a static accessible row (existing behavior, unchanged). All Tailwind
utilities — no new CSS needed.

### Brochure vs Reality (Comparison) — highest priority
- Brochure panel: `pom-master-plan-before.png`.
- Reality panel: `pom-master-plan-after.png` (its callouts — *Transformer
  yard, High Tension line, Unsanction area, Water treatment plant,
  Nala/Drain* — are Propsoch's own existing labels, not new fabrications).
- Existing drag/keyboard/touch interaction is preserved exactly as-is
  (pointer, touch, keyboard arrows/Home/End, accessible role/value, 44px
  target — no slider library, unchanged).
- The oversized "01" shrinks to an inline marker next to the "Brochure vs
  Reality" kicker (matching Journey's "02" / CTA's "03" treatment), so the
  imagery — not the numeral — carries the section's visual weight.
- No fabricated north arrow or labels beyond what's already printed in the
  source images.

**Success criterion (the most important acceptance test of this phase):**
today's screenshot shows "01" / heading / text / a large empty hatched
region. After this change, dragging the handle must visibly reveal real
Propsoch master-plan imagery on both sides at every point in the drag —
never an empty or hatched area that reads as missing content. The
interaction must communicate BROCHURE → REALITY, not IMAGE A → IMAGE B.

### Journey
Stays static (no IntersectionObserver, per your explicit constraint). Adds
one static SVG route line connecting the five stage ticks — a literal
"journey" line, reusing the existing tick-mark visual language. No new
client JS, no new dependency.

### Testimonial
No video exists for the person actually quoted. Strengthens the section
instead with the real Deloitte wordmark (small, monochrome, next to the
attribution) and heavier editorial type/spacing — real asset, no
misattribution, no autoplay-video complexity.

### Final CTA
No media gap identified here in the brief or in my own review — leaving
as-is, intentionally media-light so it reads as a resolved close rather
than another visual moment competing with Comparison.

## 3a. Media hierarchy (explicit ranking)

Hero → sophisticated evidence-board visual (supporting, not dominant).
Trust → real company logos. **Brochure vs Reality → the primary real
Propsoch media moment, the page's single biggest visual event.** Journey →
restrained route-line visual. Testimonial → real Deloitte wordmark +
editorial quote. Final CTA → intentionally media-light. Richer, not
noisier — one real photographic signature moment, everything else is a
smaller, purpose-built cue.

## 3b. Section-to-section continuity

The page should read as one continuous narrative — Hero evidence → trust →
real-world comparison → journey/process → testimonial proof → CTA — not six
independently-designed blocks. Continuity comes from restraint and repeated
vocabulary, not new sections or heavier transition effects: the tick-mark/
measurement-line motif recurs in Hero, Comparison's "01" marker, and
Journey's route line; full-bleed edge treatment is reserved for Comparison
alone so it reads as the one true break from the grid; spacing rhythm and
type scale stay governed by the existing Phase 3 tokens. No scroll-hijacking,
no heavy per-section entrance animation.

## 4. Files touched

`components/Hero.tsx` (new SVG evidence diagram), `components/TrustBar.tsx`
+ `components/patterns/Marquee.tsx` (logo rendering + hover state),
`components/BrochureReality.tsx` (shrink "01"), `components/BrochureRealityCompare.tsx`
(real images in place of flat panels), `components/JourneyTimeline.tsx`
(SVG route line), `components/Testimonial.tsx` (Deloitte mark). New
binary assets under `public/images/`. No changes to `lib/content.ts` facts,
no new npm dependencies (`next/image` is already part of Next.js).

## 5. Performance plan

- Only two real photographic-weight assets (the master-plan pair, ~1–1.2MB
  each source) — everything else is small logo art.
- **Optimization pipeline (committed asset, not just runtime optimization):**
  original PNG → crop/resize if appropriate → convert to WebP/AVIF where it
  wins → compress → commit the already-optimized asset → `next/image` on
  top of that for responsive `sizes`/lazy-loading. The file committed to
  the repo must itself be substantially smaller than the ~1MB source, not
  just optimized on the fly by `next/image` at request time.
- Explicit `width`/`height` on every image (no CLS), `loading="lazy"` (both
  are below the fold — Hero's LCP stays the H1), `sizes` matched to actual
  rendered width so we never ship a desktop-sized image to a phone.
- Source resolution (~990×690) is treated as the real ceiling — these are
  document-scan-weight assets (site plans), not high-resolution photography.
  The Comparison composition is designed around that actual dimension
  rather than stretched full-bleed edge-to-edge, so the image never
  visibly softens/blurs at large viewports.
- Target, per your gate: Mobile Performance ≥95, Desktop ≥95, CLS 0. If
  either drops below 95, **stop and investigate root cause (dimensions,
  format, loading strategy, `sizes`, request timing) before continuing —
  not by removing the visual work.** Will report the before/after numbers
  honestly either way.

## 6. Sequence

Small commits, reordered so the highest-priority visual problem is fixed
first: (1) asset preparation and optimization; (2) Brochure vs Reality
(highest priority — this is the section the current screenshots show as
broken); (3) Trust logos and hover behavior; (4) Hero evidence visual;
(5) Journey route line; (6) Testimonial Deloitte mark; (7) whole-page visual
review; (8) accessibility; (9) performance; (10) documentation.

## 7. Final visual test

Before calling Phase 4 complete: compare the new page against the current
baseline screenshots and ask, "did we solve the visual emptiness, or did we
just add decorative graphics?" The bar is real visual evidence where there
was previously empty space — a genuine Hero anchor, real trust logos,
meaningful Brochure vs Reality imagery, a visual Journey cue, stronger
testimonial proof — while the page still feels restrained, editorial, and
specifically Propsoch's, not generically "media-rich."
