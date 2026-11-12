"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileText, Mail, Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import { asset } from "@/lib/asset";
import { WhatsAppIcon } from "./Icons";

// Online CV builder for job seekers: the CV itself is written in English or Turkish (the candidate
// chooses), shown live in a clean A4 layout, saved only in the visitor's browser, printed to PDF and
// sent to Merç Global by email or WhatsApp. No server is involved.

type CvLang = "en" | "tr";
type Exp = { role: string; company: string; place: string; from: string; to: string; duties: string };
type Edu = { school: string; degree: string; from: string; to: string };
type Lng = { name: string; level: string };
type Cert = { name: string; year: string };
type Cv = {
  lang: CvLang;
  name: string; title: string; email: string; phone: string; city: string; nationality: string; birth: string; licence: string;
  photo: string; summary: string; skills: string;
  experience: Exp[]; education: Edu[]; languages: Lng[]; certificates: Cert[];
};

const L = {
  en: {
    personal: "Personal details", name: "Full name", title: "Position applied for", email: "Email", phone: "Phone / WhatsApp",
    city: "City, country", nationality: "Nationality", birth: "Date of birth", licence: "Driving licence", photo: "Photo",
    addPhoto: "Add a photo", summary: "Profile", summaryHint: "2–3 sentences about your experience and strengths",
    experience: "Work experience", role: "Job title", company: "Company", place: "Country / city", from: "From", to: "To",
    duties: "Main duties (one per line)", addExp: "Add work experience", education: "Education", school: "School / university",
    degree: "Degree / field of study", addEdu: "Add education", languages: "Languages", language: "Language", level: "Level",
    addLang: "Add language", certificates: "Certificates & courses", certificate: "Certificate / course", year: "Year",
    addCert: "Add certificate", skills: "Skills", skillsHint: "e.g. TIG welding, reading drawings, MS Office (separate with commas)",
    remove: "Remove", contact: "Contact", cv: "Curriculum Vitae", present: "Present",
    levels: ["Native", "Fluent", "Good", "Basic"],
    footer: "CV prepared with Merç Global · www.mercglobal.com.tr",
  },
  tr: {
    personal: "Kişisel bilgiler", name: "Ad Soyad", title: "Başvurulan pozisyon", email: "E-posta", phone: "Telefon / WhatsApp",
    city: "Şehir, ülke", nationality: "Uyruk", birth: "Doğum tarihi", licence: "Ehliyet", photo: "Fotoğraf",
    addPhoto: "Fotoğraf ekle", summary: "Profil", summaryHint: "Deneyiminiz ve güçlü yönleriniz hakkında 2–3 cümle",
    experience: "İş deneyimi", role: "Pozisyon", company: "Firma", place: "Ülke / şehir", from: "Başlangıç", to: "Bitiş",
    duties: "Başlıca görevler (her satıra bir görev)", addExp: "İş deneyimi ekle", education: "Eğitim", school: "Okul / üniversite",
    degree: "Bölüm / derece", addEdu: "Eğitim ekle", languages: "Yabancı diller", language: "Dil", level: "Seviye",
    addLang: "Dil ekle", certificates: "Sertifikalar ve kurslar", certificate: "Sertifika / kurs", year: "Yıl",
    addCert: "Sertifika ekle", skills: "Yetkinlikler", skillsHint: "ör. TIG kaynak, teknik resim okuma, MS Office (virgülle ayırın)",
    remove: "Sil", contact: "İletişim", cv: "Özgeçmiş", present: "Halen",
    levels: ["Ana dil", "İleri", "Orta", "Başlangıç"],
    footer: "Bu CV Merç Global ile hazırlanmıştır · www.mercglobal.com.tr",
  },
};

const blank = (lang: CvLang): Cv => ({
  lang, name: "", title: "", email: "", phone: "", city: "", nationality: "", birth: "", licence: "", photo: "", summary: "", skills: "",
  experience: [{ role: "", company: "", place: "", from: "", to: "", duties: "" }],
  education: [{ school: "", degree: "", from: "", to: "" }],
  languages: [{ name: "", level: "" }],
  certificates: [],
});

// Example CV (a fictional candidate) so visitors can see what a good CV looks like.
const example = (lang: CvLang): Cv =>
  lang === "tr"
    ? {
        lang, name: "Ahmet Yılmaz", title: "Kaynakçı (TIG / MIG)", email: "ahmet.yilmaz@ornek.com", phone: "+90 5xx xxx xx xx",
        city: "Kocaeli, Türkiye", nationality: "T.C.", birth: "14.03.1990", licence: "B, C", photo: "",
        summary: "Petrol, doğalgaz ve çelik konstrüksiyon projelerinde 10 yılı aşkın deneyime sahip sertifikalı kaynakçı. Teknik resim okuyabilen, iş güvenliği kurallarına titizlikle uyan ve yurt dışı şantiyelerde ekip içinde çalışmaya alışkın.",
        skills: "TIG kaynak, MIG/MAG kaynak, boru kaynağı (6G), teknik resim okuma, taşlama, iş güvenliği",
        experience: [
          { role: "Kaynakçı", company: "Örnek Enerji İnşaat A.Ş.", place: "Irak, Basra", from: "2019", to: "Halen", duties: "Rafineri borulama hatlarında TIG/MIG kaynak\nKalite kontrol ekibiyle NDT testlerine hazırlık\nGenç kaynakçılara saha eğitimi" },
          { role: "Kaynakçı", company: "Örnek Çelik Yapı Ltd.", place: "Türkiye, İzmit", from: "2014", to: "2019", duties: "Çelik konstrüksiyon montaj kaynakları\nTeknik resme göre imalat" },
        ],
        education: [{ school: "Gebze Mesleki ve Teknik Anadolu Lisesi", degree: "Metal Teknolojisi", from: "2005", to: "2009" }],
        languages: [{ name: "Türkçe", level: "Ana dil" }, { name: "İngilizce", level: "Orta" }],
        certificates: [{ name: "EN ISO 9606-1 Kaynakçı Sertifikası", year: "2022" }, { name: "İş Sağlığı ve Güvenliği Eğitimi", year: "2023" }],
      }
    : {
        lang, name: "John Smith", title: "Welder (TIG / MIG)", email: "john.smith@example.com", phone: "+00 000 000 0000",
        city: "Bucharest, Romania", nationality: "Romanian", birth: "14/03/1990", licence: "B, C", photo: "",
        summary: "Certified welder with over 10 years of experience on oil & gas, refinery and steel structure projects. Reads technical drawings, follows safety rules strictly and is used to working in international teams on site abroad.",
        skills: "TIG welding, MIG/MAG welding, pipe welding (6G), reading technical drawings, grinding, HSE awareness",
        experience: [
          { role: "Welder", company: "Example Energy Construction Co.", place: "Iraq, Basra", from: "2019", to: "Present", duties: "TIG/MIG welding on refinery piping lines\nPreparing joints for NDT inspection with the QC team\nOn-site training of junior welders" },
          { role: "Welder", company: "Example Steel Structures Ltd.", place: "Romania, Constanța", from: "2014", to: "2019", duties: "Assembly welding of steel structures\nFabrication according to technical drawings" },
        ],
        education: [{ school: "Technical High School", degree: "Metal Technology", from: "2005", to: "2009" }],
        languages: [{ name: "Romanian", level: "Native" }, { name: "English", level: "Good" }],
        certificates: [{ name: "EN ISO 9606-1 Welder Qualification", year: "2022" }, { name: "Occupational Health & Safety Training", year: "2023" }],
      };

const KEY = "merc-cv";

type UiLabels = { language: string; example: string; clear: string; download: string; send: string; whatsapp: string; saved: string; sendNote: string; preview: string };

export function CvBuilder({ ui, email, whatsapp, defaultLang }: { ui: UiLabels; email: string; whatsapp: string; defaultLang: CvLang }) {
  const [cv, setCv] = useState<Cv>(() => blank(defaultLang));
  const [loaded, setLoaded] = useState(false);
  const [sent, setSent] = useState(false);
  const t = L[cv.lang];
  const file = useRef<HTMLInputElement>(null);

  // restore a saved draft; take the position from the address (?position=…) when coming from a vacancy
  useEffect(() => {
    let next = blank(defaultLang);
    try {
      const s = localStorage.getItem(KEY);
      if (s) next = { ...next, ...JSON.parse(s) };
    } catch {}
    const pos = new URLSearchParams(location.search).get("position");
    if (pos) next.title = pos;
    setCv(next);
    setLoaded(true);
  }, [defaultLang]);
  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(cv));
      } catch {}
    }, 400);
    return () => clearTimeout(id);
  }, [cv, loaded]);

  const set = <K extends keyof Cv>(k: K, v: Cv[K]) => setCv((c) => ({ ...c, [k]: v }));
  const setItem = <K extends "experience" | "education" | "languages" | "certificates">(k: K, i: number, patch: Partial<Cv[K][number]>) =>
    setCv((c) => ({ ...c, [k]: (c[k] as Cv[K][number][]).map((x, n) => (n === i ? { ...x, ...patch } : x)) }));
  const add = <K extends "experience" | "education" | "languages" | "certificates">(k: K, v: Cv[K][number]) => setCv((c) => ({ ...c, [k]: [...(c[k] as Cv[K][number][]), v] }));
  const del = (k: "experience" | "education" | "languages" | "certificates", i: number) => setCv((c) => ({ ...c, [k]: (c[k] as unknown[]).filter((_, n) => n !== i) }));

  const onPhoto = (f?: File) => {
    if (!f) return;
    const img = new Image();
    img.onload = () => {
      const s = 360, c = document.createElement("canvas");
      const r = Math.max(s / img.width, s / img.height);
      c.width = s; c.height = s;
      c.getContext("2d")!.drawImage(img, (s - img.width * r) / 2, (s - img.height * r) / 2, img.width * r, img.height * r);
      set("photo", c.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(f);
  };

  const asText = () => {
    const lines = [`${t.cv.toUpperCase()} — ${cv.name}`, cv.title, ""];
    const kv = [[t.email, cv.email], [t.phone, cv.phone], [t.city, cv.city], [t.nationality, cv.nationality], [t.birth, cv.birth], [t.licence, cv.licence]];
    kv.filter(([, v]) => v).forEach(([k, v]) => lines.push(`${k}: ${v}`));
    if (cv.summary) lines.push("", `${t.summary.toUpperCase()}`, cv.summary);
    const exp = cv.experience.filter((e) => e.role || e.company);
    if (exp.length) {
      lines.push("", t.experience.toUpperCase());
      exp.forEach((e) => {
        lines.push(`• ${e.role} — ${e.company} (${e.place}) ${e.from}–${e.to}`);
        e.duties.split("\n").filter(Boolean).forEach((d) => lines.push(`   - ${d}`));
      });
    }
    const edu = cv.education.filter((e) => e.school);
    if (edu.length) {
      lines.push("", t.education.toUpperCase());
      edu.forEach((e) => lines.push(`• ${e.school} — ${e.degree} ${e.from}–${e.to}`));
    }
    const lng = cv.languages.filter((x) => x.name);
    if (lng.length) lines.push("", t.languages.toUpperCase(), lng.map((x) => `${x.name} (${x.level})`).join(", "));
    const cer = cv.certificates.filter((x) => x.name);
    if (cer.length) {
      lines.push("", t.certificates.toUpperCase());
      cer.forEach((x) => lines.push(`• ${x.name} ${x.year}`));
    }
    if (cv.skills) lines.push("", t.skills.toUpperCase(), cv.skills);
    return lines.join("\n");
  };
  const subject = `${t.cv} — ${cv.name || "…"}${cv.title ? ` — ${cv.title}` : ""}`;
  const sendMail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(asText())}`;
    setSent(true);
  };
  const sendWa = () => {
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(asText())}`, "_blank", "noopener");
    setSent(true);
  };

  const field = "field !py-2.5";
  const lab = "mb-1 block text-xs font-semibold text-muted";
  const box = "card space-y-4 p-5 sm:p-6";
  const h = "text-base font-extrabold text-fg";
  const addBtn = "inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline";
  const rm = "inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-brand";

  const skills = cv.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const exp = cv.experience.filter((e) => e.role || e.company || e.duties);
  const edu = cv.education.filter((e) => e.school || e.degree);
  const lng = cv.languages.filter((x) => x.name);
  const cer = cv.certificates.filter((x) => x.name);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* ─── Form ─── */}
      <div className="cv-form space-y-5">
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <span className="text-sm font-bold text-fg">{ui.language}:</span>
          {(["en", "tr"] as CvLang[]).map((lg) => (
            <button
              key={lg}
              type="button"
              onClick={() => set("lang", lg)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${cv.lang === lg ? "border-brand bg-brand text-white" : "border-line text-fg hover:border-brand"}`}
            >
              {lg === "en" ? "English" : "Türkçe"}
            </button>
          ))}
          <span className="flex-1" />
          <button type="button" onClick={() => setCv({ ...example(cv.lang), photo: cv.photo })} className={addBtn}>
            <FileText className="h-4 w-4" /> {ui.example}
          </button>
          <button type="button" onClick={() => setCv(blank(cv.lang))} className={rm}>
            <RotateCcw className="h-3.5 w-3.5" /> {ui.clear}
          </button>
        </div>

        <section className={box} lang={cv.lang}>
          <h3 className={h}>{t.personal}</h3>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => file.current?.click()} className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-page-2 text-muted hover:border-brand" aria-label={t.addPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {cv.photo ? <img src={cv.photo} alt="" className="h-full w-full object-cover" /> : <Upload className="h-5 w-5" />}
            </button>
            <div className="text-sm">
              <p className="font-semibold text-fg">{t.photo}</p>
              <button type="button" onClick={() => file.current?.click()} className={addBtn}>
                {t.addPhoto}
              </button>
              {cv.photo && (
                <button type="button" onClick={() => set("photo", "")} className={`${rm} ms-3`}>
                  {t.remove}
                </button>
              )}
            </div>
            <input ref={file} type="file" accept="image/*" hidden onChange={(e) => onPhoto(e.target.files?.[0])} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["name", "title", "email", "phone", "city", "nationality", "birth", "licence"] as const).map((k) => (
              <label key={k} className={k === "name" || k === "title" ? "sm:col-span-1" : ""}>
                <span className={lab}>{t[k]}</span>
                <input className={field} value={cv[k]} onChange={(e) => set(k, e.target.value)} type={k === "email" ? "email" : "text"} autoComplete={k === "name" ? "name" : k === "email" ? "email" : k === "phone" ? "tel" : "off"} />
              </label>
            ))}
          </div>
          <label className="block">
            <span className={lab}>{t.summary}</span>
            <textarea className={field} rows={3} value={cv.summary} placeholder={t.summaryHint} onChange={(e) => set("summary", e.target.value)} />
          </label>
        </section>

        <section className={box} lang={cv.lang}>
          <h3 className={h}>{t.experience}</h3>
          {cv.experience.map((e, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-line p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label><span className={lab}>{t.role}</span><input className={field} value={e.role} onChange={(x) => setItem("experience", i, { role: x.target.value })} /></label>
                <label><span className={lab}>{t.company}</span><input className={field} value={e.company} onChange={(x) => setItem("experience", i, { company: x.target.value })} /></label>
                <label><span className={lab}>{t.place}</span><input className={field} value={e.place} onChange={(x) => setItem("experience", i, { place: x.target.value })} /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label><span className={lab}>{t.from}</span><input className={field} value={e.from} onChange={(x) => setItem("experience", i, { from: x.target.value })} /></label>
                  <label><span className={lab}>{t.to}</span><input className={field} value={e.to} placeholder={t.present} onChange={(x) => setItem("experience", i, { to: x.target.value })} /></label>
                </div>
              </div>
              <label className="block"><span className={lab}>{t.duties}</span><textarea className={field} rows={3} value={e.duties} onChange={(x) => setItem("experience", i, { duties: x.target.value })} /></label>
              <button type="button" onClick={() => del("experience", i)} className={rm}><Trash2 className="h-3.5 w-3.5" /> {t.remove}</button>
            </div>
          ))}
          <button type="button" onClick={() => add("experience", { role: "", company: "", place: "", from: "", to: "", duties: "" })} className={addBtn}><Plus className="h-4 w-4" /> {t.addExp}</button>
        </section>

        <section className={box} lang={cv.lang}>
          <h3 className={h}>{t.education}</h3>
          {cv.education.map((e, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-line p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label><span className={lab}>{t.school}</span><input className={field} value={e.school} onChange={(x) => setItem("education", i, { school: x.target.value })} /></label>
                <label><span className={lab}>{t.degree}</span><input className={field} value={e.degree} onChange={(x) => setItem("education", i, { degree: x.target.value })} /></label>
                <label><span className={lab}>{t.from}</span><input className={field} value={e.from} onChange={(x) => setItem("education", i, { from: x.target.value })} /></label>
                <label><span className={lab}>{t.to}</span><input className={field} value={e.to} onChange={(x) => setItem("education", i, { to: x.target.value })} /></label>
              </div>
              <button type="button" onClick={() => del("education", i)} className={rm}><Trash2 className="h-3.5 w-3.5" /> {t.remove}</button>
            </div>
          ))}
          <button type="button" onClick={() => add("education", { school: "", degree: "", from: "", to: "" })} className={addBtn}><Plus className="h-4 w-4" /> {t.addEdu}</button>
        </section>

        <section className={box} lang={cv.lang}>
          <h3 className={h}>{t.languages}</h3>
          {cv.languages.map((x, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3">
              <label className="min-w-[8rem] flex-1"><span className={lab}>{t.language}</span><input className={field} value={x.name} onChange={(e) => setItem("languages", i, { name: e.target.value })} /></label>
              <label className="min-w-[8rem] flex-1">
                <span className={lab}>{t.level}</span>
                <select className={field} value={x.level} onChange={(e) => setItem("languages", i, { level: e.target.value })}>
                  <option value="">—</option>
                  {t.levels.map((lv) => <option key={lv}>{lv}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => del("languages", i)} className={`${rm} pb-3`} aria-label={t.remove}><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => add("languages", { name: "", level: "" })} className={addBtn}><Plus className="h-4 w-4" /> {t.addLang}</button>
        </section>

        <section className={box} lang={cv.lang}>
          <h3 className={h}>{t.certificates}</h3>
          {cv.certificates.map((x, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3">
              <label className="min-w-[10rem] flex-[3]"><span className={lab}>{t.certificate}</span><input className={field} value={x.name} onChange={(e) => setItem("certificates", i, { name: e.target.value })} /></label>
              <label className="min-w-[5rem] flex-1"><span className={lab}>{t.year}</span><input className={field} value={x.year} onChange={(e) => setItem("certificates", i, { year: e.target.value })} /></label>
              <button type="button" onClick={() => del("certificates", i)} className={`${rm} pb-3`} aria-label={t.remove}><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => add("certificates", { name: "", year: "" })} className={addBtn}><Plus className="h-4 w-4" /> {t.addCert}</button>
          <label className="block pt-2">
            <span className={lab}>{t.skills}</span>
            <textarea className={field} rows={2} value={cv.skills} placeholder={t.skillsHint} onChange={(e) => set("skills", e.target.value)} />
          </label>
        </section>
        <p className="text-xs text-muted">{ui.saved}</p>
      </div>

      {/* ─── Live preview (this is what is printed to PDF) ─── */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()} className="btn-brand flex-1 !px-4">
            <Download className="h-4 w-4" /> {ui.download}
          </button>
          <button type="button" onClick={sendMail} className="btn-outline flex-1 !px-4">
            <Mail className="h-4 w-4" /> {ui.send}
          </button>
          <button type="button" onClick={sendWa} className="btn-wa !px-4" aria-label={ui.whatsapp} title={ui.whatsapp}>
            <WhatsAppIcon className="h-5 w-5" />
          </button>
        </div>
        {sent && <p className="mb-3 rounded-xl bg-whatsapp/10 px-4 py-3 text-sm font-medium text-[#128c7e] dark:text-whatsapp">{ui.sendNote}</p>}
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">{ui.preview}</p>
        <div className="cv-wrap @container overflow-hidden rounded-xl shadow-2xl shadow-navy/20 ring-1 ring-line">
          <article id="cv-sheet" className="cv-sheet" lang={cv.lang} dir="ltr">
            <header className="cv-head">
              {cv.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cv.photo} alt="" className="cv-photo" />
              )}
              <div className="min-w-0">
                <p className="cv-kicker">{t.cv}</p>
                <h2 className="cv-name">{cv.name || t.name}</h2>
                {cv.title && <p className="cv-role">{cv.title}</p>}
              </div>
            </header>
            <div className="cv-body">
              <aside className="cv-side">
                <h4>{t.contact}</h4>
                <ul className="cv-list">
                  {[cv.phone, cv.email, cv.city].filter(Boolean).map((v) => <li key={v} className="break-all">{v}</li>)}
                </ul>
                {(cv.nationality || cv.birth || cv.licence) && (
                  <>
                    <h4>{t.personal}</h4>
                    <ul className="cv-list">
                      {cv.nationality && <li><b>{t.nationality}:</b> {cv.nationality}</li>}
                      {cv.birth && <li><b>{t.birth}:</b> {cv.birth}</li>}
                      {cv.licence && <li><b>{t.licence}:</b> {cv.licence}</li>}
                    </ul>
                  </>
                )}
                {lng.length > 0 && (
                  <>
                    <h4>{t.languages}</h4>
                    <ul className="cv-list">{lng.map((x, i) => <li key={i}><b>{x.name}</b>{x.level && ` — ${x.level}`}</li>)}</ul>
                  </>
                )}
                {skills.length > 0 && (
                  <>
                    <h4>{t.skills}</h4>
                    <div className="cv-tags">{skills.map((s) => <span key={s}>{s}</span>)}</div>
                  </>
                )}
              </aside>
              <main className="cv-main">
                {cv.summary && (
                  <section>
                    <h4>{t.summary}</h4>
                    <p>{cv.summary}</p>
                  </section>
                )}
                {exp.length > 0 && (
                  <section>
                    <h4>{t.experience}</h4>
                    {exp.map((e, i) => (
                      <div key={i} className="cv-item">
                        <div className="cv-item-top">
                          <b>{e.role}</b>
                          <span>{[e.from, e.to || t.present].filter(Boolean).join(" – ")}</span>
                        </div>
                        <p className="cv-sub">{[e.company, e.place].filter(Boolean).join(" · ")}</p>
                        {e.duties && <ul>{e.duties.split("\n").filter(Boolean).map((d, n) => <li key={n}>{d}</li>)}</ul>}
                      </div>
                    ))}
                  </section>
                )}
                {edu.length > 0 && (
                  <section>
                    <h4>{t.education}</h4>
                    {edu.map((e, i) => (
                      <div key={i} className="cv-item">
                        <div className="cv-item-top">
                          <b>{e.school}</b>
                          <span>{[e.from, e.to].filter(Boolean).join(" – ")}</span>
                        </div>
                        {e.degree && <p className="cv-sub">{e.degree}</p>}
                      </div>
                    ))}
                  </section>
                )}
                {cer.length > 0 && (
                  <section>
                    <h4>{t.certificates}</h4>
                    <ul>{cer.map((x, i) => <li key={i}>{x.name}{x.year && ` (${x.year})`}</li>)}</ul>
                  </section>
                )}
              </main>
            </div>
            <footer className="cv-foot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/mark-red.png")} alt="" />
              <span>{t.footer}</span>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
