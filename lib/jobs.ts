// Job vacancies. They live in data/jobs.json in the GitHub repository (branch "main") and are
// edited from the admin page (/admin/), which saves straight to GitHub. The site reads the latest
// file when a visitor opens the Job Vacancies page, so new openings appear without rebuilding.
import type { Locale } from "./i18n";

export const REPO = { owner: "yahi264", name: "mercglobal", branch: "main", path: "data/jobs.json" };

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
};

export type JobsFile = { updated: string; jobs: Job[] };

const api = `https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/${REPO.path}?ref=${REPO.branch}`;
const raw = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.branch}/${REPO.path}`;

// Latest vacancies: GitHub API first (always fresh), raw file as a fallback.
export async function fetchJobs(): Promise<JobsFile> {
  try {
    const r = await fetch(api, { headers: { Accept: "application/vnd.github.raw+json" }, cache: "no-store" });
    if (r.ok) return (await r.json()) as JobsFile;
  } catch {}
  const r = await fetch(`${raw}?t=${Date.now()}`, { cache: "no-store" });
  if (!r.ok) throw new Error(`jobs ${r.status}`);
  return (await r.json()) as JobsFile;
}

export const activeJobs = (f: JobsFile) =>
  f.jobs.filter((j) => j.active && (!j.deadline || j.deadline >= new Date().toISOString().slice(0, 10)));
