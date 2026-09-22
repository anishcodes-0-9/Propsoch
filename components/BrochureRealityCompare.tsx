"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { brochureReality } from "@/lib/content";

const MIN = 0;
const MAX = 100;
const KEY_STEP = 5;
const DESKTOP_DEFAULT = 35;
const MOBILE_DEFAULT = 0;

function clamp(value: number) {
  return Math.min(MAX, Math.max(MIN, value));
}

function XRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-ink-soft">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-muted" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
        <path d="M7.2 7.2l5.6 5.6M12.8 7.2l-5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {label}
    </li>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm font-medium text-ink">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" fill="none">
        <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
        <path
          d="M6.5 10.2l2.2 2.2 4.8-4.9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </li>
  );
}

export default function BrochureRealityCompare() {
  const containerRef = useRef<HTMLDivElement>(null);
  const realityLayerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef(DESKTOP_DEFAULT);
  const widthRef = useRef(0);
  const draggingRef = useRef(false);

  // Only used for the two mobile toggle buttons' pressed styling — updated on
  // discrete clicks, never during drag, so a React re-render here is fine.
  const [mobileSplit, setMobileSplit] = useState(MOBILE_DEFAULT);

  const paint = useCallback((percent: number) => {
    const reality = realityLayerRef.current;
    const handle = handleRef.current;
    if (!reality || !handle) return;
    reality.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    handle.style.transform = `translateX(${(percent / 100) * widthRef.current}px)`;
    handle.setAttribute("aria-valuenow", String(Math.round(percent)));
    handle.setAttribute(
      "aria-valuetext",
      `${Math.round(percent)}% Propsoch reality revealed, ${100 - Math.round(percent)}% brochure`
    );
  }, []);

  const setSplit = useCallback(
    (percent: number) => {
      splitRef.current = clamp(percent);
      paint(splitRef.current);
    },
    [paint]
  );

  // Position everything once, before first paint, so there's no visible jump
  // from a 0% starting point to the real default.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    widthRef.current = container.getBoundingClientRect().width;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const initial = isDesktop ? DESKTOP_DEFAULT : MOBILE_DEFAULT;
    splitRef.current = initial;
    paint(initial);

    const onResize = () => {
      if (!container) return;
      widthRef.current = container.getBoundingClientRect().width;
      paint(splitRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint]);

  // Attached to the whole container, not just the thin handle line, so
  // clicking/tapping anywhere in the comparison jumps + starts a drag from
  // that point — the 2px line alone is too small a target to require.
  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const handle = handleRef.current;
      if (!container || !handle || window.matchMedia("(max-width: 767px)").matches) return;
      // Cache the rect once per drag — never re-read layout inside pointermove.
      const rect = container.getBoundingClientRect();
      widthRef.current = rect.width;
      draggingRef.current = true;
      handle.style.transition = "none";
      if (realityLayerRef.current) realityLayerRef.current.style.transition = "none";
      container.setPointerCapture(event.pointerId);
      setSplit(clamp(((event.clientX - rect.left) / rect.width) * 100));
      handle.focus();

      const move = (moveEvent: PointerEvent) => {
        if (!draggingRef.current) return;
        setSplit(clamp(((moveEvent.clientX - rect.left) / rect.width) * 100));
      };
      const up = () => {
        draggingRef.current = false;
        handle.style.transition = "";
        if (realityLayerRef.current) realityLayerRef.current.style.transition = "";
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [setSplit]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      let next: number | null = null;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = splitRef.current - KEY_STEP;
      else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = splitRef.current + KEY_STEP;
      else if (event.key === "Home") next = MIN;
      else if (event.key === "End") next = MAX;
      if (next === null) return;
      event.preventDefault();
      widthRef.current = container.getBoundingClientRect().width;
      setSplit(next);
    },
    [setSplit]
  );

  const onMobileToggle = (percent: number) => {
    setSplit(percent);
    setMobileSplit(percent);
  };

  return (
    <div className="mt-12">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        className="relative grid overflow-hidden rounded-2xl border border-line shadow-sm md:cursor-ew-resize"
      >
        {/* Brochure layer — bottom, always full */}
        <div className="relative col-start-1 row-start-1 overflow-hidden bg-[repeating-linear-gradient(135deg,var(--color-line)_0px,var(--color-line)_1px,transparent_1px,transparent_14px)] bg-paper-raised p-7 sm:p-10">
          <span className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {brochureReality.brochure.label}
          </span>
          <p className="mt-3 text-sm font-medium text-muted">{brochureReality.brochure.caption}</p>
          <ul className="mt-6 space-y-3.5">
            {brochureReality.brochure.points.map((point) => (
              <XRow key={point} label={point} />
            ))}
          </ul>
        </div>

        {/* Reality layer — top, clipped to the current split */}
        <div
          ref={realityLayerRef}
          className="relative col-start-1 row-start-1 overflow-hidden border-l-2 border-brand bg-brand-tint p-7 transition-[clip-path] duration-200 ease-out sm:p-10"
          // Bound to `mobileSplit` (not a fixed constant) so a re-render
          // never resets this back to a stale value — see onMobileToggle.
          // On desktop, mobileSplit never changes, so this stays inert while
          // paint() drives the value imperatively during drag.
          style={{ clipPath: `inset(0 ${100 - mobileSplit}% 0 0)` }}
        >
          <span className="inline-flex rounded-full bg-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {brochureReality.reality.label}
          </span>
          <p className="mt-3 text-sm font-medium text-brand-dark">{brochureReality.reality.caption}</p>
          <ul className="mt-6 space-y-3.5">
            {brochureReality.reality.points.map((point) => (
              <CheckRow key={point} label={point} />
            ))}
          </ul>
        </div>

        {/* Drag handle — desktop only; hidden from mobile's tab order entirely */}
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={DESKTOP_DEFAULT}
          aria-valuetext={`${DESKTOP_DEFAULT}% Propsoch reality revealed, ${100 - DESKTOP_DEFAULT}% brochure`}
          aria-label="Compare the broker brochure with Propsoch's reality check. Drag, or use the arrow keys."
          onKeyDown={onKeyDown}
          className="absolute inset-y-0 left-0 z-10 hidden w-0 touch-none items-stretch justify-center outline-none md:flex"
          // No `transform` here on purpose — it's set imperatively (paint())
          // and, unlike the reality layer, is never re-derived from state, so
          // it must not appear in JSX or a stray re-render would reset it.
          // Safe because the handle is display:none on mobile, the only place
          // mobileSplit-driven re-renders happen.
          style={{ transition: "transform 200ms ease-out" }}
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-brand-dark" />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-0 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-paper bg-brand-dark text-white shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
              <path
                d="M8 7l-4 5 4 5M16 7l4 5-4 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Mobile: tap-toggle, no drag — keeps vertical scroll unambiguous on touch */}
      <div className="mt-4 flex gap-2 md:hidden" role="group" aria-label="Choose which side to view">
        <button
          type="button"
          aria-pressed={mobileSplit === MOBILE_DEFAULT}
          onClick={() => onMobileToggle(MOBILE_DEFAULT)}
          className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
        >
          {brochureReality.brochure.label}
        </button>
        <button
          type="button"
          aria-pressed={mobileSplit === MAX}
          onClick={() => onMobileToggle(MAX)}
          className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors aria-pressed:border-brand-dark aria-pressed:bg-brand-dark aria-pressed:text-white"
        >
          {brochureReality.reality.label}
        </button>
      </div>
    </div>
  );
}
