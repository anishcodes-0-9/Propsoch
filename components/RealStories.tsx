"use client";

import { useState } from "react";
import { realStories } from "@/lib/content";

// Lazy YouTube facade — a static thumbnail (YouTube's own public thumbnail
// CDN, img.youtube.com; this is the standard "lite embed" pattern, not the
// player) until explicitly activated. No iframe, no YouTube player JS, and
// no third-party request heavier than one small poster image exists before
// a click or Enter/Space. youtube-nocookie.com is used for the eventual
// embed to minimise tracking once a video is actually requested.
function VideoStage({
  youtubeId,
  label,
  active,
  onActivate,
}: {
  youtubeId: string;
  label: string;
  active: boolean;
  onActivate: () => void;
}) {
  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={label}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label={`Play video: ${label}`}
      className="group relative aspect-video w-full overflow-hidden bg-ink"
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-55"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-ink/20" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:h-20 sm:w-20"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 text-brand-dark sm:h-7 sm:w-7" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="absolute bottom-3 right-3.5 text-[10px] font-bold uppercase tracking-wide text-white/80 sm:bottom-4 sm:right-4">
        FIG. 04 — STORIES
      </span>
    </button>
  );
}

export default function RealStories() {
  const [selected, setSelected] = useState(0);
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const story = realStories.stories[selected];

  function select(index: number) {
    setSelected(index);
    // Switching stories always drops back to the facade — only one video
    // is ever mounted at a time, and never carries over to a different
    // person's story.
    setActiveVideoKey(null);
  }

  return (
    <section id="stories" className="border-t border-line bg-paper-raised py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-xs font-bold tracking-tight text-brand-dark">
              {realStories.eyebrow}
            </p>
            <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-ink">
              {realStories.heading}
            </h2>
          </div>
          <div className="mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <p className="text-base leading-relaxed text-ink-soft">{realStories.copy}</p>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="lg:col-span-7">
            {story.youtubeId ? (
              <VideoStage
                youtubeId={story.youtubeId}
                label={`Testimonial from ${story.name}`}
                active={activeVideoKey === story.youtubeId}
                onActivate={() => setActiveVideoKey(story.youtubeId!)}
              />
            ) : (
              <div className="flex aspect-video w-full flex-col justify-center border border-line bg-paper px-8 sm:px-12">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 24"
                  className="h-8 w-8 text-brand-soft"
                  fill="currentColor"
                >
                  <path d="M0 24V13.6C0 6 4.9 1 12.6 0l1.2 3.6C9 4.9 6.4 7.7 6 12h6.6v12H0Zm18 0V13.6C18 6 22.9 1 30.6 0l1.2 3.6C27 4.9 24.4 7.7 24 12h6.6v12H18Z" />
                </svg>
                <blockquote className="mt-4 text-xl font-semibold leading-snug text-ink sm:text-2xl">
                  “{story.quote}”
                </blockquote>
              </div>
            )}

            <div className="mt-5">
              <p className="text-base font-bold text-ink">{story.name}</p>
              <p className="text-sm text-muted">{story.role}</p>
              {story.youtubeId && story.quote && (
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                  “{story.quote}”
                </blockquote>
              )}
            </div>
          </div>

          {/* Selector rail — every name/role/quote already exists in the
              DOM here regardless of which is "active," so the full set of
              4 real testimonials is present and crawlable even though only
              one is shown large at a time. */}
          <ol className="mt-10 flex flex-col gap-0 border-t border-line lg:col-span-4 lg:col-start-9 lg:mt-0">
            {realStories.stories.map((s, i) => (
              <li key={s.name} className="border-b border-line">
                <button
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => select(i)}
                  className={`flex w-full items-start gap-3 py-4 text-left transition-colors ${
                    selected === i ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span
                    className={`mt-0.5 text-xs font-bold tabular-nums ${
                      selected === i ? "text-brand-dark" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{s.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">{s.role}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
