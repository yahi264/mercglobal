"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle, CheckCircle2, Copy, Download, ExternalLink, Eye, EyeOff, FileUp, KeyRound, Loader2, LogOut, Pencil, Plus, RefreshCw, Save, Search, Sparkles, Trash2, X,
} from "lucide-react";
import { REPO, type Job, type JobsFile } from "@/lib/jobs";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/asset";
import { fileToText, parseJobText } from "@/lib/job-import";

// Admin panel for job vacancies (/admin/). Reads and saves data/jobs.json in the GitHub repository
// through the GitHub API with a personal access token pasted once (kept only in this browser).
// Every action publishes immediately; if someone else saved in the meantime, the latest list is
// re-read and the change re-applied, so nothing is lost.

type Sector = { slug: string; title: string };
type Toast = { ok: boolean; text: string } | null;
const TOKEN_KEY = "merc-admin-token";
const api = `https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/${REPO.path}`;
const today = () => new Date().toISOString().slice(0, 10);
const b64 = (s: string) => {
  let bin = "";
  new TextEncoder().encode(s).forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
};
const unb64 = (s: string) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\n/g, "")), (c) => c.charCodeAt(0)));
const newId = () => Math.random().toString(36).slice(2, 10);
const empty = (): Job => ({
  id: newId(), title: "", country: "", city: "", sector: "construction-infrastructure", type: "", positions: "", salary: "",
  description: "", requirements: "", deadline: "", posted: today(), language: "en", active: true,
});
const statusOf = (j: Job) => (!j.active ? "hidden" : j.deadline && j.deadline < today() ? "expired" : "live");

export function AdminJobs({ sectors, siteJobsHref }: { sectors: Sector[]; siteJobsHref: string }) {
  const [token, setToken] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [file, setFile] = useState<JobsFile | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [edit, setEdit] = useState<Job | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "hidden" | "expired">("all");
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = (ok: boolean, text: string) => {
    setToast({ ok, text });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), ok ? 5000 : 9000);
  };
  const headers = useCallback((tk: string) => ({ Authorization: `Bearer ${tk}`, Accept: "application/vnd.github+json" }), []);

  // Read the latest list (and its version "sha") straight from GitHub
  const read = useCallback(
    async (tk: string): Promise<{ data: JobsFile; sha?: string }> => {
      const r = await fetch(`${api}?ref=${REPO.branch}&t=${Date.now()}`, { headers: headers(tk), cache: "no-store" });
      if (r.status === 401) throw new Error("The access key is not valid or has expired. Please paste it again. · Erişim anahtarı geçersiz veya süresi dolmuş.");
      if (r.status === 404) return { data: { updated: today(), jobs: [] } };
      if (!r.ok) throw new Error(`GitHub error ${r.status}`);
      const j = await r.json();
      return { data: JSON.parse(unb64(j.content)) as JobsFile, sha: j.sha };
    },
    [headers],
  );

  // Apply a change to the latest list and publish it (retries if the list changed meanwhile)
  const commit = async (label: string, change: (jobs: Job[]) => Job[], message: string) => {
    setBusy(label);
    try {
      for (let attempt = 0; attempt < 3; attempt++) {
        const { data, sha } = await read(token);
        const next: JobsFile = { updated: today(), jobs: change(data.jobs) };
        const r = await fetch(api, {
          method: "PUT",
          headers: { ...headers(token), "Content-Type": "application/json" },
          body: JSON.stringify({ message, branch: REPO.branch, content: b64(JSON.stringify(next, null, 2) + "\n"), ...(sha ? { sha } : {}) }),
        });
        if (r.status === 409 || r.status === 422) continue; // someone saved at the same time: re-read and retry
        if (r.status === 401) throw new Error("The access key is not valid or has expired. · Erişim anahtarı geçersiz.");
        if (r.status === 403 || r.status === 404) throw new Error("This access key cannot save (it needs Contents: Read and write on yahi264/mercglobal). · Anahtarın yazma izni yok.");
        if (!r.ok) throw new Error(`GitHub error ${r.status}`);
        setFile(next);
        notify(true, "Published ✓ — visible on the website within 1–2 minutes. · Yayınlandı ✓ — 1–2 dakika içinde sitede.");
        return true;
      }
      throw new Error("Could not save after several tries — please try again. · Kaydedilemedi, tekrar deneyin.");
    } catch (e) {
      notify(false, (e as Error).message);
      return false;
    } finally {
      setBusy(null);
    }
  };

  const connect = async (tk: string, remember: boolean) => {
    setBusy("connect");
    try {
      const { data } = await read(tk);
      setFile(data);
      setToken(tk);
      if (remember) {
        try {
          localStorage.setItem(TOKEN_KEY, tk);
        } catch {}
      }
      setKeyInput("");
    } catch (e) {
      notify(false, (e as Error).message);
      if (!remember) {
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch {}
      }
    } finally {
      setBusy(null);
    }
  };
  useEffect(() => {
    try {
      const tk = localStorage.getItem(TOKEN_KEY);
      if (tk) connect(tk, false);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const refresh = async () => {
    setBusy("refresh");
    try {
      setFile((await read(token)).data);
    } catch (e) {
      notify(false, (e as Error).message);
    } finally {
      setBusy(null);
    }
  };
  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken("");
    setFile(null);
  };

  const save = async (j: Job) => {
    const clean: Job = { ...j, title: j.title.trim(), country: j.country.trim(), city: j.city?.trim() };
    const ok = await commit(
      "save",
      (jobs) => (jobs.some((x) => x.id === clean.id) ? jobs.map((x) => (x.id === clean.id ? clean : x)) : [clean, ...jobs]),
      `Job vacancy: ${clean.title} (${clean.country})`,
    );
    if (ok) setEdit(null);
  };
  const toggle = (j: Job) => commit(j.id, (jobs) => jobs.map((x) => (x.id === j.id ? { ...x, active: !x.active } : x)), `${j.active ? "Hide" : "Show"} job vacancy: ${j.title}`);
  const remove = (j: Job) => {
    if (!confirm(`Delete “${j.title}”? This cannot be undone. · Silinsin mi? Geri alınamaz.`)) return;
    commit(j.id, (jobs) => jobs.filter((x) => x.id !== j.id), `Delete job vacancy: ${j.title}`);
  };
  const duplicate = (j: Job) => setEdit({ ...j, id: newId(), title: `${j.title} (copy)`, posted: today() });

  const sectorName = useMemo(() => Object.fromEntries(sectors.map((s) => [s.slug, s.title])), [sectors]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (file?.jobs ?? [])
      .filter((j) => filter === "all" || statusOf(j) === filter)
      .filter((j) => !t || `${j.title} ${j.country} ${j.city}`.toLowerCase().includes(t))
      .sort((a, b) => b.posted.localeCompare(a.posted));
  }, [file, q, filter]);
  const counts = useMemo(() => {
    const c = { all: 0, live: 0, hidden: 0, expired: 0 };
    file?.jobs.forEach((j) => (c.all++, c[statusOf(j)]++));
    return c;
  }, [file]);

  const ToastBox = toast && (
    <div className={`fixed inset-x-4 bottom-5 z-[95] mx-auto flex max-w-xl items-start gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl sm:inset-x-auto sm:end-6 ${toast.ok ? "bg-[#0f5132] text-white" : "bg-brand text-white"}`} role="status">
      {toast.ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
      <span className="flex-1">{toast.text}</span>
      <button type="button" onClick={() => setToast(null)} aria-label="Close"><X className="h-4 w-4" /></button>
    </div>
  );

  // ── not connected ──
  if (!token || !file) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="card space-y-4 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-fg"><KeyRound className="h-5 w-5 text-brand" /> Admin access · Yönetici girişi</h2>
          <p className="text-sm text-muted">Paste the GitHub access key to manage job vacancies. It is stored only in this browser. · İş ilanlarını yönetmek için GitHub erişim anahtarını yapıştırın; yalnızca bu tarayıcıda saklanır.</p>
          <input type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && keyInput.trim() && connect(keyInput.trim(), true)} placeholder="github_pat_…" className="field font-mono text-sm" autoComplete="off" aria-label="Access key" />
          <button type="button" onClick={() => connect(keyInput.trim(), true)} disabled={busy === "connect" || !keyInput.trim()} className="btn-brand w-full">
            {busy === "connect" ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Connect · Bağlan
          </button>
        </div>
        <details className="card p-6 text-sm text-muted">
          <summary className="cursor-pointer font-bold text-fg">How to create the access key (one time) · Anahtar nasıl oluşturulur</summary>
          <ol className="mt-4 list-decimal space-y-2 ps-5">
            <li>Sign in to GitHub as <b>{REPO.owner}</b> → <a className="font-semibold text-brand" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">Fine-grained token <ExternalLink className="inline h-3 w-3" /></a></li>
            <li>Repository access → <b>Only select repositories</b> → <b>{REPO.owner}/{REPO.name}</b></li>
            <li>Permissions → <b>Contents: Read and write</b> → Generate token → copy and paste above.</li>
          </ol>
        </details>
        {ToastBox}
      </div>
    );
  }

  // ── editor ──
  if (edit) return <Editor job={edit} sectors={sectors} onCancel={() => setEdit(null)} onSave={save} saving={busy === "save"} isNew={!file.jobs.some((x) => x.id === edit.id)} toast={ToastBox} />;

  // ── list ──
  const badge = { live: "bg-whatsapp/15 text-[#128c7e]", hidden: "bg-page-2 text-muted", expired: "bg-amber-100 text-amber-800" } as const;
  const badgeText = { live: "● Live · Yayında", hidden: "Hidden · Gizli", expired: "Expired · Süresi doldu" } as const;
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="card flex flex-wrap items-center gap-3 p-4">
        <button type="button" onClick={() => setEdit(empty())} className="btn-brand !px-5"><Plus className="h-4 w-4" /> New vacancy · Yeni ilan</button>
        <button type="button" onClick={() => setEdit({ ...empty(), id: "__import__" + newId() })} className="btn-outline !px-5"><FileUp className="h-4 w-4" /> Import from document · Belgeden ekle</button>
        <span className="flex-1" />
        <button type="button" onClick={refresh} disabled={!!busy} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand" title="Reload"><RefreshCw className={`h-3.5 w-3.5 ${busy === "refresh" ? "animate-spin" : ""}`} /> Refresh</button>
        <a href={siteJobsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><ExternalLink className="h-3.5 w-3.5" /> Website</a>
        <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><LogOut className="h-3.5 w-3.5" /> Log out · Çıkış</button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="field !ps-11" placeholder="Search title or country · Ara" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "live", "hidden", "expired"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${filter === f ? "border-brand bg-brand text-white" : "border-line text-fg hover:border-brand"}`}>
              {{ all: "All · Tümü", live: "Live · Yayında", hidden: "Hidden · Gizli", expired: "Expired · Süresi doldu" }[f]} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 && <p className="card p-10 text-center text-muted">{file.jobs.length ? "No vacancy matches. · Eşleşen ilan yok." : "No vacancies yet — click “New vacancy” or “Import from document”. · Henüz ilan yok."}</p>}
      <ul className="space-y-3">
        {list.map((j) => {
          const st = statusOf(j);
          const working = busy === j.id;
          return (
            <li key={j.id} className={`card flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${st !== "live" ? "opacity-75" : ""}`}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badge[st]}`}>{badgeText[st]}</span>
                  <span className="text-xs text-muted">{localeNames[j.language]} · {j.posted}{j.deadline ? ` → ${j.deadline}` : ""}</span>
                </div>
                <p className="mt-1.5 text-lg font-extrabold text-fg">{j.title}</p>
                <p className="text-sm text-muted">{[j.city, j.country].filter(Boolean).join(", ")} · {sectorName[j.sector] ?? "Other · Diğer"}{j.positions ? ` · ${j.positions} pers.` : ""}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {working ? (
                  <span className="inline-flex items-center gap-2 px-3 text-sm font-semibold text-muted"><Loader2 className="h-4 w-4 animate-spin" /> Publishing…</span>
                ) : (
                  <>
                    <button type="button" disabled={!!busy} onClick={() => setEdit(j)} className="btn-outline !px-3 !py-2 text-xs"><Pencil className="h-3.5 w-3.5" /> Edit · Düzenle</button>
                    <button type="button" disabled={!!busy} onClick={() => toggle(j)} className="btn-outline !px-3 !py-2 text-xs">{j.active ? <><EyeOff className="h-3.5 w-3.5" /> Hide · Gizle</> : <><Eye className="h-3.5 w-3.5" /> Show · Göster</>}</button>
                    <button type="button" disabled={!!busy} onClick={() => duplicate(j)} className="btn-outline !px-3 !py-2 text-xs"><Copy className="h-3.5 w-3.5" /> Copy · Kopyala</button>
                    <button type="button" disabled={!!busy} onClick={() => remove(j)} className="btn-outline !px-3 !py-2 text-xs hover:!border-brand hover:!text-brand"><Trash2 className="h-3.5 w-3.5" /> Delete · Sil</button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {ToastBox}
    </div>
  );
}

// ── Vacancy editor (with "import from document") ──
function Editor({ job, sectors, onCancel, onSave, saving, isNew, toast }: { job: Job; sectors: Sector[]; onCancel: () => void; onSave: (j: Job) => void; saving: boolean; isNew: boolean; toast: React.ReactNode }) {
  const importFirst = job.id.startsWith("__import__");
  const [j, setJ] = useState<Job>(importFirst ? { ...job, id: job.id.replace("__import__", "") } : job);
  const [filled, setFilled] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [paste, setPaste] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const [touched, setTouched] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof Job>(k: K, v: Job[K]) => setJ((x) => ({ ...x, [k]: v }));

  const countries = useMemo(() => {
    try {
      const codes = "AE AF AL AZ BD BG BA CN DE DZ EG ES FR GB GE GH GR IN ID IQ IR IT JO KE KW KZ LB LY MA MK MT NG NP OM PH PK PL QA RO RS RU SA SY TN TR TM UA US UZ VN YE".split(" ");
      const en = new Intl.DisplayNames(["en"], { type: "region" });
      const tr = new Intl.DisplayNames(["tr"], { type: "region" });
      return Array.from(new Set(codes.flatMap((c) => [en.of(c), tr.of(c)]).filter(Boolean) as string[]));
    } catch {
      return [];
    }
  }, []);

  const apply = (text: string) => {
    const found = parseJobText(text, countries);
    const keys = Object.keys(found).filter((k) => k !== "language" && k !== "sector");
    if (!keys.length) {
      setImportMsg({ ok: false, text: "Nothing could be read from this document. Try the template, or paste the text. · Belgeden bilgi okunamadı; şablonu kullanın veya metni yapıştırın." });
      return;
    }
    setJ((x) => ({ ...x, ...found }));
    setFilled(new Set([...keys, "sector", "language"]));
    setImportMsg({ ok: true, text: `Filled ${keys.length} fields from the document — please check them, then save. · ${keys.length} alan dolduruldu — kontrol edip kaydedin.` });
  };
  const onFile = async (f?: File) => {
    if (!f) return;
    setImporting(true);
    setImportMsg(null);
    try {
      apply(await fileToText(f));
    } catch (e) {
      setImportMsg({
        ok: false,
        text: (e as Error).message === "old-doc"
          ? "Old .doc files can't be read — open it in Word and “Save as” .docx or PDF. · Eski .doc dosyası okunamaz; .docx veya PDF olarak kaydedin."
          : "This file could not be read. Try .docx, .pdf or .txt, or paste the text. · Dosya okunamadı.",
      });
    } finally {
      setImporting(false);
    }
  };

  const required = { title: !j.title.trim(), country: !j.country.trim(), description: !j.description.trim() };
  const ok = !required.title && !required.country && !required.description;
  const lab = "mb-1 block text-xs font-semibold text-muted";
  const f = (k: string, bad = false) => `field ${bad && touched ? "!border-brand" : ""} ${filled.has(k) ? "ring-2 ring-whatsapp/50" : ""}`;
  const submit = () => {
    setTouched(true);
    if (ok) onSave(j);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5" onKeyDown={(e) => (e.ctrlKey || e.metaKey) && e.key === "s" && (e.preventDefault(), submit())}>
      <div className="card space-y-4 border-2 border-dashed !border-brand/40 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Sparkles className="h-5 w-5 text-brand" />
          <p className="flex-1 font-bold text-fg">Fill automatically from a document · Belgeden otomatik doldur</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={importing} className="btn-brand !px-4 !py-2.5 text-sm">
            {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />} Upload Word / PDF / text · Dosya yükle
          </button>
          <button type="button" onClick={() => setShowPaste((s) => !s)} className="btn-outline !px-4 !py-2.5 text-sm">Paste text · Metin yapıştır</button>
          <input ref={fileRef} type="file" hidden accept=".docx,.pdf,.txt,.doc" onChange={(e) => (onFile(e.target.files?.[0]), (e.target.value = ""))} />
        </div>
        <div className="grid gap-2 rounded-xl bg-page-2 p-3 text-sm sm:grid-cols-2">
          {[
            { t: "Blank template · Boş şablon", d: "Titles only — you fill it in · Sadece başlıklar, siz doldurun", en: "/templates/job-offer-blank-EN.docx", tr: "/templates/is-ilani-bos-TR.docx" },
            { t: "Example template · Örnek şablon", d: "Filled with a sample job · Örnek bir ilanla dolu", en: "/templates/job-offer-template-EN.docx", tr: "/templates/is-ilani-sablonu-TR.docx" },
          ].map((x) => (
            <div key={x.en} className="rounded-lg bg-card p-3">
              <p className="font-bold text-fg">{x.t}</p>
              <p className="mb-2 text-xs text-muted">{x.d}</p>
              <div className="flex flex-wrap gap-2">
                <a href={asset(x.en)} download className="btn-outline !px-3 !py-1.5 text-xs"><Download className="h-3.5 w-3.5" /> Word EN</a>
                <a href={asset(x.tr)} download className="btn-outline !px-3 !py-1.5 text-xs"><Download className="h-3.5 w-3.5" /> Word TR</a>
              </div>
            </div>
          ))}
        </div>
        {showPaste && (
          <div className="space-y-2">
            <textarea className="field text-sm" rows={6} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder={"Job title: TIG Welder\nCountry: Saudi Arabia\nCity: Riyadh\nRequirements:\n- 5 years experience"} />
            <button type="button" onClick={() => apply(paste)} disabled={!paste.trim()} className="btn-brand !px-4 !py-2 text-sm"><Sparkles className="h-4 w-4" /> Fill the form · Formu doldur</button>
          </div>
        )}
        {importMsg && (
          <p className={`flex gap-2 rounded-xl px-4 py-3 text-sm font-medium ${importMsg.ok ? "bg-whatsapp/10 text-[#128c7e]" : "bg-brand-soft text-brand"}`}>
            {importMsg.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />} {importMsg.text}
          </p>
        )}
        <p className="text-xs text-muted">Best results with the template: keep the labels (Job title:, Country:, Requirements: …) and fill in after them. · En iyi sonuç için şablonu kullanın.</p>
      </div>

      <div className="card space-y-4 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-fg">{isNew ? "New vacancy · Yeni ilan" : "Edit vacancy · İlanı düzenle"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className={lab}>Job title · Pozisyon *</span><input className={f("title", required.title)} value={j.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. TIG Welder" /></label>
          <label><span className={lab}>Country · Ülke *</span><input className={f("country", required.country)} list="adm-countries" value={j.country} onChange={(e) => set("country", e.target.value)} placeholder="Saudi Arabia" /></label>
          <label><span className={lab}>City · Şehir</span><input className={f("city")} value={j.city ?? ""} onChange={(e) => set("city", e.target.value)} placeholder="Riyadh" /></label>
          <datalist id="adm-countries">{countries.map((c) => <option key={c} value={c} />)}</datalist>
          <label>
            <span className={lab}>Sector · Sektör</span>
            <select className={f("sector")} value={j.sector} onChange={(e) => set("sector", e.target.value)}>
              {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              <option value="other">Other · Diğer</option>
            </select>
          </label>
          <label>
            <span className={lab}>Written in · İlan dili</span>
            <select className={f("language")} value={j.language} onChange={(e) => set("language", e.target.value as Locale)}>
              {locales.map((l) => <option key={l} value={l}>{localeNames[l]}</option>)}
            </select>
          </label>
          <label><span className={lab}>Openings · Kişi sayısı</span><input className={f("positions")} inputMode="numeric" value={j.positions ?? ""} onChange={(e) => set("positions", e.target.value)} placeholder="10" /></label>
          <label><span className={lab}>Employment type · Çalışma şekli</span><input className={f("type")} value={j.type ?? ""} onChange={(e) => set("type", e.target.value)} placeholder="Full-time · 2-year contract" /></label>
          <label><span className={lab}>Salary · Ücret (optional)</span><input className={f("salary")} value={j.salary ?? ""} onChange={(e) => set("salary", e.target.value)} placeholder="1,500 USD + accommodation" /></label>
          <label><span className={lab}>Apply by · Son başvuru (optional)</span><input type="date" className={f("deadline")} value={j.deadline ?? ""} onChange={(e) => set("deadline", e.target.value)} /></label>
          <label className="sm:col-span-2"><span className={lab}>Job description · İş tanımı *</span><textarea className={f("description", required.description)} rows={5} value={j.description} onChange={(e) => set("description", e.target.value)} /></label>
          <label className="sm:col-span-2"><span className={lab}>Requirements / qualifications — one per line · Aranan nitelikler — her satıra bir tane</span><textarea className={f("requirements")} rows={5} value={j.requirements ?? ""} onChange={(e) => set("requirements", e.target.value)} placeholder={"At least 5 years of experience\nValid welding certificate"} /></label>
          <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" checked={j.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-[#e3141e]" /> <span className="text-sm font-semibold text-fg">Show on the website · Sitede göster</span></label>
        </div>
        {touched && !ok && <p className="flex items-center gap-2 rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand"><AlertCircle className="h-4 w-4" /> Please fill in title, country and description. · Pozisyon, ülke ve iş tanımı zorunludur.</p>}
        <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row">
          <button type="button" onClick={submit} disabled={saving} className="btn-brand flex-1 !py-3.5">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Publishing… · Yayınlanıyor…" : "Save & publish · Kaydet ve yayınla"}
          </button>
          <button type="button" onClick={onCancel} disabled={saving} className="btn-outline flex-1">Cancel · İptal</button>
        </div>
      </div>
      {toast}
    </div>
  );
}
