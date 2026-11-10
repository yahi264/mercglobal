import { asset } from "@/lib/asset";

// First-visit opening sequence (about 5 seconds, skippable, once per browser session):
//  1. A 3D dotted globe turns to face Türkiye.
//  2. Red workforce routes fly in from the four sourcing regions (Turkic/CIS, Africa, Asia, Europe & Balkans)
//     to the Ankara head office, which pulses with each arrival; then routes leave Ankara for project
//     countries taken from the company's reference list (Saudi Arabia, Qatar, UAE, Iraq, Kuwait, Oman, Libya…).
//  3. The camera dives into Ankara, the Merç "M" mark draws itself, the name rises in.
//  4. A red ring opens from the centre and reveals the website.
// The globe is drawn on a <canvas> by public/intro-globe.js (built by scripts/make-land-dots.mjs);
// everything else is CSS (globals.css, "Intro"). Visitors who prefer reduced motion never see it.
// For checking a single moment, add ?introAt=2.1 (seconds) to the address: the globe stops at that time.

// Two arches made of three parallel lines, joined in the middle with a small ring — the Merç mark.
const lines = [
  "M10 96 V46 A25 25 0 0 1 60 46 A25 25 0 0 1 110 46 V96",
  "M17 96 V46 A18 18 0 0 1 53 46 V96",
  "M67 96 V46 A18 18 0 0 1 103 46 V96",
  "M24 96 V46 A11 11 0 0 1 46 46 V96",
  "M74 96 V46 A11 11 0 0 1 96 46 V96",
];

export function Intro({ tagline, skip }: { tagline: string; skip: string }) {
  const name = "MERÇ GLOBAL";
  return (
    <div id="intro" aria-hidden="true">
      <div className="intro-panel">
        <div className="intro-glow" />
        <div className="intro-grid" />
        <canvas id="intro-canvas" className="intro-canvas" suppressHydrationWarning />
        <script src={asset("/intro-globe.js")} async />
        <div className="intro-brand relative flex flex-col items-center px-6 text-center">
          <svg viewBox="0 0 120 104" className="intro-mark h-24 w-28 sm:h-28 sm:w-32" fill="none">
            {lines.map((d, i) => (
              <path key={d} d={d} pathLength={1} className="intro-path" style={{ "--i": i } as React.CSSProperties} />
            ))}
            <circle cx="60" cy="30" r="4.5" pathLength={1} className="intro-path intro-dot" style={{ "--i": 5 } as React.CSSProperties} />
          </svg>
          <p className="intro-name mt-7 text-3xl font-extrabold tracking-[0.18em] text-white sm:text-5xl" dir="ltr">
            {name.split("").map((c, i) => (
              <span key={i} className={`intro-letter ${i >= 5 ? "text-brand" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                {c === " " ? " " : c}
              </span>
            ))}
          </p>
          <p className="intro-tag mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60 sm:text-xs">{tagline}</p>
          <div className="intro-bar mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <span className="block h-full w-full bg-brand" />
          </div>
        </div>
        <span className="intro-skip-hint absolute bottom-6 end-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">{skip}</span>
      </div>
      <div className="intro-ring" />
    </div>
  );
}
