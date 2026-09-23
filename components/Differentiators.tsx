"use client";

import { useState, type KeyboardEvent } from "react";
import { differentiators } from "@/lib/content";

// FIG.-numbered editorial comparison instrument, in the same visual family
// as the Hero/Journey/Comparison diagrams: a large index numeral for the
// active row, a thin marker line that tracks it, and the competing answer
// quieted rather than hidden — Propsoch's answer always reads first and
// strongest. Row activation is driven by hover (desktop), tap (mobile) and
// arrow/Home/End keys (any device) against one shared `active` index, so
// all three input models move the exact same state — no separate "mobile
// version" of the interaction to keep in sync.
export default function Differentiators() {
  const [modeIndex, setModeIndex] = useState(0);
  const [active, setActive] = useState(0);
  const mode = differentiators.modes[modeIndex];
  const rows = mode.rows;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, rows.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(rows.length - 1);
    }
  }

  return (
    <section id="different" className="border-t border-line py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-xs font-bold tracking-tight text-brand-dark">
              01
            </p>
            <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
              {differentiators.heading}
            </h2>
          </div>
          <div className="mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="text-base leading-relaxed text-ink-soft">{differentiators.copy}</p>
          </div>
        </div>

        {/* Mode switch — "Compare our services with" Local brokers / Online
            portals, the same framing production uses, since these are two
            genuinely different competitor row-sets, not a relabel. */}
        <div className="mt-10 flex items-center gap-3 lg:mt-12">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Compare with
          </span>
          <div className="flex gap-1.5">
            {differentiators.modes.map((m, i) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={modeIndex === i}
                onClick={() => {
                  setModeIndex(i);
                  setActive(0);
                }}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  modeIndex === i
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-line text-ink-soft hover:border-brand-dark hover:text-brand-dark"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* The instrument itself. `active` numeral + rows, all real content
            in the DOM at all times — the "active" row is a visual emphasis
            state via className, never a mount/unmount, so nothing here
            depends on JS to be readable or crawlable. */}
        <div
          role="group"
          aria-label={`How Propsoch differs from ${mode.competitorLabel}, by category`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-8 grid gap-x-8 focus-visible:outline-none lg:mt-10 lg:grid-cols-12"
        >
          {/* Large index numeral of the active row — the "editorial
              numeral" callout, updates with `active` but doesn't require
              motion to convey meaning (reduced-motion users still see the
              correct number, just without the transition). */}
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p
                aria-hidden="true"
                className="font-accent text-[7rem] font-normal italic leading-none text-brand transition-colors duration-300"
              >
                {String(active + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-ink">
                {rows[active].dimension}
              </p>
              <p className="mt-4 text-metadata text-muted">FIG. 06 — DIFFERENTIATION</p>
            </div>
          </div>

          <ol className="border-t border-line lg:col-span-9">
            {rows.map((row, i) => {
              const isActive = active === i;
              return (
                <li key={row.dimension} className="relative border-b border-line">
                  {/* Thin marker line that tracks the active row — same
                      "measurement line follows the active point" language
                      as Hero's dimension lines. */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-0.5 bg-brand-dark transition-transform duration-300 ease-out ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                    style={{ transformOrigin: "top" }}
                  />
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onFocus={() => setActive(i)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse" || e.pointerType === "pen") setActive(i);
                    }}
                    onClick={() => setActive(i)}
                    className="grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-5 pl-5 text-left sm:grid-cols-[3rem_1fr] sm:py-6 sm:pl-6"
                  >
                    <span
                      className={`text-sm font-bold tabular-nums transition-colors duration-300 ${
                        isActive ? "text-brand-dark" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl ${
                        isActive ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {row.dimension}
                    </span>
                  </button>

                  {/* Propsoch vs competitor answers — always in the DOM at
                      full legible contrast; "quieter" is conveyed by color
                      token and border weight only, never by opacity. An
                      earlier pass here dimmed this text with opacity, the
                      same mistake Marquee's logo hover made before it was
                      caught by axe (see that file's comments) — informational
                      text can't be allowed to fall below contrast minimums
                      just because it's the "inactive" side of the row. */}
                  <div className="grid grid-cols-1 gap-4 px-5 pb-6 sm:grid-cols-2 sm:pl-6 sm:pr-6">
                    <div
                      className={`border-l-2 pl-3.5 transition-colors duration-300 ${
                        isActive ? "border-brand-dark" : "border-line"
                      }`}
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                        Propsoch
                      </p>
                      <p className="mt-1 text-sm font-semibold text-ink sm:text-base">
                        {row.propsoch}
                      </p>
                    </div>
                    <div className="border-l-2 border-line pl-3.5">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted">
                        {mode.competitorLabel}
                      </p>
                      <p className="mt-1 text-sm text-ink-soft sm:text-base">{row.competitor}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
