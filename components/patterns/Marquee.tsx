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

      <div className="marquee-wrapper relative overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-x-10 sm:gap-x-12">
          {items.map((item) => (
            <li
              key={item}
              className="shrink-0 text-sm font-bold tracking-tight text-muted sm:text-base"
            >
              {item}
            </li>
          ))}
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
