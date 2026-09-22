"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        <a href="#top" className="text-lg font-extrabold tracking-tight text-ink">
          Props<span className="text-brand-dark">och</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={nav.cta.href}
          className="hidden rounded-full bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover md:inline-block"
        >
          {nav.cta.label}
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper-raised px-5 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink-soft hover:bg-brand-tint hover:text-brand-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-brand-dark px-5 py-3 text-center text-sm font-semibold text-white"
          >
            {nav.cta.label}
          </a>
        </div>
      )}
    </header>
  );
}
