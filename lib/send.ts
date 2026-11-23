// Sends a job application (details + CV file) through the website backend on the company Google
// Workspace account (scripts/apps-script/Code.gs). The backend emails it to the addresses the admin
// chose for that vacancy (or for general applications) and sends the candidate a confirmation.
import { company } from "./content";

export const MAX_FILE = 10 * 1024 * 1024;
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

/**
 * Sends the application. `onProgress` receives 0–100 while the CV is uploading, then 100 while the
 * team email is being sent (XMLHttpRequest is used because it reports upload progress).
 */
export async function sendApplication(a: Application, file?: File | null, onProgress?: (pct: number) => void): Promise<boolean> {
  if (!company.apiEndpoint) return false;
  let body: string;
  try {
    body = JSON.stringify({
      action: "apply",
      ...a,
      lang: document.documentElement.lang || "en",
      page: location.origin + location.pathname,
      file: file ? { name: file.name, type: file.type || "application/octet-stream", data: await toBase64(file) } : null,
    });
  } catch {
    return false;
  }
  return new Promise<boolean>((resolve) => {
    const x = new XMLHttpRequest();
    x.open("POST", company.apiEndpoint);
    x.setRequestHeader("Content-Type", "text/plain;charset=utf-8"); // "simple" request: no CORS preflight
    x.timeout = 120000;
    x.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.min(99, Math.round((e.loaded / e.total) * 100)));
    x.upload.onload = () => onProgress?.(100);
    x.onload = () => {
      try {
        resolve(x.status >= 200 && x.status < 300 && JSON.parse(x.responseText).ok === true);
      } catch {
        resolve(false);
      }
    };
    x.onerror = x.ontimeout = () => resolve(false);
    x.send(body);
  });
}

/** Smoothly brings an element to the top of the screen, below the sticky header. */
export function scrollToTop(el: HTMLElement | null) {
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 110;
  const lenis = (window as Window & { __lenis?: { scrollTo(t: number, o?: object): void } }).__lenis;
  if (lenis) lenis.scrollTo(Math.max(0, y), { duration: 0.9 });
  else window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}
