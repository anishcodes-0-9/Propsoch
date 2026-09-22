import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-raised">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <a href="#top" className="text-base font-extrabold tracking-tight text-ink">
            Props<span className="text-brand">och</span>
          </a>
          <p className="mt-2 text-xs text-muted">
            © {footer.year} {footer.company}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-ink-soft hover:text-brand-dark"
            >
              {link.label}
            </a>
          ))}
          <a href={`mailto:${footer.email}`} className="text-sm text-ink-soft hover:text-brand-dark">
            {footer.email}
          </a>
        </nav>

        <ul className="flex items-center gap-4">
          {footer.social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-ink-soft hover:text-brand-dark"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
