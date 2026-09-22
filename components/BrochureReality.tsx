import { brochureReality } from "@/lib/content";

// Splits a single word out of `text` and wraps it in the serif-italic accent
// face. Sparing by design — this is the only accent treatment in this section.
function AccentWord({ text, accent }: { text: string; accent: string }) {
  const index = text.indexOf(accent);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <em className="font-accent font-normal italic text-brand-dark">{accent}</em>
      {text.slice(index + accent.length)}
    </>
  );
}

function XRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-ink-soft">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 h-4.5 w-4.5 shrink-0 text-muted"
        fill="none"
      >
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
        <path
          d="M7.2 7.2l5.6 5.6M12.8 7.2l-5.6 5.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </li>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm font-medium text-ink">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand"
        fill="none"
      >
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
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

export default function BrochureReality() {
  return (
    <section id="reality" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-h2 font-extrabold tracking-tight text-ink">
          <AccentWord text={brochureReality.heading} accent="reality" />
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {brochureReality.copy}
        </p>
      </div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-2 md:gap-0">
        {/* Brochure panel */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-[repeating-linear-gradient(135deg,var(--color-line)_0px,var(--color-line)_1px,transparent_1px,transparent_14px)] bg-paper-raised p-7 md:rounded-r-none md:border-r-0 md:p-10">
          <span className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {brochureReality.brochure.label}
          </span>
          <p className="mt-3 text-sm font-medium text-muted">
            {brochureReality.brochure.caption}
          </p>
          <ul className="mt-6 space-y-3.5">
            {brochureReality.brochure.points.map((point) => (
              <XRow key={point} label={point} />
            ))}
          </ul>
        </div>

        {/* Divider seal — desktop only, sits on the seam between panels */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-paper bg-brand text-white shadow-lg md:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Reality panel */}
        <div className="relative rounded-2xl border-2 border-brand bg-brand-tint p-7 shadow-sm md:rounded-l-none md:p-10">
          <span className="inline-flex rounded-full bg-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {brochureReality.reality.label}
          </span>
          <p className="mt-3 text-sm font-medium text-brand-dark">
            {brochureReality.reality.caption}
          </p>
          <ul className="mt-6 space-y-3.5">
            {brochureReality.reality.points.map((point) => (
              <CheckRow key={point} label={point} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
