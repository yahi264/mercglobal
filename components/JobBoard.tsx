"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, CalendarClock, FileText, MapPin, Search, Users, Wallet, X } from "lucide-react";
import { activeJobs, fetchJobs, type Job, type JobsFile } from "@/lib/jobs";
import { localeNames, type Locale } from "@/lib/i18n";

type Labels = Record<
  | "search" | "all" | "none" | "loading" | "error" | "count" | "location" | "positions" | "type" | "salary"
  | "deadline" | "posted" | "requirements" | "description" | "apply" | "cv" | "writtenIn" | "close" | "other",
  string
>;

type Props = {
  locale: Locale;
  initial: JobsFile;
  sectors: { slug: string; title: string }[];
  labels: Labels;
  applyHref: string;
  cvHref: string;
};

const fmt = (d: string | undefined, l: Locale) => {
  if (!d) return "";
  try {
    return new Date(d + "T12:00:00").toLocaleDateString(l === "zh" ? "zh-CN" : l, { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return d;
  }
};

export function JobBoard({ locale, initial, sectors, labels, applyHref, cvHref }: Props) {
  const [file, setFile] = useState<JobsFile>(initial);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("");
  const [open, setOpen] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs()
      .then((f) => (setFile(f), setState("ok")))
      .catch(() => setState(initial.jobs.length ? "ok" : "error"));
  }, [initial.jobs.length]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  const sectorName = (slug: string) => sectors.find((s) => s.slug === slug)?.title ?? labels.other;
  const jobs = useMemo(() => {
    const term = q.trim().toLocaleLowerCase();
    return activeJobs(file)
      .filter((j) => !sector || j.sector === sector)
      .filter((j) => !term || [j.title, j.country, j.city, j.description].join(" ").toLocaleLowerCase().includes(term))
      .sort((a, b) => b.posted.localeCompare(a.posted));
  }, [file, q, sector]);

  const withJob = (href: string, j: Job) => `${href}?position=${encodeURIComponent(`${j.title} — ${[j.city, j.country].filter(Boolean).join(", ")}`)}`;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={labels.search} className="field !ps-11" aria-label={labels.search} />
        </label>
        <select value={sector} onChange={(e) => setSector(e.target.value)} className="field sm:max-w-xs" aria-label={labels.all}>
          <option value="">{labels.all}</option>
          {sectors.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {state === "loading" && jobs.length === 0 && <p className="py-10 text-center text-muted">{labels.loading}</p>}
      {state === "error" && jobs.length === 0 && <p className="py-10 text-center text-muted">{labels.error}</p>}

      {(state !== "loading" || jobs.length > 0) && (
        <p className="mb-4 text-sm font-semibold text-muted">
          <span className="text-brand" dir="ltr">
            {jobs.length}
          </span>{" "}
          {labels.count}
        </p>
      )}

      {state === "ok" && jobs.length === 0 && (
        <div className="card flex flex-col items-center gap-5 p-10 text-center">
          <Briefcase className="h-10 w-10 text-brand" strokeWidth={1.5} />
          <p className="max-w-xl text-muted">{labels.none}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={cvHref} className="btn-brand">
              <FileText className="h-4 w-4" /> {labels.cv}
            </Link>
            <Link href={applyHref} className="btn-outline">
              {labels.apply}
            </Link>
          </div>
        </div>
      )}

      <ul className="grid gap-4 md:grid-cols-2">
        {jobs.map((j) => (
          <li key={j.id}>
            <button
              type="button"
              onClick={() => setOpen(j)}
              className="card group flex h-full w-full flex-col p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-navy/10"
            >
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">{sectorName(j.sector)}</span>
              <span className="text-lg font-extrabold text-fg" lang={j.language}>
                {j.title}
              </span>
              <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {[j.city, j.country].filter(Boolean).join(", ")}
                </span>
                {j.positions && (
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {j.positions}
                  </span>
                )}
                {j.deadline && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="h-4 w-4" /> {fmt(j.deadline, locale)}
                  </span>
                )}
              </span>
              <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted" lang={j.language}>
                {j.description}
              </span>
              <span className="mt-4 text-sm font-bold text-brand">{labels.apply} →</span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="card relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-b-none p-6 sm:rounded-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <button type="button" onClick={() => setOpen(null)} aria-label={labels.close} className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg">
                <X className="h-5 w-5" />
              </button>
              <span className="mb-3 inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">{sectorName(open.sector)}</span>
              <h2 className="pe-10 text-2xl font-extrabold text-fg" lang={open.language}>
                {open.title}
              </h2>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  [MapPin, labels.location, [open.city, open.country].filter(Boolean).join(", ")],
                  [Users, labels.positions, open.positions],
                  [Briefcase, labels.type, open.type],
                  [Wallet, labels.salary, open.salary],
                  [CalendarClock, labels.deadline, fmt(open.deadline, locale)],
                  [CalendarClock, labels.posted, fmt(open.posted, locale)],
                ]
                  .filter(([, , v]) => v)
                  .map(([I, k, v]) => {
                    const Icon = I as typeof MapPin;
                    return (
                      <div key={k as string} className="flex gap-3 rounded-xl bg-page-2 p-3">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <div>
                          <dt className="text-xs text-muted">{k as string}</dt>
                          <dd className="font-semibold text-fg" lang={open.language}>
                            {v as string}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
              </dl>
              <h3 className="mb-2 mt-6 font-bold text-fg">{labels.description}</h3>
              <p className="whitespace-pre-line leading-relaxed text-muted" lang={open.language}>
                {open.description}
              </p>
              {open.requirements && (
                <>
                  <h3 className="mb-2 mt-6 font-bold text-fg">{labels.requirements}</h3>
                  <ul className="space-y-1.5 text-muted" lang={open.language}>
                    {open.requirements
                      .split("\n")
                      .map((r) => r.replace(/^[-•*]\s*/, "").trim())
                      .filter(Boolean)
                      .map((r) => (
                        <li key={r} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {r}
                        </li>
                      ))}
                  </ul>
                </>
              )}
              {open.language !== locale && (
                <p className="mt-6 text-xs text-muted">
                  {labels.writtenIn} {localeNames[open.language] ?? open.language}.
                </p>
              )}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={withJob(applyHref, open)} className="btn-brand flex-1">
                  {labels.apply}
                </Link>
                <Link href={withJob(cvHref, open)} className="btn-outline flex-1">
                  <FileText className="h-4 w-4" /> {labels.cv}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
