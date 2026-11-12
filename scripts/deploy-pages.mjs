// Builds the static website and publishes it to GitHub Pages (branch "gh-pages").
// Usage:  npm run deploy:pages        (build + publish)
//         npm run build:pages         (build only, into the "out" folder)
// On GitHub Pages there is no server, so the forms send the request by WhatsApp or email instead.
import { execSync } from "node:child_process";
import { copyFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPO = process.env.PAGES_REPO ?? "https://github.com/yahi264/mercglobal.git";
// PAGES_BASE="" builds a copy that runs from the root of a domain (e.g. www.mercglobal.com.tr).
const BASE = process.env.PAGES_BASE ?? "/mercglobal";
const OUT = "out";
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

rmSync(OUT, { recursive: true, force: true });
rmSync(".next", { recursive: true, force: true });
// Google Fonts downloads occasionally fail for a moment: retry the build up to 3 times.
for (let attempt = 1; ; attempt++) {
  try {
    run("npx next build", { env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE } });
    break;
  } catch (e) {
    if (attempt >= 3) throw e;
    console.log(`
Build failed (attempt ${attempt}), retrying…
`);
    rmSync(".next", { recursive: true, force: true });
  }
}

// Home address and unknown addresses: send visitors to their language
// (their earlier choice on this site, otherwise their browser's language, otherwise English).
const redirect = (title) => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="${BASE}/icon.png">
<script>
var l=["en","tr","ar","fr","ru","de","es","zh"],p="en",s=null;
try{s=localStorage.getItem("merc-lang")}catch(e){}
if(s&&l.indexOf(s)>-1){p=s}else{var w=(navigator.languages||[navigator.language||"en"]).map(function(x){return String(x).slice(0,2).toLowerCase()});
for(var i=0;i<w.length;i++){if(l.indexOf(w[i])>-1){p=w[i];break}}}
location.replace("${BASE}/"+p+"/");
</script><noscript><meta http-equiv="refresh" content="0;url=${BASE}/en/"></noscript>
</head><body style="background:#0b1a2e"></body></html>`;
writeFileSync(`${OUT}/index.html`, redirect("Merc Global | Merç Global Group"));
writeFileSync(`${OUT}/404.html`, redirect("Merc Global"));
writeFileSync(`${OUT}/.nojekyll`, "");

// The browser asks for page data as flat names ("__next.$d$locale.__PAGE__.txt") but the export
// stores them in folders ("__next.$d$locale/__PAGE__.txt"); add flat copies so GitHub Pages finds them.
function flatten(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      const walk = (d, prefix) => {
        for (const n of readdirSync(d)) {
          const f = join(d, n);
          if (statSync(f).isDirectory()) walk(f, `${prefix}.${n}`);
          else copyFileSync(f, join(dir, `${prefix}.${n}`));
        }
      };
      walk(full, name);
    } else flatten(full);
  }
}
flatten(OUT);

if (process.argv.includes("--build-only")) process.exit(0);

run("git init -q -b gh-pages", { cwd: OUT });
run("git add -A", { cwd: OUT });
run('git -c core.autocrlf=false commit -q -m "Publish website to GitHub Pages"', { cwd: OUT });
run(`git push -f ${REPO} gh-pages`, { cwd: OUT });
console.log(`\nPublished: https://yahi264.github.io${BASE}/`);
