"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { brochureReality } from "@/lib/content";

// Replaces the earlier propsoch.com-sourced image pair — see
// docs/PHASE4_MEDIA_LAYER_PLAN.md §8.3 for why: the assignment brief was
// checked directly and says nothing granting rights to reproduce site
// content, so no genuine assessment-context authorization exists, and
// Propsoch's own Terms of Use prohibit it. Both panels below are fully
// self-authored SVG, sharing one footprint layout (same "site," two
// lenses) so the reveal still reads as "the same place, annotated
// differently" rather than two unrelated images. Same visual grammar as
// the Hero (FIG. 01) and Journey (FIG. 02) diagrams — this is FIG. 03.
const IMAGE_RATIO = "988 / 687";

function BrochurePanel() {
  return (
    <svg viewBox="0 0 988 687" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none" aria-hidden="true">
      <rect width="988" height="687" fill="var(--color-brand-tint)" />
      {/* soft, rounded, unannotated massing — polished but says nothing */}
      <rect x="180" y="120" width="280" height="320" rx="18" fill="var(--color-brand-soft)" />
      <path d="M200 170h240M200 210h240M200 250h240M200 290h240" stroke="var(--color-paper)" strokeWidth="3" opacity="0.6" />
      <rect x="480" y="230" width="240" height="210" rx="18" fill="var(--color-brand-soft)" opacity="0.8" />
      <path d="M498 270h204M498 305h204M498 340h204" stroke="var(--color-paper)" strokeWidth="3" opacity="0.6" />
      <ellipse cx="330" cy="530" rx="90" ry="46" fill="var(--color-paper)" opacity="0.7" />
      {[
        [120, 480], [720, 160], [760, 500], [140, 570], [860, 320], [610, 560],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="14" fill="var(--color-brand-dark)" opacity="0.12" />
      ))}
    </svg>
  );
}

function RealityPanel() {
  const flags: { label: string; x: number; y: number; lx: number; ly: number }[] = [
    { label: "ORIENTATION CHECKED", x: 180, y: 120, lx: 60, ly: 90 },
    { label: "BOUNDARY VERIFIED", x: 720, y: 440, lx: 640, ly: 480 },
  ];
  return (
    <svg viewBox="0 0 988 687" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <pattern id="cmp-reality-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" stroke="var(--color-line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="988" height="687" fill="var(--color-paper-raised)" />
      <rect width="988" height="687" fill="url(#cmp-reality-grid)" />
      {/* same footprint coordinates as the brochure panel — sharp, not
          rounded; outlined, not filled — the same site, technically read */}
      <rect x="180" y="120" width="280" height="320" stroke="var(--color-ink-soft)" strokeWidth="1.75" opacity="0.7" />
      <path d="M180 240h280M320 120v320" stroke="var(--color-ink-soft)" strokeWidth="1" opacity="0.25" />
      <rect x="480" y="230" width="240" height="210" stroke="var(--color-ink-soft)" strokeWidth="1.75" opacity="0.7" />
      <ellipse cx="330" cy="530" rx="90" ry="46" stroke="var(--color-muted)" strokeWidth="1.5" opacity="0.6" />
      {/* measurement ticks */}
      <path d="M180 120v-18M460 120v-18M180 102h280" stroke="var(--color-brand-dark)" strokeWidth="1.75" />
      <text x="320" y="90" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--color-brand-dark)">
        58.6 M
      </text>
      {flags.map((f) => (
        <g key={f.label}>
          <circle cx={f.x} cy={f.y} r="6" fill="var(--color-brand-dark)" />
          <path d={`M${f.x} ${f.y}L${f.lx} ${f.ly}`} stroke="var(--color-brand-dark)" strokeWidth="1.5" />
          <rect x={f.lx - 4} y={f.ly - 18} width={f.label.length * 6.6 + 16} height="22" fill="var(--color-paper)" opacity="0.95" />
          <text x={f.lx + 4} y={f.ly - 3} fontSize="10.5" fontWeight="700" letterSpacing="0.03em" fill="var(--color-ink-soft)">
            {f.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

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
  // Below `md` this is inert (the tap-toggle buttons drive mobile instead).
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

  // Fine-pointer (mouse/trackpad) hover-follow — no press required. Gated
  // on `event.pointerType`, not a media query, since that's the actual
  // signal for "this device can hover": a touchscreen simply never fires
  // pointermove without a finger down, so it falls through to the
  // pointerdown-drag path above untouched, and a real mouse gets both
  // (hover already tracks it continuously; a click+drag on top of that is
  // just redundant, not conflicting). rAF-throttled so a fast mouse sweep
  // triggers at most one `setSplit` per frame, not one per raw event.
  const hoverRafRef = useRef<number | null>(null);
  const onPointerMoveHover = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      if (draggingRef.current) return; // an active drag already owns the update
      const container = containerRef.current;
      if (!container) return;
      const clientX = event.clientX;
      if (hoverRafRef.current !== null) return;
      hoverRafRef.current = requestAnimationFrame(() => {
        hoverRafRef.current = null;
        const rect = container.getBoundingClientRect();
        widthRef.current = rect.width;
        setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
      });
    },
    [setSplit]
  );

  const onPointerEnterHover = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const handle = handleRef.current;
    if (handle) handle.style.transition = "none";
    if (realityLayerRef.current) realityLayerRef.current.style.transition = "none";
  }, []);

  const onPointerLeaveHover = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    if (draggingRef.current) return; // an active drag has its own cleanup on pointerup
    const handle = handleRef.current;
    if (handle) handle.style.transition = "";
    if (realityLayerRef.current) realityLayerRef.current.style.transition = "";
  }, []);

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
        onPointerMove={onPointerMoveHover}
        onPointerEnter={onPointerEnterHover}
        onPointerLeave={onPointerLeaveHover}
        className="relative w-full overflow-hidden md:cursor-ew-resize"
        style={{ aspectRatio: IMAGE_RATIO }}
      >
        {/* Brochure layer — bottom, always full */}
        <div className="absolute inset-0">
          <BrochurePanel />
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
          <RealityPanel />
          <span className="absolute top-4 left-4 rounded-full bg-brand-dark/95 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm sm:top-5 sm:left-5">
            {brochureReality.reality.label}
          </span>
        </div>

        {/* Same numbered "FIG." plate caption as the Hero and Journey
            diagrams — one system across the three, not three unrelated
            treatments. Also the signal that the contained width at `xl+`
            (see BrochureReality.tsx) is a deliberate plate, not a shrunk
            leftover of the old full-bleed version. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 z-10 hidden bg-paper/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-soft shadow-sm sm:block sm:bottom-4 sm:right-4"
        >
          FIG. 03 — BROCHURE VS REALITY
        </span>

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
