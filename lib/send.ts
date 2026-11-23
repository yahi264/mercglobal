// Sends a job application (details + CV file) through the website backend on the company Google
// Workspace account (scripts/apps-script/Code.gs). The backend emails it to the addresses the admin
// chose for that vacancy (or for general applications) and sends the candidate a confirmation.
import { apiPost } from "./api";

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
  jobId?: string; // vacancy id, when applying for a published vacancy
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

export async function sendApplication(a: Application, file?: File | null): Promise<boolean> {
  try {
    const r = await apiPost("apply", {
      ...a,
      lang: document.documentElement.lang || "en",
      page: location.origin + location.pathname,
      file: file ? { name: file.name, type: file.type || "application/octet-stream", data: await toBase64(file) } : null,
    });
    return r.ok === true;
  } catch {
    return false;
  }
}
