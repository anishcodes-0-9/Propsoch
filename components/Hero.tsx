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

function CheckRow({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px] font-medium text-ink-soft">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4.5 w-4.5 shrink-0 text-brand"
        fill="none"
      >
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
        <path
          d="M6.5 10.2l2.2 2.2 4.8-4.9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </li>
  );
}

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-sm select-none sm:max-w-md lg:max-w-none"
    >
      <div className="relative aspect-[5/4] w-full">
        {/* Back card: the "brochure" — glossy, generic, all upside */}
        <div className="absolute left-0 top-2 w-[78%] -rotate-6 rounded-2xl border border-line bg-paper-raised p-4 shadow-md sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Builder Brochure
            </span>
            <span className="rounded-full bg-brand-dark px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              For Sale
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="col-span-2 h-14 rounded-lg bg-line/70 sm:h-16" />
            <div className="h-14 rounded-lg bg-line/70 sm:h-16" />
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-5/6 rounded-full bg-line" />
            <div className="h-1.5 w-3/5 rounded-full bg-line" />
          </div>
        </div>

        {/* Front card: the "reality" — verified, specific, trustworthy */}
        <div className="absolute bottom-0 right-0 w-[74%] rotate-2 rounded-2xl border border-line bg-paper-raised p-4 pt-5 shadow-xl sm:p-5 sm:pt-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
              Reality Check
            </span>
            <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">
              80+ verified
            </span>
          </div>
          <ul className="space-y-2">
            <CheckRow label="Layout & sunlight, checked on-site" />
            <CheckRow label="Builder track record reviewed" />
            <CheckRow label="RERA & legal status confirmed" />
          </ul>

          {/* Magnifying glass — the investigation motif, pinned to the card corner so
              it never collides with the header text at any viewport width. */}
          <div className="absolute -left-5 -top-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-paper bg-brand text-white shadow-lg sm:h-12 sm:w-12">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M19 19l-3.8-3.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 md:pt-14 md:pb-20 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-dark">
            {hero.eyebrow}
          </span>

          <h1 className="mt-4 text-display font-extrabold leading-[1.05] tracking-tight text-ink">
            <AccentWord text={hero.headline} accent="reality" />
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {hero.subhead}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          <p className="mt-4 text-xs font-medium text-muted">{hero.reassurance}</p>
        </div>

        <div className="lg:order-last">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
