"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { asset } from "@/lib/asset";

export type Slide = { image: number; title: string; text: string; href: string };

type Props = {
  slides: Slide[];
  eyebrow: string;
  ctaHref: string;
  labels: { request: string; details: string; prev: string; next: string };
};

// Full-width rotating hero with the nine sector photos from the original site.
export function HeroSlider({ slides, eyebrow, ctaHref, labels }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), [slides.length]);

  // The first slide waits for the opening animation (if it is playing) before moving on.
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (paused) return;
    const intro = !changed && document.documentElement.classList.contains("intro");
    const id = setTimeout(() => go(i + 1), intro ? 11000 : 6500);
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

      <div className="container-x pb-24 pt-16 md:pb-28">
        {/* Text is revealed word by word with CSS (see globals.css), so it also plays right after the intro */}
        <div key={i} className={`hero-text max-w-2xl text-white ${changed ? "" : "hero-first"}`}>
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
      <div className="absolute inset-x-0 bottom-6 md:bottom-8">
        <div className="container-x flex items-center justify-between gap-4">
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
      <span className="absolute end-4 top-6 hidden font-mono text-sm text-white/60 md:block" aria-hidden dir="ltr">
        {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </section>
  );
}
