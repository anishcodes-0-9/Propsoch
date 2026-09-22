import { brochureReality } from "@/lib/content";
import BrochureRealityCompare from "./BrochureRealityCompare";

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

export default function BrochureReality() {
  return (
    <section id="reality" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Oversized section numeral — a decorative anchor bleeding
              slightly outside the heading's own corner, supporting
              typography only (the comparison widget below is the
              section's actual communication device). aria-hidden exempts
              it from screen readers, but WCAG contrast still applies to
              anything visually rendered as text: a first-pass 15% opacity
              only reached ~1.2:1 against paper and failed axe's 3:1
              large-text minimum outright. 80% is the lowest opacity that
              clears it with real margin (~3.6:1). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 -top-9 select-none text-[clamp(3.75rem,3rem+3vw,6rem)] font-extrabold leading-none text-brand-dark/80 sm:-top-11 lg:-top-14"
          >
            01
          </span>

          <div className="relative lg:col-span-7">
            <h2 className="text-h2 font-extrabold tracking-tight text-ink">
              <AccentWord text={brochureReality.heading} accent="reality" />
            </h2>
          </div>

          <div className="relative mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="text-base leading-relaxed text-ink-soft">
              {brochureReality.copy}
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed: the actual comparison, not the intro copy, carries this
          section's visual weight. No forced aspect ratio — height follows
          the panels' own content. */}
      <div className="mt-12 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen sm:mt-14 lg:mt-16">
        <BrochureRealityCompare />
      </div>
    </section>
  );
}
