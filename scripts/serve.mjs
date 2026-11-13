// Local preview of the built site, as GitHub Pages serves it: node scripts/serve.mjs → http://localhost:5190/mercglobal/
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
const BASE = "/mercglobal", ROOT = "out", PORT = 5190;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2", ".json": "application/json", ".ico": "image/x-icon" };
createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!p.startsWith(BASE)) { res.writeHead(302, { location: BASE + "/" }); return res.end(); }
  let f = normalize(join(ROOT, p.slice(BASE.length)));
  if (existsSync(f) && statSync(f).isDirectory()) {
    if (!p.endsWith("/")) { res.writeHead(301, { location: p + "/" }); return res.end(); }
    f = join(f, "index.html");
  }
  if (!existsSync(f)) { res.writeHead(404, { "content-type": types[".html"] }); return res.end(readFileSync(join(ROOT, "404.html"))); }
  res.writeHead(200, { "content-type": types[extname(f)] ?? "application/octet-stream" });
  res.end(readFileSync(f));
}).listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}/`));
