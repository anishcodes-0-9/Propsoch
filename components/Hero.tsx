import { hero } from "@/lib/content";

// Splits a single word out of `text` and wraps it in the serif-italic accent
// face. Sparing by design — this is the only accent treatment in the Hero.
function AccentWord({ text, accent }: { text: string; accent: string }) {
  const index = text.indexOf(accent);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <em className="font-accent font-normal italic text-brand-dark">
        {accent}
      </em>
      {text.slice(index + accent.length)}
    </>
  );
}

// Authored line breaks at natural phrase boundaries, active only at the
// `lg` breakpoint and up, where there's room for them. Below `lg` each
// fragment is inline by default and the sentence flows and wraps exactly
// as it always did — `lg:block` is what forces the break.
function Headline({ text, accent }: { text: string; accent: string }) {
  const breakAfter = ["trust", "pitch,"];
  let remaining = text;
  const lines: string[] = [];
  for (const marker of breakAfter) {
    const idx = remaining.indexOf(marker);
    if (idx === -1) break;
    const cut = idx + marker.length;
    lines.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut).trimStart();
  }
  if (remaining) lines.push(remaining);
  if (lines.length === 0) lines.push(text);

  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="lg:block">
          {i === lines.length - 1 ? (
            <AccentWord text={line} accent={accent} />
          ) : (
            line
          )}
          {i < lines.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

// A single rule with a few irregularly-spaced tick marks, each labeled
// with one of Propsoch's own verification points (see lib/content.ts).
// Fully decorative to assistive tech, since every label here also appears
// as real, readable text in the Comparison section below.
function VerificationLine({ points }: { points: string[] }) {
  const [first, middle, last] = points;
  return (
    <div
      aria-hidden="true"
      className="relative mt-10 min-h-20 w-full sm:mt-12 lg:mt-16"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-brand-dark" />
      <div className="absolute left-0 top-0 flex w-28 flex-col items-start text-left sm:w-32">
        <span className="h-2.5 w-px bg-brand-dark" />
        <span className="mt-2 text-metadata leading-snug text-muted">
          {first}
        </span>
      </div>
      {middle && (
        <div className="absolute top-0 left-[42%] hidden w-32 -translate-x-1/2 flex-col items-center text-center md:flex">
          <span className="h-2.5 w-px bg-brand-dark" />
          <span className="mt-2 text-metadata leading-snug text-muted">
            {middle}
          </span>
        </div>
      )}
      <div className="absolute right-0 top-0 flex w-28 flex-col items-end text-right sm:w-32">
        <span className="h-2.5 w-px bg-brand-dark" />
        <span className="mt-2 text-metadata leading-snug text-muted">
          {last}
        </span>
      </div>
    </div>
  );
}

// Phase 5 revision, second pass: an "investigative technical plate," not
// an enlarged wireframe. Fully self-authored — zero raster assets, zero
// sourcing dependency — but built with the vocabulary of a real survey
// drawing: a dominant footprint bleeding off the frame (asymmetric, not
// centered), true dimension lines with tick ends and a measured value,
// a six-point evidence index where only the three real, factual points
// (80-point report, on-site verification, RERA registration) get the
// filled orange marker + label — the other three stay as bare outlined
// numerals, implying "more was checked than we're spelling out here"
// without asserting anything unstated. "FIG. 01" plate caption ties this
// to the same numbering language the Comparison and Journey diagrams use
// (see those components) — one system, not three unrelated motifs.
function EvidenceDiagram() {
  // `right`-anchored where the marker sits close to the right edge — a
  // `left` percentage there overflows a narrow mobile viewport instead of
  // wrapping, since the container clips rather than reflows.
  const chips: { label: string; top: string; left?: string; right?: string }[] = [
    { label: "80-POINT REPORT", top: "18%", left: "9%" },
    { label: "ON-SITE VERIFIED", top: "78%", left: "38%" },
    { label: "RERA REGISTERED", top: "34%", right: "5%" },
  ];
  // Bare index points (no label) — density/thoroughness cues only.
  const bareIndex = [
    { n: 2, cx: 340, cy: 300 },
    { n: 4, cx: 560, cy: 70 },
    { n: 6, cx: 980, cy: 330 },
  ];
  const filledIndex = [
    { n: 1, cx: 130, cy: 120 },
    { n: 3, cx: 480, cy: 350 },
    { n: 5, cx: 1200, cy: 150 },
  ];
  return (
    <div
      aria-hidden="true"
      className="relative aspect-4/3 w-full overflow-hidden bg-paper-raised sm:aspect-1400/460"
    >
      <svg viewBox="0 0 1400 460" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
        <defs>
          <pattern id="hero-eb-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" stroke="var(--color-line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1400" height="460" fill="url(#hero-eb-grid)" />

        {/* dominant footprint — deliberately asymmetric, bled off the left
            edge (negative x, cropped by the container) rather than
            centered, so it reads as one large document photographed in
            frame, not a diagram politely fitted to its box */}
        <rect x="-40" y="40" width="480" height="330" stroke="var(--color-ink-soft)" strokeWidth="1.75" opacity="0.6" />
        <path
          d="M-40 150h480M180 40v330M-40 260h480"
          stroke="var(--color-ink-soft)"
          strokeWidth="1"
          opacity="0.22"
        />

        {/* two supporting footprints at clearly smaller scale — hierarchy,
            not a repeated unit */}
        <rect x="560" y="140" width="230" height="170" stroke="var(--color-ink-soft)" strokeWidth="1.5" opacity="0.4" />
        <rect x="870" y="220" width="140" height="110" stroke="var(--color-ink-soft)" strokeWidth="1.5" opacity="0.3" />

        {/* true dimension lines — tick-capped, with a measured value, the
            actual convention a survey drawing uses, not a decorative tick */}
        <g stroke="var(--color-brand-dark)" strokeWidth="1.5">
          <path d="M-40 24h480M-40 16v16M440 16v16" />
        </g>
        <text x="200" y="14" textAnchor="middle" fontSize="13" fill="var(--color-brand-dark)" fontWeight="600" letterSpacing="0.02em">
          68.2 M
        </text>
        <g stroke="var(--color-muted)" strokeWidth="1.25" opacity="0.7">
          <path d="M500 40v330M492 40h16M492 370h16" />
        </g>
        <text x="516" y="210" fontSize="12" fill="var(--color-muted)" opacity="0.85" transform="rotate(90 516 210)" textAnchor="middle">
          112.4 M
        </text>

        {/* orientation indicator */}
        <g stroke="var(--color-muted)" strokeWidth="1.5" opacity="0.6">
          <path d="M1330 40v40l-8 -14M1330 40l8 14" />
        </g>
        <text x="1330" y="102" textAnchor="middle" fontSize="13" fill="var(--color-muted)" opacity="0.7">
          N
        </text>

        {/* six-point evidence index — three filled/orange + labeled
            (real facts), three outlined/neutral + bare (density only) */}
        {bareIndex.map((p) => (
          <g key={p.n}>
            <circle cx={p.cx} cy={p.cy} r="10" fill="var(--color-paper-raised)" stroke="var(--color-ink-soft)" strokeWidth="1.25" opacity="0.55" />
            <text x={p.cx} y={p.cy + 4} textAnchor="middle" fontSize="10" fill="var(--color-ink-soft)" opacity="0.7">
              {p.n}
            </text>
          </g>
        ))}
        {filledIndex.map((p) => (
          <g key={p.n}>
            <circle cx={p.cx} cy={p.cy} r="11" fill="var(--color-brand-dark)" />
            <text x={p.cx} y={p.cy + 4} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">
              {p.n}
            </text>
          </g>
        ))}

        {/* large faint plate caption, bled to the frame's own edge —
            ties Hero/Comparison/Journey together as one numbered "FIG."
            system (see those components) without touching real text */}
        <text x="0" y="440" fontSize="46" fontWeight="800" fill="var(--color-ink)" opacity="0.06" letterSpacing="0.01em">
          FIG. 01 — SITE EVIDENCE
        </text>
      </svg>

      {/* Chip positions are authored as percentages of this wide desktop
          plate — they only line up correctly once the container's own
          aspect ratio matches it at `sm:aspect-1400/460`. Below that, the
          box is a squarer 4:3 (so the SVG can crop-to-fill via `slice`
          instead of letterboxing), and a % position no longer points at
          the same visual spot. Hidden below `sm`, not shrunk — the same
          "hide rather than shrink" rule the mobile VerificationLine tick
          already follows, and the three facts are already real text in
          the subhead/reassurance line above, so nothing is lost. */}
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="absolute hidden items-center gap-1.5 whitespace-nowrap bg-paper px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-soft shadow-sm sm:flex sm:text-[11px]"
          style={{ top: chip.top, left: chip.left, right: chip.right }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
          {chip.label}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pb-14 pt-10 sm:pt-10 md:pb-20 md:pt-14 lg:pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start gap-2">
          <span
            role="group"
            className="grid items-center text-eyebrow font-semibold uppercase tracking-[0.14em] text-brand-dark"
            aria-label={hero.eyebrowRotation.join(" — ")}
          >
            {hero.eyebrowRotation.map((phrase) => (
              <span
                key={phrase}
                className="eyebrow-phrase whitespace-nowrap"
                aria-hidden="true"
              >
                {phrase}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-brand-dark" />
        </div>

        <div className="mt-5 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h1 className="text-display font-extrabold leading-[1.08] tracking-tight text-ink lg:col-span-8 lg:text-display-lg lg:leading-[1.04]">
            <Headline text={hero.headline} accent="reality" />
          </h1>

          <div className="mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:max-w-none">
              {hero.subhead}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover sm:text-base"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand-dark sm:text-base"
              >
                {hero.secondaryCta.label}
              </a>
            </div>

            <p className="mt-4 text-metadata font-medium text-muted">
              {hero.reassurance}
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed evidence band — scale and a contrasting surface tone
          (not a photo) carry the "visual event" the Coperni/Les Grandes
          Serres references use large media for. A negative margin here
          was tried and reverted — at this headline size it pulled the
          band up far enough to physically cover "see the reality," which
          is a legibility failure, not an intentional layered composition.
          The "FIG. 01" caption bleeding to the plate's own bottom edge
          carries the overlap idea instead, without touching real text. */}
      <div className="relative mt-10 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen sm:mt-12 lg:mt-14">
        <EvidenceDiagram />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <VerificationLine points={hero.verificationPoints} />
      </div>
    </section>
  );
}
