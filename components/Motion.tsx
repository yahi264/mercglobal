"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

type W = Window & { __lenis?: Lenis };

// Gentle, weighted scrolling (skipped for visitors who prefer reduced motion and on touch screens).
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.style.scrollBehavior = "auto";
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });
    (window as W).__lenis = lenis;
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete (window as W).__lenis;
    };
  }, []);
  // New page: start at the top, or at the section named in the address (e.g. #request)
  useEffect(() => {
    const lenis = (window as W).__lenis;
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    if (!target) return;
    const id = setTimeout(() => {
      if (lenis) lenis.scrollTo(target, { offset: -100, duration: 1.2 });
      else target.scrollIntoView({ behavior: "smooth" });
    }, 350);
    return () => clearTimeout(id);
  }, [pathname]);
  return null;
}

// Thin red bar at the top of the page that fills as you scroll.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand rtl:origin-right" />;
}

// Ring that fills as you scroll; click to glide back to the top.
export function BackToTop({ label }: { label: string }) {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollYProgress.on("change", (v) => setShow(v > 0.12)), [scrollYProgress]);
  const up = () => {
    const lenis = (window as W).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      onClick={up}
      aria-label={label}
      title={label}
      className={`fixed bottom-5 start-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy/90 text-white shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-0.5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
        <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#e3141e" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
      </svg>
      <ArrowUp className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

// Soft fade and lift when moving between pages.
export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);
  return (
    <motion.div key={pathname} initial={first.current ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// Number that counts up when it comes into view.
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.max(0, Math.min(1, (t - start) / dur));
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}
