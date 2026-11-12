"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

// Live 3D globe in the home banner: real continents as dots, Türkiye facing the viewer,
// workforce routes continuously flowing from the sourcing countries into Ankara and from Ankara
// to project countries (from the reference list). Drag to spin it; it leans gently towards the mouse.
// It pauses when off screen or when the tab is hidden, and stays still for reduced-motion visitors.

type V = [number, number, number];
const RAD = Math.PI / 180;
const v = (lat: number, lon: number): V => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)];

const HUB = v(39.93, 32.85);
// Sourcing countries (Europe & Balkans, Turkic republics & CIS, Africa, Asia)
const SOURCES: V[] = [
  [51.5, -0.13], [41.9, 12.5], [44.43, 26.1], [44.8, 20.46], [41.33, 19.82], [42.7, 23.32],
  [40.4, 49.87], [43.24, 76.9], [41.3, 69.24], [37.95, 58.38], [50.45, 30.52],
  [36.75, 3.06], [30.04, 31.24], [36.8, 10.18], [6.52, 3.38], [-1.29, 36.82], [5.6, -0.19], [0.35, 32.58], [-15.4, 28.3],
  [34.55, 69.2], [28.61, 77.2], [24.86, 67.0], [23.8, 90.4], [27.7, 85.3], [21.0, 105.8], [14.6, 121.0], [-6.2, 106.8],
].map(([a, b]) => v(a, b));
// Project countries from the references (KSA, Qatar, UAE, Iraq, Kuwait, Oman, Libya, Tabuk, Spain, Nigeria, Kazakhstan)
const PROJECTS: V[] = [
  [24.7, 46.7], [25.3, 51.5], [25.2, 55.3], [30.5, 47.8], [29.4, 47.98], [23.6, 58.4], [32.9, 13.2], [28.4, 36.6], [37.4, -5.98], [9.06, 7.49], [51.17, 71.45],
].map(([a, b]) => v(a, b));

type Arc = { a: V; b: V; born: number; d: number; w: number; h: number; col: string; toHub: boolean };

function makeArc(now: number, toHub: boolean): Arc {
  const pick = (l: V[]) => l[Math.floor(Math.random() * l.length)];
  const a = toHub ? pick(SOURCES) : HUB;
  const b = toHub ? HUB : pick(PROJECTS);
  const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
  return { a, b, born: now, d: 1.3 + w * 0.9, w, h: 0.06 + (0.34 * w) / Math.PI, col: toHub ? "227,20,30" : "255,160,165", toHub };
}

function slerp(A: Arc, t: number): V {
  const s = Math.sin(A.w) || 1e-6;
  const k1 = Math.sin((1 - t) * A.w) / s;
  const k2 = Math.sin(t * A.w) / s;
  const l = 1 + A.h * Math.sin(Math.PI * t);
  return [(A.a[0] * k1 + A.b[0] * k2) * l, (A.a[1] * k1 + A.b[1] * k2) * l, (A.a[2] * k1 + A.b[2] * k2) * l];
}
const ease = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3));

export function HeroGlobe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const c = cv?.getContext("2d");
    if (!cv || !c) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let land: V[] = [];
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, running = false;
    let rot = 33 * RAD, tilt = 30 * RAD; // Türkiye facing the viewer
    let dragV = 0, dragging = false, lastX = 0, lastY = 0, dragTilt = 0, releasedAt = -1e9, autoSpin = 0.05 * RAD;
    let leanX = 0, leanY = 0, tLeanX = 0, tLeanY = 0;
    const arcs: Arc[] = [];
    const pulses: number[] = [];
    let nextSpawn = 0, start = performance.now(), lastStamp = 0;

    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const R = Math.min(W, H) * 0.42 * (0.9 + 0.1 * ease(t / 1.6));
      const cx = W / 2, cy = H / 2;
      const ro = rot + leanX, ti = Math.max(-0.2, Math.min(1.2, tilt + dragTilt + leanY));
      const cr = Math.cos(ro), sr = Math.sin(ro), ct = Math.cos(ti), st = Math.sin(ti);
      const proj = (p: V): V => {
        const x = p[0] * cr - p[2] * sr;
        let z = p[0] * sr + p[2] * cr;
        const y = p[1] * ct - z * st;
        z = p[1] * st + z * ct;
        const k = 1 / (1 - z * 0.15);
        return [cx + x * R * k, cy - y * R * k, z];
      };
      const appear = ease(t / 1.2);
      c.clearRect(0, 0, W, H);

      // glow, body and rim
      const g = c.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.3);
      g.addColorStop(0, "rgba(227,20,30,0)"); g.addColorStop(0.3, `rgba(227,20,30,${0.16 * appear})`); g.addColorStop(1, "rgba(227,20,30,0)");
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R * 1.32, 0, 7); c.fill();
      const b = c.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      b.addColorStop(0, `rgba(45,85,140,${0.45 * appear})`); b.addColorStop(1, `rgba(7,17,31,${0.55 * appear})`);
      c.fillStyle = b; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
      c.strokeStyle = `rgba(255,255,255,${0.14 * appear})`; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.stroke();

      // latitude/longitude graticule (faint)
      c.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30) {
        c.beginPath(); let prev: V | null = null;
        for (let lon = -180; lon <= 180; lon += 6) {
          const q = proj(v(lat, lon));
          if (q[2] > 0 && prev && prev[2] > 0) { c.moveTo(prev[0], prev[1]); c.lineTo(q[0], q[1]); }
          prev = q;
        }
        c.strokeStyle = `rgba(150,180,220,${0.07 * appear})`; c.stroke();
      }

      // land dots
      const ds = W < 420 ? 1.5 : 1.8;
      for (let i = 0; i < land.length; i++) {
        const q = proj(land[i]);
        if (q[2] < -0.02) continue;
        const a = Math.max(0, q[2]);
        c.fillStyle = `rgba(${a > 0.55 ? "236,243,251" : "160,186,218"},${(0.18 + 0.72 * a) * appear})`;
        const s = ds + a * 0.9;
        c.fillRect(q[0] - s / 2, q[1] - s / 2, s, s);
      }

      // routes
      for (let k = arcs.length - 1; k >= 0; k--) {
        const A = arcs[k];
        const age = (now - A.born) / 1000;
        const life = A.d + 1.1;
        if (age > life) { arcs.splice(k, 1); continue; }
        const head = ease(age / A.d);
        const tailStart = Math.max(0, head - 0.55);
        const fadeOut = age > A.d ? 1 - (age - A.d) / 1.1 : 1;
        if (head >= 1 && A.toHub && !(A as Arc & { hit?: boolean }).hit) { (A as Arc & { hit?: boolean }).hit = true; pulses.push(now); }
        let prev: V | null = null;
        const n = 46;
        for (let j = 0; j <= n; j++) {
          const u = j / n; if (u > head) break;
          const q = proj(slerp(A, u));
          if (prev && q[2] > -0.08 && prev[2] > -0.08) {
            const al = u < tailStart ? 0.16 : 0.25 + 0.75 * ((u - tailStart) / Math.max(0.001, head - tailStart));
            c.strokeStyle = `rgba(${A.col},${al * fadeOut * appear})`; c.lineWidth = u < tailStart ? 1 : 1.9;
            c.beginPath(); c.moveTo(prev[0], prev[1]); c.lineTo(q[0], q[1]); c.stroke();
          }
          prev = q;
        }
        if (head < 1 && prev && prev[2] > -0.08) {
          c.fillStyle = "#fff"; c.shadowColor = "#ff3b44"; c.shadowBlur = 14;
          c.beginPath(); c.arc(prev[0], prev[1], 2.5, 0, 7); c.fill(); c.shadowBlur = 0;
        }
        const end = proj(A.toHub ? A.a : A.b);
        if (end[2] > 0) { c.fillStyle = `rgba(255,120,128,${0.85 * fadeOut * appear})`; c.beginPath(); c.arc(end[0], end[1], 2.2, 0, 7); c.fill(); }
      }

      // Ankara
      const h = proj(HUB);
      if (h[2] > -0.05) {
        for (let k = pulses.length - 1; k >= 0; k--) {
          const pk = (now - pulses[k]) / 1300;
          if (pk > 1) { pulses.splice(k, 1); continue; }
          c.strokeStyle = `rgba(227,20,30,${(1 - pk) * 0.85})`; c.lineWidth = 1.5;
          c.beginPath(); c.arc(h[0], h[1], 5 + pk * 38, 0, 7); c.stroke();
        }
        c.fillStyle = "#e3141e"; c.shadowColor = "#e3141e"; c.shadowBlur = 22;
        c.beginPath(); c.arc(h[0], h[1], 5, 0, 7); c.fill(); c.shadowBlur = 0;
        c.fillStyle = "#fff"; c.beginPath(); c.arc(h[0], h[1], 2, 0, 7); c.fill();
        const lx = h[0] + 8, ly = h[1] - 8, len = W < 420 ? 20 : 30;
        c.strokeStyle = "rgba(255,255,255,0.55)"; c.lineWidth = 1;
        c.beginPath(); c.moveTo(lx, ly); c.lineTo(lx + len, ly - len); c.lineTo(lx + len + 92, ly - len); c.stroke();
        c.fillStyle = "#fff"; c.font = `800 ${W < 420 ? 10 : 12}px Manrope, system-ui, sans-serif`;
        c.fillText("ANKARA · HQ", lx + len + 4, ly - len - 6);
        c.fillStyle = "rgba(255,255,255,0.55)"; c.font = `500 ${W < 420 ? 8 : 9.5}px ui-monospace, Menlo, monospace`;
        c.fillText("39.93°N  32.85°E", lx + len + 4, ly - len + 13);
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) { running = false; return; }
      running = true;
      if (!dragging) {
        // drift back towards Türkiye after a drag, with a slow continuous sway
        dragV *= 0.94;
        rot += dragV + autoSpin * Math.sin((now - start) / 6000) * 0.12;
        // after a drag the globe stays where it was left for a moment, then glides back to Türkiye
        if (now - releasedAt > 2500) {
          const home = 36 * RAD + Math.sin((now - start) / 9000) * 12 * RAD;
          rot += (home - rot) * 0.0025;
          dragTilt *= 0.985;
        }
      }
      leanX += (tLeanX - leanX) * 0.06;
      leanY += (tLeanY - leanY) * 0.06;
      if (now > nextSpawn && land.length) {
        arcs.push(makeArc(now, Math.random() < 0.68));
        nextSpawn = now + 190 + Math.random() * 260;
      }
      draw(now);
      if (((now / 250) | 0) !== ((lastStamp / 250) | 0)) cv.dataset.view = `${(rot * 57.3).toFixed(0)},${((tilt + dragTilt) * 57.3).toFixed(0)}`; // current angle, for checking
      lastStamp = now;
      raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!running && !raf && !reduced) raf = requestAnimationFrame(tick); };

    size();
    const ro = new ResizeObserver(() => { size(); if (reduced) draw(start + 5000); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
    io.observe(cv);
    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);

    // interaction: the globe turns towards the mouse anywhere over the banner; grab it to spin it
    // (left/right spins, up/down tilts). On touch screens a sideways swipe on the globe spins it.
    const area = (cv.closest("section") as HTMLElement | null) ?? cv;
    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY; dragV = 0;
      cv.setPointerCapture(e.pointerId); cv.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const a = area.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (a.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (a.height / 2)));
      tLeanX = nx * -0.55; // about 30° towards the pointer
      tLeanY = ny * -0.35;
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      dragV = -dx * 0.0045; rot += dragV;
      dragTilt = Math.max(-0.6, Math.min(0.6, dragTilt - dy * 0.004));
    };
    const up = () => {
      if (!dragging) return;
      dragging = false; releasedAt = performance.now(); cv.style.cursor = "grab";
    };
    const leave = () => { tLeanX = 0; tLeanY = 0; };
    cv.addEventListener("pointerdown", down);
    area.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    area.addEventListener("pointerleave", leave);

    fetch(asset("/land-dots.json"))
      .then((r) => r.json())
      .then((d: number[]) => {
        const pts: V[] = [];
        for (let i = 0; i < d.length; i += 2) pts.push(v(d[i] / 10, d[i + 1] / 10));
        land = W < 420 ? pts.filter((_, k) => k % 2 === 0) : pts;
        start = performance.now();
        if (reduced) {
          for (let k = 0; k < 6; k++) arcs.push({ ...makeArc(start - 5000, k % 3 !== 0), born: start - 1600 });
          draw(start + 1600);
        } else kick();
      })
      .catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      cv.removeEventListener("pointerdown", down);
      area.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={ref} className={`touch-pan-y ${className}`} style={{ cursor: "grab" }} aria-hidden />;
}
