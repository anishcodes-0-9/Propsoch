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
    <section id="reality" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p aria-hidden="true" className="text-xs font-bold tracking-[0.2em] text-brand-dark">
          01
        </p>
        <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
          <AccentWord text={brochureReality.heading} accent="reality" />
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {brochureReality.copy}
        </p>
      </div>

      <BrochureRealityCompare />
    </section>
  );
}
