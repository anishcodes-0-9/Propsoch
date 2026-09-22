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
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Marker shrunk from a large decorative background numeral to an
              inline editorial tag — matching Journey's "02" and Final CTA's
              "03" — so the comparison widget below, not the numeral, carries
              the section's visual weight. */}
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-xs font-bold tracking-tight text-brand-dark">
              01
            </p>
            <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
              <AccentWord text={brochureReality.heading} accent="reality" />
            </h2>
          </div>

          <div className="mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
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
