import Link from "next/link";
import { AdminJobs } from "@/components/AdminJobs";
import { Logo } from "@/components/Logo";
import { sectors } from "@/lib/content";

export default function AdminPage() {
  return (
    <main className="container-x py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 max-w-full flex-1">
          <Logo locale="tr" fit className="[--lh:40px]" />
        </div>
        <div className="sm:text-end">
          <h1 className="text-2xl font-extrabold text-fg">Job vacancies · İş ilanları</h1>
          <Link href="/en/jobs/" className="text-sm font-semibold text-brand">View on the website · Sitede gör →</Link>
        </div>
      </header>
      <AdminJobs siteJobsHref="/mercglobal/en/jobs/" sectors={sectors.map((s) => ({ slug: s.slug, title: `${s.title.en} · ${s.title.tr}` }))} />
    </main>
  );
}
