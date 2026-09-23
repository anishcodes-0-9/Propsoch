import { featuredIn } from "@/lib/content";

// Self-authored editorial "clipping wall" — no publication mastheads are
// reproduced; each card is the publication's name set in type, with a
// slight per-card rotation for the newspaper-wall feel production's own
// (image-based) media wall goes for. Rotation is a static inline style
// derived from index, not an animation, so it costs nothing and needs no
// reduced-motion override; the only actual transition is the hover/focus
// straighten.
function rotationFor(index: number) {
  const pattern = [-4, 3, -2.5, 4, -3.5, 2, -4.5, 3, -2, 4, -3];
  return pattern[index % pattern.length];
}

export default function FeaturedIn() {
  return (
    <section aria-label={featuredIn.heading} className="border-t border-line py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="md:grid md:grid-cols-4 md:items-center md:gap-x-8">
          <div className="md:col-span-1">
            <h2 className="text-h3 font-extrabold tracking-tight text-ink">{featuredIn.heading}</h2>
            <p className="mt-2 text-metadata text-muted">FIG. 05 — PROOF</p>
          </div>

          <ul
            className="mt-8 flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 md:col-span-3 md:mt-0 md:flex-wrap md:overflow-visible md:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {featuredIn.publications.map((name, i) => (
              <li key={name} className="group shrink-0 snap-start">
                {/* Static per-card rotation lives on the outer box (a
                    layout choice, not motion); the hover/focus lift lives
                    on the inner box as its own, independent transform —
                    the same "compose on separate boxes" pattern Marquee's
                    logo hover already uses. The global reduced-motion rule
                    in globals.css collapses the lift's transition to
                    instant; the tilt itself is unaffected, since it never
                    moves. */}
                <div className="h-16 w-32" style={{ transform: `rotate(${rotationFor(i)}deg)` }}>
                  <span className="flex h-full w-full items-center justify-center border border-line bg-paper-raised px-3 text-center text-sm font-bold tracking-tight text-ink-soft transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:text-ink group-hover:shadow-sm group-focus-within:-translate-y-0.5 group-focus-within:text-ink">
                    {name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
