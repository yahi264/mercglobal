/* Merç Global — first-visit intro globe (built into public/intro-globe.js by scripts/make-land-dots.mjs).
   A dotted Earth (real continents) turns to face Türkiye; workforce routes fly from the sourcing
   countries into Ankara, then out to project countries; the camera then dives into Ankara.
   Add ?introAt=2.1 to the address to freeze the globe at a given second (for checking). */
(function () {
  var D = document.documentElement;
  if (!D.classList.contains("intro")) return;
  if (!document.getElementById("intro-canvas")) { document.addEventListener("DOMContentLoaded", run); return; }
  run();
  function run() {
  var cv = document.getElementById("intro-canvas");
  if (!cv || !cv.getContext) return;
  var c = cv.getContext("2d");
  var W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size();
  addEventListener("resize", size);

  var RAD = Math.PI / 180;
  function v(a) { return [Math.cos(a[0] * RAD) * Math.sin(a[1] * RAD), Math.sin(a[0] * RAD), Math.cos(a[0] * RAD) * Math.cos(a[1] * RAD)]; }

  // Land dots (lat*10, lon*10 pairs) + a sparse ocean grid for the sphere's shape
  var L = __LAND__, LAND = [], OCEAN = [], i;
  for (i = 0; i < L.length; i += 2) LAND.push(v([L[i] / 10, L[i + 1] / 10]));
  var small = W < 700, NO = small ? 260 : 520, ga = Math.PI * (3 - Math.sqrt(5));
  for (i = 0; i < NO; i++) { var y = 1 - 2 * (i + 0.5) / NO, r = Math.sqrt(1 - y * y), th = ga * i; OCEAN.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
  if (small) LAND = LAND.filter(function (_, k) { return k % 2 === 0; });

  var HUB = v([39.93, 32.85]);
  // Sourcing countries (Europe & Balkans, Turkic republics & CIS, Africa, Asia)
  var S = [[51.5, -0.13], [41.9, 12.5], [44.43, 26.1], [44.8, 20.46], [41.33, 19.82], [42.7, 23.32],
    [40.4, 49.87], [43.24, 76.9], [41.3, 69.24], [37.95, 58.38], [50.45, 30.52],
    [36.75, 3.06], [30.04, 31.24], [36.8, 10.18], [6.52, 3.38], [-1.29, 36.82], [5.6, -0.19], [0.35, 32.58], [-15.4, 28.3],
    [34.55, 69.2], [28.61, 77.2], [24.86, 67.0], [23.8, 90.4], [27.7, 85.3], [21.0, 105.8], [14.6, 121.0], [-6.2, 106.8]].map(v);
  // Project countries from the reference list (KSA, Qatar, UAE, Iraq, Kuwait, Oman, Libya, Tabuk)
  var T = [[24.7, 46.7], [25.3, 51.5], [25.2, 55.3], [30.5, 47.8], [29.4, 47.98], [23.6, 58.4], [32.9, 13.2], [28.4, 36.6]].map(v);

  var arcs = [];
  S.forEach(function (p, k) { arcs.push({ a: p, b: HUB, t0: 0.3 + ((k * 7) % S.length) * 0.05, d: 0.95, col: "227,20,30" }); });
  T.forEach(function (p, k) { arcs.push({ a: HUB, b: p, t0: 1.75 + k * 0.07, d: 0.7, col: "255,150,155" }); });
  arcs.forEach(function (A) {
    A.w = Math.acos(Math.max(-1, Math.min(1, A.a[0] * A.b[0] + A.a[1] * A.b[1] + A.a[2] * A.b[2])));
    A.h = 0.05 + 0.32 * A.w / Math.PI;
  });
  function slerp(A, t) {
    var w = A.w, s = Math.sin(w), k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s, l = 1 + A.h * Math.sin(Math.PI * t);
    return [(A.a[0] * k1 + A.b[0] * k2) * l, (A.a[1] * k1 + A.b[1] * k2) * l, (A.a[2] * k1 + A.b[2] * k2) * l];
  }
  function ease(x) { return x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3); }
  function easeIn(x) { return x < 0 ? 0 : x > 1 ? 1 : x * x * x; }

  var SPEED = 1.8, FIX = location.search.match(/introAt=([0-9.]+)/), t0 = performance.now(), rot, tilt, R, cx, cy;
  var gridEl = document.querySelector(".intro-grid"), css = gridEl && gridEl.getAnimations ? gridEl.getAnimations()[0] : null;
  if (css && css.currentTime) t0 -= css.currentTime; // start in step with the CSS animations
  function proj(p) {
    var x = p[0] * Math.cos(rot) - p[2] * Math.sin(rot), z = p[0] * Math.sin(rot) + p[2] * Math.cos(rot);
    var y = p[1] * Math.cos(tilt) - z * Math.sin(tilt);
    z = p[1] * Math.sin(tilt) + z * Math.cos(tilt);
    var k = 1 / (1 - z * 0.15);
    return [cx + x * R * k, cy - y * R * k, z];
  }
  var pulses = [];
  function dot(q, s, col) { c.fillStyle = col; c.fillRect(q[0] - s / 2, q[1] - s / 2, s, s); }

  function frame(now) {
    if (!D.classList.contains("intro") || D.classList.contains("intro-skip")) { c.clearRect(0, 0, W, H); return; }
    var t = (FIX ? +FIX[1] : (now - t0) / 1000) * SPEED; // story time: the globe part lasts about 2 s
    if (t > 3.6) { c.clearRect(0, 0, W, H); return; }
    rot = (-40 + 73 * ease(t / 2.3)) * RAD; // spins until Türkiye faces the viewer
    tilt = (20 + 14 * ease(t / 2.3)) * RAD;
    var zoom = easeIn((t - 2.3) / 1.1);
    var base = Math.min(W, H) * (small ? 0.46 : 0.42);
    R = base * (0.78 + 0.22 * ease(t / 1.4)) * (1 + 11 * zoom);
    cx = W / 2; cy = H / 2;
    var hp = proj(HUB);
    var centre = ease((t - 2.05) / 0.7); // glide Ankara to the middle, where the logo will appear
    cx += (W / 2 - hp[0]) * centre;
    cy += (H / 2 - hp[1]) * centre; // the logo appears in the middle
    var fade = Math.min(1, t / 0.5) * (1 - ease((t - 2.65) / 0.75));
    c.clearRect(0, 0, W, H);

    // atmosphere and rim
    var g = c.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
    g.addColorStop(0, "rgba(227,20,30,0)"); g.addColorStop(0.35, "rgba(227,20,30," + 0.14 * fade + ")"); g.addColorStop(1, "rgba(227,20,30,0)");
    c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R * 1.3, 0, 7); c.fill();
    var g2 = c.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
    g2.addColorStop(0, "rgba(40,80,130," + 0.35 * fade + ")"); g2.addColorStop(1, "rgba(10,25,45," + 0.15 * fade + ")");
    c.fillStyle = g2; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
    c.strokeStyle = "rgba(255,255,255," + 0.1 * fade + ")"; c.lineWidth = 1; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.stroke();

    // ocean + land dots (front side brighter)
    var q, a;
    for (i = 0; i < OCEAN.length; i++) { q = proj(OCEAN[i]); if (q[2] < 0) continue; dot(q, 1, "rgba(120,150,190," + 0.22 * q[2] * fade + ")"); }
    var ds = small ? 1.6 : 1.7;
    for (i = 0; i < LAND.length; i++) {
      q = proj(LAND[i]); if (q[2] < -0.05) continue;
      a = Math.max(0, q[2]);
      dot(q, ds + a * 0.9, "rgba(" + (a > 0.5 ? "235,242,250" : "160,185,215") + "," + (0.25 + 0.7 * a) * fade + ")");
    }

    // routes
    arcs.forEach(function (A) {
      var e = ease((t - A.t0) / A.d); if (e <= 0) return;
      var n = 44, j, prev = null, tail = Math.max(0, e - 0.5);
      if (e >= 1 && !A.hit) { A.hit = 1; if (A.b === HUB) pulses.push(t); }
      for (j = 0; j <= n; j++) {
        var u = j / n; if (u > e) break;
        var p = proj(slerp(A, u));
        if (prev && p[2] > -0.1 && prev[2] > -0.1) {
          var al = u < tail ? 0.22 : 0.3 + 0.7 * (u - tail) / Math.max(0.001, e - tail);
          c.strokeStyle = "rgba(" + A.col + "," + al * fade + ")"; c.lineWidth = u < tail ? 1 : 2;
          c.beginPath(); c.moveTo(prev[0], prev[1]); c.lineTo(p[0], p[1]); c.stroke();
        }
        prev = p;
      }
      if (e < 1 && prev && prev[2] > -0.1) {
        c.fillStyle = "rgba(255,255,255," + fade + ")"; c.shadowColor = "#ff3b44"; c.shadowBlur = 14;
        c.beginPath(); c.arc(prev[0], prev[1], 2.6, 0, 7); c.fill(); c.shadowBlur = 0;
      }
      var o = proj(A.b === HUB ? A.a : A.b);
      if (o[2] > -0.05 && (A.b === HUB || e >= 1)) { c.fillStyle = "rgba(255,110,118," + 0.9 * fade + ")"; c.beginPath(); c.arc(o[0], o[1], 2.2, 0, 7); c.fill(); }
    });

    // Ankara hub, pulses and label
    var h = proj(HUB);
    pulses.forEach(function (p0) {
      var k = (t - p0) / 1.1; if (k > 1) return;
      c.strokeStyle = "rgba(227,20,30," + (1 - k) * 0.9 * fade + ")"; c.lineWidth = 1.5;
      c.beginPath(); c.arc(h[0], h[1], 5 + k * 40, 0, 7); c.stroke();
    });
    c.fillStyle = "rgba(227,20,30," + fade + ")"; c.shadowColor = "#e3141e"; c.shadowBlur = 22;
    c.beginPath(); c.arc(h[0], h[1], 5, 0, 7); c.fill(); c.shadowBlur = 0;
    c.fillStyle = "rgba(255,255,255," + fade + ")"; c.beginPath(); c.arc(h[0], h[1], 2, 0, 7); c.fill();
    var la = Math.min(1, Math.max(0, (t - 0.9) / 0.4)) * fade * (1 - zoom);
    if (la > 0) {
      var lx = h[0] + 8, ly = h[1] - 8, len = small ? 24 : 34;
      c.strokeStyle = "rgba(255,255,255," + 0.55 * la + ")"; c.lineWidth = 1;
      c.beginPath(); c.moveTo(lx, ly); c.lineTo(lx + len, ly - len); c.lineTo(lx + len + (small ? 92 : 120), ly - len); c.stroke();
      c.fillStyle = "rgba(255,255,255," + la + ")"; c.font = "800 " + (small ? 11 : 13) + "px Manrope, system-ui, sans-serif";
      c.fillText("ANKARA · HQ", lx + len + 4, ly - len - 7);
      c.fillStyle = "rgba(255,255,255," + 0.55 * la + ")"; c.font = "500 " + (small ? 9 : 10) + "px ui-monospace, Menlo, monospace";
      c.fillText("39.93°N  32.85°E", lx + len + 4, ly - len + 14);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  }
})();
