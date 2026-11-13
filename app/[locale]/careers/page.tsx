import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FileText, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ApplicationForm } from "@/components/ApplicationForm";
import { CvLink } from "@/components/CvLink";
import { company } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import type { JobsFile } from "@/lib/jobs";
import initial from "@/data/jobs.json";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("apTitle"), description: getT(l)("apIntro") };
}

export default async function Careers({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero title={t("apTitle")} eyebrow={t("navCareers")} text={t("apIntro")} image="/img/slide/8.webp" crumbs={[{ href: href(l), label: t("navHome") }, { href: href(l, "jobs"), label: t("navJobs") }, { label: t("apTitle") }]} />
      <section className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <ApplicationForm
            locale={l}
            initial={initial as JobsFile}
            cvHref={href(l, "cv")}
            email={company.emails[0]}
            whatsapp={company.whatsapp[0].number}
            labels={{
              title: t("apTitle"), intro: t("apIntro"), name: t("fName"), email: t("fEmail"), phone: t("fPhone"), country: t("apCountry"),
              nationality: t("apNationality"), position: t("apPosition"), general: t("apGeneral"), change: t("apChange"), message: t("fMessage"),
              upload: t("apUpload"), choose: t("apChoose"), uploadHint: t("apUploadHint"), noCv: t("apNoCv"), send: t("apSend"), sending: t("apSending"),
              successTitle: t("apSuccessTitle"), successText: t("apSuccessText"), another: t("apAnother"), needFile: t("apNeedFile"),
              fileBad: t("apFileBad"), fail: t("apFail"), required: t("fRequired"), badEmail: t("fBadEmail"), consent: t("apConsent"),
              orEmail: t("fSendEmail"), orWhatsApp: t("fSendWhatsApp"), uploadTab: t("apUploadTab"), createTab: t("apCreateTab"), createHint: t("apCreateHint"),
            }}
          />
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border-s-4 border-brand bg-brand-soft p-6">
            <ShieldCheck className="mb-3 h-8 w-8 text-brand" strokeWidth={1.5} />
            <p className="font-bold leading-relaxed text-fg">{t("cFree")}</p>
          </div>
          <div className="card space-y-3 p-6">
            <Link href={href(l, "jobs")} className="btn-brand glow-btn w-full">
              <Briefcase className="h-4 w-4" /> {t("navJobs")}
            </Link>
            <CvLink href={href(l, "cv")} className="btn-outline w-full">
              <FileText className="h-4 w-4" /> {t("navCv")}
            </CvLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
