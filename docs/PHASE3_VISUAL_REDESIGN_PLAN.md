# Phase 3 — Visual Redesign Plan

Follows the approved Phase 1/2 architecture in `docs/REDESIGN_AUDIT.md`. No
code has been written for this document. Information architecture is
unchanged: Navigation → Hero → Trust → Brochure vs Reality → 25-Day
Journey → Testimonial → Final CTA → Footer. Three signature moments:
Hero, Brochure vs Reality, 25-Day Journey — each given a genuinely
different spatial device so they don't read as the same trick repeated
three times.

**Revision note**: this version incorporates staff-level feedback on the
first draft. Changes: the Hero's line diagram is now domain-specific
(a verification/measurement motif, not an abstract split-bar) and
explicitly secondary to typography; Comparison no longer forces a 16:9
aspect ratio and drops its scroll-entrance animation from the first
build; Journey ships as a fully static uneven-column composition with
its active-stage motion deferred and conditional; `Metric`,
`TimelineStep`, and the `useInView` hook move from "new" to
"conditional, extract only if earned"; the implementation sequence now
builds visual design section-by-section with a QA gate after each one,
and defers architecture cleanup to the end instead of front-loading it;
two new guardrail sections (brand fidelity, motion discipline) now apply
across every section below.

---

## Reference study — concrete principles extracted

**Les Grandes-Serres de Pantin**: oversized headline text broken across
manual lines for editorial rhythm, not just wrapped; two-column
alternating text/image composition; a quote block treated as its own
typographic moment (oversized mark + offset attribution, not centered);
content constrained to a readable measure (~900–1000px) even inside a
full-width page, so whitespace at the margins is a deliberate frame, not
wasted space; imagery sized consistently and used as an accent, never
the dominant element; generous vertical rhythm between sections so each
one gets room to be read as a single "beat."

**Coperni**: ultra-light, low-emphasis numeral markers (`.001`, `.002`)
used as a recurring wayfinding device without ever becoming the loudest
element on the page; asymmetric text-left/media-right pairing instead of
centered stacks; full-width "moment" sections that break the page's
normal content-width rhythm on purpose, used sparingly, not per section;
alternating light/dark section backgrounds to create pacing and mark
transitions; interaction (video play/close, dropdown nav) that is
restrained and always in service of navigating content, never decorative
for its own sake.

**How these translate to Propsoch, not a copy of either site**: the
numeral-marker device becomes Propsoch's own wayfinding system (small in
Journey/FinalCTA, deliberately larger only in Comparison, since that's
signature moment #2, not because it's borrowed from Coperni verbatim);
the asymmetric text-left composition replaces the page's current
default of centering everything; the full-bleed "moment" is used exactly
once, for the Comparison widget, not scattered throughout; alternating
visual weight (not alternating color — Propsoch's identity stays paper/
ink/brand, no new dark sections beyond the existing FinalCTA) creates the
pacing instead.

---

## Guardrails carried through every section below

**Brand fidelity.** Every borrowed composition principle must be
re-expressed through Propsoch's actual words, numbers, and process —
evidence over sales pitch, research-led guidance, brochure vs reality,
the 25-day guided buying journey, property-specific context, independent
(non-broker) advice — using the existing paper/ink/brand palette with no
new colors. The explicit failure mode to avoid: the page reading as if
it could be Coperni's or Les Grandes-Serres's own site with Propsoch's
logo swapped in, via an abstract graphic, an architecture-studio tone,
or a fashion-brand pacing that has nothing to do with home buying. Every
new visual device introduced below (the Hero line motif, the Comparison
numeral, the Journey column rhythm) is checked against this before it's
considered acceptable, not just checked for looking sophisticated.

**Motion discipline.** Before any animation is built, it must answer:
*"What information does this motion communicate?"* If the honest answer
is "it makes the page feel more premium/sophisticated," it is not
implemented. This test has already removed two items from the first
draft of this plan — Comparison's scroll-entrance widen animation and
Journey's scroll-driven active/muted state — both are now deferred and
conditional, built only if a later visual review finds a specific,
nameable gap the static version leaves open.

**Performance constraint (protected).** Current baseline: Mobile
98/100/100/100, Desktop 100/100/100/100, 218KB transfer, 12 requests, 0
axe violations. Targets for the redesign: Mobile Performance ≥95,
Desktop Performance 100, Accessibility 100, Best Practices 100, SEO 100,
CLS 0, zero unnecessary runtime dependencies. This is a gate at every
signature-moment step below and at the final verification pass, not a
number checked only once at the end — any visual feature that
materially threatens it gets reconsidered before it ships, per the
gate methodology already used successfully in the prior motion phase.

---

## Navigation

**1. Current visual problem**: none structurally — this is the one
section Phase 1 did not flag. Only inconsistency: the CTA button is
hand-written rather than the shared primitive, and link type sits outside
the new type scale.

**2. New visual composition**: deliberately unchanged in structure.
Restraint here is the decision — a loud nav would compete with the
Hero's oversized type directly beneath it, which is the opposite of
Coperni's "interaction supports the story" principle.

**3. Desktop composition**: unchanged — sticky, blurred, wordmark left,
links + CTA right, thin bottom rule.

**4. Mobile composition**: unchanged — hamburger, slide-down panel,
Escape-to-close.

**5. Typography hierarchy**: nav links move from ad hoc `text-sm` to the
new `--text-metadata` token; wordmark untouched.

**6. Spatial hierarchy**: unchanged.

**7. Interaction/motion**: none new.

**8. Why this improves the Propsoch story**: keeping chrome quiet lets
the Hero's typography be the first real statement the visitor sees.

**9. Accessibility implications**: none — existing `aria-expanded`/
`aria-controls`/Escape handling is already correct and untouched.

**10. Performance implications**: none.

**11. Components required**: `layout/NavBar.tsx` (moved, not rewritten),
CTA becomes `ui/Button` (`variant="primary" size="sm"`).

---

## Hero — Signature Moment 1: "the typographic/architectural statement"

**1. Current visual problem**: a conventional two-column SaaS hero —
copy left, a `rounded-2xl`/`shadow-xl` product-mockup card right. The
mockup card is exactly the "floating dashboard mockup" language the
brief asks to eliminate, and centering the whole content column under a
pill-shaped eyebrow badge is the same default-centered pattern that
recurs on every other section.

**2. New visual composition**: the headline is the primary device —
large, manually broken, authored type carries the section on its own,
and the hero remains visually memorable with no supporting graphic at
all. Kill the mockup card. In its place, a secondary, domain-specific
line motif: not an abstract two-segment bar, but a single horizontal
rule styled like a surveyor's or inspector's annotated measurement
line — a few short perpendicular tick marks at irregular intervals
along it, each carrying a small micro-label pulled from Propsoch's own
verification points already written in `lib/content.ts` ("Layout &
sunlight", "RERA & legal status", "Builder track record"). It reads as
"this is what gets checked," not as an illustration, dashboard, or
stock graphic — line and type only, no icons, no building/document
shapes standing in for the concept. If this motif is cut entirely for
any reason (performance, visual QA, or otherwise), the hero loses
nothing essential — the headline was always the load-bearing element.

**3. Desktop composition**: 12-column grid. Headline occupies columns
1–8, set at the new `--text-display-lg` scale
(`clamp(3.25rem, 2rem + 6.5vw, 7rem)`), manually broken across three
lines at natural phrase boundaries — "Before you trust" / "the sales
pitch," / "see the *reality*." — not left to wrap naturally, so line
breaks are an authored decision. The kicker (existing rotating eyebrow
phrase) sits above the headline, left-aligned, no pill background — just
tracked caps text over a 1px rule, echoing Coperni's understated numeral
markers rather than a badge. Subhead + both CTAs sit in columns 8–12,
vertically anchored to the *lower* half of the headline block (not
centered against its full height) — an asymmetric pairing, not a stacked
centered block. Below the headline block, full-width, a single thin
`brand-dark` rule runs edge to edge with three or four short
perpendicular tick marks at irregular intervals (not evenly spaced —
even spacing reads as decorative, irregular reads as "real
measurements"), each paired with a small `--text-metadata` label
reading one of the existing verification points from `lib/content.ts`'s
brochure/reality copy. No new copy is invented for this — it reuses text
that already exists elsewhere on the page.

**4. Mobile composition**: single column, left-aligned (not centered —
a deliberate departure from the typical centered mobile hero). Kicker →
headline → subhead → CTAs stack in that order, same left edge throughout.
The tick-mark line compresses to fewer ticks/labels (2 instead of 3–4)
rather than changing shape.

**5. Typography hierarchy**: kicker = `--text-eyebrow`, tracked caps,
`brand-dark`, no background. Headline = `--text-display-lg`, `font-
extrabold`, leading ~1.02–1.05, with "reality" kept in the existing
serif-italic accent treatment. Subhead = existing body-lg scale,
unchanged. Reassurance line becomes a small caption anchored under the
CTA block, `--text-metadata`.

**6. Spatial hierarchy**: tight gap between kicker and headline (16–24px)
so they read as one unit; a deliberately larger gap (48–64px) between
headline and the subhead/CTA block, so the headline is allowed to stand
alone as the page's opening statement before anything else competes for
attention — the "let it breathe" principle from Les Grandes-Serres.

**7. Interaction/motion**: the rotating kicker phrase is kept exactly as
built (CSS-only, ~6s cycle, `role="group"`, reduced-motion static
fallback — no changes). The tick-mark line ships first fully static —
no animation — since the headline is already the section's memorable,
motion-free device and the kicker is already this section's one piece
of movement. If visual QA finds the static line reads as inert, a
single one-time `scaleX(0→1)` reveal on the rule (~500ms,
`transform-origin: left`, no loop) may be added afterward — but only
once it passes the motion-discipline test: the honest answer would need
to be "the line is being measured/drawn," not "it looks more premium."

**8. Why this improves the Propsoch story**: replaces a generic product
screenshot-style mockup with the actual value proposition rendered
typographically, and grounds the one supporting graphic in Propsoch's
real verification process — the same points a buyer's property actually
gets checked against — rather than an abstract shape that could belong
to any product. It also plants a visual motif (a measurement line) that
the Comparison section pays off at full scale later as the oversized
numeral and full-bleed panel, giving the page a through-line instead of
two unrelated devices.

**9. Accessibility implications**: the `<h1>` remains one semantic
element — manual line breaks are `<br aria-hidden="true">` or CSS
`white-space` tricks scoped to desktop only, never split into multiple
elements, so a screen reader still reads the full sentence. The
tick-mark line is `aria-hidden="true"` in full — its micro-labels
duplicate verification points that already appear as real, readable
text in the Comparison section below, so hiding it here loses no
information for screen reader users. Removing the pill background
from the kicker changes its contrast context — must re-verify
`brand-dark` on `paper` (already a known-passing combination at ~5:1,
but must be re-checked in this exact new context before considering it
done, not assumed).

**10. Performance implications**: net simplification — the current
mockup is ~6 nested divs with two shadow layers; the replacement is a
handful of flat elements with two 1px rules. No new images, no new
fonts. The oversized `--text-display-lg` clamp must be checked for line-
count stability at all 7 breakpoints (a 3-line manual break at 1440px
must not silently become a 4-line wrap at 375px) — this is the one real
CLS risk in this section and must be verified, not assumed safe.

**11. Components/patterns required**: `sections/Hero.tsx` (rewritten
layout), `ui/Eyebrow` reused for the kicker (`size="sm"`, no background
variant), tick-mark line kept inline in `Hero.tsx` per Phase 1's own
verdict that hero-specific visuals should not be extracted (it also
reads real copy straight from `lib/content.ts`, so it has no reuse
potential elsewhere), `AccentWord` helper (shared, unchanged logic).

---

## Trust

**1. Current visual problem**: a centered caption, a centered marquee,
and a 4-card stat grid directly beneath it — a textbook logo-strip +
metrics-card SaaS block, visually interchangeable with most landing
pages, and the same centered-block shape as every other section on the
current page.

**2. New visual composition**: split into two distinct asymmetric bands
instead of one centered stack, so this section reads as two separate
"beats" of evidence rather than one generic strip.

**3. Desktop composition**: Band 1 — two-column row, label ("Trusted by
buyers from") left-aligned in a ~25%-width column, the existing marquee
mechanism unchanged in the remaining ~75% (still a CSS `translateX`
loop, still duplicate-and-`aria-hidden`, still mask-gradient edges,
still pauses on hover/focus). A thin rule separates Band 1 from Band 2.
Band 2 — the four stats rendered as a single left-aligned horizontal row
(not a centered 2x4 grid): number + label pairs separated by thin
vertical rules, numbers set larger and bolder than the current
`--text-h3`, left edge aligned to Band 1's label column rather than
centered on the page.

**4. Mobile composition**: Band 1 label stacks above the marquee (both
full width, unchanged marquee behavior). Band 2 becomes a 2×2 grid with
thin rule dividers only — no card backgrounds, no shadows, no rounded
corners.

**5. Typography hierarchy**: label = `--text-eyebrow`. Stat numbers =
new slightly-larger-than-`--text-h3` extrabold weight. Stat labels =
`--text-metadata`.

**6. Spatial hierarchy**: a real section-level gap (64–96px) between
Band 1 and Band 2 so they read as two distinct compositional beats
instead of one undifferentiated block — directly addresses the "every
section has the same visual weight" finding from the audit.

**7. Interaction/motion**: none new. The marquee's existing CSS-only
loop, pause-on-hover, and reduced-motion static fallback are kept
exactly as built. This section's job is calm evidence, not spectacle —
not every section needs its own motion.

**8. Why this improves the Propsoch story**: presenting the numbers as
typographic facts in a running row, not dashboard tiles, reinforces
"evidence, not a sales pitch" — the same idea the copy already argues,
now expressed compositionally instead of contradicted by generic card
chrome.

**9. Accessibility implications**: marquee accessibility is unchanged
(duplicate track `aria-hidden`, static `motion-reduce:` fallback list
already correct). New vertical rule dividers in the stat row are
`aria-hidden="true"`; numbers and labels stay plain text in natural
reading order.

**10. Performance implications**: removing card backgrounds/shadows is a
minor CSS simplification. No new images, no new requests, section is
below the fold so has no LCP impact.

**11. Components/patterns required**: `sections/Trust.tsx` (new layout),
`patterns/Marquee.tsx` (extracted opportunistically here, since Trust
already has this exact logic — just needs lifting out unchanged). The
stat row is built inline first; `patterns/Metric.tsx` stays conditional
per the abstraction guardrail — extracted only if it turns out to
genuinely earn its keep once built, not created upfront on spec.

---

## Brochure vs Reality — Signature Moment 2: "the full-bleed reveal"

**1. Current visual problem**: a centered heading+copy intro above a
single `rounded-2xl`/`border`/`shadow-sm` container holding the compare
widget — reads as "one bordered card with a slider inside," the same
visual weight as any other section, when the brief and the original
Propsoch concept both treat this as the site's central idea.

**2. New visual composition**: this section gets the page's one true
full-bleed "moment," per Coperni's sparing use of full-width breaks, and
an oversized numeral used nowhere else at this scale, so it reads as
unmistakably the most important section on the page.

**3. Desktop composition**: intro area first, as a two-column row —
heading left (~60% width, left-aligned, no longer centered) beside
supporting copy right (~35% width) — with the section numeral "01" set
at a genuinely large scale (`clamp(4rem, 3rem + 4vw, 7rem)`), positioned
to overlap slightly outside the text column into the left margin, in a
muted/tinted `brand-soft`-family color so it recedes but still anchors
the section (achieved via size + tint, not a new light font weight,
since Jakarta only loads 400–800 today and a new weight file isn't
justified for one numeral). Below the intro, the compare widget breaks
out of the page's `max-w-6xl` constraint to a wider container (e.g.
`max-w-[90rem]` or edge-to-edge). No `aspect-ratio` or fixed height is
imposed — the panels' actual copy, spacing, and the hatched-paper
texture determine how tall the widget needs to be at each breakpoint,
so the height is a consequence of the content, not a forced ratio.
Border/shadow removed in favor of the two panels' own background
contrast doing the framing — no card chrome at all.

**4. Mobile composition**: numeral scales down but stays a real visual
anchor relative to body text (not shrunk to a caption). Heading+copy
stack in a single column. The compare widget goes edge-to-edge
(breaking the page's side padding intentionally, the same as it breaks
constraints at desktop) with the existing two-button tap-toggle beneath
it, restyled from filled pills to a plain underline-tab treatment
(text + active underline) consistent with the retired-rounded-card
policy.

**5. Typography hierarchy**: numeral = oversized, muted tint, no new
font weight. Heading = `--text-h2`, left-aligned. Copy = body, narrower
measure. Inside the widget, the "Builder Brochure"/"Reality Check"
labels move from small badge pills to running-type corner labels (text
only, no pill background), keeping the existing hatched-paper CSS
texture on the brochure panel — it's a free, non-photographic motif
worth keeping exactly as-is.

**6. Spatial hierarchy**: the numeral is allowed to bleed outside the
text grid (intentional overlap) — this section's spatial signature is
*overlap*, distinct from Hero's *manual line-break rhythm* and Journey's
*uneven column widths* below, so the three signature moments don't
repeat the same trick.

**7. Interaction/motion**: the drag/keyboard/pointer/`clip-path`
mechanics inside the widget are **unchanged** — same pointer capture,
same clamp math, same `role="slider"` semantics, same imperative-paint
architecture, per the explicit instruction not to touch interaction
logic. No new motion is added on top of it. The drag interaction is
already this section's meaningful interaction and already communicates
"reveal" on its own. A scroll-triggered entrance animation (the panel
widening from ~92%→100% on first view) was considered and is
deliberately not built in the first pass — it would need to pass the
motion-discipline test (what does it communicate that the drag doesn't
already) before being added, and nothing in this plan currently clears
that bar. Revisit only if visual QA of the static full-bleed panel finds
a specific, nameable comprehension gap.

**8. Why this improves the Propsoch story**: the composition itself now
argues the point — "brokers show you a small picture, we show the full
one" is expressed by the panel physically breaking out to full width,
not just stated in copy. This section becomes the page's dominant visual
event, appropriate for a section literally named after the company's
own tagline.

**9. Accessibility implications**: no change to the widget's verified
`role="slider"` + `aria-valuemin/max/now/valuetext` + keyboard semantics.
Full-bleed/edge-to-edge layout must preserve the existing 44px handle
touch target at every breakpoint. The oversized numeral stays
`aria-hidden="true"` (purely decorative, its value ("01") is not
information — the heading text carries the meaning).

**10. Performance implications**: no new images. Full-bleed layout via
CSS width/negative-margin techniques must be re-verified for zero
horizontal overflow at 320px specifically, since this is the one section
deliberately breaking the page's normal container width. Letting content
determine height (rather than forcing an aspect ratio) avoids the risk
of empty padding or clipped copy at breakpoints the fixed ratio wasn't
tuned for — a net safety improvement over the original 16:9 idea, not
just a neutral change.

**11. Components/patterns required**: `sections/Comparison.tsx` (renamed
from `BrochureReality.tsx`, intro restructured to 2-col, numeral added),
`patterns/SplitCompare.tsx` (mechanics extracted from
`BrochureRealityCompare.tsx` per Phase 2, behavior unchanged, panel
content restyled), `ui/Eyebrow` extended with a `size="lg"` variant used
only here (rather than a second parallel numeral component), `ui/
IconRow` for the panel point lists (replaces duplicated `CheckRow`/`XRow`).

---

## 25-Day Journey — Signature Moment 3: "the paced progression"

**1. Current visual problem**: five equal-width columns, each marked by
a small `h-10 w-10 rounded-full` circle on a thin line — a generic
horizontal-timeline-with-dots pattern, every stage carrying identical
visual weight regardless of its actual content density, plus a centered
heading block matching every other section's default.

**2. New visual composition**: uneven column widths are this section's
spatial signature — deliberately different from Hero's line-break
rhythm and Comparison's overlap/bleed, so all three signature moments
feel distinct from each other. This ships first as a fully static
composition; a scroll-driven active-stage state is evaluated only after
visual QA, not built by default (see point 7).

**3. Desktop composition**: heading row first — left-aligned heading
paired with a short supporting line to its right (2-col, matching the
editorial pairing reused from the Comparison intro for page-wide
consistency). Below a full-width baseline rule, five columns whose
widths vary by content density rather than an even 20/20/20/20/20 split
(e.g. roughly 15/25/20/25/15%) — "Today" and "Last week" narrower,
"Week 1" and "Week 3" wider where there's more to say. Each column's
number is set inline with its stage name ("01 — Today"), not in a
separate circle badge, removing the rounded-badge language. Stage title
and description sit beneath, at full ink-color/readable weight for
every stage by default — no muted/inactive state in the first build.
Column width variation alone carries the pacing signal; nothing dims or
activates on scroll unless point 7's evaluation finds it's needed.

**4. Mobile composition**: reverts to the existing vertical single-
column stack (already correct structurally), circles replaced by the
same inline "01 —" label treatment for consistency with desktop. Same
static-by-default treatment as desktop — no scroll-driven state in the
first build.

**5. Typography hierarchy**: heading = `--text-h2`, left-aligned. Inline
stage number = `--text-eyebrow` weight, slightly bolder than the
Comparison/FinalCTA numeral convention since it's inline with running
text here rather than standalone. Stage title = `--text-h3`-adjacent.
Description = body, ink color throughout (no muted state in the first
build).

**6. Spatial hierarchy**: uneven column widths *are* the hierarchy
device — intentional imbalance, distinct from Comparison's intentional
overlap, giving the two sections genuinely different spatial languages.

**7. Interaction/motion**: none in the first build — the uneven column
widths alone are the section's pacing device, and it ships fully
static. An `IntersectionObserver`-driven active/muted state was
designed (toggling opacity+color per column as its center crosses a
viewport threshold, compositor-only properties, no continuous loop,
never intercepting normal scroll) but is deliberately not implemented
until the static version has been visually reviewed. It's added only if
that review finds the static composition doesn't actually convey
progression — not to "increase perceived sophistication," per the
motion-discipline guardrail. If added later, `prefers-reduced-motion`
would disable the muting entirely, all stages rendering at full
ink-color.

**8. Why this improves the Propsoch story**: the section now performs
the idea of a paced, guided process rather than just labeling one —
varying column weights embody "structured process, not an open-ended
search" (the section's own copy) structurally, which is the "guided
narrative" principle drawn from Copernico, without needing motion to
make the point.

**9. Accessibility implications**: in the static first build, all five
stages are at identical, already-passing contrast — no new risk to
verify. If the optional active/muted state is added later, the muted
state must never drop any stage's text below AA contrast even while
inactive — measured with a contrast tool before being called done, the
same discipline that caught two real contrast bugs earlier in this
project — and all five stages must remain fully present and readable
regardless of scroll position, so no content is conveyed only through
the animation.

**10. Performance implications**: zero new JavaScript in the first
build — this is pure CSS grid layout. No new images. Column width
variation is static `grid-template-columns` per breakpoint, not
animated, so there's no layout-thrash risk. If the optional
`IntersectionObserver` state is added later: native API, not a library,
one observer instance, five entries, fires only on threshold crossings.

**11. Components/patterns required**: `sections/Journey.tsx` (renamed
from `JourneyTimeline.tsx`, variable-width column grid) for the static
first build. `patterns/TimelineStep.tsx` and a shared `useInView` hook
are conditional — built only if the optional active-state motion is
added later and the per-stage markup has genuinely repeated enough to
justify extraction, not created upfront on spec.

---

## Testimonial

**1. Current visual problem**: not actually a bad section — small,
centered, functional — but it currently carries none of the new
editorial language (no asymmetry, no relationship to the rest of the
page's visual system), and centered-by-default is exactly the pattern
being retired everywhere else.

**2. New visual composition**: a deliberately calm, asymmetric inset
quote — the page's one "rest beat," with no signature-moment treatment,
since signature moments are explicitly capped at three.

**3. Desktop composition**: the quote block is offset, not centered —
starting around 15% from the left edge and ending around 75%, not
spanning the full constrained width. The existing quote-mark SVG is
repositioned as a larger static glyph in the upper-left margin of the
block, bleeding slightly outside the text column, rather than centered
above the text. Quote text left-aligned within its offset column;
attribution sits beneath as a small caption.

**4. Mobile composition**: single column, quote mark shrinks
proportionally but stays left-aligned above the text (not centered) —
consistent with the page-wide shift away from center-alignment as the
default.

**5. Typography hierarchy**: quote size/weight unchanged (already
correct at `text-xl`/`text-2xl`). Attribution = `--text-metadata`.

**6. Spatial hierarchy**: asymmetric margins (more space on the side the
text block isn't anchored to) so the section reads as an inset editorial
pull-quote, not another centered block.

**7. Interaction/motion**: none new — deliberately. This section is the
pacing "exhale" between Journey's active progression and FinalCTA's
conclusion; adding motion here would undercut that contrast.

**8. Why this improves the Propsoch story**: gives the page real pacing
variety — not every section performs the same trick — while still
costing nothing in complexity or performance.

**9. Accessibility implications**: none — `blockquote`/`footer` semantics
and contrast are already correct and unchanged.

**10. Performance implications**: none — pure CSS repositioning, no new
assets.

**11. Components/patterns required**: `sections/Testimonial.tsx` (layout
only). No new component — Phase 1/2 already concluded this section
doesn't need extraction, and nothing here changes that.

---

## Final CTA

**1. Current visual problem**: a centered dark block with a stacked
checklist beneath — functionally fine (good contrast, correctly signals
"conclusion" via the dark background) but visually just another
centered card-less stack, indistinguishable in composition from a
generic dark CTA banner.

**2. New visual composition**: restructured asymmetrically to
deliberately rhyme with the Hero's own asymmetric grid — bookending the
page, so the opening and closing statements share a compositional
language on purpose.

**3. Desktop composition**: 2-column grid on the dark `bg-ink`
background. Left column (~60%) — numeral marker, heading set larger than
the current `--text-h2` (reusing the `--text-display-lg` family at a
lower clamp minimum rather than introducing a fifth display-scale
token), then the CTA button. Right column (~35%) — the existing benefits
checklist, vertically centered against the heading block rather than
stacked centered beneath it.

**4. Mobile composition**: single column — numeral, heading, CTA button,
then the benefits list beneath (kept in this order so the action is
reachable without scrolling past the full list).

**5. Typography hierarchy**: heading = `--text-display-lg` at a reduced
clamp ceiling appropriate for a closing statement, not the Hero's full
scale. Benefits = existing `IconRow` treatment, unchanged. CTA = `ui/
Button` primary variant, unchanged (already verified at 5.01:1 contrast
on `bg-ink`).

**6. Spatial hierarchy**: the 60/35 asymmetric split deliberately mirrors
Hero's own asymmetric grid — an intentional compositional bookend, not a
coincidence.

**7. Interaction/motion**: none new beyond the CTA's existing hover
state — this section doesn't need its own signature motion; it's
explicitly not one of the three signature moments.

**8. Why this improves the Propsoch story**: closing with a composition
that visually rhymes with the opening gives the whole page a sense of
being composed as a single arc, rather than an arbitrary stack of
sections ending wherever the content ran out.

**9. Accessibility implications**: numeral marker uses `ui/Eyebrow`'s
`tone="on-dark"` variant, which owns the already-verified `text-brand`
at 5.01:1 on `bg-ink` (this exact combination was deliberately kept as
the one instance *not* switched to `brand-dark` in the earlier contrast-
bug fix, and the new tone-aware primitive encodes that decision so it
can't be broken by a future edit). Heading stays a real `<h2>`. Benefit
icons remain `aria-hidden` with text carrying the meaning, unchanged.

**10. Performance implications**: none — layout restructuring only, no
new assets, no new requests.

**11. Components/patterns required**: `sections/FinalCta.tsx`
(restructured to 2-col), `ui/Button` (unchanged, reused), `ui/Eyebrow`
(`tone="on-dark"`, `size="sm"`).

---

## Footer

**1. Current visual problem**: none flagged — low visual stakes, already
functional and reasonably close to the Les Grandes-Serres reference
pattern (dark-footer, multi-column) already.

**2. New visual composition**: consistency pass only — no structural
redesign, since the brief doesn't call for a memorable footer and
over-designing utilitarian wayfinding would work against the page's
pacing, not for it.

**3. Desktop composition**: unchanged — logo/copyright left, links
center, social right, flex row.

**4. Mobile composition**: unchanged — stacked flex column.

**5. Typography hierarchy**: ad hoc `text-xs`/`text-sm` values swapped
for the new `--text-metadata` token, for consistency with the rest of
the page's type system.

**6. Spatial hierarchy**: unchanged.

**7. Interaction/motion**: none.

**8. Why this improves the Propsoch story**: a footer's job is
wayfinding, not narrative — correctly deprioritized.

**9. Accessibility implications**: none — already correct.

**10. Performance implications**: none.

**11. Components/patterns required**: `sections/Footer.tsx` (token
substitution only).

---

## Component disposition summary

| Action | Component |
|---|---|
| **New — created opportunistically when the section that first needs it is built, not as an upfront batch** | `ui/Button.tsx`, `ui/Eyebrow.tsx` (tone: on-light/on-dark, size: sm/lg), `ui/IconRow.tsx`, `patterns/Marquee.tsx`, `patterns/SplitCompare.tsx` |
| **Conditional — extract only if implementation shows real duplication or complexity; decided during final abstraction cleanup, not before** | `patterns/Metric.tsx` (Trust's stat row), `patterns/TimelineStep.tsx` and a shared `useInView` hook (both only relevant at all if Journey's or Comparison's deferred motion is added) |
| **Renamed + moved, logic unchanged** | `BrochureReality.tsx` → `sections/Comparison.tsx`; `TrustBar.tsx` → `sections/Trust.tsx`; `JourneyTimeline.tsx` → `sections/Journey.tsx`; `NavBar.tsx` → `layout/NavBar.tsx`; `Hero.tsx`, `Testimonial.tsx`, `FinalCta.tsx`, `Footer.tsx` → `sections/*.tsx` (path only) — this move happens during final cleanup, once the visual design is settled, not upfront |
| **Extracted, mechanics unchanged** | `BrochureRealityCompare.tsx`'s drag/keyboard/pointer/paint engine → `patterns/SplitCompare.tsx`; content panels stay in `sections/Comparison.tsx` |
| **Merged** | `AccentWord` (2 identical copies) → one shared text-transform helper (kept as a small utility, not promoted to `ui/`, since it has no visual chrome of its own); `CheckRow` + `XRow` (2 near-identical copies) → `ui/IconRow.tsx` with a `variant` prop |
| **Deleted (content replaced in place)** | The `HeroVisual` mockup-card markup — replaced by the inline tick-mark measurement line; not a separate file today, so nothing is removed from the tree, only rewritten in `Hero.tsx` |
| **Retained exactly as-is** | Hero eyebrow rotation CSS, trust marquee CSS, `BrochureRealityCompare`'s clamp/pointer-capture/keyboard math, `lib/content.ts`, all existing ARIA attributes and roles |

---

## Final implementation sequence

Revised per staff feedback: visible design work comes first,
section-by-section with a QA gate after each one; architecture cleanup
(folder moves, conditional abstraction extraction) is deferred to the
end, once the visual system exists to clean up around — not performed
speculatively beforehand. This is a design assessment, so user-visible
improvement precedes cleanup that provides no visible value.

Every numbered step gets a lightweight check before moving on: rebuild,
console error check, quick overflow glance at mobile/desktop. The three
signature-moment steps (Hero, Comparison, Journey) additionally get the
full gate — Lighthouse (mobile + desktop) + axe-core + 7-breakpoint
check + keyboard test — immediately after their visual QA, since
they're the highest-risk items and the earliest point a regression
could be caught cheaply. Any regression stops forward progress until a
cheaper alternative is found. Small, logical commits — no mixed
refactor+redesign commits.

1. **`design:`** minimal token foundation in `globals.css` —
   typography scale additions (`--text-display-lg`, `--text-eyebrow`,
   `--text-metadata`), motion vocabulary custom properties, radius
   policy. Additive only, nothing consumes the new tokens yet.
2. **`design:`** redesign Hero (signature moment 1) — `ui/Button` and
   `ui/Eyebrow` are created here, opportunistically, since Hero is the
   first section that needs both.
3. **Visual QA** — review Hero against the brand-fidelity and
   motion-discipline guardrails, plus the full performance/a11y/
   responsive gate.
4. **`design:`** redesign Trust — `patterns/Marquee` extracted here
   (lifted unchanged from the current `TrustBar.tsx`); stat row built
   inline first.
5. **Visual QA** — review Trust; decide whether `patterns/Metric` is
   actually earning its keep once the stat row exists, or stays inline.
6. **`design:`** redesign Comparison (signature moment 2) —
   `patterns/SplitCompare` extracted here (mechanics lifted unchanged
   from `BrochureRealityCompare.tsx`), `ui/IconRow` created here,
   `ui/Eyebrow` gets its `size="lg"` variant.
7. **Visual QA** — review Comparison; full gate (highest-risk section:
   full-bleed layout, content-driven height, unchanged drag mechanics).
   Confirm the deferred scroll-entrance animation is still unnecessary
   before moving on.
8. **`design:`** redesign Journey (signature moment 3) — static uneven
   columns, no motion yet.
9. **Visual QA** — review Journey; full gate. Decide here, with the
   static version actually visible, whether the optional active-stage
   motion is worth building — only if it demonstrably improves
   comprehension of the progression, not by default.
10. **`design:`** redesign Testimonial and FinalCta together (both are
    smaller, non-signature changes) — reuses `ui/Button` and `ui/Eyebrow`
    (`tone="on-dark"`) already built in steps 2 and 6.
11. **Visual QA** — review Testimonial/FinalCta, confirm the FinalCta/
    Hero compositional bookend actually reads as intentional.
12. **`refactor:`** final abstraction cleanup — move sections into
    `sections/`/`layout/`, update imports in `page.tsx`; decide
    `patterns/TimelineStep` and the shared `useInView` hook based on
    what was actually built in steps 8–9 (skip entirely if Journey
    stayed static); NavBar/Footer token consistency pass.
13. **`perf:`** full production Lighthouse + transfer-size/request-count
    comparison against the 218KB/12-request/98–100 baseline, across the
    whole assembled page, not just per-section.
14. **`a11y:`** full axe-core pass + manual keyboard pass + reduced-
    motion pass across every new interactive/animated element on the
    complete page.
15. **`test:`** full 7-breakpoint responsive verification
    (320/375/390/768/1024/1280/1440), screenshots at 1440 and 390 for
    final visual QA against the brief's own review questions ("does this
    look like a senior frontend engineer designed it," "would a reviewer
    remember this after ten other submissions," "does it still look like
    Propsoch, not a Coperni clone").
16. **`docs:`** update README with the before/after Lighthouse table,
    files changed, and design rationale, matching the documentation
    pattern already established for the prior motion/interaction phase.

This plan introduces zero new runtime dependencies, at most one new
native-API client surface (`useInView`, wrapping `IntersectionObserver`,
built only if steps 7 or 9 actually call for it), and no change to any
already-verified interaction logic or accessibility guarantee — the
redesign is entirely a composition, typography, and layout change built
on the existing, already-fast, already-accessible foundation, with
abstraction work earned by what's actually built rather than assumed in
advance.
