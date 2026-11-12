import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, mainWhatsApp, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import { asset } from "@/lib/asset";
import { WhatsAppIcon } from "./Icons";
import { LanguageRow } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Footer({ locale: l }: { locale: Locale }) {
  const t = getT(l);
  const col = "mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white";
  const link = "text-white/70 transition-colors hover:text-white";
  return (
    <footer className="bg-navy text-sm text-white/70">
      {/* Licence strip */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center gap-5 py-8 text-center md:flex-row md:text-start">
          <div className="flex shrink-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/logo1.png")} alt="İŞKUR — Özel İstihdam Bürosu" width={56} height={56} className="h-14 w-14 rounded-full bg-white p-1" loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/img/logo2.png")} alt="İŞKUR" width={56} height={56} className="h-14 w-14 rounded-full bg-white p-1" loading="lazy" />
          </div>
          <p className="max-w-4xl leading-relaxed">
            {text.licence[l]} <span className="text-white">{t("cFree")}</span>
          </p>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5">
            <Logo locale={l} tone="light" className="[--lh:40px]" />
          </div>
          <p className="leading-relaxed">{text.tagline[l]}</p>
          <div className="mt-6 text-white">
            <LanguageRow locale={l} />
          </div>
        </div>

        <div>
          <p className={col}>{t("navCorporate")}</p>
          <ul className="space-y-3">
            <li><Link className={link} href={href(l, "about")}>{t("navAbout")}</Link></li>
            <li><Link className={link} href={href(l, "certificates")}>{t("navCertificates")}</Link></li>
            <li><Link className={link} href={href(l, "references")}>{t("navReferences")}</Link></li>
            <li><Link className={link} href={href(l, "jobs")}>{t("navJobs")}</Link></li>
            <li><Link className={link} href={href(l, "cv")}>{t("navCv")}</Link></li>
            <li><Link className={link} href={href(l, "careers")}>{t("navCareers")}</Link></li>
          </ul>
        </div>

        <div>
          <p className={col}>{t("quickLinks")}</p>
          <ul className="space-y-3">
            <li><Link className={link} href={href(l)}>{t("navHome")}</Link></li>
            <li><Link className={link} href={href(l, "services")}>{t("navServices")}</Link></li>
            <li><Link className={link} href={href(l, "sectors")}>{t("navSectors")}</Link></li>
            <li><Link className={link} href={href(l, "countries")}>{t("navCountries")}</Link></li>
            <li><Link className={link} href={href(l, "contact")}>{t("navContact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className={col}>{t("navContact")}</p>
          <ul className="space-y-3.5">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={company.mapLink} target="_blank" rel="noopener noreferrer" className={link}>
                {company.addressLines.map((a) => (
                  <span key={a} className="block">{a}</span>
                ))}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={company.phoneHref} className={link} dir="ltr">{company.phoneDisplay}</a>
            </li>
            {company.whatsapp.map((w) => (
              <li key={w.number} className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                <a href={`https://wa.me/${w.number}`} target="_blank" rel="noopener noreferrer" className={link} dir="ltr">{w.display}</a>
              </li>
            ))}
            {company.emails.slice(0, 2).map((e) => (
              <li key={e} className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${e}`} className={`${link} break-all`}>{e}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Merc Global · Merç Global Group. {t("rights")}</p>
          <a href={`https://wa.me/${mainWhatsApp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> {t("writeWhatsApp")}
          </a>
        </div>
      </div>
    </footer>
  );
}
