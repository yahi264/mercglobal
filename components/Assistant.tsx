"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { detect, intentStems, norm, STOP, type Intent, type Phrases } from "@/lib/assistant";
import { activeJobs, fetchJobs } from "@/lib/jobs";
import { asset } from "@/lib/asset";
import { WhatsAppIcon } from "./Icons";

// Website assistant. It answers in the visitor's language from the site's own content (passed in as
// `kb` by the layout): services, sectors, sourcing regions, licence, work-permit fees, references,
// partners, vacancies, CV builder and contact details. Unknown questions are handed over to WhatsApp.
// Runs fully in the browser — no server or AI service needed.

type Item = { title: string; text?: string; href?: string };
export type Kb = {
  p: Phrases;
  whatsapp: string;
  services: Item[];
  sectors: Item[];
  regions: Item[];
  contact: { lines: { label: string; value: string; href?: string }[]; address: string; mapLink: string };
  licence: string;
  legalPoints: string[];
  about: string;
  vision: string;
  mission: string;
  permit: { fees: [string, string][]; note: string; wages: [string, string][]; href: string };
  partners: string[];
  references: string[];
  links: Record<"jobs" | "cv" | "careers" | "request" | "references" | "certificates" | "countries" | "services" | "sectors" | "about" | "contact", { href: string; label: string }>;
  chunks: Item[]; // everything searchable
};

type Answer = { text: string; items?: Item[]; links?: { href: string; label: string }[]; wa?: boolean; table?: [string, string][]; note?: string };
type Msg = { me?: string; bot?: Answer };

const KEY = () => `merc-assistant-${document.documentElement.lang}`; // one conversation per language
const isCjk = (s: string) => /[㐀-鿿]/.test(s);

function search(q: string, chunks: Item[], ignore: string[] = [], titleOnly = false): { item: Item; score: number } | null {
  const cjk = isCjk(q);
  let s = norm(q);
  for (const w of ignore) s = s.split(w).join(" ");
  const tokens = cjk
    ? Array.from({ length: Math.max(0, s.length - 1) }, (_, i) => s.slice(i, i + 2)).filter((t) => isCjk(t) && t.trim().length === 2)
    : s.split(" ").filter((w) => w.length >= 4 && !STOP.has(w));
  if (!tokens.length) return null;
  const docs = chunks.map((c) => ({ c, title: cjk ? c.title : norm(c.title), body: cjk ? c.text ?? "" : norm(c.text ?? "") }));
  const stems = tokens.map((tk) => (cjk ? tk : tk.slice(0, Math.max(4, Math.min(6, tk.length - 1)))));
  // words found in only one or two texts (e.g. a country name) count more than common ones
  const df = stems.map((st) => docs.filter((d) => d.title.includes(st) || d.body.includes(st)).length);
  let best: { item: Item; score: number } | null = null;
  for (const d of docs) {
    let score = 0;
    let inTitle = false;
    stems.forEach((st, i) => {
      if (!df[i]) return;
      const rare = df[i] <= 2;
      if (d.title.includes(st)) {
        score += rare ? 4 : 2;
        inTitle = true;
      } else if (!titleOnly && d.body.includes(st)) score += rare ? 3 : 0.5;
    });
    if (titleOnly && !inTitle) continue;
    if (score > (best?.score ?? 0)) best = { item: d.c, score };
  }
  return best && best.score >= 2 ? best : null;
}

export function Assistant({ kb }: { kb: Kb }) {
  const p = kb.p;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(KEY());
      if (s) setMsgs(JSON.parse(s));
    } catch {}
    const id = setTimeout(() => setTeaser(true), 9000);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY(), JSON.stringify(msgs.slice(-30)));
    } catch {}
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const answer = async (q: string): Promise<Answer> => {
    const intent: Intent | null = detect(q);
    // a specific service / sector / region named in the question beats the general answer
    if (intent === "services" || intent === "sectors" || intent === "countries" || intent === "request") {
      // "which sectors?" lists them all; "do you work in the energy sector?" answers that one sector
      const pool = intent === "services" ? kb.services : intent === "countries" ? kb.regions : kb.sectors;
      const hit = search(q, pool, intentStems(intent), intent !== "countries");
      if (hit) return { text: p.found, items: [hit.item], links: intent === "request" ? [kb.links.request] : undefined, wa: intent === "request" };
    }
    const L = kb.links;
    switch (intent) {
      case "hello":
        return { text: p.hello };
      case "thanks":
        return { text: p.thanks };
      case "fee":
        return { text: p.fee, links: [L.jobs, L.cv] };
      case "permitfees":
        return { text: p.permit, table: [...kb.permit.fees, ...kb.permit.wages], note: kb.permit.note, links: [{ href: kb.permit.href, label: p.more }] };
      case "cv":
        return { text: p.cv, links: [L.cv] };
      case "apply":
        return { text: p.apply, links: [L.jobs, L.cv, L.careers] };
      case "jobs": {
        try {
          const jobs = activeJobs(await fetchJobs());
          if (!jobs.length) return { text: p.jobsNone, links: [L.cv, L.jobs] };
          return {
            text: `${jobs.length} ${p.jobsSome}`,
            items: jobs.slice(0, 4).map((j) => ({ title: j.title, text: [j.city, j.country].filter(Boolean).join(", "), href: L.jobs.href })),
            links: [L.jobs, L.cv],
          };
        } catch {
          return { text: p.jobs, links: [L.jobs, L.cv] };
        }
      }
      case "request":
        return { text: p.request, links: [L.request], wa: true };
      case "services":
        return { text: p.services, items: kb.services, links: [L.services] };
      case "sectors":
        return { text: p.sectors, items: kb.sectors.map((s) => ({ title: s.title, href: s.href })), links: [L.sectors] };
      case "countries":
        return { text: p.countries, items: kb.regions, links: [L.countries] };
      case "licence":
        return { text: p.licence, items: [{ title: kb.licence }, ...kb.legalPoints.map((x) => ({ title: x }))], links: [L.certificates] };
      case "partners":
        return { text: p.partners, items: kb.partners.map((x) => ({ title: x })), links: [L.references] };
      case "references":
        return { text: p.references, items: kb.references.map((x) => ({ title: x })), links: [L.references] };
      case "about":
        return { text: p.about, items: [{ title: kb.about }, { title: kb.vision }, { title: kb.mission }], links: [L.about] };
      case "address":
        return { text: p.address, items: [{ title: kb.contact.address, href: kb.contact.mapLink }], links: [L.contact] };
      case "whatsapp":
      case "phone":
      case "email":
      case "contact":
        return { text: p.contact, items: kb.contact.lines.map((x) => ({ title: x.value, text: x.label, href: x.href })), wa: true };
    }
    const hit = search(q, kb.chunks);
    if (hit) return { text: p.found, items: [hit.item] };
    return { text: p.fallback, wa: true };
  };

  const ask = async (q: string) => {
    const text = q.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { me: text }]);
    setTyping(true);
    const [a] = await Promise.all([answer(text), new Promise((r) => setTimeout(r, 650))]);
    setTyping(false);
    setMsgs((m) => [...m, { bot: a }]);
  };

  const waLink = `https://wa.me/${kb.whatsapp}?text=${encodeURIComponent(msgs.filter((m) => m.me).slice(-1)[0]?.me ?? "")}`;
  const isExternal = (h: string) => /^(https?:|tel:|mailto:)/.test(h);

  const Bot = ({ a }: { a: Answer }) => (
    <div className="max-w-[88%] space-y-2 rounded-2xl rounded-ss-md bg-page-2 px-4 py-3 text-sm text-fg">
      <p className="leading-relaxed">{a.text}</p>
      {a.items && (
        <ul className="space-y-1.5">
          {a.items.map((it, i) => {
            const inner = (
              <>
                <span className="font-semibold">{it.title}</span>
                {it.text && <span className="block text-xs leading-relaxed text-muted">{it.text}</span>}
              </>
            );
            return (
              <li key={i} className="rounded-xl bg-card px-3 py-2 ring-1 ring-line">
                {it.href ? (
                  isExternal(it.href) ? (
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:text-brand">
                      {inner}
                    </a>
                  ) : (
                    <Link href={it.href} onClick={() => window.innerWidth < 640 && setOpen(false)} className="block hover:text-brand">
                      {inner}
                    </Link>
                  )
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      )}
      {a.table && (
        <table className="w-full overflow-hidden rounded-xl bg-card text-xs ring-1 ring-line">
          <tbody>
            {a.table.map(([k, v]) => (
              <tr key={k} className="border-b border-line last:border-0">
                <td className="px-3 py-1.5">{k}</td>
                <td className="whitespace-nowrap px-3 py-1.5 text-end font-bold text-brand">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {a.note && <p className="text-xs text-muted">{a.note}</p>}
      {(a.links?.length || a.wa) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {a.links?.map((l) => (
            <Link key={l.href + l.label} href={l.href} onClick={() => window.innerWidth < 640 && setOpen(false)} className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-dark">
              {l.label} <ArrowRight className="flip-rtl h-3 w-3" />
            </Link>
          ))}
          {a.wa && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-1.5 text-xs font-bold text-white">
              <WhatsAppIcon className="h-3.5 w-3.5" /> {p.whatsapp}
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`fixed bottom-[5.75rem] end-5 flex flex-col items-end gap-3 ${open ? "z-[75]" : "z-40"}`}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="card fixed inset-x-3 bottom-3 top-20 z-50 flex flex-col overflow-hidden shadow-2xl shadow-navy/30 sm:absolute sm:inset-auto sm:bottom-16 sm:end-0 sm:h-[34rem] sm:max-h-[calc(100svh-9rem)] sm:w-[23rem]"
            role="dialog"
            aria-label={p.name}
            data-lenis-prevent
          >
            <div className="flex items-center gap-3 bg-navy px-4 py-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/img/mark-red.png")} alt="" className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{p.name}</p>
                <p className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full bg-whatsapp" /> {p.online}
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10" aria-label={p.close}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div ref={list} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4">
              <Bot a={{ text: p.greet }} />
              {msgs.map((m, i) =>
                m.me ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-se-md bg-brand px-4 py-2.5 text-sm text-white">{m.me}</p>
                  </div>
                ) : m.bot ? (
                  <Bot key={i} a={m.bot} />
                ) : null,
              )}
              {typing && <p className="w-fit animate-pulse rounded-2xl bg-page-2 px-4 py-2.5 text-xs text-muted">{p.typing}</p>}
              {msgs.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-brand/40 px-3 py-1.5 text-start text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <form
              className="flex items-center gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={p.placeholder} className="field !rounded-full !py-2.5" aria-label={p.placeholder} />
              <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark" aria-label={p.send}>
                <Send className="flip-rtl h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {teaser && !open && (
          <motion.button
            type="button"
            onClick={() => (setOpen(true), setTeaser(false))}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="card absolute bottom-1 end-16 whitespace-nowrap px-4 py-2 text-sm font-semibold text-fg shadow-xl"
          >
            {p.teaser}
          </motion.button>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => (setOpen((o) => !o), setTeaser(false))}
        aria-label={open ? p.close : p.open}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl shadow-navy/30 ring-2 ring-brand transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && <Sparkles className="absolute -end-0.5 -top-0.5 h-5 w-5 rounded-full bg-brand p-1 text-white" />}
      </button>
    </div>
  );
}
