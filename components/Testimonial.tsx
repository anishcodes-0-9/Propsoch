import Image from "next/image";
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
        <footer className="mt-5 flex items-center gap-3 text-sm text-muted">
          <p>
            <span className="font-semibold text-ink-soft">{testimonial.name}</span>
            {" — "}
            {testimonial.role}
          </p>
          {/* First-party Propsoch asset (see docs/PHASE4_MEDIA_LAYER_PLAN.md
              provenance) — a quiet confirmation of the employer already
              named in the role text above, not a "Deloitte endorses
              Propsoch" badge. Decorative: the name is already real text. */}
          <Image
            src="/images/logos/deloitte.webp"
            alt=""
            aria-hidden="true"
            width={358}
            height={96}
            className="h-3.5 w-auto shrink-0 opacity-60"
          />
        </footer>
      </div>
    </section>
  );
}
