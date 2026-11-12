import { asset } from "@/lib/asset";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n";

// First-visit opening sequence (about 3 seconds, skippable, once per browser session):
//  1. A 3D dotted globe turns to face Türkiye.
//  2. Red workforce routes fly in from the four sourcing regions (Turkic/CIS, Africa, Asia, Europe & Balkans)
//     to the Ankara head office, which pulses with each arrival; then routes leave Ankara for project
//     countries taken from the company's reference list (Saudi Arabia, Qatar, UAE, Iraq, Kuwait, Oman, Libya…).
//  3. The camera dives into Ankara and the company's original logo appears.
//  4. A red ring opens from the centre and reveals the website.
// The globe is drawn on a <canvas> by public/intro-globe.js (built by scripts/make-land-dots.mjs);
// everything else is CSS (globals.css, "Intro"). Visitors who prefer reduced motion never see it.
// For checking a single moment, add ?introAt=2.1 (seconds) to the address: the globe stops at that time.

export function Intro({ tagline, skip, locale }: { tagline: string; skip: string; locale: Locale }) {
  const name = "MERÇ GLOBAL";
  return (
    <div id="intro" aria-hidden="true">
      <div className="intro-panel">
        <div className="intro-glow" />
        <div className="intro-grid" />
        <canvas id="intro-canvas" className="intro-canvas" suppressHydrationWarning />
        <script src={asset("/intro-globe.js")} async />
        <div className="intro-brand relative flex flex-col items-center px-5 text-center">
          <div className="intro-logo w-full max-w-[calc(100vw-40px)] flex justify-center">
            <Logo locale={locale} tone="light" fit className="[--lh:72px]" />
          </div>
          <p className="intro-tag mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-xs">{tagline}</p>
          <div className="intro-bar mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <span className="block h-full w-full bg-brand" />
          </div>
        </div>
        <span className="intro-skip-hint absolute bottom-6 end-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">{skip}</span>
      </div>
      <div className="intro-ring" />
    </div>
  );
}
