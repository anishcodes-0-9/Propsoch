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
| `amazon-logo.png`, `google-logo.png`, `microsoft-logo.png`, `jupiter-logo.png`, `Deloitte-Logo.png`, `flipkart-logo.webp`, `atlassian-logo.webp`, `PhonePe-Logo.webp`, `navi-logo.png` | `/websiteAssets/logos/` — full-color transparent logos | vary (e.g. Amazon 159×48) | **Use** — Trust hover state. **Correction (2026-09-23):** the live site's own trust carousel (verified via its rendered markup, `alt` attrs matched to `src`) actually names 10 companies in this order — Amazon, Google, Microsoft, Jupiter, Deloitte, Flipkart, Atlassian, xto10x, PhonePe, Navi. `nvidia-logo.png` also exists on the CDN but is not used under any slide labeled "Nvidia" — it's mis-served as the image for the "xto10x" slide (a bug on Propsoch's own site). We do not reuse that mismatched asset; xto10x has no legitimate logo source, so it renders as a plain text wordmark instead. `trust.companies` and `Marquee.tsx`'s `LOGOS` map were corrected to match: Jupiter added (real logo), NVIDIA removed (not a genuine trust-bar entry). |
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

## 8. Phase 5 — Hero and Journey, revisited (2026-09-23)

### 8.1 First attempt (superseded, kept here for the record)

A design-direction review first led to real photographic/technical
assets: a full site-wide crawl of propsoch.com beyond the homepage
(property pages, About Us, Blog, Services/Resources) inventoried
first-party imagery, and the Hero was rebuilt around a real Propsoch
team photo (`propsoch-team-photo.png`, About Us) full-bleed behind the
headline, with the Journey rebuilt around five real per-project
master-plan diagrams (Assetz Atmos & Aura, Brigade Parkside North,
Embassy Lake Terraces, Sobha Insignia, and a project listed under the
"lodha-mirabelle" slug but displaying "The Icon Bangalore" branding — a
mismatch on propsoch.com's own page, not introduced here), swapped per
stage via `IntersectionObserver`. The corresponding "views-2.webp"
photographic image for each of the five journey projects was checked
first and rejected before landing on the master-plan versions — those
are glossy CGI marketing renders, three of five carrying a baked-in
"propsoch.com — Homebuying, Reimagined!" watermark, which would have
directly contradicted this project's own Comparison-section message
("Staged model flats and CGI renders" is a listed brochure complaint).

**This was superseded on a second review** (§8.2) for two reasons found
on inspection, not assumed in advance:

1. The team photo answers "does Propsoch have employees," not "why
   should you trust this research" — it doesn't communicate property
   investigation, evidence, or verification, the actual subject the
   Hero needs to be about.
2. None of the five Journey master-plan images corresponded
   narratively to the stage they sat behind (plan-4 wasn't "the
   property you negotiate on" in Week 3) — interchangeable decoration,
   not communication.

Both assets are also still subject to the rights note below, which
applied here too and was a secondary reason to move away from them.

### 8.2 Course correction — self-authored evidence system

Both sections now use one shared, fully self-authored visual language
instead of sourced imagery — zero rights dependency, and each element
maps to something the copy already says rather than decorating around
it.

**Hero — `EvidenceDiagram` (inline SVG, `components/Hero.tsx`)**
A scaled-up version of the original Phase 4 `EvidenceBoard` motif: a
denser cluster of five annotated site-plan footprints, measurement
ticks, a north indicator, and the same three evidence facts as
before (80-point report, on-site verification, RERA registration) as
paper-backed chips over the diagram. Full-bleed band, `bg-paper-raised`
+ grid pattern in place of a photo — the Comparison section's real
annotated-plan imagery is the actual "evidence" visual on the page;
this is the same idea in the same visual language, not a competing one.

**Journey — `JourneyDiagram` (inline SVG, `components/JourneyTimeline.tsx`)**
One shared diagram per the desktop sticky viewport (and a static
per-stage render on mobile) that gets **more annotated as the stage
index increases** — each added layer maps directly to real copy already
in `journey.stages`, not a new claim:

| Stage | Layer added | Maps to |
|---|---|---|
| 1 — Today | none (bare footprint) | nothing surveyed yet |
| 2 — Week 1 | measurement ticks, "SHORTLIST DRAFTED" | "curates 10–12 verified projects" |
| 3 — Week 2 | site-visit marker, "SITE VISIT LOGGED" | "you see and analyse them in person" |
| 4 — Week 3 | flagged callout, "PEACE OF MIND REPORT" | "Get your Peace of Mind report" |
| 5 — Last week | closure seal, "DEAL CLOSED" | "help you seal the best deal" |

The image itself now tells the story (evidence accumulates as the
process progresses) instead of just illustrating it.

**Rights note, resolved rather than accepted-as-risk:** propsoch.com's
own Terms of Use (`/meta/terms`, §7) prohibit reproducing site content
without written consent. §8.1's assets were used anyway as an accepted
risk in an earlier pass; this revision removes that dependency entirely
for Hero and Journey rather than continuing to carry it — no propsoch.com
asset is used in either section as of this revision. The Comparison
section's two images (`comparison-brochure.webp`/`comparison-reality.webp`)
and the trust-bar logos are unchanged and still carry the same open
question; that's a separate decision, not resolved by this revision.

### 8.3 Outstanding licensing question — not resolved, documented instead

This is a factual record, not a legal opinion — nobody on this project is
qualified to give one, and this document doesn't try to.

**What's still in use from propsoch.com:**
- `public/images/comparison-brochure.webp` / `comparison-reality.webp` —
  the two images in the Comparison section.
- `public/images/logos/*.webp` — the trust-bar client logos.

**What's confirmed:** propsoch.com's Terms of Use (`/meta/terms`, §7)
prohibit copying/reproducing/redistributing site content, including
images, without Propsoch's prior written consent. No exception for
"assessment" or "portfolio" use is stated anywhere in that clause or
found elsewhere on the site. Nobody involved in this project has sought
or received written consent from Propsoch.

**What's not been assumed:** whether submitting a hiring assessment to
the same company implicitly authorizes using their assets for that
purpose. That is not something this document, or the person writing it,
can determine — it depends on facts (the actual assessment brief's
wording, any communication with Propsoch, general legal principles
around implied license) outside this codebase's ability to verify.

**Two paths, neither taken yet:**

- **A — proceed under assessment-context authorization.** Only valid if
  that authorization is actually real, not assumed. Needs a human
  decision, not a default.
- **B — replace with self-authored equivalents.** Concretely: extend the
  same evidence-diagram SVG system already used for Hero (`FIG. 01`) and
  Journey (`FIG. 02`) to the Comparison section — a self-authored
  "glossy render" panel and "annotated technical plan" panel pair, same
  visual grammar, zero sourcing dependency, and it would also resolve a
  second problem noted independently of licensing: the comparison images
  are the only photographic/color content left on the page, and now read
  as visually inconsistent with the rest of the (all self-authored,
  thin-line, monochrome-plus-orange) system. Trust logos are lower risk
  on their own terms (nominative use — naming who your users work for is
  a different act than reproducing Propsoch's own designed content) and
  could reasonably be left as a separate, smaller decision.

Not implemented in this revision. Flagged for an explicit decision
before submission.

### 8.4 Resolution (2026-09-23, final)

Checked directly: the actual assignment brief ("Frontend Engr Task.pdf")
says only "Analyze the Propsoch landing page and build an improved
version," with no statement, explicit or implicit, granting rights to
reproduce site content. That's the only place "assessment-context
authorization" could have come from, and it isn't there. Option A does
not apply — this was verified, not assumed either way.

**Both remaining propsoch.com-derived asset groups have been replaced**,
per option B:

- **Comparison images** (`comparison-brochure.webp` / `comparison-reality.webp`,
  used in `BrochureRealityCompare.tsx`) — replaced with `BrochurePanel`
  and `RealityPanel`, two self-authored inline SVGs sharing one footprint
  layout (same site, two lenses: soft/rounded/unannotated vs
  sharp/outlined/measured-and-flagged), captioned `FIG. 03` to match the
  Hero/Journey system. Zero raster assets in this section now.
- **Trust-bar logos** (`public/images/logos/*.webp`) — removed entirely;
  `Marquee.tsx` now renders every company as a text wordmark (the
  treatment already used for xto10x, extended to all nine). A company
  name in plain text is a different act from reproducing a copied logo
  image and was judged lower-risk on its own terms, but removed anyway
  for a single consistent story: nothing in this repository is sourced
  from propsoch.com as of this revision.

Net effect: the entire page is now 100% self-authored SVG/CSS/typography.
No raster image assets remain in `public/images/` at all.
