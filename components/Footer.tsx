import { footer, finalCta } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        {/* Final chapter statement + CTA — the footer's own close, distinct
            from the page's Final CTA section above it (different words, not
            a repeat), so scrolling this far still ends on an ask. */}
        <div className="border-b border-white/15 pb-10 sm:pb-12">
          <h2 className="max-w-lg text-h3 font-extrabold tracking-tight text-white">
            Ready to buy with more certainty?
          </h2>
          <a
            href={finalCta.cta.href}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            {finalCta.cta.label}
          </a>
        </div>

        <div className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Identity + legal block */}
          <div className="lg:col-span-5">
            <a href="#top" className="text-lg font-extrabold tracking-tight text-white">
              Props<span className="text-brand">och</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              {footer.tagline}
            </p>

            <dl className="mt-6 space-y-1 text-xs text-white/45">
              <div className="flex gap-1.5">
                <dt className="shrink-0">GSTIN</dt>
                <dd>{footer.legal.gstin}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="shrink-0">CIN</dt>
                <dd>{footer.legal.cin}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-2.5">
              {footer.legal.rera.map((r) => (
                <li key={r.label} className="text-xs text-white/45">
                  <span className="block">{r.label}</span>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-white/70 hover:text-white"
                  >
                    {r.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-4 lg:col-start-7">
            {footer.columns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-bold uppercase tracking-wide text-white/45">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact + social */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/45">Contact</p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-3 block text-sm text-white/70 hover:text-white"
            >
              {footer.email}
            </a>
            <ul className="mt-5 flex items-center gap-4">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/45 sm:mt-14">
          © {footer.year} {footer.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
