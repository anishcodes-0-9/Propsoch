import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="bg-ink py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-h2 font-extrabold tracking-tight text-white">
          {finalCta.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
          {finalCta.subhead}
        </p>

        <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
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

        <a
          href={finalCta.cta.href}
          className="mt-9 inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover sm:text-base"
        >
          {finalCta.cta.label}
        </a>
      </div>
    </section>
  );
}
