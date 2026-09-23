import { faq } from "@/lib/content";

// Native <details>/<summary> — every question's full answer is real,
// server-rendered text in the DOM from first paint, open or closed, with
// zero JavaScript required to reach it. That's a deliberate improvement
// over production's own FAQ, whose answers are only mounted into the DOM
// once a Radix accordion item is opened client-side (checked directly:
// closed items render as empty content divs in the initial HTML) — this
// version is crawlable in a way production's currently is not. Keyboard
// support, focus-visibility and category grouping all come from native
// semantics, not a custom ARIA pattern to get right.
// FAQPage structured data — every question/answer pair here is real,
// verbatim content from production's own FAQ (see lib/content.ts), so this
// accurately describes what's on the page rather than asserting anything
// invented for SEO purposes.
function faqJsonLd() {
  const items = faq.categories.flatMap((c) => c.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export default function Faq() {
  return (
    <section id="faq" className="border-t border-line py-16 sm:py-20 md:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <h2 className="text-h2 font-extrabold tracking-tight text-ink">{faq.heading}</h2>
          </div>
          <div className="mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="text-base leading-relaxed text-ink-soft">{faq.copy}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-12 sm:mt-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {faq.categories.map((category) => (
            <div key={category.label}>
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                {category.label}
              </h3>
              <div className="mt-4 border-t border-line">
                {category.items.map((item) => (
                  <details key={item.q} className="group border-b border-line py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden sm:text-base">
                      <span>{item.q}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                        fill="none"
                      >
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
