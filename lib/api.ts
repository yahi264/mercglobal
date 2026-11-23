// Talks to the website backend (Google Apps Script on the company Google Workspace account,
// scripts/apps-script/Code.gs). POSTs are sent as text/plain so the browser makes a "simple"
// request (Apps Script cannot answer CORS preflights).
import { company } from "./content";

export const hasApi = () => !!company.apiEndpoint;

export async function apiPost<T = Record<string, unknown>>(action: string, body: Record<string, unknown> = {}): Promise<T & { ok: boolean; error?: string }> {
  if (!company.apiEndpoint) throw new Error("no-api");
  const r = await fetch(company.apiEndpoint, {
    method: "POST",
    body: JSON.stringify({ action, ...body }),
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    redirect: "follow",
  });
  if (!r.ok) throw new Error(`api ${r.status}`);
  return (await r.json()) as T & { ok: boolean; error?: string };
}

export async function apiGet<T = Record<string, unknown>>(action: string): Promise<T & { ok: boolean; error?: string }> {
  if (!company.apiEndpoint) throw new Error("no-api");
  const r = await fetch(`${company.apiEndpoint}?action=${encodeURIComponent(action)}&t=${Date.now()}`, { cache: "no-store", redirect: "follow" });
  if (!r.ok) throw new Error(`api ${r.status}`);
  return (await r.json()) as T & { ok: boolean; error?: string };
}
