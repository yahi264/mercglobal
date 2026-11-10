import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/Forms";
import { company, sectors } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navCareers"), description: getT(l)("cIntro") };
}

export default async function Careers({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero title={t("navCareers")} eyebrow={t("navCorporate")} text={t("cIntro")} image="/img/slide/8.webp" crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navCareers") }]} />
      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <div className="space-y-5">
            <div className="rounded-2xl border-s-4 border-brand bg-brand-soft p-6">
              <ShieldCheck className="mb-3 h-8 w-8 text-brand" strokeWidth={1.5} />
              <p className="font-bold leading-relaxed text-fg">{t("cFree")}</p>
            </div>
            <div className="card p-6 text-sm leading-relaxed text-muted">
              <p className="mb-2 font-bold text-fg">{t("email")}</p>
              <a href={`mailto:${company.emails[0]}`} className="font-semibold text-brand">
                {company.emails[0]}
              </a>
              <p className="mt-4">{t("cCvNote")}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-extrabold text-fg">{t("cTitle")}</h2>
            <ContactForm
              emailFirst
              subject={`${t("cSubject")} — Merç Global`}
              email={company.emails[0]}
              whatsapp={company.whatsapp[0].number}
              note={t("cCvNote")}
              labels={{ whatsapp: t("fSendWhatsApp"), email: t("fSendEmail"), required: t("fRequired"), badEmail: t("fBadEmail"), opened: t("fOpened"), select: t("fSelect") }}
              fields={[
                { name: "name", label: t("fName"), required: true, autoComplete: "name" },
                { name: "email", label: t("fEmail"), type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: t("fPhone"), type: "tel", required: true, autoComplete: "tel" },
                { name: "position", label: t("cPosition"), required: true },
                { name: "sector", label: t("fSector"), type: "select", options: [...sectors.map((s) => s.title[l]), t("fOther")], full: true },
                { name: "letter", label: t("cLetter"), type: "textarea" },
              ]}
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
