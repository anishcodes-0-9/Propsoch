import { journey } from "@/lib/content";

// Uneven rhythm, not five equal cards: "Today" and "Last week" are quick
// beats, "Week 1"/"Week 3" carry the most actual work and get more room.
// Percentages sum to 100 and are applied as flex-basis (inline style, not
// a Tailwind arbitrary class — these are one-off values for this exact
// five-stage list, not a reusable scale, and dynamically-built class
// names wouldn't survive Tailwind's static build-time scan anyway).
const DESKTOP_WIDTHS = [15, 25, 20, 25, 15];

export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="border-t border-line bg-paper-raised py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-xs font-bold tracking-tight text-brand-dark">
              02
            </p>
            <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
              {journey.heading}
            </h2>
          </div>
          <div className="mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="text-base leading-relaxed text-ink-soft">{journey.copy}</p>
          </div>
        </div>

        {/* Desktop: one continuous baseline rule, uneven-width stages
            threaded along it — not five equal cards. Each stage's own
            tick mark drops from the shared rule, echoing the Hero's
            measurement-line motif rather than introducing a new device. */}
        <ol className="mt-14 hidden border-t border-line pt-7 lg:mt-16 lg:flex">
          {journey.stages.map((stage, index) => (
            <li
              key={stage.day}
              style={{ flexBasis: `${DESKTOP_WIDTHS[index]}%` }}
              className="relative shrink-0 pr-6"
            >
              <span
                aria-hidden="true"
                className="absolute -top-7 left-0 h-2.5 w-px bg-brand-dark"
              />
              <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                {String(index + 1).padStart(2, "0")} — {stage.day}
              </p>
              <h3 className="mt-2 text-base font-bold text-ink">{stage.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Mobile: a genuine vertical sequence, not a shrunk version of the
            desktop row — one continuous rule down the left edge, stages
            read top-to-bottom in order. Chronology is carried by the
            numbers and day labels, not by color alone. */}
        <ol className="relative mt-14 flex flex-col gap-8 lg:hidden">
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-1 w-px bg-line" />
          {journey.stages.map((stage, index) => (
            <li key={stage.day} className="relative pl-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                {String(index + 1).padStart(2, "0")} — {stage.day}
              </p>
              <h3 className="mt-1.5 text-base font-bold text-ink">{stage.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-14 text-center text-sm font-semibold text-brand-dark lg:mt-16 lg:text-left">
          {journey.conclusion}
        </p>
      </div>
    </section>
  );
}
