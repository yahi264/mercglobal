// Builds the assistant's knowledge for one language from the site's own content (lib/content.ts).
import type { Kb } from "@/components/Assistant";
import { PHRASES } from "./assistant";
import { company, legal, permitInfo, refs, regions, sectors, services, text } from "./content";
import { getT, type Locale } from "./i18n";
import { href } from "./nav";

export function buildKb(l: Locale): Kb {
  const t = getT(l);
  const link = (path: string, label: string) => ({ href: href(l, path), label });
  const svc = services.map((s) => ({ title: s.title[l], text: s.short[l], href: href(l, `services/${s.slug}`) }));
  const sec = sectors.map((s) => ({ title: s.title[l], text: s.text[l], href: href(l, `sectors/${s.slug}`) }));
  const reg = regions.map((r) => ({ title: r.title[l], text: r.text[l], href: href(l, "countries") }));
  return {
    p: PHRASES[l],
    whatsapp: company.whatsapp[0].number,
    services: svc,
    sectors: sec,
    regions: reg,
    contact: {
      lines: [
        { label: t("phone"), value: company.phoneDisplay, href: company.phoneHref },
        ...company.whatsapp.map((w) => ({ label: "WhatsApp", value: w.display, href: `https://wa.me/${w.number}` })),
        ...company.emails.slice(0, 2).map((e) => ({ label: t("email"), value: e, href: `mailto:${e}` })),
        { label: t("address"), value: company.addressLines.join(", "), href: company.mapLink },
      ],
      address: company.addressLines.join(", "),
      mapLink: company.mapLink,
    },
    licence: text.licence[l],
    legalPoints: legal.comp.map((c) => c[l]),
    about: text.aboutShort[l],
    vision: `${text.visionTitle[l]}: ${text.vision[l]}`,
    mission: `${text.missionTitle[l]}: ${text.mission[l]}`,
    permit: {
      fees: permitInfo.fees.map(([k, v]) => [k[l], v] as [string, string]),
      wages: permitInfo.wages.map(([k, v]) => [k[l], v[l]] as [string, string]),
      note: permitInfo.feesNote[l],
      href: href(l, "services/work-permit-visa"),
    },
    partners: refs.partners.map((p) => `${p.name} — ${p.country[l]}`),
    references: [...refs.intl.slice(0, 6), ...refs.tr.slice(0, 3)],
    links: {
      jobs: link("jobs", t("navJobs")),
      cv: link("cv", t("navCv")),
      careers: link("careers", t("navCareers")),
      request: { href: href(l, "contact") + "#request", label: t("requestStaff") },
      references: link("references", t("navReferences")),
      certificates: link("certificates", t("navCertificates")),
      countries: link("countries", t("navCountries")),
      services: link("services", t("allServices")),
      sectors: link("sectors", t("allSectors")),
      about: link("about", t("navAbout")),
      contact: link("contact", t("navContact")),
    },
    chunks: [
      ...services.map((s) => ({ title: s.title[l], text: `${s.long[l]} ${s.list.map((x) => x[l]).join(", ")}`, href: href(l, `services/${s.slug}`) })),
      ...sec,
      ...reg,
      { title: t("navAbout"), text: text.about.map((x) => x[l]).join(" "), href: href(l, "about") },
      { title: t("navCertificates"), text: `${legal.intro[l]} ${text.licence[l]}`, href: href(l, "certificates") },
    ],
  };
}
