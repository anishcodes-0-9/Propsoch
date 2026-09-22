# Propsoch Redesign — Phase 1 Audit & Phase 2 Architecture Proposal

Scope: this document covers only Phase 1 (repository audit) and Phase 2 (design
architecture proposal) of the staff-engineer redesign brief. No code has been
changed to produce it. Phase 3 (per-section visual redesign plan) and
implementation begin only after this is reviewed.

Baseline at time of writing: Mobile 98/100/100/100, Desktop 100/100/100/100,
12 requests, 218KB transfer, 0 axe violations, zero runtime dependencies
beyond `next`/`react`/`react-dom`. This is the constraint everything below is
measured against.

---

## Phase 1 — Repository Audit

### 1.1 Current inventory

```
app/
  globals.css      147 lines — tokens, keyframes, base styles, focus state
  icon.tsx         next/og generated favicon, no image asset
  layout.tsx        fonts (Jakarta + Instrument Serif italic), metadata
  page.tsx          8-component composition, no logic
components/
  NavBar.tsx         client — mobile menu open/close, Escape-to-close
  Hero.tsx           server — headline, CTAs, inline "brochure vs reality" mockup visual
  TrustBar.tsx       server — heading, marquee, 4-stat grid
  BrochureReality.tsx        server — heading/copy shell around the compare widget
  BrochureRealityCompare.tsx client — the drag/keyboard/tap comparison (255 lines)
  JourneyTimeline.tsx server — 5-stage ordered list, numbered circles
  Testimonial.tsx    server — single quote block
  FinalCta.tsx       server — benefits list + CTA
  Footer.tsx         server — links, social, copyright
lib/
  content.ts         151 lines — all copy, one object per section, plain exports
```

No `ui/`, `patterns/`, `sections/`, or `layout/` subfolders exist. Every
component sits flat in `components/`. There are 8 files, 2 of which are
client components (NavBar, BrochureRealityCompare) — a healthy 25% client
ratio for a marketing page.

### 1.2 Duplication assessment

This is real and worth fixing, but it's small — not a symptom of a
bloated codebase, more a natural byproduct of building sections
independently over several sessions.

- **`AccentWord` is defined twice**, byte-for-byte identical logic, in
  `Hero.tsx:5` and `BrochureReality.tsx:6`. Same for `CheckRow`, defined
  independently in `Hero.tsx:19` (used inside `HeroVisual`) and again in
  `BrochureRealityCompare.tsx:28` with near-identical markup (only the SVG
  opacity differs, 0.12 vs 0.14). `XRow` in `BrochureRealityCompare.tsx:16`
  has no counterpart but is the same shape.
- **The numbered section marker** (`01`/`02`/`03`,
  `text-xs font-bold tracking-[0.2em]`) is copy-pasted three times —
  `BrochureReality.tsx:22`, `JourneyTimeline.tsx:11`, `FinalCta.tsx:7` — with
  one deliberate, undocumented variation: the FinalCta instance uses
  `text-brand` instead of `text-brand-dark` because it sits on `bg-ink`
  (dark background), while the other two are on light backgrounds and
  need the darker shade for AA contrast. That distinction lives only in a
  code comment from a prior session, not in any shared component, so it's
  one accidental edit away from silently failing contrast again — this
  already happened twice in an earlier pass.
- **CTA button styling** (`rounded-full bg-brand-dark px-.. py-.. text-sm
  font-semibold text-white transition-colors hover:bg-brand-hover`) is
  hand-written four times: `Hero.tsx` primary CTA, `NavBar.tsx` desktop +
  mobile CTA, `FinalCta.tsx`. The secondary/outline CTA variant appears
  once in `Hero.tsx`. Any future brand tweak (radius, padding, hover
  state) means hunting four files.
- **Stat/metric rendering** in `TrustBar.tsx:48-55` is a one-off inline
  map with no reusable shape, even though "metric" is conceptually the
  same idea as a journey stage's numbered label.

None of this is an abstraction problem — it's the opposite: the codebase
is currently *under*-componentized at the primitive level, which is
exactly what section 5 of the brief asks to fix, deliberately and without
overshooting into micro-components.

### 1.3 Components that are genuinely single-use vs. reusable

| Component | Reuse potential | Verdict |
|---|---|---|
| `AccentWord` | Used identically in 2 places today, will be used in more sections under the redesign (Journey, Testimonial headline treatments) | Extract — genuine primitive |
| `CheckRow` / `XRow` | Same visual language (icon + label list item), used in 2 components today | Extract — genuine pattern, not two components |
| Numbered marker (`01`/`02`/`03`) | Used 3x today, will anchor every major section under a Copernico-style redesign | Extract — genuine primitive, must accept a color/tone prop to avoid re-breaking contrast |
| CTA button (primary + secondary) | Used 4x today | Extract — genuine primitive |
| `HeroVisual` (the brochure/reality mockup cards) | Hero-only, tightly coupled to hero copy and layout | Correctly inlined, do not extract |
| Mobile menu logic in `NavBar` | Single-use, but is real interactive behavior (Escape handling, `aria-expanded`) | Correctly kept inside NavBar, not a candidate for further splitting |
| `BrochureRealityCompare`'s drag engine (pointer capture, clamp, paint) | Currently coupled to the specific brochure/reality content and 2-panel layout | Worth separating the **generic split-compare mechanism** (position, clamp, keyboard, pointer, paint) from the **specific content panels**, since the redesign brief's `patterns/SplitComparison` explicitly anticipates this becoming a reusable interaction, not just a one-off component |

Nothing in the current tree is an example of unnecessary component
explosion (no `HeroTitle`/`HeroSubtitle`/`HeroVisualCircle`-style
fragmentation exists) — the risk section 6 of the brief warns about is not
a problem inherited from the current code; it's a risk only for the
*next* phase if primitive extraction is taken too far.

### 1.4 Client/server boundary

Correct today and should stay this way: `NavBar` (menu open state) and
`BrochureRealityCompare` (drag/keyboard interaction) are the only two
components that need the client. Everything else — including all copy,
all layout, all SVG illustration — is server-rendered with zero
hydration cost. Any redesign work should preserve this ratio; the only
new client-side candidate under consideration is an `IntersectionObserver`-driven
reveal pattern (section 18 of the brief permits this "sparingly"), which
should be one small shared client component (e.g. a `Reveal` wrapper), not
one per section.

### 1.5 CSS / design-token architecture

`globals.css` currently mixes three concerns in one flat file: base
tokens (`:root`, `@theme inline`), two feature-specific keyframe blocks
(eyebrow cycle, marquee) with their component-coupled class names
(`.eyebrow-phrase`, `.marquee-track`), and global base styles
(`html`/`body`/focus-visible/reduced-motion). This was fine at the current
scale (147 lines) but won't stay fine once the redesign adds a motion
vocabulary (section 7 of the brief) and more component-scoped animation
classes — the file will become a grab-bag.

Token gaps relevant to the redesign:
- **Typography scale** currently defines only `--text-display`, `--text-h2`,
  `--text-h3` — there's no `--text-eyebrow`, `--text-metadata`, or a second,
  larger display step for an editorial hero. Every eyebrow/label/metadata
  string today is hand-set with ad hoc `text-xs`/`text-[11px]`/`text-[10px]`
  Tailwind arbitrary values scattered across 5 files.
- **Spacing** uses Tailwind's default scale directly and consistently
  (`py-16 sm:py-20 md:py-24` section rhythm repeats almost verbatim across
  all 6 sections) — this is a good, if implicit, pattern already. Worth
  making explicit as a token/convention rather than changing it.
- **Radius** is applied inconsistently in a way that matters directly for
  the "editorial not SaaS" goal: `rounded-2xl` appears on the hero mockup
  cards, the comparison container, and would visually read as exactly the
  "generic card" language section 8 of the brief says to avoid. Buttons
  and pills correctly use `rounded-full`, which is fine to keep.
- **Motion** has no defined vocabulary yet — durations are inlined
  per-keyframe (`6s`, `32s`, `200ms`) with no shared scale, so section 7's
  requested motion tokens (150ms / 220ms / 400–700ms / 6s / 30–35s) don't
  exist as reusable values yet, only as the two specific numbers already
  in use (which happen to already match the brief's own hero-cycle and
  marquee targets almost exactly — 6s and 32s vs. the requested "~6s" and
  "~30–35s").

### 1.6 Accessibility implementation

This is a genuine strength to preserve, not rebuild. Concretely already
in place: a full custom `role="slider"` widget with
`aria-valuemin/max/now/valuetext` and arrow/Home/End keyboard support; a
`role="group"` + `aria-label` pattern for the decorative rotating eyebrow
(text is available statically to assistive tech, animation is
`aria-hidden`); a duplicated marquee track correctly marked
`aria-hidden` on the second copy; a `motion-reduce:` static fallback for
both the eyebrow and the marquee; a global `:focus-visible` style; correct
`aria-expanded`/`aria-controls` on the mobile menu toggle. Two real
contrast bugs were found and fixed in earlier work (both `text-brand` on
light backgrounds measuring ~3.5:1 against the 4.5:1 AA requirement) —
this is now a known trap: any new numbered marker, label, or accent color
introduced during the redesign must be checked against its background
with a contrast tool before being treated as done, not assumed correct
because it "looks like" an existing passing color.

### 1.7 Image / SVG handling

Zero raster images anywhere in the codebase. All illustration (the hero
brochure/reality mockup, check/x icons, quote mark, hamburger icon) is
hand-authored inline SVG or CSS (`repeating-linear-gradient` for the
brochure's "hatched paper" texture). This is precisely the "no stock
photography" constraint from the original assessment brief, already
satisfied, and is also why the transfer size is so small (218KB total,
12 requests). The redesign brief's section 20 (image strategy via
`next/image`) is written as guidance in case new imagery becomes
necessary — nothing in the current audit suggests it is. Any new imagery
should be treated as optional, not assumed.

### 1.8 Animation implementation

Three animations exist today, all CSS-only, all `transform`/`opacity`/
`clip-path`: the hero eyebrow phrase cycle (grid-stack + opacity/translateY,
zero layout shift by construction), the trust marquee
(`translateX` loop, duplicated content), and the brochure/reality
`clip-path` reveal (compositor-only, imperative DOM writes during drag to
avoid React re-render cost — see `BrochureRealityCompare.tsx:58-69`). No
JavaScript animation library, no scroll-jacking, no IntersectionObserver
usage yet. This is a clean foundation for section 18's motion strategy —
the redesign doesn't need to introduce a new animation *technique*, only
extend the existing CSS-transform-only approach to a couple of new
places (section reveal, journey stage emphasis).

### 1.9 Dependency & performance risk assessment

`package.json` has exactly 3 runtime dependencies (`next`, `react`,
`react-dom`) and 6 dev dependencies, all standard tooling. This is as
close to zero-dependency as a Next.js app gets. The main performance risk
for the *upcoming* redesign work, not the current code, is scale
inflation: an oversized editorial display typeface (per section 10's
"extremely strong display typography") pushed too far can reintroduce
CLS if line-count changes across breakpoints aren't accounted for, and a
second serif weight/style beyond the current single italic-only
Instrument Serif cut would add a font request for marginal gain — the
existing single-cut italic-only accent approach should be kept as the
ceiling, not expanded to a full serif family.

### 1.10 Visual/design risk assessment — the actual gap

This is the real finding of Phase 1, and it's a design finding, not an
engineering one: the current implementation is technically excellent but
visually reads as a well-executed *template*, not a composed page. The
specific tells:
- `rounded-2xl` + `shadow-md`/`shadow-xl` white cards (hero mockup,
  comparison container) are the exact "floating dashboard mockup" /
  "excessive rounded cards" language section 8 explicitly asks to move
  away from.
- The 4-stat grid in `TrustBar` (`grid-cols-2 md:grid-cols-4`, centered
  number-over-label pairs) is a textbook SaaS metrics block — functional,
  but interchangeable with hundreds of other sites, which is exactly what
  section 15 asks to fix by making numbers part of the typographic
  composition instead of card contents.
  ```tsx
  {trust.stats.map((stat) => (
    <p key={stat.label} className="text-center">
      <span className="block text-h3 font-extrabold ...">{stat.value}</span>
      <span className="mt-1 block text-xs ...">{stat.label}</span>
    </p>
  ))}
  ```
- Every section uses the same center-aligned, max-w-2xl heading + copy
  block pattern (`BrochureReality`, `JourneyTimeline` both open with
  identical structure). Combined with uniform `py-16 sm:py-20 md:py-24`
  rhythm throughout, the page currently reads as *consistent* (a real
  strength to keep) but not *composed* — every section has the same
  visual weight and the same entry pattern, which is the opposite of the
  "content that changes scale throughout the page" and "guided narrative"
  principle from Copernico (section 2).
- The journey timeline's numbered circles (`h-10 w-10 rounded-full
  border-2`) are small and decorative rather than structural — Copernico's
  reference principle of "oversized numbers" as a storytelling device
  (section 14) is not yet present anywhere on the page; the current `01`/
  `02`/`03` markers are 11px tracked labels, not typographic anchors.

None of this means the current sections are wrong in content or
structure — the information architecture (Hero → Trust → Brochure vs
Reality → Journey → Testimonial → Final CTA → Footer) already matches
section 9's target flow exactly, and stays as-is. The gap is entirely in
composition, scale, and card-vs-typography language, which is what Phase
3 will address section by section.

---

## Phase 2 — Design Architecture Proposal

### 2.1 Proposed folder structure

```
components/
  ui/
    Button.tsx            primary + secondary variant, replaces 4 hand-written instances
    Eyebrow.tsx            numbered marker (01/02/03) + label-style eyebrow, tone-aware
    Heading.tsx             optional — only if heading markup logic (AccentWord wrapping)
                            repeats enough to earn it; otherwise AccentWord alone is enough
    Container.tsx           the repeated `mx-auto max-w-6xl px-5 sm:px-8` wrapper
    IconRow.tsx              CheckRow/XRow unified into one component with a `variant` prop
  patterns/
    Marquee.tsx              extracted from TrustBar, generic over any item list
    SplitCompare.tsx          the generic drag/keyboard/tap engine extracted from
                               BrochureRealityCompare, content passed as children/props
    Metric.tsx                 number + supporting copy, typographic (not card) by default
    TimelineStep.tsx           extracted from JourneyTimeline's per-stage markup
    Reveal.tsx                  the one new client component: IntersectionObserver-driven
                                 fade/rise-in wrapper, opt-in per section, respects
                                 prefers-reduced-motion, no scroll-jacking
  sections/
    Hero.tsx
    Trust.tsx                  renamed from TrustBar
    Comparison.tsx              renamed from BrochureReality, composes SplitCompare
    Journey.tsx                 renamed from JourneyTimeline, composes TimelineStep
    Testimonial.tsx
    FinalCta.tsx
    Footer.tsx
  layout/
    NavBar.tsx
app/
lib/
  content.ts
```

This is Atomic Design *vocabulary*, not Atomic Design *dogma* — three
tiers (`ui`, `patterns`, `sections`), not five, and every entry above is
justified against section 5's five criteria (reuse, semantic meaning,
isolated behavior, isolated styling complexity, domain responsibility),
not created for its own sake. `Heading.tsx` is listed as conditional
because right now `AccentWord` alone may be sufficient — it should only
become its own component if Phase 3 finds 3+ sections need the same
heading-wrapping logic, not before.

### 2.2 Migration mapping (current → proposed)

| Current | Proposed | Reason |
|---|---|---|
| `AccentWord` (duplicated in 2 files) | inline helper stays where used, OR promoted to `ui/` only if a 3rd usage appears in Phase 3 | Don't extract on spec; extract on second real duplication removal opportunity |
| `CheckRow` + `XRow` (2 near-identical definitions) | `ui/IconRow.tsx` with `variant: "check" \| "x"` | Same shape, same usage pattern, genuine duplication today |
| 3x hand-copied numbered marker | `ui/Eyebrow.tsx` with a `tone: "on-light" \| "on-dark"` prop that owns the contrast-safe color mapping | Removes the recurring contrast bug at the source instead of relying on a code comment |
| 4x hand-written CTA button | `ui/Button.tsx` with `variant: "primary" \| "secondary"` | Single source of truth for brand button styling |
| `TrustBar.tsx` marquee markup | `patterns/Marquee.tsx` (generic over `items: string[]`) + `sections/Trust.tsx` (composes it, owns the stat block) | Marquee mechanism is reusable; trust content/copy is not |
| `BrochureRealityCompare.tsx` (255 lines, mixes drag engine + specific content panels) | `patterns/SplitCompare.tsx` (drag/keyboard/pointer/paint engine, takes `leftPanel`/`rightPanel` as children) + `sections/Comparison.tsx` (brochure/reality-specific copy and panels) | Splits genuinely reusable interaction mechanics from one-off content, without adding a new dependency or changing the interaction itself |
| `JourneyTimeline.tsx` per-stage `<li>` markup | `patterns/TimelineStep.tsx` | Same item shape repeated 5x today inline |
| `TrustBar.tsx` stat `<p>` map | `patterns/Metric.tsx` | Currently a one-off inline map; becomes the vehicle for section 15's typographic (non-card) numbers |
| `Hero.tsx`, `Testimonial.tsx`, `FinalCta.tsx`, `Footer.tsx` | move into `sections/`, otherwise unchanged in this phase | Already correctly scoped, single-use, no internal duplication |
| `NavBar.tsx` | move into `layout/`, unchanged | Structural chrome, not a content section |

This is a rename-and-consolidate pass, not a rewrite — the goal is to
remove the ~6 duplicated blocks identified in 1.2 and give the redesign
work in Phase 3 a stable set of primitives to build the new visual
language on top of, without touching interaction logic, content, or the
accessibility guarantees already verified.

### 2.3 Design tokens v2 (additive to `app/globals.css`)

**Typography** — add the missing steps, keep the existing three:
- `--text-display-lg`: a second, larger clamp step for an editorial hero
  headline (evaluated against LCP/CLS in Phase 3, not assumed safe)
- `--text-eyebrow`: consolidates the `text-[11px]`/`text-xs` scattered
  values into one token
- `--text-metadata`: for reassurance lines, captions, footer text
- Keep `--text-display`, `--text-h2`, `--text-h3` as-is — they already
  work and don't need replacing, only extending

**Spacing** — formalize, don't change: the existing `py-16 sm:py-20
md:py-24` section rhythm becomes a named convention (documented, not a
new token, since Tailwind's scale already covers it) so Phase 3 sections
stay consistent by default rather than by copy-paste.

**Radius** — a deliberate policy, not a token: `rounded-full` stays for
pills/buttons/avatars only. `rounded-2xl`/`rounded-xl` card treatments
(hero mockup, comparison container) are retired in favor of hairline
borders, offset/layered composition, and sharp or minimally-rounded
(`rounded-md` at most) edges — directly addressing the 1.10 finding.

**Color** — no new tokens. The existing 10-token palette (`ink`, `ink-soft`,
`muted`, `paper`, `paper-raised`, `line`, `brand`, `brand-dark`,
`brand-hover`, `brand-soft`, `brand-tint`) already supports an editorial
treatment; the visual shift comes from composition, not new colors. This
directly satisfies section 8's "avoid excessive orange" and section 27's
"not a luxury real estate palette swap" constraints by construction.

**Motion vocabulary** — formalized as CSS custom properties so every new
animation in Phase 3 references a shared scale instead of inlining a
number:
```css
--duration-micro: 150ms;      /* hover/press states */
--duration-standard: 220ms;   /* existing comparison clip-path transition */
--duration-editorial: 500ms;  /* new: section reveal, journey emphasis */
--ease-standard: ease-out;
```
The two existing animations (6s eyebrow cycle, 32s marquee) already sit
inside the brief's own suggested ranges and are left unchanged.

### 2.4 Component hierarchy summary

| Tier | Components | Criteria satisfied |
|---|---|---|
| `ui/` | Button, Eyebrow, Container, IconRow | Reuse (3–4x today) + isolated styling complexity |
| `patterns/` | Marquee, SplitCompare, Metric, TimelineStep, Reveal | Reuse potential + isolated behavior (drag, intersection, loop) |
| `sections/` | Hero, Trust, Comparison, Journey, Testimonial, FinalCta, Footer | Domain/narrative meaning, single-use by design |
| `layout/` | NavBar | Structural chrome, not content |
| `page.tsx` | composition only | No logic, matches current state, stays this way |

### 2.5 Interaction model — what changes, what doesn't

**Unchanged:** hero rotating phrase (already CSS-only, accessible,
reduced-motion aware — keep exactly as built), trust marquee (already
CSS-only, duplicate-and-hide pattern correct — keep), the
brochure/reality drag mechanics themselves (pointer capture, keyboard
semantics, mobile tap-toggle fallback — this already satisfies section
13's requirements point for point; only its *visual* presentation is in
scope for Phase 3, not its interaction logic).

**New, and the only new client-side surface proposed:** a single shared
`Reveal` pattern (IntersectionObserver, opacity + translateY, one shared
threshold/margin, respects `prefers-reduced-motion` by rendering fully
visible with no observer at all) used sparingly per section 18 — for
section entries and journey stage emphasis, not as a page-wide default on
every element. This is the only place section 18's permitted-but-sparing
IntersectionObserver use is proposed; no other new interaction is
planned at this stage.

**Explicitly not proposed:** scroll-jacking, parallax, canvas/WebGL,
any animation library, any change to how the comparison widget's drag
math works.

### 2.6 Responsive strategy

The existing 7-breakpoint verification discipline (320/375/390/768/1024/
1280/1440, zero horizontal overflow, mobile-first Tailwind classes
throughout) carries forward unchanged as the verification method for
Phase 3 and Phase 8. The one architecturally relevant addition: any new
oversized editorial typography (2.3's `--text-display-lg`) must be
authored as a `clamp()` from the smallest breakpoint up, the same
pattern already used for `--text-display`/`--text-h2`/`--text-h3`, not
a desktop value scaled down — consistent with section 22's "design
intentionally for 320px" instruction and the pattern the codebase
already follows.

### 2.7 What is explicitly out of scope for this phase

- No copy changes — `lib/content.ts` stays factually as-is; all copy is
  already verified against the live site per its own header comment.
- No new runtime dependencies.
- No change to the accessibility guarantees already verified (slider
  semantics, reduced motion, focus states, contrast) — Phase 3/7 will
  re-verify, not re-design, these.
- No change to the information architecture / section order.
- No image assets introduced speculatively — only if a specific Phase 3
  section identifies a genuine communication need per section 20's test
  ("what information does this image communicate?").

---

## Summary for review

The engineering foundation (performance, accessibility, dependency
discipline, client/server split) is already strong and should be
preserved, not rebuilt. The refactor in 2.1–2.2 is a consolidation of
~6 duplicated blocks into a 3-tier `ui/patterns/sections` structure,
justified item-by-item against section 5's criteria — not a wholesale
restructure. The actual gap this redesign needs to close is visual
composition (1.10): rounded-card/shadow language, uniform section
rhythm, and dashboard-style metrics read as competent SaaS template
rather than composed editorial product. Phase 3 will address that
section-by-section once this architecture is approved.
