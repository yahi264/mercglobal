// Reads a job offer from a document (Word .docx, PDF, .txt) or pasted text and fills the vacancy
// fields. Works best with the template (public/templates/), whose lines start with labels such as
// "Job title:", "Country:", "Requirements:" (English or Turkish); free text is handled best-effort.
import type { Job } from "./jobs";
import { asset } from "./asset";

type Field = "title" | "country" | "city" | "sector" | "positions" | "type" | "salary" | "deadline" | "description" | "requirements";

// Labels in English and Turkish (lower-case, without accents — see clean()).
const LABELS: [Field, string[]][] = [
  ["title", ["job title", "position title", "position", "title", "role", "vacancy", "pozisyon adi", "pozisyon", "is unvani", "unvan", "gorev adi", "ilan basligi"]],
  ["country", ["country", "ulke"]],
  ["city", ["city", "location", "work location", "place", "sehir", "il", "lokasyon", "konum", "calisma yeri"]],
  ["sector", ["sector", "industry", "field", "sektor", "alan"]],
  ["positions", ["number of positions", "number of staff", "number of openings", "openings", "vacancies", "headcount", "quantity", "kisi sayisi", "personel sayisi", "adet", "kontenjan"]],
  ["type", ["employment type", "contract type", "job type", "contract", "working hours", "calisma sekli", "sozlesme", "sozlesme suresi", "calisma saatleri"]],
  ["salary", ["salary", "wage", "pay", "ucret", "maas"]],
  ["deadline", ["deadline", "apply by", "application deadline", "closing date", "last date", "son basvuru tarihi", "son basvuru", "son tarih"]],
  ["description", ["job description", "description", "about the job", "responsibilities", "duties", "tasks", "is tanimi", "aciklama", "gorev tanimi", "gorevler", "sorumluluklar"]],
  ["requirements", ["requirements", "qualifications", "required qualifications", "skills", "candidate profile", "aranan nitelikler", "nitelikler", "gereksinimler", "sartlar", "beklentiler"]],
];

const clean = (s: string) =>
  s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

// "Label: value" or a line that is only the label (a heading)
function labelOf(line: string): { field: Field; rest: string } | null {
  const m = line.match(/^\s*[-•*#]*\s*([^:：\-–]{2,40}?)\s*[:：\-–]\s*(.*)$/);
  const head = clean(m ? m[1] : line);
  for (const [field, words] of LABELS) {
    if (words.some((w) => head === w)) return { field, rest: m ? m[2].trim() : "" };
  }
  return null;
}

const SECTORS: [string, string[]][] = [
  ["oil-gas", ["oil", "gas", "petrol", "dogalgaz", "dogal gaz", "rafineri", "refinery", "pipeline"]],
  ["energy-power", ["energy", "power", "enerji", "elektrik", "solar", "wind", "santral"]],
  ["construction-infrastructure", ["construction", "infrastructure", "insaat", "altyapi", "building", "santiye", "site engineer"]],
  ["offshore-marine-dredging", ["offshore", "marine", "dredging", "port", "liman", "denizcilik", "gemi"]],
  ["agriculture-livestock", ["agriculture", "farm", "livestock", "tarim", "hayvancilik", "coban", "shepherd"]],
  ["logistics-transport", ["logistics", "transport", "driver", "warehouse", "lojistik", "tasimacilik", "sofor", "depo"]],
  ["manufacturing-industry", ["manufacturing", "factory", "production", "imalat", "fabrika", "uretim", "sanayi"]],
  ["tourism-hospitality", ["hotel", "restaurant", "tourism", "hospitality", "chef", "waiter", "otel", "turizm", "garson", "asci", "catering"]],
  ["aviation-defence", ["aviation", "defence", "defense", "aircraft", "havacilik", "savunma", "ucak"]],
];
export function guessSector(text: string): string {
  const t = " " + clean(text) + " ";
  let best = "other", score = 0;
  for (const [slug, words] of SECTORS) {
    const n = words.filter((w) => t.includes(" " + w)).length;
    if (n > score) (best = slug), (score = n);
  }
  return best;
}

const MONTHS: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12, oca: 1, sub: 2, nis: 4, haz: 6, tem: 7, agu: 8, eyl: 9, eki: 10, kas: 11, ara: 12 };
export function parseDate(s: string): string {
  const t = clean(s);
  let m = t.match(/(\d{4}) (\d{1,2}) (\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = t.match(/(\d{1,2}) (\d{1,2}) (\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  m = t.match(/(\d{1,2}) ([a-z]{3})[a-z]* (\d{4})/);
  if (m && MONTHS[m[2]]) return `${m[3]}-${String(MONTHS[m[2]]).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  m = t.match(/([a-z]{3})[a-z]* (\d{1,2}) (\d{4})/);
  if (m && MONTHS[m[1]]) return `${m[3]}-${String(MONTHS[m[1]]).padStart(2, "0")}-${m[2].padStart(2, "0")}`;
  return "";
}

export function looksTurkish(text: string) {
  return (text.match(/[çğışöüÇĞİŞÖÜ]/g) ?? []).length > 3 || /\b(ve|için|ile|aranan|pozisyon|ülke)\b/i.test(text);
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const flatten = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/İ/g, "I");

// Turns the document text into vacancy fields. Returns the fields that were found.
export function parseJobText(text: string, countries: string[]): Partial<Job> {
  // Put "Label: value" pairs that share one line on separate lines ("Contract: 2 years. Salary: 1800 USD")
  const allLabels = LABELS.flatMap(([, w]) => w).sort((a, b) => b.length - a.length);
  const inline = new RegExp(`([.;,|]\\s+)(${allLabels.map((w) => esc(w).replace(/ /g, "\\s+")).join("|")})\\s*[:：]`, "i");
  const split = text
    .replace(/\r/g, "")
    .split("\n")
    .flatMap((line) => {
      const parts: string[] = [];
      let rest = line;
      for (let guard = 0; guard < 10; guard++) {
        const m = inline.exec(flatten(rest));
        if (!m) break;
        parts.push(rest.slice(0, m.index));
        rest = rest.slice(m.index + m[1].length);
      }
      parts.push(rest);
      return parts;
    });

  const out: Partial<Record<Field, string>> = {};
  let current: Field | null = null;
  let seenLabel = false;
  const loose: string[] = [];
  const preamble: string[] = [];
  for (const raw of split) {
    const line = raw.replace(/\t/g, " ").trim();
    if (!line) continue;
    const lab = labelOf(line);
    if (lab) {
      seenLabel = true;
      current = lab.field;
      if (lab.rest) out[current] = out[current] ? `${out[current]}\n${lab.rest}` : lab.rest;
      continue;
    }
    if (current === "description" || current === "requirements") {
      out[current] = out[current] ? `${out[current]}\n${line}` : line;
    } else if (current && !out[current]) {
      out[current] = line;
      current = null;
    } else {
      (seenLabel ? loose : preamble).push(line);
      current = null;
    }
  }
  // Unlabelled text: the first line becomes the title (if none), the rest the description (if none).
  // In the template, the heading and instructions are only used when those fields are missing.
  const free = [...preamble, ...loose];
  if (!out.title && free.length) out.title = free.shift()!.slice(0, 90);
  if (!out.description && free.length) out.description = free.join("\n");

  const all = text.replace(/\r/g, "");
  const flat = flatten(all);
  // deadline written in a sentence ("Apply before 20/12/2026", "Son başvuru 31.12.2026")
  if (!out.deadline) {
    const m = flat.match(/(?:apply (?:before|by|until)|deadline|closing date|until|son basvuru(?: tarihi)?)\s*:?\s*(\d{1,4}[./ -][0-9a-zA-Z]{1,9}[./ -]\d{2,4})/i);
    if (m) out.deadline = m[1];
  }
  if (!out.country) {
    const hit = countries.find((c) => c.length > 3 && new RegExp(`(^|[^\\p{L}])${esc(c)}([^\\p{L}]|$)`, "iu").test(all));
    if (hit) out.country = hit;
  }
  // city written as "in Doha, Qatar" / "Doha, Qatar"
  if (!out.city && out.country) {
    const m = all.match(new RegExp(`(\\p{Lu}[\\p{L}'-]{2,})\\s*[,/-]\\s*${esc(out.country)}`, "u"));
    if (m) out.city = m[1];
  }
  if (!out.positions) {
    const m =
      flat.match(/(?:hiring|need|needs|recruiting|looking for|require|requires)\s+(\d{1,4})\b/i) ??
      flat.match(/(\d{1,4})\s*(?:x\s*)?(?:persons?|people|workers|positions|openings|staff|kisi|personel|adet|hemsire|kaynakci|isci)\b/i);
    if (m) out.positions = m[1];
  }
  const dropLine = (r: string) => /^(apply (before|by|until)|deadline|son basvuru)/i.test(flatten(r));
  const job: Partial<Job> = {
    title: out.title?.replace(/\s+/g, " ").trim(),
    country: out.country?.trim(),
    city: out.city?.trim(),
    positions: out.positions?.match(/\d+/)?.[0] ?? out.positions?.trim(),
    type: out.type?.replace(/[.;]\s*$/, "").trim(),
    salary: out.salary?.replace(/[.;]\s*$/, "").trim(),
    deadline: out.deadline ? parseDate(out.deadline) : undefined,
    description: out.description?.split("\n").filter((r) => !dropLine(r)).join("\n").trim(),
    requirements: out.requirements
      ?.split("\n")
      .map((r) => r.replace(/^\s*(?:[-•*·▪◦●○–]+|\d{1,2}[.)])\s*/, "").trim())
      .filter((r) => r && !dropLine(r))
      .join("\n"),
    language: looksTurkish(all) ? "tr" : "en",
  };
  job.sector = out.sector ? guessSector(out.sector) : guessSector(`${job.title} ${job.description} ${job.requirements}`);
  return Object.fromEntries(Object.entries(job).filter(([, v]) => v)) as Partial<Job>;
}

// ── reading files ──
const runImport = new Function("u", "return import(u)") as (u: string) => Promise<Record<string, unknown>>;
function loadScript(src: string) {
  return new Promise<void>((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res();
    s.onerror = () => rej(new Error("load " + src));
    document.head.appendChild(s);
  });
}

export async function fileToText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".docx")) {
    await loadScript(asset("/vendor/mammoth.browser.min.js"));
    const mammoth = (window as unknown as { mammoth: { extractRawText(o: { arrayBuffer: ArrayBuffer }): Promise<{ value: string }> } }).mammoth;
    return (await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
  }
  if (name.endsWith(".pdf")) {
    const pdfjs = (await runImport(new URL(asset("/vendor/pdf.min.mjs"), location.href).href)) as {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument(o: { data: ArrayBuffer }): { promise: Promise<{ numPages: number; getPage(n: number): Promise<{ getTextContent(): Promise<{ items: { str: string; hasEOL?: boolean }[] }> }> }> };
    };
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(asset("/vendor/pdf.worker.min.mjs"), location.href).href;
    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let p = 1; p <= Math.min(doc.numPages, 10); p++) {
      const c = await (await doc.getPage(p)).getTextContent();
      text += c.items.map((i) => i.str + (i.hasEOL ? "\n" : "")).join("") + "\n";
    }
    return text;
  }
  if (name.endsWith(".doc")) throw new Error("old-doc");
  return await file.text();
}
