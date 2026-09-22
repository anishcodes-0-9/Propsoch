"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { brochureReality } from "@/lib/content";

// Propsoch's own product-page master-plan pair (first-party CDN assets,
// see docs/PHASE4_MEDIA_LAYER_PLAN.md for provenance/licensing notes):
// the glossy 3D amenity render buyers see in sales material, versus
// Propsoch's own annotated technical plan flagging what it doesn't show.
const BROCHURE_IMAGE = {
  src: "/images/comparison-brochure.webp",
  alt: "Glossy 3D rendered site masterplan showing tower blocks, amenities and landscaping — the kind of render shown in sales material.",
};
const REALITY_IMAGE = {
  src: "/images/comparison-reality.webp",
  alt: "Propsoch's annotated technical site plan for the same project, flagging a transformer yard, a high-tension line, an unsanctioned area and a water treatment plant near the towers.",
};
// Native asset ratio (~988:687) — not a forced 16:9, and the ceiling the
// two images actually render at (see the performance note in the plan doc).
const IMAGE_RATIO = "988 / 687";

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
    <div>
      {/* The interactive comparison is images only — no text lives inside
          the clipped layers. Both panels previously placed their label at
          the same coordinates, so once the boundary swept past roughly the
          panel's midpoint the two labels/point-lists visibly spliced into
          each other (found during drag testing, e.g. "REALCHURE"). Corner
          tags now sit at opposite corners (reality top-left, since that's
          the side revealed first; brochure top-right, the side it recedes
          from last) so they never occupy the same pixels regardless of
          split position. Full captions/points move to a static block below
          that's always fully visible — see the two-column section after
          this widget. */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        className="relative w-full overflow-hidden md:cursor-ew-resize"
        style={{ aspectRatio: IMAGE_RATIO }}
      >
        {/* Brochure layer — bottom, always full */}
        <div className="absolute inset-0">
          <Image
            src={BROCHURE_IMAGE.src}
            alt={BROCHURE_IMAGE.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute top-4 right-4 rounded-full bg-paper-raised/95 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-sm sm:top-5 sm:right-5">
            {brochureReality.brochure.label}
          </span>
        </div>

        {/* Reality layer — top, clipped to the current split */}
        <div
          ref={realityLayerRef}
          className="absolute inset-0 border-l-2 border-brand bg-paper-raised transition-[clip-path] duration-200 ease-out"
          // Bound to `mobileSplit` (not a fixed constant) so a re-render
          // never resets this back to a stale value — see onMobileToggle.
          // On desktop, mobileSplit never changes, so this stays inert while
          // paint() drives the value imperatively during drag.
          style={{ clipPath: `inset(0 ${100 - mobileSplit}% 0 0)` }}
        >
          <Image
            src={REALITY_IMAGE.src}
            alt={REALITY_IMAGE.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 rounded-full bg-brand-dark/95 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm sm:top-5 sm:left-5">
            {brochureReality.reality.label}
          </span>
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

      {/* Mobile: tap-toggle, no drag — keeps vertical scroll unambiguous on
          touch. Plain underline tabs, not filled pills — consistent with
          the retired-rounded-card policy. Horizontal padding here matches
          the panels' own edge inset, since this row sits inside the same
          full-bleed strip with no page padding of its own. py-3.5 keeps
          each tap target at/above the 44px touch-target minimum. */}
      <div
        className="flex gap-2 border-t border-line px-7 md:hidden sm:px-10"
        role="group"
        aria-label="Choose which side to view"
      >
        <button
          type="button"
          aria-pressed={mobileSplit === MOBILE_DEFAULT}
          onClick={() => onMobileToggle(MOBILE_DEFAULT)}
          className="flex-1 border-b-2 border-transparent py-3.5 text-sm font-semibold text-ink-soft transition-colors aria-pressed:border-ink aria-pressed:text-ink"
        >
          {brochureReality.brochure.label}
        </button>
        <button
          type="button"
          aria-pressed={mobileSplit === MAX}
          onClick={() => onMobileToggle(MAX)}
          className="flex-1 border-b-2 border-transparent py-3.5 text-sm font-semibold text-ink-soft transition-colors aria-pressed:border-brand-dark aria-pressed:text-brand-dark"
        >
          {brochureReality.reality.label}
        </button>
      </div>

      {/* Static supporting detail — never clipped, always fully visible for
          both sides regardless of where the slider sits, so nothing is
          gated behind the drag interaction and there's no shared-coordinate
          text to splice. */}
      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:pt-14">
        <div>
          <span className="text-base font-extrabold uppercase tracking-wide text-ink sm:text-lg">
            {brochureReality.brochure.label}
          </span>
          <p className="mt-2 text-sm font-medium text-muted">{brochureReality.brochure.caption}</p>
          <ul className="mt-6 space-y-3.5">
            {brochureReality.brochure.points.map((point) => (
              <XRow key={point} label={point} />
            ))}
          </ul>
        </div>
        <div className="mt-10 lg:mt-0">
          <span className="text-base font-extrabold uppercase tracking-wide text-brand-dark sm:text-lg">
            {brochureReality.reality.label}
          </span>
          <p className="mt-2 text-sm font-medium text-brand-dark">{brochureReality.reality.caption}</p>
          <ul className="mt-6 space-y-3.5">
            {brochureReality.reality.points.map((point) => (
              <CheckRow key={point} label={point} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
