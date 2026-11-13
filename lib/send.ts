// Sends an application (CV file + details) straight to the company's mailboxes through FormSubmit
// (formsubmit.co): main address in company.cvEndpoint, copies to company.applyCc.
import { company } from "./content";

export const MAX_FILE = 5 * 1024 * 1024;
export const okFile = (f: File) => f.size > 0 && f.size <= MAX_FILE && /\.(pdf|docx?|odt|rtf|jpe?g|png|webp|heic)$/i.test(f.name);

export async function sendApplication(subject: string, fields: Record<string, string>, file?: File | null): Promise<boolean> {
  const fd = new FormData();
  fd.append("_subject", subject);
  fd.append("_template", "table");
  fd.append("_captcha", "false");
  fd.append("_cc", company.applyCc.join(","));
  if (fields.Email) fd.append("_replyto", fields.Email);
  for (const [k, v] of Object.entries(fields)) fd.append(k, v || "—");
  if (file) fd.append("attachment", file, file.name);
  try {
    const r = await fetch(company.cvEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
    const j = await r.json().catch(() => ({}));
    return r.ok && String((j as { success?: unknown }).success) === "true";
  } catch {
    return false;
  }
}
