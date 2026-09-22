import { journey } from "@/lib/content";

export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="border-t border-line bg-paper-raised py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p aria-hidden="true" className="text-xs font-bold tracking-[0.2em] text-brand-dark">
            02
          </p>
          <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">{journey.heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{journey.copy}</p>
        </div>

        <ol className="relative mt-14 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:gap-0">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-5 top-2 w-px bg-line lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden h-px bg-line lg:block"
          />

          {journey.stages.map((stage, index) => (
            <li
              key={stage.day}
              className="relative flex gap-4 lg:flex-1 lg:flex-col lg:items-center lg:gap-4 lg:px-3 lg:text-center"
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-paper-raised text-sm font-bold text-brand-dark">
                {index + 1}
              </div>
              <div className="pb-1 lg:pb-0">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                  {stage.day}
                </p>
                <h3 className="mt-1 text-base font-bold text-ink">{stage.title}</h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-soft lg:mx-auto lg:max-w-[14rem]">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-14 text-center text-sm font-semibold text-brand-dark lg:mt-16">
          {journey.conclusion}
        </p>
      </div>
    </section>
  );
}
