import { testimonial } from "@/lib/content";

export default function Testimonial() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      {/* An inset, offset pull-quote rather than a centered block — the
          page's one deliberate "rest beat" between Journey's active
          progression and Final CTA's conclusion. No signature-moment
          treatment on purpose: not every section needs one. */}
      <div className="relative lg:ml-[15%] lg:w-[58%]">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 24"
          className="h-8 w-8 text-brand-soft lg:absolute lg:-left-14 lg:top-1 lg:h-12 lg:w-12"
          fill="currentColor"
        >
          <path d="M0 24V13.6C0 6 4.9 1 12.6 0l1.2 3.6C9 4.9 6.4 7.7 6 12h6.6v12H0Zm18 0V13.6C18 6 22.9 1 30.6 0l1.2 3.6C27 4.9 24.4 7.7 24 12h6.6v12H18Z" />
        </svg>
        <blockquote className="mt-6 text-xl font-semibold leading-snug text-ink sm:text-2xl lg:mt-0">
          “{testimonial.quote}”
        </blockquote>
        {/* Text-only attribution — the employer is already named here, so a
            second, separate wordmark badge would restate the same fact
            twice in the same few words of space. Also sidesteps reusing a
            Propsoch-sourced brand asset for a fact the text already
            carries on its own; see docs/PHASE4_MEDIA_LAYER_PLAN.md §8 for
            the broader asset-provenance/rights discussion. */}
        <footer className="mt-5 text-sm text-muted">
          <span className="font-semibold text-ink-soft">{testimonial.name}</span>
          {" — "}
          {testimonial.role}
        </footer>
      </div>
    </section>
  );
}
