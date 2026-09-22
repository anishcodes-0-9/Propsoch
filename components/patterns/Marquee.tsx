import Image from "next/image";

// Propsoch trust/company logos — the companies its own "Trusted by buyers
// from" bar names (first-party CDN assets, see docs/PHASE4_MEDIA_LAYER_PLAN.md
// for provenance) — keyed by company name so this stays independent of
// `lib/content.ts`'s own `trust.companies` list. Intrinsic width/height are
// each logo's real optimized-asset dimensions (next/image needs these for its
// aspect-ratio math; the CSS below is what actually controls display size).
//
// xto10x has no entry: the live Propsoch site's own carousel mislabels its
// xto10x slide with NVIDIA's logo image (a bug on their end, confirmed by
// inspecting their rendered markup — nvidia-logo.png is not used under any
// slide actually labeled "Nvidia"). Reusing that mismatched asset here would
// misattribute NVIDIA's mark to xto10x, so xto10x renders as a text wordmark
// below instead of a fabricated/mismatched logo image.
const LOGOS: Record<string, { src: string; width: number; height: number }> = {
  Amazon: { src: "/images/logos/amazon.webp", width: 159, height: 48 },
  Google: { src: "/images/logos/google.webp", width: 143, height: 48 },
  Microsoft: { src: "/images/logos/microsoft.webp", width: 225, height: 48 },
  Jupiter: { src: "/images/logos/jupiter.webp", width: 161, height: 48 },
  Deloitte: { src: "/images/logos/deloitte.webp", width: 358, height: 96 },
  Flipkart: { src: "/images/logos/flipkart.webp", width: 364, height: 96 },
  Atlassian: { src: "/images/logos/atlassian.webp", width: 288, height: 96 },
  PhonePe: { src: "/images/logos/phonepe.webp", width: 315, height: 96 },
  Navi: { src: "/images/logos/navi.webp", width: 356, height: 96 },
};

// Grayscale/muted at rest; full color, full opacity and a small scale on
// hover OR keyboard focus — never both a hover pause and a color change, the
// marquee's own translateX keeps running the whole time (parent and child
// transforms compose independently on their own boxes). tabIndex={0} makes
// each real (non-duplicate) logo reachable so keyboard users get the same
// state mouse users get; the duplicate half stays untabbable (img isn't
// focusable by default, and it's already aria-hidden).
function Logo({ name, focusable }: { name: string; focusable: boolean }) {
  const logo = LOGOS[name];
  if (logo) {
    return (
      <Image
        src={logo.src}
        alt={name}
        width={logo.width}
        height={logo.height}
        tabIndex={focusable ? 0 : undefined}
        className="h-6 w-auto shrink-0 grayscale opacity-60 transition-[filter,opacity,scale] duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 focus-visible:scale-105 focus-visible:opacity-100 focus-visible:grayscale-0 sm:h-7"
      />
    );
  }
  // No legitimate logo asset exists for this company (see the LOGOS comment
  // above) — render its name as a plain wordmark instead of a fabricated or
  // mismatched logo image, at the same visual weight/height as its neighbors.
  return (
    <span
      tabIndex={focusable ? 0 : undefined}
      className="flex h-6 shrink-0 items-center text-sm font-extrabold tracking-tight text-ink-soft opacity-60 transition-[opacity,color,scale] duration-300 hover:scale-105 hover:opacity-100 hover:text-ink focus-visible:scale-105 focus-visible:opacity-100 focus-visible:text-ink sm:h-7 sm:text-base"
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
