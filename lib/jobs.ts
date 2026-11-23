// Job vacancies. They live in the Google Sheet of the website backend (scripts/apps-script/Code.gs)
// and are managed from the admin page (/admin/) with a username and password. The site reads the
// latest list when a visitor opens a page that shows vacancies, so new openings appear without rebuilding.
// data/jobs.json is only the (empty) starting list built into the pages.
import type { Locale } from "./i18n";
import { apiGet } from "./api";

export type Job = {
  id: string;
  title: string;
  country: string;
  city?: string;
  sector: string; // a sector slug from lib/content.ts, or "other"
  type?: string; // e.g. "Full-time · 2-year contract"
  positions?: string; // e.g. "10"
  salary?: string;
  description: string;
  requirements?: string; // one requirement per line
  deadline?: string; // YYYY-MM-DD
  posted: string; // YYYY-MM-DD
  language: Locale; // language the vacancy is written in
  active: boolean;
  recipients?: string[]; // admin only: addresses that receive the CVs for this vacancy
};

export type JobsFile = { updated: string; jobs: Job[] };

export async function fetchJobs(): Promise<JobsFile> {
  const r = await apiGet<{ updated: string; jobs: Job[] }>("jobs");
  if (!r.ok) throw new Error(r.error || "jobs");
  return { updated: r.updated, jobs: r.jobs };
}

export const activeJobs = (f: JobsFile) =>
  f.jobs.filter((j) => j.active && (!j.deadline || j.deadline >= new Date().toISOString().slice(0, 10)));

export const jobLabel = (j: Job) => `${j.title} — ${[j.city, j.country].filter(Boolean).join(", ")}`;
