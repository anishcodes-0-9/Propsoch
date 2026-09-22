// Continuous CSS-only marquee — a single `translateX` loop, no JS/carousel
// library. The track holds `items` twice back-to-back; translating exactly
// -50% moves by one full set-width, so the loop is seamless (see the
// `.marquee-track`/`@keyframes marquee` rules in app/globals.css). The
// duplicate set is `aria-hidden` so screen readers hear the list once, and
// a fully static, wrapped fallback renders instead under
// `prefers-reduced-motion`. Extracted from TrustBar — generic over any
// string list, not just trust logos.
export default function Marquee({ items }: { items: string[] }) {
  return (
    <>
      <ul className="hidden flex-wrap items-center gap-x-8 gap-y-3 motion-reduce:flex sm:gap-x-10">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm font-bold tracking-tight text-muted sm:text-base"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* The wrapper's mask fades its own first ~6% to transparent. At rest
          (translateX(0), before the loop has moved anything) that fade
          zone sits directly on top of whatever is the first item, clipping
          it. A blank leading spacer — the same width in both halves, so
          the two "sides" of the -50% loop stay equal-width and the wrap
          stays seamless — pushes real text past the fade zone instead. */}
      <div className="marquee-wrapper relative overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-x-10 sm:gap-x-12">
          <li aria-hidden="true" className="w-10 shrink-0 sm:w-16" />
          {items.map((item) => (
            <li
              key={item}
              className="shrink-0 text-sm font-bold tracking-tight text-muted sm:text-base"
            >
              {item}
            </li>
          ))}
          <li aria-hidden="true" className="w-10 shrink-0 sm:w-16" />
          {items.map((item) => (
            <li
              key={`dup-${item}`}
              aria-hidden="true"
              className="shrink-0 text-sm font-bold tracking-tight text-muted sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
