import { trust } from "@/lib/content";
import Marquee from "./patterns/Marquee";

export default function TrustBar() {
  return (
    <section
      aria-label="Trusted by buyers from"
      className="border-y border-line bg-paper-raised"
    >
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        {/* Band 1 — label + marquee, asymmetric row at md+ */}
        <div className="md:grid md:grid-cols-4 md:items-center md:gap-x-8">
          <p className="text-left text-eyebrow font-semibold uppercase tracking-wider text-muted md:col-span-1">
            {trust.heading}
          </p>
          <div className="mt-5 md:col-span-3 md:mt-0">
            <Marquee items={trust.companies} />
          </div>
        </div>

        {/* Band 2 — stats as flat evidence, not cards */}
        <div className="mt-16 border-t border-line sm:mt-20">
          {/* Mobile: 2x2 grid, rule dividers only */}
          <div className="grid grid-cols-2 border-l border-line md:hidden">
            {trust.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-r border-line px-5 py-7 sm:px-6"
              >
                <p className="text-3xl font-extrabold tracking-tight text-brand-dark">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-metadata text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Desktop: single left-aligned row, thin vertical rules */}
          <div className="hidden pt-10 md:flex">
            {trust.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 pr-8 ${i > 0 ? "border-l border-line pl-8" : ""}`}
              >
                <p className="text-4xl font-extrabold tracking-tight text-brand-dark">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-metadata text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
