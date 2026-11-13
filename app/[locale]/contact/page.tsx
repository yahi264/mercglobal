import type { Metadata } from "next";
import { Globe, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/Forms";
import { LinkedInIcon, WhatsAppIcon } from "@/components/Icons";
import { company, sectors } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navContact"), description: getT(l)("formIntro") };
}

export default async function Contact({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  const item = "card flex gap-4 p-5";
  const icon = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand";
  const link = "block font-semibold text-fg transition-colors hover:text-brand";

  return (
    <>
      <PageHero title={t("navContact")} eyebrow="Merç Global Group" text={t("formIntro")} crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navContact") }]} />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          <Reveal className={item}>
            <span className={icon}><MapPin className="h-5 w-5" /></span>
            <div>
              <p className="mb-1 text-sm text-muted">{t("address")}</p>
              <a href={company.mapLink} target="_blank" rel="noopener noreferrer" className={link}>
                {company.addressLines.map((a) => <span key={a} className="block">{a}</span>)}
              </a>
            </div>
          </Reveal>
          <Reveal className={item}>
            <span className={icon}><Phone className="h-5 w-5" /></span>
            <div>
              <p className="mb-1 text-sm text-muted">{t("phone")}</p>
              <a href={company.phoneHref} className={link} dir="ltr">{company.phoneDisplay}</a>
              <a href="tel:+905313424801" className={`${link} mt-1 inline-flex items-center gap-1.5`} dir="ltr">
                <Smartphone className="h-4 w-4 text-muted" /> {company.mobileDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal className={item}>
            <span className={`${icon} !bg-whatsapp/15 !text-whatsapp`}><WhatsAppIcon className="h-5 w-5" /></span>
            <div>
              <p className="mb-1 text-sm text-muted">WhatsApp</p>
              {company.whatsapp.map((w) => (
                <a key={w.number} href={`https://wa.me/${w.number}`} target="_blank" rel="noopener noreferrer" className={link} dir="ltr">{w.display}</a>
              ))}
            </div>
          </Reveal>
          <Reveal className={item}>
            <span className={icon}><Mail className="h-5 w-5" /></span>
            <div className="min-w-0">
              <p className="mb-1 text-sm text-muted">{t("email")}</p>
              {company.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className={`${link} break-all`}>
                  {e}
                  {e === company.emergencyEmail && <span className="ms-2 inline-block rounded-full bg-brand-soft px-2 py-0.5 align-middle text-xs font-bold text-brand">{t("emergency")}</span>}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal className={item}>
            <span className={icon}><Globe className="h-5 w-5" /></span>
            <div>
              <p className="mb-1 text-sm text-muted">{t("web")}</p>
              {company.websites.map((w) => (
                <a key={w} href={`https://${w}`} target="_blank" rel="noopener noreferrer" className={link}>{w}</a>
              ))}
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className={`${link} mt-2 inline-flex items-center gap-2`}>
                <LinkedInIcon className="h-4 w-4 text-[#0a66c2]" /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div id="request" className="card scroll-mt-28 p-6 sm:p-8">
            <h2 className="mb-2 text-2xl font-extrabold text-fg">{t("formTitle")}</h2>
            <p className="mb-6 text-muted">{t("formIntro")}</p>
            <ContactForm
              subject={`${t("fSubject")} — Merç Global`}
              email={company.emails[0]}
              whatsapp={company.whatsapp[0].number}
              labels={{ whatsapp: t("fSendWhatsApp"), email: t("fSendEmail"), required: t("fRequired"), badEmail: t("fBadEmail"), opened: t("fOpened"), select: t("fSelect") }}
              fields={[
                { name: "company", label: t("fCompany"), required: true, autoComplete: "organization" },
                { name: "name", label: t("fName"), required: true, autoComplete: "name" },
                { name: "email", label: t("fEmail"), type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: t("fPhone"), type: "tel", autoComplete: "tel" },
                { name: "country", label: t("fCountry") },
                { name: "sector", label: t("fSector"), type: "select", options: [...sectors.map((s) => s.title[l]), t("fOther")] },
                { name: "positions", label: t("fPositions"), required: true, placeholder: t("fPositionsHint"), full: true },
                { name: "start", label: t("fStart"), type: "date" },
                { name: "message", label: t("fMessage"), type: "textarea" },
              ]}
            />
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line shadow-xl shadow-navy/10">
            <iframe
              src={company.mapEmbed}
              title="Merç Global Group — Google Maps"
              className="block h-[380px] w-full sm:h-[450px] dark:opacity-90 dark:[filter:invert(0.9)_hue-rotate(180deg)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
