"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle, CheckCircle2, Copy, Download, ExternalLink, Eye, EyeOff, FileUp, KeyRound, Loader2, LogOut, Mail, Pencil, Plus, RefreshCw, Save, Search, Sparkles, Trash2, User, Users, X,
} from "lucide-react";
import { type Job } from "@/lib/jobs";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/asset";
import { apiPost, hasApi } from "@/lib/api";
import { fileToText, parseJobText } from "@/lib/job-import";

// Admin panel for job vacancies (/admin/). Signs in with a username and password (tab "Admins" of the
// website's Google Sheet) and manages the vacancies stored in that sheet through the website backend
// (scripts/apps-script/Code.gs). For every vacancy, and for general applications, the admin ticks which
// company addresses receive the CVs. The session is kept only in this browser tab.

type Sector = { slug: string; title: string };
type Toast = { ok: boolean; text: string } | null;
type Admin = { user: string; isSuper?: boolean; jobs: Job[]; generalRecipients: string[]; options: string[]; sheetUrl?: string };
const SESSION_KEY = "merc-admin-session";
const today = () => new Date().toISOString().slice(0, 10);
const newId = () => Math.random().toString(36).slice(2, 10);
const statusOf = (j: Job) => (!j.active ? "hidden" : j.deadline && j.deadline < today() ? "expired" : "live");

const errText = (e: string | undefined) =>
  ({
    wrong: "Wrong username or password. · Kullanıcı adı veya şifre hatalı.",
    locked: "Too many wrong attempts — try again in 15 minutes. · Çok fazla hatalı deneme; 15 dakika sonra tekrar deneyin.",
    auth: "Your session has expired — please sign in again. · Oturum süresi doldu; tekrar giriş yapın.",
    missing: "Please fill in the required fields. · Zorunlu alanları doldurun.",
    forbidden: "Only a super admin can do this. · Bu işlem için süper yönetici yetkisi gerekir.",
  })[e ?? ""] ?? (e ? `Error: ${e}` : "Connection problem — please try again. · Bağlantı sorunu; tekrar deneyin.");

export function AdminJobs({ sectors }: { sectors: Sector[] }) {
  const [token, setToken] = useState("");
  const [data, setData] = useState<Admin | null>(null);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [edit, setEdit] = useState<Job | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "hidden" | "expired">("all");
  const [general, setGeneral] = useState<string[]>([]);
  const [pw, setPw] = useState<{ old: string; next: string } | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = (ok: boolean, text: string) => {
    setToast({ ok, text });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), ok ? 5000 : 9000);
  };

  const signOut = (msg?: string) => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
    setToken("");
    setData(null);
    if (msg) notify(false, msg);
  };

  // Load everything the admin needs (vacancies with their recipients, general-application recipients)
  const load = async (tk: string) => {
    const r = await apiPost<Admin>("admin_get", { token: tk });
    if (!r.ok) {
      if (r.error === "auth") return signOut(errText("auth"));
      throw new Error(errText(r.error));
    }
    setData(r);
    setGeneral(r.generalRecipients);
  };

  useEffect(() => {
    try {
      const tk = sessionStorage.getItem(SESSION_KEY);
      if (tk) {
        setBusy("connect");
        setToken(tk);
        load(tk).catch((e) => notify(false, (e as Error).message)).finally(() => setBusy(null));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async () => {
    if (!login.username.trim() || !login.password) return notify(false, errText("missing"));
    setBusy("connect");
    try {
      const r = await apiPost<{ token: string }>("login", { username: login.username.trim(), password: login.password });
      if (!r.ok) throw new Error(errText(r.error));
      try {
        sessionStorage.setItem(SESSION_KEY, r.token);
      } catch {}
      setToken(r.token);
      setLogin({ username: "", password: "" });
      await load(r.token);
    } catch (e) {
      notify(false, (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  // Run an admin action, then reload the list from the sheet
  const run = async (label: string, action: string, body: Record<string, unknown>, done: string) => {
    setBusy(label);
    try {
      const r = await apiPost(action, { token, ...body });
      if (!r.ok) {
        if (r.error === "auth") {
          signOut(errText("auth"));
          return false;
        }
        throw new Error(errText(r.error));
      }
      await load(token);
      notify(true, done);
      return true;
    } catch (e) {
      notify(false, (e as Error).message);
      return false;
    } finally {
      setBusy(null);
    }
  };
  const published = "Published ✓ — visible on the website within a minute. · Yayınlandı ✓";

  const save = async (j: Job) => {
    const clean: Job = { ...j, title: j.title.trim(), country: j.country.trim(), city: j.city?.trim() };
    if (await run("save", "admin_save_job", { job: clean }, published)) setEdit(null);
  };
  const toggle = (j: Job) => run(j.id, "admin_save_job", { job: { ...j, active: !j.active } }, published);
  const remove = (j: Job) => {
    if (!confirm(`Delete “${j.title}”? This cannot be undone. · Silinsin mi? Geri alınamaz.`)) return;
    run(j.id, "admin_delete_job", { id: j.id }, "Deleted ✓ · Silindi ✓");
  };
  const duplicate = (j: Job) => setEdit({ ...j, id: newId(), title: `${j.title} (copy)`, posted: today() });
  const saveGeneral = () => run("general", "admin_save_settings", { generalRecipients: general }, "Saved ✓ · Kaydedildi ✓");
  const changePw = async () => {
    if (!pw) return;
    if (pw.next.length < 8) return notify(false, "The new password must have at least 8 characters. · Yeni şifre en az 8 karakter olmalı.");
    if (await run("pw", "admin_change_password", { oldPassword: pw.old, newPassword: pw.next }, "Password changed ✓ · Şifre değiştirildi ✓")) setPw(null);
  };

  const empty = (): Job => ({
    id: newId(), title: "", country: "", city: "", sector: "construction-infrastructure", type: "", positions: "", salary: "",
    description: "", requirements: "", deadline: "", posted: today(), language: "en", active: true, recipients: data?.generalRecipients ?? [],
  });

  const sectorName = useMemo(() => Object.fromEntries(sectors.map((s) => [s.slug, s.title])), [sectors]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (data?.jobs ?? [])
      .filter((j) => filter === "all" || statusOf(j) === filter)
      .filter((j) => !t || `${j.title} ${j.country} ${j.city}`.toLowerCase().includes(t))
      .sort((a, b) => b.posted.localeCompare(a.posted));
  }, [data, q, filter]);
  const counts = useMemo(() => {
    const c = { all: 0, live: 0, hidden: 0, expired: 0 };
    data?.jobs.forEach((j) => (c.all++, c[statusOf(j)]++));
    return c;
  }, [data]);

  const ToastBox = toast && (
    <div className={`fixed inset-x-4 bottom-5 z-[95] mx-auto flex max-w-xl items-start gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl sm:inset-x-auto sm:end-6 ${toast.ok ? "bg-[#0f5132] text-white" : "bg-brand text-white"}`} role="status">
      {toast.ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
      <span className="flex-1">{toast.text}</span>
      <button type="button" onClick={() => setToast(null)} aria-label="Close"><X className="h-4 w-4" /></button>
    </div>
  );

  if (!hasApi())
    return <p className="card mx-auto max-w-2xl p-8 text-center text-muted">The admin backend is not configured yet (company.apiEndpoint in lib/content.ts). · Yönetim servisi henüz ayarlanmadı.</p>;

  // ── sign in ──
  if (!token || !data) {
    return (
      <div className="mx-auto max-w-md space-y-6">
        <form className="card space-y-4 p-6 sm:p-8" onSubmit={(e) => (e.preventDefault(), signIn())}>
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-fg"><KeyRound className="h-5 w-5 text-brand" /> Admin sign in · Yönetici girişi</h2>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted">Username · Kullanıcı adı</span>
            <input className="field" value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} autoComplete="username" autoCapitalize="none" spellCheck={false} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted">Password · Şifre</span>
            <input type="password" className="field" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} autoComplete="current-password" />
          </label>
          <button type="submit" disabled={busy === "connect"} className="btn-brand w-full">
            {busy === "connect" ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Sign in · Giriş yap
          </button>
          <p className="text-xs text-muted">Admin accounts are managed in the website’s Google Sheet (tab “Admins”) on info@turkishmanpower.com. · Yönetici hesapları Google E-Tablosundaki “Admins” sekmesinden yönetilir.</p>
        </form>
        {ToastBox}
      </div>
    );
  }

  // ── editor ──
  if (edit)
    return <Editor job={edit} sectors={sectors} options={data.options} onCancel={() => setEdit(null)} onSave={save} saving={busy === "save"} isNew={!data.jobs.some((x) => x.id === edit.id)} toast={ToastBox} />;

  // ── list ──
  const badge = { live: "bg-whatsapp/15 text-[#128c7e]", hidden: "bg-page-2 text-muted", expired: "bg-amber-100 text-amber-800" } as const;
  const badgeText = { live: "● Live · Yayında", hidden: "Hidden · Gizli", expired: "Expired · Süresi doldu" } as const;
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="card flex flex-wrap items-center gap-3 p-4">
        <button type="button" onClick={() => setEdit(empty())} className="btn-brand !px-5"><Plus className="h-4 w-4" /> New vacancy · Yeni ilan</button>
        <button type="button" onClick={() => setEdit({ ...empty(), id: "__import__" + newId() })} className="btn-outline !px-5"><FileUp className="h-4 w-4" /> Import from document · Belgeden ekle</button>
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted"><User className="h-3.5 w-3.5" /> {data.user}</span>
        <button type="button" onClick={() => (setBusy("refresh"), load(token).catch((e) => notify(false, (e as Error).message)).finally(() => setBusy(null)))} disabled={!!busy} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><RefreshCw className={`h-3.5 w-3.5 ${busy === "refresh" ? "animate-spin" : ""}`} /> Refresh</button>
        <a href={asset("/en/jobs/")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><ExternalLink className="h-3.5 w-3.5" /> Website</a>
        {data.isSuper && (
          <button type="button" onClick={() => setShowUsers((x) => !x)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><Users className="h-3.5 w-3.5" /> Users · Kullanıcılar</button>
        )}
        <button type="button" onClick={() => setPw(pw ? null : { old: "", next: "" })} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><KeyRound className="h-3.5 w-3.5" /> Password · Şifre</button>
        <button type="button" onClick={() => signOut()} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-brand"><LogOut className="h-3.5 w-3.5" /> Log out · Çıkış</button>
      </div>

      {pw && (
        <form className="card grid gap-3 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end" onSubmit={(e) => (e.preventDefault(), changePw())}>
          <label><span className="mb-1 block text-xs font-semibold text-muted">Current password · Mevcut şifre</span><input type="password" className="field" value={pw.old} onChange={(e) => setPw({ ...pw, old: e.target.value })} autoComplete="current-password" /></label>
          <label><span className="mb-1 block text-xs font-semibold text-muted">New password (8+ characters) · Yeni şifre</span><input type="password" className="field" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" /></label>
          <button type="submit" disabled={busy === "pw"} className="btn-brand">{busy === "pw" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Change · Değiştir</button>
        </form>
      )}

      {data.isSuper && showUsers && <UsersPanel token={token} me={data.user} notify={notify} onAuthLost={() => signOut(errText("auth"))} />}

      {/* who receives general applications (not linked to a vacancy) */}
      <div className="card space-y-3 p-5">
        <p className="flex items-center gap-2 font-bold text-fg"><Mail className="h-4 w-4 text-brand" /> General applications are sent to · Genel başvurular şu adreslere gider</p>
        <Recipients options={data.options} value={general} onChange={setGeneral} />
        <button type="button" onClick={saveGeneral} disabled={busy === "general" || !general.length || general.join() === data.generalRecipients.join()} className="btn-outline !px-4 !py-2 text-sm">
          {busy === "general" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save · Kaydet
        </button>
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

      {list.length === 0 && <p className="card p-10 text-center text-muted">{data.jobs.length ? "No vacancy matches. · Eşleşen ilan yok." : "No vacancies yet — click “New vacancy” or “Import from document”. · Henüz ilan yok."}</p>}
      <ul className="space-y-3">
        {list.map((j) => {
          const st = statusOf(j);
          const working = busy === j.id;
          const to = j.recipients?.length ? j.recipients : data.generalRecipients;
          return (
            <li key={j.id} className={`card flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${st !== "live" ? "opacity-75" : ""}`}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badge[st]}`}>{badgeText[st]}</span>
                  <span className="text-xs text-muted">{localeNames[j.language] ?? j.language} · {j.posted}{j.deadline ? ` → ${j.deadline}` : ""}</span>
                </div>
                <p className="mt-1.5 text-lg font-extrabold text-fg">{j.title}</p>
                <p className="text-sm text-muted">{[j.city, j.country].filter(Boolean).join(", ")} · {sectorName[j.sector] ?? "Other · Diğer"}{j.positions ? ` · ${j.positions} pers.` : ""}</p>
                <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted"><Mail className="h-3.5 w-3.5 text-brand" /> {to.join(" · ")}</p>
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

// ── Admin users (super admins only): add, rename, reset password, delete ──
type AdminUser = { username: string; note: string; super: boolean };
function UsersPanel({ token, me, notify, onAuthLost }: { token: string; me: string; notify: (ok: boolean, t: string) => void; onAuthLost: () => void }) {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [form, setForm] = useState<{ oldUsername: string; username: string; password: string; note: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const call = async (action: string, body: Record<string, unknown>) => {
    const r = await apiPost<{ users: AdminUser[] }>(action, { token, ...body });
    if (!r.ok) {
      if (r.error === "auth") onAuthLost();
      throw new Error(errText(r.error));
    }
    return r;
  };
  const reload = async () => setUsers((await call("admin_users", {})).users);
  useEffect(() => {
    reload().catch((e) => notify(false, (e as Error).message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    if (!form) return;
    setBusy(true);
    try {
      await call("admin_save_user", form);
      await reload();
      notify(true, "Saved ✓ · Kaydedildi ✓");
      setForm(null);
    } catch (e) {
      notify(false, (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const del = async (u: AdminUser) => {
    if (!confirm(`Delete the admin “${u.username}”? · “${u.username}” silinsin mi?`)) return;
    setBusy(true);
    try {
      await call("admin_delete_user", { username: u.username });
      await reload();
      notify(true, "Deleted ✓ · Silindi ✓");
    } catch (e) {
      notify(false, (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const lab = "mb-1 block text-xs font-semibold text-muted";
  return (
    <div className="card space-y-4 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="flex flex-1 items-center gap-2 font-bold text-fg"><Users className="h-4 w-4 text-brand" /> Admin users · Yönetici kullanıcıları</p>
        <button type="button" onClick={() => setForm({ oldUsername: "", username: "", password: "", note: "" })} className="btn-outline !px-3 !py-2 text-xs"><Plus className="h-3.5 w-3.5" /> Add user · Kullanıcı ekle</button>
      </div>
      {!users ? (
        <p className="flex items-center gap-2 text-sm text-muted"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</p>
      ) : (
        <ul className="divide-y divide-line rounded-xl border border-line">
          {users.map((u) => (
            <li key={u.username} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <span className="min-w-0 flex-1">
                <b className="text-fg">{u.username}</b>
                {u.super && <span className="ms-2 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">super admin</span>}
                {u.username === me && <span className="ms-2 text-xs text-muted">(you · siz)</span>}
                {u.note && <span className="block text-xs text-muted">{u.note}</span>}
              </span>
              <button type="button" disabled={busy} onClick={() => setForm({ oldUsername: u.username, username: u.username, password: "", note: u.note })} className="btn-outline !px-3 !py-1.5 text-xs"><Pencil className="h-3.5 w-3.5" /> Edit / reset password · Düzenle / şifre sıfırla</button>
              {u.username !== me && (
                <button type="button" disabled={busy} onClick={() => del(u)} className="btn-outline !px-3 !py-1.5 text-xs hover:!border-brand hover:!text-brand"><Trash2 className="h-3.5 w-3.5" /> Delete · Sil</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {form && (
        <form className="grid gap-3 rounded-xl bg-page-2 p-4 sm:grid-cols-3" onSubmit={(e) => (e.preventDefault(), save())}>
          <label><span className={lab}>Username · Kullanıcı adı</span><input className="field" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} autoCapitalize="none" spellCheck={false} autoComplete="off" /></label>
          <label><span className={lab}>{form.oldUsername ? "New password (empty = keep) · Yeni şifre (boş = aynı)" : "Password (8+ characters) · Şifre"}</span><input type="password" className="field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="new-password" /></label>
          <label><span className={lab}>Name / note · Ad / not</span><input className="field" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>
          <div className="flex gap-2 sm:col-span-3">
            <button type="submit" disabled={busy} className="btn-brand !px-5 !py-2.5 text-sm">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save · Kaydet</button>
            <button type="button" onClick={() => setForm(null)} className="btn-outline !px-5 !py-2.5 text-sm">Cancel · İptal</button>
          </div>
        </form>
      )}
    </div>
  );
}

// ── Checkboxes: which company addresses receive the CVs ──
function Recipients({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const all = options.every((o) => value.includes(o));
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => onChange(all ? [] : [...options])} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${all ? "border-brand bg-brand text-white" : "border-line text-fg hover:border-brand"}`}>
        All · Tümü
      </button>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <label key={o} className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${on ? "border-brand bg-brand-soft text-brand" : "border-line text-fg hover:border-brand"}`}>
            <input type="checkbox" className="h-3.5 w-3.5 accent-[#e3141e]" checked={on} onChange={() => onChange(on ? value.filter((x) => x !== o) : options.filter((x) => x === o || value.includes(x)))} />
            {o}
          </label>
        );
      })}
    </div>
  );
}


// ── Vacancy editor (with "import from document") ──
function Editor({ job, sectors, options, onCancel, onSave, saving, isNew, toast }: { job: Job; sectors: Sector[]; options: string[]; onCancel: () => void; onSave: (j: Job) => void; saving: boolean; isNew: boolean; toast: React.ReactNode }) {
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
          <div className="space-y-2 rounded-xl border border-line bg-page-2 p-4 sm:col-span-2">
            <p className="flex items-center gap-2 text-sm font-bold text-fg"><Mail className="h-4 w-4 text-brand" /> CVs for this vacancy are sent to · Bu ilanın CV’leri şu adreslere gider</p>
            <Recipients options={options} value={j.recipients ?? []} onChange={(v) => set("recipients", v)} />
            {!j.recipients?.length && <p className="text-xs text-muted">None ticked → the general-application addresses are used. · Hiçbiri seçilmezse genel başvuru adresleri kullanılır.</p>}
          </div>
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
