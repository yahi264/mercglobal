// Sends a job application (details + CV file) to all company mailboxes.
// 1) Preferred: the branded mailer on the company's Google account (company.applyEndpoint, see
//    scripts/apps-script/Code.gs) — designed HTML email to the team + confirmation to the candidate.
// 2) Fallback: FormSubmit (company.cvEndpoint, copies to company.applyCc) with a plain table email.
import { company } from "./content";

export const MAX_FILE = 5 * 1024 * 1024;
export const okFile = (f: File) => f.size > 0 && f.size <= MAX_FILE && /\.(pdf|docx?|odt|rtf|jpe?g|png|webp|heic)$/i.test(f.name);

export type CvData = {
  title?: string; summary?: string; skills?: string; birth?: string; licence?: string;
  experience?: { role: string; company: string; place: string; period: string; duties: string }[];
  education?: { school: string; degree: string; period: string }[];
  languages?: { name: string; level: string }[];
  certificates?: { name: string; year: string }[];
};

export type Application = {
  role: string; name: string; email: string; phone: string;
  country?: string; nationality?: string; message?: string;
  cv?: CvData; // set when the CV was created on the website
  cvText?: string;
};

const toBase64 = (f: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1] ?? "");
    r.onerror = rej;
    r.readAsDataURL(f);
  });

async function viaMailer(a: Application, file: File | null | undefined, lang: string, page: string) {
  const body = {
    ...a,
    lang,
    page,
    file: file ? { name: file.name, type: file.type || "application/octet-stream", data: await toBase64(file) } : null,
  };
  // text/plain keeps it a "simple" request (no CORS preflight, which Apps Script cannot answer)
  const r = await fetch(company.applyEndpoint, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "text/plain;charset=utf-8" }, redirect: "follow" });
  const j = (await r.json().catch(() => ({}))) as { ok?: boolean };
  return r.ok && j.ok === true;
}

async function viaFormSubmit(a: Application, file: File | null | undefined, lang: string, page: string) {
  const fd = new FormData();
  fd.append("_subject", `Job application — ${a.role} — ${a.name}${a.cv ? " (CV created on the website)" : ""}`);
  fd.append("_template", "table");
  fd.append("_captcha", "false");
  fd.append("_cc", company.applyCc.join(","));
  fd.append("_replyto", a.email);
  const fields: Record<string, string | undefined> = {
    Position: a.role, Name: a.name, Email: a.email, Phone: a.phone,
    "Country of residence": a.country, Nationality: a.nationality, Message: a.message,
    CV: a.cvText, "Sent from": `${page} (${lang})`,
  };
  for (const [k, v] of Object.entries(fields)) if (v !== undefined) fd.append(k, v || "—");
  if (file) fd.append("attachment", file, file.name);
  const r = await fetch(company.cvEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
  const j = await r.json().catch(() => ({}));
  return r.ok && String((j as { success?: unknown }).success) === "true";
}

export async function sendApplication(a: Application, file?: File | null): Promise<boolean> {
  const lang = document.documentElement.lang || "en";
  const page = location.origin + location.pathname;
  if (company.applyEndpoint) {
    try {
      if (await viaMailer(a, file, lang, page)) return true;
    } catch {}
  }
  try {
    return await viaFormSubmit(a, file, lang, page);
  } catch {
    return false;
  }
}
