"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, Loader2, Mail, Paperclip, Send, UploadCloud, X } from "lucide-react";
import { activeJobs, fetchJobs, type JobsFile } from "@/lib/jobs";
import { okFile, sendApplication } from "@/lib/send";
import { WhatsAppIcon } from "./Icons";

// Job application: the candidate uploads an existing CV (PDF / Word / photo) and sends it, with the
// role, straight to all company mailboxes. Coming from a vacancy, the role is pre-selected.
// Candidates without a CV can jump to the CV builder instead.

type L = Record<
  | "title" | "intro" | "name" | "email" | "phone" | "country" | "nationality" | "position" | "general" | "change" | "message"
  | "upload" | "choose" | "uploadHint" | "noCv" | "send" | "sending" | "successTitle" | "successText" | "another" | "needFile"
  | "fileBad" | "fail" | "required" | "badEmail" | "consent" | "orEmail" | "orWhatsApp" | "uploadTab" | "createTab" | "createHint",
  string
>;

type Props = { labels: L; initial: JobsFile; cvHref: string; email: string; whatsapp: string; locale: string };

export function ApplicationForm({ labels: t, initial, cvHref, email, whatsapp, locale }: Props) {
  const [jobs, setJobs] = useState(activeJobs(initial));
  const [v, setV] = useState({ name: "", email: "", phone: "", country: "", nationality: "", message: "" });
  const [position, setPosition] = useState("");
  const [locked, setLocked] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);

  // the role comes from the vacancy the visitor clicked (?position=…)
  useEffect(() => {
    const p = new URLSearchParams(location.search).get("position");
    if (p) {
      setPosition(p);
      setLocked(true);
    }
    fetchJobs().then((f) => setJobs(activeJobs(f))).catch(() => {});
  }, []);

  const countries = useMemo(() => {
    try {
      const dn = new Intl.DisplayNames([locale], { type: "region" });
      const codes = "AF AL DZ AZ BD BY BA BG CM CN EG ET FR GE DE GH GR IN ID IR IQ IT JO KZ KE KG LB LY MK MT MA NP NG PK PS PH PL QA RO RU RW SA SN RS SO ZA KR LK SD SY TJ TZ TN TR TM UG UA AE GB US UZ VN YE ZM ZW".split(" ");
      return codes.map((c) => dn.of(c) ?? c).sort((a, b) => a.localeCompare(b, locale));
    } catch {
      return [];
    }
  }, [locale]);

  const role = position || t.general;
  const pick = (f?: File | null) => {
    if (!f) return;
    if (!okFile(f)) {
      setError(t.fileBad);
      return;
    }
    setError("");
    setFile(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!v.name.trim() || !v.email.trim() || !v.phone.trim()) return setError(t.required);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) return setError(t.badEmail);
    if (!file) return setError(t.needFile);
    setError("");
    setStatus("sending");
    const ok = await sendApplication(
      { role, name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim(), country: v.country, nationality: v.nationality, message: v.message },
      file,
    );
    setStatus(ok ? "ok" : "fail");
    top.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const reset = () => {
    setStatus("idle");
    setFile(null);
    setV((x) => ({ ...x, message: "" }));
  };

  if (status === "ok")
    return (
      <div ref={top} className="card flex flex-col items-center gap-4 p-8 text-center sm:p-12" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/15 text-[#128c7e]">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="text-2xl font-extrabold text-fg">{t.successTitle}</h2>
        <p className="max-w-lg text-muted">{t.successText.replace("{position}", role)}</p>
        <button type="button" onClick={reset} className="btn-outline mt-2">
          {t.another}
        </button>
      </div>
    );

  const field = (bad: boolean) => `field ${bad ? "!border-brand" : ""}`;
  const lab = "mb-1.5 block text-sm font-semibold text-fg";
  const req = <span className="text-brand">*</span>;

  return (
    <div ref={top} className="card p-6 sm:p-8" id="apply">
      <h2 className="text-2xl font-extrabold text-fg">{t.title}</h2>
      <p className="mb-6 mt-1 text-muted">{t.intro}</p>
      <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <span className={lab}>{t.position}</span>
          {locked ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-brand/40 bg-brand-soft px-4 py-3">
              <span className="flex-1 font-bold text-brand">{position}</span>
              <button type="button" onClick={() => setLocked(false)} className="text-xs font-semibold text-muted underline hover:text-brand">
                {t.change}
              </button>
            </div>
          ) : (
            <select className="field" value={position} onChange={(e) => setPosition(e.target.value)} aria-label={t.position}>
              <option value="">{t.general}</option>
              {jobs.map((j) => {
                const label = `${j.title} — ${[j.city, j.country].filter(Boolean).join(", ")}`;
                return (
                  <option key={j.id} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        <label>
          <span className={lab}>{t.name} {req}</span>
          <input className={field(touched && !v.name.trim())} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} autoComplete="name" />
        </label>
        <label>
          <span className={lab}>{t.email} {req}</span>
          <input type="email" className={field(touched && !v.email.trim())} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} autoComplete="email" />
        </label>
        <label>
          <span className={lab}>{t.phone} {req}</span>
          <input type="tel" className={field(touched && !v.phone.trim())} value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} autoComplete="tel" placeholder="+90 …" />
        </label>
        <label>
          <span className={lab}>{t.country}</span>
          <input className="field" list="ap-countries" value={v.country} onChange={(e) => setV({ ...v, country: e.target.value })} autoComplete="country-name" />
        </label>
        <label className="sm:col-span-2">
          <span className={lab}>{t.nationality}</span>
          <input className="field" list="ap-countries" value={v.nationality} onChange={(e) => setV({ ...v, nationality: e.target.value })} />
        </label>
        <datalist id="ap-countries">
          {countries.map((c) => <option key={c} value={c} />)}
        </datalist>

        {/* CV: upload an existing one, or create one here (attached to this application automatically) */}
        <div className="sm:col-span-2">
          <span className={lab}>{t.upload} {req}</span>
          <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-page-2 p-1">
            <span className="flex items-center justify-center gap-2 rounded-lg bg-card px-3 py-2.5 text-sm font-bold text-brand shadow-sm">
              <UploadCloud className="h-4 w-4" /> {t.uploadTab}
            </span>
            <Link href={`${cvHref}?position=${encodeURIComponent(role)}`} className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-card hover:text-brand">
              <FileText className="h-4 w-4" /> {t.createTab}
            </Link>
          </div>
          {file ? (
            <div className="flex items-center gap-3 rounded-xl border border-line bg-page-2 px-4 py-3">
              <Paperclip className="h-5 w-5 shrink-0 text-brand" />
              <span className="min-w-0 flex-1 truncate font-semibold text-fg">{file.name}</span>
              <span className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              <button type="button" onClick={() => setFile(null)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-card" aria-label="✕">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => input.current?.click()}
              onDragOver={(e) => (e.preventDefault(), setDrag(true))}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => (e.preventDefault(), setDrag(false), pick(e.dataTransfer.files?.[0]))}
              className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${
                drag ? "border-brand bg-brand-soft" : touched && !file ? "border-brand/60" : "border-line hover:border-brand"
              }`}
            >
              <UploadCloud className="h-8 w-8 text-brand" />
              <span className="font-semibold text-fg">{t.choose}</span>
              <span className="text-xs text-muted">{t.uploadHint}</span>
            </button>
          )}
          <input ref={input} type="file" hidden accept=".pdf,.doc,.docx,.odt,.rtf,.jpg,.jpeg,.png,.webp,.heic,application/pdf,image/*" onChange={(e) => pick(e.target.files?.[0])} />
          <p className="mt-2 text-xs text-muted">
            {t.createHint}{" "}
            <Link href={`${cvHref}?position=${encodeURIComponent(role)}`} className="font-semibold text-brand hover:underline">{t.createTab} →</Link>
          </p>
        </div>

        <label className="sm:col-span-2">
          <span className={lab}>{t.message}</span>
          <textarea className="field" rows={3} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} />
        </label>

        {error && (
          <p role="alert" className="flex items-center gap-2 rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand sm:col-span-2">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </p>
        )}
        {status === "fail" && (
          <div role="alert" className="space-y-3 rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand sm:col-span-2">
            <p className="flex gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {t.fail}</p>
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${email}?subject=${encodeURIComponent(`Job application — ${role} — ${v.name}`)}`} className="btn-outline !px-3 !py-2 text-xs"><Mail className="h-4 w-4" /> {t.orEmail}</a>
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Job application — ${role} — ${v.name}`)}`} target="_blank" rel="noopener noreferrer" className="btn-wa !px-3 !py-2 text-xs"><WhatsAppIcon className="h-4 w-4" /> {t.orWhatsApp}</a>
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <button type="submit" disabled={status === "sending"} className="btn-brand w-full !py-3.5 text-base">
            {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="flip-rtl h-5 w-5" />}
            {status === "sending" ? t.sending : t.send}
          </button>
          <p className="mt-3 text-center text-xs text-muted">{t.consent}</p>
        </div>
      </form>
    </div>
  );
}
