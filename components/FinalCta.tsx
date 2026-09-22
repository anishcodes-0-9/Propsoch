import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="bg-ink py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Asymmetric 60/35 split, deliberately rhyming with Hero's own
            asymmetric grid — an intentional bookend, not a coincidence.
            Distinct from Comparison (full-bleed) and Journey (uneven
            row): this is the one place the split is a simple two-column
            close, since it's the page's conclusion, not a signature
            moment of its own. */}
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-xs font-bold tracking-tight text-brand">
              03
            </p>
            <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-white">
              {finalCta.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              {finalCta.subhead}
            </p>
            <a
              href={finalCta.cta.href}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover sm:text-base"
            >
              {finalCta.cta.label}
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-4 lg:col-span-4 lg:col-start-9 lg:mt-0">
            {finalCta.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-white/85">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand"
                  fill="none"
                >
                  <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.25" />
                  <path
                    d="M6.5 10.2l2.2 2.2 4.8-4.9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
