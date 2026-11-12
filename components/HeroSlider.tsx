"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Rotate3d } from "lucide-react";
import { HeroGlobe } from "./HeroGlobe";
import { asset } from "@/lib/asset";

export type Slide = { image: number; title: string; text: string; href: string };

type Props = {
  slides: Slide[];
  eyebrow: string;
  ctaHref: string;
  labels: { request: string; details: string; prev: string; next: string; drag: string };
  badges: { value: string; label: string }[];
};

// Full-width rotating hero with the nine sector photos from the original site.
export function HeroSlider({ slides, eyebrow, ctaHref, labels, badges }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), [slides.length]);

  // The first slide waits for the opening animation (if it is playing) before moving on.
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (paused) return;
    const intro = !changed && document.documentElement.classList.contains("intro");
    const id = setTimeout(() => go(i + 1), intro ? 9000 : 6500);
    return () => clearTimeout(id);
  }, [i, paused, go, changed]);
  useEffect(() => {
    if (i !== 0) setChanged(true);
  }, [i]);

  // Preload the next photo so the change is seamless
  useEffect(() => {
    const img = new Image();
    img.src = asset(`/img/slide/${slides[(i + 1) % slides.length].image}.webp`);
  }, [i, slides]);

  // Swipe left/right on touch screens
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchEnd = (x: number) => {
    if (touchX === null) return;
    const dx = x - touchX;
    const rtl = document.documentElement.dir === "rtl";
    if (Math.abs(dx) > 50) go(i + ((dx < 0) !== rtl ? 1 : -1));
    setTouchX(null);
  };

  const s = slides[i];
  return (
    <section
      className="relative isolate flex min-h-[560px] h-[calc(100svh-72px)] max-h-[860px] items-end overflow-hidden bg-navy md:h-[calc(100svh-112px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false}>
        <motion.picture
          key={s.image}
          className="hero-pic absolute inset-0 -z-20"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: 7, ease: "linear" } }}
        >
          <source media="(max-width: 767px)" srcSet={asset(`/img/slide/${s.image}-sm.webp`)} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(`/img/slide/${s.image}.webp`)} alt="" className="h-full w-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} />
        </motion.picture>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent rtl:bg-gradient-to-l" />

      {/* Live globe: workforce routes into Ankara (right side on desktop, top on phones) */}
      <div
        className="hero-globe pointer-events-none absolute left-0 right-0 top-4 z-0 mx-auto aspect-square w-[72vw] max-w-[400px] sm:top-6 sm:w-[60vw] lg:left-auto lg:right-[-3%] lg:top-1/2 lg:mx-0 lg:w-[min(44vw,80svh)] lg:max-w-none lg:-translate-y-1/2 xl:w-[min(52vw,86svh,760px)] rtl:lg:left-[-3%] rtl:lg:right-auto [@media(max-height:700px)_and_(max-width:1023px)]:hidden"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(7,17,31,0.8)_0%,rgba(7,17,31,0.45)_45%,transparent_70%)]" />
        <HeroGlobe className="pointer-events-auto relative h-full w-full" />
        <div className="hidden xl:block">
          {badges.map((b, n) => (
            <div
              key={n}
              className={`hero-badge absolute max-w-[200px] rounded-2xl border border-white/15 bg-navy/55 px-4 py-3 text-white shadow-2xl shadow-black/30 backdrop-blur-md ${
                ["start-[4%] top-[12%]", "start-[-1%] bottom-[22%]", "end-[14%] bottom-[17%]"][n]
              }`}
              style={{ "--i": n } as React.CSSProperties}
            >
              <p className="text-2xl font-extrabold leading-none text-brand" dir="ltr">
                {b.value}
              </p>
              <p className="mt-1.5 text-xs font-semibold leading-snug text-white/80">{b.label}</p>
            </div>
          ))}
          <p className="hero-badge absolute bottom-[1%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45" style={{ "--i": 3 } as React.CSSProperties}>
            <Rotate3d className="h-3.5 w-3.5" /> {labels.drag}
          </p>
        </div>
      </div>

      <div className="container-x pointer-events-none relative z-10 pb-24 pt-16 md:pb-28">
        {/* Text is revealed word by word with CSS (see globals.css), so it also plays right after the intro */}
        <div key={i} className={`hero-text pointer-events-auto max-w-2xl text-white lg:max-w-[540px] xl:max-w-[600px] ${changed ? "" : "hero-first"}`}>
          <p className="hero-fade mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {eyebrow}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl" aria-label={s.title}>
            {s.title.split(" ").map((w, n) => (
              <Fragment key={n}>
                <span className="word-mask" aria-hidden>
                  <span className="word" style={{ "--i": n + 1 } as React.CSSProperties}>
                    {w}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className="hero-fade mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg" style={{ "--i": 4 } as React.CSSProperties}>
            {s.text}
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3" style={{ "--i": 6 } as React.CSSProperties}>
            <Link href={ctaHref} className="btn-brand">
              {labels.request} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
            <Link href={s.href} className="btn-ghost">
              {labels.details}
            </Link>
          </div>
          <span className="hero-line mt-10 hidden h-px sm:block w-40 origin-left bg-gradient-to-r from-brand to-transparent rtl:origin-right rtl:bg-gradient-to-l" aria-hidden />
        </div>
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 md:bottom-8">
        <div className="container-x flex items-center justify-between gap-4 [&>*]:pointer-events-auto">
          <div className="flex flex-wrap gap-1.5 pe-20 sm:pe-0" role="tablist">
            {slides.map((sl, n) => (
              <button
                key={sl.image}
                type="button"
                onClick={() => go(n)}
                role="tab"
                aria-selected={n === i}
                aria-label={sl.title}
                title={sl.title}
                className={`h-2 rounded-full transition-all duration-500 ${n === i ? "w-8 bg-brand" : "w-2 bg-white/45 hover:bg-white/80"}`}
              />
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => go(i - 1)} aria-label={labels.prev} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur transition-colors hover:bg-white/15">
              <ChevronLeft className="flip-rtl h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label={labels.next} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur transition-colors hover:bg-white/15">
              <ChevronRight className="flip-rtl h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <span className="absolute end-4 top-6 z-10 hidden font-mono text-sm text-white/60 md:block" aria-hidden dir="ltr">
        {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </section>
  );
}
