"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, Eye, EyeOff, KeyRound, LogOut, Pencil, Plus, Save, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { REPO, type Job, type JobsFile } from "@/lib/jobs";
import { localeNames, locales, type Locale } from "@/lib/i18n";

// Admin panel for job vacancies (/admin/). It reads and saves data/jobs.json in the GitHub repository
// through the GitHub API, using a personal access token that the admin pastes once (kept only in this
// browser). Without a valid token nobody can change the vacancies.

type Sector = { slug: string; title: string };
const TOKEN_KEY = "merc-admin-token";
const api = `https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/${REPO.path}`;
const today = () => new Date().toISOString().slice(0, 10);

const b64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
};
const unb64 = (s: string) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\n/g, "")), (c) => c.charCodeAt(0)));

const empty = (): Job => ({
  id: Math.random().toString(36).slice(2, 10),
  title: "", country: "", city: "", sector: "construction-infrastructure", type: "", positions: "", salary: "",
  description: "", requirements: "", deadline: "", posted: today(), language: "en", active: true,
});

export function AdminJobs({ sectors }: { sectors: Sector[] }) {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<JobsFile | null>(null);
  const [sha, setSha] = useState<string | undefined>();
  const [edit, setEdit] = useState<Job | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);

  const headers = (tk = token) => ({ Authorization: `Bearer ${tk}`, Accept: "application/vnd.github+json" });

  const load = async (tk = token) => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch(`${api}?ref=${REPO.branch}&t=${Date.now()}`, { headers: headers(tk), cache: "no-store" });
      if (r.status === 401) throw new Error("The access key is not valid (401). Please paste it again. / Erişim anahtarı geçersiz.");
      if (r.status === 404) {
        setFile({ updated: today(), jobs: [] });
        setSha(undefined);
      } else if (!r.ok) throw new Error(`GitHub error ${r.status}`);
      else {
        const j = await r.json();
        setFile(JSON.parse(unb64(j.content)) as JobsFile);
        setSha(j.sha);
      }
      setDirty(false);
      return true;
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
      return false;
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    try {
      const tk = localStorage.getItem(TOKEN_KEY);
      if (tk) {
        setToken(tk);
        load(tk);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = async () => {
    const tk = input.trim();
    if (!tk) return;
    if (await load(tk)) {
      setToken(tk);
      try {
        localStorage.setItem(TOKEN_KEY, tk);
      } catch {}
      setInput("");
    }
  };
  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken("");
    setFile(null);
  };

  const publish = async () => {
    if (!file) return;
    setBusy(true);
    setMsg(null);
    try {
      const next: JobsFile = { ...file, updated: today() };
      const body = JSON.stringify({
        message: `Update job vacancies (${next.jobs.filter((j) => j.active).length} active)`,
        content: b64(JSON.stringify(next, null, 2) + "\n"),
        branch: REPO.branch,
        ...(sha ? { sha } : {}),
      });
      const r = await fetch(api, { method: "PUT", headers: { ...headers(), "Content-Type": "application/json" }, body });
      if (r.status === 409) throw new Error("Someone else changed the vacancies meanwhile — reload and try again. / Başka biri değiştirmiş, sayfayı yenileyin.");
      if (r.status === 403 || r.status === 404) throw new Error("This access key cannot save to the repository (needs Contents: Read and write). / Anahtarın yazma izni yok.");
      if (!r.ok) throw new Error(`GitHub error ${r.status}`);
      const j = await r.json();
      setSha(j.content.sha);
      setFile(next);
      setDirty(false);
      setMsg({ ok: true, text: "Published! Visible on the website within 1–2 minutes. / Yayınlandı! 1–2 dakika içinde sitede görünür." });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const saveJob = (j: Job) => {
    if (!file) return;
    const exists = file.jobs.some((x) => x.id === j.id);
    setFile({ ...file, jobs: exists ? file.jobs.map((x) => (x.id === j.id ? j : x)) : [j, ...file.jobs] });
    setEdit(null);
    setDirty(true);
  };
  const remove = (id: string) => {
    if (!file || !confirm("Delete this vacancy? / Bu ilan silinsin mi?")) return;
    setFile({ ...file, jobs: file.jobs.filter((x) => x.id !== id) });
    setDirty(true);
  };
  const toggle = (id: string) => {
    if (!file) return;
    setFile({ ...file, jobs: file.jobs.map((x) => (x.id === id ? { ...x, active: !x.active } : x)) });
    setDirty(true);
  };

  const sectorName = useMemo(() => Object.fromEntries(sectors.map((s) => [s.slug, s.title])), [sectors]);
  const lab = "mb-1 block text-xs font-semibold text-muted";

  // ── not connected: explain how to get an access key ──
  if (!token || !file) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="card space-y-4 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-fg">
            <KeyRound className="h-5 w-5 text-brand" /> Admin access · Yönetici girişi
          </h2>
          <p className="text-sm text-muted">Paste the GitHub access key to manage job vacancies. It is stored only in this browser. · İş ilanlarını yönetmek için GitHub erişim anahtarını yapıştırın. Yalnızca bu tarayıcıda saklanır.</p>
          <div className="flex gap-2">
            <input
              type={show ? "text" : "password"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && connect()}
              placeholder="github_pat_…"
              className="field flex-1 font-mono text-sm"
              autoComplete="off"
              aria-label="Access key"
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="btn-outline !px-3" aria-label="Show / hide">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button type="button" onClick={connect} disabled={busy || !input.trim()} className="btn-brand w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Connect · Bağlan
          </button>
          {msg && <p className={`rounded-xl px-4 py-3 text-sm ${msg.ok ? "bg-whatsapp/10 text-[#128c7e]" : "bg-brand-soft text-brand"}`}>{msg.text}</p>}
        </div>
        <details className="card p-6 text-sm text-muted">
          <summary className="cursor-pointer font-bold text-fg">How to create the access key (one time) · Anahtar nasıl oluşturulur (bir kez)</summary>
          <ol className="mt-4 list-decimal space-y-2 ps-5">
            <li>
              Sign in to GitHub as <b>{REPO.owner}</b> and open{" "}
              <a className="font-semibold text-brand" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">
                Fine-grained token <ExternalLink className="inline h-3 w-3" />
              </a>
              .
            </li>
            <li>Name: <b>Merc Global jobs</b> · Expiration: e.g. 1 year.</li>
            <li>Repository access → <b>Only select repositories</b> → <b>{REPO.owner}/{REPO.name}</b>.</li>
            <li>Permissions → Repository permissions → <b>Contents: Read and write</b>.</li>
            <li>Click <b>Generate token</b>, copy it and paste it above. Keep it private — anyone with it can edit the vacancies.</li>
          </ol>
        </details>
      </div>
    );
  }

  // ── editor ──
  if (edit) {
    const set = <K extends keyof Job>(k: K, v: Job[K]) => setEdit({ ...edit, [k]: v });
    const ok = edit.title.trim() && edit.country.trim() && edit.description.trim();
    return (
      <div className="card mx-auto max-w-3xl space-y-4 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-fg">{file.jobs.some((x) => x.id === edit.id) ? "Edit vacancy · İlanı düzenle" : "New vacancy · Yeni ilan"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className={lab}>Job title · Pozisyon *</span><input className="field" value={edit.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. TIG Welder" /></label>
          <label><span className={lab}>Country · Ülke *</span><input className="field" value={edit.country} onChange={(e) => set("country", e.target.value)} placeholder="Saudi Arabia" /></label>
          <label><span className={lab}>City · Şehir</span><input className="field" value={edit.city ?? ""} onChange={(e) => set("city", e.target.value)} placeholder="Riyadh" /></label>
          <label>
            <span className={lab}>Sector · Sektör</span>
            <select className="field" value={edit.sector} onChange={(e) => set("sector", e.target.value)}>
              {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              <option value="other">Other · Diğer</option>
            </select>
          </label>
          <label>
            <span className={lab}>Written in · İlan dili</span>
            <select className="field" value={edit.language} onChange={(e) => set("language", e.target.value as Locale)}>
              {locales.map((l) => <option key={l} value={l}>{localeNames[l]}</option>)}
            </select>
          </label>
          <label><span className={lab}>Openings · Kişi sayısı</span><input className="field" value={edit.positions ?? ""} onChange={(e) => set("positions", e.target.value)} placeholder="10" /></label>
          <label><span className={lab}>Employment type · Çalışma şekli</span><input className="field" value={edit.type ?? ""} onChange={(e) => set("type", e.target.value)} placeholder="Full-time · 2-year contract" /></label>
          <label><span className={lab}>Salary · Ücret (optional)</span><input className="field" value={edit.salary ?? ""} onChange={(e) => set("salary", e.target.value)} placeholder="1,500 USD + accommodation" /></label>
          <label><span className={lab}>Apply by · Son başvuru (optional)</span><input type="date" className="field" value={edit.deadline ?? ""} onChange={(e) => set("deadline", e.target.value)} /></label>
          <label className="sm:col-span-2"><span className={lab}>Job description · İş tanımı *</span><textarea className="field" rows={4} value={edit.description} onChange={(e) => set("description", e.target.value)} /></label>
          <label className="sm:col-span-2"><span className={lab}>Requirements, one per line · Aranan nitelikler, her satıra bir tane</span><textarea className="field" rows={4} value={edit.requirements ?? ""} onChange={(e) => set("requirements", e.target.value)} placeholder={"Min. 5 years experience\nValid welding certificate"} /></label>
          <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" checked={edit.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-[#e3141e]" /> <span className="text-sm font-semibold text-fg">Show on the website · Sitede göster</span></label>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" disabled={!ok} onClick={() => saveJob({ ...edit, title: edit.title.trim(), country: edit.country.trim() })} className="btn-brand flex-1">
            <CheckCircle2 className="h-4 w-4" /> Done · Tamam
          </button>
          <button type="button" onClick={() => setEdit(null)} className="btn-outline flex-1">Cancel · İptal</button>
        </div>
        <p className="text-xs text-muted">After “Done”, press “Publish” on the list to put the changes online. · “Tamam”dan sonra listede “Yayınla”ya basın.</p>
      </div>
    );
  }

  // ── list ──
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="card flex flex-wrap items-center gap-3 p-4">
        <button type="button" onClick={() => setEdit(empty())} className="btn-brand !px-5"><Plus className="h-4 w-4" /> New vacancy · Yeni ilan</button>
        <button type="button" onClick={publish} disabled={busy || !dirty} className={`btn !px-5 ${dirty ? "bg-navy text-white" : "border border-line text-muted"}`}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Publish · Yayınla
        </button>
        {dirty && <span className="text-xs font-semibold text-brand">Unpublished changes · Yayınlanmamış değişiklikler</span>}
        <span className="flex-1" />
        <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><LogOut className="h-3.5 w-3.5" /> Log out · Çıkış</button>
      </div>
      {msg && (
        <p className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${msg.ok ? "bg-whatsapp/10 text-[#128c7e]" : "bg-brand-soft text-brand"}`}>
          {msg.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />} {msg.text}
        </p>
      )}
      {file.jobs.length === 0 && <p className="card p-8 text-center text-muted">No vacancies yet. · Henüz ilan yok.</p>}
      <ul className="space-y-3">
        {file.jobs.map((j) => (
          <li key={j.id} className={`card flex flex-col gap-3 p-5 sm:flex-row sm:items-center ${j.active ? "" : "opacity-60"}`}>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-fg">{j.title}</p>
              <p className="text-sm text-muted">
                {[j.city, j.country].filter(Boolean).join(", ")} · {sectorName[j.sector] ?? "Other"} · {localeNames[j.language]} · {j.posted}
                {j.deadline && ` → ${j.deadline}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => toggle(j.id)} className="btn-outline !px-3 !py-2 text-xs">{j.active ? <><EyeOff className="h-3.5 w-3.5" /> Hide · Gizle</> : <><Eye className="h-3.5 w-3.5" /> Show · Göster</>}</button>
              <button type="button" onClick={() => setEdit(j)} className="btn-outline !px-3 !py-2 text-xs"><Pencil className="h-3.5 w-3.5" /> Edit · Düzenle</button>
              <button type="button" onClick={() => remove(j.id)} className="btn-outline !px-3 !py-2 text-xs hover:!border-brand hover:!text-brand"><Trash2 className="h-3.5 w-3.5" /> Delete · Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
