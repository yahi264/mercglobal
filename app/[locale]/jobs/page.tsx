import type { Metadata } from "next";
import Link from "next/link";
import { FileText, UploadCloud } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { JobBoard } from "@/components/JobBoard";
import { sectors } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import type { JobsFile } from "@/lib/jobs";
import initial from "@/data/jobs.json";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navJobs"), description: getT(l)("jobsIntro") };
}

export default async function Jobs({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero
        title={t("navJobs")}
        eyebrow={t("navCareers")}
        text={t("jobsIntro")}
        image="/img/slide/3.webp"
        crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navJobs") }]}
      />
      <section className="container-x py-16 sm:py-20">
        {/* Candidates who already have a CV can send it directly; others can create one */}
        <div className="card mb-10 flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-fg">{t("lookingJob")}</h2>
            <p className="mt-1 text-muted">{t("lookingJobText")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={`${href(l, "careers")}?general=1#apply`} className="btn-brand whitespace-nowrap">
              <UploadCloud className="h-4 w-4" /> {t("sendCv")}
            </Link>
            <Link href={href(l, "cv")} className="btn-outline whitespace-nowrap">
              <FileText className="h-4 w-4" /> {t("navCv")}
            </Link>
          </div>
        </div>
        <JobBoard
          locale={l}
          initial={initial as JobsFile}
          sectors={sectors.map((s) => ({ slug: s.slug, title: s.title[l] }))}
          applyHref={href(l, "careers")}
          cvHref={href(l, "cv")}
          labels={{
            search: t("jobsSearch"),
            all: t("allSectors"),
            none: t("jobsNone"),
            loading: t("jobsLoading"),
            error: t("jobsError"),
            count: t("jobsCount"),
            location: t("jobLocation"),
            positions: t("jobPositions"),
            type: t("jobType"),
            salary: t("jobSalary"),
            deadline: t("jobDeadline"),
            posted: t("jobPosted"),
            requirements: t("jobRequirements"),
            description: t("jobDescription"),
            apply: t("jobApply"),
            cv: t("navCv"),
            writtenIn: t("jobWrittenIn"),
            close: t("close"),
            other: t("fOther"),
            createApply: t("jobCreateApply"),
          }}
        />
      </section>
    </>
  );
}
