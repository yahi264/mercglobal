// Builds public/intro-globe.js (the intro globe) and public/land-dots.json (the hero globe) from scripts/intro-globe.template.js, filling in
// evenly spread points that fall on land (world-atlas data). Run after editing the template:
//   node scripts/make-land-dots.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
const land = feature(topo, topo.objects.land);
const N = Number(process.argv[2] ?? 9000);
const ga = Math.PI * (3 - Math.sqrt(5));
const out = [];
for (let i = 0; i < N; i++) {
  const y = 1 - (2 * (i + 0.5)) / N;
  const lat = (Math.asin(y) * 180) / Math.PI;
  if (lat < -58) continue; // skip Antarctica
  const lon = ((((ga * i * 180) / Math.PI) % 360) + 540) % 360 - 180;
  if (geoContains(land, [lon, lat])) out.push(Math.round(lat * 10), Math.round(lon * 10));
}
const tpl = readFileSync("scripts/intro-globe.template.js", "utf8");
writeFileSync("public/intro-globe.js", tpl.replace("__LAND__", JSON.stringify(out)));
writeFileSync("public/land-dots.json", JSON.stringify(out)); // used by the live hero globe
console.log(`${out.length / 2} land dots, ${JSON.stringify(out).length} bytes`);
