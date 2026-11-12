import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CvBuilder } from "@/components/CvBuilder";
import { company } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navCv"), description: getT(l)("cvIntro") };
}

export default async function CvPage({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero title={t("navCv")} eyebrow={t("navCareers")} text={t("cvIntro")} crumbs={[{ href: href(l), label: t("navHome") }, { href: href(l, "jobs"), label: t("navJobs") }, { label: t("navCv") }]} />
      <section className="container-x py-12 sm:py-16">
        <CvBuilder
          defaultLang={l === "tr" ? "tr" : "en"}
          email={company.emails[0]}
          whatsapp={company.whatsapp[0].number}
          ui={{
            language: t("cvLanguage"),
            example: t("cvExample"),
            clear: t("cvClear"),
            download: t("cvDownload"),
            send: t("cvSend"),
            whatsapp: t("fSendWhatsApp"),
            saved: t("cvSaved"),
            sendNote: t("cvSendNote"),
            preview: t("cvPreview"),
          }}
        />
        <p className="mt-10 text-center text-sm font-semibold text-muted">{t("cFree")}</p>
      </section>
    </>
  );
}
