// First-visit opening animation: the Merç "M" mark draws itself line by line, the name rises in,
// a red progress line runs, then a double curtain (navy, then red) lifts to reveal the page.
// It is pure CSS (see globals.css, "Intro"), so it starts instantly — before any JavaScript loads —
// and plays once per browser session. Visitors who prefer reduced motion never see it.
// Click / tap / any key skips it.


// Two arches made of three parallel lines, joined in the middle with a small ring — the Merç mark.
const lines = [
  "M10 96 V46 A25 25 0 0 1 60 46 A25 25 0 0 1 110 46 V96",
  "M17 96 V46 A18 18 0 0 1 53 46 V96",
  "M67 96 V46 A18 18 0 0 1 103 46 V96",
  "M24 96 V46 A11 11 0 0 1 46 46 V96",
  "M74 96 V46 A11 11 0 0 1 96 46 V96",
];

export function Intro({ tagline }: { tagline: string }) {
  const name = "MERÇ GLOBAL";
  return (
    <div id="intro" aria-hidden="true">
      <div className="intro-red" />
      <div className="intro-panel">
        <div className="intro-glow" />
        <div className="intro-grid" />
        <div className="relative flex flex-col items-center px-6 text-center">
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
      </div>
    </div>
  );
}
