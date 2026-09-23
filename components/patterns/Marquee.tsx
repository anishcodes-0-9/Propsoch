// Trust-bar wordmarks — text only, no logo images. Previously used
// first-party logo assets pulled from propsoch.com's own CDN; removed
// after the assignment brief was checked directly and found to say
// nothing granting rights to reproduce their site content, so there was
// no genuine authorization to rely on (see
// docs/PHASE4_MEDIA_LAYER_PLAN.md §8.3). Naming which companies a
// testimonial's employer works for, in plain text, doesn't carry the
// same reproduction question a copied logo image does.
//
// Grayscale/muted at rest; full color, full opacity and a small scale on
// hover OR keyboard focus — never both a hover pause and a color change, the
// marquee's own translateX keeps running the whole time (parent and child
// transforms compose independently on their own boxes). tabIndex={0} makes
// each real (non-duplicate) wordmark reachable so keyboard users get the same
// state mouse users get; the duplicate half stays untabbable.
function Logo({ name, focusable }: { name: string; focusable: boolean }) {
  // `text-muted` at rest, not `text-ink-soft` faded via `opacity-60` — the
  // opacity approach was inherited from when these were grayscale *logo
  // images* (WCAG's logotype exception covers those). Once every company
  // became real text, opacity-based fading blended it down to ~3.25:1
  // against the section's white background — a real, caught-by-axe
  // failure, not a false positive. `text-muted` at full opacity measures
  // ~5.2:1 here and still reads as the same "quiet until interacted with"
  // treatment.
  return (
    <span
      tabIndex={focusable ? 0 : undefined}
      className="flex h-6 shrink-0 items-center text-sm font-extrabold tracking-tight text-muted transition-[color,scale] duration-300 hover:scale-105 hover:text-ink focus-visible:scale-105 focus-visible:text-ink sm:h-7 sm:text-base"
    >
      {name}
    </span>
  );
}

export default function Marquee({ items }: { items: string[] }) {
  return (
    <>
      <ul className="hidden flex-wrap items-center gap-x-8 gap-y-4 motion-reduce:flex sm:gap-x-10">
        {items.map((item) => (
          <li key={item}>
            <Logo name={item} focusable />
          </li>
        ))}
      </ul>

      {/* The wrapper's mask fades its own first ~6% to transparent. At rest
          (translateX(0), before the loop has moved anything) that fade
          zone sits directly on top of whatever is the first item, clipping
          it. A blank leading spacer — the same width in both halves, so
          the two "sides" of the -50% loop stay equal-width and the wrap
          stays seamless — pushes real content past the fade zone instead. */}
      <div className="marquee-wrapper relative overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-x-10 sm:gap-x-12">
          <li aria-hidden="true" className="w-10 shrink-0 sm:w-16" />
          {items.map((item) => (
            <li key={item}>
              <Logo name={item} focusable />
            </li>
          ))}
          <li aria-hidden="true" className="w-10 shrink-0 sm:w-16" />
          {items.map((item) => (
            <li key={`dup-${item}`} aria-hidden="true">
              <Logo name={item} focusable={false} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
