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
// as it always did — `lg:block` is what forces the break. This keeps the
// oversized `--text-display-lg` scale from ever having to prove it fits
// a forced 3-line break on a 320px viewport; it only has to fit at
// widths wide enough to opt into it.
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
// Domain-specific supporting evidence, not an abstract diagram — and
// fully decorative to assistive tech, since every label here also
// appears as real, readable text in the Comparison section below.
// First/last ticks are edge-anchored (safe at any width, since they
// extend inward from the section's own padding); the middle tick only
// joins at `md` and up, where there's clearly room for a third label —
// this is the "compresses to fewer ticks on mobile" behavior from the
// redesign plan, not a full hide.
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

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 md:pt-14 md:pb-20 lg:pt-20">
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

      <VerificationLine points={hero.verificationPoints} />
    </section>
  );
}
