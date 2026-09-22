import { trust } from "@/lib/content";

export default function TrustBar() {
  return (
    <section
      aria-label="Trusted by buyers from"
      className="border-y border-line bg-paper-raised"
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
          {trust.heading}
        </p>

        {/* Reduced-motion fallback: the plain wrapped row, always fully visible. */}
        <ul className="mt-6 hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 motion-reduce:flex sm:gap-x-10">
          {trust.companies.map((company) => (
            <li key={company} className="text-sm font-bold tracking-tight text-muted sm:text-base">
              {company}
            </li>
          ))}
        </ul>

        {/* Continuous marquee: CSS transform only, no library. The duplicate
            set is aria-hidden so screen readers hear the list once. */}
        <div className="marquee-wrapper relative mt-6 overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-x-10 sm:gap-x-12">
            {trust.companies.map((company) => (
              <li
                key={company}
                className="shrink-0 text-sm font-bold tracking-tight text-muted sm:text-base"
              >
                {company}
              </li>
            ))}
            {trust.companies.map((company) => (
              <li
                key={`dup-${company}`}
                aria-hidden="true"
                className="shrink-0 text-sm font-bold tracking-tight text-muted sm:text-base"
              >
                {company}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-line pt-8 md:grid-cols-4 md:gap-x-6">
          {trust.stats.map((stat) => (
            <p key={stat.label} className="text-center">
              <span className="block text-h3 font-extrabold tracking-tight text-brand-dark">
                {stat.value}
              </span>
              <span className="mt-1 block text-xs text-muted sm:text-sm">{stat.label}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
