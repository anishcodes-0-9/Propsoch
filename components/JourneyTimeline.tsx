"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/content";

// J2 "annotated site-plan rail" — replaces the Phase 5-v1 attempt at real
// per-project photography (five unrelated project master plans; dropped
// after review because none of them actually corresponded to the stage
// they sat behind — see docs/PHASE4_MEDIA_LAYER_PLAN.md §8). This version
// is one shared, self-authored diagram — the same visual language as the
// Hero's EvidenceDiagram — that gets MORE annotated as the stage index
// increases, so the image itself tells the story ("evidence accumulates
// as the process progresses") instead of just decorating it. Each added
// layer maps directly to real copy already in `journey.stages`, not a
// new claim: shortlist → site visit → Peace of Mind report → closed deal.
const LAYER_LABELS = [
  null, // stage 0 (Today): bare plan, nothing surveyed yet
  "SHORTLIST DRAFTED",
  "SITE VISIT LOGGED",
  "PEACE OF MIND REPORT",
  "DEAL CLOSED",
];

function JourneyDiagram({ revealed, gridId }: { revealed: number; gridId: string }) {
  const chips = [
    { label: LAYER_LABELS[1], top: "10%", left: "6%" },
    { label: LAYER_LABELS[2], top: "58%", left: "8%" },
    { label: LAYER_LABELS[3], top: "16%", left: "54%" },
    { label: LAYER_LABELS[4], top: "68%", left: "50%" },
  ];
  // Lines "draw" via stroke-dashoffset (a real progression cue, not just a
  // fade); shapes "pop" via a small scale transform. Both read as the
  // evidence being actively added, not merely toggled visible — this is
  // the diagram itself demonstrating "accumulates," legible before any
  // paragraph is read. Static per-instance on mobile (each stage mounts
  // once at its own fixed `revealed` value, so there's nothing to
  // transition from — motion only exists where there's live progression
  // to show, i.e. the shared desktop viewport).
  return (
    <div className="relative h-full w-full bg-paper-raised">
      <svg viewBox="0 0 400 320" className="h-full w-full" fill="none">
        <defs>
          <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" stroke="var(--color-line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill={`url(#${gridId})`} />

        {/* base footprint — always visible from stage 1 on */}
        <rect x="70" y="60" width="140" height="100" stroke="var(--color-ink-soft)" strokeWidth="1.5" opacity="0.55" />
        <rect x="150" y="130" width="120" height="120" stroke="var(--color-ink-soft)" strokeWidth="1.5" opacity="0.55" />

        {/* layer 1: measurement ticks, drawn in stroke-first */}
        <path
          d="M70 60v-14M210 60v-14M150 130h-14M270 130h14"
          stroke="var(--color-brand-dark)"
          strokeWidth="1.75"
          strokeDasharray="120"
          strokeDashoffset={revealed >= 1 ? 0 : 120}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />

        {/* layer 2: on-site verification marker — pops in at its own point */}
        <g
          style={{ transform: revealed >= 2 ? "scale(1)" : "scale(0)", transformOrigin: "110px 100px" }}
          className="transition-transform duration-500 ease-out"
        >
          <circle cx="110" cy="100" r="5" fill="var(--color-brand-dark)" />
          <path d="M116 100h16" stroke="var(--color-brand-dark)" strokeWidth="1.5" />
        </g>

        {/* layer 3: flagged evidence callout — same red-flag-on-plan
            language as the Comparison section's real annotated image */}
        <g
          style={{ transform: revealed >= 3 ? "scale(1)" : "scale(0)", transformOrigin: "197px 177px" }}
          className="transition-transform duration-500 ease-out"
        >
          <rect x="190" y="170" width="14" height="14" rx="2" fill="var(--color-brand)" opacity="0.85" />
          <path d="M197 177v10" stroke="var(--color-brand)" strokeWidth="1.5" />
        </g>

        {/* layer 4: closure seal — ring pops, checkmark draws a beat after */}
        <g style={{ transform: revealed >= 4 ? "scale(1)" : "scale(0)", transformOrigin: "320px 70px" }} className="transition-transform duration-500 ease-out">
          <circle cx="320" cy="70" r="18" stroke="var(--color-brand-dark)" strokeWidth="1.75" />
        </g>
        <path
          d="M312 70l6 6 12-13"
          stroke="var(--color-brand-dark)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="30"
          strokeDashoffset={revealed >= 4 ? 0 : 30}
          className="transition-[stroke-dashoffset] delay-200 duration-500 ease-out"
        />
      </svg>

      {chips.map((chip, i) => (
        <span
          key={chip.label}
          className="absolute flex items-center gap-1.5 whitespace-nowrap bg-paper px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-ink-soft shadow-sm transition-opacity duration-500 ease-out sm:text-[10px]"
          style={{ top: chip.top, left: chip.left, opacity: revealed >= i + 1 ? 1 : 0 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
          {chip.label}
        </span>
      ))}

      {/* Numeric progress — legible at a glance, before reading any stage
          copy: "how much evidence exists right now." Ties into the same
          "FIG." numbered-plate system as the Hero and Comparison. */}
      <div className="absolute bottom-2 right-2.5 flex items-baseline gap-1 text-[9px] font-bold uppercase tracking-wide text-muted sm:bottom-3 sm:right-3 sm:text-[10px]">
        <span>FIG. 02</span>
        <span className="text-ink-soft">— EVIDENCE {String(Math.max(revealed, 0)).padStart(2, "0")}/04</span>
      </div>
    </div>
  );
}

function StageMarker({ position }: { position: "start" | "end" | "mid" }) {
  if (position === "start") {
    return (
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-dark"
      />
    );
  }
  if (position === "end") {
    return (
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rotate-45 bg-brand-dark"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-dark"
    />
  );
}

// Shared vertical rule + per-stage marker language — the same motif the
// previous mobile layout already used, now doing double duty as the
// desktop text column too, since both are vertical stacks in this
// redesign.
function StageList({
  activeIndex,
  onStageRef,
}: {
  activeIndex: number;
  onStageRef: (el: HTMLLIElement | null, index: number) => void;
}) {
  return (
    <ol className="relative flex flex-col gap-8">
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-1 w-px bg-line" />
      <StageMarker position="start" />
      <StageMarker position="end" />
      {journey.stages.map((stage, index) => (
        <li
          key={stage.day}
          ref={(el) => onStageRef(el, index)}
          data-stage-index={index}
          className="relative pl-6 lg:pr-4"
        >
          <StageMarker position="mid" />
          <p
            className={`text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${
              index === activeIndex ? "text-brand-dark" : "text-muted lg:text-muted"
            }`}
          >
            {String(index + 1).padStart(2, "0")} — {stage.day}
          </p>
          <h3 className="mt-1.5 text-base font-bold text-ink">{stage.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{stage.description}</p>
          {/* Mobile: each stage shows the diagram at its own cumulative
              reveal state — no shared viewport or IntersectionObserver
              needed, just a static render per stage. */}
          <div
            aria-hidden="true"
            className="relative mt-4 aspect-5/4 w-full overflow-hidden border border-line lg:hidden"
          >
            <JourneyDiagram revealed={index} gridId={`jg-m-${index}`} />
          </div>
        </li>
      ))}
    </ol>
  );
}

// Desktop-only: a single shared, sticky viewport beside the scrolling text
// column, showing the cumulative annotation state for whichever stage is
// currently active.
function MediaViewport({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden aspect-5/4 w-full overflow-hidden border border-line lg:block"
    >
      <JourneyDiagram revealed={activeIndex} gridId="jg-desktop" />
    </div>
  );
}

export default function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  const setStageRef = (el: HTMLLIElement | null, index: number) => {
    stageRefs.current[index] = el;
  };

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-stage-index"));
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      // A thin horizontal band near vertical center — the stage crossing
      // that band is treated as "active", independent of scroll speed.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="journey"
      className="border-t border-line bg-paper-raised py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-xs font-bold tracking-tight text-brand-dark">
              02
            </p>
            <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
              {journey.heading}
            </h2>
          </div>
          <div className="mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="text-base leading-relaxed text-ink-soft">{journey.copy}</p>
          </div>
        </div>

        <div className="mt-14 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <StageList activeIndex={activeIndex} onStageRef={setStageRef} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-24">
              <MediaViewport activeIndex={activeIndex} />
            </div>
          </div>
        </div>

        <p className="mt-14 text-center text-sm font-semibold text-brand-dark lg:mt-16 lg:text-left">
          {journey.conclusion}
        </p>
      </div>
    </section>
  );
}
